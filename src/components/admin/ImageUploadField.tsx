"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageValue {
  url: string;
  alt: string;
}

interface ImageUploadFieldProps {
  label: string;
  value: ImageValue;
  onChange: (value: ImageValue) => void;
  folder: string;
}

const ImageUploadField = ({ label, value, onChange, folder }: ImageUploadFieldProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/admin/uploads", { method: "POST", body: formData });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }

      onChange({ ...value, url: data.url });
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {value.url && (
        <div className="relative h-40 w-64 overflow-hidden rounded-md border border-gray-200">
          <Image src={value.url} alt={value.alt || "Preview"} fill className="object-cover" />
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
      {isUploading && <p className="text-sm text-gray-500">Uploading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <input
        type="text"
        placeholder="Alt text (describe the image for accessibility and SEO)"
        value={value.alt}
        onChange={(event) => onChange({ ...value, alt: event.target.value })}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
    </div>
  );
};

export default ImageUploadField;
