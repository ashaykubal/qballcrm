
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import NewCompanyForm from "./NewCompanyForm";

interface NewCompanyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewCompanyDrawer = ({ isOpen, onClose }: NewCompanyDrawerProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>Add New Company</SheetTitle>
          <SheetDescription>
            Create a new company record. Fields marked with * are required.
          </SheetDescription>
        </SheetHeader>
        
        <NewCompanyForm onCancel={onClose} onSuccess={onClose} />
      </SheetContent>
    </Sheet>
  );
};

export default NewCompanyDrawer;
