"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  endpoint: string;
  confirmMessage: string;
}

const DeleteButton = ({ endpoint, confirmMessage }: DeleteButtonProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(confirmMessage)) return;

    setIsDeleting(true);
    try {
      const response = await fetch(endpoint, { method: "DELETE" });
      if (response.ok) {
        router.refresh();
      } else {
        window.alert("Failed to delete.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-sm text-red-600 hover:underline disabled:opacity-60"
    >
      {isDeleting ? "Deleting…" : "Delete"}
    </button>
  );
};

export default DeleteButton;
