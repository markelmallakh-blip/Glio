import { privacyPolicy } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";
import { LegalArticle } from "@/components/sections/shared/LegalArticle";

export const metadata = pageMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return <LegalArticle document={privacyPolicy} />;
}
