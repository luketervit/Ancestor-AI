import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SendHorizontal, User, Mic, MicOff, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

interface StartConversationProps {
  onClose: () => void;
  ancestorProfiles: {
    id: string;
    name: string;
    relationship: string;
    imageUrl: string;
  }[];
  selectedProfileId?: string | null;
}

interface Message {
  id: string;
  sender: "user" | "ancestor";
  text: string;
  timestamp: Date;
  isVoice?: boolean;
}

const StartConversation = ({ onClose, ancestorProfiles = [], selectedProfileId }: StartConversationProps) => {
  const [selectedProfile, setSelectedProfile] = useState(selectedProfileId || "");
  const [profile, setProfile] = useState<(typeof ancestorProfiles)[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [conversationMode, setConversationMode] = useState<"text" | "voice">("text");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  
  // Set initial welcome message when a profile is selected
  useEffect(() => {
    if (selectedProfile && !messages.length) {
      const selected = ancestorProfiles.find(p => p.id === selectedProfile);
      if (selected) {
        setProfile(selected);
        
        // Add initial greeting from the ancestor
        setTimeout(() => {
          const greeting = {
            id: Math.random().toString(36).substring(2, 9),
            sender: "ancestor" as const,
            text: `Hello! It's wonderful to speak with you. What would you like to talk about today?`,
            timestamp: new Date()
          };
          setMessages([greeting]);
        }, 800);
      }
    }
  }, [selectedProfile, ancestorProfiles, messages.length]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: "user",
      text: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      const responses = [
        "I remember when you were little, you always loved to hear stories about my childhood.",
        "That reminds me of the time we went to the lake house in the summer of '82.",
        "Your question makes me think about how different things were back in my day.",
        "I always hoped you would ask me about that someday.",
        "Family has always been the most important thing to me, even after all these years.",
        "I wish I could give you a big hug right now. How are you really doing?",
        "I've always believed that the secret to a happy life is to focus on the simple joys.",
        "Let me tell you something I never got the chance to share with you when I was alive."
      ];
      
      const ancestorResponse = {
        id: Math.random().toString(36).substring(2, 9),
        sender: "ancestor" as const,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isVoice: conversationMode === "voice"
      };
      
      setMessages(prev => [...prev, ancestorResponse]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        // In a real app, you'd send this audio to a speech-to-text service
        // For demo purposes, we'll just simulate a random message
        
        const randomMessages = [
          "Tell me about your childhood.",
          "What was your favorite memory?",
          "Do you have any advice for me?",
          "What was life like when you were my age?",
          "Tell me about our family history."
        ];
        
        setInputText(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
        
        // Stop all tracks in the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access your microphone. Please check your permissions.");
    }
  };
  
  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const playVoiceResponse = (messageId: string) => {
    setIsPlaying(true);
    // In a real implementation, this would play the voice response
    setTimeout(() => setIsPlaying(false), 3000);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-2xl lg:max-w-4xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-4 py-2 border-b">
          <DialogTitle>
            {profile ? (
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={profile.imageUrl} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.relationship}</p>
                </div>
              </div>
            ) : (
              "Start a Conversation"
            )}
          </DialogTitle>
        </DialogHeader>
        
        {!profile ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
            <h3 className="text-xl font-medium">Select an ancestor to talk with</h3>
            <div className="w-full max-w-md">
              <Label htmlFor="profile-select" className="mb-2 block">Choose a profile</Label>
              <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a profile" />
                </SelectTrigger>
                <SelectContent>
                  {ancestorProfiles.map(profile => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.name} ({profile.relationship})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
              {ancestorProfiles.map(profile => (
                <Card 
                  key={profile.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center ${
                    selectedProfile === profile.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedProfile(profile.id)}
                >
                  <Avatar className="h-16 w-16 mb-3">
                    <AvatarImage src={profile.imageUrl} alt={profile.name} className="object-cover" />
                    <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h4 className="font-medium">{profile.name}</h4>
                  <p className="text-sm text-muted-foreground">{profile.relationship}</p>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/80">
              <div className="flex justify-end mb-2">
                <Tabs
                  value={conversationMode}
                  onValueChange={(value) => setConversationMode(value as "text" | "voice")}
                  className="w-auto"
                >
                  <TabsList className="grid grid-cols-2 w-[180px]">
                    <TabsTrigger value="text">Text Chat</TabsTrigger>
                    <TabsTrigger value="voice">Voice Chat</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        {message.sender === "ancestor" && (
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={profile.imageUrl}
                                alt={profile.name}
                              />
                              <AvatarFallback>
                                {profile.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">
                              {profile.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className={`text-sm ${message.sender === "user" ? "text-primary-foreground" : "text-foreground"}`}>
                        {message.text}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className={`text-xs ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                          {formatTime(message.timestamp)}
                        </span>
                        {message.isVoice && message.sender === "ancestor" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-2"
                            onClick={() => playVoiceResponse(message.id)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/30">
              <TabsContent value="text" className="mt-0" hidden={conversationMode !== "text"}>
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                    <SendHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="voice" className="mt-0" hidden={conversationMode !== "voice"}>
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="lg"
                    className="h-16 w-16 rounded-full flex items-center justify-center"
                    onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                  >
                    {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </Button>

                  {isRecording ? (
                    <div className="text-sm text-muted-foreground animate-pulse">
                      Recording... Speak to {profile.name}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Press the microphone button to start speaking
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {inputText && conversationMode === "voice" && (
                <div className="mt-2">
                  <div className="flex space-x-2">
                    <Input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Edit your transcribed message..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                      <SendHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StartConversation;