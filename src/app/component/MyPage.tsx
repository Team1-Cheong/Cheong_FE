"use client";

export const MyPage = () => {
  const handleLogout = () => {
    console.log("로그아웃");
  };

  const handleWithdraw = () => {
    console.log("회원탈퇴");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* 메인 콘텐츠 */}
      <main className="flex flex-1 items-center justify-center px-8 py-12">
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
