"use client";

import { useBracketAnimation } from "@/hooks/useBracketAnimation";

export function AboutSection() {
  const sectionRef = useBracketAnimation<HTMLElement>();
  const highlights = [
    {
      title: "学生主体のハイレベルチーム",
      description:
        "ソフトウェア、AI、ロボティクス、心理学、実世界工学など多分野のメンバーが集結。ひとつの課題を多角的に捉えます。",
    },
    {
      title: "ゼロから伴走するコンサル力",
      description:
        "課題整理から要件定義、PoC、プロダクト実装までワンストップで支援。意思決定の速度と質を高めます。",
    },
    {
      title: "あらゆる技術領域の実装",
      description:
        "生成AIチャットボット、画像処理、データ可視化、ノーコード連携、ロボット・IoT制御まで幅広い技術スタックに対応。",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-bracket section-block mx-auto w-full max-w-6xl"
    >
      <div className="mb-12 max-w-3xl space-y-4">
        <p className="text-sm font-semibold tracking-[0.3em] text-[var(--primary)]">
          ABOUT
        </p>
        <h2 className="text-3xl font-bold text-[--color-foreground] md:text-4xl">
          課題の本質を捉えて、テクノロジーで形にする学生イノベーターチーム
        </h2>
        <p className="text-lg leading-8 text-[--color-muted-foreground]">
          IT化やDXの推進に取り組む個人・企業・自治体の皆さまと並走し、スピード感ある試作から継続的な改善まで支援します。
          未確定な構想段階でも気軽にご相談ください。
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="card-border-animated group relative overflow-hidden border border-[--color-border] bg-[--color-surface] p-8 shadow-[var(--shadow)] transition-transform duration-300 hover:-translate-y-1 hover:border-[--color-primary] hover:shadow-xl"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[--color-primary] transition-transform duration-300 group-hover:scale-x-110" />
            <div className="absolute inset-y-0 left-0 w-1 bg-[--color-accent-neo]/40" />
            <div className="relative space-y-4 pl-6">
              <h3 className="text-xl font-semibold text-[--color-foreground]">
                {highlight.title}
              </h3>
              <p className="text-sm leading-7 text-[--color-muted-foreground]">
                {highlight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

