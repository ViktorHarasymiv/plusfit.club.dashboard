import { useEffect, useState } from "react";
import { differenceInDays, parseISO } from "date-fns";

const RemainingDaysTimer = ({ endDate }) => {
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const updateDays = () => {
      const today = new Date();
      const end = parseISO(endDate);
      const diff = differenceInDays(end, today);
      setDaysLeft(Math.max(diff, 0));
    };

    updateDays();
    const interval = setInterval(updateDays, 1000 * 60 * 60); // оновлення щогодини

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div
      style={{
        color: daysLeft === 0 ? "#d32f2f" : "inherit",
      }}
    >
      {daysLeft === 0
        ? "Абонемент завершено"
        : `${daysLeft} дн${daysLeft === 1 ? "ь" : "і"}`}
    </div>
  );
};

export default RemainingDaysTimer;
