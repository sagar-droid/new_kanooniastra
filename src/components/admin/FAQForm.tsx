"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FAQFormValues {
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  status: "draft" | "published";
}

interface FAQFormProps {
  faqId?: string;
  initialValues?: Partial<FAQFormValues>;
}

const EMPTY_VALUES: FAQFormValues = {
  question: "",
  answer: "",
  category: "",
  displayOrder: 0,
  status: "published",
};

const FAQForm = ({ faqId, initialValues }: FAQFormProps) => {
  const router = useRouter();
  const [values, setValues] = useState<FAQFormValues>({ ...EMPTY_VALUES, ...initialValues });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof FAQFormValues>(key: K, value: FAQFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      question: values.question,
      answer: values.answer,
      category: values.category || undefined,
      displayOrder: Number(values.displayOrder) || 0,
      status: values.status,
    };

    try {
      const response = await fetch(faqId ? `/api/admin/faqs/${faqId}` : "/api/admin/faqs", {
        method: faqId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data.error === "string"
            ? data.error
            : Object.values(data.error?.fieldErrors ?? {}).flat().join(", ") || "Failed to save FAQ";
        setError(message);
        return;
      }

      router.push("/admin/faqs");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
      {error && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Question</label>
        <input
          required
          value={values.question}
          onChange={(event) => update("question", event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Answer</label>
        <textarea
          required
          rows={5}
          value={values.answer}
          onChange={(event) => update("answer", event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <input
            value={values.category}
            onChange={(event) => update("category", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Display Order</label>
          <input
            type="number"
            value={values.displayOrder}
            onChange={(event) => update("displayOrder", Number(event.target.value))}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select
            value={values.status}
            onChange={(event) => update("status", event.target.value as "draft" | "published")}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/90 disabled:opacity-60"
      >
        {isSubmitting ? "Saving…" : faqId ? "Update FAQ" : "Create FAQ"}
      </button>
    </form>
  );
};

export default FAQForm;
