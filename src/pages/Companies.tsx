
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { companies, getLeadsByCompany } from "@/data/mockData";
import { Building, ChevronDown, ExternalLink, Filter, Plus, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Companies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleOpen = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Companies" />
      <main className="p-6">
        <div className="flex justify-between items-center mb-6 animate-on-load" style={{ "--anim-delay": 0 } as React.CSSProperties}>
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search companies..."
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
            Add Company
          </Button>
        </div>
        
        <div className="space-y-4">
          {filteredCompanies.map((company) => {
            const companyLeads = getLeadsByCompany(company.id);
            const totalValue = companyLeads.reduce((sum, lead) => sum + lead.value, 0);
            const isOpen = openItems[company.id] || false;
            
            return (
              <Collapsible
                key={company.id}
                open={isOpen}
                onOpenChange={() => toggleOpen(company.id)}
                className="glass-card rounded-xl overflow-hidden animate-on-load transition-all duration-300"
                style={{ "--anim-delay": 1 } as React.CSSProperties}
              >
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold">{company.name}</h3>
                      <span className="px-2 py-0.5 rounded-md bg-muted text-xs">
                        {company.industry}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Revenue: ${company.revenue.toLocaleString()}</span>
                      <span>Employees: {company.employees}</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {companyLeads.length} Leads
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">Total Lead Value</div>
                      <div className="text-lg font-bold text-crm-teal-600">
                        ${totalValue.toLocaleString()}
                      </div>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                
                <CollapsibleContent>
                  <div className="px-5 pb-5 pt-2 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Company Details</h4>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary flex items-center gap-1 hover:underline"
                      >
                        {company.website.replace(/^https?:\/\/(www\.)?/, '')}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Address</div>
                        <div className="text-sm">{company.address}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Contact</div>
                        <div className="text-sm">{company.phone}</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Associated Leads</h4>
                      {companyLeads.length > 0 ? (
                        <div className="bg-muted/30 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Contact</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground">Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {companyLeads.map((lead) => (
                                <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/20">
                                  <td className="px-4 py-3">{lead.name}</td>
                                  <td className="px-4 py-3 text-sm">{lead.contactName}</td>
                                  <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                                      lead.status === "lead"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                    }`}>
                                      {lead.status === "lead" ? "Lead" : "Prospect"}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-right font-medium">
                                    ${lead.value.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-4 text-sm text-muted-foreground">
                          No leads associated with this company
                        </div>
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
          
          {filteredCompanies.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No companies found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Companies;
