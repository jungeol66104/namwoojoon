import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NewPostForm } from "./new-post-form";

export default async function NewPost() {
  const isLoggedIn = await verifySession();

  if (!isLoggedIn) {
    redirect("/login");
  }

  return <NewPostForm />;
}
