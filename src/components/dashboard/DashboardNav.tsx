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
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { Users, Home, ChevronDown, FileText, Building } from "lucide-react";

const DashboardNav = () => {
  const navigate = useNavigate();

  // In a real app, these would navigate to actual routes
  const navActions = [
    { 
      icon: <Building className="mr-2 h-5 w-5" />, 
      label: "Add New Company", 
      action: () => console.log("Add new company") 
    },
    { 
      icon: <Users className="mr-2 h-5 w-5" />, 
      label: "Add New Contact", 
      action: () => console.log("Add new contact") 
    },
    { 
      icon: <FileText className="mr-2 h-5 w-5" />, 
      label: "Add New Interaction", 
      action: () => console.log("Add new interaction") 
    },
    { 
      icon: <FileText className="mr-2 h-5 w-5" />, 
      label: "View My Recent Interactions", 
      action: () => console.log("View recent interactions") 
    },
    { 
      icon: <Users className="mr-2 h-5 w-5" />, 
      label: "View My Contacts", 
      action: () => console.log("View contacts") 
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-wrap gap-2">
          <NavigationMenuItem>
            <TooltipProvider>
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-200"
                      >
                        <Home className="h-5 w-5" />
                        <span className="font-medium">My Dashboard</span>
                        <ChevronDown className="h-4 w-4 opacity-70" />
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
          </NavigationMenuItem>
          
          {/* Keep the rest of the buttons hidden for now - we'll replace them later
           * based on the user's next instructions
           */}
          <div className="hidden">
            {navActions.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Button 
                  variant="outline" 
                  onClick={item.action} 
                  className="flex items-center justify-center"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </NavigationMenuItem>
            ))}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DashboardNav;
