
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import ActionableIntelligence from "@/components/dashboard/ActionableIntelligence";
import DashboardNav from "@/components/dashboard/DashboardNav";

const Dashboard = () => {
  const { user, loading, session, isFullyInitialized, isStableAuth } = useAuth();
  const navigate = useNavigate();
  const [authCheckCount, setAuthCheckCount] = useState(0);
  
  // Use more deterministic auth checks with the new isStableAuth flag
  useEffect(() => {
    // Only perform checks after auth system is fully initialized AND stable
    if (isFullyInitialized && isStableAuth && !loading) {
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
  }, [user, session, loading, navigate, authCheckCount, isFullyInitialized, isStableAuth]);

  // Check local storage for login success flag
  useEffect(() => {
    const loginSuccessFlag = localStorage.getItem('loginSuccess') === 'true';
    
    if (loginSuccessFlag && user) {
      console.log("Login success flag found, ensuring we stay on dashboard");
      // Clear the flag after we've used it
      localStorage.removeItem('loginSuccess');
    }
  }, [user]);

  // Show loading state when auth is not yet stable
  if (loading || !isFullyInitialized || !isStableAuth || (authCheckCount <= 2 && !user)) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-lg font-medium">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
        
        <DashboardNav />
        
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
