"use client";

type ChecklistItemProps = {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
};

export function ChecklistItem({
  id,
  title,
  completed,
  onToggle,
}: ChecklistItemProps) {
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
}
