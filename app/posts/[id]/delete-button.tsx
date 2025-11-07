"use client";

import { useRouter } from "next/navigation";
import { deletePost } from "./actions";

export function DeleteButton({ postId }: { postId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    const result = await deletePost(postId);
    if (result.success) {
      router.push("/posts");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="w-fit cursor-pointer text-red-600"
    >
      Delete
    </button>
  );
}
