import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoIHelp from "@/components/WhoIHelp";
import SimpleManifest from "@/components/SimpleManifest";
import Cases from "@/components/Cases";
import MyApproach from "@/components/MyApproach";
import ApplicationForm from "@/components/ApplicationForm";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhoIHelp />
      <SimpleManifest />
      <Cases />
      <MyApproach />
      <ApplicationForm />
      <CTA />
    </main>
  );
}