"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiMapPin,
  FiShield,
  FiBriefcase,
  FiPlus,
  FiTrash2,
  FiEye,
  FiEdit3,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { slugify } from "@/lib/slugify";
import ImageUploadField from "./ImageUploadField";

interface ServiceFormValues {
  title: string;
  slug: string;
  intro: string;
  description: string[];
  image: { url: string; alt: string };
  displayOrder: number;
  status: "draft" | "published";
}

interface ServiceFormProps {
  serviceId?: string;
  initialValues?: Partial<ServiceFormValues>;
}

const EMPTY_VALUES: ServiceFormValues = {
  title: "",
  slug: "",
  intro: "",
  description: [""],
  image: { url: "/fdi.jpeg", alt: "Legal service at Kanooni Astra" },
  displayOrder: 0,
  status: "published",
};

const COMMON_IMAGE_PRESETS = [
  { label: "FDI (Foreign Investment)", url: "/fdi.jpeg" },
  { label: "Intellectual Property", url: "/intellectual-property.png" },
  { label: "IPR Investigation", url: "/ipr.png" },
  { label: "Corporate Law", url: "/corporate-law.png" },
  { label: "Family Law", url: "/family-law.png" },
  { label: "Criminal Law", url: "/criminal-law.png" },
  { label: "Property Law", url: "/property-law.jpg" },
  { label: "Litigation", url: "/litigation.png" },
  { label: "TMT Law", url: "/tmt-law.png" },
  { label: "Legality Maintenance", url: "/legality-maintenance.png" },
];

const ServiceForm = ({ serviceId, initialValues }: ServiceFormProps) => {
  const router = useRouter();
  const [values, setValues] = useState<ServiceFormValues>({
    ...EMPTY_VALUES,
    ...initialValues,
    description:
      initialValues?.description && initialValues.description.length > 0
        ? initialValues.description
        : [""],
  });
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof ServiceFormValues>(key: K, value: ServiceFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleTitleChange = (title: string) => {
    update("title", title);
    if (!slugTouched) {
      update("slug", slugify(title));
      if (!values.image.alt || values.image.alt === EMPTY_VALUES.image.alt) {
        update("image", { ...values.image, alt: `${title} services at Kanooni Astra` });
      }
    }
  };

  const handleScopeChange = (index: number, text: string) => {
    const updated = [...values.description];
    updated[index] = text;
    update("description", updated);
  };

  const addScopeItem = () => {
    update("description", [...values.description, ""]);
  };

  const removeScopeItem = (index: number) => {
    const updated = values.description.filter((_, i) => i !== index);
    update("description", updated.length > 0 ? updated : [""]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const cleanedDescription = values.description.map((s) => s.trim()).filter(Boolean);

    if (cleanedDescription.length === 0) {
      setError("Please provide at least one Scope of Legal Services item.");
      setIsSubmitting(false);
      return;
    }

    if (!values.image.url) {
      setError("Please select or upload an image for the service.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      intro: values.intro.trim(),
      description: cleanedDescription,
      image: {
        url: values.image.url.trim(),
        alt: values.image.alt.trim() || `${values.title} services at Kanooni Astra`,
      },
      displayOrder: Number(values.displayOrder) || 0,
      status: values.status,
    };

    try {
      const response = await fetch(
        serviceId ? `/api/admin/services/${serviceId}` : "/api/admin/services",
        {
          method: serviceId ? "PUT" : "POST",
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
              "Failed to save service";
        setError(message);
        return;
      }

      router.push("/admin/services");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher Buttons */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              viewMode === "edit"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FiEdit3 />
            <span>Form Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              viewMode === "preview"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FiEye />
            <span>Live Layout Preview</span>
          </button>
        </div>

        <Link
          href="/admin/services"
          className="text-sm font-medium text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5"
        >
          <FiArrowLeft />
          <span>Back to Services</span>
        </Link>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-200">
          {error}
        </div>
      )}

      {/* EDIT MODE */}
      {viewMode === "edit" && (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
          {/* Card 1: Core Service Identity */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
              1. Hero & Identity
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Intellectual Property"
                  value={values.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. intellectual-property"
                  value={values.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    update("slug", slugify(e.target.value));
                  }}
                  className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm font-mono text-gray-700 focus:border-primary focus:outline-none"
                />
                <span className="text-xs text-gray-500">
                  URL: /our-services/{values.slug || "service-slug"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Hero Intro Paragraph <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="We help businesses identify, register, and defend their trademarks, patents, and designs in Nepal..."
                value={values.intro}
                onChange={(e) => update("intro", e.target.value)}
                className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none leading-relaxed"
              />
              <span className="text-xs text-gray-500">
                Displayed as the prominent lead paragraph under the service title.
              </span>
            </div>
          </div>

          {/* Card 2: Scope of Legal Services (Checklist items) */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  2. Scope of Legal Services
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Key areas of counsel, representation, and regulatory assistance (rendered with checkmarks)
                </p>
              </div>
              <button
                type="button"
                onClick={addScopeItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <FiPlus />
                <span>Add Scope Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {values.description.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Advising on the protection of intellectual property rights (IPR)"
                    value={item}
                    onChange={(e) => handleScopeChange(index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeScopeItem(index)}
                    disabled={values.description.length <= 1}
                    className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                    title="Remove item"
                  >
                    <FiTrash2 className="text-base" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Visual Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
              3. Service Visual Image
            </h2>

            <div className="space-y-4">
              <ImageUploadField
                label="Upload Custom Visual"
                value={values.image}
                onChange={(img) => update("image", img)}
                folder="services"
              />

              <div className="pt-2 border-t border-gray-100">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                  Or choose from existing preset assets:
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() =>
                        update("image", {
                          url: preset.url,
                          alt: `${values.title || preset.label} services at Kanooni Astra`,
                        })
                      }
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                        values.image.url === preset.url
                          ? "bg-primary/10 border-primary text-primary font-medium"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Static Side Contact Info Notification */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FiBriefcase className="text-base" />
              </div>
              <div className="space-y-1 text-sm">
                <h3 className="font-semibold text-blue-900">
                  Side Contact Card is Static for All Services
                </h3>
                <p className="text-blue-700 leading-relaxed text-xs">
                  The individual service page layout automatically displays the unified Kanooni Astra direct contact card in the right sidebar (Inquire About This Service, WhatsApp chat button, phone numbers: <code>+977 9843671048</code>, <code>+977 9844393183</code>, email: <code>kanooniastra@gmail.com</code>, and Ghattekulo office address). You don&apos;t need to reconfigure contact info per service.
                </p>
              </div>
            </div>
          </div>

          {/* Card 5: Publishing & Order */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">
              4. Publication Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={values.status}
                  onChange={(e) => update("status", e.target.value as "draft" | "published")}
                  className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none bg-white"
                >
                  <option value="published">Published (Visible on site)</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Display Order</label>
                <input
                  type="number"
                  value={values.displayOrder}
                  onChange={(e) => update("displayOrder", Number(e.target.value) || 0)}
                  className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
                <span className="text-xs text-gray-500">Lower numbers appear first.</span>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isSubmitting
                ? "Saving Service…"
                : serviceId
                ? "Update Service"
                : "Create Service"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Preview Page Layout
            </button>
          </div>
        </form>
      )}

      {/* PREVIEW MODE: Exact Individual Service Page Layout */}
      {viewMode === "preview" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl text-xs text-amber-800">
            <span>
              Previewing individual service layout for: <strong>{values.title || "Untitled Service"}</strong>
            </span>
            <button
              type="button"
              onClick={() => setViewMode("edit")}
              className="font-semibold text-primary hover:underline"
            >
              Return to Editor &rarr;
            </button>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6 md:p-10">
            {/* Navigation & Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-sm text-gray-500 font-medium flex-wrap">
                  <li>Home</li>
                  <li>/</li>
                  <li>Our Services</li>
                  <li>/</li>
                  <li className="text-gray-900 font-semibold">
                    {values.title || "Service Title"}
                  </li>
                </ol>
              </nav>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600">
                <FiArrowLeft />
                <span>All Services</span>
              </div>
            </div>

            {/* Hero Section */}
            <header className="max-w-4xl mb-10 md:mb-14">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                {values.title || "Service Title"}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {values.intro ||
                  "The introductory summary for this legal practice area will appear here..."}
              </p>
            </header>

            {/* 2-Column Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
              {/* Main Column (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                {/* Scope of Practice Card */}
                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/90">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                      <FiBriefcase />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Scope of Legal Services
                      </h2>
                      <p className="text-sm text-gray-500">
                        Key areas of legal counsel, representation, and regulatory assistance
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3.5">
                    {values.description.filter(Boolean).length > 0 ? (
                      values.description
                        .filter(Boolean)
                        .map((desc, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3.5 p-4 rounded-xl bg-gray-50/70 border border-gray-100"
                          >
                            <FiCheckCircle className="text-primary text-xl flex-shrink-0 mt-0.5" />
                            <p className="text-gray-800 text-base leading-relaxed font-medium">
                              {desc}
                            </p>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        No scope items added yet. Add items in the form editor.
                      </p>
                    )}
                  </div>
                </section>

                {/* Why Kanooni Astra Card */}
                <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/90">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                      <FiShield />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Our Legal Practice Standards
                      </h2>
                      <p className="text-sm text-gray-500">
                        How Kanooni Astra delivers structured counsel in Nepal
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100">
                      <h3 className="font-bold text-gray-900 text-base mb-1.5">
                        Regulatory Depth
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Direct liaison with ministries, OCR, DOI, Land Revenue (Malpot), and tribunals for seamless compliance.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100">
                      <h3 className="font-bold text-gray-900 text-base mb-1.5">
                        Court Representation
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Experienced litigation advocacy across District Courts, High Courts, and the Supreme Court of Nepal.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100">
                      <h3 className="font-bold text-gray-900 text-base mb-1.5">
                        Transparent Retainers
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Upfront clarity on fees, transparent engagement terms, and predictable milestone-driven delivery.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar Column (4 Cols) - Static Side Contact */}
              <aside className="lg:col-span-4 flex flex-col gap-6">
                {/* Service Visual Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200/90 flex flex-col items-center">
                  <div className="w-full relative aspect-[16/10] bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-3 border border-gray-100">
                    {values.image.url ? (
                      <Image
                        src={values.image.url}
                        alt={values.image.alt || "Service visual"}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No visual selected</span>
                    )}
                  </div>
                </div>

                {/* Direct Consultation Card (Static for all) */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/90 flex flex-col gap-6 relative">
                  <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    Static Side Contact
                  </span>

                  <div className="flex flex-col gap-2 border-b border-gray-100 pb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl mb-1">
                      <FiBriefcase />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Inquire About This Service
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Need customized legal counsel for {values.title || "this service"}? Speak directly with our advocates in Kathmandu.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <div className="w-full text-center py-3.5 px-6 rounded-xl bg-primary text-white font-semibold text-base shadow-sm flex items-center justify-center gap-2">
                      <span>Get in Touch with Our Team</span>
                      <FiArrowRight />
                    </div>

                    <div className="w-full text-center py-3.5 px-6 rounded-xl bg-transparent text-emerald-600 border border-emerald-600 font-semibold text-base flex items-center justify-center gap-2">
                      <FaWhatsapp className="text-xl" />
                      <span>Chat on WhatsApp</span>
                    </div>
                  </div>

                  {/* Direct Contacts */}
                  <div className="flex flex-col gap-3.5 text-sm pt-2 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                      <FiPhone className="text-primary text-base mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider">Phone</p>
                        <div className="flex flex-col text-gray-600">
                          <span>+977 9843671048</span>
                          <span>+977 9844393183</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiMail className="text-primary text-base mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider">Email</p>
                        <span className="text-gray-600">kanooniastra@gmail.com</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiMapPin className="text-primary text-base mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider">Office</p>
                        <p className="text-gray-600">Ghattekulo marg, Kathmandu, Nepal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceForm;
