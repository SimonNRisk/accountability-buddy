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
    clearLoginMode();
    router.push("/login");
  };
  return (
    <div className="sticky top-0 shadow-z-50 shadow-[0_0_20px_4px_rgba(255,255,255,0.4)]">
      <div className="flex flex-row justify-between border-b-2">
        <p className="p-2 font-semibold">
          {completedItems.length}/{items.length} items completed.
        </p>
        <p className="p-2 font-semibold">
          TODO: PROGRESS BAR {(completedItems.length / items.length).toFixed(2)}
        </p>
        <p className="p-2 font-semibold">Time left today: {timeLeft}</p>
        <button className="cursor-pointer p-2 font-semibold" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
