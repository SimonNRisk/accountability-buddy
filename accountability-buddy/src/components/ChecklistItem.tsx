"use client";

import { Activity } from "@/types/activityTypes";

export const ChecklistItem = ({ id, title, completed, onToggle }: Activity) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      ></input>
      <span className={completed ? "line-through" : ""}>{title}</span>
    </li>
  );
};
