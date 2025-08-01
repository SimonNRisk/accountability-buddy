import { Activity } from "@/types/activityTypes";

export const sortItemsAlphabetically = (items: Activity[]) => {
  const sortedItems = items.sort((a, b) => a.title.localeCompare(b.title));
  return sortedItems;
};
