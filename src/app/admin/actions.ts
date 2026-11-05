"use server";

import { db } from "@/db";
import {
  articles,
  faqs,
  inquiries,
  pricingPlans,
  services,
  siteSettings,
  testimonials,
} from "@/db/schema";
import { adminPassword, clearAdminCookie, requireAdmin, setAdminCookie } from "@/lib/auth";
import { slugify } from "@/lib/markdown";
import { ensureSeeded } from "@/lib/seed";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin");
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (password !== adminPassword()) {
    redirect("/admin/login?e=1");
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  await ensureSeeded();
  const keys = [
    "brand_ar",
    "brand_en",
    "tagline",
    "phone",
    "whatsapp",
    "email",
    "address",
    "hours",
    "hero_badge",
    "hero_title",
    "hero_subtitle",
    "hero_cta_primary",
    "hero_cta_secondary",
    "about_title",
    "about_body",
    "seo_title",
    "seo_description",
    "cities",
    "stat_projects",
    "stat_years",
    "stat_warranty",
    "stat_cities",
  ];
  for (const key of keys) {
    const value = String(formData.get(key) ?? "");
    const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    if (existing[0]) {
      await db
        .update(siteSettings)
        .set({ value, updatedAt: new Date() })
        .where(eq(siteSettings.key, key));
    } else {
      await db.insert(siteSettings).values({ key, value });
    }
  }
  revalidatePublic();
  redirect("/admin/content?saved=1");
}

export async function saveArticleAction(formData: FormData) {
  await requireAdmin();
  await ensureSeeded();
  const id = Number(formData.get("id") || 0);
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "");
  const excerpt = String(formData.get("excerpt") || "").trim();
  let slug = String(formData.get("slug") || "").trim();
  if (!slug) slug = slugify(title);
  if (!title || !slug) redirect("/admin/articles?e=1");
  const payload = {
    title,
    slug,
    excerpt: excerpt || title,
    content,
    coverImage: String(formData.get("coverImage") || "") || null,
    category: String(formData.get("category") || "نصائح"),
    seoTitle: String(formData.get("seoTitle") || "") || null,
    seoDescription: String(formData.get("seoDescription") || "") || null,
    published: formData.get("published") === "on",
    updatedAt: new Date(),
  };
  if (id) {
    await db.update(articles).set(payload).where(eq(articles.id, id));
  } else {
    await db.insert(articles).values(payload);
  }
  revalidatePublic();
  revalidatePath("/articles");
  redirect("/admin/articles?saved=1");
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await db.delete(articles).where(eq(articles.id, id));
  revalidatePublic();
  redirect("/admin/articles");
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "new");
  if (id) await db.update(inquiries).set({ status }).where(eq(inquiries.id, id));
  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
}

export async function deleteInquiryAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await db.delete(inquiries).where(eq(inquiries.id, id));
  revalidatePath("/admin/inquiries");
}

export async function saveTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const payload = {
    name: String(formData.get("name") || ""),
    city: String(formData.get("city") || ""),
    role: String(formData.get("role") || ""),
    content: String(formData.get("content") || ""),
    rating: Number(formData.get("rating") || 5),
    featured: formData.get("featured") === "on",
  };
  if (id) await db.update(testimonials).set(payload).where(eq(testimonials.id, id));
  else await db.insert(testimonials).values(payload);
  revalidatePublic();
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePublic();
  redirect("/admin/testimonials");
}

export async function saveFaqAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const payload = {
    question: String(formData.get("question") || ""),
    answer: String(formData.get("answer") || ""),
    sortOrder: Number(formData.get("sortOrder") || 0),
    active: formData.get("active") === "on",
  };
  if (id) await db.update(faqs).set(payload).where(eq(faqs.id, id));
  else await db.insert(faqs).values(payload);
  revalidatePublic();
  redirect("/admin/faqs?saved=1");
}

export async function deleteFaqAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await db.delete(faqs).where(eq(faqs.id, id));
  revalidatePublic();
  redirect("/admin/faqs");
}

export async function saveServiceAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const features = String(formData.get("features") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const title = String(formData.get("title") || "");
  const payload = {
    title,
    slug: String(formData.get("slug") || slugify(title)),
    shortDescription: String(formData.get("shortDescription") || ""),
    description: String(formData.get("description") || ""),
    icon: String(formData.get("icon") || "shield"),
    image: String(formData.get("image") || "") || null,
    features,
    priceFrom: String(formData.get("priceFrom") || "") || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
    active: formData.get("active") === "on",
  };
  if (id) await db.update(services).set(payload).where(eq(services.id, id));
  else await db.insert(services).values(payload);
  revalidatePublic();
  redirect("/admin/services?saved=1");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await db.delete(services).where(eq(services.id, id));
  revalidatePublic();
  redirect("/admin/services");
}

export async function savePricingAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") || 0);
  const features = String(formData.get("features") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const payload = {
    name: String(formData.get("name") || ""),
    description: String(formData.get("description") || ""),
    price: String(formData.get("price") || ""),
    unit: String(formData.get("unit") || ""),
    features,
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") || 0),
    active: formData.get("active") === "on",
  };
  if (id) await db.update(pricingPlans).set(payload).where(eq(pricingPlans.id, id));
  else await db.insert(pricingPlans).values(payload);
  revalidatePublic();
  redirect("/admin/pricing?saved=1");
}

export async function deletePricingAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) await db.delete(pricingPlans).where(eq(pricingPlans.id, id));
  revalidatePublic();
  redirect("/admin/pricing");
}
