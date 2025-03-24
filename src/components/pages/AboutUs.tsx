import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Heart, Shield, Users, MessageCircle } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About Ancestor AI</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Preserving memories and connecting generations through thoughtful
              technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Ancestor AI was born from a deeply personal experience. Our
                founder, Sarah Chen, lost her grandmother in 2019 and found
                herself wishing she could hear her voice and wisdom again. This
                longing sparked the idea for a platform that could preserve not
                just memories, but the essence of our loved ones.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2021, we've assembled a team of AI researchers, voice
                technology experts, and people who share the mission of helping
                families maintain connections across generations and beyond
                physical limitations.
              </p>
              <p className="text-lg text-gray-700">
                Today, Ancestor AI serves thousands of families worldwide,
                helping them preserve and connect with the voices and
                personalities of their loved ones in a respectful, authentic
                way.
              </p>
            </div>

            <div className="bg-gray-100 p-8 rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Team gathering"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-700">
                We believe that everyone deserves to have their story preserved
                and shared with future generations. Our mission is to use
                technology to strengthen family bonds and ensure that wisdom,
                stories, and connections transcend physical limitations.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Our Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Heart className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-gray-700">
                  We approach our work with deep empathy, understanding the
                  emotional significance of preserving loved ones' memories.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Shield className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Respect</h3>
                <p className="text-gray-700">
                  We handle personal memories with the utmost respect and
                  dignity, ensuring ethical use of our technology.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Connection</h3>
                <p className="text-gray-700">
                  We believe in strengthening bonds between generations and
                  helping families maintain meaningful connections.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MessageCircle className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                <p className="text-gray-700">
                  We strive to capture and preserve the authentic essence of
                  each individual's voice, personality, and communication style.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Our Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                  alt="Sarah Chen"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Sarah Chen</h3>
                <p className="text-gray-600 mb-2">Founder & CEO</p>
                <p className="text-gray-700">
                  Former AI researcher with a passion for using technology to
                  preserve family connections.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                  alt="Michael Rodriguez"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Michael Rodriguez</h3>
                <p className="text-gray-600 mb-2">CTO</p>
                <p className="text-gray-700">
                  Speech recognition expert with 15 years of experience in voice
                  technology development.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha"
                  alt="Aisha Johnson"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">Aisha Johnson</h3>
                <p className="text-gray-600 mb-2">Head of Research</p>
                <p className="text-gray-700">
                  PhD in Computational Linguistics with a focus on natural
                  language processing and voice synthesis.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-lg text-center">
            <h2 className="text-3xl font-semibold mb-4">Join Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              We're always looking for passionate individuals who share our
              vision of preserving memories and connecting generations.
            </p>
            <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              View Career Opportunities
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
