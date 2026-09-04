"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the public marketing Navbar/Footer on /admin routes, which render
 * their own minimal shell instead.
 */
const PublicChrome = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return <>{children}</>;
};

export default PublicChrome;
