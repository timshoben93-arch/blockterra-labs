import { Coins, Cpu, FileCode2, Layers, Network, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import rwaImg from "@/assets/services/rwa-tokenization.jpg";
import auditsImg from "@/assets/services/audits.jpg";
import layersImg from "@/assets/services/layers.jpg";
import complianceImg from "@/assets/services/compliance.jpg";
import liquidityImg from "@/assets/services/liquidity.jpg";
import aiImg from "@/assets/services/ai-analytics.jpg";

const services = [
  {
    icon: Coins,
    title: "RWA tokenization",
    desc: "Issue compliant, transferable instruments for real estate, treasuries, commodities, and private credit — including lifecycle events and redemptions.",
    href: "/services/rwa-tokenization",
    image: rwaImg,
  },
  {
    icon: ShieldCheck,
    title: "Smart contract assurance",
    href: "/services/blockchain-development",
    image: auditsImg,
  },
  {
    icon: Layers,
    title: "L1 / L2 engineering",
    href: "/services/blockchain-development",
    image: layersImg,
  },
  {
    icon: FileCode2,
    title: "Compliance & identity rails",
    href: "/services/rwa-tokenization",
    image: complianceImg,
  },
  {
    icon: Network,
    title: "Liquidity & market infra",
    href: "/services/rwa-tokenization",
    image: liquidityImg,
  },
  {
    icon: Cpu,
    title: "On-chain analytics & AI",
    href: "/services/ai-ml-development",
    image: aiImg,
  },
];

export const Services = () => {
  return (
    <section id="solutions" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Engineering for assets that already exist in the real world
            </>
          }
          description="We take tokenization from term sheet to audited contracts, investor onboarding, and day-two operations — not a slide deck."
        />

        <ul className="mt-4 divide-y divide-border border-t border-border">
          {services.map(({ icon: Icon, title, desc, image }, i) => (
            <li key={title}>
              <Reveal delayMs={i * 40}>
                <div className="grid gap-6 py-8 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 md:py-10">
                  <div className="relative hidden h-20 w-32 overflow-hidden border border-border sm:block">
                    <img src={image} alt="" width={256} height={160} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{desc}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
