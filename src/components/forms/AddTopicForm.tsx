
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Topic } from "./types";

interface AddTopicFormProps {
  onAddTopic: (topic: Topic) => void;
  isError?: boolean;
}

export const AddTopicForm = ({ onAddTopic, isError = false }: AddTopicFormProps) => {
  const { toast } = useToast();
  const [showAddTopicInput, setShowAddTopicInput] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState("");

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

    onAddTopic(newTopic);
    setNewTopicName("");
    setNewTopicCategory("");
    setShowAddTopicInput(false);
  };

  const handleCancel = () => {
    setShowAddTopicInput(false);
    setNewTopicName("");
    setNewTopicCategory("");
  };

  if (isError) {
    return (
      <div className="space-y-3">
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
          <p className="font-medium mb-1">Unable to identify topics automatically</p>
          <p>There was an error processing your meeting notes. Please add topics manually using the button below.</p>
        </div>
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAddTopicInput(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Topics Manually
          </Button>
        </div>
      </div>
    );
  }

  if (showAddTopicInput) {
    return (
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
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
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
    </div>
  );
};
