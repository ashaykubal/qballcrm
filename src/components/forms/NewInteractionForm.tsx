import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import MeetingDetailsSection from "./MeetingDetailsSection";
import AttendeesSection from "./AttendeesSection";
import MeetingDiscussionSection from "./MeetingDiscussionSection";
import { NewInteractionFormProps, Topic } from "./types";

const interactionSchema = z.object({
  meetingType: z.string().min(1, "Meeting type is required"),
  meetingMethod: z.string().min(1, "Meeting method is required"),
  date: z.date().optional(),
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
  startTime: z.string().optional(),
  duration: z.string().optional(),
  clientAttendees: z.string(),
  internalAttendees: z.string(),
  subject: z.string().min(1, "Subject is required"),
  meetingNotes: z.string(),
});

type InteractionFormData = z.infer<typeof interactionSchema>;

const NewInteractionForm = ({ onCancel, onSuccess }: NewInteractionFormProps) => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [identifiedTopics, setIdentifiedTopics] = useState<Topic[]>([]);
  const [topicsIdentified, setTopicsIdentified] = useState(false);
  
  const form = useForm<InteractionFormData>({
    resolver: zodResolver(interactionSchema),
    defaultValues: {
      meetingType: "",
      meetingMethod: "",
      startTime: new Date().toTimeString().slice(0, 5),
      duration: "1 hour",
      clientAttendees: "",
      internalAttendees: "",
      subject: "",
      meetingNotes: "",
    },
  });

  const onSubmit = async (data: InteractionFormData) => {
    if (!topicsIdentified) {
      toast({
        title: "Error",
        description: "Please identify topics before submitting the interaction.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Submitting interaction:", data);
      console.log("Identified topics:", identifiedTopics);
      
      toast({
        title: "Success",
        description: "New interaction has been created successfully.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create interaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Accordion type="multiple" defaultValue={["meeting-details", "attendees", "discussion"]} className="w-full">
          {/* Meeting Details Section */}
          <AccordionItem value="meeting-details">
            <AccordionTrigger className="text-lg font-semibold">
              Meeting Details
            </AccordionTrigger>
            <AccordionContent>
              <MeetingDetailsSection 
                form={form}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Attendees Section */}
          <AccordionItem value="attendees">
            <AccordionTrigger className="text-lg font-semibold">
              Attendees
            </AccordionTrigger>
            <AccordionContent>
              <AttendeesSection form={form} />
            </AccordionContent>
          </AccordionItem>

          {/* Meeting Discussion Section */}
          <AccordionItem value="discussion">
            <AccordionTrigger className="text-lg font-semibold">
              Meeting Discussion
            </AccordionTrigger>
            <AccordionContent>
              <MeetingDiscussionSection 
                form={form}
                identifiedTopics={identifiedTopics}
                setIdentifiedTopics={setIdentifiedTopics}
                topicsIdentified={topicsIdentified}
                setTopicsIdentified={setTopicsIdentified}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-end gap-3 pt-3 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={!topicsIdentified}
            className={!topicsIdentified ? "opacity-50 cursor-not-allowed" : ""}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewInteractionForm;
