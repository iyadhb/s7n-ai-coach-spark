
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="w-full bg-white py-4 fixed top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-s7n-purple">S7N AI Coach</h1>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-s7n-darkGray hover:text-s7n-purple transition-colors">Home</Link>
          <Link to="/" className="text-s7n-darkGray hover:text-s7n-purple transition-colors">About</Link>
          <Link to="/" className="text-s7n-darkGray hover:text-s7n-purple transition-colors">Features</Link>
          <Button variant="outline" className="border-s7n-purple text-s7n-purple hover:bg-s7n-purple hover:text-white">
            Log in
          </Button>
          <Button className="bg-s7n-purple hover:bg-s7n-darkPurple text-white">
            Sign up
          </Button>
        </div>
        <div className="md:hidden">
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-s7n-darkGray">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
