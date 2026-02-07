"use client";

import { useState } from "react";

interface HistoryItem {
  id: number;
  word: string;
  date: string;
  color: "blue" | "orange";
}

export const HistoryPage = () => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(25);
  const [currentMonth, setCurrentMonth] = useState(7);
  const [currentYear, setCurrentYear] = useState(2025);

  const historyItems: HistoryItem[] = [
    { id: 1, word: "단어 1", date: "2026.02.07", color: "blue" },
    { id: 2, word: "단어 2", date: "2026.02.07", color: "blue" },
    { id: 3, word: "단어 3", date: "2026.02.06", color: "orange" },
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="w-full bg-slate-50 text-slate-900 flex flex-col">
      <main className="flex px-8 py-4">
        <div className="mx-auto w-full max-w-6xl">
          {/* 제목 및 설명 */}
          <div className="mb-8 space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">
              예문 만든 이력 모아 보기
            </h1>
            <p className="text-base text-slate-600">
              날짜별로 예문을 만든 이력이에요!
            </p>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* 좌측 캘린더 */}
            <div className="lg:col-span-1 rounded-lg bg-white p-6 shadow-sm">
              {/* 월 네비게이션 */}
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={handlePrevMonth}
                  className="hover:text-indigo-500 transition"
                >
                  &lt;
                </button>
                <span className="text-sm font-semibold text-slate-900">
                  {currentYear}년 {String(currentMonth).padStart(2, "0")}월
                </span>
                <button
                  onClick={handleNextMonth}
                  className="hover:text-indigo-500 transition"
                >
                  &gt;
                </button>
              </div>

              {/* 요일 헤더 */}
              <div className="mb-2 grid grid-cols-7 gap-1 text-center">
                {dayLabels.map((label) => (
                  <div
                    key={label}
                    className="text-xs font-semibold text-slate-600 py-2"
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* 날짜 그리드 */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && setSelectedDate(day)}
                    className={`aspect-square rounded-lg py-2 text-xs font-medium transition ${
                      day === null
                        ? "bg-transparent"
                        : day === selectedDate
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* 우측 콘텐츠 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 현재 날짜 */}
              <div className="text-right">
                <p className="text-2xl font-bold text-indigo-500">
                  {currentDate.getFullYear()}.
                  {String(currentDate.getMonth() + 1).padStart(2, "0")}.
                  {String(currentDate.getDate()).padStart(2, "0")}
                </p>
              </div>

              {/* 예문 카드 리스트 */}
              <div className="space-y-4">
                {historyItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg p-6 space-y-3 ${
                      item.color === "blue"
                        ? "bg-blue-50"
                        : item.color === "orange"
                          ? "bg-orange-50"
                          : "bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-slate-900">
                        {item.word}
                      </h3>
                      <p className="text-xs text-slate-600">{item.date}</p>
                    </div>

                    {/* 내용 박스 */}
                    <div className="rounded-lg bg-white p-4 min-h-20 flex items-center justify-center">
                      <p className="text-sm text-slate-400">
                        예문 내용이 표시됩니다
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
