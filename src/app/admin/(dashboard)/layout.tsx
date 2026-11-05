import { logoutAction } from "@/app/admin/actions";
import { BrandLockup } from "@/components/Logo";
import { isAdmin } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "المونيتور" },
  { href: "/admin/content", label: "محرر الموقع" },
  { href: "/admin/articles", label: "المقالات" },
  { href: "/admin/inquiries", label: "الطلبات" },
  { href: "/admin/services", label: "الخدمات" },
  { href: "/admin/pricing", label: "الأسعار" },
  { href: "/admin/testimonials", label: "التقييمات" },
  { href: "/admin/faqs", label: "الأسئلة" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#eef3f8]">
      <header className="sticky top-0 z-40 border-b border-ink/8 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/admin">
            <BrandLockup size={40} idPrefix="admin" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-bold text-brand">
              عرض الموقع
            </Link>
            <form action={logoutAction}>
              <button className="rounded-full bg-ice px-4 py-2 text-sm font-bold text-ink" type="submit">
                خروج
              </button>
            </form>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="shrink-0 rounded-full px-3 py-1.5 text-sm font-bold text-ink/70 hover:bg-ice hover:text-brand"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
    </div>
  );
}
