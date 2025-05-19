
import { FileText, Home, Users } from "lucide-react";
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

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center gap-6 mb-8">
      <TooltipProvider>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-white hover:bg-[#D6BCFA] active:bg-[#7E69AB] rounded-xl p-3 h-16 w-16 border-2 border-[#9b87f5] flex items-center justify-center shadow-sm transition-colors"
                  aria-label="Dashboard options"
                >
                  <Home className="h-12 w-12 text-[#9b87f5]" />
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
                    className="flex items-center gap-2 cursor-pointer hover:bg-[#D6BCFA]"
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
                    className="flex items-center gap-2 cursor-pointer hover:bg-[#D6BCFA]"
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
      
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </div>
  );
};

export default DashboardHeader;
