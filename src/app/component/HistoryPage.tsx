"use client";

import { USER_ID } from "@/constants/user";
import { useEffect, useMemo, useState } from "react";
import CalendarView from "../main/history/components/CalendarView";
import WordCard from "../main/history/components/WordCard";
import type {
  HomeApiResponse,
  ISODateString,
  HistoryApiResponse,
  HistoryItem,
} from "../main/history/types";

type Today = { year: number; month: number; day: number };

type Props = {
  year: number;
  month: number;
  selectedDay: number;
  onChangeDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  today: Today;
  solvedDays?: string[];

  home: HomeApiResponse | null;
  homeError: string | null;
};

const formatDate = (y: number, m: number, d: number) =>
  `${y}. ${String(m).padStart(2, "0")}. ${String(d).padStart(2, "0")}`;

const toIsoDate = (y: number, m: number, d: number): ISODateString =>
  `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` as ISODateString;

export default function HistoryPage(props: Props) {
  const { year, month, selectedDay, today, solvedDays, home } = props;

  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const ac = new AbortController();

    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/history?userId=${USER_ID}`,
          {
            method: "GET",
            signal: ac.signal,
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
          },
        );

        if (!res.ok) throw new Error();

        const data: HistoryApiResponse = await res.json();
        setHistory(data);
      } catch (e) {
        if ((e as { name?: string }).name === "AbortError") return;
        setHistory([]);
      }
    };

    fetchHistory();

    return () => ac.abort();
  }, []);

  const selectedIso = useMemo(
    () => toIsoDate(year, month, selectedDay),
    [year, month, selectedDay],
  );

  const historyByDate = useMemo(() => {
    const map = new Map<ISODateString, HistoryItem[]>();

    history.forEach((item) => {
      const iso = item.createdAt.slice(0, 10) as ISODateString;

      if (!map.has(iso)) map.set(iso, []);
      map.get(iso)!.push(item);
    });

    return map;
  }, [history]);

  const selectedHistory = historyByDate.get(selectedIso) ?? [];

  const selectedStudied = useMemo(() => {
    return selectedHistory.length > 0;
  }, [selectedHistory]);

  return (
    <div className="mx-auto max-w-[1420px] px-6 sm:px-10 lg:px-20 xl:px-28 py-10">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-[40px] font-bold tracking-tight text-slate-900">
            예문 만든 이력
          </h1>
          <p className="mt-2 text-[15px] text-slate-500">
            날짜를 선택하면 해당 날짜의 예문 카드가 표시됩니다.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="rounded-full bg-white/80 px-4 py-2 ring-1 ring-slate-200 shadow-sm">
              <span className="text-[14px] font-semibold text-slate-700">
                연속 학습{" "}
                <span className="font-bold text-indigo-600">
                  {home?.currentStreak ?? 0}일
                </span>
              </span>
            </div>

            <div className="rounded-full bg-white/80 px-4 py-2 ring-1 ring-slate-200 shadow-sm">
              <span className="text-[14px] font-semibold text-slate-700">
                오늘 완료{" "}
                <span className="font-bold text-indigo-600">
                  {home?.todayCompletedCount ?? 0}개
                </span>
              </span>
            </div>
          </div>
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

          <CalendarView {...props} solvedDays={solvedDays ?? []} />
        </section>

        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[16px] font-semibold text-slate-800">
              선택한 날짜의 예문
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 ring-1 ring-slate-200 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#5A8DEE]" />
              <span className="text-[15px] font-semibold text-slate-700">
                {formatDate(year, month, selectedDay)}
              </span>
              <span className="text-[13px] font-semibold text-slate-500">
                {selectedStudied ? "학습 완료" : "기록 없음"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {selectedHistory.length === 0 ? (
              <div className="text-sm text-slate-400">
                작성된 예문이 없습니다.
              </div>
            ) : (
              selectedHistory.map((item) => (
                <WordCard
                  key={item.id}
                  title={item.word}
                  userSentence={item.userSentence}
                  aiEvaluation={item.aiEvaluation}
                  aiSentences={item.aiSentences}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
