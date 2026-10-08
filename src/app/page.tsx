import type { Metadata } from "next";
import HomeHero from "@/components/HomeHero";
import WhyCover from "@/components/WhyCover";
import SoftwareOverview from "@/components/SoftwareOverview";
import ServiceExperience from "@/components/ServiceExperience";
import ServiceTeam from "@/components/ServiceTeam";
import Testimonials from "@/components/Testimonials";
import StrategyCTA from "@/components/StrategyCTA";
import CustomerLogos from "@/components/CustomerLogos";
import { ProofBar } from "@/components/ui";

export const metadata: Metadata = { title: "Verlagssoftware und spezialisierte Services", description: "ERP, CRM und E-Commerce für Verlage. Die spezialisierten Teams von COVER unterstützen Sie bei Abonnements, Kundenservice, Buchhaltung und Marketing.", alternates: { canonical: "/" } };
export default function Home() {
  return <main id="main" lang="de" className="premium-home">
    <HomeHero />
    <ProofBar />
    <SoftwareOverview />
    <ServiceExperience />
    <ServiceTeam />
    <WhyCover />
    <Testimonials />
    <CustomerLogos />
    <StrategyCTA />
  </main>;
}
