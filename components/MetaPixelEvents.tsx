"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Declare fbq on window for TypeScript
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const PIXEL_ID = "1087343619857001"; // Provided by user

export default function MetaPixelEvents() {
  const pathname = usePathname();
  const engagedFiredRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollHandlerRef = useRef<((this: Window, ev: Event) => any) | null>(null);

  // Helper to safely call fbq
  const fbqSafe = (...args: any[]) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq(...args);
    }
  };

  // Send PageView on route change (SPA behavior)
  useEffect(() => {
    fbqSafe("track", "PageView");
  }, [pathname]);

  // Setup engaged event logic: 50% scroll OR 30s time on page (whichever first)
  useEffect(() => {
    engagedFiredRef.current = false;

    const fireEngaged = (reason: "scroll" | "time") => {
      if (engagedFiredRef.current) return;
      engagedFiredRef.current = true;

      // Cleanup listeners once fired
      if (scrollHandlerRef.current) {
        window.removeEventListener("scroll", scrollHandlerRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      const scrollDepth = getScrollDepthPercent();
      fbqSafe("trackCustom", "EngagedView", {
        engagement_type: reason,
        time_on_page_ms: performance?.now?.() ?? undefined,
        scroll_depth_percent: Math.round(scrollDepth),
        path: pathname,
      });
    };

    const getScrollDepthPercent = () => {
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const winHeight = window.innerHeight || html.clientHeight;
      const scrollTop = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
      const trackLength = docHeight - winHeight;
      if (trackLength <= 0) return 100;
      return (scrollTop / trackLength) * 100;
    };

    // Scroll condition: 50% depth
    const onScroll = () => {
      if (engagedFiredRef.current) return;
      if (getScrollDepthPercent() >= 50) {
        fireEngaged("scroll");
      }
    };
    scrollHandlerRef.current = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });

    // Time condition: 30 seconds
    timerRef.current = setTimeout(() => fireEngaged("time"), 30000);

    return () => {
      if (scrollHandlerRef.current) {
        window.removeEventListener("scroll", scrollHandlerRef.current);
        scrollHandlerRef.current = null;
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pathname]);

  return null;
}
