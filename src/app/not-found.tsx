import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="text-sm font-extrabold text-brand">404</p>
        <h1 className="mt-2 text-3xl font-black">الصفحة غير موجودة</h1>
        <p className="mt-3 text-ink/60">ربما نُقل المقال أو تغيّر الرابط.</p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
