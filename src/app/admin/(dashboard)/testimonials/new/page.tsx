import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import CaseStudyModel from "@/models/CaseStudy";
import TestimonialForm from "@/components/admin/TestimonialForm";

export const metadata: Metadata = {
  title: "New Testimonial",
  robots: { index: false, follow: false },
};

const NewTestimonialPage = async () => {
  await connectToDatabase();
  const caseStudies = await CaseStudyModel.find().select("title").lean();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-primary">New Testimonial</h1>
      <TestimonialForm
        caseStudies={caseStudies.map((item) => ({ _id: String(item._id), title: item.title }))}
      />
    </div>
  );
};

export default NewTestimonialPage;
