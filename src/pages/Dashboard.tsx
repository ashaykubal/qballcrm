
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import ActionableIntelligence from "@/components/dashboard/ActionableIntelligence";
import DashboardNav from "@/components/dashboard/DashboardNav";

const Dashboard = () => {
  const { user, loading, session, isFullyInitialized } = useAuth();
  const navigate = useNavigate();
  const [authCheckCount, setAuthCheckCount] = useState(0);
  
  useEffect(() => {
    // Only perform checks after auth system is fully initialized
    if (isFullyInitialized && !loading) {
      // If no user and no session after full initialization, handle redirect
      if (!user && !session) {
        console.log(`Dashboard auth check #${authCheckCount + 1}: No user or session found`);
        
        // Use setTimeout to delay the check increment to allow for auth state to stabilize
        setTimeout(() => {
          setAuthCheckCount((prevCount) => prevCount + 1);
        }, 300);
        
        // Only redirect after multiple checks confirm the user isn't authenticated
        if (authCheckCount >= 3) {
          console.log("Multiple checks confirm no auth, redirecting to login");
          navigate("/login");
        }
      } else {
        // User is authenticated, reset counter
        console.log("Dashboard: User is authenticated", user?.email);
        setAuthCheckCount(0);
      }
    }
  }, [user, session, loading, navigate, authCheckCount, isFullyInitialized]);

  // Check local storage for login status to prevent redirect loop
  useEffect(() => {
    const loginSuccessFlag = localStorage.getItem('loginSuccess') === 'true';
    
    if (loginSuccessFlag && user) {
      console.log("Login success flag found, ensuring we stay on dashboard");
      // Clear the flag after we've used it
      localStorage.removeItem('loginSuccess');
    }
  }, [user]);

  if (loading || (!isFullyInitialized) || (authCheckCount <= 3 && !user)) {
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
