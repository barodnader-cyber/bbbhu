"use client";

import { saveArticleAction } from "@/app/admin/actions";
import { renderMarkdown } from "@/lib/markdown";
import { useMemo, useState } from "react";

type Initial = {
  id?: number;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string | null;
  category?: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  published?: boolean;
};

function insertAround(textarea: HTMLTextAreaElement, before: string, after = "") {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.slice(start, end) || "نص";
  const next = textarea.value.slice(0, start) + before + selected + after + textarea.value.slice(end);
  const caret = start + before.length + selected.length + after.length;
  return { next, caret };
}

export function ArticleEditor({ initial }: { initial?: Initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [content, setContent] = useState(initial?.content || "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const html = useMemo(() => renderMarkdown(content), [content]);

  function apply(before: string, after = "") {
    const el = document.getElementById("article-body") as HTMLTextAreaElement | null;
    if (!el) {
      setContent((c) => c + before + after);
      return;
    }
    const { next, caret } = insertAround(el, before, after);
    setContent(next);
    requestAnimationFrame(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = caret;
    });
  }

  return (
    <form action={saveArticleAction} className="grid gap-4">
      {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
      <label className="grid gap-1.5 text-sm font-bold">
        العنوان
        <input
          name="title"
          required
          className="input font-extrabold text-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-bold">
          الرابط (slug)
          <input
            name="slug"
            className="input font-medium"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="يُولَّد تلقائياً إن تُرك فارغاً"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          التصنيف
          <input name="category" className="input font-medium" defaultValue={initial?.category || "نصائح"} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-bold">
        المقتطف
        <textarea name="excerpt" rows={2} className="input font-medium" defaultValue={initial?.excerpt || ""} />
      </label>
      <label className="grid gap-1.5 text-sm font-bold">
        صورة الغلاف (مسار أو رابط)
        <input name="coverImage" className="input font-medium" defaultValue={initial?.coverImage || ""} />
      </label>
      <div className="rounded-2xl border border-ink/10 bg-white">
        <div className="flex flex-wrap items-center gap-2 border-b border-ink/8 p-3">
          <button type="button" className="rounded-lg bg-ice px-2 py-1 text-xs font-bold" onClick={() => apply("## ", "")}>
            عنوان
          </button>
          <button type="button" className="rounded-lg bg-ice px-2 py-1 text-xs font-bold" onClick={() => apply("### ", "")}>
            عنوان فرعي
          </button>
          <button type="button" className="rounded-lg bg-ice px-2 py-1 text-xs font-bold" onClick={() => apply("**", "**")}>
            عريض
          </button>
          <button type="button" className="rounded-lg bg-ice px-2 py-1 text-xs font-bold" onClick={() => apply("- ", "")}>
            قائمة
          </button>
          <button type="button" className="rounded-lg bg-ice px-2 py-1 text-xs font-bold" onClick={() => apply("> ", "")}>
            اقتباس
          </button>
          <button
            type="button"
            className="rounded-lg bg-ice px-2 py-1 text-xs font-bold"
            onClick={() => apply("[نص الرابط](", ")")}
          >
            رابط
          </button>
          <button
            type="button"
            className="rounded-lg bg-ice px-2 py-1 text-xs font-bold"
            onClick={() => apply("![وصف](", ")")}
          >
            صورة
          </button>
          <div className="ms-auto flex gap-1">
            <button
              type="button"
              onClick={() => setTab("write")}
              className={`rounded-lg px-3 py-1 text-xs font-bold ${tab === "write" ? "bg-brand text-white" : "bg-ice"}`}
            >
              تحرير
            </button>
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={`rounded-lg px-3 py-1 text-xs font-bold ${tab === "preview" ? "bg-brand text-white" : "bg-ice"}`}
            >
              معاينة
            </button>
          </div>
        </div>
        {tab === "write" ? (
          <textarea
            id="article-body"
            name="content"
            rows={18}
            className="w-full resize-y border-0 p-4 font-medium outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب المقال بماركداون بسيط..."
          />
        ) : (
          <>
            <input type="hidden" name="content" value={content} />
            <div className="prose-ar min-h-80 p-5" dangerouslySetInnerHTML={{ __html: html || "<p>لا يوجد محتوى بعد</p>" }} />
          </>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-bold">
          عنوان SEO
          <input name="seoTitle" className="input font-medium" defaultValue={initial?.seoTitle || ""} />
        </label>
        <label className="grid gap-1.5 text-sm font-bold">
          وصف SEO
          <input name="seoDescription" className="input font-medium" defaultValue={initial?.seoDescription || ""} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm font-bold">
        <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} />
        نشر المقال على الموقع
      </label>
      <button className="btn-primary w-fit" type="submit">
        حفظ المقال
      </button>
    </form>
  );
}
