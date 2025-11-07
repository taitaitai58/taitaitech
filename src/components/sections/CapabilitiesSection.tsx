"use client";

import { ReactNode } from "react";

import { useBracketAnimation } from "@/hooks/useBracketAnimation";

type Capability = {
  title: string;
  description: string;
  detail: string;
  icon: ReactNode;
};

const capabilities: Capability[] = [
  {
    title: "プロダクト構想・要件定義",
    description: "課題ヒアリングからゴール設計、PoC計画まで伴走",
    detail: "ヒューマンファクターとビジネス観点を織り込み、仮説検証のロードマップを作成します。",
    icon: "🧭",
  },
  {
    title: "AI・データ活用",
    description: "生成AI、データ分析、MLOpsの一気通貫支援",
    detail: "データ整理からモデル評価、運用時のガバナンス整備までカバーします。",
    icon: "🤖",
  },
  {
    title: "ソフトウェア・UI開発",
    description: "Web/モバイル/ノーコードを最適なスタックで実装",
    detail: "UXリサーチと高速プロトタイピングで、サービス体験の磨き込みを進めます。",
    icon: "💡",
  },
  {
    title: "ロボティクス・IoT",
    description: "センサー統合、リアルタイム制御、可視化ダッシュボード",
    detail: "フィールド実験に向けた装置設計、シミュレーション、データ連携までサポートします。",
    icon: "🛠",
  },
];

export function CapabilitiesSection() {
  const sectionRef = useBracketAnimation<HTMLElement>();
  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="section-bracket section-block mx-auto w-full max-w-6xl"
    >
      <div className="mb-12 space-y-4">
        <p className="text-sm font-semibold tracking-[0.3em] text-[var(--primary)]">
          CAPABILITIES
        </p>
        <h2 className="text-3xl font-bold text-[--color-foreground] md:text-4xl">
          課題解決に必要なチームを、その場で組成します
        </h2>
        <p className="max-w-3xl text-base leading-7 text-[--color-muted-foreground]">
          スタートアップ、教育機関、自治体、製造業など幅広い領域で活動。現場理解と技術力を兼ね備えた学生メンバーが、スピード感をもって価値を創出します。
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {capabilities.map((capability) => (
          <div
            key={capability.title}
            className="card-border-animated relative overflow-hidden border border-[--color-border] bg-[--color-surface] p-8 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[--color-primary] hover:shadow-xl"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[--color-accent-neo]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(179,66,74,0.08),_transparent_65%)]" />
            <div className="relative space-y-4">
              <span className="text-3xl" aria-hidden>
                {capability.icon}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[--color-foreground]">
                  {capability.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[--color-primary]">
                  {capability.description}
                </p>
              </div>
              <p className="text-sm leading-7 text-[--color-muted-foreground]">
                {capability.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

