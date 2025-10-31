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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-51 flex items-center justify-center backdrop-blur-xs">
      <div className="flex flex-col justify-center items-center gap-y-8 bg-black p-8 border border-white rounded-lg shadow-[0_0_20px_4px_rgba(255,255,255,0.4)]">
        <h4>Add a new activity to your daily checklist</h4>
        <form className="flex flex-row w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <input
              className="text-white px-2 py-1 rounded border shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="Play badminton"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer p-2 border rounded-lg shadow-[0_0_20px_4px_rgba(255,255,255,0.4)] mx-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer p-2 border rounded-lg shadow-[0_0_20px_4px_rgba(255,255,255,0.4)]"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
