import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Gauge,
  LogOut,
  Menu,
  MessageSquare,
  PanelRight,
  PieChart,
  Search,
  Settings,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarItems = [
    {
      path: "/dashboard",
      icon: Gauge,
      label: "Dashboard",
    },
    {
      path: "/leads",
      icon: Users,
      label: "Leads",
    },
    {
      path: "/prospects",
      icon: Target,
      label: "Prospects",
    },
    {
      path: "/companies",
      icon: Building2,
      label: "Companies",
    },
    {
      path: "/pipeline",
      icon: PanelRight,
      label: "Pipeline",
    },
    {
      path: "/sales-reports",
      icon: BarChart3,
      label: "Sales Reports",
    },
    {
      path: "/campaigns",
      icon: MessageSquare,
      label: "Campaigns",
    },
    {
      path: "/profile",
      icon: CreditCard,
      label: "Profile",
    },
    {
      path: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          className="absolute top-4 left-4 md:hidden z-50"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>

        <aside
          className={cn(
            "fixed left-0 top-0 z-40 h-full w-72 bg-background border-r border-r-muted p-4 transition-transform md:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Button
            variant="outline"
            className="absolute top-4 right-4 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <Menu className="w-5 h-5 rotate-90" />
          </Button>
          <div className="pb-4">
            <Link to="/" className="flex items-center gap-2 px-2">
              <PieChart className="h-6 w-6" />
              <span className="font-bold">ProspectlyVault CRM</span>
            </Link>
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                to={item.path}
                key={item.path}
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-2 text-sm font-medium hover:bg-secondary hover:text-foreground",
                  isActive(item.path)
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
          <div className="absolute bottom-4 left-4 flex w-full items-center justify-between border-t border-t-muted pt-4">
            <ThemeToggle />
            <Link
              to="/sign-out"
              className="group flex items-center rounded-md border border-transparent px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Link>
          </div>
        </aside>
      </>
    );
  }

  return (
    <aside className="hidden md:block">
      <div
        className={cn(
          "group/sidebar flex h-full w-64 flex-col fixed z-[99] bg-background border-r border-r-muted shadow-sm transition-all",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center gap-2 px-3 py-2">
          <Button variant="ghost" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
          <Link to="/" className="flex items-center gap-2 px-2">
            <PieChart className="h-6 w-6" />
            {!collapsed && <span className="font-bold">ProspectlyVault CRM</span>}
          </Link>
        </div>
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-2 text-sm font-medium hover:bg-secondary hover:text-foreground",
                isActive(item.path)
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 flex w-full items-center justify-between border-t border-t-muted pt-4">
          <ThemeToggle />
          <Link
            to="/sign-out"
            className="group flex items-center rounded-md border border-transparent px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </div>
    </aside>
  );
};
