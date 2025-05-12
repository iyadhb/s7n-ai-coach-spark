
import React from 'react';

const FeatureSection: React.FC = () => {
  const features = [
    {
      title: "Personalized Coaching",
      description: "Get recommendations tailored to your unique personality, goals, and life situation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-s7n-purple">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: "Data-Driven Insights",
      description: "AI analysis of your patterns, strengths and growth areas for science-backed improvement.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-s7n-purple">
          <path d="M3 3v18h18" />
          <path d="M18 17V9" />
          <path d="M13 17V5" />
          <path d="M8 17v-3" />
        </svg>
      ),
    },
    {
      title: "Actionable Plans",
      description: "Step-by-step guidance with practical exercises and habits to achieve your goals.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-s7n-purple">
          <path d="M8 3v3a2 2 0 0 1-2 2H3" />
          <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
          <path d="M3 16h3a2 2 0 0 1 2 2v3" />
          <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-s7n-darkGray mb-4">
            Why Choose S7N AI Coach
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our advanced AI combines cutting-edge technology with proven coaching methods to help you achieve breakthrough results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-s7n-gray p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-md">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-s7n-darkGray">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
