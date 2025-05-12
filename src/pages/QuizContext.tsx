
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
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Define form schema
const formSchema = z.object({
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  industry: z.string().min(2, {
    message: "Industry must be at least 2 characters.",
  }),
  experience_years: z.string().min(1, {
    message: "Please select your years of experience.",
  }),
  country_region: z.string().min(2, {
    message: "Country/Region must be at least 2 characters.",
  }),
  ai_goals: z.string().min(10, {
    message: "Please provide at least 10 characters about your AI goals.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const QuizContext: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the submission ID from session storage
  const submissionId = sessionStorage.getItem('currentSubmissionId');
  const userName = sessionStorage.getItem('userName') || 'User';
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      industry: '',
      experience_years: '',
      country_region: '',
      ai_goals: '',
    },
  });

  // Update submission with context data
  const updateSubmissionWithContext = async (contextData: FormValues) => {
    if (!submissionId) {
      console.error('No submission ID found');
      return false;
    }

    try {
      // Convert experience_years to a number before updating
      const experienceYears = parseInt(contextData.experience_years);

      const { error } = await supabase
        .from('quiz_submissions')
        .update({
          context_role: contextData.role,
          context_industry: contextData.industry,
          // Convert to a number since the database expects a number
          context_experience_years: isNaN(experienceYears) ? null : experienceYears,
          context_country_region: contextData.country_region,
          context_ai_goals: contextData.ai_goals
        })
        .eq('id', submissionId);
      
      if (error) {
        console.error('Error updating submission with context:', error);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Unexpected error updating context:', err);
      return false;
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const success = await updateSubmissionWithContext(data);
      
      if (success) {
        // Navigate to the questions page
        navigate('/quiz/questions');
      } else {
        toast({
          title: "Error",
          description: "Failed to update quiz context. Please try again.",
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
            Tell Us About Yourself, {userName}
          </h1>
          
          <div className="mb-8">
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div className="bg-s7n-purple h-2 rounded-full w-2/5"></div>
            </div>
            <p className="text-sm text-gray-500 text-center">Step 2 of 5</p>
          </div>
          
          <div className="mb-8 text-center">
            <p className="text-lg text-gray-600">
              To provide personalized AI guidance, we need to understand your professional context.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">What is your current role?</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Marketing Manager, Developer, Student" 
                        {...field} 
                        className="text-base p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">What industry do you work in?</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Healthcare, Technology, Education" 
                        {...field} 
                        className="text-base p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience_years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Years of experience</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select years of experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">More than 10 years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="country_region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Country/Region</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. United States, Europe, Asia" 
                        {...field} 
                        className="text-base p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ai_goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">What are your goals with AI?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g. I want to learn how to use AI for marketing, I want to improve my productivity, I want to automate repetitive tasks..." 
                        {...field} 
                        className="text-base p-4 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-s7n-purple hover:bg-s7n-darkPurple text-white text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Continue to Questions"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default QuizContext;
