"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2b0d11] via-[#5a1820] to-[--color-primary] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_50%)]" />
        <Image
          src="/globe.svg"
          alt="背景イメージ"
          fill
          priority
          className="object-cover opacity-10"
        />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 text-white md:flex-row md:items-center">
        <div className="max-w-2xl space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.4em]">
            Student Tech Studio
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            TAITAI-TECH
            <span className="block text-2xl font-medium md:text-3xl">
              学生発、圧倒的成長速度で未来をつくる実践型テック集団
            </span>
          </h1>
          <p className="max-w-lg text-base leading-7 text-white/80 md:text-lg">
            Webアプリケーション、生成AIチャットボット、画像処理、知識体系化、ノーコードツール、ロボット・IoTまで。
            多視点の専門知見で課題を捉え、企画から開発・改善まで伴走します。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[--color-foreground] px-6 py-3 text-sm font-semibold text-[--color-background] shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              相談してみる
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              サービスを見る
            </Link>
          </div>
        </div>
        <div className="hidden flex-1 justify-end md:flex">
          <div className="relative h-[420px] w-[320px]">
            <div className="absolute inset-0 rounded-[28px] border border-white/20 bg-white/10 backdrop-blur">
              <div className="absolute inset-6 rounded-2xl bg-black/40 p-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                  LIVE BUILD
                </p>
                <p className="mt-4 text-base font-semibold leading-snug">
                  「課題探索 × 技術実装」で
                  <br />
                  スピーディな価値検証を
                </p>
                <div className="mt-8 grid gap-4 text-xs text-white/70">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Next Stage
                    </p>
                    <p className="mt-1 font-semibold">AIアシスタント導線PoC</p>
                    <p>Concept → Prototype → Feedback</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Stack
                    </p>
                    <p className="mt-1 font-semibold">Next.js / LangChain / ROS2 / Figma</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full border border-white/30 bg-white/10" />
            <div className="absolute -right-16 bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

