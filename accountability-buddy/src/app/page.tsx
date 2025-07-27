"use client";
import { getDoc, onSnapshot } from "firebase/firestore";

import { ChecklistItem } from "@/components/ChecklistItem";
import { dailyActivities } from "@/lib/constants";
import { useChecklistItem } from "@/hooks/useChecklistItem";
import { docRef } from "@/lib/firebase";

export default function Home() {
  getDoc(docRef)
    .then((doc) => {
      console.log(doc.data(), doc.id);
    })
    .catch((err) => {
      console.log(err.message);
    });

  onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
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
