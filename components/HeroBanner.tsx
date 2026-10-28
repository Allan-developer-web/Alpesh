
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Delicious food, delivered with love.",
    subtitle:
      "Discover freshly prepared meals, bold flavours and your new favourites.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1800&q=90",
    alt: "Juicy gourmet burger",
    label: "FRESH & DELICIOUS",
  },
  {
    title: "Make every meal a little special.",
    subtitle:
      "Share a delicious pizza loaded with flavour and made for good moments.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1800&q=90",
    alt: "Freshly baked pizza",
    label: "MADE FOR SHARING",
  },
  {
    title: "Your cravings, our speciality.",
    subtitle:
      "From crispy chicken to satisfying meals, something delicious awaits.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1800&q=85",
    alt: "Crispy fried chicken",
    label: "YOUR NEXT FAVOURITE",
  },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  const previous = () => {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  return (
    <section
      className="relative isolate h-[300px] overflow-hidden bg-stone-950 sm:h-[360px] lg:h-[400px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          aria-hidden={index !== active}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
              index === active ? "scale-110" : "scale-100"
            }`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-12 py-4 sm:px-16 lg:px-20">
        <div className="max-w-2xl text-white">
          <p className="mb-2 text-xs font-extrabold tracking-[0.25em] text-orange-400 sm:text-sm">
            <span className="mr-3 inline-block w-8 border-t-2 border-orange-500 align-middle" />
            {slides[active].label}
          </p>

          <h1
            key={`title-${active}`}
            className="animate-[bannerTextIn_700ms_ease-out] text-2xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {slides[active].title}
          </h1>

          <p
            key={`subtitle-${active}`}
            className="mt-2 max-w-xl animate-[bannerTextIn_900ms_ease-out] text-base leading-7 text-white/85 sm:text-lg"
          >
            {slides[active].subtitle}
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="rounded-xl bg-orange-600 px-4 py-2.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-500"
            >
              Explore Menu →
            </Link>

            <Link
              href="/popular"
              className="rounded-xl border border-white/70 px-4 py-2.5 font-bold text-white transition hover:bg-white hover:text-stone-950"
            >
              Popular Meals
            </Link>
          </div>

          <p className="mt-3 text-sm text-white/75">
            Freshly prepared <span className="mx-2 text-orange-400">•</span>
            Full of flavour <span className="mx-2 text-orange-400">•</span>
            Made with care
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={previous}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-2xl text-white backdrop-blur transition hover:bg-orange-600 sm:left-6 sm:h-12 sm:w-12"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-2xl text-white backdrop-blur transition hover:bg-orange-600 sm:right-6 sm:h-12 sm:w-12"
      >
        ›
      </button>

      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === active
                ? "w-9 bg-orange-500"
                : "w-2.5 bg-white/65 hover:bg-white"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
