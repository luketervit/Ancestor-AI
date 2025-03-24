import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogIn } from "lucide-react";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

const Header = ({
  isLoggedIn = false,
  userName = "Guest",
  onLogin = () => {},
  onLogout = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                A
              </span>
            </div>
            <span className="text-2xl font-semibold text-foreground">
              Ancestor AI
            </span>
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/how-it-works"
            className="text-foreground hover:text-primary transition-colors"
          >
            How It Works
          </Link>
          <Link
            to="/pricing"
            className="text-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="text-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User size={18} />
                  <span>{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={onLogin} asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/login?tab=register">
                  <LogIn className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link to="/" className="w-full">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/how-it-works" className="w-full">
                  How It Works
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/pricing" className="w-full">
                  Pricing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/about" className="w-full">
                  About Us
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="mt-2">
                {isLoggedIn ? (
                  <Link to="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="w-full">
                    Log In
                  </Link>
                )}
              </DropdownMenuItem>

              {isLoggedIn ? (
                <>
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Link to="/login?tab=register" className="w-full">
                    <Button className="w-full">
                      <LogIn className="mr-2 h-4 w-4" /> Sign Up
                    </Button>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
