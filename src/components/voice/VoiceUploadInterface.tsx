import React, { useState, useRef } from "react";
import { Mic, Upload, Play, Square, Save } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VoiceUploadInterfaceProps {
  ancestorProfiles?: Array<{ id: string; name: string }>;
  onUploadComplete?: (data: { profileId: string; audioUrl: string }) => void;
  onRecordComplete?: (data: { profileId: string; audioBlob: Blob }) => void;
}

const VoiceUploadInterface = ({
  ancestorProfiles = [
    { id: "1", name: "Grandma Sarah" },
    { id: "2", name: "Grandpa Joe" },
    { id: "3", name: "Uncle Robert" },
  ],
  onUploadComplete = () => {},
  onRecordComplete = () => {},
}: VoiceUploadInterfaceProps) => {
  const [selectedProfile, setSelectedProfile] = useState<string>(
    ancestorProfiles[0]?.id || "",
  );
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(true);
  const [processingStatus, setProcessingStatus] = useState<string>("");

  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleProfileChange = (value: string) => {
    setSelectedProfile(value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.includes("audio")) {
      setUploadedFile(file);
      // Create a URL for the audio file to preview
      const audioUrl = URL.createObjectURL(file);
      setRecordedAudio(audioUrl);
    }
  };

  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop all audio tracks
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const playRecording = () => {
    if (audioRef.current && recordedAudio) {
      audioRef.current.play();
    }
  };

  const saveRecording = () => {
    if (!selectedProfile || !recordedAudio) return;

    setProcessingStatus("Processing voice sample...");

    // Simulate processing delay
    setTimeout(() => {
      if (activeTab === "upload" && uploadedFile) {
        onUploadComplete({
          profileId: selectedProfile,
          audioUrl: recordedAudio,
        });
      } else if (activeTab === "record" && audioChunksRef.current.length > 0) {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        onRecordComplete({
          profileId: selectedProfile,
          audioBlob,
        });
      }

      setProcessingStatus("Voice sample saved successfully!");

      // Reset after saving
      setTimeout(() => {
        setRecordedAudio(null);
        setUploadedFile(null);
        setProcessingStatus("");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Voice Sample Collection
        </h2>
        <p className="text-gray-600">
          Upload or record voice samples to help preserve the unique voice
          patterns of your loved ones.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Ancestor Profile
        </label>
        <Select value={selectedProfile} onValueChange={handleProfileChange}>
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
      </div>

      <Tabs
        defaultValue="upload"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload" className="text-center">
            <Upload className="mr-2 h-4 w-4" />
            Upload Audio
          </TabsTrigger>
          <TabsTrigger value="record" className="text-center">
            <Mic className="mr-2 h-4 w-4" />
            Record Voice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {!uploadedFile ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className="h-12 w-12 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-600 mb-2">
                    Drag and drop an audio file or
                  </p>
                  <label className="inline-block">
                    <Input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button variant="outline" className="cursor-pointer">
                      Browse Files
                    </Button>
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Supported formats: MP3, WAV, M4A (Max size: 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-green-600 font-medium">
                  File uploaded: {uploadedFile.name}
                </p>
                {recordedAudio && (
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={playRecording}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <audio
                      ref={audioRef}
                      src={recordedAudio}
                      className="hidden"
                    />
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadedFile(null);
                    setRecordedAudio(null);
                  }}
                >
                  Remove File
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="record" className="space-y-4">
          <div className="border-2 border-gray-300 rounded-lg p-8 text-center">
            <div className="space-y-6">
              <div className="flex justify-center">
                <motion.div
                  animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="relative"
                >
                  <div
                    className={`h-24 w-24 rounded-full flex items-center justify-center ${isRecording ? "bg-red-100" : "bg-gray-100"}`}
                  >
                    <Mic
                      className={`h-12 w-12 ${isRecording ? "text-red-500" : "text-gray-500"}`}
                    />
                  </div>
                  {isRecording && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-red-400 opacity-20"
                      animate={{ scale: [1, 1.5], opacity: [0.2, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}
                </motion.div>
              </div>

              <div className="space-y-4">
                {!recordedAudio ? (
                  <div className="space-y-4">
                    {!isRecording ? (
                      <Button onClick={startRecording}>Start Recording</Button>
                    ) : (
                      <Button variant="destructive" onClick={stopRecording}>
                        <Square className="mr-2 h-4 w-4" />
                        Stop Recording
                      </Button>
                    )}
                    <p className="text-sm text-gray-500">
                      Speak clearly and naturally. Try to record at least 30
                      seconds of speech.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-green-600 font-medium">
                      Recording complete!
                    </p>
                    <div className="flex justify-center space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={playRecording}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <audio
                        ref={audioRef}
                        src={recordedAudio}
                        className="hidden"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setRecordedAudio(null);
                        audioChunksRef.current = [];
                      }}
                    >
                      Discard & Record Again
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {(uploadedFile || recordedAudio) && !isRecording && (
        <div className="mt-6 flex justify-center">
          <Button onClick={saveRecording} className="flex items-center">
            <Save className="mr-2 h-4 w-4" />
            Save Voice Sample
          </Button>
        </div>
      )}

      {processingStatus && (
        <div className="mt-4 text-center">
          <p
            className={`font-medium ${processingStatus.includes("success") ? "text-green-600" : "text-blue-600"}`}
          >
            {processingStatus}
          </p>
        </div>
      )}

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Voice Sample Collection</DialogTitle>
            <DialogDescription>
              Your voice samples help create a more authentic AI representation.
              The more samples you provide, the more accurate the voice
              synthesis will be.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Tips for best results:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>
                  Record in a quiet environment with minimal background noise
                </li>
                <li>Speak naturally as you would in everyday conversation</li>
                <li>
                  Try to provide at least 5 minutes of total voice samples
                </li>
                <li>
                  Include a variety of emotional tones and speech patterns
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowConfirmDialog(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VoiceUploadInterface;
