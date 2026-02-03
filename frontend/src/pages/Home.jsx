import { Button } from "@/components/ui/button";
import { Benefits } from "../components/Benefits";
import { CTASection } from "../components/CTASection";
import Footer from "../components/Footer";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { TrustSection } from "../components/TrustSection";
import Loading from "./Loading";
export default function Home() {
  return (
    <div className=" bg-white font-sans text-gray-900">
      <main>
        <Hero />
        <HowItWorks />
        <TrustSection />
        <Benefits />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
