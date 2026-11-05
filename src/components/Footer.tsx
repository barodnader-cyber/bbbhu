import { BrandLockup } from "@/components/Logo";
import { IconPhone, IconWhatsApp } from "@/components/Icons";
import { formatPhone, type SettingsMap } from "@/lib/defaults";
import Link from "next/link";

export function Footer({ settings }: { settings: SettingsMap }) {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 lg:px-6">
        <div className="md:col-span-2">
          <BrandLockup title={settings.brand_ar} subtitle={settings.brand_en} light idPrefix="foot" />
          <p className="mt-5 max-w-md text-sm leading-8 text-white/70">
            {settings.about_body}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:+966${settings.phone.replace(/^0/, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"
            >
              <IconPhone className="h-4 w-4" />
              {formatPhone(settings.phone)}
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp className="h-4 w-4" />
              واتساب
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-extrabold text-sky">روابط سريعة</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link href="/#services" className="hover:text-white">
                خدمات العزل
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="hover:text-white">
                الأسعار
              </Link>
            </li>
            <li>
              <Link href="/articles" className="hover:text-white">
                المقالات
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-white">
                الأسئلة الشائعة
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-white">
                طلب كشف مجاني
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-white">
                لوحة التحكم
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-extrabold text-sky">تواصل معنا</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-white/75">
            <li>{settings.address}</li>
            <li>{settings.email}</li>
            <li>{settings.hours}</li>
            <li>نغطي: {settings.cities}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {settings.brand_ar} — جميع الحقوق محفوظة. عزل أسطح · كشف تسربات · عزل خزانات
      </div>
    </footer>
  );
}
