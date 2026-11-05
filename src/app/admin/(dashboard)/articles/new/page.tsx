import { ArticleEditor } from "../ArticleEditor";

export const dynamic = "force-dynamic";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-black">مقال جديد</h1>
      <ArticleEditor />
    </div>
  );
}
