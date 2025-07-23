export type Activity = {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
};
