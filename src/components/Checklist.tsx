import { ChecklistItem } from "@/components/ChecklistItem";
import { sortItemsAlphabetically } from "@/util/itemsSorting";

type Activity = {
  id: number;
  title: string;
  completed: boolean;
};

type ChecklistProps = {
  items: Activity[];
  onToggle: (id: number, newCompleted: boolean) => void;
};

export const Checklist = ({ items, onToggle }: ChecklistProps) => {
  const sortedItems = sortItemsAlphabetically(items);

  return (
    <ul>
      {items.map((item) => (
        <ChecklistItem
          key={item.id}
          id={item.id}
          title={item.title}
          completed={item.completed}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};
