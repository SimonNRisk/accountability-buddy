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
      <div className="w-80 border border-white rounded-lg p-6 flex flex-col gap-6 items-center bg-black shadow-[0_0_20px_4px_rgba(255,255,255,0.4)]">
        <h1 className="text-2xl font-semibold animate-[subtlePulse_2.5s_ease-in-out_infinite]">
          Who are you?
        </h1>
        <button
          onClick={() => handleSelect("editor")}
          className="cursor-pointer px-4 py-2 bg-gray-100 text-black rounded shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] hover:scale-105 transition-scale duration-300"
        >
          I’m Simon
        </button>
        <button
          onClick={() => handleSelect("viewer")}
          className="cursor-pointer px-4 py-2 bg-gray-100 text-black rounded shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] hover:scale-105 transition-scale duration-300"
        >
          I’m just viewing
        </button>
      </div>
    </main>
  );
}
