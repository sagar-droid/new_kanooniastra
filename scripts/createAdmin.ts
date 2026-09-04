// One-off CLI to create (or update) an admin user.
// Usage: npm run create-admin -- <email> <password>
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectToDatabase } from "../src/lib/mongodb";
import UserModel from "../src/models/User";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error("Usage: npm run create-admin -- <email> <password>");
  process.exit(1);
}

if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

async function main() {
  await connectToDatabase();

  const passwordHash = await bcrypt.hash(password, 12);
  const normalizedEmail = email.toLowerCase().trim();

  const user = await UserModel.findOneAndUpdate(
    { email: normalizedEmail },
    { email: normalizedEmail, passwordHash, role: "admin" },
    { upsert: true, returnDocument: "after" }
  );

  console.log(`Admin user ready: ${user!.email} (role: ${user!.role})`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
