
import MainLayout from "@/layouts/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";

const DashboardDev = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader title="My Dashboard (Development Mode)" />
        
        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-8">
          <p className="text-amber-700">
            Development mode: Authentication checks are bypassed. 
            Edit this page freely without login redirects.
          </p>
        </div>
        
        <DashboardContent />
      </div>
    </MainLayout>
  );
};

export default DashboardDev;
