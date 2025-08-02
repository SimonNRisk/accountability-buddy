import { Activity } from "@/types/activityTypes";
import { useChecklist } from "@/hooks/useChecklist";

export const Header = () => {
  const { items, completedItems } = useChecklist();
  return (
    <div className="sticky top-0 shadow-z-50">
      <div className="flex flex-row justify-between border-b">
        <p>
          {completedItems.length}/{items.length} items completed.
        </p>
        <p>TODO: PROGRESS BAR</p>
        <p>TODO: TIMER</p>
      </div>
    </div>
  );
};
