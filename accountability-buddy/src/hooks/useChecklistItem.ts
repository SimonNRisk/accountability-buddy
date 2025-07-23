import { useState } from "react";

import { Activity } from "@/types/activityTypes";

export const useChecklistItem = (checklistItems: Activity[]) => {
  const [items, setItems] = useState(checklistItems);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  return { items, toggleItem };
};
