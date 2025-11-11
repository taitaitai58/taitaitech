"use client";

import { useEffect, useRef } from "react";

export function useBracketAnimation<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      node.classList.add("section-bracket--visible");
      return;
    }

    //ブラウザAPIを使ってみる。インスタンス作成したらずっと読み取ってくれる
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //仮想DOMではなく、生のDOMを操作している。再レンダーされると仮想DOMの内容に置き換わる。
            entry.target.classList.add("section-bracket--visible");
          } else {
            entry.target.classList.remove("section-bracket--visible");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, []);

  return ref;
}


