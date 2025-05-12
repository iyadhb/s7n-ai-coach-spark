
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const QuizQuestions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-s7n-gray">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-s7n-darkGray mb-6 text-center">
            Quiz Questions
          </h1>
          
          <div className="mb-8">
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div className="bg-s7n-purple h-2 rounded-full w-3/5"></div>
            </div>
            <p className="text-sm text-gray-500 text-center">Step 3 of 5</p>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">
              This is a placeholder for the quiz questions page. The actual questions will be loaded from the database.
            </p>
          </div>
          
          <Button 
            className="w-full bg-s7n-purple hover:bg-s7n-darkPurple text-white text-lg py-6"
            onClick={() => navigate('/quiz')}
          >
            Back to Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;
