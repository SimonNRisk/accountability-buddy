"use client";

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
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id, !completed)}
      ></input>
      <span className={completed ? "line-through" : ""}>{title}</span>
    </li>
  );
}
