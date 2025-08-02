"use client";

import { useChecklist } from "@/hooks/useChecklist";
import { useTimeLeft } from "@/hooks/useTimeLeft";

export const Header = () => {
  const { items, completedItems } = useChecklist();
  const { timeLeft } = useTimeLeft();
  return (
    <div className="sticky top-0 shadow-z-50">
      <div className="flex flex-row justify-between border-b">
        <p>
          {completedItems.length}/{items.length} items completed.
        </p>
        <p>
          TODO: PROGRESS BAR {(completedItems.length / items.length).toFixed(2)}
        </p>
        <p>Time left today: {timeLeft}</p>
      </div>
    </div>
  );
};
