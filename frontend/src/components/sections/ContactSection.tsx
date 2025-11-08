"use client";

import { FormEvent, useState } from "react";

import { useBracketAnimation } from "@/hooks/useBracketAnimation";

type FormState = "idle" | "loading" | "success" | "error";

async function fakeSubmit(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const email = formData.get("email");
  if (!email || !String(email).includes("@")) {
    throw new Error("メールアドレスが正しくありません");
  }
}

export function ContactSection() {
  const sectionRef = useBracketAnimation<HTMLElement>();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("loading");
    setMessage("");

    try {
      await fakeSubmit(formData);
      setState("success");
      setMessage("送信が完了しました。追ってご連絡いたします。");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "送信に失敗しました。しばらく経ってからもう一度お試しください。"
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-bracket section-block mx-auto w-full max-w-6xl"
    >
      <div className="card-border-animated grid gap-12 border border-[--color-border] border-t-[6px] border-t-[--color-primary] bg-[--color-surface] p-10 shadow-[var(--shadow)] md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold tracking-[0.3em] text-[var(--primary)]">
            CONTACT
          </p>
          <h2 className="text-3xl font-bold text-[--color-foreground]">
            課題や構想をお聞かせください
          </h2>
          <p className="text-base leading-7 text-[--color-muted-foreground]">
            技術的なご相談はもちろん、課題の整理段階でも大歓迎です。オンライン・オフライン問わず柔軟に対応します。
          </p>
          <ul className="space-y-4 text-sm text-[--color-muted-foreground]">
            <li className="flex gap-3">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[--color-primary]" />
              事業アイデアの検証から既存業務の改善まで、スコープレスで検討します。
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[--color-primary]" />
              エンジニアリング・心理学・デザインなど多角的な視点でのフィードバックが可能です。
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-[--color-foreground]">
              お名前
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
            className="rounded-xl border border-[--color-border] bg-[--color-surface-soft] px-4 py-3 text-sm text-[--color-foreground] shadow-sm transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-[--color-foreground]">
              メールアドレス
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
            className="rounded-xl border border-[--color-border] bg-[--color-surface-soft] px-4 py-3 text-sm text-[--color-foreground] shadow-sm transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="organization" className="text-sm font-semibold text-[--color-foreground]">
              所属・団体名（任意）
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
            className="rounded-xl border border-[--color-border] bg-[--color-surface-soft] px-4 py-3 text-sm text-[--color-foreground] shadow-sm transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-semibold text-[--color-foreground]">
              ご相談内容
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
            className="rounded-xl border border-[--color-border] bg-[--color-surface-soft] px-4 py-3 text-sm text-[--color-foreground] shadow-sm transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
            />
          </div>
          <button
            type="submit"
            disabled={state === "loading"}
            className="surge-underline mt-2 inline-flex items-center justify-center rounded-full bg-[--color-primary] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow)] transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === "loading" ? "送信中..." : "送信する"}
          </button>
          {message && (
            <p
              className={`text-sm ${
                state === "success" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

