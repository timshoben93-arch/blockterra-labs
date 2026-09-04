import { ArrowRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 group min-w-0">
    <img
      src={logo}
      alt="TokenBrickLabs logo"
      className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl shadow-soft object-contain shrink-0"
    />
    <div className="leading-tight min-w-0">
      <div className="font-display font-bold tracking-tight text-foreground text-sm sm:text-base truncate">TokenBrickLabs</div>
      <div className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">RWA · Blockchain Lab</div>
    </div>
  </Link>
);


const NAV = [
  { label: "RWA", href: "/#rwa" },
  { label: "Industries", href: "/#industries" },
  { label: "Insights", href: "/#insights" },
];

const COMPANY_ITEMS: { label: string; desc: string; to: string; icon: React.ComponentType<{ className?: string }> }[] = [];

const LINKS = [
  { label: "Talent Recruitment", to: "/talents" },
  { label: "Company", to: "/company" },
  { label: "Docs", to: "/docs" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="container flex h-16 sm:h-20 items-center justify-between gap-3">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-secondary/70 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-secondary/70 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="hero" size="pill" className="group hidden sm:inline-flex" asChild>
            <a href="https://calendly.com/tokenbricklabs-support/30min" target="_blank" rel="noopener noreferrer">
              Let's Talk
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <nav className="mt-10 flex flex-col gap-1">
                {LINKS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground/85 hover:bg-secondary/70 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                {NAV.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground/85 hover:bg-secondary/70 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <Button variant="hero" size="pill" className="mt-4" asChild>
                  <a href="https://calendly.com/tokenbricklabs-support/30min" target="_blank" rel="noopener noreferrer">
                    Let's Talk
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
};
