"use client";

import { useEffect, useMemo } from "react";

export type Today = {
  year: number;
  month: number;
  day: number;
};

type Props = {
  year: number;
  month: number;
  selectedDay: number;
  onChangeDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  today: Today;
};

const pad2 = (n: number) => String(n).padStart(2, "0");

const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

const CAL_GRID_H = 560;

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();

export default function CalendarView({
  year,
  month,
  selectedDay,
  onChangeDay,
  onPrevMonth,
  onNextMonth,
  today,
}: Props) {
  const { cells, daysInMonth, weeksCount } = useMemo(() => {
    const dim = getDaysInMonth(year, month);
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

  const isFutureDate = (day: number) => {
    if (year > today.year) return true;
    if (year < today.year) return false;
    if (month > today.month) return true;
    if (month < today.month) return false;
    return day > today.day;
  };

  useEffect(() => {
    if (selectedDay > daysInMonth) {
      onChangeDay(daysInMonth);
      return;
    }

    const viewingFutureMonth =
      year > today.year || (year === today.year && month > today.month);

    if (viewingFutureMonth) {
      onChangeDay(today.day);
      return;
    }

    if (isThisMonth && selectedDay > today.day) {
      onChangeDay(today.day);
    }
  }, [
    selectedDay,
    daysInMonth,
    year,
    month,
    today.year,
    today.month,
    today.day,
    isThisMonth,
    onChangeDay,
  ]);

  const nextDisabled = isThisMonth;

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
            rowGap: "20px",
          }}
        >
          {cells.map((day, idx) => {
            if (day === null) {
              return <div key={idx} className="mx-auto h-10 w-10 opacity-0" />;
            }

            const future = isFutureDate(day);
            const isSelected = day === selectedDay;

            return (
              <button
                key={idx}
                type="button"
                disabled={future}
                onClick={() => onChangeDay(day)}
                className={[
                  "mx-auto grid h-10 w-10 place-items-center rounded-full text-[14px] font-semibold transition",
                  future ? "cursor-not-allowed text-slate-300" : "",
                  isSelected
                    ? "bg-[#586BFF] text-white shadow-[0_6px_18px_rgba(88,107,255,0.35)]"
                    : future
                      ? "bg-transparent"
                      : "text-slate-700 hover:bg-slate-100",
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
