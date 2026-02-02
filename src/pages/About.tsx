import { motion } from "framer-motion";
import { ArrowLeft, Zap, Shield, Users, Leaf, Cpu, ScanFace } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Team from "@/components/Team";
import TechSpecs from "@/components/TechSpecs";
import Footer from "@/components/Footer";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
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

      {/* ScrollStack Feature Cards */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 gradient-cosmic opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Key <span className="text-gradient-eco">Features</span>
            </h2>
          </motion.div>

          <ScrollStack className="max-w-3xl mx-auto">
            <ScrollStackItem>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <ScanFace className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    AI-Powered Face Recognition
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced machine learning algorithms for accurate identification with 99.5% accuracy rate. Works in various lighting conditions and angles.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Edge Computing
                  </h3>
                  <p className="text-muted-foreground">
                    Process data locally on edge devices to minimize latency, reduce bandwidth usage, and ensure privacy. No cloud dependency for critical operations.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Eco-Friendly Operations
                  </h3>
                  <p className="text-muted-foreground">
                    Solar-powered camera units with intelligent power management. Carbon-neutral infrastructure with optimized energy consumption.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Privacy-First Design
                  </h3>
                  <p className="text-muted-foreground">
                    All biometric data is anonymized and encrypted. GDPR-compliant with full user consent management and data portability.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Scalable Infrastructure
                  </h3>
                  <p className="text-muted-foreground">
                    Support for 10,000+ concurrent users with horizontal scaling. Microservices architecture ensures reliability and easy updates.
                  </p>
                </div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Real-Time Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Instant insights and reporting with live dashboards. Track attendance, movement patterns, and energy usage in real-time.
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
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
