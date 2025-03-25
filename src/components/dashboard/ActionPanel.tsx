import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MessageSquare, Play, Settings } from "lucide-react";

interface ActionPanelProps {
  onVoiceUpload?: () => void;
  onTextUpload?: () => void;
  onStartConversation?: () => void;
  onManageSettings?: () => void;
}

const ActionPanel = ({
  onVoiceUpload = () => {},
  onTextUpload = () => {},
  onStartConversation = () => {},
  onManageSettings = () => {},
}: ActionPanelProps) => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ActionButton
          icon={<Mic className="mr-2 h-5 w-5" />}
          label="Upload Voice"
          description="Add voice recordings to enhance the AI model"
          onClick={onVoiceUpload}
          variant="default"
        />

        <ActionButton
          icon={<MessageSquare className="mr-2 h-5 w-5" />}
          label="Add Text"
          description="Provide text samples to improve messaging style"
          onClick={onTextUpload}
          variant="secondary"
        />

        <ActionButton
          icon={<Play className="mr-2 h-5 w-5" />}
          label="Start Conversation"
          description="Begin interacting with an ancestor profile"
          onClick={onStartConversation}
          variant="outline"
        />

        <ActionButton
          icon={<Settings className="mr-2 h-5 w-5" />}
          label="Settings"
          description="Manage your account and preferences"
          onClick={onManageSettings}
          variant="ghost"
        />
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const ActionButton = ({
  icon,
  label,
  description,
  onClick,
  variant = "default",
}: ActionButtonProps) => {
  const handleClick = () => {
    console.log(`Button clicked: ${label}`);
    if (onClick) onClick();
  };

  return (
    <div className="flex flex-col h-full">
      <Button
        variant={variant}
        onClick={handleClick}
        className="w-full justify-start p-4 h-auto mb-2 text-left hover:scale-105 transition-all focus:ring-2 focus:ring-primary"
      >
        <div className="flex items-center">
          {icon}
          <span>{label}</span>
        </div>
      </Button>
      <p className="text-sm text-gray-500 px-1">{description}</p>
    </div>
  );
};

export default ActionPanel;