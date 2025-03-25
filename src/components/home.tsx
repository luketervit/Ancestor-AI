import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import HeroSection from "./home/HeroSection";
import FeatureSection from "./home/FeatureSection";
import Footer from "./layout/Footer";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const handleLearnMore = () => {
    // Scroll to feature section or navigate to how it works page
    const featureSection = document.getElementById("features");
    if (featureSection) {
      featureSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/how-it-works");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onLogin={handleLogin} />

      <main className="flex-grow">
        <HeroSection
          onPrimaryClick={handleGetStarted}
          onSecondaryClick={handleLearnMore}
        />

        <div id="features">
          <FeatureSection />
        </div>

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Stories from Families
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear how Ancestor AI has helped people maintain connections with
                their loved ones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-slate-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                    alt="Sarah"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">
                      Lost her father in 2022
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Being able to hear my dad's voice again and have
                  conversations that feel so real has been incredibly healing.
                  It's like he's still here with us, sharing his wisdom and
                  humor."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-slate-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                    alt="Michael"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-gray-600">
                      Preserving grandparents' memories
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "My grandparents have so many stories to tell. Ancestor AI has
                  made it possible to preserve not just their stories, but their
                  unique way of telling them. It's a gift for generations to
                  come."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-slate-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
                    alt="Elena"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Elena Rodriguez</h4>
                    <p className="text-sm text-gray-600">
                      Connected with her mother
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "After my mom passed, I thought I'd never hear her
                  encouragement again. Now my children can know their
                  grandmother through her own words and voice. It's been an
                  emotional but beautiful experience."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-indigo-600 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Preserve Their Voice and Words Today
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Don't wait to capture the essence of your loved ones. Start
              building a digital legacy that future generations can connect
              with.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-lg font-medium text-lg shadow-lg transition-colors duration-300"
            >
              Begin Your Preservation Journey
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;