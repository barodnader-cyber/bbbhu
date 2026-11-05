import { deleteServiceAction, saveServiceAction } from "@/app/admin/actions";
import { db } from "@/db";
import { services } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  await ensureSeeded();
  const rows = await db.select().from(services).orderBy(asc(services.sortOrder));

  return (
    <div>
      <h1 className="text-3xl font-black">الخدمات</h1>
      <form action={saveServiceAction} className="mt-6 grid gap-3 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
        <input name="title" required className="input" placeholder="اسم الخدمة" />
        <input name="slug" className="input" placeholder="slug" />
        <input name="icon" className="input" placeholder="أيقونة: roof / drop / tank / foam" />
        <input name="priceFrom" className="input" placeholder="السعر من" />
        <input name="image" className="input md:col-span-2" placeholder="صورة" />
        <textarea name="shortDescription" rows={2} className="input md:col-span-2" placeholder="وصف قصير" />
        <textarea name="description" rows={3} className="input md:col-span-2" placeholder="وصف تفصيلي" />
        <textarea name="features" rows={4} className="input md:col-span-2" placeholder="ميزة في كل سطر" />
        <input name="sortOrder" type="number" defaultValue={rows.length + 1} className="input" />
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" name="active" defaultChecked /> ظاهرة
        </label>
        <button className="btn-primary w-fit" type="submit">
          إضافة خدمة
        </button>
      </form>
      <div className="mt-8 space-y-5">
        {rows.map((r) => (
          <form key={r.id} action={saveServiceAction} className="grid gap-3 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2">
            <input type="hidden" name="id" value={r.id} />
            <input name="title" defaultValue={r.title} className="input font-bold" />
            <input name="slug" defaultValue={r.slug} className="input" />
            <input name="icon" defaultValue={r.icon} className="input" />
            <input name="priceFrom" defaultValue={r.priceFrom || ""} className="input" />
            <input name="image" defaultValue={r.image || ""} className="input md:col-span-2" />
            <textarea name="shortDescription" defaultValue={r.shortDescription} rows={2} className="input md:col-span-2" />
            <textarea name="description" defaultValue={r.description} rows={3} className="input md:col-span-2" />
            <textarea
              name="features"
              defaultValue={(r.features || []).join("\n")}
              rows={4}
              className="input md:col-span-2"
            />
            <input name="sortOrder" type="number" defaultValue={r.sortOrder} className="input" />
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
          <form key={`d-${r.id}`} action={deleteServiceAction}>
            <input type="hidden" name="id" value={r.id} />
            <button className="text-sm text-red-600" type="submit">
              حذف: {r.title}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
