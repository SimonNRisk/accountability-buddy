"use client";
import { useRouter } from "next/navigation";
import { setLoginMode } from "@/lib/loginMode";

export default function LoginPage() {
  const router = useRouter();

  const handleSelect = (mode: "viewer" | "editor") => {
    setLoginMode(mode);
    router.push("/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Who are you?</h1>
      <button
        onClick={() => handleSelect("editor")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        I’m Simon
      </button>
      <button
        onClick={() => handleSelect("viewer")}
        className="px-4 py-2 bg-gray-300 text-black rounded"
      >
        I’m just viewing
      </button>
    </main>
  );
}
