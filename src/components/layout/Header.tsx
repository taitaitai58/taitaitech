"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "トップ" },
  { href: "/services", label: "サービス" },
  { href: "/team", label: "メンバー" },
  { href: "/process", label: "開発プロセス" },
  { href: "/blog", label: "ブログ" },
  { href: "/#contact", label: "お問い合わせ" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[--color-border] bg-[color:rgba(8,8,9,0.85)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[--color-primary] text-lg font-semibold text-white shadow-[var(--shadow)] transition-transform duration-300 group-hover:scale-105">
            TT
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-[0.4em] text-[--color-muted-foreground]">
              TAITAI
            </span>
            <span className="text-lg font-bold text-[--color-foreground]">
              TECH
            </span>
          </div>
        </Link>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[--color-border] bg-[--color-surface] text-[--color-foreground] shadow-sm transition md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="メニューを開閉"
        >
          <span className="sr-only">メニュー</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-current transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="surge-underline text-sm font-medium text-[--color-muted-foreground] transition-colors hover:text-[--color-primary]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? "max-h-96 border-t border-[--color-border]" : "max-h-0"
        } overflow-hidden bg-[--color-surface] transition-[max-height] duration-300 ease-out`}
      >
        <nav className="flex flex-col gap-4 px-6 py-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="surge-underline text-base font-medium text-[--color-muted-foreground] transition-colors hover:text-[--color-primary]"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

