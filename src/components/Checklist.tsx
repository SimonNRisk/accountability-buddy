import { ChecklistItem } from "@/components/ChecklistItem";
import { Activity } from "@/types/activityTypes";

type ChecklistProps = {
  items: Activity[];
  onToggle: (id: number, newCompleted: boolean) => void;
  isEditor: boolean;
};

export const Checklist = ({ items, onToggle, isEditor }: ChecklistProps) => {
  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <p className="text-lg">No items yet</p>
          <p className="text-sm">Add your first task to get started!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <ChecklistItem
              key={item.title}
              id={item.id}
              title={item.title}
              completed={item.completed}
              onToggle={onToggle}
              isEditor={isEditor}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
