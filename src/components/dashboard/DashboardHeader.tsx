
import { FileText, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({
  title
}: DashboardHeaderProps) => {
  return <div className="flex items-center gap-6 mb-8">
      <TooltipProvider>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] rounded-xl p-3 h-16 w-16 border-2 border-[#9b87f5] flex items-center justify-center shadow-sm transition-colors" aria-label="Dashboard options">
                  <Home className="h-12 w-12 text-[#9b87f5]" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>View dashboard options</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent 
            align="center"
            alignOffset={0}
            className="bg-white border-2 border-[#9b87f5] shadow-sm p-0 w-16 flex flex-col items-center mt-1 rounded-xl overflow-hidden"
            sideOffset={-1}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuItem className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-full flex items-center justify-center transition-colors border-t border-[#9b87f5]" onClick={() => console.log("Navigate to My Interactions")}>
                    <FileText className="h-12 w-12 text-[#9b87f5]" />
                  </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>My Interactions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuItem className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-full flex items-center justify-center transition-colors border-t border-[#9b87f5]" onClick={() => console.log("Navigate to My Contacts")}>
                    <Users className="h-12 w-12 text-[#9b87f5]" />
                  </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>My Contacts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>
      
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </div>;
};

export default DashboardHeader;
