"use client";

import { BrandLockup } from "@/components/Logo";
import { IconPhone, IconWhatsApp } from "@/components/Icons";
import { formatPhone } from "@/lib/defaults";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#services", label: "خدماتنا" },
  { href: "/#benefits", label: "لماذا نحن" },
  { href: "/#pricing", label: "الأسعار" },
  { href: "/#works", label: "أعمالنا" },
  { href: "/articles", label: "المقالات" },
  { href: "/#faq", label: "الأسئلة" },
  { href: "/#contact", label: "تواصل" },
];

export function Navbar({
  brand,
  brandEn,
  phone,
  wa,
}: {
  brand: string;
  brandEn: string;
  phone: string;
  wa: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur shadow-[0_8px_30px_rgba(7,26,46,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" aria-label={brand} className="shrink-0">
          <BrandLockup title={brand} subtitle={brandEn} size={44} idPrefix="nav" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="القائمة الرئيسية">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-ink/75 transition hover:bg-ice hover:text-brand"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:+966${phone.replace(/^0/, "")}`}
            className="inline-flex items-center gap-2 rounded-full bg-ice px-3 py-2 text-sm font-bold text-brand"
          >
            <IconPhone className="h-4 w-4" />
            {formatPhone(phone)}
          </a>
          <a
            href={wa}
            className="btn-primary !px-4 !py-2 text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp className="h-4 w-4" />
            واتساب
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white lg:hidden"
          aria-expanded={open}
          aria-label="فتح القائمة"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">القائمة</span>
          <span className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink/5 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-ice"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={wa}
              className="btn-primary mt-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp /> تواصل واتساب
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
