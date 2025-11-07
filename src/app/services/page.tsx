import Link from "next/link";

const services = [
  {
    title: "AI・データ活用コンサルティング",
    summary:
      "生成AIの企画・開発・評価をワンストップで支援。ナレッジ構造化や業務フローへの組み込みも対応。",
    deliverables: [
      "課題ヒアリングとユースケース設計",
      "データ・知識ベース整備、LLM評価設計",
      "プロトタイプ開発と運用体制構築",
    ],
  },
  {
    title: "プロダクト / UI 開発",
    summary:
      "Next.jsを中心にモダンなWebアプリケーションを実装。ノーコードツールの活用も組み合わせて最適化。",
    deliverables: [
      "情報設計・UXプロトタイピング",
      "TypeScript / React を活用した実装",
      "継続的な改善とグロース支援",
    ],
  },
  {
    title: "ロボティクス・IoT 開発",
    summary:
      "ROS2や各種マイコン、クラウド基盤を統合し、リアルタイム連携や可視化を実現。",
    deliverables: [
      "ハードウェア選定と試作",
      "通信・制御ソフトウェア開発",
      "ダッシュボード、運用監視の実装",
    ],
  },
  {
    title: "知識整理・情報共有基盤",
    summary:
      "分散するドキュメントを体系化し、検索・可視化・ナレッジ活用を高速化。",
    deliverables: [
      "情報棚卸しとタクソノミー設計",
      "グラフDB・検索基盤構築",
      "可視化ダッシュボード連携",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 space-y-4">
        <p className="text-sm font-semibold tracking-[0.3em] text-[var(--primary)]">
          SERVICES
        </p>
        <h1 className="text-3xl font-bold text-[--color-foreground] md:text-4xl">
          課題起点で設計する技術支援メニュー
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[--color-muted-foreground]">
          ご相談内容に合わせてスコープを柔軟に設定し、スプリント形式で成果を積み上げます。
          初期の相談チャットやワークショップから実際の開発、運用改善まで一貫して対応可能です。
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="card-border-animated flex flex-col gap-6 border border-[--color-border] border-t-[6px] border-t-[--color-primary] bg-[--color-surface] p-8 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[--color-primary] hover:shadow-2xl"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-[--color-foreground]">
                {service.title}
              </h2>
              <p className="text-sm leading-7 text-[--color-muted-foreground]">
                {service.summary}
              </p>
            </div>
            <ul className="space-y-3 text-sm text-[--color-muted-foreground]">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-[--color-primary]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-16 border border-[--color-border] bg-[linear-gradient(0deg,rgba(0,0,0,0.1),var(--color-accent))] p-10 text-center text-[--color-foreground]">
        <p className="text-lg font-semibold text-[--color-primary]">まだ整理しきれていない構想も、お気軽にご相談ください。</p>
        <p className="mt-2 text-sm text-[--color-muted-foreground]">
          1週間以内にキックオフミーティングを設定し、最適な進め方をご提案します。
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[--color-primary] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          相談を申し込む
        </Link>
      </div>
    </div>
  );
}

