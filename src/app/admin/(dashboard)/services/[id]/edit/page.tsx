import type { Metadata } from "next";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import ServiceForm from "@/components/admin/ServiceForm";

export const metadata: Metadata = {
  title: "Edit Service",
  robots: { index: false, follow: false },
};

const EditServicePage = async ({ params }: { params: { id: string } }) => {
  if (!mongoose.isValidObjectId(params.id)) notFound();

  await connectToDatabase();
  const item = await ServiceModel.findById(params.id).lean();
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary">Edit Service: {item.title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Update service details, hero intro, or scope items. Layout preview shows live changes.
        </p>
      </div>
      <ServiceForm
        serviceId={String(item._id)}
        initialValues={{
          title: item.title,
          slug: item.slug,
          intro: item.intro,
          description: item.description,
          image: item.image,
          displayOrder: item.displayOrder,
          status: item.status,
        }}
      />
    </div>
  );
};

export default EditServicePage;
