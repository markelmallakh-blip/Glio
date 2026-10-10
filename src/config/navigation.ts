export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Our Services", href: "/our-services" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Media Center", href: "/media-center" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Our Services", href: "/our-services" },
  { label: "About Us", href: "/about" },
  { label: "My Account", href: "/account" },
  { label: "Media Center", href: "/media-center" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Book Now", href: "/booking" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-and-conditions" },
];

export const accountNav = [
  { label: "My Profile", href: "/account", icon: "user" },
  { label: "My Bookings", href: "/account/bookings", icon: "ticket" },
  { label: "My Points", href: "/account/points", icon: "star" },
  { label: "My Wallet", href: "/account/wallet", icon: "wallet" },
  { label: "My Cars", href: "/account/cars", icon: "car" },
  { label: "My Addresses", href: "/account/addresses", icon: "location" },
] as const;
