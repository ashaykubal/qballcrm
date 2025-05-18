import MainLayout from "@/layouts/MainLayout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import ActionableIntelligence from "@/components/dashboard/ActionableIntelligence";
import DashboardNav from "@/components/dashboard/DashboardNav";
const DashboardDev = () => {
  return <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Dashboard (Development Mode)</h1>
        
        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-8">
          <p className="text-amber-700">
            Development mode: Authentication checks are bypassed. 
            Edit this page freely without login redirects.
          </p>
        </div>
        
        <DashboardNav />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">My Interactions</h2>
          <DashboardMetrics />
        </div>
        
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Insights</h2>
          <ActionableIntelligence />
        </div>
      </div>
    </MainLayout>;
};
export default DashboardDev;