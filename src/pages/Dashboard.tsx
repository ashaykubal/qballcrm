
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import ActionableIntelligence from "@/components/dashboard/ActionableIntelligence";
import DashboardNav from "@/components/dashboard/DashboardNav";

const Dashboard = () => {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();
  const [authCheckCount, setAuthCheckCount] = useState(0);
  
  useEffect(() => {
    // Only redirect after we're sure auth state is settled
    // and the user is definitely not authenticated after multiple checks
    if (!loading) {
      if (!user && !session) {
        // Increase the check count to verify this isn't a temporary state
        setAuthCheckCount((prevCount) => prevCount + 1);
        
        // Only redirect after several checks confirm the user isn't authenticated
        if (authCheckCount > 1) {
          navigate("/login");
        }
      } else {
        // Reset counter if user is found
        setAuthCheckCount(0);
      }
    }
  }, [user, session, loading, navigate, authCheckCount]);

  if (loading || (authCheckCount <= 1 && !user)) {
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
