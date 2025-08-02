"use client";

import { useChecklist } from "@/hooks/useChecklist";
import { useTimeLeft } from "@/hooks/useTimeLeft";
import { useRouter } from "next/navigation";
import { clearLoginMode } from "@/lib/loginMode";

export const Header = () => {
  const { items, completedItems } = useChecklist();
  const { timeLeft } = useTimeLeft();
  const router = useRouter();

  const logout = () => {
    clearLoginMode;
    router.push("/login");
  };
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
        <button className="cursor-pointer" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
