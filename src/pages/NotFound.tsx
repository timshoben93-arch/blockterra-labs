import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found | TokenBrickLabs";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="container flex min-h-[60vh] flex-col justify-center py-20">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">This page is not on the map</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          The URL does not match a service, chapter, or studio page. Head home or open the docs index.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium">
          <Link to="/" className="text-primary underline-offset-4 hover:underline">
            Home
          </Link>
          <Link to="/docs" className="text-primary underline-offset-4 hover:underline">
            Docs
          </Link>
          <Link to="/company" className="text-primary underline-offset-4 hover:underline">
            Company
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
