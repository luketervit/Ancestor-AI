import React from "react";
import { Heart, Mail, Github, Twitter } from "lucide-react";
import { Button } from "../ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Ancestor AI
            </h3>
            <p className="text-sm text-slate-600">
              Preserving the essence of loved ones through AI, allowing families
              to continue conversations with deceased family members.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-medium text-slate-900">Features</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Voice Preservation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Text Analysis
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Conversation Interface
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Family Sharing
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-medium text-slate-900">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Data Protection
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-medium text-slate-900">Contact</h4>
            <p className="text-sm text-slate-600">
              Have questions or need support? Reach out to our team.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Mail size={16} />
              <span>Contact Us</span>
            </Button>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-600">
            &copy; {currentYear} Ancestor AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-600 flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for
            families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
