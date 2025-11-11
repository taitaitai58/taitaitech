"use client";

import { FormEvent, useState } from "react";

import { useBracketAnimation } from "@/hooks/useBracketAnimation";
import { contactSchema, type ContactFormData, type ContactFormInput } from "@/lib/contact";

type FormState = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

export function ContactSection() {
  const sectionRef = useBracketAnimation<HTMLElement>();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: ContactFormInput = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in fieldErrors)) {
          fieldErrors[key as keyof ContactFormData] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setState("error");
      setMessage("入力内容に誤りがあります。各項目をご確認ください。");
      return;
    }

    const data: ContactFormData = parsed.data;

    setState("loading");
    setMessage("");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(
          result?.message ??
            "送信に失敗しました。しばらく経ってからもう一度お試しください。"
        );
      }

      setState("success");
      setMessage(
        result?.message ?? "送信が完了しました。追ってご連絡いたします。"
      );
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
            <label htmlFor="name" className="flex items-center justify-between text-sm font-semibold text-[--color-foreground]">
              <span>お名前</span>
              <span className="text-xs font-normal text-[--color-muted-foreground]">100文字以内</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`rounded-xl border border-[--color-border] bg-[--color-surface-soft] px-4 py-3 text-sm text-[--color-foreground] shadow-sm transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20 ${
                errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
              }`}
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-red-500">
                {errors.name}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="flex items-center justify-between text-sm font-semibold text-[--color-foreground]">
              <span>メールアドレス</span>
              <span className="text-xs font-normal text-[--color-muted-foreground]">320文字以内</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={320}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`rounded-xl border border-[--color-border] bg-[--color-surface-soft] px-4 py-3 text-sm text-[--color-foreground] shadow-sm transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20 ${
                errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
              }`}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label htmlFor="organization" className="flex items-center justify-between text-sm font-semibold text-[--color-foreground]">
              <span>所属・団体名（任意）</span>
              <span className="text-xs font-normal text-[--color-muted-foreground]">120文字以内</span>
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              maxLength={120}
              aria-invalid={Boolean(errors.organization)}
              aria-describedby={errors.organization ? "organization-error" : undefined}
              className={`rounded-xl border border-[--color-border] bg-[--color-surface-soft] px-4 py-3 text-sm text-[--color-foreground] shadow-sm transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20 ${
                errors.organization
                  ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                  : ""
              }`}
            />
            {errors.organization && (
              <p id="organization-error" className="text-xs text-red-500">
                {errors.organization}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="flex items-center justify-between text-sm font-semibold text-[--color-foreground]">
              <span>ご相談内容</span>
              <span className="text-xs font-normal text-[--color-muted-foreground]">4000文字以内</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              maxLength={4000}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`rounded-xl border border-[--color-border] bg-[--color-surface-soft] px-4 py-3 text-sm text-[--color-foreground] shadow-sm transition focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20 ${
                errors.message ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
              }`}
            />
            {errors.message && (
              <p id="message-error" className="text-xs text-red-500">
                {errors.message}
              </p>
            )}
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

