"use client";

import { useState } from "react";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    setWordSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, value: newValue } : section,
      ),
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* 사이드 패널 메뉴 */}

      <main className="flex flex-1 items-center justify-center px-8 py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* 좌측 섹션 */}
          <section className="flex flex-col items-center justify-center space-y-6 lg:border-r lg:border-slate-200 lg:pr-12">
            {/* 불 아이콘 */}
            <div className="relative h-48 w-40">
              <svg
                viewBox="0 0 100 140"
                className="h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 불 모양 */}
                <defs>
                  <linearGradient
                    id="fireGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" style={{ stopColor: "#ff4500" }} />
                    <stop offset="50%" style={{ stopColor: "#ffa500" }} />
                    <stop offset="100%" style={{ stopColor: "#ffeb3b" }} />
                  </linearGradient>
                </defs>
                <path
                  d="M50 10 Q70 40 70 70 Q70 100 50 120 Q30 100 30 70 Q30 40 50 10"
                  fill="url(#fireGradient)"
                />
                <path
                  d="M50 30 Q60 50 60 70 Q60 90 50 105 Q40 90 40 70 Q40 50 50 30"
                  fill="#ff6b35"
                  opacity="0.8"
                />
              </svg>
            </div>

            {/* 텍스트 */}
            <div className="inline-flex rounded-full bg-indigo-100 px-6 py-2.5">
              <span className="text-sm font-semibold text-indigo-700">
                10월 째 공부중
              </span>
            </div>
          </section>

          {/* 우측 섹션 */}
          <section className="w-full space-y-6 lg:pl-12">
            {showFeedback ? (
              <>
                {/* 피드백 제목 */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-slate-900">
                    예문에 대한 피드백
                  </h1>
                  <p className="text-sm text-slate-600">
                    AI가 한줄의 피드백을 남겨놓았습니다.
                  </p>
                </div>

                {/* 피드백 데이터 */}
                <div className="space-y-4">
                  {feedbackData.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="rounded-lg bg-blue-50 p-6 space-y-3"
                    >
                      {/* 단어명 및 뜻 설명 */}
                      <div className="rounded-lg bg-white p-4 space-y-2">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {wordSections[feedback.id - 1]?.title}
                        </h3>
                        <p className="text-xs text-slate-600">
                          {wordSections[feedback.id - 1]?.description}
                        </p>
                      </div>

                      {/* 작성한 예문 */}
                      <div className="rounded-lg bg-white p-4">
                        <p className="text-xs text-slate-600">
                          {wordSections[feedback.id - 1]?.value}
                        </p>
                      </div>

                      {/* 한줄평 */}
                      <div className="rounded-lg bg-white p-4 space-y-2">
                        <h4 className="text-sm font-semibold text-slate-900">
                          한줄평
                        </h4>
                        <p className="text-xs text-slate-600">
                          {feedback.sentiment}
                        </p>
                      </div>

                      {/* 적용 상황 */}
                      <div className="rounded-lg bg-white p-4 space-y-2">
                        <h4 className="text-sm font-semibold text-slate-900">
                          적용 상황
                        </h4>
                        <ul className="space-y-1">
                          {feedback.situations.map((situation, index) => (
                            <li
                              key={index}
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

                {/* 돌아가기 버튼 */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleGoBack}
                    className="rounded-full bg-indigo-500 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    다시 쓰기
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 제목 및 설명 */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-slate-900">
                    예문 만들어보기!
                  </h1>
                  <p className="text-sm text-slate-600">
                    주어진 단어를 활용해 예문을 만들어보세요.
                  </p>
                </div>

                {/* 단어 섹션들 */}
                <div className="space-y-4">
                  {wordSections.map((section) => (
                    <div
                      key={section.id}
                      className="rounded-lg bg-blue-50 p-4 space-y-2"
                    >
                      <h3 className="text-sm font-semibold text-slate-900">
                        {section.title}
                      </h3>
                      <p className="text-xs text-slate-600">
                        {section.description}
                      </p>
                      <input
                        type="text"
                        placeholder="예문 작성해보세요"
                        value={section.value}
                        onChange={(event) =>
                          handleInputChange(section.id, event.target.value)
                        }
                        className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* 제출 버튼 */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSubmit}
                    className="rounded-full bg-indigo-500 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    예문 남기기
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
