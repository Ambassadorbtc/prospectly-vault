
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { salesData, leads, dashboardStats } from "@/data/mockData";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Calendar, Download, Filter, Printer, RefreshCw } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SalesReports = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState("overview");
  
  // Get closed won deals
  const closedWonDeals = leads.filter(lead => lead.stage === "closed_won");
  const closedLostDeals = leads.filter(lead => lead.stage === "closed_lost");
  
  // Calculate total value by stage
  const valueByStage = leads.reduce((acc, lead) => {
    acc[lead.stage] = (acc[lead.stage] || 0) + lead.value;
    return acc;
  }, {} as Record<string, number>);

  // Format data for pie chart
  const pieData = [
    { name: "Closed Won", value: valueByStage["closed_won"] || 0 },
    { name: "Closing", value: valueByStage["closing"] || 0 },
    { name: "Chasing", value: valueByStage["chasing"] || 0 },
    { name: "Quote Requested", value: valueByStage["quote_requested"] || 0 },
    { name: "Contact Made", value: valueByStage["contact_made"] || 0 }
  ];
  
  const COLORS = ['#4CAF50', '#7E57C2', '#9575CD', '#7986CB', '#64B5F6'];

  return (
    <PageLayout title="Sales Reports">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 h-9">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {startDate ? format(startDate, "MMM d, yyyy") : "Start date"} 
                      {endDate ? ` - ${format(endDate, "MMM d, yyyy")}` : ""}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="px-3 pt-2">Start Date</Label>
                        <CalendarComponent
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </div>
                      <div>
                        <Label className="px-3 pt-2">End Date</Label>
                        <CalendarComponent
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 pb-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setStartDate(undefined);
                          setEndDate(undefined);
                        }}
                      >
                        Clear
                      </Button>
                      <Button size="sm">Apply</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Printer className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Download className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" className="h-9 w-9">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${dashboardStats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  From {closedWonDeals.length} closed deals
                </p>
                <div className="mt-4 flex items-center text-sm">
                  <div className={`mr-1 h-2 w-2 rounded-full bg-emerald-500`}></div>
                  <span className="text-muted-foreground">+14% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(dashboardStats.conversionRate * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Won {closedWonDeals.length} / Lost {closedLostDeals.length}
                </p>
                <div className="mt-4 flex items-center text-sm">
                  <div className={`mr-1 h-2 w-2 rounded-full bg-amber-500`}></div>
                  <span className="text-muted-foreground">-2.5% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Deal Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${dashboardStats.averageDealSize.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on {leads.length} total deals
                </p>
                <div className="mt-4 flex items-center text-sm">
                  <div className={`mr-1 h-2 w-2 rounded-full bg-emerald-500`}></div>
                  <span className="text-muted-foreground">+5.3% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Monthly revenue trend for the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={salesData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        name="Revenue"
                        stroke="#7E57C2" 
                        fill="#7E57C2" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Deal Distribution by Stage</CardTitle>
                <CardDescription>Value distribution across sales pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Value']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Comparison of closed deals by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Revenue" fill="#7E57C2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed breakdown of revenue sources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Revenue analysis content will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leads" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Lead Analytics</CardTitle>
              <CardDescription>Conversion rates and source analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Lead analytics content will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pipeline" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Analytics</CardTitle>
              <CardDescription>Stage-by-stage performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">
                Pipeline analytics content will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </PageLayout>
  );
};

export default SalesReports;
