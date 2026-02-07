"use client";

import CalendarView from "../main/history/components/CalendarView";
import WordCard from "../main/history/components/WordCard";

type Today = { year: number; month: number; day: number };

type Props = {
  year: number;
  month: number;
  selectedDay: number;
  onChangeDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  today: Today;
};

const formatDate = (y: number, m: number, d: number) =>
  `${y}. ${String(m).padStart(2, "0")}. ${String(d).padStart(2, "0")}`;

export default function HistoryPage(props: Props) {
  const { year, month, selectedDay } = props;

  return (
    <div className="mx-auto max-w-[1420px] px-6 sm:px-10 lg:px-20 xl:px-28 py-10">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-[40px] font-bold tracking-tight text-slate-900">
            예문 만든 이력
          </h1>
          <p className="mt-2 text-[15px] text-slate-500">
            날짜를 선택하면 해당 날짜의 예문 카드가 표시됩니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[16px] font-semibold text-slate-800">
              캘린더
            </div>
            <div className="sm:hidden text-[16px] font-bold text-[#5A8DEE]">
              {formatDate(year, month, selectedDay)}
            </div>
          </div>
          <CalendarView {...props} />
        </section>

        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[16px] font-semibold text-slate-800">
              선택한 날짜의 예문
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 ring-1 ring-slate-200 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#5A8DEE]" />
              <span className="text-[15px] font-bold text-[#5A8DEE]">
                {formatDate(year, month, selectedDay)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <WordCard title="단어 1" tone="blue" />
            <WordCard title="단어 2" tone="blue" />
            <WordCard title="단어 3" tone="orange" />
          </div>
        </section>
      </div>
    </div>
  );
}
