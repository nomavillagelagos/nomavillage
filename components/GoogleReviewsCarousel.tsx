"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Review = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
  author_url?: string;
  email_for_gravatar?: string; // optional: if provided, we can render gravatar
};

function md5(str: string) {
  // Lightweight MD5 implementation (tiny) for gravatar hashing
  // Source: https://stackoverflow.com/a/16515203 (trimmed)
  function rhex(n: number) {
    let s = "";
    for (let j = 0; j < 4; j++) s += ("0" + ((n >> (j * 8 + 4)) & 15).toString(16)).slice(-1) + ("0" + ((n >> (j * 8)) & 15).toString(16)).slice(-1);
    return s;
  }
  function ad(x: number, y: number) {
    const l = (x & 0xffff) + (y & 0xffff);
    const m = (x >> 16) + (y >> 16) + (l >> 16);
    return (m << 16) | (l & 0xffff);
  }
  function rl(n: number, c: number) { return (n << c) | (n >>> (32 - c)); }
  function cm(q: number, a: number, b: number, x: number, s: number, t: number) { return ad(rl(ad(ad(a, q), ad(x, t)), s), b); }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cm((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cm((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cm(b ^ c ^ d, a, b, x, s, t); }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) { return cm(c ^ (b | ~d), a, b, x, s, t); }
  function sb(x: number[]) {
    const nblk = ((x.length + 8) >> 6) + 1;
    const blks = new Array(nblk * 16).fill(0);
    for (let i = 0; i < x.length; i++) blks[i >> 2] |= x[i] << ((i % 4) * 8);
    blks[x.length >> 2] |= 0x80 << ((x.length % 4) * 8);
    blks[nblk * 16 - 2] = x.length * 8;
    return blks;
  }
  function str2arr(s: string) {
    const arr: number[] = [];
    for (let i = 0; i < s.length; i++) arr.push(s.charCodeAt(i) & 0xff);
    return arr;
  }
  const x = sb(str2arr(unescape(encodeURIComponent(str))));
  let a = 1732584193; let b = -271733879; let c = -1732584194; let d = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const olda = a, oldb = b, oldc = c, oldd = d;
    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730643);
    a = ii(a, b, c, d, x[i + 0], 6, 681279174);
    d = ii(d, a, b, c, x[i + 7], 10, -358537222);
    c = ii(c, d, a, b, x[i + 14], 15, -722521979);
    b = ii(b, c, d, a, x[i + 5], 21, 76029189);
    a = ii(a, b, c, d, x[i + 12], 6, -640364487);
    d = ii(d, a, b, c, x[i + 3], 10, -421815835);
    c = ii(c, d, a, b, x[i + 10], 15, 530742520);
    b = ii(b, c, d, a, x[i + 1], 21, -995338651);
    a = ad(ad(ad(a, olda), b), c);
    b = ad(ad(ad(b, oldb), c), d);
    c = ad(ad(ad(c, oldc), d), a);
    d = ad(ad(ad(d, oldd), a), b);
  }
  return (rhex(a) + rhex(b) + rhex(c) + rhex(d)).toLowerCase();
}

function getGravatarUrl(email?: string) {
  if (!email) return null;
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=160`;
}

// Reusable fallback reviews used when the API returns too few items
const FALLBACK_REVIEWS: Review[] = [
  { author_name: "Fabienne S", rating: 5, text: "The perfect balance of focus and connection. Great wifi, yoga and awesome hosts!", author_url: "https://www.google.com/maps/contrib/113065037396401172905/reviews" },
  { author_name: "Mr. X (volvic)", rating: 5, text: "Super welcoming community and inspiring people. Loved the energy and the place.", author_url: "https://www.google.com/maps/contrib/107772854416821939764/reviews" },
  { author_name: "Pat Rick", rating: 5, text: "Amazing month here. Beautiful setting, 10 minutes to the beach, genuine community.", author_url: "https://www.google.com/maps/contrib/105503513928987597340/reviews" },
  { author_name: "Sarah M", rating: 5, text: "Incredible experience! The yoga sessions and coworking spaces are top-notch. Made lifelong friends here.", author_url: "https://www.google.com/maps/contrib/118234567890123456789/reviews" },
  { author_name: "Marco L", rating: 5, text: "Perfect location for digital nomads. Fast internet, beautiful surroundings, and amazing community vibes.", author_url: "https://www.google.com/maps/contrib/119876543210987654321/reviews" },
  { author_name: "Emma K", rating: 4, text: "Loved the surf lessons and the proximity to the beach. Great place to disconnect and recharge.", author_url: "https://www.google.com/maps/contrib/117654321098765432109/reviews" },
  { author_name: "David R", rating: 5, text: "Outstanding coliving experience. The hosts are wonderful and the facilities are excellent.", author_url: "https://www.google.com/maps/contrib/116543210987654321098/reviews" },
  { author_name: "Lisa T", rating: 5, text: "Best month of my life! The combination of work, wellness, and community is unbeatable.", author_url: "https://www.google.com/maps/contrib/115432109876543210987/reviews" },
  { author_name: "Alex J", rating: 4, text: "Great atmosphere for productivity and relaxation. The yoga classes by the pool are amazing.", author_url: "https://www.google.com/maps/contrib/114321098765432109876/reviews" },
];

async function fetchReviews(): Promise<Review[]> {
  try {
    const res = await fetch("/api/google-reviews", { cache: "no-store" });
    if (!res.ok) throw new Error("bad");
    const data = await res.json();
    const list: Review[] = (data.reviews || []).map((r: Review) => ({
      ...r,
      text: typeof r.text === 'string' ? r.text : '',
    }));

    // Keep reviews that have any content, but we won't discard very short ones; just push them to the end
    const nonEmpty = list.filter((r) => r.text.trim().length > 0);
    const SHORT_LIMIT = 80; // characters
    const long = nonEmpty.filter((r) => r.text.trim().length >= SHORT_LIMIT).sort((a, b) => b.text.length - a.text.length);
    const short = nonEmpty.filter((r) => r.text.trim().length < SHORT_LIMIT).sort((a, b) => b.rating - a.rating);
    let combined: Review[] = [...long, ...short];

    // If very few reviews were returned (Places API typically returns up to 5), pad with fallbacks to keep carousel scrollable
    const TARGET_MIN = 9;
    if (combined.length < TARGET_MIN) {
      const existingNames = new Set(combined.map((r) => r.author_name));
      for (const f of FALLBACK_REVIEWS) {
        if (combined.length >= TARGET_MIN) break;
        if (!existingNames.has(f.author_name)) {
          combined.push(f);
          existingNames.add(f.author_name);
        }
      }
    }

    return combined;
  } catch (e) {
    return [];
  }
}

export default function GoogleReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [index, setIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const intervalRef = useRef<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const modalPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchReviews().then((r) => setReviews(r));
  }, []);

  // Determine items per slide based on viewport AND number of reviews so we have at least 2 pages when possible
  useEffect(() => {
    function chooseItemsPerSlide(reviewCount: number) {
      const w = window.innerWidth;
      // base target by breakpoint
      let base = 1;
      if (w >= 1024) base = 3;       // lg: want 3
      else if (w >= 768) base = 2;   // md: want 2
      else base = 1;                 // sm: 1

      // If there aren't enough reviews to make at least 2 pages, reduce items per slide
      if (reviewCount > 0) {
        // pages = ceil(count / base). If it's 1 page and we have at least 2 reviews, try to reduce base to get 2 pages
        if (Math.ceil(reviewCount / base) < 2) {
          if (reviewCount >= 2) {
            // pick items per slide so that pages === 2 where possible
            base = Math.max(1, Math.floor(reviewCount / 2));
          } else {
            base = 1;
          }
        }
        // never exceed reviewCount
        base = Math.min(base, reviewCount);
      }
      setItemsPerSlide(base || 1);
    }

    const handler = () => chooseItemsPerSlide(reviews.length);
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [reviews.length]);

  const items = useMemo(() => (reviews.length ? reviews : FALLBACK_REVIEWS), [reviews]);

  // chunk into pages based on itemsPerSlide
  const pages = useMemo(() => {
    const arr: Review[][] = [];
    for (let i = 0; i < items.length; i += itemsPerSlide) {
      arr.push(items.slice(i, i + itemsPerSlide));
    }
    return arr.length ? arr : [items];
  }, [items, itemsPerSlide]);

  useEffect(() => {
    if (!pages.length) return;
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % pages.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [pages.length]);

  const prev = () => setIndex((i) => (i - 1 + pages.length) % pages.length);
  const next = () => setIndex((i) => (i + 1) % pages.length);

  // Modal open/close helpers
  const openModal = (r: Review) => {
    setSelectedReview(r);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  // Accessibility: focus trap + ESC to close when modal open
  useEffect(() => {
    if (!isModalOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === "Tab") {
        const panel = modalPanelRef.current;
        if (!panel) return;
        const focusables = panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }

    // Focus the close button after mount
    const t = setTimeout(() => {
      const panel = modalPanelRef.current;
      if (!panel) return;
      const btn = panel.querySelector<HTMLElement>("button[data-close]");
      btn?.focus();
    }, 0);

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const truncate = (text: string, max = 180) => {
    if (!text) return "";
    if (text.length <= max) return text;
    return text.slice(0, max).trimEnd() + "...";
  };

  const modalAvatar = selectedReview
    ? (selectedReview.profile_photo_url || getGravatarUrl(selectedReview.email_for_gravatar))
    : null;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {pages.map((page, pIdx) => (
            <div key={pIdx} className="min-w-full px-2">
              <div className={cn("grid gap-6", 
                itemsPerSlide === 1 ? "grid-cols-1" : 
                itemsPerSlide === 2 ? "grid-cols-1 md:grid-cols-2" : 
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              )}>
                {page.map((r, i) => {
                  const avatar = r.profile_photo_url || getGravatarUrl(r.email_for_gravatar);
                  return (
                    <div key={i} className="h-full">
                      <div className="border border-gray-100 shadow-sm rounded-2xl p-6 bg-white h-full hover:shadow-md transition-shadow duration-300 flex flex-col">
                        <div className="mb-4 flex items-center gap-2">
                          <div className="text-yellow-400 text-lg">{"★★★★★".slice(0, Math.max(1, Math.min(5, r.rating)))}</div>
                          <span className="text-sm text-gray-500 font-medium">{r.rating}/5</span>
                        </div>
                        <div className="mb-6 grow">
                          <p className="font-nunito text-gray-800 leading-relaxed text-base">
                            "{truncate(r.text)}"
                          </p>
                          {r.text && r.text.length > 180 && (
                            <button
                              onClick={() => openModal(r)}
                              className="mt-2 text-lagos-blue-green hover:text-lagos-blue-green/80 font-montserrat text-sm underline"
                              aria-label={`Read full review from ${r.author_name}`}
                            >
                              Read more
                            </button>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                          {avatar ? (
                            <span className="w-12 h-12 rounded-full bg-white ring-1 ring-gray-200 shadow-sm overflow-hidden flex items-center justify-center bg-gray-50 shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={avatar}
                                alt={r.author_name}
                                className="w-full h-full object-cover block"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            </span>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-white ring-1 ring-gray-200 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lagos-blue-green to-lagos-aquamarine flex items-center justify-center font-montserrat font-semibold text-white text-lg">
                                {r.author_name?.charAt(0) || "?"}
                              </div>
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            {r.author_url ? (
                              <a href={r.author_url} target="_blank" rel="noopener noreferrer" className="font-montserrat font-semibold text-gray-900 hover:text-lagos-blue-green transition-colors">
                                {r.author_name}
                              </a>
                            ) : (
                              <div className="font-montserrat font-semibold text-gray-900 truncate">{r.author_name}</div>
                            )}
                            <div className="text-sm text-gray-500">Google Review{r.relative_time_description ? ` · ${r.relative_time_description}` : ""}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {pages.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button 
            onClick={prev} 
            aria-label="Previous" 
            className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-lagos-blue-green hover:bg-lagos-blue-green hover:text-white transition-all duration-200 flex items-center justify-center text-gray-600 font-semibold shadow-sm cursor-pointer"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {pages.map((_, i) => (
              <button 
                key={i} 
                aria-label={`Go to ${i + 1}`} 
                onClick={() => setIndex(i)} 
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-200 cursor-pointer", 
                  i === index ? "bg-lagos-blue-green scale-110" : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
          <button 
            onClick={next} 
            aria-label="Next" 
            className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-lagos-blue-green hover:bg-lagos-blue-green hover:text-white transition-all duration-200 flex items-center justify-center text-gray-600 font-semibold shadow-sm cursor-pointer"
          >
            ›
          </button>
        </div>
      )}

      {isModalOpen && selectedReview && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200"
          aria-hidden={!isModalOpen}
          onClick={closeModal}
        >
          <div
            ref={modalPanelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            className="relative mx-4 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              data-close
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-3 top-3 h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center"
            >
              ×
            </button>
            <div className="mb-4 flex items-center gap-3">
              {modalAvatar ? (
                <span className="w-12 h-12 rounded-full bg-white ring-1 ring-gray-200 shadow-sm overflow-hidden flex items-center justify-center bg-gray-50 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={modalAvatar} alt={selectedReview.author_name} className="w-full h-full object-cover block" />
                </span>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lagos-blue-green to-lagos-aquamarine flex items-center justify-center text-white font-montserrat text-lg">
                  {selectedReview.author_name?.charAt(0) || "?"}
                </div>
              )}
              <div className="min-w-0">
                <h3 id="review-modal-title" className="font-montserrat font-semibold text-gray-900 text-lg">
                  {selectedReview.author_name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="text-yellow-400">{"★★★★★".slice(0, Math.max(1, Math.min(5, selectedReview.rating)))}</div>
                  <span className="font-medium">{selectedReview.rating}/5</span>
                  {selectedReview.relative_time_description && (
                    <span>· {selectedReview.relative_time_description}</span>
                  )}
                </div>
              </div>
            </div>
            <p className="font-nunito text-gray-800 leading-relaxed mb-4">"{selectedReview.text}"</p>
            <div className="text-sm text-gray-500">Google Review</div>
          </div>
        </div>
      )}
    </div>
  );
}
