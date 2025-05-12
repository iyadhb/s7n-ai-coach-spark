
import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "Take the AI Discovery Quiz",
      description: "Answer a few questions about your goals, challenges, and current situation.",
    },
    {
      number: "2",
      title: "Receive Your Coaching Analysis",
      description: "Our AI analyzes your responses and generates personalized insights and recommendations.",
    },
    {
      number: "3",
      title: "Follow Your Custom Plan",
      description: "Get a step-by-step action plan tailored to help you achieve your specific goals.",
    },
    {
      number: "4",
      title: "Track Progress & Adapt",
      description: "Monitor your growth and receive updated guidance as you make progress.",
    },
  ];

  return (
    <section className="py-16 bg-s7n-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-s7n-darkGray mb-4">
            How S7N AI Coach Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple process designed to deliver powerful results
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex mb-12 last:mb-0">
              <div className="mr-6 md:mr-8">
                <div className="bg-s7n-purple text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="h-full w-0.5 bg-s7n-purple/30 mx-auto my-2"></div>
                )}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-s7n-darkGray">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
