"use client";

import React from "react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

type ScarcityBadgeProps = {
  text?: string;
  className?: string;
};

/**
 * Corner scarcity badge positioned absolutely in the top-right of a relatively positioned parent.
 *
 * Usage example:
 *
 * <div className="relative">  // parent must be relative
 *   <ScarcityBadge />
 *   <YourCardOrBox />
 * </div>
 */
export default function ScarcityBadge({ text, className }: ScarcityBadgeProps) {
  // If a fixed text is provided, prefer it and skip dynamic behavior
  const [dynamicText, setDynamicText] = useState<string>(text ?? "");

  useEffect(() => {
    if (text) {
      setDynamicText(text);
      return;
    }

    try {
      const VISITS_KEY = "scarcity_visits";
      const VALUE_KEY = "scarcity_spots";

      // Read prior state
      const visitsRaw = sessionStorage.getItem(VISITS_KEY);
      const valueRaw = sessionStorage.getItem(VALUE_KEY);
      let visits = Number.isFinite(Number(visitsRaw)) ? Number(visitsRaw) : 0;
      let spots = Number.isFinite(Number(valueRaw)) ? Number(valueRaw) : NaN;

      // First time in this session: pick a realistic starting value (2-4) with weighting
      if (!Number.isFinite(spots)) {
        const r = Math.random();
        if (r < 0.5) spots = 2;           // 50% chance
        else if (r < 0.85) spots = 3;     // 35% chance
        else spots = 4;                   // 15% chance
      }

      // Clamp to ensure we never show below 2 or above 5.
      // This also corrects any legacy or corrupted stored values (e.g., 0 or 10).
      spots = Math.min(5, Math.max(2, spots));

      // Increment visits within this session
      visits += 1;

      // Every few visits (e.g., every 3rd visit), nudge the number down towards 2
      if (visits % 3 === 0 && spots > 2) {
        spots = Math.max(2, spots - 1);
      }

      // Persist for the rest of the session
      sessionStorage.setItem(VISITS_KEY, String(visits));
      sessionStorage.setItem(VALUE_KEY, String(spots));

      setDynamicText(`${spots} SPOTS LEFT`);
    } catch {
      // Fallback if sessionStorage is blocked
      setDynamicText("2 SPOTS LEFT");
    }
  }, [text]);

  const textToShow = dynamicText || text || "2 SPOTS LEFT";

  return (
    <div
      className={clsx(
        // position
        "absolute top-[15px] right-[-8px]",
        // look & feel
        "bg-[#ea86c0] text-white rounded-md shadow-md",
        // text styles
        "px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider",
        className
      )}
      aria-label={textToShow}
    >
      {textToShow}
    </div>
  );
}
