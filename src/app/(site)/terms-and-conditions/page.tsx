import { termsAndConditions } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalArticle } from "@/components/sections/shared/LegalArticle";

export const metadata = pageMetadata({
  title: termsAndConditions.title,
  description: termsAndConditions.description,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return <LegalArticle document={termsAndConditions} />;
}
