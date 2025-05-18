
import MainLayout from "@/layouts/MainLayout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import ActionableIntelligence from "@/components/dashboard/ActionableIntelligence";
import { ChevronDown, FileText, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const DashboardDev = () => {
  return <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <TooltipProvider>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-[#9b87f5] hover:bg-[#7E69AB] active:bg-[#6E59A5] rounded-lg p-2 text-white"
                      aria-label="Dashboard options"
                    >
                      <Home className="h-8 w-8" />
                      <ChevronDown className="h-5 w-5 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View dashboard options</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenuContent align="start" className="w-56 bg-white">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => console.log("Navigate to My Interactions")}
                      >
                        <FileText className="h-5 w-5" />
                        <span>My Interactions</span>
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View your interactions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuItem
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => console.log("Navigate to My Contacts")}
                      >
                        <Users className="h-5 w-5" />
                        <span>My Contacts</span>
                      </DropdownMenuItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View your contacts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
          
          <h1 className="text-3xl font-bold text-gray-800">My Dashboard (Development Mode)</h1>
        </div>
        
        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-8">
          <p className="text-amber-700">
            Development mode: Authentication checks are bypassed. 
            Edit this page freely without login redirects.
          </p>
        </div>
        
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
