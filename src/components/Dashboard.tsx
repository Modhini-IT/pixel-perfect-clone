import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";

// Mock real-time attendance data
const generateAttendanceData = () => {
  const hours = ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  return hours.map((hour) => ({
    time: hour,
    present: Math.floor(Math.random() * 30) + 70,
    expected: 100,
  }));
};

// Zone occupancy data
const zoneData = [
  { name: "Lab A", occupancy: 85, capacity: 100, status: "high" },
  { name: "Lab B", occupancy: 45, capacity: 80, status: "medium" },
  { name: "Library", occupancy: 120, capacity: 150, status: "high" },
  { name: "Cafeteria", occupancy: 30, capacity: 200, status: "low" },
  { name: "Auditorium", occupancy: 0, capacity: 300, status: "empty" },
];

// Energy usage data
const energyData = [
  { name: "Mon", usage: 420, optimized: 380 },
  { name: "Tue", usage: 450, optimized: 390 },
  { name: "Wed", usage: 480, optimized: 410 },
  { name: "Thu", usage: 440, optimized: 370 },
  { name: "Fri", usage: 460, optimized: 400 },
  { name: "Sat", usage: 280, optimized: 250 },
  { name: "Sun", usage: 220, optimized: 200 },
];

// Pie chart data for energy distribution
const energyDistribution = [
  { name: "HVAC", value: 45, color: "hsl(155, 80%, 45%)" },
  { name: "Lighting", value: 25, color: "hsl(185, 80%, 50%)" },
  { name: "Equipment", value: 20, color: "hsl(270, 50%, 50%)" },
  { name: "Other", value: 10, color: "hsl(215, 20%, 45%)" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "high":
      return "bg-primary/20 text-primary border-primary/30";
    case "medium":
      return "bg-accent/20 text-accent border-accent/30";
    case "low":
      return "bg-secondary/20 text-secondary-foreground border-secondary/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const Dashboard = () => {
  const [attendanceData, setAttendanceData] = useState(generateAttendanceData());
  const [liveCount, setLiveCount] = useState(247);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAttendanceData(generateAttendanceData());
      setLiveCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalEnergySaved = energyData.reduce((acc, day) => acc + (day.usage - day.optimized), 0);

  return (
    <section id="dashboard" className="py-24 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-cosmic opacity-50" />
      <div className="absolute inset-0 stars opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/20 text-accent border-accent/30">
            Live Demo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real-Time <span className="text-gradient-eco">Dashboard</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the power of EcoTrack's intelligent monitoring system with live data visualization
          </p>
        </motion.div>

        {/* Stats Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="glass border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Live Attendance</p>
                  <motion.p
                    key={liveCount}
                    initial={{ scale: 1.2, color: "hsl(155, 80%, 45%)" }}
                    animate={{ scale: 1, color: "hsl(210, 40%, 98%)" }}
                    className="text-3xl font-bold"
                  >
                    {liveCount}
                  </motion.p>
                </div>
                <div className="p-3 rounded-xl bg-primary/20">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-primary mr-1" />
                <span className="text-primary">+12%</span>
                <span className="text-muted-foreground ml-1">from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Zones</p>
                  <p className="text-3xl font-bold">4/5</p>
                </div>
                <div className="p-3 rounded-xl bg-accent/20">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-muted-foreground">1 zone empty</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Energy Today</p>
                  <p className="text-3xl font-bold">380 kWh</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/20">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingDown className="w-4 h-4 text-primary mr-1" />
                <span className="text-primary">-18%</span>
                <span className="text-muted-foreground ml-1">optimized</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Weekly Savings</p>
                  <p className="text-3xl font-bold text-primary">{totalEnergySaved} kWh</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/20">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-muted-foreground">≈ $42 saved</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass border-border/50 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Attendance Tracking
                  <Badge variant="outline" className="ml-auto text-xs animate-pulse bg-primary/10 text-primary border-primary/30">
                    LIVE
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={attendanceData}>
                    <defs>
                      <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(155, 80%, 45%)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(155, 80%, 45%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 20%, 20%)" />
                    <XAxis dataKey="time" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(240, 25%, 10%)",
                        border: "1px solid hsl(240, 20%, 20%)",
                        borderRadius: "8px",
                        color: "hsl(210, 40%, 98%)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="present"
                      stroke="hsl(155, 80%, 45%)"
                      strokeWidth={2}
                      fill="url(#attendanceGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Energy Usage Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass border-border/50 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Energy Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 20%, 20%)" />
                    <XAxis dataKey="name" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(240, 25%, 10%)",
                        border: "1px solid hsl(240, 20%, 20%)",
                        borderRadius: "8px",
                        color: "hsl(210, 40%, 98%)",
                      }}
                    />
                    <Bar dataKey="usage" fill="hsl(215, 20%, 35%)" radius={[4, 4, 0, 0]} name="Before" />
                    <Bar dataKey="optimized" fill="hsl(155, 80%, 45%)" radius={[4, 4, 0, 0]} name="After EcoTrack" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row: Zone Tracking & Energy Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zone Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Zone Occupancy Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {zoneData.map((zone, index) => (
                    <motion.div
                      key={zone.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-24 text-sm font-medium">{zone.name}</div>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(zone.occupancy / zone.capacity) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full rounded-full ${
                            zone.status === "high"
                              ? "bg-primary"
                              : zone.status === "medium"
                              ? "bg-accent"
                              : zone.status === "empty"
                              ? "bg-muted-foreground/30"
                              : "bg-secondary"
                          }`}
                        />
                      </div>
                      <div className="w-20 text-right text-sm text-muted-foreground">
                        {zone.occupancy}/{zone.capacity}
                      </div>
                      <Badge className={`w-20 justify-center ${getStatusColor(zone.status)}`}>
                        {zone.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Energy Distribution Pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="glass border-border/50 h-full">
              <CardHeader>
                <CardTitle className="text-base">Energy Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={energyDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {energyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(240, 25%, 10%)",
                        border: "1px solid hsl(240, 20%, 20%)",
                        borderRadius: "8px",
                        color: "hsl(210, 40%, 98%)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  {energyDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="ml-auto font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
