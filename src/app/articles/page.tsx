import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { waLink } from "@/lib/defaults";
import { getPublishedArticles, getSettings } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مقالات العزل وكشف التسربات",
  description:
    "مقالات خبراء أبراج العزل عن عزل الأسطح، كشف تسربات المياه، عزل الخزانات، الأسعار، وأفضل المواد في السعودية.",
  alternates: { canonical: "/articles" },
};

export default async function ArticlesPage() {
  const [settings, posts] = await Promise.all([getSettings(), getPublishedArticles()]);
  const wa = waLink(settings);

  return (
    <>
      <Navbar brand={settings.brand_ar} brandEn={settings.brand_en} phone={settings.phone} wa={wa} />
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <p className="text-sm font-extrabold text-brand">المدونة</p>
        <h1 className="mt-2 text-4xl font-black">مقالات تبني قرار عزل أذكى</h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          شروحات عملية من فريق أبراج العزل: مواد الأسطح، كشف التسربات بدون تكسير، وعزل الخزانات الصحي.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/articles/${post.slug}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_rgba(7,26,46,0.06)]"
            >
              <img
                src={post.coverImage || "/images/service-roof.jpg"}
                alt={post.title}
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-bold text-brand">
                  <span>{post.category}</span>
                  <time dateTime={post.createdAt.toISOString()}>
                    {post.createdAt.toLocaleDateString("ar-SA")}
                  </time>
                </div>
                <h2 className="mt-3 text-lg font-extrabold leading-7 group-hover:text-brand">{post.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-7 text-ink/60">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
