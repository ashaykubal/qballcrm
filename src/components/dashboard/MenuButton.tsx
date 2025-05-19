
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface MenuButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}

const MenuButton = ({
  icon: Icon,
  label,
  onClick,
  className = ""
}: MenuButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            className={`bg-white hover:bg-[#D6BCFA]/30 active:bg-[#D6BCFA] p-3 h-16 w-16 flex items-center justify-center transition-colors rounded-xl border-2 border-[#9b87f5] ${className}`} 
            onClick={onClick} 
            aria-label={label}
          >
            <Icon className="h-12 w-12 text-[#9b87f5]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MenuButton;
