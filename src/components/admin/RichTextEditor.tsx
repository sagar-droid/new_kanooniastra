"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const ToolbarButton = ({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded px-2 py-1 text-sm ${
      active ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
    }`}
  >
    {label}
  </button>
);

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Image],
    content,
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[240px] px-3 py-2 focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const insertLink = () => {
    const url = window.prompt("Link URL");
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const insertImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const altText = window.prompt("Describe this image (alt text)") ?? "";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "blog-body");

      const response = await fetch("/api/admin/uploads", { method: "POST", body: formData });
      const data = await response.json();

      if (response.ok) {
        editor.chain().focus().setImage({ src: data.url, alt: altText }).run();
      } else {
        window.alert(data.error ?? "Image upload failed");
      }
    };
    input.click();
  };

  return (
    <div className="rounded-md border border-gray-300">
      <div className="flex flex-wrap gap-1 border-b border-gray-300 bg-gray-50 p-2">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="Bullet List"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Numbered List"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton label="Link" active={editor.isActive("link")} onClick={insertLink} />
        <ToolbarButton label="Image" onClick={insertImage} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
