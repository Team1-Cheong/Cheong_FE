"use client";

import { useId, useMemo, useState } from "react";

type Tone = "blue" | "orange";

type Props = {
  title: string;
  tone?: Tone;

  meaning?: string;

  userSentence: string;
  aiEvaluation: string;
  aiSentences: string[];
};

export default function WordCard({
  title,
  tone = "blue",

  meaning = "",

  userSentence,
  aiEvaluation,
  aiSentences,
}: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const toneStyle = useMemo(() => {
    if (tone === "blue") {
      return {
        cardBg: "from-[#EAF2FF] via-[#DCE9FF] to-[#D6E6FF]",
        ring: "ring-[#5A8BFF]/20",
      };
    }
    return {
      cardBg: "from-[#FFF0EA] via-[#FFE2D7] to-[#FFD6C6]",
      ring: "ring-[#FF8A5C]/20",
    };
  }, [tone]);

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-3xl",
        "bg-gradient-to-b",
        toneStyle.cardBg,
        "shadow-[0_10px_28px_rgba(15,23,42,0.10)]",
        "ring-1 ring-white/50",
        "transition-all duration-300",
        open
          ? "shadow-[0_16px_40px_rgba(15,23,42,0.16)]"
          : "hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.14)]",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={[
          "relative w-full text-left",
          "px-7 pb-5 pt-5",
          "outline-none",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          toneStyle.ring,
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[22px] font-extrabold tracking-tight text-slate-900">
              {title}
            </h3>

            {meaning && (
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-700/90">
                {meaning}
              </p>
            )}
          </div>

          <span
            className={[
              "mt-0.5 grid h-8 w-8 place-items-center rounded-xl",
              "bg-white/70 ring-1 ring-slate-200",
              "shadow-[0_6px_14px_rgba(15,23,42,0.10)]",
              "transition-transform duration-300",
              open ? "rotate-180" : "",
            ].join(" ")}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 8l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="mt-4">
          <div
            className={[
              "relative overflow-hidden rounded-2xl",
              "bg-white/45 backdrop-blur-md",
              "ring-1 ring-white/50",
              "shadow-[0_8px_20px_rgba(15,23,42,0.06)]",
              "px-6 py-4",
            ].join(" ")}
          >
            <div className="flex gap-3">
              <div className="w-1 shrink-0 rounded-full bg-slate-900/20" />
              <p className="text-[15px] font-semibold leading-relaxed text-slate-800/90 whitespace-pre-wrap line-clamp-3">
                {userSentence}
              </p>
            </div>
          </div>
        </div>
      </button>

      {open && (
        <div className="px-7">
          <div className="h-px w-full bg-slate-400/40" />
        </div>
      )}

      <div
        id={panelId}
        className={[
          "relative px-7 pb-6 pt-5",
          "transition-[max-height,opacity] duration-300 ease-out",
          open ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0",
          "overflow-hidden",
        ].join(" ")}
      >
        <div className="rounded-3xl bg-white/75 backdrop-blur-sm p-5 ring-1 ring-white/60 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
          <h4 className="text-[18px] font-extrabold text-slate-900">한줄평</h4>

          <p className="mt-1.5 text-[14px] font-semibold leading-relaxed text-slate-700/90">
            {aiEvaluation}
          </p>

          <h5 className="mt-4 text-[16px] font-extrabold text-slate-900">
            AI 추천 예문
          </h5>

          <ul className="mt-3 space-y-2 text-[14px] font-semibold text-slate-700/90">
            {aiSentences.map((s, idx) => (
              <li key={`${s}-${idx}`} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500/70" />
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
