import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser } from "@/lib/session";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import CaseStudyModel from "@/models/CaseStudy";
import TeamMemberModel from "@/models/TeamMember";
import TestimonialModel from "@/models/Testimonial";
import FAQModel from "@/models/FAQ";
import PageModel from "@/models/Page";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

const AdminHomePage = async () => {
  const session = await getSessionUser();
  await connectToDatabase();

  const [blogPosts, caseStudies, teamMembers, pendingTestimonials, faqs, pages] =
    await Promise.all([
      BlogPostModel.countDocuments(),
      CaseStudyModel.countDocuments(),
      TeamMemberModel.countDocuments(),
      TestimonialModel.countDocuments({ status: "pending" }),
      FAQModel.countDocuments(),
      PageModel.countDocuments(),
    ]);

  const stats = [
    { label: "Blog Posts", count: blogPosts, href: "/admin/blog" },
    { label: "Case Studies", count: caseStudies, href: "/admin/case-studies" },
    { label: "Team Members", count: teamMembers, href: "/admin/team-members" },
    { label: "Pending Testimonials", count: pendingTestimonials, href: "/admin/testimonials?status=pending" },
    { label: "FAQs", count: faqs, href: "/admin/faqs" },
    { label: "Pages", count: pages, href: "/admin/pages" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
          <p className="text-sm text-gray-600">
            Signed in as {session?.email} ({session?.role})
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-semibold text-primary">{stat.count}</p>
            <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
