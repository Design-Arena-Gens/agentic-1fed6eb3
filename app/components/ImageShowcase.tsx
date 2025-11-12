"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState, useTransition } from "react";

const verticalAspect = 1536 / 1024;

export default function ImageShowcase() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isClientLoading, setIsClientLoading] = useState(true);

  const fetchImage = () => {
    startTransition(async () => {
      try {
        setError(null);
        const response = await fetch("/api/generate-image", { method: "POST" });
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload?.error ?? "Failed to generate image.");
        }
        const payload = await response.json();
        if (!payload?.image) {
          throw new Error("Image data missing in response.");
        }
        const source: string | undefined = payload.image;
        if (!source) {
          throw new Error("Image data missing in response.");
        }
        setImageSrc(source.trim());
      } catch (err) {
        console.error(err);
        setImageSrc(null);
        setError(err instanceof Error ? err.message : "Unknown error.");
      } finally {
        setIsClientLoading(false);
      }
    });
  };

  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 py-16">
      <header className="max-w-2xl text-center">
        <p className="tracking-[0.3em] text-xs uppercase text-slate-300">Epic Fantasy Concept</p>
        <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
          Ronaldo vs Fenrir: Asgardian Sprint
        </h1>
        <p className="mt-6 text-base leading-relaxed text-slate-300">
          Photorealistic action tableau of Cristiano Ronaldo in Loki-inspired armor, sprinting through a frozen Norse wasteland while dragging the chained Fenrir wolf amid auroras and shattered ice.
        </p>
      </header>

      <div className="glass relative w-full overflow-hidden rounded-3xl p-6 shadow-2xl">
        <div
          className="relative w-full overflow-hidden rounded-2xl bg-slate-900/60"
          style={{
            paddingBottom: `${verticalAspect * 100}%`,
          }}
        >
          {imageSrc && !error ? (
            <img
              src={imageSrc}
              alt="Cristiano Ronaldo sprinting with Fenrir in a Norse wasteland"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/60">
              <div className="h-14 w-14 animate-spin rounded-full border-2 border-slate-700 border-t-asgard-gold" />
              <p className="text-sm text-slate-300">
                {isClientLoading || isPending
                  ? "Summoning Asgardian spectacle..."
                  : error ?? "Tap regenerate to try again."}
              </p>
            </div>
          )}
        </div>
        <footer className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-slate-300 md:flex-row">
          <p>
            2:3 vertical canvas • Ultra-detailed • Cinematic lighting • Frost & aurora FX
          </p>
          <button
            type="button"
            onClick={fetchImage}
            className="rounded-full bg-asgard-green px-6 py-2 font-semibold text-white shadow-lg transition hover:bg-asgard-green/90 focus:outline-none focus:ring-2 focus:ring-asgard-gold/60"
          >
            Regenerate Scene
          </button>
        </footer>
      </div>
    </section>
  );
}
