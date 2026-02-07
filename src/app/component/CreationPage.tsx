"use client";

import { useState } from "react";
import WordSectionCard from "../main/create_sentences/components/WordSectionCard";

interface WordSection {
  id: number;
  title: string;
  description: string;
  value: string;
}

interface FeedbackData {
  id: number;
  sentiment: string;
  situations: string[];
}

export const CreationPage = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  const [wordSections, setWordSections] = useState<WordSection[]>([
    {
      id: 1,
      title: "단어 1",
      description:
        "뜻 설명 : -- 라는 뜻입니다. -- 라는 뜻입니다. -- 라는 뜻입니다",
      value: "",
    },
    {
      id: 2,
      title: "단어 2",
      description:
        "뜻 설명 : -- 라는 뜻입니다. -- 라는 뜻입니다. -- 라는 뜻입니다",
      value: "",
    },
    {
      id: 3,
      title: "단어 3",
      description:
        "뜻 설명 : -- 라는 뜻입니다. -- 라는 뜻입니다. -- 라는 뜻입니다",
      value: "",
    },
  ]);

  const [feedbackData] = useState<FeedbackData[]>([
    {
      id: 1,
      sentiment: "정말 잘하셨어요! 예시 표현을 완벽하게 이해하셨네요.",
      situations: ["이런 상황에서~", "저런 상황에서~", "또 다른 상황에서~"],
    },
    {
      id: 2,
      sentiment: "아주 재미있는 표현 사용법이에요! 자연스럽습니다.",
      situations: [
        "회의가 시작될 때",
        "누군가의 의견을 묻고 싶을 때",
        "긍정적인 답변이 나올 것 같을 때",
      ],
    },
    {
      id: 3,
      sentiment: "완벽한 표현 활용입니다! 이 단어의 뉘앙스를 잘 파악했어요.",
      situations: [
        "따뜻한 말투로 상대를 격려할 때",
        "누군가가 어려움을 겪을 때",
      ],
    },
  ]);

  const handleInputChange = (id: number, newValue: string) => {
    setWordSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value: newValue } : s)),
    );
  };

  const handleSubmit = () => {
    console.log("예문 데이터:", wordSections);
    setShowFeedback(true);
  };

  const handleGoBack = () => {
    setShowFeedback(false);
  };

  return (
    <div className="w-full bg-white text-slate-900 flex flex-col overflow-hidden">
      <main className="h-[calc(100vh-81px)] overflow-hidden flex flex-col items-center px-8 py-8">
        <div className="mb-6 w-full max-w-6xl">
          <h1 className="text-[36px] font-bold text-slate-900">
            {showFeedback ? "예문 피드백" : "예문 만들어보기!"}
          </h1>
          <p className="mt-2 text-[14px] text-slate-600">
            {showFeedback
              ? "AI가 예문에 대한 피드백을 제공했어요."
              : "주어진 단어를 활용해 예문을 만들어보세요."}
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-10 overflow-hidden lg:grid-cols-2 lg:items-stretch">
          <section className="flex flex-col items-center justify-center gap-6 overflow-hidden lg:pr-12 lg:relative lg:after:absolute lg:after:top-0 lg:after:bottom-0 lg:after:right-0 lg:after:w-px lg:after:bg-slate-200">
            <div className="relative h-44 w-40">
              <img
                src="/streak.svg"
                alt="Streak"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="inline-flex rounded-full bg-indigo-100 px-6 py-2">
              <span className="text-sm font-semibold text-indigo-700">
                10일째 공부중
              </span>
            </div>
          </section>

          <section className="w-full lg:pl-12 flex flex-col overflow-hidden">
            {showFeedback ? (
              <div className="space-y-3">
                {feedbackData.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="rounded-lg bg-blue-50 p-5 space-y-3"
                  >
                    <div className="rounded-lg bg-white p-4 space-y-2">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {wordSections[feedback.id - 1]?.title}
                      </h3>
                      <p className="text-xs text-slate-600">
                        {wordSections[feedback.id - 1]?.description}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-4">
                      <p className="text-xs text-slate-600">
                        {wordSections[feedback.id - 1]?.value}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-4 space-y-2">
                      <h4 className="text-sm font-semibold text-slate-900">
                        한줄평
                      </h4>
                      <p className="text-xs text-slate-600">
                        {feedback.sentiment}
                      </p>
                    </div>

                    <div className="rounded-lg bg-white p-4 space-y-2">
                      <h4 className="text-sm font-semibold text-slate-900">
                        적용 상황
                      </h4>
                      <ul className="space-y-1">
                        {feedback.situations.map((situation, idx) => (
                          <li
                            key={`${feedback.id}-${idx}`}
                            className="text-xs text-slate-600 flex items-start"
                          >
                            <span className="mr-2">•</span>
                            <span>{situation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {wordSections.map((section, index) => (
                  <WordSectionCard
                    key={section.id}
                    tone={index === 2 ? "orange" : "blue"}
                    title={section.title}
                    description={section.description}
                    value={section.value}
                    onChange={(v) => handleInputChange(section.id, v)}
                  />
                ))}
              </div>
            )}

            <div className="mt-auto pt-4 flex justify-end">
              {showFeedback ? (
                <button
                  onClick={handleGoBack}
                  className="rounded-full bg-indigo-500 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  다시 쓰기
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="rounded-full bg-indigo-500 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  예문 남기기
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
