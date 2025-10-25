"use client";
import { useRouter } from "next/navigation";
import { setLoginMode } from "@/lib/loginMode";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  // Honeypot password
  const FAKE_PASSWORD = "admin123";

  const handleSelect = (mode: "viewer" | "editor") => {
    if (mode === "viewer") {
      setLoginMode(mode);
      router.push("/");
    } else {
      setShowPasswordInput(true);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    try {
      // Check for honeypot first
      if (password === FAKE_PASSWORD) {
        router.push("/honeypot");
        return;
      }

      // Real authentication
      const response = await fetch("/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Correct password - store it and give editor access
        localStorage.setItem("auth_password", password);
        setLoginMode("editor");
        router.push("/");
      } else {
        // Wrong password - give read-only access
        console.log("naughty naughty");
        setLoginMode("viewer");
        router.push("/");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleBackToSelection = () => {
    setShowPasswordInput(false);
    setPassword("");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-80 border border-white rounded-lg p-6 flex flex-col gap-6 items-center bg-black shadow-[0_0_20px_4px_rgba(255,255,255,0.4)]">
        <h1 className="text-2xl font-semibold animate-[subtlePulse_2.5s_ease-in-out_infinite]">
          {showPasswordInput ? "Enter Password" : "Who are you?"}
        </h1>

        {!showPasswordInput ? (
          <>
            <button
              onClick={() => handleSelect("editor")}
              className="cursor-pointer px-4 py-2 bg-gray-100 text-black rounded shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] hover:scale-105 transition-scale duration-300"
            >
              I'm Simon
            </button>
            <button
              onClick={() => handleSelect("viewer")}
              className="cursor-pointer px-4 py-2 bg-gray-100 text-black rounded shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] hover:scale-105 transition-scale duration-300"
            >
              I'm just viewing
            </button>
          </>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="w-full flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="text-white px-3 py-2 rounded border shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] focus:outline-none focus:ring-1 focus:ring-white bg-transparent"
              disabled={isVerifying}
              autoFocus
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleBackToSelection}
                className="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] hover:scale-105 transition-scale duration-300"
                disabled={isVerifying}
              >
                Back
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-gray-100 text-black rounded shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] hover:scale-105 transition-scale duration-300"
                disabled={isVerifying || !password.trim()}
              >
                {isVerifying ? "Verifying..." : "Login"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
