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
  <LegalShell title="Privacy" updated="October 10, 2026">
    <p>
      TokenBrickLabs (“we”) operates tokenbricklabs.com as a professional-services website. This notice
      describes what we collect when you use the site, book a call, or apply for a role. It is not legal advice
      and is not an offer of employment or securities.
    </p>
    <h2>What we collect</h2>
    <p>
      If you book a call, Calendly processes your name, email, and scheduling details under their terms. If you
      email {SITE.email} or submit a talent application, we receive the information you send: typically name,
      email, contact handle, location, profile URL, years of experience, the role applied for, and a résumé
      file.
    </p>
    <p>
      Applications and résumés are stored in our database and private object storage hosted by Supabase
      (PostgreSQL and Storage). The public website is hosted by Vercel. Those processors act on our
      instructions. We do not use résumés to train public AI models.
    </p>
    <p>
      The site and hosting provider may collect standard logs such as IP address, browser type, and pages
      viewed, used to keep the service available and to diagnose errors. We do not currently operate a separate
      advertising-cookie program on this site.
    </p>
    <h2>How we use it</h2>
    <p>
      We use this information to respond to inquiries, schedule discovery calls, evaluate applications, and
      operate the website. We do not sell personal information. Applicant records are available only to
      authorized TokenBrickLabs personnel.
    </p>
    <h2>Retention and rights</h2>
    <p>
      We keep correspondence and applications as long as needed for hiring, client relationships, and ordinary
      legal obligations, then delete or restrict them. To access, correct, or delete information we hold about
      you (including a résumé), email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Depending on your
      location, you may have additional rights under laws such as the CCPA or GDPR; we will handle those
      requests in line with applicable law.
    </p>
    <h2>International transfers</h2>
    <p>
      We are based in the United States. If you apply from another country, your information may be processed
      in the US by us and our processors named above.
    </p>
  </LegalShell>
);

export const Terms = () => (
  <LegalShell title="Terms of use" updated="October 10, 2026">
    <p>
      This website is provided by TokenBrickLabs for information about our studio, documentation, and hiring.
      It is not an offer of securities, investment advice, a solicitation to buy or sell any instrument, or a
      commitment to tokenize any particular asset. Tokens discussed in our materials are not legal title to
      real estate or other property unless a specific, counsel-drafted instrument says so.
    </p>
    <h2>Professional services</h2>
    <p>
      Engineering, review, and advisory work is performed under a separate written agreement. Nothing on this
      site creates a client relationship. Discovery calls are complimentary and do not bind either party to a
      build. TokenBrickLabs is not a broker-dealer, ATS, transfer agent, fund administrator, or custodian.
    </p>
    <h2>Content</h2>
    <p>
      Documentation describes how we approach client engineering work and may change. It is not a TokenBrickLabs
      blockchain, native token, or whitepaper for an offering. You may not republish it as your own. You may
      quote short passages with attribution for commentary or internal evaluation.
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
  <LegalShell title="Security" updated="October 10, 2026">
    <p>
      TokenBrickLabs treats production smart contracts, keys, and client data as high-risk systems. This page
      summarizes how we work — not a substitute for an engagement-specific security schedule and not a claim
      that we are an audit firm.
    </p>
    <h2>Engineering practice</h2>
    <p>
      Contracts are developed with automated tests and internal engineering review. Independent third-party
      audit, when the asset and threat model require it, is commissioned by the client. We prefer conservative
      trust assumptions on bridges and oracles.
    </p>
    <h2>Custody and keys</h2>
    <p>
      We do not take discretionary custody of client or investor assets. Issuance designs integrate custody
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
