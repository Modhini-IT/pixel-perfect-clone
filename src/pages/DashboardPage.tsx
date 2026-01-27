import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Dumbbell, Building2, Coffee, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationCard from "@/components/LocationCard";
import StudentLogsChart from "@/components/StudentLogsChart";
import heroBg from "@/assets/hero-bg.jpg";

const locations = [
  { name: "Library", icon: <BookOpen className="w-5 h-5" />, activeUsers: 45, maxCapacity: 100 },
  { name: "MPH", icon: <Dumbbell className="w-5 h-5" />, activeUsers: 78, maxCapacity: 150 },
  { name: "Classroom Block 1", icon: <Building2 className="w-5 h-5" />, activeUsers: 120, maxCapacity: 200 },
  { name: "Classroom Block 2", icon: <Building2 className="w-5 h-5" />, activeUsers: 95, maxCapacity: 200 },
  { name: "Classroom Block 3", icon: <Building2 className="w-5 h-5" />, activeUsers: 88, maxCapacity: 200 },
  { name: "Classroom Block 4", icon: <Building2 className="w-5 h-5" />, activeUsers: 156, maxCapacity: 200 },
  { name: "Classroom Block 5", icon: <Building2 className="w-5 h-5" />, activeUsers: 62, maxCapacity: 200 },
  { name: "Cafeteria", icon: <Coffee className="w-5 h-5" />, activeUsers: 34, maxCapacity: 80 },
];

const studentLogs = [
  { hour: "8:00 AM", count: 120 },
  { hour: "9:00 AM", count: 280 },
  { hour: "10:00 AM", count: 450 },
  { hour: "11:00 AM", count: 520 },
  { hour: "12:00 PM", count: 380 },
  { hour: "1:00 PM", count: 290 },
  { hour: "2:00 PM", count: 410 },
  { hour: "3:00 PM", count: 480 },
  { hour: "4:00 PM", count: 350 },
  { hour: "5:00 PM", count: 180 },
];

const logs = [
  "> [13:04:02] User_1070 detected in Library.",
  "> [SUCCESS]: Connection to Raspberry Pi 4 established.",
  "> [13:05:15] Eco-Alert: Block 3 empty. Powering down lights.",
  "> [13:06:33] Movement detected in Cafeteria. Updating Eco-Tags...",
  "> [13:08:12] Privacy Check: All data anonymized locally.",
  "> [SYSTEM]: Face recognition accuracy: 98.7%",
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [currentLog, setCurrentLog] = useState(0);
  const [carbonSaved, setCarbonSaved] = useState(12.4);
  const [totalActive, setTotalActive] = useState(0);

  useEffect(() => {
    // Calculate total active users
    const total = locations.reduce((sum, loc) => sum + loc.activeUsers, 0);
    setTotalActive(total);

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

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              ECO<span className="text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]">TRACK</span>
            </h1>
          </div>
          <Button variant="glass" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="glass rounded-2xl p-6 border border-white/10">
            <p className="text-muted-foreground text-sm mb-1">Total Active Users</p>
            <h2 className="text-3xl font-bold text-primary">{totalActive}</h2>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <p className="text-muted-foreground text-sm mb-1">AI Accuracy</p>
            <h2 className="text-3xl font-bold">98.7%</h2>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <p className="text-muted-foreground text-sm mb-1">Carbon Saved</p>
            <motion.h2
              key={carbonSaved}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-primary"
            >
              {carbonSaved} kg
            </motion.h2>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Location Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-3xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold mb-6">Campus Locations</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {locations.map((location, index) => (
                  <LocationCard
                    key={index}
                    name={location.name}
                    activeUsers={location.activeUsers}
                    maxCapacity={location.maxCapacity}
                    icon={location.icon}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Student Logs Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass rounded-3xl p-6 border border-white/10 h-full">
              <StudentLogsChart data={studentLogs} />
            </div>
          </motion.div>
        </div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="glass rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-muted-foreground">system_log.sh</span>
            </div>
            <div className="font-mono text-sm text-primary h-8 flex items-center overflow-hidden">
              <motion.span
                key={currentLog}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {logs[currentLog]}
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPage;
