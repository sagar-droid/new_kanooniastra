import Link from "next/link";

const AdminNav = () => {
  return (
    <nav className="flex gap-6 border-b border-gray-200 bg-white px-6 py-3 text-sm">
      <Link href="/admin" className="font-medium text-gray-700 hover:text-primary">
        Dashboard
      </Link>
      <Link href="/admin/blog" className="font-medium text-gray-700 hover:text-primary">
        Blog Posts
      </Link>
      <Link href="/admin/case-studies" className="font-medium text-gray-700 hover:text-primary">
        Case Studies
      </Link>
      <Link href="/admin/team-members" className="font-medium text-gray-700 hover:text-primary">
        Team Members
      </Link>
      <Link href="/admin/testimonials" className="font-medium text-gray-700 hover:text-primary">
        Testimonials
      </Link>
      <Link href="/admin/faqs" className="font-medium text-gray-700 hover:text-primary">
        FAQs
      </Link>
      <Link href="/admin/pages" className="font-medium text-gray-700 hover:text-primary">
        Pages
      </Link>
    </nav>
  );
};

export default AdminNav;
