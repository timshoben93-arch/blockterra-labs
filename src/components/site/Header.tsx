import { ArrowRight, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import logo from "@/assets/header-logo.png";
import { SITE } from "@/lib/site";

const Logo = () => (
  <Link to="/" className="flex min-w-0 items-center gap-2.5">
    <img
      src={logo}
      alt=""
      width={40}
      height={40}
      className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
    />
    <div className="min-w-0 leading-tight">
      <div className="truncate font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
        {SITE.name}
      </div>
      <div className="hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
        {SITE.tagline}
      </div>
    </div>
  </Link>
);

const PAGE_LINKS = [
  { label: "About", to: "/company" },
  { label: "What We Do", to: "/#what-we-do" },
  { label: "Research", to: "/docs" },
  { label: "Talent", to: "/talents" },
];

const SECTION_LINKS = [
  { label: "Approach", href: "/#pillars" },
  { label: "Ecosystem", href: "/#ecosystem-video" },
  { label: "How We Work", href: "/#how-we-work" },
  { label: "Partnerships", href: "/#partnerships" },
  { label: "Contact", href: "/#contact" },
];

const navClass =
  "rounded-full px-2.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:bg-secondary hover:text-foreground xl:px-3.5";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full pt-3 sm:pt-4">
      <a href="#main" className="skip-link pointer-events-auto">
        Skip to content
      </a>
      <div className="container pointer-events-auto">
        <div className="flex h-14 min-w-0 items-center justify-between gap-2 rounded-full border border-border/80 bg-card/90 px-2.5 shadow-soft backdrop-blur-xl sm:h-16 sm:gap-3 sm:px-4">
          <Logo />
          <nav className="hidden min-w-0 items-center gap-0.5 xl:flex" aria-label="Primary">
            {SECTION_LINKS.map((item) => (
              <a key={item.label} href={item.href} className={navClass}>
                {item.label}
              </a>
            ))}
            {PAGE_LINKS.map((item) => {
              const isHash = item.to.includes("#");
              const active =
                !isHash &&
                (location.pathname === item.to || location.pathname.startsWith(`${item.to}/`));
              if (isHash) {
                return (
                  <a key={item.label} href={item.to} className={navClass}>
                    {item.label}
                  </a>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={`${navClass} aria-[current=page]:bg-secondary aria-[current=page]:text-foreground`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="hero" size="pill" className="group hidden sm:inline-flex" asChild>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
                Partner with us
                <ArrowRight className="ml-0.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full xl:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm rounded-l-3xl">
                <SheetTitle className="font-display text-left text-lg">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site pages and homepage sections</SheetDescription>
                <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                  {SECTION_LINKS.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-full px-3 py-3 text-base text-foreground/85 transition-colors hover:bg-secondary"
                    >
                      {item.label}
                    </a>
                  ))}
                  {PAGE_LINKS.map((item) =>
                    item.to.includes("#") ? (
                      <a
                        key={item.label}
                        href={item.to}
                        onClick={() => setOpen(false)}
                        className="rounded-full px-3 py-3 text-base text-foreground/85 transition-colors hover:bg-secondary"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="rounded-full px-3 py-3 text-base text-foreground/85 transition-colors hover:bg-secondary"
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                  <Button variant="hero" size="pill" className="mt-4" asChild>
                    <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
                      Partner with us
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
