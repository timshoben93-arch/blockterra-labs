import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Models } from "@/components/site/Models";
import { Industries } from "@/components/site/Industries";
import { Process } from "@/components/site/Process";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />
      <main>
        <Hero />
        <Services />
        <Models />
        <Industries />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
