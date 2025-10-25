"use client";
import { useRouter } from "next/navigation";

export default function HoneypotPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-black text-white">
      <div className="text-center max-w-lg mx-auto p-8 border border-red-500 rounded-lg shadow-[0_0_20px_4px_rgba(255,0,0,0.4)]">
        <h1 className="text-3xl font-bold text-red-400 mb-6">🚨 Breach Detected! 🚨</h1>

        <p className="text-lg mb-6">
          Good job trying to get into my website! But... this isn't the real password. How silly did you think I was?
          Storing the password in the frontend is a bad idea.
        </p>

        <p className="text-sm text-gray-400 mb-8">
          If you have gotten this far, you are probably a very curious person. I don't know why you are here, but I'm
          glad you are. Email me at <a href="mailto:risk.simon@queensu.ca">risk.simon@queensu.ca</a> if you want to
          chat.
        </p>

        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </main>
  );
}
