"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import RichTextEditor from "./RichTextEditor";

interface PageFormValues {
  title: string;
  slug: string;
  body: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
}

interface PageFormProps {
  pageId?: string;
  initialValues?: Partial<PageFormValues>;
}

const EMPTY_VALUES: PageFormValues = {
  title: "",
  slug: "",
  body: "",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
};

const PageForm = ({ pageId, initialValues }: PageFormProps) => {
  const router = useRouter();
  const [values, setValues] = useState<PageFormValues>({ ...EMPTY_VALUES, ...initialValues });
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof PageFormValues>(key: K, value: PageFormValues[K]) => {
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
      body: values.body,
      status: values.status,
      seo: {
        metaTitle: values.metaTitle || undefined,
        metaDescription: values.metaDescription || undefined,
      },
    };

    try {
      const response = await fetch(pageId ? `/api/admin/pages/${pageId}` : "/api/admin/pages", {
        method: pageId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data.error === "string"
            ? data.error
            : Object.values(data.error?.fieldErrors ?? {}).flat().join(", ") || "Failed to save page";
        setError(message);
        return;
      }

      router.push("/admin/pages");
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
        <label className="text-sm font-medium text-gray-700">Body</label>
        <RichTextEditor content={values.body} onChange={(html) => update("body", html)} />
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
        {isSubmitting ? "Saving…" : pageId ? "Update Page" : "Create Page"}
      </button>
    </form>
  );
};

export default PageForm;
