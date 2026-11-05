import { deletePricingAction, savePricingAction } from "@/app/admin/actions";
import { db } from "@/db";
import { pricingPlans } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function PricingAdminPage() {
  await ensureSeeded();
  const rows = await db.select().from(pricingPlans).orderBy(asc(pricingPlans.sortOrder));

  return (
    <div>
      <h1 className="text-3xl font-black">باقات الأسعار</h1>
      <form action={savePricingAction} className="mt-6 grid gap-3 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
        <input name="name" required className="input" placeholder="اسم الباقة" />
        <input name="price" required className="input" placeholder="السعر" />
        <input name="unit" className="input" placeholder="الوحدة" />
        <input name="sortOrder" type="number" defaultValue={rows.length + 1} className="input" />
        <textarea name="description" rows={2} className="input md:col-span-2" placeholder="الوصف" />
        <textarea name="features" rows={4} className="input md:col-span-2" placeholder="ميزة في كل سطر" />
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" name="featured" /> مميزة
        </label>
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" name="active" defaultChecked /> ظاهرة
        </label>
        <button className="btn-primary w-fit" type="submit">
          إضافة باقة
        </button>
      </form>
      <div className="mt-8 space-y-5">
        {rows.map((r) => (
          <form key={r.id} action={savePricingAction} className="grid gap-3 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
            <input type="hidden" name="id" value={r.id} />
            <input name="name" defaultValue={r.name} className="input font-bold" />
            <input name="price" defaultValue={r.price} className="input" />
            <input name="unit" defaultValue={r.unit || ""} className="input" />
            <input name="sortOrder" type="number" defaultValue={r.sortOrder} className="input" />
            <textarea name="description" defaultValue={r.description || ""} rows={2} className="input md:col-span-2" />
            <textarea name="features" defaultValue={(r.features || []).join("\n")} rows={4} className="input md:col-span-2" />
            <label className="flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" name="featured" defaultChecked={r.featured} /> مميزة
            </label>
            <label className="flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" name="active" defaultChecked={r.active} /> ظاهرة
            </label>
            <button className="font-bold text-brand" type="submit">
              تحديث
            </button>
          </form>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <form key={`d-${r.id}`} action={deletePricingAction}>
            <input type="hidden" name="id" value={r.id} />
            <button className="text-sm text-red-600" type="submit">
              حذف: {r.name}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
