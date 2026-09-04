import type { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import PageModel from "@/models/Page";
import PageForm from "@/components/admin/PageForm";

export const metadata: Metadata = {
  title: "Edit Page",
  robots: { index: false, follow: false },
};

const EditPagePage = async ({ params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) notFound();

  await connectToDatabase();
  const item = await PageModel.findById(params.id).lean();
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Edit Page</h1>
      <PageForm
        pageId={String(item._id)}
        initialValues={{
          title: item.title,
          slug: item.slug,
          body: item.body,
          status: item.status,
          metaTitle: item.seo?.metaTitle ?? "",
          metaDescription: item.seo?.metaDescription ?? "",
        }}
      />
    </div>
  );
};

export default EditPagePage;
