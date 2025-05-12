
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-white to-s7n-gray">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-s7n-darkGray leading-tight mb-6">
              Transform Your Life With AI-Powered Coaching
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Get personalized guidance, insights, and action plans tailored to your unique needs and goals.
            </p>
            <Button className="bg-s7n-purple hover:bg-s7n-darkPurple text-white text-lg px-8 py-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Start Your AI Discovery Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Take our 3-minute quiz and get your personalized coaching plan instantly.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 bg-s7n-lightPurple/20 rounded-full absolute top-4 left-4"></div>
              <div className="relative z-10 bg-white rounded-lg shadow-xl p-6">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500&q=80" 
                  alt="AI Coach helping someone" 
                  className="rounded-lg object-cover w-full h-64 md:h-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
