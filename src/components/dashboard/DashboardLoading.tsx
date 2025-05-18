
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardLoadingProps {
  authCheckStarted: boolean;
  authCheckCount: number;
}

const DashboardLoading = ({ authCheckStarted, authCheckCount }: DashboardLoadingProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default DashboardLoading;
