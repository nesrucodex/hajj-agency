/**
 * Initial content for a brand-new database.
 *
 * Only the sections that stay admin-editable live here: brand/SEO, the
 * promo banner, packages, hotels (+ the private supplier record),
 * testimonials and FAQ. Everything else (hero, about, journey, why-us,
 * gallery, footer, nav) is static — see `src/content/am.json` / `en.json`.
 *
 * The hotel data is transcribed from
 * `docs/THAMER SAMIL AL SUWAT GROUP Price list.pdf`.
 *
 * `prisma/seed.ts` only uses this the *first* time each table is empty — it
 * never overwrites content an admin has since edited from `/admin`.
 */

export type LocaleCode = "am" | "en";
export type Season = "hajj" | "ramadan" | "default";
export type PackageCategory = "hajj" | "umrah";
export type HotelCity = "makkah" | "madinah";
export type DayType = "WD" | "WE" | "ALL";

// ---------------------------------------------------------------------------
// Singleton per-locale settings — brand/SEO + the kept sections' headlines.
// ---------------------------------------------------------------------------

export interface SiteSettingsSeed {
  brandName: string;
  brandFullName: string;
  tagline: string;
  bismillah: string;
  bismillahTranslit: string;
  establishedYear: string;
  establishedLabel?: string;
  phone: string;
  phoneAlt?: string;
  whatsapp: string;
  email: string;
  address: string;
  accreditation: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialTiktok?: string;
  metaTitle: string;
  metaDescription: string;
  packagesEyebrow: string;
  packagesTitle: string;
  packagesSubtitle: string;
  hotelsEyebrow: string;
  hotelsTitle: string;
  hotelsSubtitle: string;
  hotelsNote: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  faqEyebrow: string;
  faqTitle: string;
}

export const siteSettings: Record<LocaleCode, SiteSettingsSeed> = {
  en: {
    brandName: "ጎራ በሉ ትራቨል",
    brandFullName: "Gora Belu Travel Agent",
    tagline: "Journeys of the heart to the House of Allah",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahTranslit: "In the name of Allah, the Most Gracious, the Most Merciful",
    establishedYear: "2011",
    establishedLabel: "EST.",
    phone: "+251 900 000 951",
    phoneAlt: "+251 911 453 821",
    whatsapp: "+251900000951",
    email: "gorabelu0900@gmail.com",
    address: "Bole Michael, in front of Zebra Crossing · Jemo 1 · Addis Ababa",
    accreditation: "In partnership with Ethiopian Airlines · Accredited Agent",
    socialFacebook: "https://facebook.com/gorabeluTravelAgent",
    socialInstagram: "https://instagram.com/gorabeluTravelAgent",
    socialTiktok: "https://tiktok.com/@gorabeluTravelAgent",
    metaTitle: "ጎራ በሉ ትራቨል · ሐጅና ዑምራ · Gora Belu Travel",
    metaDescription:
      "Guided Hajj & Umrah journeys from Addis Ababa with reverence and care, in partnership with Ethiopian Airlines.",
    packagesEyebrow: "Sacred Packages",
    packagesTitle: "Choose the journey that calls you",
    packagesSubtitle:
      "Transparent, all-inclusive packages for Hajj and Umrah. Final pricing is confirmed at consultation.",
    hotelsEyebrow: "Hotel Options",
    hotelsTitle: "Handpicked hotels in Makkah & Madinah",
    hotelsSubtitle:
      "Net rates from our trusted ground partner in the Holy Cities — the same hotels we use to build every Hajj & Umrah package.",
    hotelsNote:
      "Rates are per room, in Saudi Riyals, for the dates shown. Final pricing for your package is confirmed at consultation.",
    testimonialsEyebrow: "Words from Pilgrims",
    testimonialsTitle: "Hearts that returned full",
    faqEyebrow: "Before You Travel",
    faqTitle: "Questions, answered with care",
  },
  am: {
    brandName: "ጎራ በሉ ትራቨል",
    brandFullName: "ጎራ በሉ ትራቨል ኤጀንት",
    tagline: "ወደ አላህ ቤት የልብ ጉዞ",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahTranslit: "በአላህ ስም እጅግ በጣም ሩኅሩህ በጣም አዛኝ በሆነው",
    establishedYear: "2003",
    establishedLabel: "ዓ.ም",
    phone: "+251 900 000 951",
    phoneAlt: "+251 911 453 821",
    whatsapp: "+251900000951",
    email: "gorabelu0900@gmail.com",
    address: "ቦሌ ሚካኤል፣ ዘብራ መሻገሪያ ፊትለፊት · ጀሞ 1 · አዲስ አበባ",
    accreditation: "ከኢትዮጵያ አየር መንገድ ጋር በመተባበር · የተመሰከረለት ወኪል",
    socialFacebook: "https://facebook.com/gorabeluTravelAgent",
    socialInstagram: "https://instagram.com/gorabeluTravelAgent",
    socialTiktok: "https://tiktok.com/@gorabeluTravelAgent",
    metaTitle: "ጎራ በሉ ትራቨል · ሐጅና ዑምራ · Gora Belu Travel",
    metaDescription: "ጎራ በሉ ትራቨል · ወደ መካና መዲና በአክብሮትና በእንክብካቤ የታጀበ የሐጅና ዑምራ ጉዞ።",
    packagesEyebrow: "የተቀደሱ ጥቅሎች",
    packagesTitle: "የሚጠራዎትን ጉዞ ይምረጡ",
    packagesSubtitle: "ለሐጅና ዑምራ ግልጽና ሁሉን-አካታች ጥቅሎች። የመጨረሻ ዋጋ በምክክር ጊዜ ይረጋገጣል።",
    hotelsEyebrow: "የሆቴል ምርጫዎች",
    hotelsTitle: "በመካና በመዲና የተመረጡ ሆቴሎች",
    hotelsSubtitle:
      "ከታመነው በቅዱሳን ከተሞች ውስጥ ካለን አጋር የተገኙ የተጣሩ ዋጋዎች — እያንዳንዱን የሐጅና ዑምራ ጥቅል የምንገነባባቸው ተመሳሳይ ሆቴሎች።",
    hotelsNote: "ዋጋዎቹ ለእያንዳንዱ ክፍል፣ በሳዑዲ ሪያል፣ ለተመለከቱት ቀናት ናቸው። የመጨረሻው የጥቅልዎ ዋጋ በምክክር ጊዜ ይረጋገጣል።",
    testimonialsEyebrow: "ከሐጃጆች ቃላት",
    testimonialsTitle: "ሞልተው የተመለሱ ልቦች",
    faqEyebrow: "ከመጓዝዎ በፊት",
    faqTitle: "ጥያቄዎች፣ በእንክብካቤ ተመልሰዋል",
  },
};

// ---------------------------------------------------------------------------
// Promo banner
// ---------------------------------------------------------------------------

export const promos: Record<
  LocaleCode,
  {
    season: Season;
    active: boolean;
    badge: string;
    title: string;
    detail: string;
    ctaLabel: string;
    ctaHref: string;
  }[]
> = {
  en: [
    {
      season: "hajj",
      active: true,
      badge: "Hajj season",
      title: "Hajj registration now open",
      detail: "8 nights in Makkah · full guidance · with Ethiopian Airlines · limited seats",
      ctaLabel: "Reserve your seat",
      ctaHref: "#contact",
    },
    {
      season: "ramadan",
      active: true,
      badge: "Ramadan Umrah",
      title: "Ramadan Umrah packages open",
      detail: "Last 10 nights · hotels near the Haram · limited seats",
      ctaLabel: "Reserve your seat",
      ctaHref: "#contact",
    },
    {
      season: "default",
      active: true,
      badge: "New offer",
      title: "Complete Umrah package now open",
      detail: "3 nights Madinah · 8 nights Makkah · with Ethiopian Airlines · limited seats",
      ctaLabel: "Reserve your seat",
      ctaHref: "#contact",
    },
  ],
  am: [
    {
      season: "hajj",
      active: true,
      badge: "የሐጅ ወቅት",
      title: "የ2018 ዓ.ም ሐጅ ምዝገባ ተከፍቷል",
      detail: "8 ቀን መካ · ሙሉ መመሪያ · ከኢትዮጵያ አየር መንገድ ጋር · ውስን ቦታ",
      ctaLabel: "ቦታ ይያዙ",
      ctaHref: "#contact",
    },
    {
      season: "ramadan",
      active: true,
      badge: "የረመዳን ዑምራ",
      title: "የረመዳን ዑምራ ፓኬጅ ተከፍቷል",
      detail: "የመጨረሻዎቹ 10 ቀናት · ከሐረም አጠገብ ሆቴል · ውስን ቦታ",
      ctaLabel: "ቦታ ይያዙ",
      ctaHref: "#contact",
    },
    {
      season: "default",
      active: true,
      badge: "አዲስ ዕድል",
      title: "የተሟላ የዑምራ ፓኬጅ ተከፍቷል",
      detail: "3 ቀን መዲና · 8 ቀን መካ · ከኢትዮጵያ አየር መንገድ ጋር · ውስን ቦታ",
      ctaLabel: "ቦታ ይያዙ",
      ctaHref: "#contact",
    },
  ],
};

// ---------------------------------------------------------------------------
// Packages — Umrah: Normal / Standard / VIP / VVIP; Hajj: unchanged.
// ---------------------------------------------------------------------------

export const packages: Record<
  LocaleCode,
  {
    category: PackageCategory;
    name: string;
    tier: string;
    price: string;
    duration: string;
    summary: string;
    features: string[];
    featured: boolean;
  }[]
> = {
  en: [
    {
      category: "umrah",
      name: "Umrah Normal",
      tier: "Normal",
      price: "$1,000",
      duration: "9 nights",
      summary: "A simple, budget-friendly Umrah for pilgrims who want the essentials done right.",
      features: [
        "3★ hotels, a short ride from the Haram",
        "Shared airport transfers",
        "Group Umrah guidance",
        "Visa & documentation included",
        "Madinah stay (2 nights)",
      ],
      featured: false,
    },
    {
      category: "umrah",
      name: "Umrah Standard",
      tier: "Standard",
      price: "$1,150",
      duration: "10 nights",
      summary: "Our most-booked Umrah — comfortable hotels within walking distance of the Haram.",
      features: [
        "4★ hotels near the Haram",
        "Return flights & transfers",
        "Guided Umrah rites",
        "Madinah ziyārat (3 nights)",
        "Visa & assistance included",
      ],
      featured: true,
    },
    {
      category: "umrah",
      name: "Umrah VIP",
      tier: "VIP",
      price: "$1,890",
      duration: "12 nights",
      summary: "Elevated comfort with premium hotels overlooking the Haram and a smaller group.",
      features: [
        "5★ hotels overlooking the Haram",
        "Premium flights & private transfers",
        "Dedicated scholar guide",
        "Extended Madinah stay (4 nights)",
        "Full-board dining",
      ],
      featured: false,
    },
    {
      category: "umrah",
      name: "Umrah VVIP",
      tier: "VVIP",
      price: "$2,950",
      duration: "14 nights",
      summary:
        "Our most refined Umrah — Haram-view suites, private transport and unhurried, concierge care.",
      features: [
        "5★ Haram-view suites",
        "Private transport throughout",
        "Senior scholar accompaniment",
        "Extended Madinah stay (5 nights)",
        "24/7 concierge service",
      ],
      featured: true,
    },
    {
      category: "hajj",
      name: "Hajj Mabrūr",
      tier: "Standard",
      price: "From $8,400",
      duration: "21 nights",
      summary: "A complete, comfortable Hajj with experienced group leaders.",
      features: [
        "Aziziyah & Mina tent (standard)",
        "All flights, transfers & meals",
        "Full guidance through all rites",
        "Madinah ziyārat included",
        "Hajj visa & documentation",
      ],
      featured: false,
    },
    {
      category: "hajj",
      name: "Hajj Khāssa",
      tier: "VIP",
      price: "From $14,900",
      duration: "18 nights",
      summary: "Our most refined Hajj, offering proximity, privacy and unhurried care.",
      features: [
        "VIP Mina camp near Jamarat",
        "5★ Haram-view hotels",
        "Small group, private transport",
        "Senior scholar accompaniment",
        "Concierge service throughout",
      ],
      featured: true,
    },
  ],
  am: [
    {
      category: "umrah",
      name: "ዑምራ መደበኛ",
      tier: "መደበኛ",
      price: "$1,000",
      duration: "9 ሌሊት",
      summary: "መሰረታዊ ፍላጎቶችን በትክክል ለሚፈልጉ ሐጃጆች የተዘጋጀ ቀላልና ተመጣጣኝ ዑምራ።",
      features: [
        "ከሐረም ብዙም ያልራቁ 3★ ሆቴሎች",
        "የጋራ አየር ማረፊያ ትራንስፖርት",
        "የቡድን ዑምራ መመሪያ",
        "ቪዛና ሰነዶች ተካቷል",
        "የመዲና ቆይታ (2 ሌሊት)",
      ],
      featured: false,
    },
    {
      category: "umrah",
      name: "ዑምራ ደረጃ",
      tier: "ደረጃ",
      price: "$1,150",
      duration: "10 ሌሊት",
      summary: "እጅግ በብዛት የሚመረጠው ዑምራችን — ከሐረም በእግር ርቀት ላይ ምቹ ሆቴሎች።",
      features: [
        "ከሐረም አጠገብ 4★ ሆቴሎች",
        "የመመለሻ በረራና ትራንስፖርት",
        "በመሪነት የታጀበ ዑምራ",
        "የመዲና ዚያራ (3 ሌሊት)",
        "ቪዛና ድጋፍ ተካቷል",
      ],
      featured: true,
    },
    {
      category: "umrah",
      name: "ዑምራ VIP",
      tier: "VIP",
      price: "$1,890",
      duration: "12 ሌሊት",
      summary: "ሐረምን በሚመለከቱ ከፍተኛ ደረጃ ሆቴሎችና አነስተኛ ቡድን የከፍ ያለ ምቾት።",
      features: [
        "ሐረምን የሚመለከቱ 5★ ሆቴሎች",
        "ከፍተኛ በረራና የግል ትራንስፖርት",
        "የተወሰነ ዐዋቂ መሪ",
        "የተራዘመ የመዲና ቆይታ (4 ሌሊት)",
        "ሙሉ ምግብ",
      ],
      featured: false,
    },
    {
      category: "umrah",
      name: "ዑምራ VVIP",
      tier: "VVIP",
      price: "$2,950",
      duration: "14 ሌሊት",
      summary: "እጅግ የተጣራ ዑምራችን፤ ሐረምን የሚመለከቱ ስዊት፣ የግል ትራንስፖርትና ያልተቸኮለ የኮንሲየርጅ እንክብካቤ።",
      features: [
        "ሐረምን የሚመለከቱ 5★ ስዊት",
        "በመላው ጉዞ የግል ትራንስፖርት",
        "የበኩር ዐዋቂ አጃቢነት",
        "የተራዘመ የመዲና ቆይታ (5 ሌሊት)",
        "24/7 የኮንሲየርጅ አገልግሎት",
      ],
      featured: true,
    },
    {
      category: "hajj",
      name: "ሐጅ መብሩር",
      tier: "መደበኛ",
      price: "ከ $8,400 ጀምሮ",
      duration: "21 ሌሊት",
      summary: "ልምድ ባላቸው የቡድን መሪዎች የተሟላና ምቹ ሐጅ።",
      features: [
        "የዐዚዚያና የሚና ድንኳን (መደበኛ)",
        "ሁሉም በረራ፣ ትራንስፖርትና ምግብ",
        "በሁሉም ሥርዓቶች ሙሉ መመሪያ",
        "የመዲና ዚያራ ተካቷል",
        "የሐጅ ቪዛና ሰነዶች",
      ],
      featured: false,
    },
    {
      category: "hajj",
      name: "ሐጅ ኻስ",
      tier: "ልዩ (VIP)",
      price: "ከ $14,900 ጀምሮ",
      duration: "18 ሌሊት",
      summary: "እጅግ የተጣራ ሐጃችን፤ ቅርበት፣ ግላዊነትና ያልተቸኮለ እንክብካቤ።",
      features: [
        "ከጀመራት አጠገብ የ VIP የሚና ካምፕ",
        "ሐረምን የሚመለከቱ 5★ ሆቴሎች",
        "አነስተኛ ቡድን፣ የግል ትራንስፖርት",
        "የበኩር ዐዋቂ አጃቢነት",
        "በመላው ጉዞ የኮንሲየርጅ አገልግሎት",
      ],
      featured: true,
    },
  ],
};

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export const testimonials: Record<
  LocaleCode,
  { quote: string; name: string; trip: string; rating: number }[]
> = {
  en: [
    {
      quote:
        "From the moment we landed, every detail was handled with such care. I could finally focus only on my worship. May Allah reward this team.",
      name: "Aisha R.",
      trip: "Umrah VIP · 2024",
      rating: 5,
    },
    {
      quote:
        "My elderly parents performed Hajj with complete peace of mind. The guides were patient, gentle and deeply knowledgeable. Truly a Hajj Mabrūr.",
      name: "Yusuf K.",
      trip: "Hajj Khāssa · 2023",
      rating: 5,
    },
    {
      quote:
        "The hotel was steps from the Haram and the group felt like family. I have already recommended Gora Belu to everyone I know.",
      name: "Fatima S.",
      trip: "Umrah Standard · 2024",
      rating: 5,
    },
  ],
  am: [
    {
      quote:
        "ካረፍንበት ጊዜ ጀምሮ እያንዳንዱ ዝርዝር በታላቅ እንክብካቤ ተስተናግዷል። ትኩረቴን ለዒባዳ ብቻ መስጠት ቻልኩ። አላህ ይህን ቡድን ይመንዳ።",
      name: "ዓኢሻ ረ.",
      trip: "ዑምራ VIP · 2024",
      rating: 5,
    },
    {
      quote: "አረጋውያን ወላጆቼ ሐጅን በሙሉ የልብ ሰላም አከናወኑ። መሪዎቹ ታጋሽ፣ ለስላሳና በጣም ዐዋቂ ነበሩ። በእውነት ሐጅ መብሩር።",
      name: "ዩሱፍ ከ.",
      trip: "ሐጅ ኻስ · 2023",
      rating: 5,
    },
    {
      quote: "ሆቴሉ ከሐረም ጥቂት እርምጃ ነበር ቡድኑም እንደ ቤተሰብ ተሰማኝ። ጎራ በሉን ለማውቃቸው ሁሉ መክሬያለሁ።",
      name: "ፋጡማ ሰ.",
      trip: "ዑምራ ደረጃ · 2024",
      rating: 5,
    },
  ],
};

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faqs: Record<LocaleCode, { q: string; a: string }[]> = {
  en: [
    {
      q: "What is the difference between Hajj and Umrah?",
      a: "Hajj is the obligatory pilgrimage performed during specific days of Dhul-Hijjah and is one of the five pillars of Islam. Umrah, often called the 'lesser pilgrimage', can be performed at any time of the year. We offer guided packages for both.",
    },
    {
      q: "Do you handle visas and documentation?",
      a: "Yes. Hajj and Umrah visas, along with all required documentation and guidance on vaccinations, are arranged for you as part of every package.",
    },
    {
      q: "How close are the hotels to the Haram?",
      a: "Hotel proximity varies by package tier, from a short walk to direct Haram views. Each package page lists the distance clearly, and we are happy to show you on a map.",
    },
    {
      q: "Can you accommodate elderly or first-time pilgrims?",
      a: "Absolutely. We provide additional support for elderly travellers, wheelchair assistance where needed, and detailed briefings so first-time pilgrims feel fully prepared.",
    },
    {
      q: "Are payment plans available?",
      a: "Yes. Flexible deposit and instalment options are available. Speak with one of our guides to arrange a plan that suits you.",
    },
  ],
  am: [
    {
      q: "በሐጅና በዑምራ መካከል ያለው ልዩነት ምንድነው?",
      a: "ሐጅ በዙልሒጃ ወር በተወሰኑ ቀናት የሚከናወን ግዴታ የሆነ ጉዞ ሲሆን ከእስልምና አምስት መሠረቶች አንዱ ነው። ዑምራ ደግሞ ‘ትንሹ ሐጅ’ ተብሎ የሚጠራ ሲሆን በዓመቱ በማንኛውም ጊዜ ሊከናወን ይችላል። ለሁለቱም በመሪነት የታጀቡ ጥቅሎች እናቀርባለን።",
    },
    {
      q: "ቪዛና ሰነዶችን ታዘጋጃላችሁ?",
      a: "አዎ። የሐጅና ዑምራ ቪዛ፣ ሁሉም አስፈላጊ ሰነዶችና የክትባት መመሪያ እንደ እያንዳንዱ ጥቅል አካል ይዘጋጃል።",
    },
    {
      q: "ሆቴሎቹ ከሐረም ምን ያህል ቅርብ ናቸው?",
      a: "የሆቴል ቅርበት እንደ ጥቅሉ ደረጃ ይለያያል፤ ከአጭር የእግር መንገድ እስከ ቀጥታ የሐረም እይታ። እያንዳንዱ ጥቅል ርቀቱን በግልጽ ይዘረዝራል፣ በካርታም ለማሳየት ደስተኞች ነን።",
    },
    {
      q: "አረጋውያንን ወይም የመጀመሪያ ጊዜ ሐጃጆችን ማስተናገድ ትችላላችሁ?",
      a: "በፍጹም። ለአረጋውያን ተጨማሪ ድጋፍ፣ አስፈላጊ ሲሆን የተሽከርካሪ ወንበር እገዛ፣ እና የመጀመሪያ ጊዜ ሐጃጆች ሙሉ በሙሉ ዝግጁ እንዲሆኑ ዝርዝር ገለጻ እናቀርባለን።",
    },
    {
      q: "የክፍያ ዕቅዶች አሉ?",
      a: "አዎ። ተለዋዋጭ የቅድሚያ ክፍያና የክፍፍል አማራጮች አሉ። የሚስማማዎትን ዕቅድ ለማዘጋጀት ከመሪዎቻችን አንዱን ያነጋግሩ።",
    },
  ],
};

// ---------------------------------------------------------------------------
// Hotels — Thamer Samil Al Suwat Group price list (15 Jun–30 Sep / 15 Jun–15
// Aug 2026). WD = weekday, WE = weekend (last 3 nights of the week), ALL =
// same rate every night. "*" in the source (unavailable) becomes `undefined`.
// `featured` picks the compact highlight set the public page shows by
// default — a handful of the best hotel per tier per city.
// ---------------------------------------------------------------------------

function d(day: number, month: number): Date {
  return new Date(Date.UTC(2026, month - 1, day));
}

const PERIOD_JUN_SEP = { periodFrom: d(15, 6), periodTo: d(30, 9) };
const PERIOD_JUN_AUG = { periodFrom: d(15, 6), periodTo: d(15, 8) };

export interface HotelRateSeed {
  dayType: DayType;
  dbl?: number;
  trp?: number;
  quad?: number;
}

export interface HotelSeed {
  city: HotelCity;
  name: string;
  nameAr?: string;
  stars?: number;
  featured?: boolean;
  periodFrom: Date;
  periodTo: Date;
  breakfast?: string;
  lunch?: string;
  haramView?: string;
  kaabaView?: string;
  rates: HotelRateSeed[];
}

export const hotels: HotelSeed[] = [
  // ---- Makkah — 5★, WD/WE, H.V/K.V ----
  {
    city: "makkah",
    name: "Dar Al Tawhid",
    nameAr: "فندق دار التوحيد",
    stars: 5,
    featured: true,
    ...PERIOD_JUN_SEP,
    breakfast: "Incl.",
    lunch: "300",
    haramView: "300",
    rates: [
      { dayType: "WD", dbl: 1490, trp: 1790 },
      { dayType: "WE", dbl: 1600, trp: 1600 },
    ],
  },
  {
    city: "makkah",
    name: "Fairmont Makkah",
    nameAr: "فندق فيرمونت مكة",
    stars: 5,
    featured: true,
    ...PERIOD_JUN_SEP,
    breakfast: "Incl.",
    lunch: "200",
    haramView: "300",
    kaabaView: "500",
    rates: [
      { dayType: "WD", dbl: 1200, trp: 1400, quad: 1600 },
      { dayType: "WE", dbl: 1350, trp: 1550, quad: 1700 },
    ],
  },
  {
    city: "makkah",
    name: "SwissOtel Makkah & Al Maqm",
    nameAr: "فندق سويس المقام راوتيل",
    stars: 5,
    ...PERIOD_JUN_SEP,
    breakfast: "Incl.",
    lunch: "150",
    haramView: "200",
    kaabaView: "500",
    rates: [
      { dayType: "WD", dbl: 1300, trp: 1080, quad: 950 },
      { dayType: "WE", dbl: 1050, trp: 1180, quad: 1400 },
    ],
  },
  {
    city: "makkah",
    name: "Movenpick Hajar",
    nameAr: "فندق موفنبيك هاجر",
    stars: 5,
    ...PERIOD_JUN_SEP,
    breakfast: "Incl.",
    lunch: "150",
    haramView: "200",
    kaabaView: "500",
    rates: [
      { dayType: "WD", dbl: 1300, trp: 1080, quad: 950 },
      { dayType: "WE", dbl: 1050, trp: 1180, quad: 1400 },
    ],
  },
  {
    city: "makkah",
    name: "Hayatt Regency",
    nameAr: "فندق جياة ريجنسي",
    stars: 5,
    featured: true,
    ...PERIOD_JUN_SEP,
    breakfast: "Incl.",
    lunch: "150",
    haramView: "200",
    rates: [
      { dayType: "WD", dbl: 950, trp: 1080, quad: 1300 },
      { dayType: "WE", dbl: 1050, trp: 1180, quad: 1400 },
    ],
  },
  {
    city: "makkah",
    name: "Al Safwa Tower 3",
    nameAr: "فندق الصفوة برج 3",
    stars: 5,
    ...PERIOD_JUN_SEP,
    breakfast: "Incl.",
    lunch: "150",
    rates: [
      { dayType: "WD", dbl: 750, trp: 880, quad: 1010 },
      { dayType: "WE", dbl: 850, trp: 980, quad: 1110 },
    ],
  },
  {
    city: "makkah",
    name: "Zam Zam Pullman",
    nameAr: "فندق بولمان زمزم",
    stars: 5,
    ...PERIOD_JUN_SEP,
    breakfast: "Incl.",
    lunch: "150",
    haramView: "200",
    kaabaView: "500",
    rates: [
      { dayType: "WD", dbl: 950, trp: 1080, quad: 1300 },
      { dayType: "WE", dbl: 1050, trp: 1180, quad: 1400 },
    ],
  },
  {
    city: "makkah",
    name: "Abraj Makkah",
    nameAr: "فندق أبراج مكة",
    stars: 5,
    ...PERIOD_JUN_SEP,
    breakfast: "75",
    lunch: "150",
    haramView: "100",
    rates: [{ dayType: "WD", dbl: 750, trp: 850, quad: 950 }],
  },
  {
    city: "makkah",
    name: "Anjum Hotel",
    nameAr: "فندق أنجم مكة",
    stars: 5,
    featured: true,
    ...PERIOD_JUN_SEP,
    breakfast: "Incl.",
    lunch: "120",
    haramView: "100",
    rates: [
      { dayType: "WD", dbl: 600, trp: 700, quad: 800 },
      { dayType: "WE", dbl: 650, trp: 750, quad: 850 },
    ],
  },
  // ---- Makkah — mid-tier, "All" days, DBL/TRP/QUAD ----
  {
    city: "makkah",
    name: "Shaza Makkah",
    nameAr: "فندق شذا مكة",
    featured: true,
    ...PERIOD_JUN_AUG,
    breakfast: "Incl.",
    rates: [{ dayType: "ALL", dbl: 700, trp: 800, quad: 900 }],
  },
  {
    city: "makkah",
    name: "Sheraton Makkah",
    nameAr: "فندق شيراتون مكة",
    ...PERIOD_JUN_AUG,
    breakfast: "Incl.",
    rates: [{ dayType: "ALL", dbl: 500, trp: 570, quad: 640 }],
  },
  {
    city: "makkah",
    name: "Al Shohada",
    nameAr: "فندق الشهداء مكة",
    ...PERIOD_JUN_AUG,
    breakfast: "Incl.",
    rates: [{ dayType: "ALL", dbl: 550, trp: 650, quad: 750 }],
  },
  // ---- Makkah — budget tier, "All" days, room-only, one price ----
  ...(
    [
      ["Grand Al Massa", "فندق جراند الماسة", 380, true],
      ["Al Massa dar Al faezeen", "فندق الماسة دار الفائزين", 330, false],
      ["Infinity Makkah", "فندق إنفينيتي مكة", 330, false],
      ["Le Meridien Towers", "فندق أبراج الميريديان", 300, false],
      ["Manarat Ghaza", "فندق منارات غزة", 250, false],
      ["Maysan Al Magam", "فندق ميسان المقام", 350, false],
      ["Al Fajr Abadea 5", "فندق الفجر إبداع 5", 220, false],
      ["Bader Al Massah", "فندق البدر الماسة", 220, false],
      ["Dorat Al Salarh", "فندق درة الصلاح", 150, false],
      ["Afaq Emaar", "فندق آفاق إعمار", 150, false],
      ["Bakkah Al Salan", "فندق الصلاح أجياد", 150, false],
      ["Al Deyafa Tower", "فندق برج الضيافة", 130, false],
      ["Abrar Al jeandriya", "فندق الجاندريا", 90, false],
      ["Al Olayan Palace", "فندق قصر العليان", 110, false],
      ["Shurfat Al Talaa", "فندق شرفة الطلائع", 90, false],
      ["Dar Um Al Qura Al Zahabi", "فندق دار أم القرى الذهبي", 70, false],
      ["Nasamat Al Khair", "فندق نسمات الخير", 90, false],
    ] as [string, string, number, boolean][]
  ).map(([name, nameAr, dbl, featured]) => ({
    city: "makkah" as HotelCity,
    name,
    nameAr,
    featured,
    ...PERIOD_JUN_AUG,
    breakfast: "R.O",
    rates: [{ dayType: "ALL" as DayType, dbl }],
  })),
  // ---- Madinah — mid/upper tier, "All" days, DBL/TRP/QUAD ----
  {
    city: "madinah",
    name: "Anwar Al Madina Movenpick Al Haram Tower",
    nameAr: "فندق أنوار المدينة موفنبيك برج الحرم",
    featured: true,
    ...PERIOD_JUN_AUG,
    breakfast: "R.O",
    rates: [{ dayType: "ALL", dbl: 750, trp: 850, quad: 950 }],
  },
  {
    city: "madinah",
    name: "Anwar Al Madina Movenpick Madinah Tower",
    nameAr: "فندق أنوار المدينة موفنبيك برج المدينة",
    ...PERIOD_JUN_AUG,
    breakfast: "R.O",
    rates: [{ dayType: "ALL", dbl: 700, trp: 800, quad: 900 }],
  },
  {
    city: "madinah",
    name: "Al Aqeeq Hotel",
    nameAr: "فندق العقيق المدينة",
    featured: true,
    ...PERIOD_JUN_AUG,
    breakfast: "Ind.",
    rates: [{ dayType: "ALL", dbl: 650, trp: 725, quad: 800 }],
  },
  {
    city: "madinah",
    name: "Leader Muna Kareem",
    nameAr: "فندق منى كريم",
    ...PERIOD_JUN_AUG,
    breakfast: "Ind.",
    rates: [{ dayType: "ALL", dbl: 620, trp: 670, quad: 720 }],
  },
  {
    city: "madinah",
    name: "Pullman ZamZam Al Madina",
    nameAr: "فندق بولمان زمزم المدينة",
    featured: true,
    ...PERIOD_JUN_AUG,
    breakfast: "Ind.",
    rates: [{ dayType: "ALL", dbl: 650, trp: 750, quad: 850 }],
  },
  {
    city: "madinah",
    name: "Ruve Al Madinah",
    nameAr: "فندق رووف المدينة",
    ...PERIOD_JUN_AUG,
    breakfast: "Ind.",
    rates: [{ dayType: "ALL", dbl: 700, trp: 800, quad: 900 }],
  },
  {
    city: "madinah",
    name: "Crown Plaza",
    nameAr: "فندق كراون بلازا",
    featured: true,
    ...PERIOD_JUN_AUG,
    breakfast: "Ind.",
    rates: [{ dayType: "ALL", dbl: 700, trp: 800, quad: 900 }],
  },
  {
    city: "madinah",
    name: "Kayan International",
    nameAr: "فندق كيان العالمي",
    ...PERIOD_JUN_AUG,
    breakfast: "R.O",
    rates: [{ dayType: "ALL", dbl: 380 }],
  },
  {
    city: "madinah",
    name: "Rawdah Al Aqeeq",
    nameAr: "فندق روضة العقيق",
    ...PERIOD_JUN_AUG,
    breakfast: "R.O",
    rates: [{ dayType: "ALL", dbl: 380 }],
  },
  // ---- Madinah — budget tier, "All" days, room-only, one price ----
  ...(
    [
      ["Arjwan Al Deiafa", "فندق أرجوان الضيافة", 350],
      ["Rama Al Madinah", "فندق راما المدينة", 350],
      ["Al Madinah Concord", "فندق كونكورد المدينة", 350],
      ["Rawabi Al Zahraa", "فندق روابي الزهراء", 300],
      ["Anwar Al Zahraa", "فندق أنوار الزهراء", 300],
      ["Mohamdeyn Al Zahraa", "فندق محمدين الزهراء", 300],
      ["Wefadaa Al Zahraa", "فندق وفادة الزهراء", 300],
      ["Saraya Harmoni", "فندق سرايا هارموني", 325],
      ["Maather Al Andalus", "فندق الأندلس", 300],
      ["Mawada Tower", "فندق برج مودة", 300],
    ] as [string, string, number][]
  ).map(([name, nameAr, dbl]) => ({
    city: "madinah" as HotelCity,
    name,
    nameAr,
    ...PERIOD_JUN_AUG,
    breakfast: "R.O",
    rates: [{ dayType: "ALL" as DayType, dbl }],
  })),
];

// ---------------------------------------------------------------------------
// Supplier — private, admin-only (never rendered on the public site).
// ---------------------------------------------------------------------------

export const supplier = {
  name: "Thamer Samil Al Suwat Group",
  bankName: "Saudi National Bank",
  accountName: "Thamer Samr For Umrah",
  accountNumber: "900000195305",
  iban: "SA5810000000900000195305",
  swiftCode: "NCBKSAJE",
  contacts: [
    { name: "Hani Safar", phone: "+966 59 793 2858", email: "Hani.safar@thamer-umra.com" },
    { name: "Raed Awad", phone: "+966 59 959 5059", email: "Raed@thamer-umra.com" },
    { name: "Ahmed Kamal", phone: "+966 58 213 4153", email: "ahmed@thamer-umra.com" },
    { name: "Hattan Al Suwat", phone: "+966 50 244 5572", email: "Hattan@thamer-umra.com" },
  ],
  notes:
    "Kingdom of Saudi Arabia · Makkah · King Fahd District · Saleh Jamal Street. " +
    "Main line +966 50 244 5572 · info@thamer-umra.com · www.thamer-umra.com. " +
    "Social: @thamer_asa1 (X/Instagram), @thamer_asa (TikTok/Facebook). " +
    "Terms: prices are net in SAR and exclude commissions/free room; the last 3 nights " +
    "of the week run Wed→Fri noon (except where noted); cancelling a day before arrival " +
    "may be charged per hotel policy (Ramadan has its own policy); the company can change " +
    "prices/periods without notice unless a reservation is confirmed; check-in/out is " +
    "registered by the Gregorian date.",
};
