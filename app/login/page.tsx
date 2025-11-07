"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "./actions";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Invalid password");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-screen-md p-3">
      <div className="flex flex-col gap-3">
        <div className="font-bold">Login</div>
        <Link href="/" className="w-fit text-blue-600">Home</Link>
        <form onSubmit={handleSubmit} className="flex flex-col items-start">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            disabled={loading}
            className="max-w-xs focus:outline-none"
          />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-fit cursor-pointer text-left text-blue-600 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
