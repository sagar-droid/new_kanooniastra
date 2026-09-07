import type { Metadata } from "next";
import PageForm from "@/components/admin/PageForm";

export const metadata: Metadata = {
  title: "New Page",
  robots: { index: false, follow: false },
};

const NewPagePage = () => (
  <div className="mx-auto max-w-3xl px-6 py-10">
    <h1 className="mb-6 text-2xl font-semibold text-primary">New Page</h1>
    <PageForm />
  </div>
);

export default NewPagePage;
