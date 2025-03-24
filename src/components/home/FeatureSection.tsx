import React from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MessageSquare,
  Heart,
  Upload,
  Brain,
  MessageCircle,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon = <Heart />,
  title = "Feature",
  description = "Description of this feature",
}: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: <Mic size={24} />,
      title: "Voice Preservation",
      description:
        "Upload voice recordings to capture the unique sound and speech patterns of your loved ones.",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Text Analysis",
      description:
        "Collect text messages and written communications to preserve their unique writing style and expressions.",
    },
    {
      icon: <Brain size={24} />,
      title: "AI Learning",
      description:
        "Our advanced AI analyzes voice and text patterns to create an authentic digital representation.",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Meaningful Conversations",
      description:
        "Have text or voice conversations with your loved ones that feel genuine and personal.",
    },
    {
      icon: <Heart size={24} />,
      title: "Preserve Memories",
      description:
        "Keep the essence of your loved ones alive through their authentic voice and messaging style.",
    },
    {
      icon: <Upload size={24} />,
      title: "Easy Contribution",
      description:
        "Simple interface for family members to contribute voice recordings and text samples.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            How Ancestor AI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Preserve the essence of your loved ones through our innovative AI
            technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="px-8 py-6 text-lg h-auto">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
