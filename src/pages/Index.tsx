
import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        
        {/* CTA Section */}
        <section className="py-16 bg-s7n-purple">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Transformation?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Take the first step toward a better you with our AI-powered coaching system designed to help you achieve your goals.
            </p>
            <Button className="bg-white hover:bg-gray-100 text-s7n-purple hover:text-s7n-darkPurple text-lg px-8 py-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Start Your AI Discovery Quiz
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
