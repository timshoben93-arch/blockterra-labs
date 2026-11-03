import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/site/SectionHeading";
import rwaImg from "@/assets/services/rwa-tokenization.jpg";
import auditsImg from "@/assets/services/audits.jpg";
import layersImg from "@/assets/services/layers.jpg";
import complianceImg from "@/assets/services/compliance.jpg";
import liquidityImg from "@/assets/services/liquidity.jpg";
import aiImg from "@/assets/services/ai-analytics.jpg";

const services = [
  {
    title: "RWA tokenization",
    desc: "The core of the platform: permissioned token contracts and lifecycle workflows for real estate, treasuries, commodities, and private credit.",
    href: "/services/rwa-tokenization",
    image: rwaImg,
  },
  {
    title: "Contract review",
    desc: "Internal tests and engineering review on the platform’s contracts, with an independent audit commissioned when the threat model requires it.",
    href: "/services/blockchain-development",
    image: auditsImg,
  },
  {
    title: "Chain layer",
    desc: "Settlement on Ethereum and EVM L2s. The platform does not introduce a new Layer-1.",
    href: "/services/blockchain-development",
    image: layersImg,
  },
  {
    title: "Identity",
    desc: "Allowlists, jurisdictional restrictions, and hooks for KYC and accreditation vendors.",
    href: "/services/rwa-tokenization",
    image: complianceImg,
  },
  {
    title: "Issuance and servicing",
    desc: "Primary distribution plus the corporate actions — NAV inputs, coupons, redemptions — an administrator actually runs.",
    href: "/services/rwa-tokenization",
    image: liquidityImg,
  },
  {
    title: "Operator analytics",
    desc: "Monitoring and exception signals on the platform’s own issuance data. Not a valuation and not investment advice.",
    href: "/services/ai-ml-development",
    image: aiImg,
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Width / height of the reference card the expanded text and photo follow. */
const REFERENCE_RATIO = 1024 / 433;
/** Photo circle height relative to that card. */
const PHOTO_RATIO = 320 / 433;

/** Resting diameter. Fully open width is this times REFERENCE_RATIO, and always fits the viewport. */
const circleDiameter = (viewport: number) => {
  const previous = clamp(Math.min(112, viewport * 0.14), 64, 112);
  const size = Math.min(previous * 3, viewport - 40);
  return Math.min(size, (viewport - 40) / REFERENCE_RATIO);
};

/** How far a point `dy` from the pill's center sits inside a rounded end. */
const capInset = (width: number, height: number, contentH: number) => {
  const radius = Math.min(width, height) / 2;
  const dy = Math.min(Math.max(contentH, 1) / 2, Math.max(1, radius - 1));
  return radius - Math.sqrt(Math.max(0, radius * radius - dy * dy));
};

const contentOutside = (card: HTMLElement) => {
  const fit = card.querySelector<HTMLElement>("[data-fit]");
  if (!fit) return false;
  const width = card.offsetWidth;
  const height = card.offsetHeight;
  const radius = Math.min(width, height) / 2;
  const cardBox = card.getBoundingClientRect();
  const box = fit.getBoundingClientRect();
  const points = [
    [box.left - cardBox.left, box.top - cardBox.top],
    [box.right - cardBox.left - 1, box.top - cardBox.top],
    [box.left - cardBox.left, box.bottom - cardBox.top - 1],
    [box.right - cardBox.left - 1, box.bottom - cardBox.top - 1],
  ];
  return points.some(([x, y]) => {
    if (width >= height) {
      if (x >= radius && x <= width - radius) return y < 0 || y > height;
      const cx = x < radius ? radius : width - radius;
      const dx = x - cx;
      const dy = y - height / 2;
      return dx * dx + dy * dy > radius * radius;
    }
    if (y >= radius && y <= height - radius) return x < 0 || x > width;
    const cy = y < radius ? radius : height - radius;
    const dx = x - width / 2;
    const dy = y - cy;
    return dx * dx + dy * dy > radius * radius;
  });
};

const layoutCard = (card: HTMLElement, width: number, height: number, entered: number, padBoost = 0) => {
  const copy = card.querySelector<HTMLElement>("[data-copy]");
  const photo = card.querySelector<HTMLElement>("[data-photo]");
  const fit = card.querySelector<HTMLElement>("[data-fit]");
  const contentH = fit?.offsetHeight || height * 0.62;
  const inset = capInset(width, height, contentH);
  const photoRight = Math.max(12, Math.min(22, width * 0.04));
  const textBudget = Math.min(460, Math.max(168, width * 0.48));
  const padL = Math.min(width * 0.3, Math.max(24, inset + 12 + padBoost));
  const desiredPhoto = height * (0.4 + (PHOTO_RATIO - 0.4) * entered);
  const photoRoom = width - padL - photoRight - textBudget - 8;
  const photoSize = Math.max(40, Math.min(desiredPhoto, Math.max(40, height - 36), Math.max(40, photoRoom)));
  const padR = Math.min(photoSize + photoRight + 12, Math.max(56, width - padL - 140));
  const padY = width >= height ? 20 : Math.max(22, inset + 12);

  card.style.width = `${width}px`;
  card.style.height = `${height}px`;
  card.style.setProperty("--open", entered.toFixed(3));

  if (photo) {
    photo.style.width = `${photoSize}px`;
    photo.style.height = `${photoSize}px`;
    photo.style.right = `${photoRight}px`;
  }
  if (fit) fit.style.height = "auto";
  if (copy) {
    copy.style.flex = "none";
    copy.style.alignSelf = "center";
    copy.style.width = "100%";
    copy.style.height = "auto";
    copy.style.paddingTop = `${padY}px`;
    copy.style.paddingBottom = `${padY}px`;
    copy.style.paddingLeft = `${padL}px`;
    copy.style.paddingRight = `${padR}px`;
  }
};

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const slotRefs = useRef<(HTMLLIElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const openSize = useRef({ width: 0, height: 0, diameter: 0, padBoost: 0 });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let diameter = circleDiameter(window.innerWidth);

    const measure = () => {
      diameter = circleDiameter(window.innerWidth);
      const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
      const gutter = 20;
      const maxW = window.innerWidth - gutter * 2;
      let openH = diameter;
      let openW = Math.min(maxW, diameter * REFERENCE_RATIO);
      let padBoost = 0;

      for (let pass = 0; pass < 6; pass += 1) {
        let needed = diameter;
        for (const card of cards) {
          layoutCard(card, openW, Math.max(openH, diameter), 1, padBoost);
          const fit = card.querySelector<HTMLElement>("[data-fit]");
          needed = Math.max(needed, fit?.offsetHeight ?? 0);
        }
        const nextH = Math.max(diameter, Math.ceil(needed + 48));
        const nextW = Math.min(maxW, Math.max(diameter * REFERENCE_RATIO, nextH * REFERENCE_RATIO));
        for (const card of cards) layoutCard(card, nextW, nextH, 1, padBoost);
        const overflow = cards.some((card) => contentOutside(card));
        if (overflow) padBoost = Math.min(48, padBoost + 8);
        if (!overflow && Math.abs(nextH - openH) < 2 && Math.abs(nextW - openW) < 2) {
          openH = nextH;
          openW = nextW;
          break;
        }
        openH = nextH;
        openW = nextW;
      }

      openSize.current = { width: openW, height: openH, diameter, padBoost };
      for (const slot of slotRefs.current) {
        if (slot) slot.style.minHeight = `${openH}px`;
      }
      apply();
    };

    const apply = () => {
      const { width: openW, height: openH, diameter: size, padBoost } = openSize.current;
      const cards = cardRefs.current;

      for (let i = 0; i < cards.length; i += 1) {
        const card = cards[i];
        const slot = slotRefs.current[i];
        if (!card || !slot) continue;
        const top = slot.getBoundingClientRect().top;
        const entered = clamp((window.innerHeight - top) / (size * 1.5), 0, 1);
        const width = size + (openW - size) * entered;
        const height = size + (openH - size) * entered;
        layoutCard(card, width, height, entered, padBoost * entered);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const diameter = circleDiameter(typeof window === "undefined" ? 1200 : window.innerWidth);

  return (
    <section id="solutions" ref={sectionRef} className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Platform"
          title={
            <>
              What we are building for assets that already exist in <span className="text-gradient">the real world</span>
            </>
          }
          description="The company’s focus is its own RWA tokenization platform: contracts, identity, investor onboarding, and day-two operations. The platform is in development. An independent audit is commissioned when the threat model requires it."
        />
      </div>

      <ul className="mx-auto mt-14 flex w-full flex-col items-center gap-8 md:mt-20 md:gap-12">
        {services.map(({ title, desc, href, image }, i) => (
          <li
            key={title}
            ref={(node) => {
              slotRefs.current[i] = node;
            }}
            className="flex w-full items-center justify-center"
          >
            <div
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
              className="relative flex items-center overflow-hidden rounded-full border border-[hsl(18_58%_74%)] bg-card shadow-soft"
              style={{ width: diameter, height: diameter, ["--open" as string]: 0 }}
            >
            <div data-copy className="flex min-w-0 flex-1 flex-col justify-center">
              <div data-fit>
              <h3
                className="font-display font-bold leading-[1.08] tracking-tight text-foreground"
                style={{ fontSize: "calc(1rem + var(--open) * 0.65rem)" }}
              >
                {title}
              </h3>
              <p className="mt-2 text-xs leading-snug text-muted-foreground sm:text-sm">{desc}</p>
              <Link
                to={href}
                className="mt-3 inline-flex h-9 w-fit shrink-0 items-center whitespace-nowrap rounded-full border border-foreground/25 bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-foreground/45 hover:bg-secondary"
              >
                Learn more
              </Link>
              </div>
            </div>
            <div data-photo className="absolute top-1/2 grid -translate-y-1/2 place-items-center" aria-hidden="true">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 32% 28%, hsl(36 100% 64%) 0%, hsl(24 100% 54%) 38%, hsl(12 96% 50%) 68%, hsl(353 84% 44%) 100%)",
                }}
              />
              <img
                src={image}
                alt=""
                width={640}
                height={640}
                loading="lazy"
                className="relative h-[72%] w-[72%] -rotate-6 rounded-[1.15rem] object-cover shadow-[0_18px_36px_hsl(8_80%_18%/0.35)]"
              />
            </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
