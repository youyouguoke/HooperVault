"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

/**
 * Renders children only when this section enters the viewport.
 * Below-the-fold content (and its JS/API calls) is fully deferred
 * until the user scrolls near it.
 */
export function LazySection({
  children,
  rootMargin = "200px",
  minHeight = 200,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {visible ? children : <div style={{ minHeight }} />}
    </div>
  );
}
