import type { Metadata } from "next";
import ServiceForm from "@/components/admin/ServiceForm";

export const metadata: Metadata = {
  title: "New Service",
  robots: { index: false, follow: false },
};

const NewServicePage = () => (
  <div className="mx-auto max-w-5xl px-6 py-10">
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-primary">New Legal Service</h1>
      <p className="text-sm text-gray-500 mt-1">
        Add a practice area or legal service. The layout matches our individual service pages, and the contact sidebar is static across all services.
      </p>
    </div>
    <ServiceForm />
  </div>
);

export default NewServicePage;
