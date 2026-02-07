"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = userId && password;
    if (isValid) {
      router.push("/main/home");
    }
    setErrorMessage(isValid ? "" : "아이디또는 비밀번호가 올바르지 않습니다.");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <main className="flex flex-1 items-center justify-center px-8 pb-16 pt-6">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <section className="w-full">
            <section className="w-full flex items-center justify-center">
              <img src="/main_logo.png" alt="Main Logo" className="max-w-sm" />
            </section>
            {/* Left column for branding or hero content */}
          </section>

          <section className="w-full">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600">
                  아이디
                </label>
                <input
                  className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                  placeholder="아이디를 입력해 주세요"
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                    placeholder="비밀번호를 입력해 주세요"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.1 12.2a1 1 0 0 1 0-.4C3.6 7.1 7.5 4 12 4c4.5 0 8.4 3.1 9.9 7.8a1 1 0 0 1 0 .4C20.4 16.9 16.5 20 12 20c-4.5 0-8.4-3.1-9.9-7.8Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              {errorMessage ? (
                <p className="text-sm font-semibold text-red-500">
                  {errorMessage}
                </p>
              ) : null}

              <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-3.5 w-3.5" />
                  <span>자동 로그인</span>
                </label>
                <button
                  type="button"
                  className="font-semibold text-slate-500 hover:text-slate-700"
                >
                  비밀번호 찾기
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-indigo-500 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
              >
                로그인
              </button>

              <button
                type="button"
                className="w-full rounded border border-indigo-400 py-2.5 text-sm font-semibold text-indigo-500 transition hover:bg-indigo-50"
                onClick={() => router.push("/signup")}
              >
                회원가입
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};
