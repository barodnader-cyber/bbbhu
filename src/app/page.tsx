import { ContactForm } from "@/components/ContactForm";
import { FaqList } from "@/components/FaqList";
import { FloatingCtas } from "@/components/FloatingCtas";
import { Footer } from "@/components/Footer";
import {
  IconCheck,
  IconStar,
  ServiceIcon,
} from "@/components/Icons";
import { Navbar } from "@/components/Navbar";
import { Reveal, RevealItem } from "@/components/Reveal";
import {
  formatPhone,
  waLink,
  type SettingsMap,
} from "@/lib/defaults";
import {
  getActiveServices,
  getFaqs,
  getPricing,
  getPublishedArticles,
  getSettings,
  getTestimonials,
} from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: s.seo_title,
    description: s.seo_description,
    alternates: { canonical: "/" },
  };
}

function JsonLd({ settings }: { settings: SettingsMap }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: settings.brand_ar,
        alternateName: settings.brand_en,
        description: settings.seo_description,
        telephone: `+966${settings.phone.replace(/^0/, "")}`,
        email: settings.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "الرياض",
          addressCountry: "SA",
        },
        areaServed: "SA",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://abrag-alzil.com",
        image: "/logo.svg",
        priceRange: "$$",
        openingHours: "Mo-Su 08:00-22:00",
      },
      {
        "@type": "Service",
        name: "عزل أسطح وكشف تسربات وعزل خزانات",
        provider: { "@type": "LocalBusiness", name: settings.brand_ar },
        areaServed: "المملكة العربية السعودية",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const CITIES = ["الرياض", "جدة", "الدمام", "الخبر", "مكة", "المدينة", "أبها", "تبوك", "القصيم", "حائل"];

const BENEFITS = [
  {
    title: "ضمان مكتوب حتى 10 سنوات",
    body: "عقد واضح يشمل المواد والتنفيذ، لا وعود شفهية.",
  },
  {
    title: "معاينة وكشف مجاني",
    body: "نزور موقعك، نشخّص الحالة، ونرسل عرض سعر ثابت البنود.",
  },
  {
    title: "مواد معتمدة بكثافة هندسية",
    body: "فوم بالكثافة الصحيحة، إيبوكسي صحي للخزانات، وأغشية موثوقة.",
  },
  {
    title: "بدون تكسير عشوائي",
    body: "كشف تسربات بأجهزة حرارية وضغط لتحديد المصدر بدقة.",
  },
  {
    title: "فريق مدرّب ونظافة في الموقع",
    body: "نحمي الأرضيات والتشطيبات ونسلّم السطح جاهزاً للاستخدام.",
  },
  {
    title: "تغطية كل مدن المملكة",
    body: "فرق في الرياض وجدة والدمام مع جدولة سريعة لباقي المدن.",
  },
];

const STEPS = [
  { n: "01", t: "تواصل", d: "واتساب أو نموذج… نحدد موعد المعاينة خلال ساعات." },
  { n: "02", t: "معاينة", d: "فحص السطح أو الخزان أو مصدر التسرب وتصوير الحالة." },
  { n: "03", t: "عرض سعر", d: "سعر ثابت، مادة محددة، مدة تنفيذ، وبنود الضمان." },
  { n: "04", t: "تنفيذ", d: "عزل أو كشف أو معالجة وفق المواصفات المتفق عليها." },
  { n: "05", t: "تسليم", d: "فحص نهائي، صور قبل وبعد، ومستند الضمان." },
];

export default async function HomePage() {
  const [settings, services, testimonials, faqs, plans, posts] = await Promise.all([
    getSettings(),
    getActiveServices(),
    getTestimonials(),
    getFaqs(),
    getPricing(),
    getPublishedArticles(3),
  ]);
  const wa = waLink(settings);

  return (
    <>
      <JsonLd settings={settings} />
      <Navbar
        brand={settings.brand_ar}
        brandEn={settings.brand_en}
        phone={settings.phone}
        wa={wa}
      />
      <main className="overflow-x-hidden pb-20 md:pb-0">
        <section className="relative isolate min-h-[92vh] overflow-hidden gradient-mesh text-white">
          <img
            src="/images/hero-roof.jpg"
            alt="فريق أبراج العزل ينفذ عزل أسطح احترافي"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-navy/90 via-navy/75 to-navy/40" />
          <div className="hero-shine pointer-events-none absolute inset-0" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-12 lg:px-6 lg:py-28">
            <div className="lg:col-span-7">
              <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold text-sky-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {settings.hero_badge}
              </div>
              <h1 className="mt-6 text-4xl font-black leading-[1.25] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                {settings.hero_title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-9 text-white/80 sm:text-lg">
                {settings.hero_subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary">
                  {settings.hero_cta_primary}
                </a>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  {settings.hero_cta_secondary}
                </a>
              </div>
              <dl className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { k: `+${settings.stat_projects}`, v: "مشروع منجز" },
                  { k: `+${settings.stat_years}`, v: "سنة خبرة" },
                  { k: settings.stat_warranty, v: "سنوات ضمان" },
                  { k: `+${settings.stat_cities}`, v: "مدينة نغطيها" },
                ].map((s) => (
                  <div key={s.v} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <dt className="text-2xl font-black text-white">{s.k}</dt>
                    <dd className="mt-1 text-xs text-white/65">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-5">
              <div className="animate-float relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
                <img
                  src="/images/villa-protected.jpg"
                  alt="فيلا محمية بعزل أبراج العزل"
                  className="h-72 w-full rounded-2xl object-cover sm:h-80"
                />
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
                  <div className="rounded-xl bg-white/10 px-2 py-3">عزل أسطح</div>
                  <div className="rounded-xl bg-white/10 px-2 py-3">كشف تسربات</div>
                  <div className="rounded-xl bg-white/10 px-2 py-3">عزل خزانات</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="المدن" className="border-b border-ink/5 bg-white py-5">
          <div className="overflow-hidden">
            <div className="marquee-track flex w-max gap-10 text-sm font-bold text-ink/50">
              {[...CITIES, ...CITIES].map((c, i) => (
                <span key={`${c}-${i}`} className="flex items-center gap-10">
                  <span>{c}</span>
                  <span className="text-sky">●</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <Reveal className="stagger grid gap-4 md:grid-cols-3">
            {[
              { img: "/images/service-roof.jpg", t: "عزل أسطح", d: "حراري + مائي بفوم وأغشية" },
              { img: "/images/service-leak.jpg", t: "كشف تسربات", d: "كاميرا حرارية بدون تكسير" },
              { img: "/images/service-tank.jpg", t: "عزل خزانات", d: "إيبوكسي صحي وتعقيم" },
            ].map((item) => (
              <RevealItem key={item.t}>
                <article className="group overflow-hidden rounded-3xl bg-white shadow-[0_16px_50px_rgba(7,26,46,0.08)]">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.t}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-extrabold">{item.t}</h2>
                    <p className="mt-1 text-sm text-ink/60">{item.d}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <Reveal>
            <RevealItem className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-extrabold text-brand">خدمات أبراج العزل</p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">حلول متكاملة من السطح حتى الخزان</h2>
              <p className="mt-3 text-ink/65">
                ثلاثة تخصصات نتقنها يومياً: عزل الأسطح، كشف تسربات المياه، وعزل الخزانات — مع خدمات مساندة للفوم والرطوبة والمسابح.
              </p>
            </RevealItem>
          </Reveal>
          <Reveal className="stagger mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((svc) => (
              <RevealItem key={svc.id}>
                <article className="flex h-full flex-col rounded-3xl border border-ink/6 bg-white p-6 shadow-[0_12px_40px_rgba(7,26,46,0.05)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,26,46,0.1)]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ice text-brand">
                      <ServiceIcon name={svc.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-extrabold">{svc.title}</h3>
                      {svc.priceFrom ? (
                        <p className="text-xs font-bold text-brand">يبدأ من {svc.priceFrom} ر.س</p>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink/70">{svc.shortDescription}</p>
                  <ul className="mt-4 space-y-2 text-sm font-semibold text-ink/80">
                    {(svc.features || []).map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <IconCheck className="h-4 w-4 text-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="mt-auto pt-5 text-sm font-extrabold text-brand">
                    اطلب هذه الخدمة ←
                  </a>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </section>

        <section id="works" className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <Reveal>
              <RevealItem className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-extrabold text-brand">عرض الأعمال</p>
                  <h2 className="mt-2 text-3xl font-black">من التشخيص إلى سطح محمي بالكامل</h2>
                </div>
                <p className="max-w-md text-sm leading-7 text-ink/65">
                  نوثّق كل مرحلة بالصور: التنظيف، العزل، الحماية، وفحص التسليم. النتيجة التي تراها هي ما نضمنه كتابةً.
                </p>
              </RevealItem>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-12">
              <figure className="relative overflow-hidden rounded-[28px] md:col-span-7">
                <img src="/images/foam-spray.jpg" alt="رش فوم عزل أسطح" className="h-80 w-full object-cover md:h-[420px]" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-6 text-white">
                  <p className="text-lg font-extrabold">عزل فوم بكثافة هندسية</p>
                  <p className="text-sm text-white/75">طبقة واحدة حرارية ومائية بدون فواصل</p>
                </figcaption>
              </figure>
              <div className="grid gap-4 md:col-span-5">
                <img src="/images/service-leak.jpg" alt="كشف تسربات بكاميرا حرارية" className="h-48 w-full rounded-[28px] object-cover md:h-[200px]" />
                <img src="/images/before-after.jpg" alt="قبل وبعد عزل السطح" className="h-48 w-full rounded-[28px] object-cover md:h-[204px]" />
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <RevealItem>
                <p className="text-sm font-extrabold text-brand">لماذا أبراج العزل؟</p>
                <h2 className="mt-2 text-3xl font-black">{settings.about_title}</h2>
                <p className="mt-4 text-base leading-9 text-ink/70">{settings.about_body}</p>
                <img
                  src="/images/team.jpg"
                  alt="فريق أبراج العزل"
                  className="mt-6 h-64 w-full rounded-[28px] object-cover"
                />
              </RevealItem>
            </Reveal>
            <Reveal className="stagger grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((b) => (
                <RevealItem key={b.title}>
                  <article className="h-full rounded-3xl border border-ink/6 bg-white p-5">
                    <h3 className="font-extrabold">{b.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink/65">{b.body}</p>
                  </article>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="bg-navy text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-6">
            <div>
              <p className="text-sm font-extrabold text-sky">رحلة العمل</p>
              <h2 className="mt-2 text-3xl font-black">خمس خطوات… وسطح مرتاح لسنوات</h2>
              <p className="mt-3 max-w-md text-white/70">
                مسار واضح من أول رسالة واتساب حتى تسليم الضمان. بلا مفاجآت في السعر أو المدة.
              </p>
            </div>
            <ol className="space-y-4">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-4 rounded-2xl bg-white/5 p-4">
                  <span className="text-xl font-black text-sky">{s.n}</span>
                  <div>
                    <p className="font-extrabold">{s.t}</p>
                    <p className="text-sm text-white/65">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <Reveal>
            <RevealItem className="text-center">
              <p className="text-sm font-extrabold text-brand">آراء العملاء</p>
              <h2 className="mt-2 text-3xl font-black">ثقة تُبنى متراً بعد متر</h2>
            </RevealItem>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {testimonials.map((t) => (
              <article key={t.id} className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(7,26,46,0.06)]">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <IconStar key={i} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-8 text-ink/75">“{t.content}”</p>
                <p className="mt-5 text-sm font-extrabold">{t.name}</p>
                <p className="text-xs text-ink/50">
                  {t.role} — {t.city}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="bg-ice/60 py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="text-center">
              <p className="text-sm font-extrabold text-brand">الأسعار</p>
              <h2 className="mt-2 text-3xl font-black">شفافية من أول عرض</h2>
              <p className="mx-auto mt-3 max-w-xl text-ink/65">
                الأسعار استرشادية وتُثبَّت بعد المعاينة المجانية حسب المساحة وحالة السطح أو الخزان.
              </p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {plans.map((p) => (
                <article
                  key={p.id}
                  className={`relative rounded-[28px] p-8 ${
                    p.featured
                      ? "bg-navy text-white shadow-[0_24px_60px_rgba(7,26,46,0.25)]"
                      : "bg-white text-ink shadow-[0_12px_40px_rgba(7,26,46,0.06)]"
                  }`}
                >
                  {p.featured ? (
                    <span className="absolute start-8 top-0 -translate-y-1/2 rounded-full bg-sky px-3 py-1 text-xs font-extrabold text-navy">
                      الأكثر طلباً
                    </span>
                  ) : null}
                  <h3 className="text-xl font-extrabold">{p.name}</h3>
                  <p className={`mt-2 text-sm ${p.featured ? "text-white/70" : "text-ink/60"}`}>
                    {p.description}
                  </p>
                  <p className="mt-6 text-4xl font-black">
                    {p.price}
                    <span className={`ms-1 text-sm font-bold ${p.featured ? "text-white/70" : "text-ink/50"}`}>
                      {p.unit}
                    </span>
                  </p>
                  <ul className="mt-6 space-y-3 text-sm">
                    {(p.features || []).map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <IconCheck className={`h-4 w-4 ${p.featured ? "text-sky" : "text-brand"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-8 inline-flex w-full justify-center rounded-full py-3 text-sm font-extrabold ${
                      p.featured ? "bg-white text-navy" : "bg-brand text-white"
                    }`}
                  >
                    اطلب عرض سعر
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold text-brand">المدونة</p>
              <h2 className="mt-2 text-3xl font-black">مقالات تساعدك تقرر بثقة</h2>
            </div>
            <Link href="/articles" className="text-sm font-extrabold text-brand">
              كل المقالات ←
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/articles/${post.slug}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_rgba(7,26,46,0.06)]"
              >
                <img
                  src={post.coverImage || "/images/service-roof.jpg"}
                  alt={post.title}
                  className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="text-xs font-bold text-brand">{post.category}</p>
                  <h3 className="mt-2 font-extrabold leading-7 group-hover:text-brand">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink/60">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="faq" className="bg-white py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-12 lg:px-6">
            <div className="lg:col-span-4">
              <p className="text-sm font-extrabold text-brand">الأسئلة الشائعة</p>
              <h2 className="mt-2 text-3xl font-black">إجابات قبل ما تتصل</h2>
              <p className="mt-3 text-ink/65">لم تجد سؤالك؟ راسلنا واتساب وسنرد خلال دقائق العمل.</p>
            </div>
            <div className="lg:col-span-8">
              <FaqList items={faqs} />
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden py-16">
          <div className="absolute inset-0">
            <img src="/images/cool-interior.jpg" alt="" className="h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-l from-mist via-mist/95 to-mist" />
          </div>
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-6">
            <div>
              <p className="text-sm font-extrabold text-brand">طلب كشف مجاني</p>
              <h2 className="mt-2 text-3xl font-black">خلّنا نقيّم السطح أو التسرب اليوم</h2>
              <p className="mt-3 max-w-md text-ink/70">
                أرسل بياناتك وسنتواصل لتأكيد المعاينة. أو ابدأ محادثة واتساب فوراً على{" "}
                <strong>{formatPhone(settings.phone)}</strong>.
              </p>
              <ul className="mt-6 space-y-3 text-sm font-semibold">
                <li className="flex items-center gap-2">
                  <IconCheck className="text-brand" /> معاينة مجانية بدون التزام
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="text-brand" /> عرض سعر مكتوب وواضح
                </li>
                <li className="flex items-center gap-2">
                  <IconCheck className="text-brand" /> جدولة مرنة حتى المساء
                </li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-[0_24px_60px_rgba(7,26,46,0.08)] backdrop-blur">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
      <FloatingCtas phone={settings.phone} wa={wa} />
    </>
  );
}
