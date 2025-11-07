import Link from "next/link";
import { verifySession } from "@/lib/auth";
import { LogoutButton } from "./logout-button";

export default async function Home() {
  const isLoggedIn = await verifySession();

  return (
    <div className="mx-auto max-w-screen-md p-3">
      <div className="flex flex-col gap-3">
        <div className="font-bold">Nam Joon</div>
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-col items-start">
            <Link href="/about" className="text-blue-600 visited:text-purple-600">About</Link>
            <Link href="/posts" className="text-blue-600 visited:text-purple-600">Posts</Link>
          </div>
          {isLoggedIn && <LogoutButton />}
        </div>
      </div>
    </div>
  );
}
