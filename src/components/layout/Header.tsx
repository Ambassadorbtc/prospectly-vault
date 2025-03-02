
import { Bell, Plus, Search, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <h1 className="text-2xl font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 bg-transparent"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-crm-purple-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4 font-medium">Notifications</div>
            <div className="p-4 text-sm text-muted-foreground">
              No new notifications.
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        
        <ThemeToggle />
        
        <div className="h-8 w-px bg-border mx-2"></div>
        
        <Button size="sm" className="gap-1 bg-crm-purple-600 hover:bg-crm-purple-700">
          <Plus className="h-4 w-4" />
          <span>Add Lead</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=7E57C2&color=fff"
                alt="John Doe"
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:inline-block">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
