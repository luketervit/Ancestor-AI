import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

interface ProfileCardProps {
  id: string;
  name: string;
  relationship: string;
  imageUrl: string;
  onSelect: (id: string) => void;
}

const ProfileCard = ({
  id = "profile-1",
  name = "Sarah Johnson",
  relationship = "Grandmother",
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  onSelect = () => {},
}: ProfileCardProps) => {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md bg-white"
      onClick={() => onSelect(id)}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-muted-foreground text-sm">{relationship}</p>
      </CardContent>
    </Card>
  );
};

const NewProfileCard = ({ onClick = () => {} }) => {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md border-dashed border-2 flex flex-col items-center justify-center aspect-square bg-white"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center h-full p-4 text-center">
        <PlusCircle className="h-12 w-12 text-muted-foreground mb-2" />
        <h3 className="font-medium text-lg">Create New Profile</h3>
        <p className="text-muted-foreground text-sm">
          Add a loved one to preserve their memory
        </p>
      </CardContent>
    </Card>
  );
};

interface ProfileGridProps {
  profiles?: ProfileCardProps[];
  onSelectProfile?: (id: string) => void;
  onCreateProfile?: () => void;
}

const ProfileGrid = ({
  profiles = [
    {
      id: "profile-1",
      name: "Sarah Johnson",
      relationship: "Grandmother",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      onSelect: () => {},
    },
    {
      id: "profile-2",
      name: "Robert Smith",
      relationship: "Grandfather",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      onSelect: () => {},
    },
    {
      id: "profile-3",
      name: "James Wilson",
      relationship: "Uncle",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      onSelect: () => {},
    },
  ],
  onSelectProfile = (id: string) => console.log(`Selected profile: ${id}`),
  onCreateProfile = () => console.log("Create new profile clicked"),
}: ProfileGridProps) => {
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Ancestor Profiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            {...profile}
            onSelect={onSelectProfile}
          />
        ))}
        <NewProfileCard onClick={onCreateProfile} />
      </div>
    </div>
  );
};

export default ProfileGrid;
