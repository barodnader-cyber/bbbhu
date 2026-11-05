"use client";

import { useState } from "react";
import type { Faq } from "@/db/schema";

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((faq) => {
        const isOpen = open === faq.id;
        return (
          <div
            key={faq.id}
            className="overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-[0_8px_30px_rgba(7,26,46,0.04)]"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : faq.id)}
            >
              <span className="text-base font-extrabold text-ink">{faq.question}</span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ice text-brand transition ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {isOpen ? (
              <p className="px-5 pb-5 text-sm leading-8 text-ink/70">{faq.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
