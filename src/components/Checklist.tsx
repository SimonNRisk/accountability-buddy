import { ChecklistItem } from "@/components/ChecklistItem";
import { Activity } from "@/types/activityTypes";

type ChecklistProps = {
  items: Activity[];
  onToggle: (id: number, newCompleted: boolean) => void;
};

export const Checklist = ({ items, onToggle }: ChecklistProps) => {
  return (
    <ul className="">
      {items.map((item) => (
        <ChecklistItem
          key={item.title}
          id={item.id}
          title={item.title}
          completed={item.completed}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};
