"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          // if we only want to animate once, unobserve
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.2, rootMargin: '0px', ...(options || {}) });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView } as const;
}
