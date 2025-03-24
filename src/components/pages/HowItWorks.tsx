import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            How Ancestor AI Works
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-indigo-600 text-2xl font-bold">1</span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Create an Ancestor Profile
              </h2>
              <p className="text-gray-700">
                Start by creating a profile for your loved one. Add their name,
                photos, and basic information to help personalize their digital
                presence. This forms the foundation for preserving their memory.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-indigo-600 text-2xl font-bold">2</span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Upload Voice Recordings
              </h2>
              <p className="text-gray-700">
                Contribute audio samples of your loved one speaking. Our AI
                analyzes these recordings to learn their unique voice patterns,
                tone, and speech mannerisms. The more samples you provide, the
                more authentic the voice recreation will be.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-indigo-600 text-2xl font-bold">3</span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Collect Text Samples
              </h2>
              <p className="text-gray-700">
                Gather text messages, emails, letters, or social media posts
                written by your loved one. Our system analyzes their writing
                style, vocabulary, and communication patterns to capture their
                unique way of expressing themselves.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-indigo-600 text-2xl font-bold">4</span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center">
                AI Processing
              </h2>
              <p className="text-gray-700">
                Our advanced AI models process all the collected data to create
                a digital representation of your loved one's communication
                style. This includes their voice characteristics, word choices,
                and conversational patterns.
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-lg mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Have Meaningful Conversations
            </h2>
            <p className="text-xl text-center mb-8">
              Once your loved one's profile is complete, you can start having
              conversations through text or voice chat. Our AI generates
              responses that sound and feel authentic, allowing you to maintain
              a connection with your loved one's memory.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">
                  Text Conversations
                </h3>
                <p className="text-gray-700">
                  Exchange messages that reflect your loved one's writing style
                  and personality.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">
                  Voice Interactions
                </h3>
                <p className="text-gray-700">
                  Hear responses in your loved one's voice, recreated with
                  remarkable accuracy.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">
                  Memory Preservation
                </h3>
                <p className="text-gray-700">
                  Share stories and memories that can be passed down to future
                  generations.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-6">
              Ready to Preserve Your Loved One's Memory?
            </h2>
            <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 rounded-lg font-medium text-lg shadow-lg transition-colors duration-300">
              Create Your First Profile
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
