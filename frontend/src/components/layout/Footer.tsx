import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[--color-border] bg-[--color-surface] py-10 text-sm text-[--color-muted-foreground]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="text-base font-semibold text-[--color-foreground]">
            TAITAI-TECH
          </p>
          <p className="max-w-sm leading-6">
            学生メンバーが中心となり、生成AIからロボティクスまで幅広い知見で課題解決を支援するテック集団です。
          </p>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[--color-muted-foreground]">
              ナビゲーション
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="surge-underline transition-colors hover:text-[--color-primary]">
                  サービス
                </Link>
              </li>
              <li>
                <Link href="/team" className="surge-underline transition-colors hover:text-[--color-primary]">
                  メンバー
                </Link>
              </li>
              <li>
                <Link href="/process" className="surge-underline transition-colors hover:text-[--color-primary]">
                  開発プロセス
                </Link>
              </li>
              <li>
                <Link href="/blog" className="surge-underline transition-colors hover:text-[--color-primary]">
                  ブログ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[--color-muted-foreground]">
              連絡先
            </p>
            <ul className="space-y-2">
              <li>contact@taitai-tech.com</li>
              <li>対面可能:大阪・京都</li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[--color-muted-foreground]">
              SNS(準備中)
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="https://x.com" className="surge-underline transition-colors hover:text-[--color-primary]">
                  X (旧Twitter)
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com" className="surge-underline transition-colors hover:text-[--color-primary]">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-[--color-border] pt-6 text-center text-xs">
        © {new Date().getFullYear()} TAITAI-TECH. All rights reserved.
      </div>
    </footer>
  );
}

