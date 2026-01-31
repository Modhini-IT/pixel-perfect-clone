import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, TrendingUp, TrendingDown, DollarSign, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const energyData = [
  { time: "8AM", consumption: 120, occupancy: 45 },
  { time: "9AM", consumption: 180, occupancy: 78 },
  { time: "10AM", consumption: 220, occupancy: 92 },
  { time: "11AM", consumption: 280, occupancy: 120 },
  { time: "12PM", consumption: 200, occupancy: 85 },
  { time: "1PM", consumption: 160, occupancy: 65 },
  { time: "2PM", consumption: 240, occupancy: 98 },
  { time: "3PM", consumption: 260, occupancy: 110 },
  { time: "4PM", consumption: 190, occupancy: 72 },
  { time: "5PM", consumption: 140, occupancy: 50 },
];

const efficiencyData = [
  { day: "Mon", efficiency: 78 },
  { day: "Tue", efficiency: 82 },
  { day: "Wed", efficiency: 85 },
  { day: "Thu", efficiency: 79 },
  { day: "Fri", efficiency: 88 },
  { day: "Sat", efficiency: 92 },
  { day: "Sun", efficiency: 90 },
];

const stats = [
  {
    label: "Total Energy Saved",
    value: "1,245 kWh",
    change: "+12%",
    changeLabel: "vs last week",
    positive: true,
    icon: <Zap className="w-5 h-5" />,
  },
  {
    label: "Avg. Daily Occupancy",
    value: "854",
    change: "+5%",
    changeLabel: "vs last week",
    positive: true,
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: "Carbon Footprint",
    value: "-450 kg",
    change: "-8%",
    changeLabel: "vs last week",
    positive: true,
    icon: <TrendingDown className="w-5 h-5" />,
  },
  {
    label: "Cost Efficiency",
    value: "$3,400",
    change: "+15%",
    changeLabel: "vs last week",
    positive: true,
    icon: <DollarSign className="w-5 h-5" />,
  },
];

const AnalyticsPage = () => {
  const navigate = useNavigate();

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
      <div className="relative z-10 container mx-auto px-6 py-8 pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
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

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Analytics & Insights</h2>
          <p className="text-muted-foreground">Detailed breakdown of energy efficiency and campus usage</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.07)" }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-primary">{stat.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
              <span className={`text-sm ${stat.positive ? 'text-primary' : 'text-red-400'}`}>
                {stat.change}{stat.changeLabel}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Energy Consumption vs Occupancy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-3xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-6">Energy Consumption vs Occupancy</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="time" 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                    name="Energy (kWh)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="occupancy" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2 }}
                    name="Occupancy"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Energy Efficiency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-3xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-6">Energy Efficiency (%)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: 'white' }}
                  />
                  <defs>
                    <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#efficiencyGradient)"
                    name="Efficiency %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPage;
