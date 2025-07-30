"use client";
import { useState } from "react";
import { getDoc, onSnapshot } from "firebase/firestore";

//TODO: ability to add item, send it to firebase

import { ChecklistItem } from "@/components/ChecklistItem";
import { dailyActivities } from "@/lib/constants";
import { useChecklistItem } from "@/hooks/useChecklistItem";
import { docRef } from "@/lib/firebase";

export default function Home() {
  const [inputVisible, setInputVisible] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newItemTitle.trim() === "") return;

    console.log("Submitted", newItemTitle);

    //TODO send new item to firebase

    setNewItemTitle("");
    setInputVisible(false);
  };

  const { items, toggleItem } = useChecklistItem(dailyActivities);
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
