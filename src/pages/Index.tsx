
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  Building2, 
  LineChart, 
  BriefcaseBusiness,
  ArrowRight,
  Check
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/90">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center text-center">
        <div className="animate-on-load" style={{"--anim-delay": 0} as any}>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-crm-purple-500 to-crm-blue-500 mb-4">
            ProspectlyVault CRM
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
            Manage your leads, prospects, and sales pipeline with our powerful and modern CRM solution
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 animate-on-load" style={{"--anim-delay": 1} as any}>
          <Button 
            size="lg" 
            className="bg-crm-purple-500 hover:bg-crm-purple-600 text-white"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/leads')}
          >
            View Leads
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <BriefcaseBusiness className="h-10 w-10 text-crm-purple-500" />,
              title: "Lead Management",
              description: "Track and manage leads throughout your sales pipeline with our intuitive drag-and-drop interface."
            },
            {
              icon: <Users className="h-10 w-10 text-crm-blue-500" />,
              title: "Prospect Tracking",
              description: "Automatically generate unique IDs for each prospect and convert them to leads with a single click."
            },
            {
              icon: <Building2 className="h-10 w-10 text-crm-teal-500" />,
              title: "Company Insights",
              description: "Group leads by company and visualize aggregate prospect value and closed revenue."
            },
            {
              icon: <LineChart className="h-10 w-10 text-crm-blue-500" />,
              title: "Revenue Reports",
              description: "Track closed deal values and potential revenue with interactive charts and visualizations."
            },
            {
              icon: <BarChart3 className="h-10 w-10 text-crm-purple-500" />,
              title: "Sales Analytics",
              description: "Gain insights into your sales performance with comprehensive analytics dashboards."
            },
            {
              icon: <Check className="h-10 w-10 text-crm-teal-500" />,
              title: "Task Management",
              description: "Schedule follow-ups and get reminders for specific leads, integrated with your calendar."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="stats-card flex flex-col items-center text-center p-6 animate-on-load"
              style={{"--anim-delay": index + 2} as any}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-crm-purple-900/20 to-crm-blue-900/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to boost your sales?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Get started with our comprehensive CRM solution and take your sales process to the next level.
          </p>
          <Button 
            size="lg" 
            className="bg-crm-purple-500 hover:bg-crm-purple-600 text-white"
            onClick={() => navigate('/dashboard')}
          >
            Explore the Dashboard
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-semibold text-xl">ProspectlyVault</h3>
            <p className="text-muted-foreground">Your modern CRM solution</p>
          </div>
          <div>
            <p className="text-muted-foreground">© 2023 ProspectlyVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
