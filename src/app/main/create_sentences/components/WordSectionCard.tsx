"use client";

import { useMemo } from "react";

type Tone = "blue" | "orange";

type Props = {
  title: string;
  tone: Tone;
  description: string;
  value: string;
  onChange: (newValue: string) => void;
};

export default function WordSectionCard({
  title,
  tone,
  description,
  value,
  onChange,
}: Props) {
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
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent opacity-40" />

      <div
        className={[
          "relative w-full text-left",
          "px-7 pb-5 pt-5",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          toneStyle.ring,
        ].join(" ")}
      >
        <div>
          <h3 className="text-[22px] font-extrabold tracking-tight text-slate-900">
            {title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-slate-700/90">
            {description}
          </p>
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
              <input
                type="text"
                placeholder="예문 작성해보세요"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent text-[15px] font-semibold leading-relaxed text-slate-800/90 placeholder:text-slate-500 outline-none"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
