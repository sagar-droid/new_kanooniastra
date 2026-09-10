"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";

const navItems = [
  { label: "Dashboard", href: "/admin", exact: true },
  { label: "Services", href: "/admin/services" },
  { label: "Blog Posts", href: "/admin/blog" },
  { label: "Case Studies", href: "/admin/case-studies" },
  { label: "Team Members", href: "/admin/team-members" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "FAQs", href: "/admin/faqs" },
  { label: "Pages", href: "/admin/pages" },
];

const AdminNav = () => {
  const pathname = usePathname();

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <nav className="border-b border-gray-200 bg-white px-4 sm:px-6 text-sm">
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto -mb-px">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary shrink-0 mr-1 my-2"
          title="Go to Homepage"
        >
          <FiHome className="text-sm" />
          <span>Home</span>
        </Link>
        <div className="h-5 w-px bg-gray-200 shrink-0 mx-1" />
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap shrink-0 ${
                active
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-gray-600 hover:border-gray-300 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default AdminNav;
