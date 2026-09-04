import type { Metadata } from "next";
import FAQForm from "@/components/admin/FAQForm";

export const metadata: Metadata = {
  title: "New FAQ",
  robots: { index: false, follow: false },
};

const NewFAQPage = () => (
  <div className="mx-auto max-w-2xl px-6 py-10">
    <h1 className="mb-6 text-2xl font-semibold text-primary">New FAQ</h1>
    <FAQForm />
  </div>
);

export default NewFAQPage;
