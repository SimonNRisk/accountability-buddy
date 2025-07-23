"use client";

import { ChecklistItem } from "@/components/ChecklistItem";
import { dailyActivities } from "@/lib/constants";
import { useChecklistItem } from "@/hooks/useChecklistItem";

export default function Home() {
  const { items, toggleItem } = useChecklistItem(dailyActivities);
  return (
    <ul>
      {items.map((item) => (
        <ChecklistItem
          key={item.id}
          id={item.id}
          title={item.title}
          completed={item.completed}
          onToggle={toggleItem}
        />
      ))}
    </ul>
  );
}
