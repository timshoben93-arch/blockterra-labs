import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Models } from "@/components/site/Models";
import { Services } from "@/components/site/Services";
import { Industries } from "@/components/site/Industries";
import { Process } from "@/components/site/Process";
import { Partnerships } from "@/components/site/Partnerships";
import { Proof } from "@/components/site/Proof";
import { Insights } from "@/components/site/Insights";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  useEffect(() => {
    document.title = "TokenBrickLabs — RWA Research & Innovation";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Independent RWA research and innovation company helping financial institutions, asset owners and technology platforms advance tokenized real-world assets. Research. Connect. Build.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main">
        <Hero />
        <Models />
        <Services />
        <Industries />
        <Process />
        <Partnerships />
        <Proof />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
