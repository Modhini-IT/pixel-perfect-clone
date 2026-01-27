import { motion } from "framer-motion";

interface LogEntry {
  hour: string;
  count: number;
}

interface StudentLogsChartProps {
  data: LogEntry[];
}

const StudentLogsChart = ({ data }: StudentLogsChartProps) => {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Student Activity Logs</h3>
      <div className="space-y-3">
        {data.map((entry, index) => {
          const widthPercent = (entry.count / maxCount) * 100;
          
          return (
            <div key={index} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16 shrink-0">
                {entry.hour}
              </span>
              <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-foreground">
                  {entry.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentLogsChart;
