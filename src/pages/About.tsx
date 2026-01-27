import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Team from "@/components/Team";
import TechSpecs from "@/components/TechSpecs";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        {/* Header Content */}
        <div className="relative z-10 container mx-auto px-6 text-center pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
              About <span className="text-gradient-eco">EcoTrack</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              An AI-driven face recognition and movement tracking system designed for sustainable campus monitoring. Combining cutting-edge technology with eco-friendly operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Specs Section */}
      <TechSpecs />

      {/* Team Section */}
      <Team />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default About;
