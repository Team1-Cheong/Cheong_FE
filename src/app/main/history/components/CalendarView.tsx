"use client";

import { useEffect, useMemo } from "react";

type Today = { year: number; month: number; day: number };

type Props = {
  year: number;
  month: number;
  selectedDay: number;
  onChangeDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  today?: Today;
  solvedDays?: string[];
};

const pad2 = (n: number) => String(n).padStart(2, "0");
const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

const CAL_GRID_H = 560;

const toIso = (y: number, m: number, d: number) => `${y}-${pad2(m)}-${pad2(d)}`;

const streakToneClasses = [
  "bg-[#E8EDFF] text-[#5A8DEE]",
  "bg-[#D3DBFF] text-[#4A63FF]",
  "bg-[#BDC8FF] text-[#3E54E8]",
  "bg-[#A3B3FF] text-white",
  "bg-[#7E90FF] text-white",
];

export default function CalendarView({
  year,
  month,
  selectedDay,
  onChangeDay,
  onPrevMonth,
  onNextMonth,
  solvedDays = [],
  today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  },
}: Props) {
  const { cells, daysInMonth, weeksCount } = useMemo(() => {
    const dim = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();

    const total = firstDay + dim;
    const wc = Math.ceil(total / 7);

    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= dim; d++) arr.push(d);

    while (arr.length < wc * 7) arr.push(null);

    return { cells: arr, daysInMonth: dim, weeksCount: wc };
  }, [year, month]);

  const isThisMonth = year === today.year && month === today.month;
  const nextDisabled = isThisMonth;

  useEffect(() => {
    if (selectedDay > daysInMonth) onChangeDay(daysInMonth);

    const viewingFuture =
      year > today.year || (year === today.year && month > today.month);

    if (viewingFuture) onChangeDay(today.day);
    else if (isThisMonth && selectedDay > today.day) onChangeDay(today.day);
  }, [daysInMonth, year, month, selectedDay, today, isThisMonth, onChangeDay]);

  const isFutureDate = (day: number) => {
    if (year > today.year) return true;
    if (year < today.year) return false;
    if (month > today.month) return true;
    if (month < today.month) return false;
    return day > today.day;
  };

  const solvedSet = useMemo(() => new Set(solvedDays), [solvedDays]);

  const streakToneMap = useMemo(() => {
    const keys: string[] = [];
    const cursor = new Date(today.year, today.month - 1, today.day);

    while (true) {
      const key = toIso(
        cursor.getFullYear(),
        cursor.getMonth() + 1,
        cursor.getDate(),
      );
      if (!solvedSet.has(key)) break;

      keys.push(key);
      cursor.setDate(cursor.getDate() - 1);
    }

    if (keys.length < 2) return new Map<string, string>();

    const map = new Map<string, string>();

    const recent5OldestToNewest = keys.slice(0, 5).reverse();
    recent5OldestToNewest.forEach((key, idx) => {
      map.set(key, streakToneClasses[idx]);
    });

    const beyond5 = keys.slice(5);
    beyond5.forEach((key) => {
      map.set(key, streakToneClasses[4]);
    });

    return map;
  }, [solvedSet, today]);

  return (
    <div className="rounded-2xl bg-white/70 shadow-[0_6px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
      <div className="px-8 pb-8 pt-6">
        <div className="mb-6 flex items-center justify-center gap-5 text-slate-700">
          <button
            type="button"
            onClick={onPrevMonth}
            className="rounded-md px-2 py-1 text-xl hover:bg-slate-100"
          >
            &lt;
          </button>

          <div className="text-[14px] font-semibold">
            {year}년 {pad2(month)}월
          </div>

          <button
            type="button"
            onClick={onNextMonth}
            disabled={nextDisabled}
            className={[
              "rounded-md px-2 py-1 text-xl transition",
              nextDisabled
                ? "cursor-not-allowed text-slate-300"
                : "hover:bg-slate-100",
            ].join(" ")}
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-[13px] font-semibold text-slate-400">
          {dayLabels.map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div
          className="mt-3 grid grid-cols-7 gap-x-2"
          style={{
            height: `${CAL_GRID_H}px`,
            gridTemplateRows: `repeat(${weeksCount}, minmax(0, 1fr))`,
            rowGap: "22px",
          }}
        >
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={idx} className="mx-auto h-10 w-10 opacity-0" />;
            }

            const future = isFutureDate(day);
            const isSelected = day === selectedDay;
            const iso = toIso(year, month, day);
            const streakClass = streakToneMap.get(iso);

            return (
              <button
                key={idx}
                type="button"
                disabled={future}
                onClick={() => onChangeDay(day)}
                className={[
                  "mx-auto grid h-10 w-10 place-items-center text-[14px] font-semibold transition",
                  future
                    ? "cursor-not-allowed text-slate-300"
                    : "text-slate-700",
                  isSelected
                    ? "rounded-full bg-[#586BFF] text-white shadow-[0_6px_18px_rgba(88,107,255,0.35)]"
                    : future
                      ? ""
                      : streakClass
                        ? `rounded-full ${streakClass}`
                        : "hover:text-slate-900",
                ].join(" ")}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
