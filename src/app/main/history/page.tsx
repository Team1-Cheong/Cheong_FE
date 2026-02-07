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

  const solvedDays = useMemo(() => {
    const streakDays = 5;
    const recent: { year: number; month: number; day: number }[] = [];

    for (let i = 0; i < streakDays; i += 1) {
      const date = new Date(today.year, today.month - 1, today.day - i);
      recent.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      });
    }

    const gapStart = new Date(today.year, today.month - 1, today.day - 9);
    const gapNext = new Date(today.year, today.month - 1, today.day - 10);

    return [
      ...recent,
      {
        year: gapStart.getFullYear(),
        month: gapStart.getMonth() + 1,
        day: gapStart.getDate(),
      },
      {
        year: gapNext.getFullYear(),
        month: gapNext.getMonth() + 1,
        day: gapNext.getDate(),
      },
    ];
  }, [today]);

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
      solvedDays={solvedDays}
    />
  );
}
