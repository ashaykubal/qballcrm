
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useAuthRedirect = () => {
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

  return {
    user,
    loading,
    isFullyInitialized,
    isStableAuth,
    isSessionExpired,
    authCheckStarted,
    authCheckCount
  };
};
