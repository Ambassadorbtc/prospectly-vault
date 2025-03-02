
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { leads } from "@/data/mockData";
import { Calendar, DollarSign, ExternalLink, Filter, MoreHorizontal, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lead } from "@/types";

const Leads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Leads" />
      <main className="p-6">
        <div className="flex items-center justify-between mb-6 animate-on-load" style={{ "--anim-delay": 0 } as React.CSSProperties}>
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leads..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="bg-crm-purple-600 hover:bg-crm-purple-700">Add New Lead</Button>
        </div>
        
        <div className="glass-card rounded-xl overflow-hidden animate-on-load" style={{ "--anim-delay": 1 } as React.CSSProperties}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Prospect ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Contact
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setSelectedLead(lead)}>
                    <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                      {lead.prospectId}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {lead.companyName}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-col">
                        <span>{lead.contactName}</span>
                        <span className="text-xs text-muted-foreground">{lead.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      ${lead.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === "lead"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                      }`}>
                        {lead.status === "lead" ? "Lead" : "Prospect"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {lead.lastContact
                        ? new Date(lead.lastContact).toLocaleDateString()
                        : "No contact"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                          <DropdownMenuItem>Convert to Customer</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLeads.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No leads found</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Lead Details Modal */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          
          {selectedLead && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <h3 className="text-xl font-semibold mb-4">{selectedLead.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedLead.contactName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">${selectedLead.value.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Last contact: {selectedLead.lastContact
                        ? new Date(selectedLead.lastContact).toLocaleDateString()
                        : "No contact"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={selectedLead.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline"
                    >
                      {selectedLead.website}
                    </a>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Notes</h4>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {selectedLead.notes.map((note) => (
                    <div key={note.id} className="bg-muted p-3 rounded-lg">
                      <p className="text-sm">{note.content}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Input placeholder="Add a note..." className="w-full" />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Leads;
