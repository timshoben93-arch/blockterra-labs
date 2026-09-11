import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SITE } from "@/lib/site";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

const LegalShell = ({ title, updated, children }: LegalPageProps) => {
  useEffect(() => {
    document.title = `${title} | TokenBrickLabs`;
  }, [title]);

  return (
  <div className="min-h-screen bg-background">
    <Header />
    <main id="main">
      <article className="container max-w-3xl py-16 md:py-24">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Legal</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated {updated}</p>
        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
        <p className="mt-12 text-sm">
          <Link to="/" className="text-primary underline-offset-4 hover:underline">
            Back to home
          </Link>
        </p>
      </article>
    </main>
    <Footer />
  </div>
  );
};

export const Privacy = () => (
  <LegalShell title="Privacy" updated="September 11, 2026">
    <p>
      TokenBrickLabs (“we”) operates tokenbricklabs.com and related professional-services sites. This notice
      describes what we collect when you use the site or contact us.
    </p>
    <h2>What we collect</h2>
    <p>
      If you book a call, Calendly processes your name, email, and scheduling details under their terms. If you
      email {SITE.email} or submit a talent application, we receive the information you send (typically name,
      contact details, and materials relevant to an engagement or role).
    </p>
    <p>
      The site may collect standard server and analytics logs such as IP address, browser type, and pages
      viewed, used to keep the service available and to understand which documentation is useful.
    </p>
    <h2>How we use it</h2>
    <p>
      We use this information to respond to inquiries, schedule discovery calls, evaluate applications, and
      operate the website. We do not sell personal information.
    </p>
    <h2>Retention and rights</h2>
    <p>
      We keep correspondence as long as needed for the relationship and ordinary legal obligations. To access,
      correct, or delete information we hold about you, email{" "}
      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
    </p>
  </LegalShell>
);

export const Terms = () => (
  <LegalShell title="Terms of use" updated="September 11, 2026">
    <p>
      This website is provided by TokenBrickLabs for information about our studio, documentation, and hiring.
      It is not an offer of securities, investment advice, or a commitment to tokenize any particular asset.
    </p>
    <h2>Professional services</h2>
    <p>
      Engineering, audit, and advisory work is performed under a separate written agreement. Nothing on this
      site creates a client relationship. Discovery calls are complimentary and do not bind either party to a
      build.
    </p>
    <h2>Content</h2>
    <p>
      Documentation and protocol papers describe our current thinking and may change. You may not republish
      them as your own. You may quote short passages with attribution for commentary or internal evaluation.
    </p>
    <h2>Limitation</h2>
    <p>
      The site is provided “as is.” To the extent permitted by law, TokenBrickLabs is not liable for damages
      arising from use of the public website. Governing law for site use is the State of Washington, USA,
      excluding conflict-of-law rules.
    </p>
    <p>
      Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
    </p>
  </LegalShell>
);

export const Security = () => (
  <LegalShell title="Security" updated="September 11, 2026">
    <p>
      TokenBrickLabs treats production smart contracts, keys, and client data as high-risk systems. This page
      summarizes how we work — not a substitute for an engagement-specific security schedule.
    </p>
    <h2>Engineering practice</h2>
    <p>
      Contracts are developed with automated tests, internal review, and, when the asset and threat model
      require it, independent third-party audit before mainnet. We prefer conservative trust assumptions on
      bridges and oracles.
    </p>
    <h2>Custody and keys</h2>
    <p>
      We do not take discretionary custody of client assets. Issuance designs integrate institutional custody
      (MPC / HSM) chosen with the client. Studio secrets and infrastructure credentials are scoped, rotated,
      and held off developer laptops wherever practical.
    </p>
    <h2>Disclosure</h2>
    <p>
      If you believe you have found a vulnerability in a TokenBrickLabs-operated system or in code we have
      published, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with steps to reproduce. Please give
      us a reasonable window to investigate before public disclosure.
    </p>
  </LegalShell>
);
