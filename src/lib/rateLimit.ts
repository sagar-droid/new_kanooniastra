interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const attempts = new Map<string, RateLimitEntry>();

/**
 * Best-effort in-memory rate limiter. On Vercel this state is per-instance and
 * resets on cold start, so it slows down casual brute-forcing but is not a
 * strong guarantee — for that, front the login route with Upstash Redis or
 * similar shared-state rate limiting.
 */
export function checkRateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number }
): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function resetRateLimit(key: string): void {
  attempts.delete(key);
}
