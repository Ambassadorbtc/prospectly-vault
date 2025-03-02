
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Edit, Globe, Moon, Palette, Save, Sun, UserCog } from "lucide-react";
import { toast } from "sonner";
import { stages } from "@/data/mockData";

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "My CRM",
    dateFormat: "MM/DD/YYYY",
    timeZone: "UTC-5",
    language: "English",
    theme: "dark",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    leadAssignmentAlerts: true,
    dealUpdates: true,
    taskReminders: true,
    weeklyReports: false,
  });
  
  const [stageSettings, setStageSettings] = useState([...stages]);
  const [editingStage, setEditingStage] = useState<string | null>(null);

  const handleGeneralSettingsChange = (key: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationToggle = (key: string) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof notificationSettings] }));
  };
  
  const handleStageChange = (id: string, field: string, value: string) => {
    setStageSettings(prev => 
      prev.map(stage => 
        stage.id === id ? { ...stage, [field]: value } : stage
      )
    );
  };

  const handleSaveSettings = () => {
    console.log("General settings:", generalSettings);
    console.log("Notification settings:", notificationSettings);
    console.log("Stage settings:", stageSettings);
    
    toast.success("Settings saved successfully!");
  };

  return (
    <PageLayout title="Settings">
      <div className="p-6 max-w-6xl mx-auto">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="stages">Pipeline Stages</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic application settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      value={generalSettings.companyName}
                      onChange={(e) => handleGeneralSettingsChange("companyName", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select 
                      value={generalSettings.dateFormat} 
                      onValueChange={(value) => handleGeneralSettingsChange("dateFormat", value)}
                    >
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeZone">Time Zone</Label>
                    <Select 
                      value={generalSettings.timeZone} 
                      onValueChange={(value) => handleGeneralSettingsChange("timeZone", value)}
                    >
                      <SelectTrigger id="timeZone">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-12">UTC-12</SelectItem>
                        <SelectItem value="UTC-11">UTC-11</SelectItem>
                        <SelectItem value="UTC-10">UTC-10</SelectItem>
                        <SelectItem value="UTC-9">UTC-9</SelectItem>
                        <SelectItem value="UTC-8">UTC-8 (Pacific)</SelectItem>
                        <SelectItem value="UTC-7">UTC-7 (Mountain)</SelectItem>
                        <SelectItem value="UTC-6">UTC-6 (Central)</SelectItem>
                        <SelectItem value="UTC-5">UTC-5 (Eastern)</SelectItem>
                        <SelectItem value="UTC-4">UTC-4</SelectItem>
                        <SelectItem value="UTC-3">UTC-3</SelectItem>
                        <SelectItem value="UTC-2">UTC-2</SelectItem>
                        <SelectItem value="UTC-1">UTC-1</SelectItem>
                        <SelectItem value="UTC+0">UTC+0</SelectItem>
                        <SelectItem value="UTC+1">UTC+1</SelectItem>
                        <SelectItem value="UTC+2">UTC+2</SelectItem>
                        <SelectItem value="UTC+3">UTC+3</SelectItem>
                        <SelectItem value="UTC+4">UTC+4</SelectItem>
                        <SelectItem value="UTC+5">UTC+5</SelectItem>
                        <SelectItem value="UTC+6">UTC+6</SelectItem>
                        <SelectItem value="UTC+7">UTC+7</SelectItem>
                        <SelectItem value="UTC+8">UTC+8</SelectItem>
                        <SelectItem value="UTC+9">UTC+9</SelectItem>
                        <SelectItem value="UTC+10">UTC+10</SelectItem>
                        <SelectItem value="UTC+11">UTC+11</SelectItem>
                        <SelectItem value="UTC+12">UTC+12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={generalSettings.language} 
                      onValueChange={(value) => handleGeneralSettingsChange("language", value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={generalSettings.theme === "light" ? "default" : "outline"}
                        size="sm"
                        className="gap-2"
                        onClick={() => handleGeneralSettingsChange("theme", "light")}
                      >
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={generalSettings.theme === "dark" ? "default" : "outline"}
                        size="sm"
                        className="gap-2"
                        onClick={() => handleGeneralSettingsChange("theme", "dark")}
                      >
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={generalSettings.theme === "system" ? "default" : "outline"}
                        size="sm"
                        className="gap-2"
                        onClick={() => handleGeneralSettingsChange("theme", "system")}
                      >
                        <Palette className="h-4 w-4" />
                        <span>System</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveSettings} className="bg-crm-purple-600 hover:bg-crm-purple-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure when and how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="desktopNotifications" className="font-medium">Desktop Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Show notifications on your desktop
                      </p>
                    </div>
                    <Switch
                      id="desktopNotifications"
                      checked={notificationSettings.desktopNotifications}
                      onCheckedChange={() => handleNotificationToggle("desktopNotifications")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="leadAssignmentAlerts" className="font-medium">Lead Assignment Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you're assigned a new lead
                      </p>
                    </div>
                    <Switch
                      id="leadAssignmentAlerts"
                      checked={notificationSettings.leadAssignmentAlerts}
                      onCheckedChange={() => handleNotificationToggle("leadAssignmentAlerts")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="dealUpdates" className="font-medium">Deal Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about changes to your deals
                      </p>
                    </div>
                    <Switch
                      id="dealUpdates"
                      checked={notificationSettings.dealUpdates}
                      onCheckedChange={() => handleNotificationToggle("dealUpdates")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="taskReminders" className="font-medium">Task Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminders for upcoming tasks and follow-ups
                      </p>
                    </div>
                    <Switch
                      id="taskReminders"
                      checked={notificationSettings.taskReminders}
                      onCheckedChange={() => handleNotificationToggle("taskReminders")}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="weeklyReports" className="font-medium">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly performance reports
                      </p>
                    </div>
                    <Switch
                      id="weeklyReports"
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={() => handleNotificationToggle("weeklyReports")}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveSettings} className="bg-crm-purple-600 hover:bg-crm-purple-700">
                      <Bell className="h-4 w-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stages" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Stage Configuration</CardTitle>
                <CardDescription>Customize your sales pipeline stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Stage Name</th>
                          <th className="text-left py-3 px-4">Order</th>
                          <th className="text-left py-3 px-4">Color</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stageSettings.map((stage) => (
                          <tr key={stage.id} className="border-b">
                            <td className="py-3 px-4">
                              {editingStage === stage.id ? (
                                <Input
                                  value={stage.name}
                                  onChange={(e) => handleStageChange(stage.id, "name", e.target.value)}
                                  className="max-w-[200px]"
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: stage.color }}
                                  ></div>
                                  {stage.name}
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {editingStage === stage.id ? (
                                <Input
                                  type="number"
                                  value={stage.order}
                                  onChange={(e) => handleStageChange(stage.id, "order", e.target.value)}
                                  className="max-w-[100px]"
                                />
                              ) : (
                                stage.order
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {editingStage === stage.id ? (
                                <Input
                                  type="color"
                                  value={stage.color}
                                  onChange={(e) => handleStageChange(stage.id, "color", e.target.value)}
                                  className="w-20 h-10"
                                />
                              ) : (
                                <div 
                                  className="w-6 h-6 rounded" 
                                  style={{ backgroundColor: stage.color }}
                                ></div>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              {editingStage === stage.id ? (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingStage(null)}
                                >
                                  Save
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingStage(stage.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline">
                      Add New Stage
                    </Button>
                    
                    <Button onClick={handleSaveSettings} className="bg-crm-purple-600 hover:bg-crm-purple-700">
                      Save Pipeline Configuration
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users and access permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    Manage who has access to your CRM and what they can do.
                  </p>
                  <Button>
                    <UserCog className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
                
                <p className="text-center text-muted-foreground py-12">
                  User management settings will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect with other tools and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    Connect your CRM with other applications to streamline your workflow.
                  </p>
                  <Button>
                    <Globe className="h-4 w-4 mr-2" />
                    Add Integration
                  </Button>
                </div>
                
                <p className="text-center text-muted-foreground py-12">
                  Integration settings will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Settings;
