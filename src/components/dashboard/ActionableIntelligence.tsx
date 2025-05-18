
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ActionableIntelligence = () => {
  // In a real app, these would be fetched from an API
  const discussionTopics = [
    { name: "Product roadmap", count: 12 },
    { name: "Market analysis", count: 8 },
    { name: "Budget planning", count: 7 },
    { name: "Sales strategy", count: 5 },
  ];

  const popularTopics = [
    { name: "Industry trends", count: 45 },
    { name: "Competitive analysis", count: 32 },
    { name: "Customer feedback", count: 28 },
    { name: "Partnership opportunities", count: 24 },
  ];

  const recentContacts = [
    { name: "John Smith", company: "Acme Inc", lastContact: "2 days ago" },
    { name: "Sarah Johnson", company: "TechCorp", lastContact: "3 days ago" },
    { name: "Michael Brown", company: "Global Services", lastContact: "5 days ago" },
    { name: "Emily Davis", company: "InnoTech", lastContact: "1 week ago" },
  ];

  const overdueContacts = [
    { name: "Robert Wilson", company: "Strategic Solutions", lastContact: "45 days ago" },
    { name: "Jennifer Lee", company: "Market Leaders", lastContact: "58 days ago" },
    { name: "David Miller", company: "Future Systems", lastContact: "62 days ago" },
    { name: "Lisa Anderson", company: "Prime Ventures", lastContact: "90 days ago" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-md">My Frequently Discussed Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {discussionTopics.map((topic, index) => (
              <li key={index} className="flex justify-between">
                <span>{topic.name}</span>
                <span className="text-gray-500 text-sm">{topic.count} discussions</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Most Popular Discussion Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {popularTopics.map((topic, index) => (
              <li key={index} className="flex justify-between">
                <span>{topic.name}</span>
                <span className="text-gray-500 text-sm">{topic.count} discussions</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-700 col-span-1 md:col-span-2">My Contacts</h2>
      
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Recently Contacted</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recentContacts.map((contact, index) => (
              <li key={index} className="flex flex-col">
                <span className="font-medium">{contact.name}</span>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{contact.company}</span>
                  <span>Last contact: {contact.lastContact}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Touchpoint Overdue</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {overdueContacts.map((contact, index) => (
              <li key={index} className="flex flex-col">
                <span className="font-medium">{contact.name}</span>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{contact.company}</span>
                  <span className="text-red-500">Overdue: {contact.lastContact}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionableIntelligence;
