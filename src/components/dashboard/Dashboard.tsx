import React, { useState } from "react";
import ProfileGrid from "./ProfileGrid";
import ActionPanel from "./ActionPanel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Bell, User, Heart, Clock, BarChart } from "lucide-react";

interface DashboardProps {
  userName?: string;
  profileCount?: number;
  ancestorProfiles?: {
    id: string;
    name: string;
    relationship: string;
    imageUrl: string;
  }[];
  onVoiceUpload?: () => void;
  onTextUpload?: () => void;
  onStartConversation?: () => void;
  onManageSettings?: () => void;
  onSelectProfile?: (id: string) => void;
  onCreateProfile?: () => void;
}

const Dashboard = ({
  userName = "Sarah",
  profileCount = 3,
  ancestorProfiles = [],
  onVoiceUpload = () => console.log("Voice upload clicked"),
  onTextUpload = () => console.log("Text upload clicked"),
  onStartConversation = () => console.log("Start conversation clicked"),
  onManageSettings = () => console.log("Manage settings clicked"),
  onSelectProfile = (id: string) => console.log(`Selected profile: ${id}`),
  onCreateProfile = () => console.log("Create new profile clicked"),
}: DashboardProps) => {
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Welcome Dialog for first-time users */}
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to Ancestor AI</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>Thank you for joining Ancestor AI. Here's how to get started:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Create an ancestor profile</li>
              <li>Upload voice recordings to capture their voice</li>
              <li>Add text samples to learn their messaging style</li>
              <li>Start a conversation with your preserved memories</li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userName}
              </h1>
              <p className="text-gray-600 mt-1">
                You have {profileCount} ancestor profiles
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Tabs defaultValue="overview" className="w-full md:w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard
                      icon={<User className="h-4 w-4 text-blue-500" />}
                      title="Profiles"
                      value={profileCount.toString()}
                      description="Active ancestor profiles"
                    />
                    <StatCard
                      icon={<Heart className="h-4 w-4 text-red-500" />}
                      title="Memories"
                      value="42"
                      description="Total preserved memories"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="activity" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard
                      icon={<Clock className="h-4 w-4 text-green-500" />}
                      title="Recent"
                      value="2 days ago"
                      description="Last conversation"
                    />
                    <StatCard
                      icon={<BarChart className="h-4 w-4 text-purple-500" />}
                      title="Interactions"
                      value="12"
                      description="This month"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Action Panel */}
          <ActionPanel
            onVoiceUpload={() => {
              console.log("Voice upload clicked from Dashboard");
              if (ancestorProfiles.length === 0) {
                alert("Please create an ancestor profile first");
                onCreateProfile();
              } else {
                onVoiceUpload();
              }
            }}
            onTextUpload={() => {
              console.log("Text upload clicked from Dashboard");
              if (ancestorProfiles.length === 0) {
                alert("Please create an ancestor profile first");
                onCreateProfile();
              } else {
                onTextUpload();
              }
            }}
            onStartConversation={() => {
              console.log("Start conversation clicked from Dashboard");
              if (ancestorProfiles.length === 0) {
                alert("Please create an ancestor profile first");
                onCreateProfile();
              } else {
                onStartConversation();
              }
            }}
            onManageSettings={() => {
              console.log("Settings clicked from Dashboard");
              // Directly call the settings handler
              onManageSettings();
            }}
          />

          {/* Profile Grid */}
          <ProfileGrid
            profiles={ancestorProfiles}
            onSelectProfile={onSelectProfile}
            onCreateProfile={onCreateProfile}
          />

          {/* Recent Activity Section */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest interactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActivityItem
                  icon={<Bell className="h-5 w-5 text-blue-500" />}
                  title="Voice sample processed"
                  description="Grandmother Sarah's voice model has been updated"
                  time="2 hours ago"
                />
                <ActivityItem
                  icon={<MessageSquare className="h-5 w-5 text-green-500" />}
                  title="New conversation"
                  description="You had a 5-minute conversation with Grandfather Robert"
                  time="Yesterday"
                />
                <ActivityItem
                  icon={<Upload className="h-5 w-5 text-purple-500" />}
                  title="Text samples added"
                  description="15 new text messages added to Uncle James's profile"
                  time="3 days ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

const StatCard = ({ icon, title, value, description }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const ActivityItem = ({
  icon,
  title,
  description,
  time,
}: ActivityItemProps) => {
  return (
    <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </div>
  );
};

// Import for ActivityItem component
import { MessageSquare, Upload } from "lucide-react";

export default Dashboard;
