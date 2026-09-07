import type { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import TeamMemberModel from "@/models/TeamMember";
import BlogPostForm from "@/components/admin/BlogPostForm";

export const metadata: Metadata = {
  title: "Edit Blog Post",
  robots: { index: false, follow: false },
};

const EditBlogPostPage = async ({ params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) {
    notFound();
  }

  await connectToDatabase();

  const [post, teamMembers] = await Promise.all([
    BlogPostModel.findById(params.id).lean(),
    TeamMemberModel.find({ status: "published" })
      .select("name designation")
      .sort({ displayOrder: 1 })
      .lean(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Edit Blog Post</h1>
      <BlogPostForm
        postId={String(post._id)}
        teamMembers={teamMembers.map((member) => ({
          _id: String(member._id),
          name: member.name,
          designation: member.designation,
        }))}
        initialValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          body: post.body,
          coverImage: post.coverImage,
          author: String(post.author),
          category: post.category,
          tags: post.tags.join(", "),
          status: post.status,
          metaTitle: post.seo?.metaTitle ?? "",
          metaDescription: post.seo?.metaDescription ?? "",
        }}
      />
    </div>
  );
};

export default EditBlogPostPage;
