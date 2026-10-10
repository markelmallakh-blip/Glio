export const siteConfig = {
  name: "GLIO",
  title: "GLIO | Mobile Car Care in Cairo",
  description:
    "Egypt's first mobile car care service. Professional washing and detailing at your home, office or wherever you park in Cairo. Book all your cars in a single visit.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://glio.pages.dev",
  locale: "en_EG",
  ogImage: "/images/hero-van.webp",
  contact: {
    phone: "+20 12 01010156",
    phoneHref: "tel:+201201010156",
    email: "info@glio.com",
    supportEmail: "support@glio.com",
  },
  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/1HvPLUQccZ/?mibextid=wwXIfr",
      icon: "facebook",
    },
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/glio_eg?igsh=Z2kzaDEzMWQxbTZl",
      icon: "instagram",
    },
    { label: "YouTube", href: "https://www.youtube.com", icon: "youtube" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
