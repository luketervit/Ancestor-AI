import React, { useState } from "react";
import { Mic, Send, Volume2, VolumeX, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ancestor";
  timestamp: Date;
  isVoice?: boolean;
}

interface ConversationInterfaceProps {
  ancestorProfiles?: Array<{
    id: string;
    name: string;
    imageUrl?: string;
  }>;
  selectedAncestorId?: string;
  onSelectAncestor?: (id: string) => void;
  messages?: Message[];
  onSendMessage?: (message: string, isVoice: boolean) => void;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({
  ancestorProfiles = [
    {
      id: "1",
      name: "Grandma Sarah",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "2",
      name: "Grandpa Joe",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=joe",
    },
    {
      id: "3",
      name: "Uncle Robert",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    },
  ],
  selectedAncestorId = "1",
  onSelectAncestor = () => {},
  messages = [
    {
      id: "1",
      text: "Hello dear, how are you doing today?",
      sender: "ancestor",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      text: "I'm doing well, thanks for asking! How about you?",
      sender: "user",
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: "3",
      text: "Oh, I'm just fine. Remember that apple pie recipe I used to make? Would you like me to share it with you?",
      sender: "ancestor",
      timestamp: new Date(Date.now() - 2400000),
    },
    {
      id: "4",
      text: "Yes, I would love that! I've been trying to recreate it for years.",
      sender: "user",
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "5",
      text: "The secret is to use Granny Smith apples and a touch of lemon zest. I'll send you the full recipe soon.",
      sender: "ancestor",
      timestamp: new Date(Date.now() - 1200000),
    },
  ] as Message[],
  onSendMessage = () => {},
}) => {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [conversationMode, setConversationMode] = useState<"text" | "voice">(
    "text",
  );

  const selectedAncestor =
    ancestorProfiles.find((profile) => profile.id === selectedAncestorId) ||
    ancestorProfiles[0];

  const handleSendMessage = () => {
    if (inputText.trim()) {
      onSendMessage(inputText, false);
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop voice recording
  };

  const playVoiceResponse = (messageId: string) => {
    setIsPlaying(true);
    // In a real implementation, this would play the voice response
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={selectedAncestor.imageUrl}
              alt={selectedAncestor.name}
            />
            <AvatarFallback>{selectedAncestor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <Select value={selectedAncestorId} onValueChange={onSelectAncestor}>
              <SelectTrigger className="w-[180px] border-none bg-transparent shadow-none focus:ring-0">
                <SelectValue placeholder="Select an ancestor" />
              </SelectTrigger>
              <SelectContent>
                {ancestorProfiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Connected to memories
            </p>
          </div>
        </div>
        <Tabs
          value={conversationMode}
          onValueChange={(value) =>
            setConversationMode(value as "text" | "voice")
          }
        >
          <TabsList className="grid grid-cols-2 w-[180px]">
            <TabsTrigger value="text">Text Chat</TabsTrigger>
            <TabsTrigger value="voice">Voice Chat</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-background/80">
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
                className={`max-w-[80%] ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
              >
                <div className="flex justify-between items-start mb-1">
                  {message.sender === "ancestor" && (
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={selectedAncestor.imageUrl}
                          alt={selectedAncestor.name}
                        />
                        <AvatarFallback>
                          {selectedAncestor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium">
                        {selectedAncestor.name}
                      </span>
                    </div>
                  )}
                  {message.isVoice && message.sender === "ancestor" && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-2"
                            onClick={() => playVoiceResponse(message.id)}
                          >
                            {isPlaying ? (
                              <Volume2 className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Play voice message</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <p
                  className={`text-sm ${message.sender === "user" ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {message.text}
                </p>
                <div className="flex justify-end mt-1">
                  <span className="text-xs opacity-70">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-muted/30">
        <TabsContent value="text" className="mt-0">
          <div className="flex space-x-2">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="min-h-[60px] flex-1 resize-none"
            />
            <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="voice" className="mt-0">
          <div className="flex items-center justify-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    size="lg"
                    className="h-16 w-16 rounded-full"
                    onClick={toggleRecording}
                  >
                    <Mic className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isRecording ? "Stop recording" : "Start recording"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {isRecording && (
              <div className="text-sm text-muted-foreground animate-pulse">
                Recording... Speak to {selectedAncestor.name}
              </div>
            )}

            {!isRecording && (
              <div className="text-sm text-muted-foreground">
                Press the microphone button to start speaking
              </div>
            )}
          </div>
        </TabsContent>
      </div>
    </div>
  );
};

export default ConversationInterface;
