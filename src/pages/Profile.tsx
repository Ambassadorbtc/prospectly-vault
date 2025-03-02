
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, CreditCard, Mail, Phone, Save, User } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="flex-1 overflow-auto">
      <Header title="Profile" />
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-6 mb-6 animate-on-load" style={{ "--anim-delay": 0 } as React.CSSProperties}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-muted-foreground">Senior Sales Manager</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Sales</Badge>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Marketing</Badge>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">Leadership</Badge>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="md:self-start"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="personal" className="animate-on-load" style={{ "--anim-delay": 1 } as React.CSSProperties}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                      <div className="flex">
                        <User className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                        <Input 
                          id="fullName" 
                          placeholder="John Doe" 
                          disabled={!isEditing} 
                          defaultValue="John Doe" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <div className="flex">
                        <Mail className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john.doe@example.com" 
                          disabled={!isEditing} 
                          defaultValue="john.doe@example.com" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                      <div className="flex">
                        <Phone className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                        <Input 
                          id="phone" 
                          placeholder="+1 (555) 123-4567" 
                          disabled={!isEditing} 
                          defaultValue="+1 (555) 123-4567" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">Job Title</label>
                      <div className="flex">
                        <CreditCard className="w-4 h-4 text-muted-foreground mr-2 mt-3" />
                        <Input 
                          id="title" 
                          placeholder="Senior Sales Manager" 
                          disabled={!isEditing} 
                          defaultValue="Senior Sales Manager" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                    <Textarea 
                      id="bio" 
                      placeholder="Write a short bio about yourself..." 
                      disabled={!isEditing} 
                      defaultValue="Experienced sales manager with over 10 years in technology sales. Passionate about building customer relationships and driving growth."
                      className="min-h-24"
                    />
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter>
                    <Button className="ml-auto bg-crm-purple-600 hover:bg-crm-purple-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="text-sm font-medium">Current Password</label>
                      <Input id="currentPassword" type="password" disabled={!isEditing} />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                      <Input id="newPassword" type="password" disabled={!isEditing} />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</label>
                      <Input id="confirmPassword" type="password" disabled={!isEditing} />
                    </div>
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter>
                    <Button className="ml-auto bg-crm-purple-600 hover:bg-crm-purple-700">
                      <Save className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive emails about new leads and tasks</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id="email-notifications"
                          aria-describedby="email-notifications-description"
                          name="email-notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Desktop Notifications</h3>
                        <p className="text-sm text-muted-foreground">Get browser notifications for important updates</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id="desktop-notifications"
                          aria-describedby="desktop-notifications-description"
                          name="desktop-notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          defaultChecked
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Calendar Integration</h3>
                        <p className="text-sm text-muted-foreground">Sync with Google Calendar</p>
                      </div>
                      <div className="flex items-center h-5">
                        <input
                          id="calendar-integration"
                          aria-describedby="calendar-integration-description"
                          name="calendar-integration"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                {isEditing && (
                  <CardFooter>
                    <Button className="ml-auto bg-crm-purple-600 hover:bg-crm-purple-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="animate-on-load mt-6" style={{ "--anim-delay": 2 } as React.CSSProperties}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions in the CRM</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: <User className="h-4 w-4" />, action: "Updated lead information for Acme Inc.", time: "2 hours ago" },
                    { icon: <Check className="h-4 w-4" />, action: "Closed deal with TechCorp worth $75,000", time: "Yesterday" },
                    { icon: <Calendar className="h-4 w-4" />, action: "Scheduled meeting with potential client", time: "2 days ago" },
                    { icon: <Mail className="h-4 w-4" />, action: "Sent proposal to GlobalTech", time: "1 week ago" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.action}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
