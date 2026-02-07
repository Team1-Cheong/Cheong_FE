"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignupPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validatePassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasNumber && isLongEnough;
  };

  const equalPasswords = (
    password: string,
    confirmPassword: string,
  ): boolean => {
    return password === confirmPassword;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userName || !userId || !password || !confirmPassword) {
      setErrorMessage("모든 항목을 입력해 주세요.");
      return;
    }
    if (!equalPasswords(password, confirmPassword)) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage(
        "비밀번호는 8자리 이상, 영문 대소문자와 숫자를 포함해야 합니다.",
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    setErrorMessage("");
    router.push("/login");
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
                  이름
                </label>
                <input
                  className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                  placeholder="이름을 입력해 주세요"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>

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

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600">
                  비밀번호 확인
                </label>
                <input
                  className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>

              {errorMessage ? (
                <p className="text-sm font-semibold text-red-500">
                  {errorMessage}
                </p>
              ) : null}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-white/40 px-6 py-3 text-[13px] font-bold text-black backdrop-blur-xl ring-1 ring-white/70 shadow-[0_14px_28px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:bg-white/50"
              >
                회원가입
              </button>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="inline-flex w-full items-center justify-center rounded-full bg-white/40 px-6 py-3 text-[13px] font-bold text-black/30 backdrop-blur-xl ring-1 ring-white/70 shadow-[0_14px_28px_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5 hover:bg-white/50"
              >
                로그인으로 돌아가기
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};
