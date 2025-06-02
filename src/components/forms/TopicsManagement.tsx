
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Topic } from "./types";
import { TopicsBadge } from "./TopicsBadge";
import { TopicsList } from "./TopicsList";
import { AddTopicForm } from "./AddTopicForm";
import { FeedbackButtons } from "./FeedbackButtons";

interface TopicsManagementProps {
  meetingNotes: string;
  identifiedTopics: Topic[];
  setIdentifiedTopics: (topics: Topic[]) => void;
  topicsIdentified: boolean;
  setTopicsIdentified: (identified: boolean) => void;
}

const TopicsManagement = ({ 
  meetingNotes, 
  identifiedTopics, 
  setIdentifiedTopics, 
  topicsIdentified, 
  setTopicsIdentified 
}: TopicsManagementProps) => {
  const { toast } = useToast();
  const [isIdentifyingTopics, setIsIdentifyingTopics] = useState(false);
  const [identificationError, setIdentificationError] = useState(false);

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
    setIdentificationError(false);
    
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
      setIdentificationError(false);
    } catch (error) {
      setIdentificationError(true);
      setTopicsIdentified(true);
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

  const addTopic = (newTopic: Topic) => {
    setIdentifiedTopics([...identifiedTopics, newTopic]);
    setIdentificationError(false);
  };

  const groupedTopics = identifiedTopics.reduce((groups, topic) => {
    if (!groups[topic.category]) {
      groups[topic.category] = [];
    }
    groups[topic.category].push(topic);
    return groups;
  }, {} as Record<string, Topic[]>);

  return (
    <div>
      <div className="flex justify-end mb-3">
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
        <div className="space-y-3">
          <Card className="bg-gray-50">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <FormLabel className="text-base font-medium">Topics</FormLabel>
                <TopicsBadge />
              </div>
              
              {identificationError ? (
                <AddTopicForm onAddTopic={addTopic} isError={true} />
              ) : (
                <div className="space-y-2">
                  <TopicsList groupedTopics={groupedTopics} onRemoveTopic={removeTopic} />
                  <FeedbackButtons />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add Manual Topic Section */}
          {!identificationError && (
            <AddTopicForm onAddTopic={addTopic} />
          )}
        </div>
      )}
    </div>
  );
};

export default TopicsManagement;
