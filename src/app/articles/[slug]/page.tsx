import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { waLink } from "@/lib/defaults";
import { renderMarkdown } from "@/lib/markdown";
import { getArticleBySlug, getPublishedArticles, getSettings } from "@/lib/site";
import { eq, sql } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);
  if (!post) return { title: "المقال غير موجود" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/articles/${post.slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [settings, post, related] = await Promise.all([
    getSettings(),
    getArticleBySlug(slug),
    getPublishedArticles(4),
  ]);
  if (!post || !post.published) notFound();

  await db
    .update(articles)
    .set({ views: sql`${articles.views} + 1` })
    .where(eq(articles.id, post.id));

  const wa = waLink(settings, `مرحباً، قرأت مقال: ${post.title} وأرغب في الاستفسار`);
  const html = renderMarkdown(post.content);
  const others = related.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: settings.brand_ar },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar brand={settings.brand_ar} brandEn={settings.brand_en} phone={settings.phone} wa={wa} />
      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-0">
        <Link href="/articles" className="text-sm font-bold text-brand">
          ← كل المقالات
        </Link>
        <p className="mt-6 text-xs font-extrabold text-brand">{post.category}</p>
        <h1 className="mt-2 text-3xl font-black leading-snug sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-ink/60">{post.excerpt}</p>
        <div className="mt-3 flex gap-4 text-xs text-ink/45">
          <time dateTime={post.createdAt.toISOString()}>{post.createdAt.toLocaleDateString("ar-SA")}</time>
          <span>{post.views + 1} مشاهدة</span>
        </div>
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} className="mt-8 h-72 w-full rounded-[28px] object-cover" />
        ) : null}
        <div className="prose-ar mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="mt-12 rounded-3xl bg-navy p-8 text-white">
          <p className="text-xl font-extrabold">هل تحتاج فحصاً لمبناك؟</p>
          <p className="mt-2 text-sm text-white/70">كشف مجاني وعرض سعر واضح من فريق أبراج العزل.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/#contact" className="btn-primary">
              اطلب كشف مجاني
            </Link>
            <a href={wa} className="btn-ghost" target="_blank" rel="noopener noreferrer">
              واتساب
            </a>
          </div>
        </div>
      </article>
      {others.length ? (
        <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-6">
          <h2 className="text-2xl font-black">مقالات ذات صلة</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {others.map((p) => (
              <Link key={p.id} href={`/articles/${p.slug}`} className="rounded-3xl bg-white p-4 shadow-sm">
                <img src={p.coverImage || "/images/service-roof.jpg"} alt="" className="h-36 w-full rounded-2xl object-cover" />
                <p className="mt-3 font-extrabold">{p.title}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <Footer settings={settings} />
    </>
  );
}
