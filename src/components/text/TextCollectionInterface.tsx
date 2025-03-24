import React, { useState } from "react";
import {
  Upload,
  MessageSquare,
  FileText,
  Facebook,
  Twitter,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

interface TextCollectionInterfaceProps {
  ancestorId?: string;
  onComplete?: () => void;
}

const TextCollectionInterface = ({
  ancestorId = "default-ancestor",
  onComplete = () => {},
}: TextCollectionInterfaceProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("upload");
  const [selectedSource, setSelectedSource] = useState<string>("messages");
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // Mock ancestor profiles
  const ancestorProfiles = [
    { id: "1", name: "Grandma Sarah" },
    { id: "2", name: "Grandpa Joe" },
    { id: "3", name: "Uncle Robert" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleSubmitManualText = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle manual text submission
    onComplete();
  };

  const handleSocialImport = (platform: string) => {
    // Handle social media import
    console.log(`Importing from ${platform}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Text Collection
        </h1>
        <p className="text-gray-600">
          Provide text samples to help our AI learn your loved one's writing
          style and personality.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Select Ancestor Profile</CardTitle>
          <CardDescription>
            Choose which loved one you're collecting text for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select defaultValue={ancestorId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a profile" />
            </SelectTrigger>
            <SelectContent>
              {ancestorProfiles.map((profile) => (
                <SelectItem key={profile.id} value={profile.id}>
                  {profile.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="upload"
        onValueChange={setSelectedMethod}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload size={16} />
            Upload Files
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <MessageSquare size={16} />
            Manual Entry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Text Files</CardTitle>
              <CardDescription>
                Upload text messages, emails, letters, or other written content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="messages" onValueChange={setSelectedSource}>
                <TabsList className="grid grid-cols-3 w-full mb-4">
                  <TabsTrigger value="messages">
                    <MessageSquare size={14} className="mr-2" />
                    Messages
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    <FileText size={14} className="mr-2" />
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="social">
                    <Facebook size={14} className="mr-2" />
                    Social Media
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="messages" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Upload Message Files
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Drag and drop text message exports or click to browse
                    </p>
                    <Input
                      type="file"
                      className="hidden"
                      id="message-upload"
                      onChange={handleFileUpload}
                      accept=".txt,.csv,.json"
                    />
                    <Button asChild>
                      <label htmlFor="message-upload">Select Files</label>
                    </Button>
                  </div>
                  {uploadProgress > 0 && (
                    <motion.div
                      className="w-full bg-gray-200 rounded-full h-2.5 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="bg-primary h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileText className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Upload Documents
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Drag and drop letters, emails, or other written documents
                    </p>
                    <Input
                      type="file"
                      className="hidden"
                      id="document-upload"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <Button asChild>
                      <label htmlFor="document-upload">Select Files</label>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-20 justify-center"
                      onClick={() => handleSocialImport("facebook")}
                    >
                      <Facebook size={24} />
                      Import from Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-20 justify-center"
                      onClick={() => handleSocialImport("twitter")}
                    >
                      <Twitter size={24} />
                      Import from Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 h-20 justify-center"
                      onClick={() => handleSocialImport("email")}
                    >
                      <Mail size={24} />
                      Import from Email
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Connect to social media accounts to import posts, messages,
                    and comments
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto"
                onClick={onComplete}
                disabled={uploadProgress > 0 && uploadProgress < 100}
              >
                Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manual Text Entry</CardTitle>
              <CardDescription>
                Enter text samples directly that represent your loved one's
                writing style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitManualText} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="sample-type" className="text-sm font-medium">
                    Sample Type
                  </label>
                  <Select defaultValue="message">
                    <SelectTrigger id="sample-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="message">Text Message</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="social">Social Media Post</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="text-content" className="text-sm font-medium">
                    Text Content
                  </label>
                  <Textarea
                    id="text-content"
                    placeholder="Enter the text exactly as your loved one would write it..."
                    className="min-h-[200px]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="context" className="text-sm font-medium">
                    Context (Optional)
                  </label>
                  <Input
                    id="context"
                    placeholder="Add context about when/why this was written"
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => {}}>
                    Add Another Sample
                  </Button>
                  <Button type="submit">Save Samples</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TextCollectionInterface;
