import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Mail, MessageSquare, X, CheckCircle, Facebook, Twitter } from "lucide-react";

interface TextUploadProps {
  onClose: () => void;
  ancestorProfiles: {
    id: string;
    name: string;
  }[];
  selectedProfileId?: string | null;
}

const TextUpload = ({ onClose, ancestorProfiles = [], selectedProfileId }: TextUploadProps) => {
  const [selectedProfile, setSelectedProfile] = useState(selectedProfileId || "");
  const [textSamples, setTextSamples] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [emailContent, setEmailContent] = useState({
    subject: "",
    body: ""
  });
  const [messageContent, setMessageContent] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("manual");
  const [activeSource, setActiveSource] = useState("messages");
  const [fileUploads, setFileUploads] = useState<{
    name: string;
    size: string;
    type: string;
  }[]>([]);

  const handleAddText = () => {
    if (!currentText.trim()) return;
    setTextSamples([...textSamples, currentText.trim()]);
    setCurrentText("");
  };

  const handleAddEmail = () => {
    if (!emailContent.subject.trim() && !emailContent.body.trim()) return;
    
    const emailText = `Subject: ${emailContent.subject}\n\n${emailContent.body}`;
    setTextSamples([...textSamples, emailText]);
    setEmailContent({ subject: "", body: "" });
  };

  const handleAddMessage = () => {
    if (!messageContent.trim()) return;
    setTextSamples([...textSamples, messageContent.trim()]);
    setMessageContent("");
  };

  const handleRemoveSample = (index: number) => {
    const newSamples = [...textSamples];
    newSamples.splice(index, 1);
    setTextSamples(newSamples);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newUploads = [...fileUploads];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const sizeInKB = Math.round(file.size / 1024);
      const sizeText = sizeInKB > 1024 
        ? `${(sizeInKB / 1024).toFixed(2)} MB` 
        : `${sizeInKB} KB`;
      
      newUploads.push({
        name: file.name,
        size: sizeText,
        type: file.type
      });
      
      // For demo purposes, we'll add the file name as a sample
      // In a real app, you would parse the file content
      if (file.type.includes("text") || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
        setTextSamples([...textSamples, `Content from file: ${file.name}`]);
      }
    }
    
    setFileUploads(newUploads);
  };

  const handleRemoveFile = (index: number) => {
    const newUploads = [...fileUploads];
    newUploads.splice(index, 1);
    setFileUploads(newUploads);
  };

  const handleUpload = () => {
    if (textSamples.length === 0 && fileUploads.length === 0) {
      alert("Please add at least one text sample or upload a file");
      return;
    }
    
    if (!selectedProfile) {
      alert("Please select an ancestor profile");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadComplete(true);
      }
    }, 150);
  };

  const handleSocialImport = (platform: string) => {
    // Handle social media import
    console.log(`Importing from ${platform}`);
    setTextSamples([...textSamples, `Content imported from ${platform}`]);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Text Samples</DialogTitle>
          <DialogDescription>
            Provide text examples to help the AI learn communication style and personality traits.
          </DialogDescription>
        </DialogHeader>
        
        {!uploadComplete ? (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile">Select Ancestor Profile</Label>
                <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a profile" />
                  </SelectTrigger>
                  <SelectContent>
                    {ancestorProfiles.map(profile => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="manual" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Enter Text
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload Files
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="manual" className="space-y-4">
                  <Tabs defaultValue="free-text">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="free-text">Free Text</TabsTrigger>
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="message">Message</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="free-text" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="text-input">Add a writing sample</Label>
                        <Textarea 
                          id="text-input"
                          placeholder="Enter any text, letter, journal entry, etc."
                          value={currentText}
                          onChange={e => setCurrentText(e.target.value)}
                          rows={5}
                        />
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleAddText}
                            disabled={!currentText.trim()}
                          >
                            Add Sample
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="email" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-subject">Email Subject</Label>
                        <Input
                          id="email-subject"
                          placeholder="Enter email subject"
                          value={emailContent.subject}
                          onChange={e => setEmailContent({...emailContent, subject: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email-body">Email Body</Label>
                        <Textarea 
                          id="email-body"
                          placeholder="Enter email content"
                          value={emailContent.body}
                          onChange={e => setEmailContent({...emailContent, body: e.target.value})}
                          rows={5}
                        />
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleAddEmail}
                            disabled={!emailContent.subject.trim() && !emailContent.body.trim()}
                          >
                            Add Email
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="message" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="message-content">Text Message</Label>
                        <Textarea 
                          id="message-content"
                          placeholder="Enter text message content"
                          value={messageContent}
                          onChange={e => setMessageContent(e.target.value)}
                          rows={3}
                        />
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleAddMessage}
                            disabled={!messageContent.trim()}
                          >
                            Add Message
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-4">
                  <Tabs defaultValue={activeSource} onValueChange={setActiveSource}>
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
                    </TabsContent>
                  </Tabs>
                  
                  {fileUploads.length > 0 && (
                    <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                      {fileUploads.map((file, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between bg-muted p-2 rounded-md"
                        >
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <FileText className="h-4 w-4 flex-shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-sm truncate font-medium">{file.name}</span>
                              <span className="text-xs text-muted-foreground">{file.size}</span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              {textSamples.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Text Samples ({textSamples.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {textSamples.map((sample, index) => (
                        <div 
                          key={index} 
                          className="flex items-start justify-between bg-muted p-3 rounded-md"
                        >
                          <div className="flex items-start space-x-2 flex-1 min-w-0 mr-2">
                            {sample.startsWith("Subject:") ? (
                              <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            ) : sample.startsWith("Content from file:") ? (
                              <FileText className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            ) : (
                              <MessageSquare className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            )}
                            <p className="text-sm overflow-hidden text-ellipsis line-clamp-2">
                              {sample}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveSample(index)}
                            className="flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Uploading text samples...</Label>
                    <span className="text-xs font-medium">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </div>
            
            <DialogFooter className="flex space-x-2 justify-end">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpload} 
                disabled={isUploading || (textSamples.length === 0 && fileUploads.length === 0) || !selectedProfile}
              >
                {isUploading ? "Uploading..." : "Upload Samples"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium">Upload Complete!</h3>
            <p className="text-muted-foreground">
              {textSamples.length} text sample{textSamples.length !== 1 ? 's' : ''} and {fileUploads.length} file{fileUploads.length !== 1 ? 's' : ''} successfully uploaded.
              The AI model will now process these samples to learn communication style and personality traits.
            </p>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TextUpload;