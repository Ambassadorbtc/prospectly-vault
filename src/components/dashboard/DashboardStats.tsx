
import { ArrowUp, ArrowDown, DollarSign, Users, Target, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardStats as DashboardStatsType } from "@/types";

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+12.5%",
      increasing: true,
      iconBg: "bg-crm-teal-500",
      animDelay: 0,
    },
    {
      title: "Potential Revenue",
      value: `$${stats.potentialRevenue.toLocaleString()}`,
      icon: Target,
      change: "+8.2%",
      increasing: true,
      iconBg: "bg-crm-purple-500",
      animDelay: 1,
    },
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      change: "+5.3%",
      increasing: true,
      iconBg: "bg-crm-blue-500",
      animDelay: 2,
    },
    {
      title: "Conversion Rate",
      value: `${(stats.conversionRate * 100).toFixed(1)}%`,
      icon: BarChart,
      change: "-2.1%",
      increasing: false,
      iconBg: "bg-amber-500",
      animDelay: 3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="stats-card animate-on-load hover:translate-y-[-5px]"
          style={{ "--anim-delay": stat.animDelay } as React.CSSProperties}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
            <div className={cn("p-2 rounded-full", stat.iconBg)}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className={cn(
              "flex items-center text-xs font-medium",
              stat.increasing ? "text-green-500" : "text-red-500"
            )}>
              {stat.increasing ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {stat.change}
            </div>
            <span className="text-xs text-muted-foreground ml-2">vs last period</span>
          </div>
        </div>
      ))}
    </div>
  );
}
