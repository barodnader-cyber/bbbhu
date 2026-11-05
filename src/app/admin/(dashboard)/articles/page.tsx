import { deleteArticleAction } from "@/app/admin/actions";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await ensureSeeded();
  const { saved } = await searchParams;
  const rows = await db.select().from(articles).orderBy(desc(articles.createdAt));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black">محرر المقالات</h1>
          <p className="mt-1 text-ink/60">أنشئ وعدّل مقالات تحسين السيو والمدونة.</p>
        </div>
        <Link href="/admin/articles/new" className="btn-primary">
          مقال جديد
        </Link>
      </div>
      {saved ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">تم الحفظ.</p>
      ) : null}
      <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-ice text-ink/60">
            <tr>
              <th className="p-4 text-right">العنوان</th>
              <th className="p-4 text-right">التصنيف</th>
              <th className="p-4 text-right">الحالة</th>
              <th className="p-4 text-right">مشاهدات</th>
              <th className="p-4 text-right">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-ink/5">
                <td className="p-4 font-bold">{r.title}</td>
                <td className="p-4">{r.category}</td>
                <td className="p-4">{r.published ? "منشور" : "مسودة"}</td>
                <td className="p-4">{r.views}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/articles/${r.id}`} className="font-bold text-brand">
                      تعديل
                    </Link>
                    <form action={deleteArticleAction}>
                      <input type="hidden" name="id" value={r.id} />
                      <button className="font-bold text-red-600" type="submit">
                        حذف
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
