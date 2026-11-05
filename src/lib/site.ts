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
import { DEFAULT_SETTINGS, type SettingsMap } from "@/lib/defaults";
export { formatPhone, telLink, waLink } from "@/lib/defaults";
import { ensureSeeded } from "@/lib/seed";
import { asc, desc, eq } from "drizzle-orm";

export type { SettingsMap };
export { DEFAULT_SETTINGS };

export async function getSettings(): Promise<SettingsMap> {
  await ensureSeeded();
  const rows = await db.select().from(siteSettings);
  const map: SettingsMap = { ...DEFAULT_SETTINGS };
  for (const row of rows) map[row.key] = row.value;
  return map;
}

export async function getPublishedArticles(limit?: number) {
  await ensureSeeded();
  const query = db
    .select()
    .from(articles)
    .where(eq(articles.published, true))
    .orderBy(desc(articles.createdAt));
  if (limit) return query.limit(limit);
  return query;
}

export async function getArticleBySlug(slug: string) {
  await ensureSeeded();
  const rows = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getActiveServices() {
  await ensureSeeded();
  return db
    .select()
    .from(services)
    .where(eq(services.active, true))
    .orderBy(asc(services.sortOrder));
}

export async function getTestimonials() {
  await ensureSeeded();
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.featured, true))
    .orderBy(desc(testimonials.createdAt));
}

export async function getFaqs() {
  await ensureSeeded();
  return db
    .select()
    .from(faqs)
    .where(eq(faqs.active, true))
    .orderBy(asc(faqs.sortOrder));
}

export async function getPricing() {
  await ensureSeeded();
  return db
    .select()
    .from(pricingPlans)
    .where(eq(pricingPlans.active, true))
    .orderBy(asc(pricingPlans.sortOrder));
}

export async function getInquiryCount() {
  const rows = await db.select().from(inquiries);
  return rows.length;
}
