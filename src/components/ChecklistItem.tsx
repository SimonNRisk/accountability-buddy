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
      className="flex flex-row justify-between items-center bg-black py-2 my-2 rounded-lg w-full"
      onMouseEnter={() => setShowListItemActions(true)}
      onMouseLeave={() => setShowListItemActions(false)}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id, !completed)}
          className="mr-2 h-10 w-10 appearance-none rounded-md transition-all border-2 bg-black border-gray-400 checked:bg-green-500 checked:border-green-700 hover:scale-105 cursor-pointer"
        />
        <span className={completed ? "line-through" : ""}>{title}</span>
      </div>

      <button
        className={`transition-opacity duration-300 justify-end ${
          showListItemAction
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={removeItem}
        aria-label={`Remove ${title}`}
      >
        <X />
      </button>
    </li>
  );
}
