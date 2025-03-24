import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";

interface CallInterfaceProps {
  familyMemberName?: string;
  familyMemberAvatar?: string;
  onEndCall?: () => void;
  initialCallState?: "connecting" | "active" | "ended";
  duration?: number;
}

const CallInterface = ({
  familyMemberName = "Grandfather Robert",
  familyMemberAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  onEndCall = () => {},
  initialCallState = "connecting",
  duration = 0,
}: CallInterfaceProps) => {
  const navigate = useNavigate();
  const [callState, setCallState] = useState(initialCallState);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(duration);
  const [transcript, setTranscript] = useState<string[]>([]);

  // Simulate call connection
  useEffect(() => {
    if (callState === "connecting") {
      const timer = setTimeout(() => {
        setCallState("active");
        addToTranscript(`${familyMemberName}: Hello? Is that you?`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [callState, familyMemberName]);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (callState === "active") {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState]);

  // Simulate conversation
  useEffect(() => {
    if (callState === "active") {
      const responses = [
        "I've been thinking about those fishing trips we used to take. Remember that big bass you caught at Lake Wilson?",
        "Your grandmother would have loved to see how the family has grown. She always wanted a big family gathering.",
        "The secret to my apple pie was always using Granny Smith apples and a touch of cinnamon. Your grandmother taught me that.",
        "I'm so proud of what you've accomplished. You've always had that determination, even as a child.",
        "The most important thing in life is to be kind. Everything else follows from that. I learned that the hard way.",
      ];

      const timers = [];

      // Add responses at intervals
      responses.forEach((response, index) => {
        const timer = setTimeout(
          () => {
            if (callState === "active") {
              addToTranscript(`${familyMemberName}: ${response}`);
            }
          },
          (index + 1) * 12000,
        ); // Every 12 seconds

        timers.push(timer);
      });

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [callState, familyMemberName]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    setCallState("ended");
    onEndCall();
    // Navigate back to family member page after call ends
    setTimeout(() => navigate("/family-member"), 1500);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  const addToTranscript = (message: string) => {
    setTranscript((prev) => [...prev, message]);
  };

  const [userMessage, setUserMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (userMessage.trim() === "") return;

    // Add user message to transcript
    addToTranscript(`You: ${userMessage}`);
    setUserMessage("");

    // Simulate response after a short delay
    setTimeout(() => {
      if (callState === "active") {
        addToTranscript(
          `${familyMemberName}: That's interesting. Tell me more about that.`,
        );
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto w-full p-4 flex flex-col">
        {/* Call Status Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-4 border-2 border-primary">
              <AvatarImage src={familyMemberAvatar} alt={familyMemberName} />
              <AvatarFallback>
                {familyMemberName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">{familyMemberName}</h2>
              <p className="text-sm text-gray-500">
                {callState === "connecting"
                  ? "Connecting..."
                  : callState === "active"
                    ? `Call time: ${formatTime(callDuration)}`
                    : "Call ended"}
              </p>
            </div>
          </div>

          {callState === "ended" ? (
            <Button
              onClick={() => navigate("/family-member")}
              variant="outline"
            >
              Return
            </Button>
          ) : (
            <Button
              onClick={handleEndCall}
              variant="destructive"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <PhoneOff size={20} />
            </Button>
          )}
        </div>

        {/* Conversation Transcript */}
        <Card className="flex-1 mb-4 overflow-hidden flex flex-col">
          <CardContent className="p-4 flex-1 overflow-y-auto space-y-4">
            {transcript.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                {callState === "connecting"
                  ? "Connecting to call..."
                  : "Your conversation will appear here"}
              </div>
            ) : (
              transcript.map((message, index) => {
                const isAncestor = message.startsWith(familyMemberName);
                return (
                  <div
                    key={index}
                    className={`flex ${isAncestor ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        isAncestor
                          ? "bg-gray-100 text-gray-800"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {message}
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Call Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
          {/* Message Input */}
          {callState === "active" && (
            <form onSubmit={handleSendMessage} className="mb-4 flex gap-2">
              <Input
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          )}

          {/* Call Controls */}
          <div className="flex justify-center space-x-6">
            <Button
              onClick={toggleMute}
              variant={isMuted ? "default" : "outline"}
              size="icon"
              className="rounded-full h-12 w-12"
              disabled={callState !== "active"}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </Button>

            {callState === "active" && (
              <Button
                onClick={handleEndCall}
                variant="destructive"
                size="icon"
                className="rounded-full h-12 w-12"
              >
                <PhoneOff size={20} />
              </Button>
            )}

            <Button
              onClick={toggleSpeaker}
              variant={isSpeakerOn ? "default" : "outline"}
              size="icon"
              className="rounded-full h-12 w-12"
              disabled={callState !== "active"}
            >
              {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallInterface;
