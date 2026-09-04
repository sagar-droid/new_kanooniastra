import type { Metadata } from "next";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export const metadata: Metadata = {
  title: "New Case Study",
  robots: { index: false, follow: false },
};

const NewCaseStudyPage = () => (
  <div className="mx-auto max-w-3xl px-6 py-10">
    <h1 className="mb-6 text-2xl font-semibold text-primary">New Case Study</h1>
    <CaseStudyForm />
  </div>
);

export default NewCaseStudyPage;
