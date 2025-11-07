import Link from "next/link";
import { verifySession } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Posts() {
  const isLoggedIn = await verifySession();
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { published_at: "desc" },
  });

  return (
    <div className="mx-auto max-w-screen-xl p-3">
      <div className="flex flex-col items-start gap-3">
        <div className="font-bold">Posts</div>
        <div className="flex flex-col items-start">
          <Link href="/" className="text-blue-600">Back</Link>
          {isLoggedIn && <Link href="/posts/new" className="text-blue-600">New post</Link>}
        </div>
        <div className="flex flex-col gap-3">
          {posts.length === 0 ? (
            <div className="text-gray-500">No posts yet</div>
          ) : (
            posts.map((post: { id: string; title: string }) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="text-blue-600"
              >
                {post.title}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
