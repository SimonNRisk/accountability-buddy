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
    <div className="sticky top-0">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-row justify-between items-center py-4 border-b-2 border-gray-700">
          {isDesktop ? (
            <>
              <p className="font-semibold text-white">
                {completedItems.length}/{items.length} items completed.
              </p>
              <p className="font-semibold text-white">Time left today: {timeLeft}</p>
            </>
          ) : (
            <div className="flex flex-1 items-center">
              <div className="w-2/3 bg-gray-700 h-2 rounded">
                <div
                  className="bg-white h-2 rounded transition-all duration-300"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          )}
          <button
            className="cursor-pointer px-4 py-2 font-semibold border-2 border-gray-600 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
