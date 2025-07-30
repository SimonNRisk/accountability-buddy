"use client";
import { useState } from "react";

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
        onClick={() => console.log("clicked")}
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
