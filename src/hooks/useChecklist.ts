import { useEffect, useState } from "react";
import { getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { docRef } from "@/lib/firebase";

type Activity = {
  id: number;
  title: string;
  completed: boolean;
};

export const useChecklist = () => {
  const [items, setItems] = useState<Activity[]>([]);

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

      const activityArray: Activity[] = Object.entries(data).map(
        ([title, completed], index) => ({
          id: index,
          title,
          completed: Boolean(completed),
        })
      );

      setItems(activityArray);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const toggleItem = async (id: number, newCompleted: boolean) => {
    // Update local state immediately (optimistic UI)
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: newCompleted } : item
      )
    );

    // Find the item to update
    const toggledItem = items.find((item) => item.id === id);
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
  const addItem = async (title: string) => {
    const trimmedTitle = title.trim();
    if (trimmedTitle === "") return;

    try {
      await updateDoc(docRef, {
        [trimmedTitle]: false,
      });
      console.log("Added new item:", trimmedTitle);
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  return { items, toggleItem, addItem };
};
