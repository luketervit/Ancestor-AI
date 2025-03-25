import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Mic, Upload, FileAudio, X, Play, Pause, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

interface VoiceUploadProps {
  onClose: () => void;
  ancestorProfiles: {
    id: string;
    name: string;
  }[];
  selectedProfileId?: string | null;
}

const VoiceUpload = ({ onClose, ancestorProfiles = [], selectedProfileId }: VoiceUploadProps) => {
  const [recordings, setRecordings] = useState<{ blob: Blob; url: string; name: string }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(selectedProfileId || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<"record" | "upload">("upload");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const recordingName = `Recording ${recordings.length + 1} (${timestamp})`;
        
        setRecordings([...recordings, { 
          blob: audioBlob, 
          url: audioUrl, 
          name: recordingName 
        }]);
        
        // Stop all tracks in the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start the timer to track recording duration
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access your microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newRecordings = [...recordings];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const audioUrl = URL.createObjectURL(file);
      newRecordings.push({
        blob: file,
        url: audioUrl,
        name: file.name
      });
    }
    
    setRecordings(newRecordings);
  };

  const removeRecording = (index: number) => {
    const newRecordings = [...recordings];
    
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newRecordings[index].url);
    
    newRecordings.splice(index, 1);
    setRecordings(newRecordings);
  };

  const playRecording = (url: string) => {
    if (audioRef.current) {
      if (isPlaying === url) {
        audioRef.current.pause();
        setIsPlaying(null);
      } else {
        audioRef.current.src = url;
        audioRef.current.play();
        setIsPlaying(url);
        
        audioRef.current.onended = () => {
          setIsPlaying(null);
        };
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleUpload = () => {
    if (recordings.length === 0) {
      alert("Please record or upload at least one audio file");
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
    }, 200);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Voice Recordings</DialogTitle>
          <DialogDescription>
            Add voice samples to improve the AI model's voice synthesis.
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
              
              <div className="flex space-x-2 mb-2">
                <Button 
                  variant={activeTab === "upload" ? "default" : "outline"}
                  onClick={() => setActiveTab("upload")} 
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Audio
                </Button>
                <Button 
                  variant={activeTab === "record" ? "default" : "outline"}
                  onClick={() => setActiveTab("record")} 
                  className="flex-1"
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Record Voice
                </Button>
              </div>
              
              {activeTab === "record" ? (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Record Voice Sample</CardTitle>
                    <CardDescription>
                      Read a passage or speak naturally for best results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isRecording ? (
                      <div className="flex flex-col items-center space-y-4">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="relative"
                        >
                          <div className="w-full bg-red-100 p-4 rounded-md flex items-center justify-between">
                            <Mic className="h-6 w-6 text-red-500 animate-pulse" />
                            <span className="text-red-500 font-medium">Recording... {formatTime(recordingTime)}</span>
                          </div>
                          <motion.div
                            className="absolute inset-0 rounded-md bg-red-400 opacity-20"
                            animate={{ scale: [1, 1.03], opacity: [0.2, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          />
                        </motion.div>
                        <Button onClick={stopRecording} variant="destructive">
                          Stop Recording
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={startRecording} className="w-full" size="lg">
                        <Mic className="mr-2 h-5 w-5" />
                        Start Recording
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="upload">Upload audio files</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="upload" 
                      type="file" 
                      accept="audio/*" 
                      onChange={handleFileUpload} 
                      multiple 
                      className="flex-1"
                    />
                    <Label 
                      htmlFor="upload" 
                      className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      Browse
                    </Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: MP3, WAV, M4A (max 10MB per file)
                  </p>
                </div>
              )}
              
              {recordings.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Your Recordings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {recordings.map((recording, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between bg-muted p-3 rounded-md"
                        >
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <FileAudio className="h-5 w-5 flex-shrink-0" />
                            <span className="text-sm truncate">{recording.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => playRecording(recording.url)}
                            >
                              {isPlaying === recording.url ? 
                                <Pause className="h-4 w-4" /> : 
                                <Play className="h-4 w-4" />
                              }
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeRecording(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Uploading recordings...</Label>
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
              <Button onClick={handleUpload} disabled={isUploading || recordings.length === 0 || !selectedProfile}>
                {isUploading ? "Uploading..." : "Upload Recordings"}
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
              {recordings.length} recording{recordings.length !== 1 ? 's' : ''} successfully uploaded.
              The AI model will now process these recordings to improve voice synthesis.
            </p>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        )}
        
        {/* Hidden audio element for playback */}
        <audio ref={audioRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default VoiceUpload;