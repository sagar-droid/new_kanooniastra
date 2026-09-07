import type { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import FAQModel from "@/models/FAQ";
import FAQForm from "@/components/admin/FAQForm";

export const metadata: Metadata = {
  title: "Edit FAQ",
  robots: { index: false, follow: false },
};

const EditFAQPage = async ({ params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) notFound();

  await connectToDatabase();
  const item = await FAQModel.findById(params.id).lean();
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Edit FAQ</h1>
      <FAQForm
        faqId={String(item._id)}
        initialValues={{
          question: item.question,
          answer: item.answer,
          category: item.category ?? "",
          displayOrder: item.displayOrder,
          status: item.status,
        }}
      />
    </div>
  );
};

export default EditFAQPage;
