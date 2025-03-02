
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stages } from "@/data/mockData";
import { toast } from "sonner";

const AddLead = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    website: "",
    value: "",
    stage: "contact_made",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Lead added successfully!");
    // Reset form after submission
    setFormData({
      name: "",
      contactName: "",
      email: "",
      phone: "",
      address: "",
      companyName: "",
      website: "",
      value: "",
      stage: "contact_made",
      notes: "",
    });
  };

  return (
    <PageLayout title="Add New Lead">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-6">Lead Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Lead Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Enter lead name or project title" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Person</Label>
                <Input 
                  id="contactName" 
                  name="contactName" 
                  placeholder="Enter contact person's name" 
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="email@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  name="companyName" 
                  placeholder="Enter company name" 
                  value={formData.companyName}
                  onChange={handleChange}
                  required
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
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  placeholder="Enter address" 
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="value">Deal Value ($)</Label>
                <Input 
                  id="value" 
                  name="value" 
                  type="number" 
                  placeholder="e.g. 5000" 
                  value={formData.value}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stage">Current Stage</Label>
                <Select 
                  value={formData.stage} 
                  onValueChange={(value) => handleSelectChange("stage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                placeholder="Add any additional notes or details about this lead" 
                rows={4}
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit" className="bg-crm-purple-600 hover:bg-crm-purple-700">
                Add Lead
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddLead;
