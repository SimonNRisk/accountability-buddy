"use client";
import { useState } from "react";
import { doc, updateDoc, deleteField } from "firebase/firestore";
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
    <div
      className="flex flex-row gap-x-2"
      onMouseEnter={() => setShowListItemActions(true)}
      onMouseLeave={() => setShowListItemActions(false)}
    >
      <button
        className={`transition-opacity duration-400 ${
          showListItemAction ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => removeItem()}
      >
        x
      </button>

      <li>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id, !completed)}
        ></input>
        <span className={completed ? "line-through" : ""}>{title}</span>
      </li>
    </div>
  );
}
