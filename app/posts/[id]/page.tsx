import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.post.findUnique({
    where: { id },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-screen-xl p-3">
      <div className="flex flex-col items-start gap-3">
        <div className="font-bold">{post.title}</div>
        <Link href="/posts" className="text-blue-600">Back</Link>
        <div className="whitespace-pre-wrap">{post.content}</div>
      </div>
    </div>
  );
}
