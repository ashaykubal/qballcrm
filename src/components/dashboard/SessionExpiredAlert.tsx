
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SessionExpiredAlert = () => {
  return (
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
  );
};

export default SessionExpiredAlert;
