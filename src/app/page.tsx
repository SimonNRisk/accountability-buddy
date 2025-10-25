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
    <>
      <Header />
      {isEditor && (
        <button
          type="button"
          onClick={() => setShowAddItemModal(true)}
          className="text-xl px-2 cursor-pointer mx-2 mt-4"
        >
          <Plus />
        </button>
      )}

      <Checklist items={sortedItems} onToggle={toggleItem} isEditor={isEditor} />
      {showAddItemModal && <AddItemModal onClose={onClose} />}
    </>
  );
}
