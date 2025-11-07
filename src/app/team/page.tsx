const members = [
  {
    name: "Taiga Kato",
    role: "フルスタックエンジニア / プロダクトリード",
    focus:
      "Next.js・TypeScriptによるプロダクト開発と、PoC〜本番リリースまでのロードマップ設計を担当。",
  },
  {
    name: "Aoi Nishimura",
    role: "AIエンジニア / データサイエンティスト",
    focus:
      "生成AIや画像処理のモデル開発・評価をリード。プロンプト設計とMLOps体制構築を得意とする。",
  },
  {
    name: "Shun Yamamoto",
    role: "ロボティクスエンジニア",
    focus:
      "ROS2を中心とした制御開発とハードウェア統合を担当。IoTデバイスのプロトタイピング経験が豊富。",
  },
  {
    name: "Hina Takagi",
    role: "UXリサーチャー / 心理学視点のプロダクトデザイナー",
    focus:
      "心理学的な知見をもとにユーザー調査と体験設計を支援。行動観察やワークショップ設計が得意。",
  },
  {
    name: "Masato Fujii",
    role: "ビジネスデベロップメント",
    focus:
      "事業モデルの検討やパートナー連携を推進。複数スタートアップの成長支援実績を保有。",
  },
];

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 space-y-4">
        <p className="text-sm font-semibold tracking-[0.3em] text-[var(--primary)]">
          TEAM
        </p>
        <h1 className="text-3xl font-bold text-[--color-foreground] md:text-4xl">
          多分野スペシャリストによるクロスファンクショナルチーム
        </h1>
        <p className="max-w-3xl text-base leading-7 text-[--color-muted-foreground]">
          各メンバーは研究・プロジェクトで培った専門性を持ちながら、役割を横断して課題に向き合います。
          必要に応じて外部パートナーやOG/OBメンバーとも連携し、プロジェクト体制を柔軟に構築します。
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {members.map((member) => (
          <article
            key={member.name}
            className="card-border-animated space-y-4 border border-[--color-border] border-l-[6px] border-l-[--color-accent-neo] bg-[--color-surface] p-8 shadow-[var(--shadow)] transition hover:-translate-y-1 hover:border-[--color-primary] hover:shadow-2xl"
          >
            <div>
              <h2 className="text-xl font-semibold text-[--color-foreground]">
                {member.name}
              </h2>
              <p className="text-sm font-medium text-[--color-primary]">
                {member.role}
              </p>
            </div>
            <p className="text-sm leading-7 text-[--color-muted-foreground]">
              {member.focus}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-16 border border-[--color-border] bg-[linear-gradient(0deg,rgba(0,0,0,0.1),var(--color-accent))] p-10 text-center">
        <h2 className="text-2xl font-semibold text-[--color-primary]">
          コラボレーションメンバーも随時募集中
        </h2>
        <p className="mt-3 text-sm text-[--color-muted-foreground]">
          分野を問わず、共に未来をつくる仲間を探しています。お気軽にお問い合わせください。
        </p>
      </div>
    </div>
  );
}

