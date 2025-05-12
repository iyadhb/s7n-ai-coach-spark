
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const QuizStart: React.FC = () => {
  const navigate = useNavigate();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    // Store name in session storage to retrieve later
    sessionStorage.setItem('userName', data.name);
    
    // Navigate to the next step of the quiz (to be built later)
    // For now, we'll just show an alert
    alert(`Thank you, ${data.name}! The quiz will continue in the next phase.`);
    
    // Later we would navigate to the next part of the quiz like:
    // navigate('/quiz/questions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-s7n-gray">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-s7n-darkGray mb-6 text-center">
            Welcome to Your AI Discovery Quiz
          </h1>
          
          <div className="mb-8 text-center">
            <p className="text-lg text-gray-600 mb-4">
              This quiz will help us understand your needs and goals to provide personalized AI coaching guidance.
            </p>
            <p className="text-sm text-gray-500">
              Let's start with your name so we can make this journey personal.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">What should we call you?</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                        className="text-lg p-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-s7n-purple hover:bg-s7n-darkPurple text-white text-lg py-6"
              >
                Continue to Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
          
          <p className="text-xs text-gray-400 mt-6 text-center">
            Your information will be used only to personalize your coaching experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
