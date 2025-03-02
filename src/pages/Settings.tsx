
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Check, Globe, Lock, Save, Smartphone, User, UserCog } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
      action: (
        <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-green-500" />
        </div>
      ),
    });
  };
  
  return (
    <div className="flex-1 overflow-auto">
      <Header title="Settings" />
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="general" className="animate-on-load" style={{ "--anim-delay": 0 } as React.CSSProperties}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <Button className="bg-crm-purple-600 hover:bg-crm-purple-700" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
            
            <TabsContent value="general">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="job-title">Job Title</Label>
                        <Input id="job-title" defaultValue="Senior Sales Manager" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="america-new_york">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america-new_york">America/New York (UTC-04:00)</SelectItem>
                          <SelectItem value="america-los_angeles">America/Los Angeles (UTC-07:00)</SelectItem>
                          <SelectItem value="europe-london">Europe/London (UTC+01:00)</SelectItem>
                          <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+09:00)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="mdy">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <Label>Theme</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>Color Scheme</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="color-default"
                          name="color-scheme"
                          defaultChecked
                          className="h-4 w-4 rounded-full"
                        />
                        <Label htmlFor="color-default" className="cursor-pointer">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="color-blue"
                          name="color-scheme"
                          className="h-4 w-4 rounded-full"
                        />
                        <Label htmlFor="color-blue" className="cursor-pointer">Blue</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="color-green"
                          name="color-scheme"
                          className="h-4 w-4 rounded-full"
                        />
                        <Label htmlFor="color-green" className="cursor-pointer">Green</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>Layout Density</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="density-compact"
                          name="layout-density"
                          className="h-4 w-4 rounded-full"
                        />
                        <Label htmlFor="density-compact" className="cursor-pointer">Compact</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="density-comfortable"
                          name="layout-density"
                          defaultChecked
                          className="h-4 w-4 rounded-full"
                        />
                        <Label htmlFor="density-comfortable" className="cursor-pointer">Comfortable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="density-spacious"
                          name="layout-density"
                          className="h-4 w-4 rounded-full"
                        />
                        <Label htmlFor="density-spacious" className="cursor-pointer">Spacious</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground mb-4">Manage email notification settings</p>
                      
                      {[
                        { id: "new-lead", label: "New lead assigned to you" },
                        { id: "deal-status", label: "Deal status changes" },
                        { id: "task-reminder", label: "Task reminders" },
                        { id: "monthly-summary", label: "Monthly performance summary" }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2">
                          <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                          <Switch id={item.id} defaultChecked={item.id !== "monthly-summary"} />
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-base font-medium">In-App Notifications</h3>
                      <p className="text-sm text-muted-foreground mb-4">Control notifications within the application</p>
                      
                      {[
                        { id: "in-app-lead", label: "New lead notifications" },
                        { id: "in-app-message", label: "New messages" },
                        { id: "in-app-activity", label: "Team activity" },
                        { id: "in-app-system", label: "System notifications" }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2">
                          <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                          <Switch id={item.id} defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Update Password</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-medium">Enable Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Require a security code in addition to your password</p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sessions</CardTitle>
                    <CardDescription>Manage your active sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { device: "Current Device", location: "New York, USA", lastActive: "Now", browser: "Chrome on Windows", icon: <Smartphone className="h-4 w-4 mr-2" /> },
                        { device: "MacBook Pro", location: "Boston, USA", lastActive: "2 days ago", browser: "Safari on macOS", icon: <Smartphone className="h-4 w-4 mr-2" /> },
                        { device: "iPhone 13", location: "New York, USA", lastActive: "5 days ago", browser: "Safari on iOS", icon: <Smartphone className="h-4 w-4 mr-2" /> }
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between py-3">
                          <div className="flex items-center">
                            {session.icon}
                            <div>
                              <p className="text-sm font-medium">{session.device}</p>
                              <p className="text-xs text-muted-foreground">{session.browser} • {session.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground">{session.lastActive}</span>
                            {index === 0 ? (
                              <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">Active</span>
                            ) : (
                              <Button variant="outline" size="sm" className="text-xs">Log Out</Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="text-destructive hover:bg-destructive/10">Log Out From All Devices</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
