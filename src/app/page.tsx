import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoIHelp from "@/components/WhoIHelp";
import Manifest from "@/components/Manifest";
import Cases from "@/components/Cases";
import MyApproach from "@/components/MyApproach";
import ApplicationForm from "@/components/ApplicationForm";
import CTA from "@/components/CTA";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhoIHelp />
      <Manifest />
      <Cases />
      <MyApproach />
      <ApplicationForm />
      <CTA />
      <ScrollToTop />
    </main>
  );
}