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

  useEffect(() => {
    const mode = getLoginMode();
    if (!mode) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, []);

  if (isChecking) return null;

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const { items, toggleItem, completedItems } = useChecklist();
  console.log(completedItems);

  const onClose = () => setShowAddItemModal(false);

  return (
    <>
      <Header />
      <button
        type="button"
        onClick={() => setShowAddItemModal(true)}
        className="text-xl px-2 cursor-pointer"
      >
        <Plus />
      </button>

      <Checklist items={items} onToggle={toggleItem} />
      {showAddItemModal && <AddItemModal onClose={onClose} />}
    </>
  );
}
