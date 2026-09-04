"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import ImageUploadField from "./ImageUploadField";

interface TeamMemberFormValues {
  name: string;
  slug: string;
  designation: string;
  photo: { url: string; alt: string };
  bio: string;
  qualifications: string;
  practiceAreas: string;
  officeLocation: string;
  email: string;
  phone: string;
  facebook: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  displayOrder: number;
  status: "draft" | "published";
}

interface TeamMemberFormProps {
  memberId?: string;
  initialValues?: Partial<TeamMemberFormValues>;
}

const EMPTY_VALUES: TeamMemberFormValues = {
  name: "",
  slug: "",
  designation: "",
  photo: { url: "", alt: "" },
  bio: "",
  qualifications: "",
  practiceAreas: "",
  officeLocation: "",
  email: "",
  phone: "",
  facebook: "",
  linkedin: "",
  instagram: "",
  twitter: "",
  displayOrder: 0,
  status: "published",
};

const TeamMemberForm = ({ memberId, initialValues }: TeamMemberFormProps) => {
  const router = useRouter();
  const [values, setValues] = useState<TeamMemberFormValues>({ ...EMPTY_VALUES, ...initialValues });
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof TeamMemberFormValues>(key: K, value: TeamMemberFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleNameChange = (name: string) => {
    update("name", name);
    if (!slugTouched) update("slug", slugify(name));
  };

  const toList = (value: string) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      name: values.name,
      slug: values.slug,
      designation: values.designation,
      photo: values.photo,
      bio: values.bio,
      qualifications: toList(values.qualifications),
      practiceAreas: toList(values.practiceAreas),
      officeLocation: values.officeLocation || undefined,
      email: values.email || undefined,
      phone: values.phone || undefined,
      socialLinks: {
        facebook: values.facebook || undefined,
        linkedin: values.linkedin || undefined,
        instagram: values.instagram || undefined,
        twitter: values.twitter || undefined,
      },
      displayOrder: Number(values.displayOrder) || 0,
      status: values.status,
    };

    try {
      const response = await fetch(
        memberId ? `/api/admin/team-members/${memberId}` : "/api/admin/team-members",
        {
          method: memberId ? "PUT" : "POST",
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
              "Failed to save team member";
        setError(message);
        return;
      }

      router.push("/admin/team-members");
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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input
            required
            value={values.name}
            onChange={(event) => handleNameChange(event.target.value)}
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
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Designation</label>
        <input
          required
          value={values.designation}
          onChange={(event) => update("designation", event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <ImageUploadField
        label="Photo"
        value={values.photo}
        onChange={(value) => update("photo", value)}
        folder="team-photos"
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Bio</label>
        <textarea
          required
          rows={5}
          value={values.bio}
          onChange={(event) => update("bio", event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Qualifications <span className="text-gray-400">(comma separated)</span>
        </label>
        <input
          value={values.qualifications}
          onChange={(event) => update("qualifications", event.target.value)}
          placeholder="BALLB: TU National Law College, LLM: PU"
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Practice Areas <span className="text-gray-400">(comma separated)</span>
        </label>
        <input
          value={values.practiceAreas}
          onChange={(event) => update("practiceAreas", event.target.value)}
          placeholder="Corporate Law, Foreign Direct Investment"
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Office Location</label>
          <input
            value={values.officeLocation}
            onChange={(event) => update("officeLocation", event.target.value)}
            placeholder="Head Office"
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <fieldset className="rounded-md border border-gray-200 p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">Social Links (optional)</legend>
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="Facebook URL"
            value={values.facebook}
            onChange={(event) => update("facebook", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <input
            placeholder="LinkedIn URL"
            value={values.linkedin}
            onChange={(event) => update("linkedin", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <input
            placeholder="Instagram URL"
            value={values.instagram}
            onChange={(event) => update("instagram", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <input
            placeholder="Twitter/X URL"
            value={values.twitter}
            onChange={(event) => update("twitter", event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
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
        {isSubmitting ? "Saving…" : memberId ? "Update Team Member" : "Create Team Member"}
      </button>
    </form>
  );
};

export default TeamMemberForm;
