import { db } from "@/db";
import { articles, inquiries, services, testimonials } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminMonitorPage() {
  await ensureSeeded();
  const [allInquiries, allArticles, allServices, allTestimonials] = await Promise.all([
    db.select().from(inquiries).orderBy(desc(inquiries.createdAt)),
    db.select().from(articles),
    db.select().from(services),
    db.select().from(testimonials),
  ]);
  const newCount = allInquiries.filter((i) => i.status === "new").length;
  const published = allArticles.filter((a) => a.published).length;
  const recent = allInquiries.slice(0, 8);

  return (
    <div>
      <h1 className="text-3xl font-black">مونيتور أبراج العزل</h1>
      <p className="mt-2 text-ink/60">نظرة سريعة على الطلبات والمحتوى — تحكّم كامل من التبويبات أعلاه.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { l: "طلبات جديدة", v: newCount, href: "/admin/inquiries" },
          { l: "كل الطلبات", v: allInquiries.length, href: "/admin/inquiries" },
          { l: "مقالات منشورة", v: published, href: "/admin/articles" },
          { l: "خدمات نشطة", v: allServices.length, href: "/admin/services" },
        ].map((c) => (
          <Link key={c.l} href={c.href} className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-ink/50">{c.l}</p>
            <p className="mt-2 text-4xl font-black text-brand">{c.v}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold">آخر الطلبات</h2>
            <Link href="/admin/inquiries" className="text-sm font-bold text-brand">
              الكل
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-ink/50">
                <tr>
                  <th className="py-2 text-right">الاسم</th>
                  <th className="py-2 text-right">الجوال</th>
                  <th className="py-2 text-right">الخدمة</th>
                  <th className="py-2 text-right">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id} className="border-t border-ink/5">
                    <td className="py-3 font-bold">{r.name}</td>
                    <td className="py-3">{r.phone}</td>
                    <td className="py-3">{r.service}</td>
                    <td className="py-3">{r.status === "new" ? "جديد" : r.status}</td>
                  </tr>
                ))}
                {recent.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-ink/40">
                      لا توجد طلبات بعد
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
        <section className="rounded-3xl bg-navy p-6 text-white">
          <h2 className="text-lg font-extrabold">اختصارات المحرر</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/admin/content" className="text-sky">
                تعديل نصوص الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/admin/articles/new" className="text-sky">
                كتابة مقال جديد
              </Link>
            </li>
            <li>
              <Link href="/admin/services" className="text-sky">
                إضافة / تعديل خدمة
              </Link>
            </li>
            <li>
              <Link href="/admin/pricing" className="text-sky">
                تحديث الأسعار
              </Link>
            </li>
            <li>
              التقييمات الحالية: {allTestimonials.length}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
