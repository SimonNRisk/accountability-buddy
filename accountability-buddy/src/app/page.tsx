"use client";

import { ChecklistItem } from "@/components/ChecklistItem";
import { dailyActivities } from "@/lib/constants";

export default function Home() {
  return (
    <ul>
      {dailyActivities.map((activity) => (
        <ChecklistItem
          key={activity.id}
          id={activity.id}
          title={activity.title}
          completed={activity.completed}
          onToggle={(id) => console.log(id)}
        />
      ))}
    </ul>
  );
}
