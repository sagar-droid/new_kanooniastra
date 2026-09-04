"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import RichTextEditor from "./RichTextEditor";
import ImageUploadField from "./ImageUploadField";

interface CaseStudyFormValues {
  title: string;
  slug: string;
  summary: string;
  body: string;
  clientName: string;
  outcome: string;
  practiceArea: string;
  coverImage: { url: string; alt: string };
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
}

interface CaseStudyFormProps {
  caseStudyId?: string;
  initialValues?: Partial<CaseStudyFormValues>;
}

const EMPTY_VALUES: CaseStudyFormValues = {
  title: "",
  slug: "",
  summary: "",
  body: "",
  clientName: "",
  outcome: "",
  practiceArea: "",
  coverImage: { url: "", alt: "" },
  status: "draft",
  metaTitle: "",
  metaDescription: "",
};

const CaseStudyForm = ({ caseStudyId, initialValues }: CaseStudyFormProps) => {
  const router = useRouter();
  const [values, setValues] = useState<CaseStudyFormValues>({ ...EMPTY_VALUES, ...initialValues });
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof CaseStudyFormValues>(key: K, value: CaseStudyFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (title: string) => {
    update("title", title);
    if (!slugTouched) update("slug", slugify(title));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      title: values.title,
      slug: values.slug,
      summary: values.summary,
      body: values.body,
      clientName: values.clientName || undefined,
      outcome: values.outcome,
      practiceArea: values.practiceArea,
      coverImage: values.coverImage,
      status: values.status,
      seo: {
        metaTitle: values.metaTitle || undefined,
        metaDescription: values.metaDescription || undefined,
      },
    };

    try {
      const response = await fetch(
        caseStudyId ? `/api/admin/case-studies/${caseStudyId}` : "/api/admin/case-studies",
        {
          method: caseStudyId ? "PUT" : "POST",
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
              "Failed to save case study";
        setError(message);
        return;
      }

      router.push("/admin/case-studies");
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
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          required
          value={values.title}
          onChange={(event) => handleTitleChange(event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Slug</label>
        <input
          required
          value={values.slug}
          onChange={(event) => {
            setSlugTouched(true);
            update("slug", slugify(event.target.value));
          }}
          className="rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Summary</label>
        <textarea
          required
          rows={3}
          value={values.summary}
          onChange={(event) => update("summary", event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Body</label>
        <RichTextEditor content={values.body} onChange={(html) => update("body", html)} />
      </div>

      <ImageUploadField
        label="Cover Image"
        value={values.coverImage}
        onChange={(value) => update("coverImage", value)}
        folder="case-study-covers"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Client Name <span className="text-gray-400">(leave blank to stay anonymous)</span>
          </label>
          <input
            value={values.clientName}
            onChange={(event) => update("clientName", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Practice Area</label>
          <input
            required
            value={values.practiceArea}
            onChange={(event) => update("practiceArea", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Outcome</label>
        <input
          required
          value={values.outcome}
          onChange={(event) => update("outcome", event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <fieldset className="rounded-md border border-gray-200 p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">SEO (optional)</legend>
        <div className="flex flex-col gap-3">
          <input
            placeholder="Meta title"
            value={values.metaTitle}
            onChange={(event) => update("metaTitle", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <textarea
            placeholder="Meta description"
            rows={2}
            value={values.metaDescription}
            onChange={(event) => update("metaDescription", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </fieldset>

      <div className="flex items-center gap-4">
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/90 disabled:opacity-60"
      >
        {isSubmitting ? "Saving…" : caseStudyId ? "Update Case Study" : "Create Case Study"}
      </button>
    </form>
  );
};

export default CaseStudyForm;
