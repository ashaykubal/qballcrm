
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { Users, MessageSquare, Calendar, Activity } from "lucide-react";

const DashboardNav = () => {
  const navigate = useNavigate();

  // In a real app, these would navigate to actual routes
  const navActions = [
    { 
      icon: <Activity className="mr-2 h-5 w-5" />, 
      label: "Add New Company", 
      action: () => console.log("Add new company") 
    },
    { 
      icon: <Users className="mr-2 h-5 w-5" />, 
      label: "Add New Contact", 
      action: () => console.log("Add new contact") 
    },
    { 
      icon: <MessageSquare className="mr-2 h-5 w-5" />, 
      label: "Add New Interaction", 
      action: () => console.log("Add new interaction") 
    },
    { 
      icon: <Calendar className="mr-2 h-5 w-5" />, 
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DashboardNav;
