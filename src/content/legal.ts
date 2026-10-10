export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  after?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description: "How GLIO collects, uses and protects your personal information.",
  intro:
    "At GLIO, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and mobile car care services.",
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: ["When you book a service or create an account, we may collect:"],
      bullets: [
        "Full name",
        "Email address",
        "Mobile number",
        "Service address and zone",
        "Car details (brand, model, year, color, plate number)",
        "Payment information (processed securely through third-party providers)",
      ],
      after: [
        "We may also collect technical information such as browser type, device data, and website usage statistics to improve our platform.",
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: ["We use your information to:"],
      bullets: [
        "Process and confirm bookings",
        "Schedule and deliver services",
        "Contact you regarding appointments or updates",
        "Improve our website and service experience",
        "Provide customer support",
        "Send important service-related communications",
      ],
      after: ["We do not sell or rent your personal data to third parties."],
    },
    {
      heading: "Payment Security",
      paragraphs: [
        "All online payments are processed through secure, trusted third-party payment providers. GLIO does not store your full credit card details on our servers.",
      ],
    },
    {
      heading: "Data Protection",
      paragraphs: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, misuse, or disclosure.",
        "Access to personal data is restricted to authorized team members who require it to perform their duties.",
      ],
    },
    {
      heading: "Booking & Account Information",
      paragraphs: ["If you create an account, your information allows you to:"],
      bullets: [
        "View and manage upcoming bookings",
        "Edit scheduled appointments (according to our service terms)",
        "Save addresses and vehicles for faster booking",
      ],
      after: ["You are responsible for keeping your login credentials secure."],
    },
    {
      heading: "Cookies & Website Analytics",
      paragraphs: ["We may use cookies and similar technologies to:"],
      bullets: [
        "Improve website performance",
        "Analyze user behavior",
        "Enhance your browsing experience",
      ],
      after: ["You can manage cookie preferences through your browser settings."],
    },
    {
      heading: "Service Areas",
      paragraphs: [
        "GLIO currently operates within Cairo. Location information provided during booking is used strictly for scheduling and calculating service fees.",
      ],
    },
    {
      heading: "Data Retention",
      paragraphs: ["We retain personal information only for as long as necessary to:"],
      bullets: [
        "Fulfill service obligations",
        "Comply with legal requirements",
        "Resolve disputes",
      ],
    },
    {
      heading: "Your Rights",
      paragraphs: ["You have the right to:"],
      bullets: [
        "Access your personal data",
        "Request corrections",
        "Request deletion of your information (subject to legal obligations)",
      ],
      after: ["For any privacy-related requests, please contact us through the information below."],
    },
    {
      heading: "Contact Us",
      paragraphs: [
        "If you have any questions about this Privacy Policy or how your data is handled, please contact support@glio.com.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms & Conditions",
  description: "The terms that govern the use of GLIO's website and mobile car care services.",
  intro:
    "Welcome to GLIO. These Terms & Conditions govern your use of our website and mobile car care services. By booking a service with GLIO, you agree to the terms outlined below.",
  sections: [
    {
      heading: "Service Overview",
      paragraphs: [
        "GLIO provides professional mobile car care services within Cairo. Our team arrives at the customer’s selected location with fully equipped service units to perform the requested package.",
        "Service availability depends on zone coverage and time slot availability. Several vehicles can be booked in one visit; they are serviced back-to-back by the same team with a 30 minute break between vehicles.",
      ],
    },
    {
      heading: "Booking & Confirmation",
      paragraphs: [
        "All bookings must be completed through our official platform. A booking is considered confirmed only after:",
      ],
      bullets: [
        "Completing the required information",
        "Selecting date and time",
        "Successful online payment",
      ],
      after: [
        "GLIO reserves the right to reschedule bookings in rare operational circumstances. In such cases, customers will be notified promptly.",
      ],
    },
    {
      heading: "Pricing & Payment",
      bullets: [
        "All prices are clearly displayed before payment.",
        "Package prices are per car; service fees vary by zone within Cairo and are charged once per visit.",
        "Pay the full amount online, or for bookings above 1,500 EGP a 30%, 50% or 70% down payment, with the remaining balance paid on the visit day by Instapay, card on the GLIO team’s POS, or cash.",
        "Card payments are processed securely through third-party providers. InstaPay transfers are confirmed once our team verifies the uploaded receipt.",
      ],
      after: [
        "GLIO reserves the right to update pricing at any time. Confirmed bookings are not affected by future price changes.",
      ],
    },
    {
      heading: "One-Time Booking Policy",
      bullets: [
        "One-time bookings may be canceled or rescheduled up to 48 hours before the scheduled appointment.",
        "Cancellations made less than 48 hours before service may not be eligible for a refund.",
        "No-shows may result in cancellation without refund.",
      ],
    },
    {
      heading: "Customer Responsibilities",
      paragraphs: ["Customers must ensure:"],
      bullets: [
        "The vehicle is accessible at the scheduled time.",
        "The location allows safe service delivery.",
        "Accurate vehicle and address details are provided during booking.",
      ],
      after: [
        "If access is not available at the scheduled time, GLIO may treat the booking as a no-show.",
      ],
    },
    {
      heading: "Service Limitations",
      paragraphs: ["GLIO is not responsible for:"],
      bullets: [
        "Pre-existing vehicle damage",
        "Mechanical failures unrelated to cleaning",
        "Personal belongings left inside the vehicle",
      ],
      after: ["Customers are encouraged to remove valuables before service."],
    },
    {
      heading: "Address & Zone Changes",
      paragraphs: [
        "If a customer edits a saved address that is linked to an upcoming booking, service fees may change according to the updated zone. Any fee differences must be settled before service delivery.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "GLIO performs all services with professional care and trained staff. In the unlikely event of service-related damage directly caused by our team, claims must be reported within 24 hours of service completion.",
      ],
    },
    {
      heading: "Account & Security",
      paragraphs: [
        "Customers are responsible for maintaining the confidentiality of their account credentials. GLIO is not liable for unauthorized account use resulting from negligence.",
      ],
    },
    {
      heading: "Service Area",
      paragraphs: [
        "GLIO operates exclusively within Cairo. Bookings outside operational zones may be declined.",
      ],
    },
    {
      heading: "Changes to Terms",
      paragraphs: [
        "GLIO reserves the right to update these Terms & Conditions at any time. Continued use of our services constitutes acceptance of any updates.",
      ],
    },
    {
      heading: "Contact Information",
      paragraphs: [
        "For any questions regarding these Terms & Conditions, please contact info@glio.com.",
      ],
    },
  ],
};
