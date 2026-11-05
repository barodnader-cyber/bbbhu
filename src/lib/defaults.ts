export type SettingsMap = Record<string, string>;

export function waLink(settings: SettingsMap, text?: string) {
  const msg = encodeURIComponent(text || "مرحباً، أرغب في طلب خدمة من أبراج العزل");
  return `https://wa.me/${settings.whatsapp}?text=${msg}`;
}

export function telLink(settings: SettingsMap) {
  return `tel:+966${settings.phone.replace(/^0/, "").replace(/\s/g, "")}`;
}

export function formatPhone(phone: string) {
  const d = phone.replace(/\D/g, "");
  if (d.length === 10) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return phone;
}

export const DEFAULT_SETTINGS: SettingsMap = {
  brand_ar: "أبراج العزل",
  brand_en: "TOWERS OF INSULATION",
  tagline: "حماية تتجاوز السطح",
  phone: "0558904410",
  whatsapp: "966558904410",
  email: "info@abrag-alzil.com",
  address: "الرياض — ونخدم جدة والدمام وجميع مدن المملكة",
  hours: "يومياً من 8 صباحاً حتى 10 مساءً",
  hero_badge: "ضمان مكتوب حتى 10 سنوات",
  hero_title: "عزل احترافي للأسطح والخزانات وكشف تسربات المياه",
  hero_subtitle:
    "نحمي مبناك من الحرارة والرطوبة والتسربات بمواد معتمدة وفريق هندسي مدرّب. كشف مجاني، تنفيذ سريع، وضمان حقيقي يصل إلى 10 سنوات.",
  hero_cta_primary: "اطلب كشف مجاني الآن",
  hero_cta_secondary: "تواصل واتساب",
  about_title: "خبرة هندسية تُترجم إلى راحة تدوم",
  about_body:
    "أبراج العزل شركة متخصصة في العزل الحراري والمائي وكشف تسربات المياه وعزل الخزانات. نعمل وفق مواصفات هندسية دقيقة، ونستخدم مواد فوم وبولي يوريثان وأغشية عزل معتمدة، مع التزام كامل بالنظافة وسلامة المبنى وجدول التسليم.",
  seo_title: "أبراج العزل | عزل أسطح وكشف تسربات المياه وعزل خزانات",
  seo_description:
    "شركة أبراج العزل لعزل الأسطح وكشف تسربات المياه وعزل الخزانات في الرياض وجدة والدمام. مواد معتمدة، تنفيذ سريع، وضمان حتى 10 سنوات. اطلب كشف مجاني اليوم.",
  cities: "الرياض، جدة، الدمام، مكة، المدينة، الخبر، أبها، تبوك",
  stat_projects: "2500",
  stat_years: "12",
  stat_warranty: "10",
  stat_cities: "40",
};
