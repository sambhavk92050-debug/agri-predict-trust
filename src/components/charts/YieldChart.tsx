import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface YieldChartProps {
  data: Array<{
    month: string;
    yield: number;
    predicted: number;
  }>;
}

export const YieldChart: React.FC<YieldChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis 
          dataKey="month" 
          className="text-muted-foreground text-xs"
        />
        <YAxis 
          className="text-muted-foreground text-xs"
          label={{ value: 'Yield (quintals/acre)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="yield"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          name="Actual Yield"
        />
        <Line
          type="monotone"
          dataKey="predicted"
          stroke="hsl(var(--primary-glow))"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: 'hsl(var(--primary-glow))', strokeWidth: 2, r: 4 }}
          name="AI Predicted"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};