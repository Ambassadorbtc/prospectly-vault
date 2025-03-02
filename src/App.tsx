
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Prospects from "./pages/Prospects";
import Companies from "./pages/Companies";
import Pipeline from "./pages/Pipeline";
import SalesReports from "./pages/SalesReports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SignOut from "./pages/SignOut";
import Search from "./pages/Search";
import AddLead from "./pages/AddLead";
import AddProspect from "./pages/AddProspect";
import AddCompany from "./pages/AddCompany";
import Campaigns from "./pages/Campaigns";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/prospects" element={<Prospects />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/sales-reports" element={<SalesReports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sign-out" element={<SignOut />} />
            <Route path="/search" element={<Search />} />
            <Route path="/add-lead" element={<AddLead />} />
            <Route path="/add-prospect" element={<AddProspect />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/campaigns" element={<Campaigns />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
