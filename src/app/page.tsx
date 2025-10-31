"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Checklist } from "@/components/Checklist";
import { useChecklist } from "@/hooks/useChecklist";
import { AddItemModal } from "@/components/AddItemModal";
import { Header } from "@/components/Header";
import { getLoginMode } from "@/lib/loginMode";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const { sortedItems, toggleItem } = useChecklist();
  const [loginMode, setLoginMode] = useState<"viewer" | "editor" | null>(null);

  useEffect(() => {
    const mode = getLoginMode();
    if (!mode) {
      router.push("/login");
    } else {
      setLoginMode(mode);
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) return null;

  const onClose = () => setShowAddItemModal(false);
  const isEditor = loginMode === "editor";

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {isEditor && (
          <div className="flex justify-center mb-6">
            <button type="button" onClick={() => setShowAddItemModal(true)} className="text-xl px-4 py-2 cursor-pointer bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors duration-300">
              <Plus className="inline mr-2" />
              Add Item
            </button>
          </div>
        )}

        <Checklist items={sortedItems} onToggle={toggleItem} isEditor={isEditor} />
      </div>
      {showAddItemModal && <AddItemModal onClose={onClose} />}
      <div className="flex justify-center">
        <span>
          Made by{" "}
          <a href="https://simonsportfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline">
            Simon Risk
          </a>
        </span>
      </div>
    </div>
  );
}
