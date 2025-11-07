import Link from "next/link";

const posts = [
  {
    title: "生成AIチャットボット立ち上げの指南書",
    excerpt:
      "学生プロジェクトで実践した、RAG構築・プロンプト評価・運用体制の勘所をまとめました。",
    date: "2025-11-01",
    category: "AI",
  },
  {
    title: "大学研究とプロダクト開発をつなぐ開発体制",
    excerpt:
      "共同研究から得た知見をPoCやMVPに落とし込むためのプロセスと役割分担について共有します。",
    date: "2025-10-18",
    category: "Process",
  },
  {
    title: "ロボティクス開発におけるWeb×ROS2のベストプラクティス",
    excerpt:
      "Webエンジニアとロボティクスエンジニアが協力する際の、インターフェース設計の工夫を紹介。",
    date: "2025-09-29",
    category: "Robotics",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 space-y-4">
        <p className="text-sm font-semibold tracking-[0.3em] text-[var(--primary)]">
          BLOG
        </p>
        <h1 className="text-3xl font-bold text-[--color-foreground] md:text-4xl">
          学生現場で得たナレッジとインサイトを公開
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[--color-muted-foreground]">
          プロジェクトで実践したノウハウや、最新の技術トレンド、イベントレポートなどを発信しています。
          将来的には外部執筆の受け入れも検討中です。
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="card-border-animated flex h-full flex-col gap-4 border border-[--color-border] border-b-[6px] border-b-[--color-primary] bg-[--color-surface] p-8 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[--color-primary] hover:shadow-2xl"
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[--color-primary]">
              <span>{post.category}</span>
              <time dateTime={post.date} className="text-[--color-muted-foreground]">
                {post.date}
              </time>
            </div>
            <h2 className="text-xl font-semibold text-[--color-foreground]">
              {post.title}
            </h2>
            <p className="flex-1 text-sm leading-7 text-[--color-muted-foreground]">
              {post.excerpt}
            </p>
            <Link
              href="#"
              className="text-sm font-semibold text-[--color-primary] transition hover:underline"
            >
              記事を読む
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-16 border border-[--color-border] bg-[radial-gradient(circle_at_top_left,_rgba(179,66,74,0.08),_transparent_65%)] p-10 text-center text-sm text-[--color-foreground]">
        <p className="font-semibold text-[--color-primary]">ブログの正式公開に向けて準備中です。</p>
        <p className="mt-2 text-[--color-muted-foreground]">
          寄稿・取材のご相談は <Link href="/#contact" className="font-semibold text-[--color-primary]">お問い合わせフォーム</Link> からお願いします。
        </p>
      </div>
    </div>
  );
}

