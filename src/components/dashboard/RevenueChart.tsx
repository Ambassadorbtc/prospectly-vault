
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SalesData } from "@/types";

interface RevenueChartProps {
  data: SalesData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const [activeTab, setActiveTab] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-on-load" style={{ "--anim-delay": 4 } as React.CSSProperties}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Revenue Overview</h3>
        <div className="flex space-x-1 bg-muted p-1 rounded-md">
          {[
            { id: "monthly", label: "Monthly" },
            { id: "quarterly", label: "Quarterly" },
            { id: "yearly", label: "Yearly" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs text-muted-foreground" 
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              className="text-xs text-muted-foreground" 
              tickFormatter={formatCurrency} 
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip 
              formatter={(value: number) => [`${formatCurrency(value)}`, 'Revenue']}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: '0.5rem',
                color: 'hsl(var(--card-foreground))'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
