
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export const FeedbackButtons = () => {
  const { toast } = useToast();

  const handleFeedback = (isPositive: boolean) => {
    toast({
      title: isPositive ? "Positive Feedback" : "Negative Feedback",
      description: isPositive 
        ? "Thank you for confirming the AI topics are accurate!" 
        : "Thank you for the feedback. We'll improve our topic identification.",
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleFeedback(true)}
              className="p-2"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Topics are accurate</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleFeedback(false)}
              className="p-2"
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Topics need improvement</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
