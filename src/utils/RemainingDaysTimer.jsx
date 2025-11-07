import { useEffect, useState } from "react";
import { differenceInDays, parseISO } from "date-fns";

const RemainingDaysTimer = ({ startDate, endDate }) => {
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const updateDays = () => {
      const today = parseISO(startDate);
      const end = parseISO(endDate);
      const diff = differenceInDays(end, today);
      setDaysLeft(Math.max(diff, 0));
    };

    console.log(daysLeft);

    updateDays();
    const interval = setInterval(updateDays, 1000 * 60 * 60); // оновлення щогодини

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div
      style={{
        color: daysLeft === null ? "#d32f2f" : "inherit",
      }}
    >
      {daysLeft === null
        ? "Абонемент завершено"
        : `${daysLeft} дн${daysLeft === 1 ? "ь" : "і"}`}
    </div>
  );
};

export default RemainingDaysTimer;
