import type { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import CaseStudyModel from "@/models/CaseStudy";
import TestimonialForm from "@/components/admin/TestimonialForm";

export const metadata: Metadata = {
  title: "Edit Testimonial",
  robots: { index: false, follow: false },
};

const EditTestimonialPage = async ({ params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) notFound();

  await connectToDatabase();
  const [item, caseStudies] = await Promise.all([
    TestimonialModel.findById(params.id).lean(),
    CaseStudyModel.find().select("title").lean(),
  ]);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Edit Testimonial</h1>
      <TestimonialForm
        testimonialId={String(item._id)}
        caseStudies={caseStudies.map((cs) => ({ _id: String(cs._id), title: cs.title }))}
        initialValues={{
          clientName: item.clientName,
          quote: item.quote,
          rating: item.rating ? String(item.rating) : "",
          relatedCaseStudy: item.relatedCaseStudy ? String(item.relatedCaseStudy) : "",
          photo: item.photo ?? { url: "", alt: "" },
          status: item.status,
        }}
      />
    </div>
  );
};

export default EditTestimonialPage;
