import { saveSettingsAction } from "@/app/admin/actions";
import { getSettings } from "@/lib/site";

export const dynamic = "force-dynamic";

const FIELDS: { key: string; label: string; type?: "textarea" | "text" }[] = [
  { key: "brand_ar", label: "اسم العلامة بالعربي" },
  { key: "brand_en", label: "الاسم الإنجليزي" },
  { key: "tagline", label: "الشعار المختصر" },
  { key: "phone", label: "رقم الجوال" },
  { key: "whatsapp", label: "واتساب (مع مفتاح الدولة)" },
  { key: "email", label: "البريد" },
  { key: "address", label: "العنوان" },
  { key: "hours", label: "ساعات العمل" },
  { key: "cities", label: "المدن المغطاة" },
  { key: "hero_badge", label: "شارة الهيرو" },
  { key: "hero_title", label: "عنوان الهيرو", type: "textarea" },
  { key: "hero_subtitle", label: "وصف الهيرو", type: "textarea" },
  { key: "hero_cta_primary", label: "زر أساسي" },
  { key: "hero_cta_secondary", label: "زر ثانوي" },
  { key: "about_title", label: "عنوان لماذا نحن" },
  { key: "about_body", label: "نص من نحن", type: "textarea" },
  { key: "seo_title", label: "عنوان SEO" },
  { key: "seo_description", label: "وصف SEO", type: "textarea" },
  { key: "stat_projects", label: "عدد المشاريع" },
  { key: "stat_years", label: "سنوات الخبرة" },
  { key: "stat_warranty", label: "سنوات الضمان" },
  { key: "stat_cities", label: "عدد المدن" },
];

export default async function ContentEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const settings = await getSettings();
  const { saved } = await searchParams;

  return (
    <div>
      <h1 className="text-3xl font-black">محرر المونيتور — محتوى الموقع</h1>
      <p className="mt-2 text-ink/60">
        عدّل النصوص الظاهرة في الصفحة الرئيسية وبيانات التواصل وتحسين محركات البحث. التغييرات تظهر فوراً.
      </p>
      {saved ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
          تم حفظ التعديلات بنجاح.
        </p>
      ) : null}
      <form action={saveSettingsAction} className="mt-8 grid gap-4 rounded-3xl bg-white p-6 shadow-sm">
        {FIELDS.map((f) => (
          <label key={f.key} className="grid gap-1.5 text-sm font-bold">
            {f.label}
            {f.type === "textarea" ? (
              <textarea name={f.key} rows={4} className="input font-medium" defaultValue={settings[f.key] || ""} />
            ) : (
              <input name={f.key} className="input font-medium" defaultValue={settings[f.key] || ""} />
            )}
          </label>
        ))}
        <button className="btn-primary mt-2 w-fit" type="submit">
          حفظ كل التغييرات
        </button>
      </form>
    </div>
  );
}
