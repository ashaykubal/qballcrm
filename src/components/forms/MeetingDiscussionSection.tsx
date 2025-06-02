
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TopicsManagement from "./TopicsManagement";
import { Topic } from "./types";

interface MeetingDiscussionSectionProps {
  form: UseFormReturn<any>;
  identifiedTopics: Topic[];
  setIdentifiedTopics: (topics: Topic[]) => void;
  topicsIdentified: boolean;
  setTopicsIdentified: (identified: boolean) => void;
}

const MeetingDiscussionSection = ({ 
  form, 
  identifiedTopics, 
  setIdentifiedTopics, 
  topicsIdentified, 
  setTopicsIdentified 
}: MeetingDiscussionSectionProps) => {
  const meetingNotes = form.watch("meetingNotes");

  return (
    <div className="space-y-4 pt-4">
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
              {field.value?.length || 0}/32000 characters
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <TopicsManagement 
        meetingNotes={meetingNotes}
        identifiedTopics={identifiedTopics}
        setIdentifiedTopics={setIdentifiedTopics}
        topicsIdentified={topicsIdentified}
        setTopicsIdentified={setTopicsIdentified}
      />
    </div>
  );
};

export default MeetingDiscussionSection;
