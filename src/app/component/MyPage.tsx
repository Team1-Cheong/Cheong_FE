"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const MyPage = () => {
  const router = useRouter();
  const [description, setDescription] = useState("안녕하세요! 영어 공부를 열심히 하고 있습니다.");
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);

  const handleLogout = () => {
    console.log("로그아웃");
    router.push("/login");
  };

  const handleWithdraw = () => {
    console.log("회원탈퇴");
    router.push("/login");
  };

  const handleEditClick = () => {
    setTempDescription(description);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setDescription(tempDescription);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTempDescription(description);
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-slate-50 text-slate-900 flex flex-col">
      {/* 메인 콘텐츠 */}
      <main className="flex items-center justify-center px-8 py-4">
        <div className="w-full max-w-sm rounded-lg bg-white p-8 space-y-6 shadow-sm">
          {/* 프로필 영역 */}
          <div className="flex flex-col items-center space-y-4">
            {/* 프로필 사진 */}
            <div className="h-32 w-32 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="#818cf8"
                className="text-indigo-500"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M12 14c-6 0-8 3-8 3v6h16v-6s-2-3-8-3z" />
              </svg>
            </div>

            {/* 사용자명 */}
            <h1 className="text-2xl font-bold text-slate-900">사용자</h1>

            {/* 이메일 */}
            <p className="text-sm text-slate-600">12345@gmail.com</p>

            {/* 자기소개 */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-600">
                  자기소개
                </label>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="text-xs text-indigo-500 hover:text-indigo-600 font-semibold"
                  >
                    수정
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                    className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none resize-none"
                    rows={3}
                    placeholder="자기소개를 입력해 주세요"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelClick}
                      className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSaveClick}
                      className="flex-1 rounded bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-600 transition"
                    >
                      저장
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-700 bg-slate-50 rounded px-3 py-2 min-h-[60px]">
                  {description}
                </p>
              )}
            </div>

            {/* 구분선 */}
            <div className="w-full h-px bg-slate-200" />
          </div>

          {/* 통계 영역 */}
          <div className="space-y-4">
            {/* 연속 공부 */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">👑</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  최대 20회 연속 공부
                </p>
              </div>
            </div>

            {/* 학습 진행률 */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">20/365</p>
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleWithdraw}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              회원 탈퇴
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-600 transition"
            >
              로그 아웃
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
