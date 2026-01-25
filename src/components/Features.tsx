import { motion } from "framer-motion";
import { ScanFace, MapPin, Cpu, LayoutDashboard, Lightbulb } from "lucide-react";

const features = [
  {
    icon: ScanFace,
    title: "Face Detection & Attendance",
    description: "Cameras capture faces at entry points and AI marks attendance automatically.",
    step: "01",
  },
  {
    icon: MapPin,
    title: "Movement Tracking",
    description: "Identified users are tracked across zones using virtual Eco Tags.",
    step: "02",
  },
  {
    icon: Cpu,
    title: "Edge Processing",
    description: "Data is processed locally to ensure privacy and low power usage.",
    step: "03",
  },
  {
    icon: LayoutDashboard,
    title: "Central Dashboard",
    description: "Attendance, movement, and energy data are shown on a green dashboard.",
    step: "04",
  },
  {
    icon: Lightbulb,
    title: "Energy Optimization",
    description: "System sends eco alerts and helps switch off power in empty rooms.",
    step: "05",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Features = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-cosmic opacity-50" />
      <div className="absolute inset-0 stars opacity-30" />

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
            How It <span className="text-gradient-eco">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A seamless workflow from detection to optimization
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass rounded-2xl p-8 h-full transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-6xl font-display font-bold text-muted/30 group-hover:text-primary/20 transition-colors">
                  {feature.step}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 group-hover:glow-primary transition-all duration-500">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
