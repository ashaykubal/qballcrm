
import { useState } from "react";
import { Building, FileText, Plus, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MenuButton from "./MenuButton";
import NewCompanyDrawer from "@/components/forms/NewCompanyDrawer";

const AddMenu = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openNewCompanyDrawer, setOpenNewCompanyDrawer] = useState(false);
  const [openNewContactDrawer, setOpenNewContactDrawer] = useState(false);
  const [openNewInteractionDrawer, setOpenNewInteractionDrawer] = useState(false);

  return (
    <div className="flex flex-col">
      {/* New Company Drawer */}
      <NewCompanyDrawer 
        isOpen={openNewCompanyDrawer} 
        onClose={() => setOpenNewCompanyDrawer(false)} 
      />
      
      {/* Add Menu Popover */}
      <Popover open={openAdd} onOpenChange={setOpenAdd}>
        <PopoverTrigger asChild>
          <div className="bg-white rounded-xl border-2 border-[#9b87f5] shadow-sm">
            <MenuButton 
              icon={Plus} 
              label="Add New"
              className="rounded-xl"
              isDropdownTrigger={true} // Set to true for dropdown triggers
              onClick={() => {}}
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
              icon={Building} 
              label="New Company"
              onClick={() => {
                console.log("Create New Company");
                setOpenAdd(false);
                setOpenNewCompanyDrawer(true);
              }}
            />

            <MenuButton 
              icon={User} 
              label="New Contact"
              onClick={() => {
                console.log("Create New Contact");
                setOpenAdd(false);
                // Uncomment when implementing: setOpenNewContactDrawer(true);
              }}
            />

            <MenuButton 
              icon={FileText} 
              label="New Interaction"
              onClick={() => {
                console.log("Create New Interaction");
                setOpenAdd(false);
                // Uncomment when implementing: setOpenNewInteractionDrawer(true);
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddMenu;
