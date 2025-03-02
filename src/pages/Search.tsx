
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { leads, companies } from "@/data/mockData";
import { Building, Calendar, ChevronRight, Clock, External, Filter, Mail, Phone, Search as SearchIcon, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.website.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate the number of results per tab
  const allResults = filteredLeads.length + filteredCompanies.length;
  const leadResults = filteredLeads.filter(lead => lead.status === "lead").length;
  const prospectResults = filteredLeads.filter(lead => lead.status === "prospect").length;
  const companyResults = filteredCompanies.length;

  return (
    <PageLayout title="Search">
      <div className="p-6">
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search leads, prospects, companies..."
              className="pl-12 h-14 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          
          {searchQuery && (
            <p className="mt-2 text-sm text-muted-foreground">
              {allResults} results found for "{searchQuery}"
            </p>
          )}
        </div>
        
        {searchQuery && (
          <div className="max-w-5xl mx-auto">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full md:w-auto grid grid-cols-4 md:grid-cols-4">
                <TabsTrigger value="all">
                  All
                  <Badge variant="outline" className="ml-2">{allResults}</Badge>
                </TabsTrigger>
                <TabsTrigger value="leads">
                  Leads
                  <Badge variant="outline" className="ml-2">{leadResults}</Badge>
                </TabsTrigger>
                <TabsTrigger value="prospects">
                  Prospects
                  <Badge variant="outline" className="ml-2">{prospectResults}</Badge>
                </TabsTrigger>
                <TabsTrigger value="companies">
                  Companies
                  <Badge variant="outline" className="ml-2">{companyResults}</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {allResults > 0 ? (
                  <div className="space-y-6 mt-6">
                    {filteredLeads.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">Leads & Prospects</h3>
                        <div className="space-y-3">
                          {filteredLeads.slice(0, 5).map((lead) => (
                            <div 
                              key={lead.id} 
                              className="glass-card p-4 rounded-lg flex justify-between hover:shadow-md transition-all"
                            >
                              <div>
                                <div className="flex items-center gap-3">
                                  <Badge variant={lead.status === "lead" ? "default" : "secondary"}>
                                    {lead.status === "lead" ? "Lead" : "Prospect"}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {lead.prospectId}
                                  </span>
                                </div>
                                
                                <h4 className="font-medium mt-1">{lead.name}</h4>
                                <div className="flex items-center gap-6 mt-1">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Building className="h-3.5 w-3.5" />
                                    <span>{lead.companyName}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <User className="h-3.5 w-3.5" />
                                    <span>{lead.contactName}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Mail className="h-3.5 w-3.5" />
                                    <span>{lead.email}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="text-right">
                                  <div className="font-medium">${lead.value.toLocaleString()}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Stage: {lead.stage.replace("_", " ")}
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="ml-2">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {filteredCompanies.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">Companies</h3>
                        <div className="space-y-3">
                          {filteredCompanies.slice(0, 5).map((company) => (
                            <div 
                              key={company.id} 
                              className="glass-card p-4 rounded-lg flex justify-between hover:shadow-md transition-all"
                            >
                              <div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline">
                                    {company.industry}
                                  </Badge>
                                </div>
                                
                                <h4 className="font-medium mt-1">{company.name}</h4>
                                <div className="flex items-center gap-6 mt-1">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Phone className="h-3.5 w-3.5" />
                                    <span>{company.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <External className="h-3.5 w-3.5" />
                                    <span>{company.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="text-right">
                                  <div className="font-medium">${company.revenue.toLocaleString()}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {company.employees} Employees
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="ml-2">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">No results found</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="leads">
                {leadResults > 0 ? (
                  <div className="space-y-3 mt-6">
                    {filteredLeads
                      .filter(lead => lead.status === "lead")
                      .map((lead) => (
                        <div 
                          key={lead.id} 
                          className="glass-card p-4 rounded-lg flex justify-between hover:shadow-md transition-all"
                        >
                          <div>
                            <div className="flex items-center gap-3">
                              <Badge>Lead</Badge>
                              <span className="text-sm text-muted-foreground">
                                {lead.prospectId}
                              </span>
                            </div>
                            
                            <h4 className="font-medium mt-1">{lead.name}</h4>
                            <div className="flex items-center gap-6 mt-1">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Building className="h-3.5 w-3.5" />
                                <span>{lead.companyName}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <User className="h-3.5 w-3.5" />
                                <span>{lead.contactName}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Mail className="h-3.5 w-3.5" />
                                <span>{lead.email}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="text-right">
                              <div className="font-medium">${lead.value.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Stage: {lead.stage.replace("_", " ")}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">No leads found</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="prospects">
                {prospectResults > 0 ? (
                  <div className="space-y-3 mt-6">
                    {filteredLeads
                      .filter(lead => lead.status === "prospect")
                      .map((prospect) => (
                        <div 
                          key={prospect.id} 
                          className="glass-card p-4 rounded-lg flex justify-between hover:shadow-md transition-all"
                        >
                          <div>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">Prospect</Badge>
                              <span className="text-sm text-muted-foreground">
                                {prospect.prospectId}
                              </span>
                            </div>
                            
                            <h4 className="font-medium mt-1">{prospect.name}</h4>
                            <div className="flex items-center gap-6 mt-1">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Building className="h-3.5 w-3.5" />
                                <span>{prospect.companyName}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <User className="h-3.5 w-3.5" />
                                <span>{prospect.contactName}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Mail className="h-3.5 w-3.5" />
                                <span>{prospect.email}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="text-right">
                              <div className="font-medium">${prospect.value.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Stage: {prospect.stage.replace("_", " ")}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-2">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">No prospects found</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="companies">
                {companyResults > 0 ? (
                  <div className="space-y-3 mt-6">
                    {filteredCompanies.map((company) => (
                      <div 
                        key={company.id} 
                        className="glass-card p-4 rounded-lg flex justify-between hover:shadow-md transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">
                              {company.industry}
                            </Badge>
                          </div>
                          
                          <h4 className="font-medium mt-1">{company.name}</h4>
                          <div className="flex items-center gap-6 mt-1">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3.5 w-3.5" />
                              <span>{company.phone}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <External className="h-3.5 w-3.5" />
                              <span>{company.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="text-right">
                            <div className="font-medium">${company.revenue.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {company.employees} Employees
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="ml-2">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">No companies found</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {!searchQuery && (
          <div className="max-w-xl mx-auto text-center mt-16">
            <Clock className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-medium mb-2">Recent Searches</h2>
            <p className="text-muted-foreground mb-8">
              Your recent searches will appear here. Try searching for a lead, prospect, or company.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("acme")}>
                acme
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("technology")}>
                technology
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("robert")}>
                robert
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("software")}>
                software
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("global")}>
                global
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Search;
