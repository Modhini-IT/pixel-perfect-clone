import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import TechSpecs from "@/components/TechSpecs";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Dashboard />
      <TechSpecs />
      <Team />
      <Footer />
    </main>
  );
};

export default Index;
