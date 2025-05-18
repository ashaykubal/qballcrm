
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import ActionableIntelligence from "@/components/dashboard/ActionableIntelligence";

const DashboardContent = () => {
  return (
    <>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Key Metrics</h2>
        <DashboardMetrics />
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Actionable Intelligence</h2>
        <ActionableIntelligence />
      </div>
    </>
  );
};

export default DashboardContent;
