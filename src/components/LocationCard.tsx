import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface LocationCardProps {
  name: string;
  activeUsers: number;
  maxCapacity: number;
  icon?: React.ReactNode;
}

const LocationCard = ({ name, activeUsers, maxCapacity, icon }: LocationCardProps) => {
  const occupancyPercent = (activeUsers / maxCapacity) * 100;
  
  const getOccupancyColor = () => {
    if (occupancyPercent < 50) return "text-primary";
    if (occupancyPercent < 80) return "text-yellow-400";
    return "text-red-400";
  };

  const getOccupancyBg = () => {
    if (occupancyPercent < 50) return "bg-primary";
    if (occupancyPercent < 80) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <motion.div
      whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.07)" }}
      transition={{ duration: 0.3 }}
      className="bg-white/[0.03] p-6 rounded-2xl border border-white/[0.05] group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            {icon || <Users className="w-5 h-5" />}
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>
        <span className={`text-2xl font-bold ${getOccupancyColor()}`}>
          {activeUsers}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${occupancyPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${getOccupancyBg()}`}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Active Users</span>
          <span>{activeUsers}/{maxCapacity}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationCard;
