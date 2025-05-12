
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  quizType: z.string().min(1, {
    message: "Please select a quiz type.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const QuizStart: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      quizType: 'IND', // Default value
    },
  });

  // Create initial submission to Supabase
  const createInitialSubmission = async (userName: string, selectedQuizType: string) => {
    try {
      const { data, error } = await supabase
        .from('quiz_submissions')
        .insert([{ 
          user_name: userName, 
          quiz_type: selectedQuizType 
        }])
        .select('id')
        .single();
        
      if (error) {
        console.error('Error creating initial submission:', error);
        return null;
      }
      
      if (data) { 
        sessionStorage.setItem('currentSubmissionId', data.id);
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('quizType', selectedQuizType);
        return data.id; 
      }
      
      return null;
    } catch (err) {
      console.error('Unexpected error:', err);
      return null;
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const submissionId = await createInitialSubmission(data.name, data.quizType);
      
      if (submissionId) {
        // Navigate to the context questions page
        navigate('/quiz/context');
      } else {
        toast({
          title: "Error",
          description: "Failed to create quiz. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
              Let's start with some basic information about you.
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
              
              <FormField
                control={form.control}
                name="quizType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Quiz Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a quiz type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="IND">Individual</SelectItem>
                        <SelectItem value="BIZ">Business</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-s7n-purple hover:bg-s7n-darkPurple text-white text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Quiz..." : "Continue to Quiz"}
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
