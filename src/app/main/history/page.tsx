"use client";

import { useEffect, useMemo, useState } from "react";
import HistoryPage from "../../component/HistoryPage";
import type { HomeApiResponse } from "../history/types";
import { USER_ID } from "@/constants/user";

type Today = { year: number; month: number; day: number };

export default function Page() {
  const today: Today = useMemo(() => {
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

  const [home, setHome] = useState<HomeApiResponse | null>(null);
  const [homeError, setHomeError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setHomeError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/home?userId=${USER_ID}`,
          {
            method: "GET",
            signal: ac.signal,
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          },
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = (await res.json()) as HomeApiResponse;
        setHome(data);
      } catch (e) {
        if ((e as { name?: string }).name === "AbortError") return;
        setHomeError("홈 데이터를 불러오지 못했어요.");
        setHome(null);
      }
    })();

    return () => ac.abort();
  }, []);

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
      home={home}
      homeError={homeError}
      solvedDays={home?.studiedDates ?? []}
    />
  );
}
