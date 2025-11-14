import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-[var(--primary)]">
        BLOG
      </p>
      <h1 className="text-3xl font-bold text-[--color-foreground] md:text-4xl">
        ただいま執筆中です
      </h1>
      <p className="mt-4 text-base leading-7 text-[--color-muted-foreground]">
        ブログは近日中に公開予定です
      </p>
      <div className="mt-10 rounded-lg border border-[--color-border] bg-[--color-surface] px-6 py-4 text-sm text-[--color-muted-foreground]">
        CMS連携と記事移行の準備が整い次第、順次公開していきます。
      </div>
    </div>
  );
}

