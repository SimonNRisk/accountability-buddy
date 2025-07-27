"use client";
import { getDocs } from "firebase/firestore";

import { ChecklistItem } from "@/components/ChecklistItem";
import { dailyActivities } from "@/lib/constants";
import { useChecklistItem } from "@/hooks/useChecklistItem";
import { colRef } from "@/lib/firebase";

export default function Home() {
  getDocs(colRef).then((snapshot) => {
    console.log(snapshot.docs[0].data());
  });
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
