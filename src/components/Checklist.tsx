import { ChecklistItem } from "@/components/ChecklistItem";
import { Activity } from "@/types/activityTypes";

type ChecklistProps = {
  items: Activity[];
  onToggle: (id: number, newCompleted: boolean) => void;
  isEditor: boolean;
};

export const Checklist = ({ items, onToggle, isEditor }: ChecklistProps) => {
  return (
    <ul className="m-2">
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
  );
};
