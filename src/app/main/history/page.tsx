"use client";

import { useMemo, useState } from "react";
import HistoryPage from "../../component/HistoryPage";

export default function Page() {
  const today = useMemo(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
    };
  }, []);

  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);
  const [selectedDay, setSelectedDay] = useState(today.day);

  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();

  const onPrevMonth = () => {
    setMonth((prev) => {
      const nextMonth = prev === 1 ? 12 : prev - 1;
      const nextYear = prev === 1 ? year - 1 : year;

      setYear(nextYear);
      setSelectedDay((d) => Math.min(d, getDaysInMonth(nextYear, nextMonth)));

      return nextMonth;
    });
  };

  const onNextMonth = () => {
    if (year === today.year && month === today.month) return;

    setMonth((prev) => {
      const nextMonth = prev === 12 ? 1 : prev + 1;
      const nextYear = prev === 12 ? year + 1 : year;

      setYear(nextYear);
      setSelectedDay((d) => Math.min(d, getDaysInMonth(nextYear, nextMonth)));

      return nextMonth;
    });
  };

  return (
    <HistoryPage
      year={year}
      month={month}
      selectedDay={selectedDay}
      onChangeDay={setSelectedDay}
      onPrevMonth={onPrevMonth}
      onNextMonth={onNextMonth}
      today={today}
    />
  );
}
