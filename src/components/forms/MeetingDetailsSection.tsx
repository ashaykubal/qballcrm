
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
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

interface MeetingDetailsSectionProps {
  form: UseFormReturn<any>;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

const MeetingDetailsSection = ({ form, dateRange, setDateRange }: MeetingDetailsSectionProps) => {
  const hasDateRange = dateRange?.from && dateRange?.to && dateRange.from !== dateRange.to;

  return (
    <div className="space-y-4 pt-4">
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
                  <SelectItem value="meeting-with-client">Meeting with Client</SelectItem>
                  <SelectItem value="webinar-conference">Webinar/Conference</SelectItem>
                  <SelectItem value="strategy-event-trip">Strategy Event/Trip</SelectItem>
                  <SelectItem value="bespoke-work">Bespoke Work</SelectItem>
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
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="digital-meeting">Digital Meeting</SelectItem>
                  <SelectItem value="in-person">In Person</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
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
                  value={hasDateRange ? "00:00" : field.value}
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
                value={hasDateRange ? "All Day" : field.value}
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
    </div>
  );
};

export default MeetingDetailsSection;
