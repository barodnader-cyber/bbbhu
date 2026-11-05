"use client";

import { IconPhone, IconWhatsApp } from "@/components/Icons";

export function FloatingCtas({ phone, wa }: { phone: string; wa: string }) {
  return (
    <>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="واتساب"
        className="fixed bottom-24 left-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_12px_30px_rgba(16,185,129,0.45)] transition hover:scale-105 md:bottom-8 md:left-8"
      >
        <span className="absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-emerald-400" />
        <IconWhatsApp className="relative h-7 w-7" />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:+966${phone.replace(/^0/, "")}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ice py-3 text-sm font-extrabold text-brand"
          >
            <IconPhone className="h-4 w-4" />
            اتصال
          </a>
          <a
            href={wa}
            className="btn-primary !py-3 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp className="h-4 w-4" />
            واتساب فوري
          </a>
        </div>
      </div>
    </>
  );
}
