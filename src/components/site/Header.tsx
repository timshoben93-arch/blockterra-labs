import { ArrowRight, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { SITE } from "@/lib/site";

const Logo = () => (
  <Link to="/" className="flex min-w-0 items-center gap-2.5">
    <img
      src={logo}
      alt=""
      width={40}
      height={40}
      className="h-9 w-9 shrink-0 rounded-[10px] object-cover sm:h-10 sm:w-10 sm:rounded-xl"
    />
    <div className="min-w-0 leading-tight">
      <div className="truncate font-display text-sm font-semibold tracking-tight text-foreground sm:text-base">
        {SITE.name}
      </div>
      <div className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
        {SITE.tagline}
      </div>
    </div>
  </Link>
);

const PAGE_LINKS = [
  { label: "Company", to: "/company" },
  { label: "Talent", to: "/talents" },
  { label: "Docs", to: "/docs" },
];

const SECTION_LINKS = [
  { label: "Services", href: "/#solutions" },
  { label: "RWA", href: "/#rwa" },
  { label: "Industries", href: "/#industries" },
  { label: "Insights", href: "/#insights" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/92 backdrop-blur-md">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between gap-3 sm:h-[4.25rem]">
        <Logo />
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {SECTION_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          {PAGE_LINKS.map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.label}
                to={item.to}
                aria-current={active ? "page" : undefined}
                className="rounded-md px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground aria-[current=page]:text-foreground"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="hero" size="pill" className="group hidden sm:inline-flex" asChild>
            <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
              Book a call
              <ArrowRight className="ml-0.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <SheetTitle className="font-display text-left text-lg">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Studio pages and homepage sections
              </SheetDescription>
              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {SECTION_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base text-foreground/85 transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </a>
                ))}
                {PAGE_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base text-foreground/85 transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button variant="hero" size="pill" className="mt-4" asChild>
                  <a href={SITE.calendly} target="_blank" rel="noopener noreferrer">
                    Book a call
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
