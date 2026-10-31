import type { Metadata } from "next";
import { withBase } from "@/config/site";
import { AccountLink } from "@/components/AccountLink";

export const metadata: Metadata = {
  title: "Your account",
  description: "Finishes the links in HUX e-mails: e-mail confirmation and password reset.",
  alternates: { canonical: withBase("/account/") },
  robots: { index: false, follow: false }, // a utility page for e-mail links, not for search engines
};

/** Every link in a HUX account e-mail lands here (Supabase "Site URL"). */
export default function AccountPage() {
  return (
    <main id="main" className="container-hux flex min-h-[70dvh] items-start justify-center py-14 lg:py-24">
      <AccountLink />
    </main>
  );
}
