import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Models } from "@/components/site/Models";
import { Industries } from "@/components/site/Industries";
import { Process } from "@/components/site/Process";
import { Proof } from "@/components/site/Proof";
import { Insights } from "@/components/site/Insights";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "TokenBrickLabs — RWA Tokenization & Blockchain Development";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Models />
        <Industries />
        <Process />
        <Proof />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
