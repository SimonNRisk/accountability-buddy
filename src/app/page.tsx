"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Checklist } from "@/components/Checklist";
import { useChecklist } from "@/hooks/useChecklist";

export default function Home() {
  const [inputVisible, setInputVisible] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");

  const { items, toggleItem, addItem } = useChecklist();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addItem(newItemTitle);
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
              <Minus />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setInputVisible(true)}
            className="text-xl px-2 cursor-pointer"
          >
            <Plus />
          </button>
        )}
      </form>

      <Checklist items={items} onToggle={toggleItem} />
    </>
  );
}
