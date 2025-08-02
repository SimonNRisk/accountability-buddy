"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Checklist } from "@/components/Checklist";
import { useChecklist } from "@/hooks/useChecklist";
import { AddItemModal } from "@/components/AddItemModal";
import { Header } from "@/components/Header";

export default function Home() {
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
