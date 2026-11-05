import { deleteFaqAction, saveFaqAction } from "@/app/admin/actions";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function FaqsAdminPage() {
  await ensureSeeded();
  const rows = await db.select().from(faqs).orderBy(asc(faqs.sortOrder));

  return (
    <div>
      <h1 className="text-3xl font-black">الأسئلة الشائعة</h1>
      <form action={saveFaqAction} className="mt-6 grid gap-3 rounded-3xl bg-white p-6 shadow-sm">
        <input name="question" required className="input" placeholder="السؤال" />
        <textarea name="answer" required rows={3} className="input" placeholder="الإجابة" />
        <input name="sortOrder" type="number" defaultValue={rows.length + 1} className="input" />
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" name="active" defaultChecked /> ظاهر
        </label>
        <button className="btn-primary w-fit" type="submit">
          إضافة سؤال
        </button>
      </form>
      <div className="mt-6 space-y-4">
        {rows.map((r) => (
          <form key={r.id} action={saveFaqAction} className="grid gap-2 rounded-3xl bg-white p-5 shadow-sm">
            <input type="hidden" name="id" value={r.id} />
            <input name="question" defaultValue={r.question} className="input font-bold" />
            <textarea name="answer" defaultValue={r.answer} rows={3} className="input" />
            <input name="sortOrder" type="number" defaultValue={r.sortOrder} className="input" />
            <label className="flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" name="active" defaultChecked={r.active} /> ظاهر
            </label>
            <div className="flex gap-4">
              <button className="font-bold text-brand" type="submit">
                تحديث
              </button>
            </div>
          </form>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <form key={`d-${r.id}`} action={deleteFaqAction}>
            <input type="hidden" name="id" value={r.id} />
            <button className="text-sm text-red-600" type="submit">
              حذف: {r.question}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
