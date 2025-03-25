import React, { useState } from "react";
import Dashboard from "../dashboard/Dashboard";
import VoiceUploadInterface from "../voice/VoiceUploadInterface";
import TextCollectionInterface from "../text/TextCollectionInterface";
import ConversationInterface from "../conversation/ConversationInterface";
import SettingsPage from "../settings/SettingsPage";
import ProfileCreationForm from "../profile/ProfileCreationForm";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const DashboardHome = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showSettingsPage, setShowSettingsPage] = useState(false);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  
  // Sample ancestor profiles data
  const ancestorProfiles = [
    {
      id: "profile-1",
      name: "Sarah Johnson",
      relationship: "Grandmother",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "profile-2",
      name: "Robert Smith",
      relationship: "Grandfather",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    },
    {
      id: "profile-3",
      name: "James Wilson",
      relationship: "Uncle",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
  ];
  
  // User data
  const userData = {
    name: "Sarah Thompson",
    email: "sarah.thompson@example.com",
    planType: "premium" as const,
  };
  
  const handleVoiceUpload = () => {
    setActiveModal("voice-upload");
    setShowSettingsPage(false);
    setShowProfileCreation(false);
  };
  
  const handleTextUpload = () => {
    setActiveModal("text-upload");
    setShowSettingsPage(false);
    setShowProfileCreation(false);
  };
  
  const handleStartConversation = () => {
    setActiveModal("start-conversation");
    setShowSettingsPage(false);
    setShowProfileCreation(false);
  };
  
  const handleManageSettings = () => {
    setActiveModal(null);
    setShowSettingsPage(true);
    setShowProfileCreation(false);
  };
  
  const handleCloseModal = () => {
    setActiveModal(null);
  };
  
  const handleSelectProfile = (id: string) => {
    console.log(`Selected profile: ${id}`);
    setActiveModal("start-conversation");
  };
  
  const handleCreateProfile = () => {
    console.log("Create new profile clicked");
    setActiveModal(null);
    setShowSettingsPage(false);
    setShowProfileCreation(true);
  };

  const handleProfileCreated = (data: any) => {
    console.log("Profile created:", data);
    setShowProfileCreation(false);
    // Here you would typically add the new profile to ancestorProfiles
  };

  const handleLogout = () => {
    // Handle logout functionality
    console.log("User logged out");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header isLoggedIn userName={userData.name} onLogin={handleLogout} />
      
      <main className="flex-grow">
        {!showSettingsPage && !showProfileCreation && (
          <Dashboard
            userName={userData.name}
            profileCount={ancestorProfiles.length}
            ancestorProfiles={ancestorProfiles}
            onVoiceUpload={handleVoiceUpload}
            onTextUpload={handleTextUpload}
            onStartConversation={handleStartConversation}
            onManageSettings={handleManageSettings}
            onSelectProfile={handleSelectProfile}
            onCreateProfile={handleCreateProfile}
          />
        )}
        
        {showSettingsPage && (
          <SettingsPage 
            onClose={() => setShowSettingsPage(false)}
            userData={userData}
          />
        )}
        
        {showProfileCreation && (
          <div className="container mx-auto p-6">
            <button 
              onClick={() => setShowProfileCreation(false)}
              className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to Dashboard
            </button>
            <ProfileCreationForm 
              onComplete={handleProfileCreated}
              isOpen={true}
            />
          </div>
        )}
      </main>
      
      <Footer />
      
      {/* Modals */}
      {activeModal === "voice-upload" && (
        <VoiceUploadInterface 
          onClose={handleCloseModal} 
          ancestorProfiles={ancestorProfiles.map(p => ({ id: p.id, name: p.name }))}
        />
      )}
      
      {activeModal === "text-upload" && (
        <TextCollectionInterface 
          onClose={handleCloseModal} 
          ancestorProfiles={ancestorProfiles.map(p => ({ id: p.id, name: p.name }))}
          selectedProfileId={ancestorProfiles[0].id}
        />
      )}
      
      {activeModal === "start-conversation" && (
        <ConversationInterface 
          onClose={handleCloseModal}
          ancestorProfiles={ancestorProfiles}
          selectedProfileId={ancestorProfiles[0].id}
        />
      )}
    </div>
  );
};

export default DashboardHome;