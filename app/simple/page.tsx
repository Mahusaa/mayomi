"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"

export default function Page() {
  const handleUpdate = (html: string) => {
    console.log("Editor content updated:", html);
  };

  return <SimpleEditor onUpdate={handleUpdate} />;
}
