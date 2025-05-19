
import { useState } from "react";
import { FileText, Home, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MenuButton from "./MenuButton";

const NavMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="bg-white rounded-xl border-2 border-[#9b87f5] shadow-sm">
            <MenuButton 
              icon={Home} 
              label="Home"
              className="rounded-xl"
              isDropdownTrigger={true} // Set to true for dropdown triggers
            />
          </div>
        </PopoverTrigger>

        <PopoverContent 
          className="p-2 border-2 border-[#9b87f5] rounded-xl bg-[#F1F0FB]/80 w-auto shadow-sm"
          align="center"
          sideOffset={5}
        >
          <div className="flex flex-col gap-2 w-16">
            <MenuButton 
              icon={Home} 
              label="Home"
              onClick={() => {
                console.log("Navigate to Home");
                setOpen(false);
              }}
            />

            <MenuButton 
              icon={FileText} 
              label="My Interactions"
              onClick={() => {
                console.log("Navigate to My Interactions");
                setOpen(false);
              }}
            />

            <MenuButton 
              icon={Users} 
              label="My Contacts"
              onClick={() => {
                console.log("Navigate to My Contacts");
                setOpen(false);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NavMenu;
