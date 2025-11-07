const steps = [
  {
    title: "01. Discover",
    summary: "課題ヒアリングとゴール定義",
    detail:
      "関係者インタビュー、現場観察、既存データの読み解きを通じて現状と理想のギャップを明らかにします。",
    artifacts: ["課題マップ", "成功指標", "スプリント計画"],
  },
  {
    title: "02. Design",
    summary: "仮説立案と体験設計",
    detail:
      "情報アーキテクチャ、UXシナリオ、PoCスコープを設計。生成AIやハードウェアの利用可否も検証します。",
    artifacts: ["プロトタイプ", "技術調査メモ", "フィードバックレポート"],
  },
  {
    title: "03. Build",
    summary: "実装と検証",
    detail:
      "スプリント形式で開発を進め、最速で価値を届けるMVPを構築。自動テストや運用設計も並行。",
    artifacts: ["デリバリー記録", "テストレポート", "運用ドキュメント"],
  },
  {
    title: "04. Grow",
    summary: "継続改善とスケール",
    detail:
      "利用データやユーザーヒアリングをもとに改善。ガバナンスや組織ナレッジ化も支援します。",
    artifacts: ["改善ロードマップ", "定量・定性レポート", "引き継ぎ資料"],
  },
];

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 space-y-4">
        <p className="text-sm font-semibold tracking-[0.3em] text-[var(--primary)]">
          PROCESS
        </p>
        <h1 className="text-3xl font-bold text-[--color-foreground] md:text-4xl">
          本質を押さえたリニア×ループ型の進行プロセス
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[--color-muted-foreground]">
          課題理解から運用拡張までの一連の流れを、状況に応じてループしながら進行します。
          必要に応じて各フェーズ単体での支援も可能です。
        </p>
      </div>
      <div className="space-y-10">
        {steps.map((step) => (
          <article
            key={step.title}
            className="card-border-animated grid gap-6 border border-[--color-border] border-t-[6px] border-t-[--color-accent-neo] bg-[--color-surface] p-8 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[--color-primary] hover:shadow-2xl md:grid-cols-[0.8fr_1fr]"
          >
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-[--color-primary]">
                {step.title}
              </h2>
              <h3 className="text-2xl font-semibold text-[--color-foreground]">
                {step.summary}
              </h3>
              <p className="text-sm leading-7 text-[--color-muted-foreground]">
                {step.detail}
              </p>
            </div>
            <ul className="flex flex-wrap gap-3 self-center text-xs font-semibold text-[--color-primary]">
              {step.artifacts.map((artifact) => (
                <li
                  key={artifact}
                  className="rounded-full bg-[--color-accent] px-4 py-2 text-[--color-primary]"
                >
                  {artifact}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

