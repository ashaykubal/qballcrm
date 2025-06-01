
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Sparkles, X, Plus } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
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

interface ClientAttendee {
  id: string;
  name: string;
  clientName: string;
  title: string;
}

interface InternalAttendee {
  id: string;
  name: string;
  title: string;
  department: string;
}

interface Topic {
  id: string;
  name: string;
  category: string;
}

const NewInteractionForm = ({ onCancel, onSuccess }: NewInteractionFormProps) => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedClientAttendees, setSelectedClientAttendees] = useState<ClientAttendee[]>([]);
  const [selectedInternalAttendees, setSelectedInternalAttendees] = useState<InternalAttendee[]>([]);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const [showInternalSuggestions, setShowInternalSuggestions] = useState(false);
  const [identifiedTopics, setIdentifiedTopics] = useState<Topic[]>([]);
  const [topicsIdentified, setTopicsIdentified] = useState(false);
  const [isIdentifyingTopics, setIsIdentifyingTopics] = useState(false);
  const [showAddTopicInput, setShowAddTopicInput] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState("");
  
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

  const hasDateRange = dateRange?.from && dateRange?.to && dateRange.from !== dateRange.to;
  const meetingNotes = form.watch("meetingNotes");

  // Mock data for demonstration
  const clientSuggestions: ClientAttendee[] = [
    { id: "1", name: "John Smith", clientName: "ABC Investment Management", title: "Head of Equity Research" },
    { id: "2", name: "Jack Black", clientName: "ABC Investment Management", title: "Senior Analyst" },
    { id: "3", name: "Jane Austen", clientName: "XYZ Asset Management", title: "Portfolio Manager" },
  ];

  const internalSuggestions: InternalAttendee[] = [
    { id: "1", name: "Mike Nash", title: "Portfolio Manager", department: "Equities" },
    { id: "2", name: "Sarah Connor", title: "Senior Analyst", department: "Fixed Income" },
    { id: "3", name: "David Miller", title: "Research Director", department: "Research" },
  ];

  const filteredClientSuggestions = clientSuggestions.filter(attendee =>
    attendee.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
    attendee.clientName.toLowerCase().includes(clientSearchTerm.toLowerCase())
  );

  const filteredInternalSuggestions = internalSuggestions.filter(attendee =>
    attendee.name.toLowerCase().includes(internalSearchTerm.toLowerCase()) ||
    attendee.title.toLowerCase().includes(internalSearchTerm.toLowerCase()) ||
    attendee.department.toLowerCase().includes(internalSearchTerm.toLowerCase())
  );

  const handleClientAttendeeSelect = (attendee: ClientAttendee) => {
    if (!selectedClientAttendees.find(a => a.id === attendee.id)) {
      setSelectedClientAttendees([...selectedClientAttendees, attendee]);
    }
    setClientSearchTerm("");
    setShowClientSuggestions(false);
  };

  const handleInternalAttendeeSelect = (attendee: InternalAttendee) => {
    if (!selectedInternalAttendees.find(a => a.id === attendee.id)) {
      setSelectedInternalAttendees([...selectedInternalAttendees, attendee]);
    }
    setInternalSearchTerm("");
    setShowInternalSuggestions(false);
  };

  const removeClientAttendee = (id: string) => {
    setSelectedClientAttendees(selectedClientAttendees.filter(a => a.id !== id));
  };

  const removeInternalAttendee = (id: string) => {
    setSelectedInternalAttendees(selectedInternalAttendees.filter(a => a.id !== id));
  };

  const groupedClientAttendees = selectedClientAttendees.reduce((groups, attendee) => {
    const clientName = attendee.clientName;
    if (!groups[clientName]) {
      groups[clientName] = [];
    }
    groups[clientName].push(attendee);
    return groups;
  }, {} as Record<string, ClientAttendee[]>);

  const handleIdentifyTopics = async () => {
    if (!meetingNotes.trim()) {
      toast({
        title: "Error",
        description: "Please enter meeting notes before identifying topics.",
        variant: "destructive",
      });
      return;
    }

    setIsIdentifyingTopics(true);
    
    try {
      // Simulate AI processing with mock data based on the example
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTopics: Topic[] = [
        { id: "1", name: "AAPL", category: "Companies" },
        { id: "2", name: "GOOG", category: "Companies" },
        { id: "3", name: "Technology", category: "Industries & Sectors" },
      ];
      
      setIdentifiedTopics(mockTopics);
      setTopicsIdentified(true);
      
      toast({
        title: "Topics Identified",
        description: "AI has successfully identified topics from your meeting notes.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to identify topics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsIdentifyingTopics(false);
    }
  };

  const removeTopic = (topicId: string) => {
    setIdentifiedTopics(identifiedTopics.filter(topic => topic.id !== topicId));
  };

  const handleAddManualTopic = () => {
    if (!newTopicName.trim() || !newTopicCategory.trim()) {
      toast({
        title: "Error",
        description: "Please enter both topic name and category.",
        variant: "destructive",
      });
      return;
    }

    const newTopic: Topic = {
      id: Date.now().toString(),
      name: newTopicName,
      category: newTopicCategory,
    };

    setIdentifiedTopics([...identifiedTopics, newTopic]);
    setNewTopicName("");
    setNewTopicCategory("");
    setShowAddTopicInput(false);
  };

  const groupedTopics = identifiedTopics.reduce((groups, topic) => {
    if (!groups[topic.category]) {
      groups[topic.category] = [];
    }
    groups[topic.category].push(topic);
    return groups;
  }, {} as Record<string, Topic[]>);

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
      console.log("Selected client attendees:", selectedClientAttendees);
      console.log("Selected internal attendees:", selectedInternalAttendees);
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
                      <div className="space-y-2">
                        <div className="relative">
                          <Input
                            placeholder="Start typing to look up client attendees"
                            value={clientSearchTerm}
                            onChange={(e) => {
                              setClientSearchTerm(e.target.value);
                              setShowClientSuggestions(e.target.value.length > 0);
                            }}
                            onFocus={() => setShowClientSuggestions(clientSearchTerm.length > 0)}
                          />
                          {showClientSuggestions && filteredClientSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                              {filteredClientSuggestions.map((attendee) => (
                                <div
                                  key={attendee.id}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                                  onClick={() => handleClientAttendeeSelect(attendee)}
                                >
                                  <div className="font-semibold">{attendee.name}</div>
                                  <div className="text-sm text-gray-600">{attendee.clientName} | {attendee.title}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Selected Client Attendees */}
                        {Object.keys(groupedClientAttendees).length > 0 && (
                          <div className="space-y-3 mt-4">
                            {Object.entries(groupedClientAttendees).map(([clientName, attendees]) => (
                              <div key={clientName} className="bg-gray-50 p-3 rounded-md">
                                <div className="font-medium text-sm text-gray-700 mb-2">{clientName}</div>
                                <div className="flex flex-wrap gap-2">
                                  {attendees.map((attendee) => (
                                    <div key={attendee.id} className="bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center gap-2 text-sm">
                                      <span>{attendee.name}</span>
                                      <button
                                        type="button"
                                        onClick={() => removeClientAttendee(attendee.id)}
                                        className="text-gray-400 hover:text-gray-600"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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
                      <div className="space-y-2">
                        <div className="relative">
                          <Input
                            placeholder="Start typing to look up internal attendees"
                            value={internalSearchTerm}
                            onChange={(e) => {
                              setInternalSearchTerm(e.target.value);
                              setShowInternalSuggestions(e.target.value.length > 0);
                            }}
                            onFocus={() => setShowInternalSuggestions(internalSearchTerm.length > 0)}
                          />
                          {showInternalSuggestions && filteredInternalSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                              {filteredInternalSuggestions.map((attendee) => (
                                <div
                                  key={attendee.id}
                                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                                  onClick={() => handleInternalAttendeeSelect(attendee)}
                                >
                                  <div className="font-semibold">{attendee.name}</div>
                                  <div className="text-sm text-gray-600">{attendee.title} | {attendee.department}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Selected Internal Attendees */}
                        {selectedInternalAttendees.length > 0 && (
                          <div className="bg-gray-50 p-3 rounded-md mt-4">
                            <div className="flex flex-wrap gap-2">
                              {selectedInternalAttendees.map((attendee) => (
                                <div key={attendee.id} className="bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center gap-2 text-sm">
                                  <span>{attendee.name}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeInternalAttendee(attendee.id)}
                                    className="text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
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
                      {field.value?.length || 0}/32000 characters
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleIdentifyTopics}
                  disabled={isIdentifyingTopics || !meetingNotes.trim()}
                >
                  <Sparkles className="h-4 w-4" />
                  {isIdentifyingTopics ? "Identifying..." : "Identify Topics"}
                </Button>
              </div>

              {/* AI Identified Topics Section */}
              {topicsIdentified && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border">
                  <p className="text-sm text-orange-600 mb-4">
                    These topics were identified via AI. Please verify before submitting the interaction.
                  </p>
                  
                  {Object.keys(groupedTopics).length > 0 ? (
                    <div className="space-y-4">
                      {Object.entries(groupedTopics).map(([category, topics]) => (
                        <div key={category}>
                          <h4 className="font-medium text-sm text-gray-700 mb-2">{category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {topics.map((topic) => (
                              <Badge key={topic.id} variant="outline" className="flex items-center gap-1">
                                {topic.name}
                                <button
                                  type="button"
                                  onClick={() => removeTopic(topic.id)}
                                  className="ml-1 text-gray-400 hover:text-gray-600"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No topics identified.</p>
                  )}

                  {/* Add Manual Topic Section */}
                  <div className="mt-4">
                    {showAddTopicInput ? (
                      <div className="space-y-3 p-3 bg-white rounded border">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Topic name"
                            value={newTopicName}
                            onChange={(e) => setNewTopicName(e.target.value)}
                          />
                          <Input
                            placeholder="Category"
                            value={newTopicCategory}
                            onChange={(e) => setNewTopicCategory(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleAddManualTopic}
                          >
                            Add Topic
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setShowAddTopicInput(false);
                              setNewTopicName("");
                              setNewTopicCategory("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddTopicInput(true)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Manually
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-end gap-3 pt-6 border-t">
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
