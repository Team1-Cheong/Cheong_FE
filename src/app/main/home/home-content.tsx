"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "../../component/Header";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Header />

      <main className="w-full">
        <section className="relative h-[calc(100vh-64px)] min-h-[640px] w-full overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/home-bg.png"
              alt="home background"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/20 to-white/55" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1020]/70 via-[#0B1020]/25 to-transparent" />
          </div>

          {/* Right circular decoration */}
          <div className="pointer-events-none absolute -right-36 -top-40 h-[620px] w-[620px] rounded-full border border-white/18 bg-white/10" />
          <div className="pointer-events-none absolute -right-56 -top-10 h-[760px] w-[760px] rounded-full border border-white/12" />
          <div className="pointer-events-none absolute -right-72 top-28 h-[900px] w-[900px] rounded-full border border-white/8" />

          {/* Content wrapper: full width, but safe max */}
          <div className="relative mx-auto flex h-full w-full max-w-[1400px] items-center">
            <div className="grid w-full grid-cols-1 items-center gap-10 px-10 lg:grid-cols-2 lg:px-16">
              {/* Left */}
              <div className="max-w-[640px] text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold ring-1 ring-white/15">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  오늘의 한마디
                </div>

                <h1 className="mt-6 text-[44px] font-extrabold leading-[1.05] tracking-tight sm:text-[60px]">
                  한 문장으로,
                  <br />
                  <span className="italic font-semibold">어휘력을 되찾다.</span>
                </h1>

                <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-white/85 sm:text-[16px]">
                  오늘의 단어로 예문을 쓰면, AI가 한줄평과 더 자연스러운 예문
                  3개를 제안해요. 너무 완벽할 필요 없어요. 차근차근 어휘력을
                  키워봐요.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/main/history"
                    className="rounded-full bg-white px-6 py-3 text-[13px] font-bold text-[#0B1020] shadow-[0_14px_28px_rgba(0,0,0,0.20)] transition hover:-translate-y-0.5"
                  >
                    학습 이력
                  </Link>

                  <Link
                    href="/main/create_sentences"
                    className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-[13px] font-semibold text-white ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/15"
                  >
                    학습하기
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15 transition group-hover:bg-white/25">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path d="M7 5l7 5-7 5V5z" fill="currentColor" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right: 안정적으로 보이게 (깨짐 방지) */}
              <div className="hidden lg:flex justify-end">
                <div className="w-[520px] min-w-[520px] max-w-[520px]">
                  <div className="relative overflow-hidden rounded-[24px] bg-white/10 ring-1 ring-white/15 backdrop-blur-md shadow-[0_18px_48px_rgba(0,0,0,0.18)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-white/6 to-transparent" />

                    <div className="relative p-6">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="ml-2 text-[12px] font-semibold text-white/70">
                          한마디 미리보기
                        </span>
                      </div>

                      <div className="mt-6 space-y-4">
                        <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
                          <div className="text-[12px] font-semibold text-white/70">
                            내가 쓴 문장
                          </div>
                          <div className="mt-2 text-[16px] font-semibold leading-relaxed text-white/90">
                            “오늘은 작은 용기가 하루를 바꿨다.”
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
                          <div className="text-[12px] font-semibold text-white/70">
                            AI 한줄평
                          </div>
                          <div className="mt-2 text-[14px] font-semibold leading-relaxed text-white/85">
                            감정이 자연스럽게 전달돼요. 조금 더 구체적인 상황을
                            덧붙이면 더 좋아요.
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
                          <div className="text-[12px] font-semibold text-white/70">
                            AI 추천 예문
                          </div>
                          <ul className="mt-2 space-y-2 text-[14px] font-semibold text-white/85">
                            <li className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                              <span>
                                작은 결심이 오늘을 더 단단하게 만들었다.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                              <span>
                                작은 용기를 내어 평소에 망설이던 발표에
                                자원했다.
                              </span>
                            </li>
                            <li className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/50" />
                              <span>
                                오늘의 작은 용기가 내일의 나를 성장시킨다.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none mt-4 h-10 w-full rounded-[24px] bg-black/10 blur-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
