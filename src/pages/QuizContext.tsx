
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Define form schema
const formSchema = z.object({
  role: z.string().min(1, { message: "Role is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  experienceYears: z.string().min(1, { message: "Experience years is required" }),
  countryRegion: z.string().min(1, { message: "Country/Region is required" }),
  aiGoals: z.string().min(10, { message: "Please provide at least 10 characters about your AI goals" }),
});

type FormValues = z.infer<typeof formSchema>;

const QuizContext: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      industry: '',
      experienceYears: '',
      countryRegion: '',
      aiGoals: '',
    },
  });

  // Check for submission ID on component mount
  useEffect(() => {
    const storedSubmissionId = sessionStorage.getItem('currentSubmissionId');
    const storedUserName = sessionStorage.getItem('userName');
    
    if (!storedSubmissionId) {
      // No submission ID found, redirect back to start
      toast({
        title: "Session expired",
        description: "Please start the quiz again",
        variant: "destructive"
      });
      navigate('/quiz');
      return;
    }
    
    setSubmissionId(storedSubmissionId);
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [navigate]);

  // Update submission with context data
  const updateSubmissionWithContext = async (contextData: {
    role: string;
    industry: string;
    experience_years: string;
    country_region: string;
    ai_goals: string;
  }) => {
    if (!submissionId) {
      console.error('No submissionId found');
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('quiz_submissions')
        .update({
          context_role: contextData.role,
          context_industry: contextData.industry,
          context_experience_years: contextData.experience_years,
          context_region: contextData.country_region,
          context_ai_goals: contextData.ai_goals,
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId);
        
      if (error) {
        console.error('Error updating submission:', error);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Unexpected error:', err);
      return false;
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const contextData = {
        role: data.role,
        industry: data.industry,
        experience_years: data.experienceYears,
        country_region: data.countryRegion,
        ai_goals: data.aiGoals,
      };
      
      const success = await updateSubmissionWithContext(contextData);
      
      if (success) {
        toast({
          title: "Information saved",
          description: "Moving to the quiz questions",
        });
        
        // For now, we'll just redirect to a placeholder
        // Later this would be the actual quiz questions page
        navigate('/quiz/questions');
      } else {
        toast({
          title: "Error",
          description: "Failed to save your information. Please try again.",
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

  // Experience years options
  const experienceOptions = [
    { value: "less than 1 year", label: "Less than 1 year" },
    { value: "1-3 years", label: "1-3 years" },
    { value: "3-5 years", label: "3-5 years" },
    { value: "5-10 years", label: "5-10 years" },
    { value: "10+ years", label: "10+ years" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-s7n-gray">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-s7n-darkGray mb-6 text-center">
            Tell Us About Yourself
          </h1>
          
          {userName && (
            <div className="mb-6 text-center">
              <p className="text-lg text-gray-600">
                Hi {userName}, we'd like to know a bit more about you
              </p>
            </div>
          )}
          
          <div className="mb-8">
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div className="bg-s7n-purple h-2 rounded-full w-2/5"></div>
            </div>
            <p className="text-sm text-gray-500 text-center">Step 2 of 5</p>
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
                        placeholder="e.g., Marketing Manager, Software Developer" 
                        {...field} 
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
                        placeholder="e.g., Technology, Healthcare, Finance" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experienceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Years of experience</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select years of experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="countryRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Country or Region</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., United States, Europe, Asia" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="aiGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">What are you hoping to achieve with AI?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your goals, challenges, or what you're looking to learn..." 
                        className="min-h-[100px]"
                        {...field} 
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
                {isSubmitting ? "Saving..." : "Continue to Quiz Questions"}
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
