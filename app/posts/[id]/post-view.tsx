"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeleteButton } from "./delete-button";
import { updatePost } from "./actions";

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};

export function PostView({ post, isLoggedIn }: { post: Post; isLoggedIn: boolean }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !isEditing) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    };

    textarea.addEventListener("input", adjustHeight);
    adjustHeight(); // Initial adjustment

    return () => textarea.removeEventListener("input", adjustHeight);
  }, [isEditing]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await updatePost(post.id, formData);

    if (result.success) {
      setIsEditing(false);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-screen-md p-3">
      <div className="flex flex-col items-start gap-3">
        <div className="font-bold">Post</div>
        <div className="flex flex-col items-start">
          <Link href="/posts" className="text-blue-600">Back</Link>
          {isLoggedIn && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-fit cursor-pointer text-blue-600"
            >
              Edit
            </button>
          )}
          {isLoggedIn && isEditing && (
            <>
              <button
                type="submit"
                form="edit-form"
                className="w-fit cursor-pointer text-blue-600"
              >
                Submit
              </button>
              <DeleteButton postId={post.id} />
            </>
          )}
        </div>
        {isEditing ? (
          <form id="edit-form" onSubmit={handleSubmit} className="w-full">
            <div className="mb-3 flex flex-col">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full font-bold focus:outline-none"
              />
              <div className="text-sm text-gray-500">
                Created: {new Date(post.created_at).toLocaleDateString()} | Updated: {new Date(post.updated_at).toLocaleDateString()}
              </div>
            </div>
            <textarea
              ref={textareaRef}
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full resize-none overflow-hidden focus:outline-none"
              rows={1}
            />
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <div className="font-bold">{post.title}</div>
              <div className="text-sm text-gray-500">
                Created: {new Date(post.created_at).toLocaleDateString()} | Updated: {new Date(post.updated_at).toLocaleDateString()}
              </div>
            </div>
            <div className="whitespace-pre-wrap">{post.content}</div>
          </div>
        )}
      </div>
    </div>
  );
}
