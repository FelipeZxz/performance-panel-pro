import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

interface DataPoint {
  time: string;
  fps: number;
  cpu: number;
  gpu: number;
}

interface PerformanceMonitorProps {
  maxFPS: 60 | 120;
}

const generateRandomData = (baseTime: number, maxFPS: number): DataPoint => {
  const minutes = Math.floor(baseTime / 60);
  const seconds = baseTime % 60;
  const time = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  
  const fpsBase = maxFPS === 60 ? 45 : 90;
  const fpsVariation = maxFPS === 60 ? 15 : 30;
  
  return {
    time,
    fps: Math.min(maxFPS, Math.floor(fpsBase + Math.random() * fpsVariation)),
    cpu: Math.floor(35 + Math.random() * 25),
    gpu: Math.floor(40 + Math.random() * 35),
  };
};

export const PerformanceMonitor = ({ maxFPS }: PerformanceMonitorProps) => {
  const [data, setData] = useState<DataPoint[]>(() => {
    const initialData: DataPoint[] = [];
    for (let i = 0; i < 12; i++) {
      initialData.push(generateRandomData(1680 + i * 2, maxFPS));
    }
    return initialData;
  });

  const [baseTime, setBaseTime] = useState(1704);

  useEffect(() => {
    // Reset data when maxFPS changes
    const newData: DataPoint[] = [];
    for (let i = 0; i < 12; i++) {
      newData.push(generateRandomData(baseTime - 24 + i * 2, maxFPS));
    }
    setData(newData);
  }, [maxFPS]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1), generateRandomData(baseTime, maxFPS)];
        return newData;
      });
      setBaseTime((prev) => prev + 2);
    }, 1500);

    return () => clearInterval(interval);
  }, [baseTime, maxFPS]);

  const yAxisMax = maxFPS === 60 ? 80 : 140;
  const yAxisTicks = maxFPS === 60 ? [0, 20, 40, 60, 80] : [0, 30, 60, 90, 120, 140];

  return (
    <div
      className="card-gaming rounded-xl p-4 opacity-0 animate-slide-up"
      style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
    >

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="fpsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(35, 100%, 55%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(35, 100%, 55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(180, 70%, 50%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(180, 70%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gpuGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(140, 70%, 50%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(140, 70%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              stroke="hsl(0, 0%, 40%)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(0, 0%, 40%)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              domain={[0, yAxisMax]}
              ticks={yAxisTicks}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 10%)",
                border: "1px solid hsl(0, 0%, 25%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(0, 0%, 80%)" }}
            />
            <Area
              type="monotone"
              dataKey="fps"
              stroke="hsl(35, 100%, 55%)"
              strokeWidth={2}
              fill="url(#fpsGradient)"
              dot={false}
              animationDuration={300}
            />
            <Area
              type="monotone"
              dataKey="cpu"
              stroke="hsl(180, 70%, 50%)"
              strokeWidth={2}
              fill="url(#cpuGradient)"
              dot={false}
              animationDuration={300}
            />
            <Area
              type="monotone"
              dataKey="gpu"
              stroke="hsl(140, 70%, 50%)"
              strokeWidth={2}
              fill="url(#gpuGradient)"
              dot={false}
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-chart-fps" />
          <span className="text-xs text-muted-foreground">FPS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-chart-cpu" />
          <span className="text-xs text-muted-foreground">CPU %</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-chart-gpu" />
          <span className="text-xs text-muted-foreground">GPU %</span>
        </div>
      </div>
    </div>
  );
};
