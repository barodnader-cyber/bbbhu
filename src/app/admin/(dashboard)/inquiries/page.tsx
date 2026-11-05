import { deleteInquiryAction, updateInquiryStatusAction } from "@/app/admin/actions";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function InquiriesPage() {
  await ensureSeeded();
  const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));

  return (
    <div>
      <h1 className="text-3xl font-black">طلبات العملاء</h1>
      <p className="mt-2 text-ink/60">كل نماذج الكشف المجاني تصل إلى هنا.</p>
      <div className="mt-6 overflow-x-auto rounded-3xl bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-ice text-ink/60">
            <tr>
              <th className="p-4 text-right">الاسم</th>
              <th className="p-4 text-right">الجوال</th>
              <th className="p-4 text-right">المدينة</th>
              <th className="p-4 text-right">الخدمة</th>
              <th className="p-4 text-right">الرسالة</th>
              <th className="p-4 text-right">الحالة</th>
              <th className="p-4 text-right" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-ink/5 align-top">
                <td className="p-4 font-bold">{r.name}</td>
                <td className="p-4">
                  <a className="text-brand" href={`tel:${r.phone}`}>
                    {r.phone}
                  </a>
                </td>
                <td className="p-4">{r.city}</td>
                <td className="p-4">{r.service}</td>
                <td className="p-4 max-w-xs">{r.message}</td>
                <td className="p-4">
                  <form action={updateInquiryStatusAction} className="flex gap-2">
                    <input type="hidden" name="id" value={r.id} />
                    <select name="status" defaultValue={r.status} className="input !py-1">
                      <option value="new">جديد</option>
                      <option value="contacted">تم التواصل</option>
                      <option value="done">مكتمل</option>
                    </select>
                    <button className="text-xs font-bold text-brand" type="submit">
                      حفظ
                    </button>
                  </form>
                </td>
                <td className="p-4">
                  <form action={deleteInquiryAction}>
                    <input type="hidden" name="id" value={r.id} />
                    <button className="text-red-600" type="submit">
                      حذف
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-ink/40">
                  لا توجد طلبات بعد
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
