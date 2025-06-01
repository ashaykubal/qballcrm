
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import NewInteractionForm from "./NewInteractionForm";

interface NewInteractionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewInteractionDrawer = ({ isOpen, onClose }: NewInteractionDrawerProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl md:max-w-3xl overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>New Interaction</SheetTitle>
          <SheetDescription>
            Create a new interaction record. Fields marked with * are required.
          </SheetDescription>
        </SheetHeader>
        
        <NewInteractionForm onCancel={onClose} onSuccess={onClose} />
      </SheetContent>
    </Sheet>
  );
};

export default NewInteractionDrawer;
