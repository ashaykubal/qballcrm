
import { Building, FileText, Home, Plus, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({
  title
}: DashboardHeaderProps) => {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  return <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-6">
      <div className="flex flex-col">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="bg-white rounded-xl border-2 border-[#9b87f5] shadow-sm">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-xl" 
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
          </PopoverTrigger>

          <PopoverContent 
            className="p-2 border-2 border-[#9b87f5] rounded-xl bg-[#F1F0FB]/80 w-auto shadow-sm"
            align="center"
            sideOffset={5}
          >
            <div className="flex flex-col gap-2 w-16">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-xl border-2 border-[#9b87f5]" 
                      onClick={() => {
                        console.log("Navigate to Home");
                        setOpen(false);
                      }} 
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

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-xl border-2 border-[#9b87f5]" 
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
                      className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-xl border-2 border-[#9b87f5]" 
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
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </div>
    
    {/* Add button and menu */}
    <div className="flex flex-col">
      <Popover open={openAdd} onOpenChange={setOpenAdd}>
        <PopoverTrigger asChild>
          <div className="bg-white rounded-xl border-2 border-[#9b87f5] shadow-sm">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-xl" 
                    aria-label="Add New"
                  >
                    <Plus className="h-12 w-12 text-[#9b87f5]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add New</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </PopoverTrigger>

        <PopoverContent 
          className="p-2 border-2 border-[#9b87f5] rounded-xl bg-[#F1F0FB]/80 w-auto shadow-sm"
          align="center"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2 w-16">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-xl border-2 border-[#9b87f5]" 
                    onClick={() => {
                      console.log("Create New Company");
                      setOpenAdd(false);
                    }} 
                    aria-label="New Company"
                  >
                    <Building className="h-12 w-12 text-[#9b87f5]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>New Company</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-xl border-2 border-[#9b87f5]" 
                    onClick={() => {
                      console.log("Create New Contact");
                      setOpenAdd(false);
                    }} 
                    aria-label="New Contact"
                  >
                    <User className="h-12 w-12 text-[#9b87f5]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>New Contact</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-xl border-2 border-[#9b87f5]" 
                    onClick={() => {
                      console.log("Create New Interaction");
                      setOpenAdd(false);
                    }} 
                    aria-label="New Interaction"
                  >
                    <FileText className="h-12 w-12 text-[#9b87f5]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>New Interaction</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>;
};

export default DashboardHeader;
