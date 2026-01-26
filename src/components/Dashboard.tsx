import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const logs = [
  "> [13:04:02] User_1070 detected in Zone 1.",
  "> [SUCCESS]: Connection to Raspberry Pi 4 established.",
  "> [13:05:15] Eco-Alert: Zone 2 empty. Powering down lights.",
  "> [13:06:33] Movement detected. Updating Eco-Tags...",
  "> [13:08:12] Privacy Check: All data anonymized locally.",
  "> [SYSTEM]: Initializing face recognition...",
];

const Dashboard = () => {
  const [currentLog, setCurrentLog] = useState(0);
  const [carbonSaved, setCarbonSaved] = useState(12.4);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % logs.length);
    }, 4000);

    const carbonInterval = setInterval(() => {
      setCarbonSaved((prev) => Math.round((prev + Math.random() * 0.1) * 10) / 10);
    }, 5000);

    return () => {
      clearInterval(logInterval);
      clearInterval(carbonInterval);
    };
  }, []);

  return (
    <section id="dashboard" className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Forest background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/src/assets/hero-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

      {/* Main Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="glass rounded-[40px] p-12 md:p-14 border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              ECO<span className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]">TRACK</span>
            </h1>
            <div className="px-5 py-2 border border-primary rounded-full text-primary text-xs uppercase tracking-[2px] font-medium">
              Edge AI Processing Active
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <motion.div
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.07)" }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.03] p-8 rounded-3xl border border-white/[0.05]"
            >
              <p className="text-muted-foreground text-sm mb-2">AI Accuracy</p>
              <h2 className="text-4xl font-bold">98.7%</h2>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.07)" }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.03] p-8 rounded-3xl border border-white/[0.05]"
            >
              <p className="text-muted-foreground text-sm mb-2">Active Zone</p>
              <h2 className="text-4xl font-bold">Zone 01</h2>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.07)" }}
              transition={{ duration: 0.3 }}
              className="bg-white/[0.03] p-8 rounded-3xl border border-white/[0.05]"
            >
              <p className="text-muted-foreground text-sm mb-2">Carbon Saved</p>
              <motion.h2
                key={carbonSaved}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-primary"
              >
                {carbonSaved} kg
              </motion.h2>
            </motion.div>
          </div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-black/30 p-5 rounded-2xl font-mono text-sm text-primary overflow-hidden h-16 flex items-center"
          >
            <motion.span
              key={currentLog}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {logs[currentLog]}
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Dashboard;
