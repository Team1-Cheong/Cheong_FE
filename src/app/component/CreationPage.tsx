"use client";

import { useState, useEffect } from "react";
import { USER_ID } from "../../constants/user";
import WordSectionCard from "../main/create_sentences/components/WordSectionCard";

interface Word {
  id: string;
  word: string;
  meaning: string;
  review: boolean;
}

interface WordSection {
  id: string;
  title: string;
  description: string;
  value: string;
  review: boolean;
}

interface FeedbackData {
  id: number;
  sentiment: string;
  situations: string[];
}

export const CreationPage = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [studiedDays, setStudiedDays] = useState(10);

  const [wordSections, setWordSections] = useState<WordSection[]>([]);
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);

  const fetchWords = async (userId: string = USER_ID) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            "X-User-Id": userId,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.words && Array.isArray(data.words)) {
        const sections: WordSection[] = data.words.map((word: Word) => ({
          id: word.id,
          title: word.word,
          description: `뜻 설명 : ${word.meaning}`,
          value: "",
          review: word.review,
        }));
        setWordSections(sections);
      }
    } catch (error) {
      console.error("Error fetching words:", error);
      alert("단어를 불러오는 중 오류가 발생했습니다.");
      setWordSections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
    fetchStudiedDays();
  }, []);

  const saveSentences = async (userId: string = USER_ID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/evaluate/batch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            "X-User-Id": userId,
          },
          body: JSON.stringify({
            userSentences: wordSections.map((section) => ({
              word: section.title,
              sentence: section.value,
            })),
          }),
        },
      );

      const data = await response.json();

      if (data.feedbacks && Array.isArray(data.feedbacks)) {
        const updatedFeedbacks: FeedbackData[] = data.feedbacks.map(
          (fb: { feedback: string; examples: string[] }, index: number) => ({
            id: index + 1,
            sentiment: fb.feedback,
            situations: fb.examples,
          }),
        );
        setFeedbackData(updatedFeedbacks);
      }
    } catch (error) {
      console.error("Error saving sentences:", error);
      alert("예문을 저장하는 중 오류가 발생했습니다.");
    }
  };

  const fetchStudiedDays = async (userId: string = USER_ID) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/home`,
        {
          method: "GET",
          headers: {
            accept: "*/*",
            "X-User-Id": userId,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      setStudiedDays(data.currentStreak || 0);
      // Handle the data as needed
    } catch (error) {
      console.error("Error fetching studied days:", error);
    }
  };

  const handleInputChange = (id: string, newValue: string) => {
    setWordSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value: newValue } : s)),
    );
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await saveSentences();
      setShowFeedback(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGoBack = () => {
    setShowFeedback(false);
  };

  return (
    <div className="w-full bg-white text-slate-900 flex flex-col">
      <main className="flex flex-col items-center px-8 py-10">
        <div className="mb-10 w-full max-w-6xl">
          <h1 className="text-[40px] font-bold text-slate-900">
            {showFeedback ? "예문 피드백" : "예문 만들어보기!"}
          </h1>
          <p className="mt-2 text-[15px] text-slate-600">
            {showFeedback
              ? "AI가 예문에 대한 피드백을 제공했어요."
              : "주어진 단어를 활용해 예문을 만들어보세요."}
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-stretch">
          <section className="flex flex-col items-center justify-center space-y-6 lg:pr-12 lg:relative lg:after:absolute lg:after:top-0 lg:after:bottom-0 lg:after:right-0 lg:after:w-px lg:after:bg-slate-200">
            <div className="relative h-48 w-40">
              <img
                src="/streak.svg"
                alt="Streak"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="inline-flex rounded-full bg-indigo-100 px-6 py-2.5">
              <span className="text-sm font-semibold text-indigo-700">
                {studiedDays}일째 공부중
              </span>
            </div>
          </section>

          <section className="w-full space-y-6 lg:pl-12">
            {showFeedback ? (
              <>
                <div className="space-y-5">
                  {feedbackData.map((feedback, idx) => {
                    const section = wordSections[idx];
                    if (!section) return null;

                    const tone = idx % 2 === 0 ? "blue" : "orange";
                    const toneBg =
                      tone === "blue"
                        ? "from-[#EAF2FF] via-[#DCE9FF] to-[#D6E6FF]"
                        : "from-[#FFF0EA] via-[#FFE2D7] to-[#FFD6C6]";

                    return (
                      <div
                        key={feedback.id}
                        className={[
                          "group relative overflow-hidden rounded-3xl",
                          "bg-gradient-to-b",
                          toneBg,
                          "shadow-[0_10px_28px_rgba(15,23,42,0.10)]",
                          "ring-1 ring-white/50",
                        ].join(" ")}
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-white/10 to-transparent opacity-40" />

                        <div className="relative px-7 pb-6 pt-6 space-y-4">
                          <div>
                            <h3 className="text-[20px] font-extrabold tracking-tight text-slate-900">
                              {section.title}
                            </h3>
                            <p className="mt-1 text-[13px] leading-relaxed text-slate-700/90">
                              {section.description}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white/55 backdrop-blur-md ring-1 ring-white/50 shadow-[0_8px_20px_rgba(15,23,42,0.06)] px-5 py-4">
                            <p className="text-[14px] font-semibold text-slate-800/90">
                              {section.value || "예문이 비어 있어요."}
                            </p>
                          </div>

                          <div className="h-px w-full bg-slate-400/40" />

                          <div className="rounded-2xl bg-white/65 backdrop-blur-md ring-1 ring-white/50 shadow-[0_8px_20px_rgba(15,23,42,0.06)] px-5 py-4 space-y-2">
                            <h4 className="text-[18px] font-semibold text-slate-900">
                              한줄평
                            </h4>
                            <p className="text-[12px] text-slate-700">
                              {feedback.sentiment}
                            </p>
                            <h4 className="text-[16px] font-semibold text-slate-900">
                              AI 추천 예문
                            </h4>
                            <ul className="space-y-1">
                              {feedback.situations.map((situation, sidx) => (
                                <li
                                  key={`${feedback.id}-${sidx}`}
                                  className="text-[12px] text-slate-600 flex items-start"
                                >
                                  <span className="mr-2">•</span>
                                  <span>{situation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleGoBack}
                    className={[
                      "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold backdrop-blur-xl ring-1 shadow-[0_14px_28px_rgba(15,23,42,0.10)] transition",
                      "bg-white/40 text-black/70 ring-white/70 hover:-translate-y-0.5 hover:bg-white/50 cursor-pointer",
                    ].join(" ")}
                  >
                    다시 쓰기
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-slate-600">단어를 불러오는 중...</p>
                    </div>
                  ) : (
                    wordSections.map((section) => (
                      <WordSectionCard
                        key={section.id}
                        tone={section.review ? "orange" : "blue"}
                        title={section.title}
                        description={section.description}
                        value={section.value}
                        onChange={(v) => handleInputChange(section.id, v)}
                      />
                    ))
                  )}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || wordSections.length === 0 || isSaving}
                    className={[
                      "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold backdrop-blur-xl ring-1 shadow-[0_14px_28px_rgba(15,23,42,0.10)] transition",

                      isSaving
                        ? "bg-white/30 text-black/40 ring-white/60 cursor-wait"
                        : "bg-white/40 text-black/70 ring-white/70 hover:-translate-y-0.5 hover:bg-white/50 cursor-pointer",

                      (loading || wordSections.length === 0) && !isSaving
                        ? "opacity-50 cursor-not-allowed"
                        : "",
                    ].join(" ")}
                  >
                    {isSaving ? "저장 중..." : "예문 남기기"}
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};
