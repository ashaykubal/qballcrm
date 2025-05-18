
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail, Lock } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isFullyInitialized, isStableAuth, isSessionExpired } = useAuth();

  // Extract email from URL query params if present
  const queryParams = new URLSearchParams(location.search);
  const emailFromSignup = queryParams.get('email') || '';
  
  // Check for session expired query parameter
  const sessionExpired = queryParams.get('expired') === 'true' || isSessionExpired;
  
  // Show session expired message if needed
  useEffect(() => {
    if (sessionExpired) {
      toast.error("Your session has expired due to inactivity. Please log in again.");
    }
  }, [sessionExpired]);

  // Check if we should redirect authenticated users away from login page
  // Only do this when auth is fully initialized AND stable
  useEffect(() => {
    if (isFullyInitialized && isStableAuth && user) {
      console.log("Already authenticated, redirecting to dashboard");
      navigate("/dashboard");
    }
  }, [user, isFullyInitialized, isStableAuth, navigate]);

  // Handle successful login with delay to allow auth state to stabilize
  useEffect(() => {
    if (user && loginSuccess && isFullyInitialized && isStableAuth) {
      console.log("User authenticated and login successful, navigating to dashboard");
      // Set a flag in localStorage to help prevent redirect loops
      localStorage.setItem('loginSuccess', 'true');
      
      // Add a short delay before navigation to ensure auth state has stabilized
      setTimeout(() => {
        navigate("/dashboard");
      }, 300);
    }
  }, [user, loginSuccess, navigate, isFullyInitialized, isStableAuth]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: emailFromSignup,
      password: ""
    }
  });

  // Update form when email from URL changes
  useEffect(() => {
    if (emailFromSignup) {
      form.setValue('email', emailFromSignup);
    }
  }, [emailFromSignup, form]);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        // Handle specific auth errors with clearer messages
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error(error.message);
        }
        setLoginSuccess(false);
      } else {
        // Indicate successful login and prepare for navigation
        toast.success("Successfully logged in!");
        setLoginSuccess(true);
        
        // Navigation will happen via useEffect when user state updates
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Login error:", err);
      setLoginSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <Card className="w-full max-w-md shadow-lg border-opacity-50 rounded-xl overflow-hidden">
          <CardHeader className="space-y-1 bg-gradient-to-b from-white to-gray-50 py-4">
            <CardTitle className="text-xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center text-sm">
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            {sessionExpired && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
                Your session has expired due to inactivity. Please log in again.
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10 rounded-md"
                            disabled={loading}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 rounded-md"
                            disabled={loading}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full rounded-md" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 bg-gradient-to-b from-gray-50 to-white py-4">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
