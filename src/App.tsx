import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import AboutUs from "./components/pages/AboutUs";
import HowItWorks from "./components/pages/HowItWorks";
import Pricing from "./components/pages/Pricing";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import SettingsPage from "./components/settings/SettingsPage";
import FamilyMemberPage from "./components/family/FamilyMemberPage";
import CallInterface from "./components/calling/CallInterface";
import ProfileCreationForm from "./components/profile/ProfileCreationForm";
import VoiceUploadInterface from "./components/voice/VoiceUploadInterface";
import TextCollectionInterface from "./components/text/TextCollectionInterface";
import ConversationInterface from "./components/conversation/ConversationInterface";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/family-member" element={<FamilyMemberPage />} />
          <Route path="/call" element={<CallInterface />} />
          <Route path="/create-profile" element={<ProfileCreationForm />} />
          <Route path="/voice-upload" element={<VoiceUploadInterface />} />
          <Route path="/text-upload" element={<TextCollectionInterface />} />
          <Route path="/conversation" element={<ConversationInterface />} />

          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
