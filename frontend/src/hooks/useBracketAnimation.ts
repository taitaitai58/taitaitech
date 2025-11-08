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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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


