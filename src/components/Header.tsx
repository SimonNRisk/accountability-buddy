"use client";

import { useChecklist } from "@/hooks/useChecklist";
import { useTimeLeft } from "@/hooks/useTimeLeft";
import { useRouter } from "next/navigation";
import { clearLoginMode } from "@/lib/loginMode";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export const Header = () => {
  const { items, completedItems } = useChecklist();
  const { timeLeft } = useTimeLeft();
  const router = useRouter();
  const isDesktop = useIsDesktop();

  const logout = () => {
    clearLoginMode();
    router.push("/login");
  };

  const progress = items.length > 0 ? completedItems.length / items.length : 0;

  return (
    <div className="sticky top-0 shadow-z-50 shadow-[0_0_20px_4px_rgba(255,255,255,0.4)]">
      <div className="flex flex-row justify-between border-b-2">
        {isDesktop ? (
          <>
            <p className="p-2 font-semibold">
              {completedItems.length}/{items.length} items completed.
            </p>
            <p className="p-2 font-semibold">Time left today: {timeLeft}</p>
          </>
        ) : (
          <div className="flex flex-1 items-center ml-4">
            <div className="w-2/3 bg-gray-700 h-2 rounded">
              <div
                className="bg-white h-2 rounded transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}
        <button
          className="cursor-pointer p-2 font-semibold border-2 border-gray-600 rounded-lg"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
