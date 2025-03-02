
import { Header } from "@/components/layout/Header";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { KanbanBoard } from "@/components/pipeline/KanbanBoard";
import { dashboardStats, leads, salesData, stages } from "@/data/mockData";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";

const Dashboard = () => {
  // Prepare data for the sales by stage pie chart
  const salesByStage = stages
    .filter((stage) => stage.id !== "closed_lost")
    .map((stage) => {
      const stageLeads = leads.filter((lead) => lead.stage === stage.id);
      const value = stageLeads.reduce((sum, lead) => sum + lead.value, 0);
      return {
        name: stage.name,
        value,
        color: stage.color,
      };
    })
    .filter((item) => item.value > 0);

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Dashboard" />
      <main className="p-6">
        <DashboardStats stats={dashboardStats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RevenueChart data={salesData} />
          </div>
          
          <div className="glass-card rounded-xl p-6 animate-on-load" style={{ "--anim-delay": 5 } as React.CSSProperties}>
            <h3 className="text-lg font-semibold mb-4">Sales by Stage</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByStage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {salesByStage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))',
                      borderRadius: '0.5rem',
                      color: 'hsl(var(--card-foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <KanbanBoard leads={leads} stages={stages} />
      </main>
    </div>
  );
};

export default Dashboard;
