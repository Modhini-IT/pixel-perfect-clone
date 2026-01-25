import { motion } from "framer-motion";
import { Zap, Shield, Users, DollarSign } from "lucide-react";

const specs = [
  {
    icon: Zap,
    label: "Energy Efficiency",
    value: "≥95%",
    description: "Low-power accuracy with solar-powered options",
  },
  {
    icon: Shield,
    label: "Privacy",
    value: "Anonymized",
    description: "Data storage with opt-in user consent",
  },
  {
    icon: Users,
    label: "Scalability",
    value: "10K+",
    description: "Users supported on cloud infrastructure",
  },
  {
    icon: DollarSign,
    label: "Cost Effective",
    value: "$500/unit",
    description: "Manufacturing cost with 2-year ROI",
  },
];

const TechSpecs = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient-eco">Specifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for performance, privacy, and sustainability
          </p>
        </motion.div>

        {/* Specs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-strong rounded-2xl p-8 text-center h-full transition-all duration-500 hover:border-primary/50 hover:scale-105">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 group-hover:glow-primary transition-all duration-500">
                  <spec.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Value */}
                <div className="text-4xl font-display font-bold text-gradient-eco mb-2">
                  {spec.value}
                </div>

                {/* Label */}
                <div className="text-lg font-semibold text-foreground mb-2">
                  {spec.label}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {spec.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
