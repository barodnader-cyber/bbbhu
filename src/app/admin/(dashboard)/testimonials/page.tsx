import { deleteTestimonialAction, saveTestimonialAction } from "@/app/admin/actions";
import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await ensureSeeded();
  const { saved } = await searchParams;
  const rows = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));

  return (
    <div>
      <h1 className="text-3xl font-black">التقييمات</h1>
      {saved ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">تم الحفظ.</p>
      ) : null}
      <form action={saveTestimonialAction} className="mt-6 grid gap-3 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
        <input name="name" required className="input" placeholder="الاسم" />
        <input name="city" className="input" placeholder="المدينة" />
        <input name="role" className="input" placeholder="الصفة" />
        <input name="rating" type="number" min={1} max={5} defaultValue={5} className="input" />
        <textarea name="content" required rows={3} className="input md:col-span-2" placeholder="نص التقييم" />
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" name="featured" defaultChecked /> إظهار في الصفحة
        </label>
        <button className="btn-primary w-fit" type="submit">
          إضافة تقييم
        </button>
      </form>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {rows.map((r) => (
          <article key={r.id} className="rounded-3xl bg-white p-5 shadow-sm">
            <p className="font-extrabold">{r.name}</p>
            <p className="text-xs text-ink/50">
              {r.role} — {r.city} — {r.rating}★
            </p>
            <p className="mt-2 text-sm leading-7">{r.content}</p>
            <form action={saveTestimonialAction} className="mt-4 grid gap-2">
              <input type="hidden" name="id" value={r.id} />
              <input name="name" defaultValue={r.name} className="input" />
              <input name="city" defaultValue={r.city || ""} className="input" />
              <input name="role" defaultValue={r.role || ""} className="input" />
              <textarea name="content" defaultValue={r.content} className="input" rows={3} />
              <input name="rating" type="number" defaultValue={r.rating} className="input" />
              <label className="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" name="featured" defaultChecked={r.featured} /> ظاهر
              </label>
              <div className="flex gap-3">
                <button className="font-bold text-brand" type="submit">
                  تحديث
                </button>
              </div>
            </form>
            <form action={deleteTestimonialAction} className="mt-2">
              <input type="hidden" name="id" value={r.id} />
              <button className="text-sm font-bold text-red-600" type="submit">
                حذف
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
