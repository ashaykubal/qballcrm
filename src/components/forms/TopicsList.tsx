
import { X } from "lucide-react";
import { Topic } from "./types";

interface TopicsListProps {
  groupedTopics: Record<string, Topic[]>;
  onRemoveTopic: (topicId: string) => void;
}

export const TopicsList = ({ groupedTopics, onRemoveTopic }: TopicsListProps) => {
  if (Object.keys(groupedTopics).length === 0) {
    return <p className="text-sm text-gray-500">No topics identified.</p>;
  }

  return (
    <div className="space-y-2">
      {Object.entries(groupedTopics).map(([category, topics]) => (
        <div key={category}>
          <h4 className="font-medium text-sm text-gray-700 mb-2">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <div key={topic.id} className="bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center gap-2 text-sm">
                <span>{topic.name}</span>
                <button
                  type="button"
                  onClick={() => onRemoveTopic(topic.id)}
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
  );
};
