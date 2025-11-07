import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { PostView } from "./post-view";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isLoggedIn = await verifySession();
  const post = await db.post.findUnique({
    where: { id },
  });

  if (!post || !post.published) {
    notFound();
  }

  return <PostView post={post} isLoggedIn={isLoggedIn} />;
}
