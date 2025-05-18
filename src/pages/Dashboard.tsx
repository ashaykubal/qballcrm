
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import ActionableIntelligence from "@/components/dashboard/ActionableIntelligence";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronDown, FileText, Home, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const Dashboard = () => {
  const { 
    user, 
    loading, 
    session, 
    isFullyInitialized, 
    isStableAuth, 
    isSessionExpired, 
    loginEvent 
  } = useAuth();
  const navigate = useNavigate();
  const [authCheckCount, setAuthCheckCount] = useState(0);
  const [authCheckStarted, setAuthCheckStarted] = useState(false);
  const { toast } = useToast();
  
  // Handle session expiration specifically
  useEffect(() => {
    if (isSessionExpired && isFullyInitialized && isStableAuth) {
      console.log("Session expired, redirecting to login");
      
      toast({
        title: "Session Expired",
        description: "Your session has expired due to inactivity. Please log in again.",
        variant: "destructive",
      });
      
      // Short timeout to allow the toast to be seen before redirecting
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [isSessionExpired, navigate, isFullyInitialized, isStableAuth, toast]);
  
  // Use more deterministic auth checks with the new isStableAuth flag
  useEffect(() => {
    // Skip auth checks if explicit login event is happening
    if (loginEvent) {
      console.log("Explicit login in progress, skipping authCheck effect entirely");
      return;
    }
    
    // Only perform checks after auth system is fully initialized AND stable
    if (isFullyInitialized && isStableAuth && !loading) {
      // Mark that we've started checking auth so we know if the user is stuck
      if (!authCheckStarted) {
        setAuthCheckStarted(true);
      }
      
      // If no user and no session after full initialization, handle redirect
      if (!user && !session) {
        console.log(`Dashboard auth check #${authCheckCount + 1}: No user or session found`);
        
        // Use setTimeout with a longer delay to prevent rapid state changes
        setTimeout(() => {
          setAuthCheckCount((prevCount) => prevCount + 1);
        }, 500); // Increased delay to allow more time for auth to stabilize
        
        // Only redirect after multiple checks confirm the user isn't authenticated
        if (authCheckCount >= 2) { // Reduced threshold since we have isStableAuth
          console.log("Multiple checks confirm no auth, redirecting to login");
          navigate("/login");
        }
      } else {
        // User is authenticated, reset counter
        console.log("Dashboard: User is authenticated", user?.email);
        setAuthCheckCount(0);
      }
    }
  }, [user, session, loading, navigate, authCheckCount, isFullyInitialized, isStableAuth, loginEvent]);

  // Check local storage for login success flag
  useEffect(() => {
    const loginSuccessFlag = localStorage.getItem('loginSuccess') === 'true';
    
    if (loginSuccessFlag && user) {
      console.log("Login success flag found, ensuring we stay on dashboard");
      // Clear the flag after we've used it
      localStorage.removeItem('loginSuccess');
      localStorage.removeItem('loginSuccessTimestamp');
    }
  }, [user]);

  // Show session expired alert when detected
  if (isSessionExpired) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Alert variant="destructive" className="max-w-md mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Session Expired</AlertTitle>
            <AlertDescription>
              Your session has expired due to inactivity. You'll be redirected to login shortly.
            </AlertDescription>
          </Alert>
          <div className="animate-pulse text-lg font-medium">Redirecting to login...</div>
        </div>
      </MainLayout>
    );
  }

  // Show loading state when auth is not yet stable
  if (loading || !isFullyInitialized || !isStableAuth || (authCheckCount <= 2 && !user)) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="animate-pulse text-lg font-medium">Loading...</div>
          
          {/* Add an escape hatch if user gets stuck */}
          {authCheckStarted && authCheckCount > 1 && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Having trouble? Try logging in again:
              </p>
              <Button 
                variant="outline"
                onClick={() => navigate("/login")}
              >
                Go to Login
              </Button>
            </div>
          )}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <TooltipProvider>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-[#9b87f5] hover:bg-[#7E69AB] active:bg-[#6E59A5] rounded-lg p-2 text-white"
                      aria-label="Dashboard options"
                    >
                      <Home className="h-8 w-8" />
                      <ChevronDown className="h-5 w-5 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View dashboard options</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenuContent align="start" className="w-56 bg-white">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => console.log("Navigate to My Interactions")}
                      >
                        <FileText className="h-5 w-5" />
                        <span>My Interactions</span>
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View your interactions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => console.log("Navigate to My Contacts")}
                      >
                        <Users className="h-5 w-5" />
                        <span>My Contacts</span>
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View your contacts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
          
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Key Metrics</h2>
          <DashboardMetrics />
        </div>
        
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Actionable Intelligence</h2>
          <ActionableIntelligence />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
