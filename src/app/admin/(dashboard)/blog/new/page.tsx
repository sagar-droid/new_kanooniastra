import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import TeamMemberModel from "@/models/TeamMember";
import BlogPostForm from "@/components/admin/BlogPostForm";

export const metadata: Metadata = {
  title: "New Blog Post",
  robots: { index: false, follow: false },
};

const NewBlogPostPage = async () => {
  await connectToDatabase();
  const teamMembers = await TeamMemberModel.find({ status: "published" })
    .select("name designation")
    .sort({ displayOrder: 1 })
    .lean();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-primary">New Blog Post</h1>
      <BlogPostForm
        teamMembers={teamMembers.map((member) => ({
          _id: String(member._id),
          name: member.name,
          designation: member.designation,
        }))}
      />
    </div>
  );
};

export default NewBlogPostPage;
