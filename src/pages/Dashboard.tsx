
import MainLayout from "@/layouts/MainLayout";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import SessionExpiredAlert from "@/components/dashboard/SessionExpiredAlert";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  const {
    isSessionExpired,
    loading,
    isFullyInitialized,
    isStableAuth,
    authCheckCount,
    authCheckStarted,
    user
  } = useAuthRedirect();

  // Show session expired alert when detected
  if (isSessionExpired) {
    return (
      <MainLayout>
        <SessionExpiredAlert />
      </MainLayout>
    );
  }

  // Show loading state when auth is not yet stable
  if (loading || !isFullyInitialized || !isStableAuth || (authCheckCount <= 2 && !user)) {
    return (
      <MainLayout>
        <DashboardLoading 
          authCheckStarted={authCheckStarted} 
          authCheckCount={authCheckCount} 
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader title="Dashboard" />
        <DashboardContent />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
