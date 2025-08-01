import { ChecklistItem } from "@/components/ChecklistItem";
import { sortItemsAlphabetically } from "@/util/itemsSorting";
import { Activity } from "@/types/activityTypes";

type ChecklistProps = {
  items: Activity[];
  onToggle: (id: number, newCompleted: boolean) => void;
};

export const Checklist = ({ items, onToggle }: ChecklistProps) => {
  const sortedItems = sortItemsAlphabetically(items);

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
