import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TALENTS } from "@/data/talents";
import logo from "@/assets/logo.png";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <img
      src={logo}
      alt="BlockTerraLab logo"
      className="h-10 w-10 rounded-xl shadow-soft object-contain"
    />
    <div className="leading-tight">
      <div className="font-display font-bold tracking-tight text-foreground">BlockTerraLab</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">RWA · Blockchain Lab</div>
    </div>
  </Link>
);

const NAV = [
  { label: "RWA", href: "/#rwa" },
  { label: "Industries", href: "/#industries" },
  { label: "Insights", href: "/#insights" },
];

const COMPANY_ITEMS: { label: string; desc: string; to: string; icon: React.ComponentType<{ className?: string }> }[] = [];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="container flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-secondary/70 transition-colors outline-none">
              Talent Recruitment
              <ChevronDown className="h-4 w-4 opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 max-h-[70vh] overflow-y-auto rounded-xl border-border/70 shadow-elevated">
              {TALENTS.map((t) => {
                const Icon = t.icon;
                return (
                  <DropdownMenuItem key={t.slug} asChild>
                    <Link
                      to={`/talents/${t.slug}`}
                      className="flex items-start gap-3 cursor-pointer py-2"
                    >
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{t.short}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">{t.tagline}</span>
                      </span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/company"
            className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-secondary/70 transition-colors"
          >
            Company
          </Link>
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
        <div className="flex items-center gap-2">
          <Button variant="hero" size="pill" className="group" asChild>
            <a href="https://calendly.com/blockterralab-support/30min" target="_blank" rel="noopener noreferrer">
              Let's Talk
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </header>
  );
};
