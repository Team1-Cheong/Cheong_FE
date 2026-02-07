"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export const Header = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
      <header className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-white relative z-50">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-700">
          <img
            src="/logo_icon.png"
            alt="로고"
            className="h-8 w-10 object-cover object-center scale-300"
          />
          <span>한마디</span>
        </div>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex flex-col gap-1.5 hover:opacity-70 transition"
          aria-label="메뉴"
        >
          <span className="block h-0.5 w-6 bg-slate-900" />
          <span className="block h-0.5 w-6 bg-slate-900" />
          <span className="block h-0.5 w-6 bg-slate-900" />
        </button>
      </header>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-slate-200 shadow-lg transform transition-transform duration-300 ease-out z-50 ${
          isDropdownOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-200">
          <span className="text-base font-semibold text-slate-900">메뉴</span>
          <button
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center justify-center w-8 h-8 hover:bg-slate-100 rounded-lg transition"
            aria-label="닫기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-900"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 space-y-3 pt-4">
          <button
            onClick={() => {
              setIsDropdownOpen(false);
              router.push("/main/create_sentences");
            }}
            className="w-full px-4 py-3 text-left text-base font-semibold text-slate-900 hover:bg-indigo-50 rounded-lg transition"
          >
            예문 만들기
          </button>
          <button
            onClick={() => {
              setIsDropdownOpen(false);
              router.push("/main/history");
            }}
            className="w-full px-4 py-3 text-left text-base font-semibold text-slate-900 hover:bg-indigo-50 rounded-lg transition"
          >
            학습 이력
          </button>

          <button
            onClick={() => {
              setIsDropdownOpen(false);
              router.push("/main/my_page");
            }}
            className="w-full px-4 py-3 text-left text-base font-semibold text-slate-900 hover:bg-indigo-50 rounded-lg transition"
          >
            마이페이지
          </button>
        </div>
      </div>
    </>
  );
};
