import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import WorkWithMaryam from "@/components/WorkWithMaryam";
import Cases from "@/components/Cases";
import Approach from "@/components/Approach";
import Manifest from "@/components/Manifest";
import ApplicationForm from "@/components/ApplicationForm";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Metrics />
      <WorkWithMaryam />
      <Cases />
      <Approach />
      <Manifest />
      <ApplicationForm />
      <CTA />
    </main>
  );
}