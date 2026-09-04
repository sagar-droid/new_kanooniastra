import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { signSessionToken, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/lib/jwt";
import { checkRateLimit, resetRateLimit } from "@/lib/rateLimit";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const GENERIC_ERROR = "Invalid email or password.";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const rateLimitKey = `login:${request.ip ?? "unknown"}:${email}`;

  if (!checkRateLimit(rateLimitKey, { max: 5, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  await connectToDatabase();
  const user = await UserModel.findOne({ email: email.toLowerCase() });

  if (!user) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  resetRateLimit(rateLimitKey);

  const token = await signSessionToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({
    user: { email: user.email, role: user.role },
  });
  response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return response;
}
