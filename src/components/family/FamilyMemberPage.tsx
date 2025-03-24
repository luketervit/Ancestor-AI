import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  MessageSquare,
  Phone,
  Upload,
  Clock,
  Heart,
  User,
  Mail,
  Calendar,
} from "lucide-react";

const FamilyMemberPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("conversations");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn userName="Sarah Johnson" />

      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Robert"
                  alt="Grandfather Robert"
                />
                <AvatarFallback>GR</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">Grandfather Robert</h1>
                  <Badge className="self-center md:self-auto bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
                    Family Plan
                  </Badge>
                </div>

                <p className="text-gray-600 mb-4">Preserved on June 12, 2023</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Robert Johnson</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Born May 15, 1945</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Father, Grandfather</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Loved fishing, carpentry</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => navigate("/conversation")}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Start Conversation
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => navigate("/call")}
                  >
                    <Phone className="h-4 w-4" />
                    Voice Call
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => navigate("/voice-upload")}
                  >
                    <Upload className="h-4 w-4" />
                    Add Memories
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Voice Samples
                    </p>
                    <p className="text-2xl font-bold">45 minutes</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      12 recordings
                    </p>
                  </div>
                  <div className="p-2 bg-indigo-100 rounded-full">
                    <Phone className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Text Samples
                    </p>
                    <p className="text-2xl font-bold">1,248</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Messages, emails, letters
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Conversations
                    </p>
                    <p className="text-2xl font-bold">27</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last: 2 days ago
                    </p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Tabs
            defaultValue="conversations"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="conversations">Conversations</TabsTrigger>
              <TabsTrigger value="memories">Memories</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="conversations" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Recent Conversations</h2>
                <Button>New Conversation</Button>
              </div>

              <div className="space-y-4">
                {/* Conversation Items */}
                <Card>
                  <CardContent className="p-0">
                    <div className="p-6 hover:bg-gray-50 cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Childhood Memories</h3>
                        <span className="text-sm text-gray-500">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        "I remember when we used to go fishing at the lake every
                        summer. Those were some of the best days of my life..."
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-500">
                            24 messages
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Continue
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-0">
                    <div className="p-6 hover:bg-gray-50 cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Family Recipes</h3>
                        <span className="text-sm text-gray-500">
                          1 week ago
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        "The secret to my apple pie was always using Granny
                        Smith apples and a touch of cinnamon. Your grandmother
                        taught me that..."
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-500">
                            18 messages
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Continue
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-0">
                    <div className="p-6 hover:bg-gray-50 cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">Life Advice</h3>
                        <span className="text-sm text-gray-500">
                          2 weeks ago
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        "The most important thing in life is to be kind.
                        Everything else follows from that. I learned that the
                        hard way..."
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-500">
                            32 messages
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Continue
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Button variant="outline">View All Conversations</Button>
              </div>
            </TabsContent>

            <TabsContent value="memories" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Preserved Memories</h2>
                <Button>Add Memory</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Voice Recordings</CardTitle>
                    <CardDescription>
                      Preserved voice samples and stories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-indigo-100 rounded-full mr-3">
                            <Phone className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium">Fishing Stories</p>
                            <p className="text-sm text-gray-500">
                              8:24 • June 15, 2023
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Play
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-indigo-100 rounded-full mr-3">
                            <Phone className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium">Wedding Day Memories</p>
                            <p className="text-sm text-gray-500">
                              12:37 • June 18, 2023
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Play
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-indigo-100 rounded-full mr-3">
                            <Phone className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium">Career Advice</p>
                            <p className="text-sm text-gray-500">
                              5:12 • June 20, 2023
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Play
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm">
                        View All Recordings
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Text Memories</CardTitle>
                    <CardDescription>
                      Letters, messages, and written stories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-full mr-3">
                            <MessageSquare className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Letters from the War</p>
                            <p className="text-sm text-gray-500">
                              12 pages • Added June 22, 2023
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-full mr-3">
                            <MessageSquare className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Family Recipes</p>
                            <p className="text-sm text-gray-500">
                              24 recipes • Added June 25, 2023
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 bg-green-100 rounded-full mr-3">
                            <MessageSquare className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Email Collection</p>
                            <p className="text-sm text-gray-500">
                              156 emails • Added June 28, 2023
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm">
                        View All Text Memories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Profile Settings</h2>
                <Button variant="outline">Edit Profile</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Voice Settings</CardTitle>
                    <CardDescription>
                      Customize voice interaction settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Voice Speed</label>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Slow</span>
                        <input
                          type="range"
                          className="flex-1"
                          min="0"
                          max="100"
                          defaultValue="50"
                        />
                        <span className="text-sm text-gray-500 ml-2">Fast</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Voice Pitch</label>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Low</span>
                        <input
                          type="range"
                          className="flex-1"
                          min="0"
                          max="100"
                          defaultValue="50"
                        />
                        <span className="text-sm text-gray-500 ml-2">High</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Response Style
                      </label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Conversational</option>
                        <option>Detailed</option>
                        <option>Concise</option>
                        <option>Storytelling</option>
                      </select>
                    </div>

                    <Button className="w-full mt-2">Save Voice Settings</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sharing Settings</CardTitle>
                    <CardDescription>
                      Manage who can access this profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Family Members with Access
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <span>Sarah Johnson (You)</span>
                          </div>
                          <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                            Owner
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" />
                              <AvatarFallback>MJ</AvatarFallback>
                            </Avatar>
                            <span>Michael Johnson</span>
                          </div>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            Editor
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" />
                              <AvatarFallback>EJ</AvatarFallback>
                            </Avatar>
                            <span>Emily Johnson</span>
                          </div>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Viewer
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Manage Access
                    </Button>

                    <Separator className="my-4" />

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Privacy Level
                      </label>
                      <select className="w-full p-2 border rounded-md">
                        <option>Family Only</option>
                        <option>Close Friends</option>
                        <option>Extended Family</option>
                        <option>Private (Only Me)</option>
                      </select>
                      <p className="text-xs text-gray-500">
                        Determines who can see and interact with this profile
                      </p>
                    </div>

                    <Button className="w-full mt-2">
                      Save Sharing Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FamilyMemberPage;
