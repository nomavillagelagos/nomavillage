"use client";

import Image from "next/image";
import React from "react";

type Slide = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

type CarouselProps = {
  slides?: Slide[];
  autoPlayMs?: number; // set to 0 to disable
  className?: string;
  aspectRatio?: `${number}/${number}` | "16/9" | "4/3" | "1/1";
  fullHeight?: boolean;
};

const DEFAULT_SLIDES: Slide[] = [
  { src: "/images/rooms/kitchen.jpg", alt: "Kitchen", width: 1600, height: 900 },
  { src: "/images/rooms/room1.jpg", alt: "Room 1", width: 1600, height: 900 },
  { src: "/images/rooms/room2.jpg", alt: "Room 2", width: 1600, height: 900 },
  { src: "/images/rooms/room3.jpg", alt: "Room 3", width: 1600, height: 900 },
  { src: "/images/rooms/bath.jpg", alt: "Bathroom", width: 1600, height: 900 },
];

export default function Carousel({
  slides = DEFAULT_SLIDES,
  autoPlayMs = 4500,
  className = "",
  aspectRatio = "16/9",
  fullHeight = false,
}: CarouselProps) {
  const [index, setIndex] = React.useState(0);
  const timerRef = React.useRef<number | null>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const count = slides.length;

  const goTo = React.useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count]
  );

  const next = React.useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = React.useCallback(() => goTo(index - 1), [goTo, index]);

  // autoplay
  React.useEffect(() => {
    if (!autoPlayMs) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoPlayMs) as unknown as number;
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoPlayMs, count]);

  // keyboard
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // touch
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0;
    let delta = 0;
    const onStart = (x: number) => {
      startX = x;
      delta = 0;
    };
    const onMove = (x: number) => {
      delta = x - startX;
    };
    const onEnd = () => {
      if (Math.abs(delta) > 50) {
        if (delta < 0) next();
        else prev();
      }
      startX = 0;
      delta = 0;
    };
    const touchStart = (e: TouchEvent) => onStart(e.touches[0].clientX);
    const touchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);
    const touchEnd = () => onEnd();
    el.addEventListener("touchstart", touchStart);
    el.addEventListener("touchmove", touchMove);
    el.addEventListener("touchend", touchEnd);
    return () => {
      el.removeEventListener("touchstart", touchStart);
      el.removeEventListener("touchmove", touchMove);
      el.removeEventListener("touchend", touchEnd);
    };
  }, [next, prev]);

  return (
    <div
      className={
        "relative w-full select-none " + (className ?? "")
      }
      style={fullHeight ? { height: "100vh" } : undefined}
    >
      <div
        className={"w-full overflow-hidden rounded-lg " + (fullHeight ? "h-full" : "")}
        style={fullHeight ? undefined : { aspectRatio }}
      >
        <div
          ref={trackRef}
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              <Image
                src={s.src}
                alt={s.alt ?? `Slide ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                style={{ objectFit: "cover" }}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow hover:bg-white"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-black shadow hover:bg-white"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={
              "h-2 w-2 rounded-full transition" +
              (i === index ? " bg-white" : " bg-white/50 hover:bg-white/80")
            }
          />
        ))}
      </div>
    </div>
  );
}
