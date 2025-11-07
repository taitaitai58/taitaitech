"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useBracketAnimation } from "@/hooks/useBracketAnimation";

type Item = {
  title: string;
  description: string;
  tags: string[];
  code: string;
};

const items: Item[] = [
  {
    title: "生成AIチャットボット",
    description: "既存ドキュメントを基に対話できるGPT連携支援。LLM評価指標を設計し、継続的に精度を改善。",
    tags: ["Next.js", "LangChain", "RAG", "Azure OpenAI"],
    code: `const reply = await agent.prompt({
  user: message,
  knowledgeBase,
  safeguards,
});`,
  },
  {
    title: "画像処理パイプライン",
    description: "産業検査向けにリアルタイムな欠陥検出を実現。推論基盤とダッシュボードを一体で提供。",
    tags: ["PyTorch", "ONNX", "Edge TPU", "Grafana"],
    code: `pipeline
  .decode(frame)
  .normalize()
  .infer(model)
  .emit(analytics);`,
  },
  {
    title: "知識体系化ナレッジシステム",
    description: "情報資産を構造化し、検索・回答・可視化までを自動化。現場から経営層まで判断をサポート。",
    tags: ["Neo4j", "TypeScript", "Mermaid", "ElasticSearch"],
    code: `const graph = new KnowledgeGraph(docs);
graph.cluster().summarize();`,
  },
  {
    title: "ノーコード連携支援",
    description: "業務部門が自走できるようにワークフローを設計。API連携や自動化を安全に拡張。",
    tags: ["Make", "Zapier", "Supabase", "Notion API"],
    code: `workflow
  .when(ticket.status === "new")
  .createTask()
  .notify(channel);`,
  },
  {
    title: "ロボット・IoT統合",
    description: "ROS2とWeb技術を橋渡しし、遠隔モニタリングや操作パネルを提供。センサー統合まで対応。",
    tags: ["ROS2", "TypeScript", "MQTT", "Three.js"],
    code: `bridge.publish({
  topic: "/robot/cmd_vel",
  payload: controlVector,
});`,
  },
];

const MATRIX_CHARS = "{}[]():,;\"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const CARD_GAP = 32;
const CARD_WIDTH_FALLBACK = 400;
const DUPLICATION_FACTOR = 3;
const AUTO_SCROLL_DELAY = 2000; // ms
const AUTO_SCROLL_SPEED = 70; // px per second
const GLITCH_START = 0.4; // progress threshold where text starts to glitch
const GLITCH_END = 0.7; // progress at which text is fully glitched (≈3 cards)

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeInPower(value: number, power = 1.75) {
  const clamped = clamp(value, 0, 1);
  return Math.pow(clamped, power);
}

export function SolutionsSlider() {
  const sectionRef = useBracketAnimation<HTMLElement>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cardProgress, setCardProgress] = useState<Record<number, number>>({});
  const [isDragging, setIsDragging] = useState(false);
  const carouselItems = useMemo(
    () =>
      Array.from({ length: items.length * DUPLICATION_FACTOR }, (_, idx) => ({
        item: items[idx % items.length],
        key: `${items[idx % items.length].title}-${idx}`,
      })),
    [],
  );
  const lastInteractionRef = useRef<number>(0);
  const cardWidthRef = useRef<number>(0);
  const cycleWidthRef = useRef<number>(0);
  const autoScrollFrameRef = useRef<number | null>(null);
  const autoScrollTimestampRef = useRef<number | null>(null);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef<number>(0);
  const dragStartScrollRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const hasInitializedRef = useRef<boolean>(false);
  const dragPointerTypeRef = useRef<PointerEvent["pointerType"] | null>(null);

  const markInteraction = useCallback(() => {
    if (typeof performance !== "undefined") {
      lastInteractionRef.current = performance.now();
    } else {
      lastInteractionRef.current = Date.now();
    }
  }, []);

  const scrollByCard = useCallback(
    (direction: number) => {
      const container = containerRef.current;
      if (!container) return;

      markInteraction();

      const firstCard = container.querySelector<HTMLElement>("[data-card-index]");
      const width = cardWidthRef.current || firstCard?.offsetWidth || CARD_WIDTH_FALLBACK;

      container.scrollBy({
        left: direction * (width + CARD_GAP),
        behavior: "smooth",
      });
    },
    [markInteraction],
  );

  const [maskStyle, setMaskStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const gradient =
      "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 6%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, rgba(0,0,0,0.65) 94%, rgba(0,0,0,0) 100%)";

    const supportsMask =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      (CSS.supports("mask-image", gradient) || CSS.supports("-webkit-mask-image", gradient));

    if (supportsMask) {
      setMaskStyle({
        WebkitMaskImage: gradient,
        maskImage: gradient,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      });
    } else {
      setMaskStyle({});
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const styleId = "solutions-scrollbar-hide";
    if (document.getElementById(styleId)) return;

    const styleElement = document.createElement("style");
    styleElement.id = styleId;
    styleElement.textContent = `
.solutions-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.solutions-scroll::-webkit-scrollbar {
  display: none;
}
`;

    document.head.appendChild(styleElement);
  }, []);

  const normalizeScroll = useCallback((target: HTMLElement) => {
    const cycleWidth = cycleWidthRef.current;
    if (!cycleWidth) return;

    const lowerBound = cycleWidth;
    const upperBound = cycleWidth * 2;

    if (target.scrollLeft < lowerBound) {
      target.scrollLeft += cycleWidth;
    } else if (target.scrollLeft >= upperBound) {
      target.scrollLeft -= cycleWidth;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      if (!container) return;
      const bounds = container.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const halfViewport = bounds.width / 2;
      const next: Record<number, number> = {};
      let measuredWidth = cardWidthRef.current;

      container.querySelectorAll<HTMLElement>("[data-card-index]").forEach((card) => {
        const rect = card.getBoundingClientRect();
          const index = Number(card.dataset.cardIndex);

        if (Number.isNaN(index)) return;

        if (!measuredWidth) {
          measuredWidth = rect.width;
        }

        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - centerX);
        const normalized = clamp(distance / (halfViewport + rect.width / 2), 0, 1);
        const eased = Number(easeInPower(normalized).toFixed(3));

        next[index] = eased;
      });

      if (measuredWidth) {
        cardWidthRef.current = measuredWidth;
      }

      setCardProgress(next);

      if (measuredWidth) {
        const cycleWidth = (measuredWidth + CARD_GAP) * items.length;
        cycleWidthRef.current = cycleWidth;
        if (!hasInitializedRef.current && cycleWidth > 0) {
          container.scrollLeft = cycleWidth;
          hasInitializedRef.current = true;
          dragStartScrollRef.current = container.scrollLeft;
        }
        normalizeScroll(container);
      }
    };

    update();
    markInteraction();

    let animationFrame: number | null = null;
    const handleScroll = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(update);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", update);

    const startDrag = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      markInteraction();
      isDraggingRef.current = true;
      dragPointerIdRef.current = event.pointerId;
      dragPointerTypeRef.current = event.pointerType ?? "mouse";
      if (event.pointerType === "touch") {
        setIsDragging(true);
        return;
      }
      dragStartXRef.current = event.clientX;
      dragStartScrollRef.current = container.scrollLeft;
      setIsDragging(true);
      container.setPointerCapture?.(event.pointerId);
    };

    const moveDrag = (event: PointerEvent) => {
      if (!isDraggingRef.current || dragPointerIdRef.current !== event.pointerId) return;
      if (dragPointerTypeRef.current === "touch") {
        return;
      }
      const target = containerRef.current;
      if (!target) return;
      const delta = event.clientX - dragStartXRef.current;
      if (delta === 0) return;
      const previousScroll = target.scrollLeft;
      target.scrollLeft = previousScroll - delta;
      normalizeScroll(target);
      dragStartXRef.current = event.clientX;
      dragStartScrollRef.current = target.scrollLeft;
      event.preventDefault();
    };

    const endDrag = (event: PointerEvent) => {
      if (!isDraggingRef.current || dragPointerIdRef.current !== event.pointerId) return;
      if (dragPointerTypeRef.current !== "touch") {
        container.releasePointerCapture?.(event.pointerId);
        normalizeScroll(container);
        dragStartScrollRef.current = container.scrollLeft;
      }
      isDraggingRef.current = false;
      dragPointerIdRef.current = null;
      dragPointerTypeRef.current = null;
      setIsDragging(false);
      markInteraction();
    };

    container.addEventListener("pointerdown", startDrag);
    container.addEventListener("pointermove", moveDrag);
    container.addEventListener("pointerup", endDrag);
    container.addEventListener("pointercancel", endDrag);

    const autoScrollStep = (timestamp: number) => {
      const target = containerRef.current;
      if (!target) return;

      if (autoScrollTimestampRef.current === null) {
        autoScrollTimestampRef.current = timestamp;
      }

      const delta = timestamp - (autoScrollTimestampRef.current ?? timestamp);
      autoScrollTimestampRef.current = timestamp;

      const lastInteraction = lastInteractionRef.current;
      const threshold = lastInteraction ? timestamp - lastInteraction : Infinity;

      if (threshold >= AUTO_SCROLL_DELAY && !isDraggingRef.current) {
        const distance = (AUTO_SCROLL_SPEED * delta) / 1000;
        const nextScrollLeft = target.scrollLeft + distance;
        target.scrollLeft = nextScrollLeft;
        normalizeScroll(target);
      }

      autoScrollFrameRef.current = requestAnimationFrame(autoScrollStep);
    };

    autoScrollFrameRef.current = requestAnimationFrame(autoScrollStep);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", update);
      container.removeEventListener("pointerdown", startDrag);
      container.removeEventListener("pointermove", moveDrag);
      container.removeEventListener("pointerup", endDrag);
      container.removeEventListener("pointercancel", endDrag);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (autoScrollFrameRef.current) cancelAnimationFrame(autoScrollFrameRef.current);
      autoScrollFrameRef.current = null;
      autoScrollTimestampRef.current = null;
      isDraggingRef.current = false;
      dragPointerIdRef.current = null;
      dragPointerTypeRef.current = null;
      setIsDragging(false);
    };
  }, [markInteraction]);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="section-bracket section-block mx-auto w-full max-w-6xl overflow-hidden"
    >
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold tracking-[0.3em] text-[var(--primary)] ">
            SOLUTIONS
          </p>
          <h2 className="text-3xl font-bold text-[--color-foreground] md:text-4xl">
            「こんなことできますか？」に応える幅広い開発領域
          </h2>
          <p className="text-base leading-7 text-[--color-muted-foreground]">
            実証実験、プロダクト開発、継続運用まで学生主体で完遂します。カードをスライドして得意領域をご覧ください。
          </p>
        </div>
      <div className="mb-6 flex justify-end gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[--color-border] bg-[--color-surface] text-[--color-foreground] shadow-sm transition hover:border-[--color-primary] hover:text-[--color-primary] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary]"
          aria-label="前のソリューション"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[--color-border] bg-[--color-surface] text-[--color-foreground] shadow-sm transition hover:border-[--color-primary] hover:text-[--color-primary] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary]"
          aria-label="次のソリューション"
        >
          →
        </button>
      </div>
      </div>
    
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
      <div
        ref={containerRef}
          className={`solutions-scroll flex gap-6 overflow-x-auto pb-6 sm:gap-8 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ ...maskStyle, touchAction: "auto" }}
        >
          {carouselItems.map(({ item, key }, idx) => {
            const progress = cardProgress[idx] ?? 0;
            const normalized = clamp(progress, 0, 1);
            const glitchFactor = normalized <= GLITCH_START ? 0 : clamp((normalized - GLITCH_START) / (GLITCH_END - GLITCH_START), 0, 1);
            const easedGlitch = Math.pow(glitchFactor, 1.25);
            const descriptionOpacity = clamp(1 - easedGlitch, 0, 1);
            const codeOpacity = easedGlitch;
            const shouldShowCode = codeOpacity > 0.01;
          return (
            <article
                key={key}
              data-card-index={idx}
                className="card-border-animated relative flex h-[360px] w-[260px] flex-none flex-col overflow-hidden border border-[--color-border] bg-[--color-surface] shadow-[0_24px_72px_-40px_rgba(0,0,0,0.38)] transition-[transform] duration-300 sm:h-[380px] sm:w-[300px] md:w-[340px] lg:h-[400px] lg:w-[420px]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[--color-primary]" />
              <div className="absolute inset-y-0 left-0 w-1 bg-[--color-accent-neo]" />
              <div
                  className="absolute inset-0"
                  style={{ opacity: descriptionOpacity, pointerEvents: descriptionOpacity === 0 ? "none" : undefined }}
                >
                  <div className="flex h-full flex-col p-7 pl-10">
                    <div className="flex-1 space-y-5">
                      <h3 className="text-2xl font-semibold text-[--color-foreground]">
                        <MatrixText base={item.title} code={item.code} progress={progress} />
                    </h3>
                      <MatrixParagraph
                        base={item.description}
                        code={item.code}
                        progress={progress}
                        className="text-sm leading-6 text-[--color-muted-foreground]"
                      />
                  </div>
                    <div className="mt-5 flex flex-wrap gap-3 text-xs font-medium text-[--color-primary]">
                    {item.tags.map((tag) => (
                        <MatrixBadge key={tag} base={tag} code={item.code} progress={progress} />
                      ))}
                    </div>
                </div>
              </div>
              <div
                  aria-hidden={!shouldShowCode}
                  className="absolute inset-0 flex h-full flex-col bg-[#1b1b22] p-7 pl-10 font-mono text-xs text-[#d7f7d7]"
                  style={{ opacity: codeOpacity }}
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#87f0af]">
                  CODE SNAPSHOT
                </p>
                  <pre className="mt-5 flex-1 overflow-hidden whitespace-pre-wrap leading-6">
                  {item.code}
                </pre>
                  <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#87f0af]/70">
                  <span className="h-2 w-2 rounded-full bg-[#87f0af]" />
                  Live Build
                </div>
              </div>
            </article>
          );
        })}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-[--color-background] via-[--color-background]/70 to-transparent dark:from-[#050509] dark:via-[#050509]/75 sm:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-[--color-background] via-[--color-background]/70 to-transparent dark:from-[#050509] dark:via-[#050509]/75 sm:block"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

type MatrixTextProps = {
  base: string;
  code: string;
  progress: number;
};

function MatrixText({ base, code, progress }: MatrixTextProps) {
  const display = useMemo(() => {
    const baseChars = Array.from(base);
    if (!baseChars.length) return base;

    const sanitizedCode = code.replace(/\s+/g, " ").trim();
    const codeChars = sanitizedCode.length > 0 ? Array.from(sanitizedCode) : Array.from(MATRIX_CHARS);
    const matrixChars = Array.from(MATRIX_CHARS);

    const normalizedProgress = clamp(progress, 0, 1);
    if (normalizedProgress <= GLITCH_START) {
      return base;
    }

    const amount = clamp((normalizedProgress - GLITCH_START) / (GLITCH_END - GLITCH_START), 0, 1);
    const intensity = Math.pow(amount, 1.5);

    const midPoint = (baseChars.length - 1) / 2;

    const result = baseChars.map((char, idx) => {
      const centerOffset = Math.abs(idx - midPoint) / Math.max(midPoint, 1);
      const charIntensity = clamp(intensity * (0.85 + centerOffset * 0.6), 0, 1);

      if (charIntensity < 0.12) {
        return char;
      }

      if (charIntensity < 0.55) {
        const noiseIdx = (idx * 41 + Math.floor(intensity * 260)) % matrixChars.length;
        return matrixChars[noiseIdx];
      }

      const sourceIdx = (idx + Math.floor(intensity * codeChars.length * 7)) % codeChars.length;
      return codeChars[sourceIdx] ?? matrixChars[(idx * 19) % matrixChars.length];
    });

    return result.join("");
  }, [base, code, progress]);

  return (
    <span data-matrix-progress={progress.toFixed(2)}>
      {display}
    </span>
  );
}

type MatrixParagraphProps = {
  base: string;
  code: string;
  progress: number;
  className?: string;
};

function MatrixParagraph({ base, code, progress, className }: MatrixParagraphProps) {
  return (
    <p className={className} aria-label={base}>
      <MatrixText base={base} code={code} progress={progress} />
    </p>
  );
}

type MatrixBadgeProps = {
  base: string;
  code: string;
  progress: number;
};

function MatrixBadge({ base, code, progress }: MatrixBadgeProps) {
  return (
    <span className="rounded-full bg-[--color-accent] px-3 py-1 text-[--color-primary]">
      <MatrixText base={base} code={code} progress={progress} />
    </span>
  );
}

