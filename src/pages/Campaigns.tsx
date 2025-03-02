
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { campaigns, leads } from "@/data/mockData";
import { Calendar as CalendarIcon, ChevronDown, FilterX, Mail, Megaphone, MoreHorizontal, Plus, Search, Target, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout title="Campaigns">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 animate-on-load" style={{ "--anim-delay": 0 } as React.CSSProperties}>
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <FilterX className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="bg-crm-purple-600 hover:bg-crm-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Campaign
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => {
            const campaignLeads = leads.filter(lead => campaign.leads.includes(lead.id));
            const totalValue = campaignLeads.reduce((sum, lead) => sum + lead.value, 0);
            const progress = Math.min(100, (totalValue / campaign.target) * 100);
            
            return (
              <div 
                key={campaign.id} 
                className="glass-card rounded-xl overflow-hidden animate-on-load hover:shadow-lg transition-all duration-300" 
                style={{ "--anim-delay": 1 } as React.CSSProperties}
              >
                <div className="p-5 border-b flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        campaign.status === "active" ? "default" :
                        campaign.status === "paused" ? "outline" :
                        campaign.status === "completed" ? "secondary" : "destructive"
                      }>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mt-1">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(campaign.startDate).toLocaleDateString()} - {campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : 'Ongoing'}
                    </p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Target: ${campaign.target.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{campaignLeads.length} Leads</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>${totalValue.toLocaleString()} / ${campaign.target.toLocaleString()}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Budget: ${campaign.budget.toLocaleString()}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ROI: {totalValue > 0 ? ((totalValue / campaign.budget) * 100).toFixed(0) : 0}%
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/30 flex justify-between items-center">
                  <Button size="sm" variant="outline" className="px-3">
                    <Megaphone className="h-4 w-4 mr-1" />
                    Send
                  </Button>
                  
                  <Button size="sm" className="bg-crm-purple-600 hover:bg-crm-purple-700 px-3">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
          
          {filteredCampaigns.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No campaigns found</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Campaigns;
