import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/data/services";
import researchImg from "@/assets/services/rwa-tokenization.jpg";
import techImg from "@/assets/services/layers.jpg";
import collabImg from "@/assets/services/audits.jpg";
import ecosystemImg from "@/assets/services/liquidity.jpg";

const images = [researchImg, techImg, collabImg, ecosystemImg];

export const Services = () => {
  return (
    <section id="what-we-do" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          singleLineTitle
          title={
            <>
              Four capabilities for the tokenized <span className="text-gradient">asset economy</span>
            </>
          }
          description="We combine independent research, technical architecture evaluation, platform collaboration and ecosystem development — helping institutions and technology providers advance tokenization without locking into a single vendor narrative."
        />

        <ul className="mt-4 divide-y divide-border border-t border-border">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <li key={service.slug}>
                <Reveal delayMs={i * 40}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="group grid gap-6 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 md:py-10"
                  >
                    <div className="relative hidden h-20 w-32 overflow-hidden border border-border sm:block">
                      <img
                        src={images[i]}
                        alt=""
                        width={256}
                        height={160}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        <h3 className="font-display text-xl font-semibold tracking-tight">{service.title}</h3>
                      </div>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {service.tagline}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
