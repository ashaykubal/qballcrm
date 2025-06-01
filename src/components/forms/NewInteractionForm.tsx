
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Sparkles } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

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

interface NewInteractionFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const NewInteractionForm = ({ onCancel, onSuccess }: NewInteractionFormProps) => {
  const { toast } = useToast();
  const [isDateRange, setIsDateRange] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  
  const form = useForm<InteractionFormData>({
    resolver: zodResolver(interactionSchema),
    defaultValues: {
      meetingType: "",
      meetingMethod: "",
      startTime: new Date().toTimeString().slice(0, 5), // Current time in HH:MM format
      duration: "1 hour",
      clientAttendees: "",
      internalAttendees: "",
      subject: "",
      meetingNotes: "",
    },
  });

  const watchedDate = form.watch("date");
  const watchedDateRange = form.watch("dateRange");

  // Check if date range is selected
  const hasDateRange = dateRange?.from && dateRange?.to && dateRange.from !== dateRange.to;

  const onSubmit = async (data: InteractionFormData) => {
    try {
      console.log("Submitting interaction:", data);
      
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
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="meetingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Type*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meeting type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="placeholder">Meeting type options coming...</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="meetingMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Method*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select meeting method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="placeholder">Meeting method options coming...</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && !dateRange && "text-muted-foreground"
                              )}
                            >
                              {dateRange?.from ? (
                                dateRange.to && dateRange.from !== dateRange.to ? (
                                  <>
                                    {format(dateRange.from, "LLL dd, y")} -{" "}
                                    {format(dateRange.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(dateRange.from, "LLL dd, y")
                                )
                              ) : field.value ? (
                                format(field.value, "LLL dd, y")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            defaultMonth={field.value || new Date()}
                            selected={dateRange}
                            onSelect={(range) => {
                              setDateRange(range);
                              if (range?.from) {
                                field.onChange(range.from);
                                form.setValue("dateRange", range);
                              }
                            }}
                            numberOfMonths={2}
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time*</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          disabled={hasDateRange}
                          className={hasDateRange ? "bg-gray-100 text-gray-400" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={hasDateRange}
                      >
                        <FormControl>
                          <SelectTrigger className={hasDateRange ? "bg-gray-100 text-gray-400" : ""}>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="15 min">15 minutes</SelectItem>
                          <SelectItem value="30 min">30 minutes</SelectItem>
                          <SelectItem value="45 min">45 minutes</SelectItem>
                          <SelectItem value="1 hour">1 hour</SelectItem>
                          <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                          <SelectItem value="2 hours">2 hours</SelectItem>
                          <SelectItem value="All Day">All Day</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Attendees Section */}
          <AccordionItem value="attendees">
            <AccordionTrigger className="text-lg font-semibold">
              Attendees
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="clientAttendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Attendee(s)*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Start typing to look up client attendees"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="internalAttendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Internal Attendee(s)*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Start typing to look up internal attendees"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          {/* Meeting Discussion Section */}
          <AccordionItem value="discussion">
            <AccordionTrigger className="text-lg font-semibold">
              Meeting Discussion
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter meeting subject"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="meetingNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter meeting notes and discussion details..."
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground mt-1">
                      0/32000 characters
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="button" variant="outline" size="sm" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Identify Topics
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewInteractionForm;
