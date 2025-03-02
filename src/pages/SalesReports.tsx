
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { dashboardStats, leads, salesData, stages } from "@/data/mockData";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Filter, Printer } from "lucide-react";

const SalesReports = () => {
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

  // Prepare data for the monthly performance chart
  const monthlyPerformance = [
    { month: 'Jan', closed: 45000, target: 40000 },
    { month: 'Feb', closed: 52000, target: 45000 },
    { month: 'Mar', closed: 49000, target: 50000 },
    { month: 'Apr', closed: 62000, target: 55000 },
    { month: 'May', closed: 55000, target: 60000 },
    { month: 'Jun', closed: 75000, target: 65000 },
  ];

  // Prepare data for the team performance chart
  const teamPerformance = [
    { name: 'John', value: 120000, deals: 12 },
    { name: 'Sarah', value: 95000, deals: 9 },
    { name: 'Michael', value: 85000, deals: 8 },
    { name: 'Emily', value: 110000, deals: 10 },
    { name: 'David', value: 75000, deals: 7 },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Sales Reports" />
      <main className="p-6">
        <div className="flex justify-between items-center mb-6 animate-on-load" style={{ "--anim-delay": 0 } as React.CSSProperties}>
          <h2 className="text-2xl font-bold">Sales Analytics</h2>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button size="sm" className="bg-crm-purple-600 hover:bg-crm-purple-700 flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="animate-on-load" style={{ "--anim-delay": 1 } as React.CSSProperties}>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue trend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <RevenueChart data={salesData} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="animate-on-load" style={{ "--anim-delay": 2 } as React.CSSProperties}>
                  <CardHeader>
                    <CardTitle>Sales by Stage</CardTitle>
                    <CardDescription>Current pipeline value distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-on-load" style={{ "--anim-delay": 3 } as React.CSSProperties}>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>Closed deals vs targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '0.5rem',
                            color: 'hsl(var(--card-foreground))'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="closed" name="Closed Revenue" fill="hsl(var(--primary))" />
                        <Bar dataKey="target" name="Target" fill="hsl(var(--muted-foreground))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-on-load" style={{ "--anim-delay": 4 } as React.CSSProperties}>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>Revenue by sales representative</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={teamPerformance}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis type="number" tickFormatter={(value) => `$${value / 1000}k`} />
                        <YAxis type="category" dataKey="name" width={80} />
                        <Tooltip 
                          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            borderColor: 'hsl(var(--border))',
                            borderRadius: '0.5rem',
                            color: 'hsl(var(--card-foreground))'
                          }}
                        />
                        <Bar dataKey="value" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>Detailed breakdown of sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Performance metrics coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="forecast">
            <Card>
              <CardHeader>
                <CardTitle>Sales Forecast</CardTitle>
                <CardDescription>Projected revenue for upcoming quarters</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Forecast data coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SalesReports;
