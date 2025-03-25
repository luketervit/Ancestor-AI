import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, Mail, Key, Bell, Shield, Trash2, LogOut, 
  Volume2, Repeat, Headphones, CreditCard, Download
} from "lucide-react";

interface SettingsProps {
  onClose: () => void;
  userData?: {
    name: string;
    email: string;
    avatarUrl?: string;
    planType: "free" | "premium" | "family";
  };
}

const Settings = ({ 
  onClose, 
  userData = {
    name: "Sarah Thompson",
    email: "sarah.thompson@example.com",
    planType: "premium" as const
  } 
}: SettingsProps) => {
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({
    account: {
      name: userData.name,
      email: userData.email,
    },
    notifications: {
      emailNotifications: true,
      conversationReminders: true,
      marketingEmails: false,
      newFeatures: true,
    },
    privacy: {
      dataSharing: false,
      voiceAnalysis: true,
      improvementProgram: true,
    },
    conversation: {
      voiceVolume: 80,
      speakingRate: 100,
      voiceMemory: 10,
      enhancedRealism: true,
      autoSave: true,
      downloadTranscripts: true,
    }
  });

  const handleChange = (section: keyof typeof settings, field: string, value: any) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section as keyof typeof settings],
        [field]: value
      }
    });
  };

  const getPlanDetails = () => {
    switch(userData.planType) {
      case "premium":
        return {
          name: "Premium Plan",
          price: "$9.99/month",
          features: [
            "Unlimited conversations",
            "Advanced voice customization",
            "Priority processing",
            "Export conversations",
            "Enhanced realism"
          ]
        };
      case "family":
        return {
          name: "Family Plan",
          price: "$19.99/month",
          features: [
            "Up to 5 user accounts",
            "Shared ancestor profiles",
            "All Premium features",
            "Family tree integration",
            "Group conversation capabilities"
          ]
        };
      default:
        return {
          name: "Free Plan",
          price: "Free",
          features: [
            "3 ancestor profiles",
            "Basic voice customization",
            "Limited conversations (5/month)",
            "Standard quality"
          ]
        };
    }
  };

  const planDetails = getPlanDetails();

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-2xl lg:max-w-4xl h-[80vh] flex flex-col gap-0 p-0">
        <DialogHeader className="px-4 py-2 border-b">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your account and preferences
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-1 overflow-hidden">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            orientation="vertical"
            className="flex flex-1 h-full"
          >
            <TabsList className="w-48 h-full flex flex-col justify-start border-r bg-muted/50 space-y-1 p-2">
              <TabsTrigger value="account" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger value="billing" className="justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="conversation" className="justify-start">
                <Headphones className="h-4 w-4 mr-2" />
                Conversation
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-y-auto p-4">
              <TabsContent value="account" className="h-full space-y-4 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={userData.avatarUrl} />
                        <AvatarFallback>{userData.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Button variant="outline" size="sm">
                          Change Avatar
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          JPG, PNG or GIF. 1MB max.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="flex">
                        <div className="relative flex-1">
                          <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="name" 
                            placeholder="Your name" 
                            className="pl-8"
                            value={settings.account.name}
                            onChange={(e) => handleChange('account', 'name', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex">
                        <div className="relative flex-1">
                          <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="Your email" 
                            className="pl-8"
                            value={settings.account.email}
                            onChange={(e) => handleChange('account', 'email', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                      Change your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="current-password" 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-8"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="new-password" 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-8"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="relative">
                        <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          placeholder="••••••••" 
                          className="pl-8"
                        />
                      </div>
                    </div>
                    
                    <Button>Update Password</Button>
                  </CardContent>
                </Card>
                
                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>
                      Permanent account actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-medium">Delete Account</h4>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-medium">Sign Out</h4>
                        <p className="text-sm text-muted-foreground">
                          Sign out from this device
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing" className="h-full space-y-4 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      Your subscription details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-primary/5 border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">{planDetails.name}</h3>
                          <p className="text-muted-foreground">{planDetails.price}</p>
                        </div>
                        {userData.planType === "free" ? (
                          <Button>
                            Upgrade Plan
                          </Button>
                        ) : (
                          <Button variant="outline">
                            Manage Subscription
                          </Button>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">Features included:</h4>
                        <ul className="space-y-1">
                          {planDetails.features.map((feature, index) => (
                            <li key={index} className="text-sm flex items-start">
                              <span className="mr-2 text-primary">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      {userData.planType !== "free" ? (
                        <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                          <div className="flex items-center space-x-3">
                            <div className="bg-background p-1 rounded">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-xs text-muted-foreground">Expires 12/25</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Change
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-muted p-3 rounded-md text-sm">
                          No payment method on file
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      View your recent invoices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userData.planType !== "free" ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-2 border-b">
                          <div>
                            <p className="font-medium">Mar 15, 2025</p>
                            <p className="text-xs text-muted-foreground">{planDetails.name}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{planDetails.price}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                          <div>
                            <p className="font-medium">Feb 15, 2025</p>
                            <p className="text-xs text-muted-foreground">{planDetails.name}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{planDetails.price}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-medium">Jan 15, 2025</p>
                            <p className="text-xs text-muted-foreground">{planDetails.name}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{planDetails.price}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No billing history available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="h-full space-y-4 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>
                      Manage the emails you receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive important updates about your account
                        </p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => handleChange('notifications', 'emailNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="conversation-reminders">Conversation Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get reminders to continue your conversations
                        </p>
                      </div>
                      <Switch 
                        id="conversation-reminders" 
                        checked={settings.notifications.conversationReminders}
                        onCheckedChange={(checked) => handleChange('notifications', 'conversationReminders', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive news about features and special offers
                        </p>
                      </div>
                      <Switch 
                        id="marketing-emails" 
                        checked={settings.notifications.marketingEmails}
                        onCheckedChange={(checked) => handleChange('notifications', 'marketingEmails', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-features">New Features Announcements</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new features and improvements
                        </p>
                      </div>
                      <Switch 
                        id="new-features" 
                        checked={settings.notifications.newFeatures}
                        onCheckedChange={(checked) => handleChange('notifications', 'newFeatures', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="h-full space-y-4 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control how your data is used
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data-sharing">Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow anonymous data sharing to improve services
                        </p>
                      </div>
                      <Switch 
                        id="data-sharing" 
                        checked={settings.privacy.dataSharing}
                        onCheckedChange={(checked) => handleChange('privacy', 'dataSharing', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="voice-analysis">Voice Analysis</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow analysis of voice samples to improve voice synthesis
                        </p>
                      </div>
                      <Switch 
                        id="voice-analysis" 
                        checked={settings.privacy.voiceAnalysis}
                        onCheckedChange={(checked) => handleChange('privacy', 'voiceAnalysis', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="improvement-program">AI Improvement Program</Label>
                        <p className="text-sm text-muted-foreground">
                          Participate in the AI model improvement program
                        </p>
                      </div>
                      <Switch 
                        id="improvement-program" 
                        checked={settings.privacy.improvementProgram}
                        onCheckedChange={(checked) => handleChange('privacy', 'improvementProgram', checked)}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline">Download My Data</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Policy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our privacy policy explains how we collect, use, and protect your personal information.
                    </p>
                    <Button variant="link" className="p-0 h-auto">View Privacy Policy</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="conversation" className="h-full space-y-4 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Voice Settings</CardTitle>
                    <CardDescription>
                      Customize the AI voice experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-volume">Voice Volume</Label>
                        <span className="text-sm">{settings.conversation.voiceVolume}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                        <Slider
                          id="voice-volume"
                          min={0}
                          max={100}
                          step={1}
                          value={[settings.conversation.voiceVolume]}
                          onValueChange={(value) => handleChange('conversation', 'voiceVolume', value[0])}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="speaking-rate">Speaking Rate</Label>
                        <span className="text-sm">{settings.conversation.speakingRate}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Repeat className="h-4 w-4 text-muted-foreground" />
                        <Slider
                          id="speaking-rate"
                          min={50}
                          max={150}
                          step={5}
                          value={[settings.conversation.speakingRate]}
                          onValueChange={(value) => handleChange('conversation', 'speakingRate', value[0])}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-memory">Conversation Memory (days)</Label>
                        <span className="text-sm">{settings.conversation.voiceMemory} days</span>
                      </div>
                      <Select 
                        value={settings.conversation.voiceMemory.toString()} 
                        onValueChange={(value) => handleChange('conversation', 'voiceMemory', parseInt(value))}
                      >
                        <SelectTrigger id="voice-memory">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="10">10 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        How long conversation context is remembered between sessions
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enhanced-realism">Enhanced Realism</Label>
                        <p className="text-sm text-muted-foreground">
                          Use advanced AI techniques for more natural conversations
                        </p>
                      </div>
                      <Switch 
                        id="enhanced-realism" 
                        checked={settings.conversation.enhancedRealism}
                        onCheckedChange={(checked) => handleChange('conversation', 'enhancedRealism', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-save">Auto-Save Conversations</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically save all conversations
                        </p>
                      </div>
                      <Switch 
                        id="auto-save" 
                        checked={settings.conversation.autoSave}
                        onCheckedChange={(checked) => handleChange('conversation', 'autoSave', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="download-transcripts">Download Transcripts</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable downloading conversation transcripts
                        </p>
                      </div>
                      <Switch 
                        id="download-transcripts" 
                        checked={settings.conversation.downloadTranscripts}
                        onCheckedChange={(checked) => handleChange('conversation', 'downloadTranscripts', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <DialogFooter className="px-4 py-3 border-t">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button onClick={onClose}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;