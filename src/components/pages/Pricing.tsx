import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Check } from "lucide-react";
import { Button } from "../ui/button";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for you and your family's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Basic</h2>
                <p className="text-gray-600 mb-4">
                  For individuals starting their preservation journey
                </p>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <Button className="w-full">Get Started</Button>
              </div>

              <div className="space-y-4 flex-grow">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>1 ancestor profile</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Up to 30 minutes of voice uploads</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Up to 1,000 text samples</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>30 minutes of conversation time per month</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Basic customer support</span>
                </div>
              </div>
            </div>

            {/* Family Plan */}
            <div className="bg-indigo-50 p-8 rounded-lg shadow-md border border-indigo-200 flex flex-col relative">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                Most Popular
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Family</h2>
                <p className="text-gray-600 mb-4">
                  Perfect for preserving multiple family members
                </p>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">$24.99</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Get Started
                </Button>
              </div>

              <div className="space-y-4 flex-grow">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Up to 5 ancestor profiles</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Up to 2 hours of voice uploads per profile</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Up to 5,000 text samples per profile</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>2 hours of conversation time per month</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Priority customer support</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Family sharing with up to 10 members</span>
                </div>
              </div>
            </div>

            {/* Legacy Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex flex-col">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Legacy</h2>
                <p className="text-gray-600 mb-4">
                  For comprehensive family history preservation
                </p>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">$49.99</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <Button className="w-full">Get Started</Button>
              </div>

              <div className="space-y-4 flex-grow">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Unlimited ancestor profiles</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Unlimited voice uploads</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Unlimited text samples</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Unlimited conversation time</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>24/7 premium support</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Family sharing with unlimited members</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Advanced memory preservation tools</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  How accurate is the voice recreation?
                </h3>
                <p className="text-gray-700">
                  Our voice models achieve remarkable accuracy with sufficient
                  audio samples. The more recordings you provide, the more
                  authentic the voice recreation will be.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Can I upgrade or downgrade my plan?
                </h3>
                <p className="text-gray-700">
                  Yes, you can change your plan at any time. When upgrading,
                  you'll immediately gain access to additional features. When
                  downgrading, changes will take effect at the start of your
                  next billing cycle.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Is there a free trial available?
                </h3>
                <p className="text-gray-700">
                  Yes, we offer a 14-day free trial of our Family plan so you
                  can experience the full potential of Ancestor AI before
                  committing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  How do I share profiles with family members?
                </h3>
                <p className="text-gray-700">
                  You can invite family members via email through your
                  dashboard. They'll receive an invitation to create an account
                  and will have access to the profiles you've shared with them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
