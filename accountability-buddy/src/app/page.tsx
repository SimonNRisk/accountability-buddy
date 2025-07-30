"use client";
import { useEffect, useState } from "react";
import { getDoc, onSnapshot, updateDoc } from "firebase/firestore";

import { ChecklistItem } from "@/components/ChecklistItem";
import { docRef } from "@/lib/firebase";
import { sortItemsAlphabetically } from "@/util/itemsSorting";

type Activity = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [inputVisible, setInputVisible] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [fetchedActivities, setFetchedActivities] = useState<Activity[]>([]);

  useEffect(() => {
    getDoc(docRef)
      .then((doc) => {
        const data = doc.data();
        console.log(data);
        if (!data) return;

        const activityArray: Activity[] = Object.entries(data).map(
          ([title, completed], index) => ({
            id: index,
            title,
            completed: Boolean(completed),
          })
        );

        setFetchedActivities(activityArray);
      })
      .catch((err) => {
        console.log("Error during getDoc:", err.message);
      });

    // Real-time updates
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      console.log(data);
      if (!data) return;

      const activityArray: Activity[] = Object.entries(data).map(
        ([title, completed], index) => ({
          id: index,
          title,
          completed: Boolean(completed),
        })
      );

      setFetchedActivities(activityArray);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const toggleItem = async (id: number, newCompleted: boolean) => {
    // Update local state immediately (optimistic UI)
    setFetchedActivities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: newCompleted } : item
      )
    );

    // Find the item to update
    const toggledItem = fetchedActivities.find((item) => item.id === id);
    if (!toggledItem) return;

    // Update Firestore
    try {
      await updateDoc(docRef, {
        [toggledItem.title]: newCompleted,
      });
      console.log(`Firestore updated: ${toggledItem.title} = ${newCompleted}`);
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  const items = sortItemsAlphabetically(fetchedActivities);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItemTitle.trim() === "") return;

    console.log("Submitted", newItemTitle);

    // TODO: Send new item to Firebase here

    setNewItemTitle("");
    setInputVisible(false);
  };

  return (
    <>
      <form className="flex flex-row" onSubmit={handleSubmit}>
        {inputVisible ? (
          <>
            <input
              className="bg-white text-black px-2 py-1 rounded"
              placeholder="Enter an activity"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setInputVisible(false)}
              className="text-xl px-2 cursor-pointer"
            >
              -
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setInputVisible(true)}
            className="text-xl px-2 cursor-pointer"
          >
            +
          </button>
        )}
      </form>

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
    </>
  );
}
