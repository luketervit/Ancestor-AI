import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, User, Shield, CreditCard, Users, LogOut } from "lucide-react";

const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn userName="Sarah Johnson" />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-gray-600">
              Manage your account preferences and settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar Navigation */}
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Tabs
                    defaultValue="profile"
                    orientation="vertical"
                    className="w-full"
                  >
                    <TabsList className="flex flex-col h-auto space-y-1 bg-transparent p-0">
                      <TabsTrigger
                        value="profile"
                        className="justify-start px-3 py-2 h-9 font-normal"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger
                        value="notifications"
                        className="justify-start px-3 py-2 h-9 font-normal"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger
                        value="privacy"
                        className="justify-start px-3 py-2 h-9 font-normal"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Privacy & Security
                      </TabsTrigger>
                      <TabsTrigger
                        value="billing"
                        className="justify-start px-3 py-2 h-9 font-normal"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Billing
                      </TabsTrigger>
                      <TabsTrigger
                        value="family"
                        className="justify-start px-3 py-2 h-9 font-normal"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Family Sharing
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="pt-4 mt-4 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 px-3"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </nav>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="space-y-6">
              <Tabs defaultValue="profile" className="w-full">
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col items-center space-y-4">
                          <Avatar className="w-24 h-24">
                            <AvatarImage
                              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                              alt="Sarah Johnson"
                            />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">
                            Change Photo
                          </Button>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input
                                id="firstName"
                                defaultValue="Sarah"
                                disabled={!isEditing}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input
                                id="lastName"
                                defaultValue="Johnson"
                                disabled={!isEditing}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue="sarah.johnson@example.com"
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              defaultValue="(555) 123-4567"
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="pt-4 flex justify-end">
                            {isEditing ? (
                              <div className="space-x-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setIsEditing(false)}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={() => setIsEditing(false)}>
                                  Save Changes
                                </Button>
                              </div>
                            ) : (
                              <Button onClick={() => setIsEditing(true)}>
                                Edit Profile
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Update your password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <div className="pt-2">
                        <Button>Update Password</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          Email Notifications
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="emailUpdates">
                                Product Updates
                              </Label>
                              <p className="text-sm text-gray-500">
                                Receive emails about new features and
                                improvements
                              </p>
                            </div>
                            <Switch id="emailUpdates" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="emailActivity">
                                Account Activity
                              </Label>
                              <p className="text-sm text-gray-500">
                                Receive emails about your account activity
                              </p>
                            </div>
                            <Switch id="emailActivity" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="emailMarketing">Marketing</Label>
                              <p className="text-sm text-gray-500">
                                Receive promotional emails and offers
                              </p>
                            </div>
                            <Switch id="emailMarketing" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          Push Notifications
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="pushMessages">New Messages</Label>
                              <p className="text-sm text-gray-500">
                                Get notified when you receive new messages
                              </p>
                            </div>
                            <Switch id="pushMessages" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="pushUpdates">
                                Profile Updates
                              </Label>
                              <p className="text-sm text-gray-500">
                                Get notified when profiles are updated
                              </p>
                            </div>
                            <Switch id="pushUpdates" defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button>Save Preferences</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>
                        Control your privacy preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Data Sharing</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="dataAnalytics">Analytics</Label>
                              <p className="text-sm text-gray-500">
                                Allow us to use your data for analytics and
                                improvements
                              </p>
                            </div>
                            <Switch id="dataAnalytics" defaultChecked />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="dataPersonalization">
                                Personalization
                              </Label>
                              <p className="text-sm text-gray-500">
                                Allow us to personalize your experience
                              </p>
                            </div>
                            <Switch id="dataPersonalization" defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          Account Visibility
                        </h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="profileVisibility">
                              Profile Visibility
                            </Label>
                            <Select defaultValue="family">
                              <SelectTrigger id="profileVisibility">
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="family">
                                  Family Only
                                </SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button>Save Privacy Settings</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>
                        Manage your account security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <h3 className="text-lg font-medium">Sessions</h3>
                          <p className="text-sm text-gray-500">
                            Manage your active sessions
                          </p>
                        </div>
                        <Button variant="outline">View All</Button>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <h3 className="text-lg font-medium text-red-600">
                            Delete Account
                          </h3>
                          <p className="text-sm text-gray-500">
                            Permanently delete your account and all data
                          </p>
                        </div>
                        <Button variant="destructive">Delete</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subscription</CardTitle>
                      <CardDescription>
                        Manage your subscription plan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-medium">Family Plan</h3>
                            <p className="text-sm text-gray-600">
                              $24.99/month
                            </p>
                          </div>
                          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                            Active
                          </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-600">
                          <p>Next billing date: October 15, 2023</p>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              Change Plan
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Payment Method</h3>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                          <div className="flex items-center">
                            <div className="bg-white p-2 rounded-md mr-4 border">
                              <svg
                                width="32"
                                height="20"
                                viewBox="0 0 32 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="32"
                                  height="20"
                                  rx="4"
                                  fill="#016FD0"
                                />
                                <path
                                  d="M14.5 13H17.5V7H14.5V13Z"
                                  fill="white"
                                />
                                <path
                                  d="M14.5 7L16 10.5L17.5 7H14.5Z"
                                  fill="white"
                                />
                                <path
                                  d="M21.5 7H18.5C19.3 8.6 19.3 11.4 18.5 13H21.5C22.9 11.4 22.9 8.6 21.5 7Z"
                                  fill="white"
                                />
                                <path
                                  d="M10.5 7L8 13H10L10.3 12H12.7L13 13H15L12.5 7H10.5ZM10.8 10.5L11.5 8.5L12.2 10.5H10.8Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">American Express</p>
                              <p className="text-sm text-gray-500">
                                Ending in 4567
                              </p>
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>

                        <div className="pt-2">
                          <Button variant="outline">Add Payment Method</Button>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <h3 className="text-lg font-medium mb-4">
                          Billing History
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">September 15, 2023</p>
                              <p className="text-sm text-gray-500">
                                Family Plan - Monthly
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$24.99</p>
                              <p className="text-sm text-green-600">Paid</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">August 15, 2023</p>
                              <p className="text-sm text-gray-500">
                                Family Plan - Monthly
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$24.99</p>
                              <p className="text-sm text-green-600">Paid</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">July 15, 2023</p>
                              <p className="text-sm text-gray-500">
                                Family Plan - Monthly
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">$24.99</p>
                              <p className="text-sm text-green-600">Paid</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Button variant="ghost">View All Invoices</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="family" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Family Sharing</CardTitle>
                      <CardDescription>
                        Manage family members who can access your profiles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">
                            Family Members (3/10)
                          </h3>
                          <Button>Invite Member</Button>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-4">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" />
                                <AvatarFallback>MJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Michael Johnson</p>
                                <p className="text-sm text-gray-500">
                                  michael.johnson@example.com
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 mr-4">
                                Admin
                              </span>
                              <Button variant="ghost" size="sm">
                                Manage
                              </Button>
                            </div>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-4">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" />
                                <AvatarFallback>EJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Emily Johnson</p>
                                <p className="text-sm text-gray-500">
                                  emily.johnson@example.com
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 mr-4">
                                Member
                              </span>
                              <Button variant="ghost" size="sm">
                                Manage
                              </Button>
                            </div>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-4">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=David" />
                                <AvatarFallback>DJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">David Johnson</p>
                                <p className="text-sm text-gray-500">
                                  david.johnson@example.com
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600 mr-4">
                                Member
                              </span>
                              <Button variant="ghost" size="sm">
                                Manage
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t">
                          <h3 className="text-lg font-medium mb-4">
                            Pending Invitations
                          </h3>

                          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">
                                jessica.smith@example.com
                              </p>
                              <p className="text-sm text-gray-500">
                                Sent on October 2, 2023
                              </p>
                            </div>
                            <div>
                              <Button variant="outline" size="sm">
                                Resend
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t">
                          <h3 className="text-lg font-medium mb-4">
                            Access Settings
                          </h3>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="defaultAccess">
                                Default Access Level
                              </Label>
                              <Select defaultValue="view">
                                <SelectTrigger id="defaultAccess">
                                  <SelectValue placeholder="Select access level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="view">
                                    View Only
                                  </SelectItem>
                                  <SelectItem value="contribute">
                                    Can Contribute
                                  </SelectItem>
                                  <SelectItem value="edit">Can Edit</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-sm text-gray-500">
                                Default access level for new family members
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="autoApprove">
                                  Auto-approve requests
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Automatically approve access requests from
                                  family members
                                </p>
                              </div>
                              <Switch id="autoApprove" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
