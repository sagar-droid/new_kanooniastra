import type { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import CaseStudyModel from "@/models/CaseStudy";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export const metadata: Metadata = {
  title: "Edit Case Study",
  robots: { index: false, follow: false },
};

const EditCaseStudyPage = async ({ params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) notFound();

  await connectToDatabase();
  const item = await CaseStudyModel.findById(params.id).lean();
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Edit Case Study</h1>
      <CaseStudyForm
        caseStudyId={String(item._id)}
        initialValues={{
          title: item.title,
          slug: item.slug,
          summary: item.summary,
          body: item.body,
          clientName: item.clientName ?? "",
          outcome: item.outcome,
          practiceArea: item.practiceArea,
          coverImage: item.coverImage,
          status: item.status,
          metaTitle: item.seo?.metaTitle ?? "",
          metaDescription: item.seo?.metaDescription ?? "",
        }}
      />
    </div>
  );
};

export default EditCaseStudyPage;
