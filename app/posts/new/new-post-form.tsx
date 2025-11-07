"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPost } from "./actions";

export function NewPostForm() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    };

    textarea.addEventListener("input", adjustHeight);
    adjustHeight(); // Initial adjustment

    return () => textarea.removeEventListener("input", adjustHeight);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createPost(formData);

    if (result.success && result.id) {
      router.push(`/posts/${result.id}`);
    }
  }

  return (
    <div className="mx-auto max-w-screen-xl p-3">
      <div className="flex flex-col items-start gap-3">
        <div className="font-bold">New post</div>
        <div className="flex flex-col items-start">
          <Link href="/posts" className="text-blue-600">Back</Link>
          <button type="submit" form="post-form" className="w-fit cursor-pointer text-blue-600">
            Submit
          </button>
        </div>
        <form id="post-form" onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className="mb-3 w-full focus:outline-none"
          />
          <textarea
            ref={textareaRef}
            name="content"
            placeholder="Write your post..."
            required
            className="w-full resize-none overflow-hidden focus:outline-none"
            rows={1}
          />
        </form>
      </div>
    </div>
  );
}
