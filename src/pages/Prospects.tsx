
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { leads } from "@/data/mockData";
import { Lead } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Plus, Check, User, Phone, Mail, Globe, Building } from "lucide-react";

const Prospects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter only prospects
  const prospects = leads.filter(lead => lead.status === "prospect");
  
  const filteredProspects = prospects.filter(prospect => 
    prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prospect.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prospect.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Prospects" />
      <main className="p-6">
        <div className="flex justify-between items-center mb-6 animate-on-load" style={{ "--anim-delay": 0 } as React.CSSProperties}>
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search prospects..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="bg-crm-purple-600 hover:bg-crm-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Prospect
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProspects.map((prospect) => (
            <ProspectCard key={prospect.id} prospect={prospect} />
          ))}
          
          {filteredProspects.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No prospects found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

interface ProspectCardProps {
  prospect: Lead;
}

const ProspectCard = ({ prospect }: ProspectCardProps) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden animate-on-load hover:shadow-lg transition-all duration-300" style={{ "--anim-delay": 1 } as React.CSSProperties}>
      <div className="p-5 border-b">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                {prospect.prospectId}
              </span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                Prospect
              </span>
            </div>
            <h3 className="text-lg font-semibold mt-1">{prospect.name}</h3>
            <p className="text-sm text-muted-foreground">{prospect.companyName}</p>
          </div>
          <div className="text-lg font-semibold text-crm-blue-600">
            ${prospect.value.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{prospect.contactName}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a href={`mailto:${prospect.email}`} className="text-sm text-primary hover:underline">
            {prospect.email}
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <a href={`tel:${prospect.phone}`} className="text-sm">
            {prospect.phone}
          </a>
        </div>
        
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground truncate max-w-[200px]">
            {prospect.address}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <a 
            href={prospect.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-primary hover:underline"
          >
            {prospect.website.replace(/^https?:\/\/(www\.)?/, '')}
          </a>
        </div>
      </div>
      
      <div className="p-4 bg-muted/30 flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          {prospect.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-background text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Button size="sm" className="bg-green-600 hover:bg-green-700 px-3">
          <Check className="h-4 w-4 mr-1" />
          Convert
        </Button>
      </div>
    </div>
  );
};

export default Prospects;
