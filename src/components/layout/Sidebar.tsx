
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Building,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  ClipboardList,
  Cog,
  GitBranch,
  Home,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMobileDetector } from "@/hooks/use-mobile";

interface SidebarLink {
  title: string;
  icon: React.ElementType;
  path: string;
  isActive?: boolean;
}

interface SidebarGroup {
  title: string;
  links: SidebarLink[];
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMobileDetector();
  
  // Don't show sidebar if on mobile and collapsed
  if (isMobile && collapsed) {
    return null;
  }

  const sidebarGroups: SidebarGroup[] = [
    {
      title: "Main",
      links: [
        { title: "Home", icon: Home, path: "/" },
        { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { title: "Pipeline", icon: GitBranch, path: "/pipeline" },
        { title: "Calendar", icon: Calendar, path: "/calendar" },
      ],
    },
    {
      title: "CRM",
      links: [
        { title: "Leads", icon: User, path: "/leads" },
        { title: "Prospects", icon: Users, path: "/prospects" },
        { title: "Companies", icon: Building, path: "/companies" },
        { title: "Campaigns", icon: Megaphone, path: "/campaigns" },
        { title: "Sales Reports", icon: BarChart3, path: "/sales-reports" },
      ],
    },
    {
      title: "Actions",
      links: [
        { title: "Add Lead", icon: CirclePlus, path: "/add-lead" },
        { title: "Add Prospect", icon: CirclePlus, path: "/add-prospect" },
        { title: "Add Company", icon: CirclePlus, path: "/add-company" },
        { title: "Search", icon: Search, path: "/search" },
      ],
    },
    {
      title: "Account",
      links: [
        { title: "Profile", icon: User, path: "/profile" },
        { title: "Settings", icon: Cog, path: "/settings" },
        { title: "Sign Out", icon: LogOut, path: "/sign-out" },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-muted/30 backdrop-blur-sm border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex justify-between items-center border-b">
        {!collapsed && (
          <div className="font-semibold text-lg">
            <span className="text-crm-purple-600">Lead</span>
            <span>Manager</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {sidebarGroups.map((group) => (
          <div key={group.title} className="mb-4">
            {!collapsed && (
              <h3 className="ml-4 mb-1 mt-3 text-xs font-medium text-muted-foreground">
                {group.title}
              </h3>
            )}
            <ul>
              {group.links.map((link) => (
                <li key={link.title}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                        isActive && "bg-muted/60 text-foreground font-medium",
                        collapsed && "justify-center"
                      )
                    }
                  >
                    <link.icon className="h-5 w-5" />
                    {!collapsed && <span>{link.title}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full",
            collapsed && "p-0 w-8 h-8 justify-center"
          )}
        >
          <Settings className="h-4 w-4 mr-2" />
          {!collapsed && <span>Settings</span>}
        </Button>
      </div>
    </div>
  );
}
