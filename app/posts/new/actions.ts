"use server";

import { db } from "@/lib/db";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return { success: false, error: "Title and content are required" };
  }

  try {
    const post = await db.post.create({
      data: {
        title,
        content,
        published: true,
        published_at: new Date(),
      },
    });

    return { success: true, id: post.id };
  } catch (error) {
    console.error("Failed to create post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
