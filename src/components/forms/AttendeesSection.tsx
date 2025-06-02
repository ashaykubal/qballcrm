
import { useState, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PortalDropdown from "./PortalDropdown";
import { ClientAttendee, InternalAttendee } from "./types";

interface AttendeesSectionProps {
  form: UseFormReturn<any>;
}

const AttendeesSection = ({ form }: AttendeesSectionProps) => {
  const [selectedClientAttendees, setSelectedClientAttendees] = useState<ClientAttendee[]>([]);
  const [selectedInternalAttendees, setSelectedInternalAttendees] = useState<InternalAttendee[]>([]);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const [showInternalSuggestions, setShowInternalSuggestions] = useState(false);
  
  const clientInputRef = useRef<HTMLInputElement>(null);
  const internalInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="space-y-4 pt-4">
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
                    ref={clientInputRef}
                    placeholder="Start typing to look up client attendees"
                    value={clientSearchTerm}
                    onChange={(e) => {
                      setClientSearchTerm(e.target.value);
                      setShowClientSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowClientSuggestions(clientSearchTerm.length > 0)}
                  />
                  <PortalDropdown isOpen={showClientSuggestions && filteredClientSuggestions.length > 0} triggerRef={clientInputRef}>
                    {filteredClientSuggestions.map((attendee) => (
                      <div
                        key={attendee.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleClientAttendeeSelect(attendee);
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <div className="font-semibold">{attendee.name}</div>
                        <div className="text-sm text-gray-600">{attendee.clientName} | {attendee.title}</div>
                      </div>
                    ))}
                  </PortalDropdown>
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
                    ref={internalInputRef}
                    placeholder="Start typing to look up internal attendees"
                    value={internalSearchTerm}
                    onChange={(e) => {
                      setInternalSearchTerm(e.target.value);
                      setShowInternalSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowInternalSuggestions(internalSearchTerm.length > 0)}
                  />
                  <PortalDropdown isOpen={showInternalSuggestions && filteredInternalSuggestions.length > 0} triggerRef={internalInputRef}>
                    {filteredInternalSuggestions.map((attendee) => (
                      <div
                        key={attendee.id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleInternalAttendeeSelect(attendee);
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <div className="font-semibold">{attendee.name}</div>
                        <div className="text-sm text-gray-600">{attendee.title} | {attendee.department}</div>
                      </div>
                    ))}
                  </PortalDropdown>
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
    </div>
  );
};

export default AttendeesSection;
