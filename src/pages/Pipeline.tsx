
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { KanbanBoard } from "@/components/pipeline/KanbanBoard";
import { leads, stages } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Filter, Plus, SlidersHorizontal } from "lucide-react";

const Pipeline = () => {
  const [filteredLeads, setFilteredLeads] = useState(leads);
  const [filterValue, setFilterValue] = useState("all");

  const handleFilterChange = (filter: string) => {
    setFilterValue(filter);
    if (filter === "all") {
      setFilteredLeads(leads);
    } else if (filter === "high-value") {
      setFilteredLeads(leads.filter(lead => lead.value > 10000));
    } else if (filter === "recent") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      setFilteredLeads(leads.filter(lead => {
        if (!lead.lastContact) return false;
        return new Date(lead.lastContact) > thirtyDaysAgo;
      }));
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Sales Pipeline" />
      <main className="p-6">
        <div className="flex justify-between items-center mb-6 animate-on-load" style={{ "--anim-delay": 0 } as React.CSSProperties}>
          <h2 className="text-2xl font-bold">Pipeline Overview</h2>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter: {filterValue === "all" ? "All Deals" : filterValue === "high-value" ? "High Value" : "Recent"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleFilterChange("all")}>
                  All Deals
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("high-value")}>
                  High Value (>$10k)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange("recent")}>
                  Recent Activity (30 days)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="bg-crm-purple-600 hover:bg-crm-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Deal
            </Button>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4 animate-on-load" style={{ "--anim-delay": 1 } as React.CSSProperties}>
          <KanbanBoard leads={filteredLeads} stages={stages} />
        </div>
      </main>
    </div>
  );
};

export default Pipeline;
