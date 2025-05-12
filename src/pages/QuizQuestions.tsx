
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Option {
  id: string;
  option_text: string;
}

interface Question {
  id: string;
  question_text: string;
  question_number: number;
  question_format: string;
  options: Option[];
}

const QuizQuestions: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [quizType, setQuizType] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('User');

  // Load quiz data and questions
  useEffect(() => {
    const storedSubmissionId = sessionStorage.getItem('currentSubmissionId');
    const storedQuizType = sessionStorage.getItem('quizType') || 'IND';
    const storedUserName = sessionStorage.getItem('userName') || 'User';
    
    setSubmissionId(storedSubmissionId);
    setQuizType(storedQuizType);
    setUserName(storedUserName);
    
    if (!storedSubmissionId) {
      toast({
        title: "Error",
        description: "No quiz session found. Please start a new quiz.",
        variant: "destructive",
      });
      navigate('/quiz');
      return;
    }
    
    fetchQuestions(storedQuizType);
  }, [navigate]);

  const fetchQuestions = async (quizTypeParam: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_type', quizTypeParam)
        .order('question_number', { ascending: true });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Transform the data to match our Question interface
        const formattedQuestions: Question[] = data.map(q => ({
          id: q.id,
          question_text: q.question_text,
          question_number: q.question_number,
          question_format: q.question_format,
          options: Array.isArray(q.options) ? q.options : JSON.parse(q.options as string)
        }));
        
        setQuestions(formattedQuestions);
      } else {
        toast({
          title: "No Questions Found",
          description: "We couldn't find any questions for this quiz type.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Define the form schema for the current question
  const formSchema = z.object({
    answer: z.string().min(1, { message: "Please select an answer" }),
  });

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Set up form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: answers[currentQuestion?.id] || "",
    },
  });

  // Save answer and move to next question
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Save the answer
    const newAnswers = { ...answers, [currentQuestion.id]: data.answer };
    setAnswers(newAnswers);
    
    // If last question, save answers and navigate to results
    if (currentQuestionIndex === questions.length - 1) {
      try {
        // Update the submission with answers
        const { error } = await supabase
          .from('quiz_submissions')
          .update({
            quiz_answers: newAnswers
          })
          .eq('id', submissionId);
          
        if (error) {
          throw error;
        }
        
        // Navigate to results page (to be implemented)
        toast({
          title: "Quiz Completed!",
          description: "Your answers have been saved.",
        });
        navigate('/quiz');  // Navigate back to start for now, can be replaced with results page
      } catch (error) {
        console.error("Error saving quiz answers:", error);
        toast({
          title: "Error",
          description: "Failed to save your answers. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reset form with the next question's saved answer
      const nextQuestionId = questions[currentQuestionIndex + 1]?.id;
      form.reset({ answer: answers[nextQuestionId] || "" });
    }
  };
  
  // Go to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer before moving
      const currentAnswer = form.getValues().answer;
      if (currentAnswer) {
        setAnswers({ ...answers, [currentQuestion.id]: currentAnswer });
      }
      
      // Move to previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Reset form with the previous question's saved answer
      const prevQuestionId = questions[currentQuestionIndex - 1]?.id;
      form.reset({ answer: answers[prevQuestionId] || "" });
    }
  };

  // Reset form when current question changes
  useEffect(() => {
    if (currentQuestion) {
      form.reset({ answer: answers[currentQuestion.id] || "" });
    }
  }, [currentQuestion, form]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-s7n-gray flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-s7n-purple" />
          <p className="text-xl text-s7n-darkGray">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  // Show error state if no questions loaded
  if (!isLoading && (!questions || questions.length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-s7n-gray">
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-s7n-darkGray mb-6">
              No Questions Available
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We couldn't find any questions for this quiz type. Please try again later.
            </p>
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-s7n-gray">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-s7n-darkGray mb-6 text-center">
            {userName}'s AI Discovery Quiz
          </h1>
          
          <div className="mb-8">
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div 
                className="bg-s7n-purple h-2 rounded-full" 
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          {currentQuestion && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-s7n-darkGray mb-4">
                    {currentQuestion.question_text}
                  </h2>
                  
                  <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {currentQuestion.options?.map((option) => (
                              <div key={option.id} className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                                <RadioGroupItem value={option.id} id={option.id} />
                                <FormLabel htmlFor={option.id} className="flex-grow cursor-pointer">
                                  {option.option_text}
                                </FormLabel>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="px-6"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  
                  <Button 
                    type="submit"
                    className="bg-s7n-purple hover:bg-s7n-darkPurple text-white px-6"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Complete Quiz' : 'Next'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestions;
