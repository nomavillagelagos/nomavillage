"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    ttq?: any;
  }
}

export default function TikTokPixelEvents() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.ttq && typeof window.ttq.page === "function") {
      window.ttq.page();
    }
  }, [pathname]);

  return null;
}
