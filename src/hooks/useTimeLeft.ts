import { useState, useEffect } from "react";

import { getTimeLeft } from "@/util/time";

export const useTimeLeft = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return { timeLeft };
};
