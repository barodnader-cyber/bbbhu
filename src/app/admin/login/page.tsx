import { loginAction } from "@/app/admin/actions";
import { BrandLockup } from "@/components/Logo";
import { isAdmin } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "دخول الإدارة",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { e } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-navy-deep px-4">
      <form
        action={loginAction}
        className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
      >
        <BrandLockup idPrefix="login" />
        <h1 className="mt-6 text-2xl font-black">دخول لوحة التحكم</h1>
        <p className="mt-2 text-sm text-ink/60">محرر المونيتور وإدارة المقالات والمحتوى.</p>
        <label className="mt-6 grid gap-2 text-sm font-bold">
          كلمة المرور
          <input type="password" name="password" required className="input" autoFocus />
        </label>
        {e ? (
          <p className="mt-3 text-sm font-semibold text-red-600">كلمة المرور غير صحيحة</p>
        ) : null}
        <button className="btn-primary mt-6 w-full" type="submit">
          دخول
        </button>
        <p className="mt-4 text-center text-xs text-ink/40">
          الافتراضي للتجربة: Abrag@2026 — غيّرها عبر ADMIN_PASSWORD
        </p>
      </form>
    </main>
  );
}
