import { useEffect, useState } from "react";
import { getDoc, onSnapshot } from "firebase/firestore";
import { docRef } from "@/lib/firebase";
import { Activity } from "@/types/activityTypes";
import { sortItemsAlphabetically } from "@/util/itemsSorting";

export const useChecklist = () => {
  const [items, setItems] = useState<Activity[]>([]);

  useEffect(() => {
    getDoc(docRef)
      .then((doc) => {
        const data = doc.data();
        console.log(data);
        if (!data) return;

        const activityArray: Activity[] = Object.entries(data).map(([title, completed], index) => ({
          id: index,
          title,
          completed: Boolean(completed),
        }));

        setItems(activityArray);
      })
      .catch((err) => {
        console.log("Error during getDoc:", err.message);
      });

    // Real-time updates
    const unsubscribe = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      console.log(data);
      if (!data) return;

      const activityArray: Activity[] = Object.entries(data).map(([title, completed], index) => ({
        id: index,
        title,
        completed: Boolean(completed),
      }));

      setItems(activityArray);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const toggleItem = async (id: number, newCompleted: boolean) => {
    // Update local state immediately (optimistic UI)
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, completed: newCompleted } : item)));

    // Find the item to update
    const toggledItem = items.find((item) => item.id === id);
    if (!toggledItem) return;

    // Use API route instead of direct Firestore
    try {
      const response = await fetch("/api/toggle-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: localStorage.getItem("auth_password"), // We'll need to store this
          item: toggledItem.title,
          status: newCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      console.log(`Item updated via API: ${toggledItem.title} = ${newCompleted}`);
    } catch (error) {
      console.error("Error updating item:", error);
      // Revert optimistic update on error
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !newCompleted } : item)));
    }
  };
  const addItem = async (title: string) => {
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") return;

    try {
      const response = await fetch("/api/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: localStorage.getItem("auth_password"),
          item: trimmedTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      console.log("Added new item via API:", trimmedTitle);
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  const completedItems = items.filter((item) => {
    return item.completed;
  });

  const sortedItems = sortItemsAlphabetically(items);

  return { items, toggleItem, addItem, completedItems, sortedItems };
};
