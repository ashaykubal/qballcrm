
import { FileText, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({
  title
}: DashboardHeaderProps) => {
  const [open, setOpen] = useState(false);

  return <div className="flex items-center gap-6 mb-8">
      <div className="flex flex-col">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <div className="bg-white rounded-xl border-2 border-[#9b87f5] shadow-sm overflow-hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors" 
                      aria-label="Home"
                    >
                      <Home className="h-12 w-12 text-[#9b87f5]" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Home</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent 
            className="bg-white p-0 border-2 border-[#9b87f5] rounded-xl w-16 shadow-sm mt-1"
            align="center"
            sideOffset={1}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-none border-t-2 border-[#9b87f5]" 
                    onClick={() => {
                      console.log("Navigate to My Interactions");
                      setOpen(false);
                    }} 
                    aria-label="My Interactions"
                  >
                    <FileText className="h-12 w-12 text-[#9b87f5]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>My Interactions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-none border-t-2 border-[#9b87f5]" 
                    onClick={() => {
                      console.log("Navigate to My Contacts");
                      setOpen(false);
                    }} 
                    aria-label="My Contacts"
                  >
                    <Users className="h-12 w-12 text-[#9b87f5]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>My Contacts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </div>;
};

export default DashboardHeader;
