
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart4, Briefcase, Calendar, ChevronLeft, ChevronRight, 
  Home, LineChart, List, MessageSquare, PieChart, Users 
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigationItems = [
    { name: "Dashboard", icon: Home, link: "/" },
    { name: "Leads", icon: Users, link: "/leads" },
    { name: "Prospects", icon: List, link: "/prospects" },
    { name: "Companies", icon: Briefcase, link: "/companies" },
    { name: "Campaigns", icon: MessageSquare, link: "/campaigns" },
    { name: "Sales Reports", icon: BarChart4, link: "/sales-reports" },
    { name: "Calendar", icon: Calendar, link: "/calendar" },
    { name: "Pipeline", icon: PieChart, link: "/pipeline" },
    { name: "Analytics", icon: LineChart, link: "/analytics" },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-xl font-bold text-white">ProspectVault</div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.link}
            className={({ isActive }) =>
              cn(
                "sidebar-item",
                isActive && "active",
                collapsed && "justify-center"
              )
            }
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border text-sidebar-foreground text-xs">
        {!collapsed && <div>ProspectVault CRM © 2023</div>}
      </div>
    </aside>
  );
}
