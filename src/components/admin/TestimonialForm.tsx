"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploadField from "./ImageUploadField";

interface CaseStudyOption {
  _id: string;
  title: string;
}

interface TestimonialFormValues {
  clientName: string;
  quote: string;
  rating: string;
  relatedCaseStudy: string;
  photo: { url: string; alt: string };
  status: "approved" | "pending";
}

interface TestimonialFormProps {
  testimonialId?: string;
  initialValues?: Partial<TestimonialFormValues>;
  caseStudies: CaseStudyOption[];
}

const EMPTY_VALUES: TestimonialFormValues = {
  clientName: "",
  quote: "",
  rating: "",
  relatedCaseStudy: "",
  photo: { url: "", alt: "" },
  status: "pending",
};

const TestimonialForm = ({ testimonialId, initialValues, caseStudies }: TestimonialFormProps) => {
  const router = useRouter();
  const [values, setValues] = useState<TestimonialFormValues>({ ...EMPTY_VALUES, ...initialValues });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof TestimonialFormValues>(key: K, value: TestimonialFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      clientName: values.clientName || "Anonymous",
      quote: values.quote,
      rating: values.rating ? Number(values.rating) : undefined,
      relatedCaseStudy: values.relatedCaseStudy || undefined,
      photo: values.photo.url ? values.photo : undefined,
      status: values.status,
    };

    try {
      const response = await fetch(
        testimonialId ? `/api/admin/testimonials/${testimonialId}` : "/api/admin/testimonials",
        {
          method: testimonialId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data.error === "string"
            ? data.error
            : Object.values(data.error?.fieldErrors ?? {}).flat().join(", ") ||
              "Failed to save testimonial";
        setError(message);
        return;
      }

      router.push("/admin/testimonials");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-6">
      {error && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Client Name <span className="text-gray-400">(leave blank for &quot;Anonymous&quot;)</span>
        </label>
        <input
          value={values.clientName}
          onChange={(event) => update("clientName", event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Quote</label>
        <textarea
          required
          rows={4}
          value={values.quote}
          onChange={(event) => update("quote", event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Rating (1-5, optional)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={values.rating}
            onChange={(event) => update("rating", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Related Case Study (optional)</label>
          <select
            value={values.relatedCaseStudy}
            onChange={(event) => update("relatedCaseStudy", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          >
            <option value="">None</option>
            {caseStudies.map((caseStudy) => (
              <option key={caseStudy._id} value={caseStudy._id}>
                {caseStudy.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ImageUploadField
        label="Photo (optional)"
        value={values.photo}
        onChange={(value) => update("photo", value)}
        folder="testimonial-photos"
      />

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          value={values.status}
          onChange={(event) => update("status", event.target.value as "approved" | "pending")}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/90 disabled:opacity-60"
      >
        {isSubmitting ? "Saving…" : testimonialId ? "Update Testimonial" : "Create Testimonial"}
      </button>
    </form>
  );
};

export default TestimonialForm;
