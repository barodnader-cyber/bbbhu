"use client";

import { useState } from "react";

const SERVICES = [
  "عزل أسطح",
  "كشف تسربات المياه",
  "عزل خزانات",
  "عزل فوم",
  "عزل حمامات / مسابح",
  "معالجة رطوبة",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-bold text-ink">
          الاسم
          <input name="name" required className="input font-medium" placeholder="اسمك الكريم" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold text-ink">
          الجوال
          <input
            name="phone"
            required
            inputMode="tel"
            className="input font-medium"
            placeholder="05xxxxxxxx"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-bold text-ink">
          المدينة
          <input name="city" className="input font-medium" placeholder="الرياض" />
        </label>
        <label className="grid gap-1.5 text-sm font-bold text-ink">
          الخدمة
          <select name="service" className="input font-medium">
            {SERVICES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-bold text-ink">
        تفاصيل الطلب
        <textarea
          name="message"
          rows={4}
          className="input font-medium"
          placeholder="مساحة السطح، نوع الخزان، أو وصف التسرب..."
        />
      </label>
      <button className="btn-primary" disabled={status === "loading"} type="submit">
        {status === "loading" ? "جارٍ الإرسال..." : "أرسل الطلب — كشف مجاني"}
      </button>
      {status === "ok" ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          وصل طلبك بنجاح. سنتواصل معك خلال دقائق خلال ساعات العمل.
        </p>
      ) : null}
      {status === "err" ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          تعذر الإرسال. حاول مرة أخرى أو راسلنا واتساب.
        </p>
      ) : null}
    </form>
  );
}
