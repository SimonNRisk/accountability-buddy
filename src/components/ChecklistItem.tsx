"use client";
import { useState } from "react";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { X } from "lucide-react";

import { docRef } from "@/lib/firebase";

type ChecklistItemProps = {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number, newCompleted: boolean) => void;
};

export function ChecklistItem({
  id,
  title,
  completed,
  onToggle,
}: ChecklistItemProps) {
  const [showListItemAction, setShowListItemActions] = useState(false);

  const removeItem = async () => {
    try {
      await updateDoc(docRef, {
        [title]: deleteField(),
      });
      console.log(`Deleted item: ${title}`);
    } catch (error) {
      console.error("Unable to delete activity", error);
    }
  };

  return (
    <li
      className="flex items-center gap-x-2"
      onMouseEnter={() => setShowListItemActions(true)}
      onMouseLeave={() => setShowListItemActions(false)}
    >
      <button
        className={`transition-opacity duration-300 ${
          showListItemAction
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={removeItem}
        aria-label={`Remove ${title}`}
      >
        <X />
      </button>

      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, !completed)}
        className="mr-2"
      />
      <span className={completed ? "line-through" : ""}>{title}</span>
    </li>
  );
}
