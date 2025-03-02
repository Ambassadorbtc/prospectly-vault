
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AddCompany = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    website: "",
    industry: "",
    employees: "",
    revenue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Company added successfully!");
    // Reset form after submission
    setFormData({
      name: "",
      address: "",
      phone: "",
      website: "",
      industry: "",
      employees: "",
      revenue: "",
    });
  };

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Consulting",
    "Entertainment",
    "Real Estate",
    "Other"
  ];

  return (
    <PageLayout title="Add New Company">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">Company Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">Company Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Enter company name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  placeholder="Complete address" 
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  placeholder="e.g. (555) 123-4567" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  name="website" 
                  placeholder="https://example.com" 
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select 
                  value={formData.industry} 
                  onValueChange={(value) => handleSelectChange("industry", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <Input 
                  id="employees" 
                  name="employees" 
                  type="number" 
                  placeholder="e.g. 50" 
                  value={formData.employees}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="revenue">Annual Revenue ($)</Label>
                <Input 
                  id="revenue" 
                  name="revenue" 
                  type="number" 
                  placeholder="e.g. 1000000" 
                  value={formData.revenue}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit" className="bg-crm-purple-600 hover:bg-crm-purple-700">
                Add Company
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddCompany;
