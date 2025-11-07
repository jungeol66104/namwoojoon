"use server";

import { verifySession } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deletePost(id: string) {
  const isLoggedIn = await verifySession();

  if (!isLoggedIn) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db.post.delete({
      where: { id },
    });

    revalidatePath("/posts");
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}

export async function updatePost(id: string, formData: FormData) {
  const isLoggedIn = await verifySession();

  if (!isLoggedIn) {
    return { success: false, error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return { success: false, error: "Title and content are required" };
  }

  try {
    await db.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    revalidatePath(`/posts/${id}`);
    revalidatePath("/posts");
    return { success: true };
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false, error: "Failed to update post" };
  }
}
