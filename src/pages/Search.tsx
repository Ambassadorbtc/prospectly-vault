import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, ExternalLink, FileText, Search as SearchIcon, User, Users } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      type: "lead",
      name: "John Doe",
      description: "Potential client interested in product demo",
    },
    {
      type: "company",
      name: "Acme Corp",
      description: "Major player in the industry",
    },
    {
      type: "user",
      name: "Jane Smith",
      description: "Sales representative",
    },
    {
      type: "document",
      name: "Sales Proposal",
      description: "Proposal for Acme Corp",
    },
  ]);

  const filteredResults = searchResults.filter((result) =>
    result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Search" />
      <main className="p-6">
        <div className="flex items-center justify-between mb-6 animate-on-load" style={{ "--anim-delay": 0 } as React.CSSProperties}>
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="relative w-full">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search anything..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>Search</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4">
            {filteredResults.map((result, index) => (
              <Card key={index} className="glass-card animate-on-load" style={{ "--anim-delay": 1 } as React.CSSProperties}>
                <CardContent className="flex items-center gap-4 p-4">
                  {result.type === "lead" && <User className="h-5 w-5 text-blue-500" />}
                  {result.type === "company" && <Building2 className="h-5 w-5 text-green-500" />}
                  {result.type === "user" && <Users className="h-5 w-5 text-orange-500" />}
                  {result.type === "document" && <FileText className="h-5 w-5 text-gray-500" />}
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{result.name}</h3>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    View <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {filteredResults.length === 0 && (
              <div className="py-6 text-center">
                <p className="text-muted-foreground">No results found</p>
              </div>
            )}
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Search;
