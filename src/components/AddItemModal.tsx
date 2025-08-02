import { useState } from "react";
import { useChecklist } from "@/hooks/useChecklist";

type addItemModalProps = {
  onClose: () => void;
};

export const AddItemModal = ({ onClose }: addItemModalProps) => {
  const [newItemTitle, setNewItemTitle] = useState("");

  const { addItem } = useChecklist();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addItem(newItemTitle);
    setNewItemTitle("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
      <div className="flex flex-col justify-center gap-y-4 bg-black">
        <h4>Add a new activity to your daily checklist</h4>
        <form className="flex flex-row" onSubmit={handleSubmit}>
          <input
            className="bg-white text-black px-2 py-1 rounded"
            placeholder="Play badminton"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            autoFocus
          />
        </form>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
