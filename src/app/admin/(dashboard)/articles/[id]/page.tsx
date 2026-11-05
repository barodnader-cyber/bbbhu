import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ArticleEditor } from "../ArticleEditor";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(id)))
    .limit(1);
  const article = rows[0];
  if (!article) notFound();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-black">تعديل المقال</h1>
      <ArticleEditor
        initial={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          coverImage: article.coverImage,
          category: article.category,
          seoTitle: article.seoTitle,
          seoDescription: article.seoDescription,
          published: article.published,
        }}
      />
    </div>
  );
}
