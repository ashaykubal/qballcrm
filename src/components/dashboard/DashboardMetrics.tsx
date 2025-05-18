
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardMetrics = () => {
  // In a real app, these would be fetched from an API
  const metrics = [
    {
      title: "Interactions Today",
      value: "5",
      description: "Interactions submitted today",
      trend: "+20%",
      trendDirection: "up",
    },
    {
      title: "Last 30 Days",
      value: "42",
      description: "Interactions in the last month",
      trend: "+12%",
      trendDirection: "up",
    },
    {
      title: "Quarterly Interactions",
      value: "87",
      description: "Interactions this quarter",
      trend: "+5%",
      trendDirection: "up",
    },
    {
      title: "Potential Executions",
      value: "23",
      description: "Potential in last 30 days",
      trend: "-8%",
      trendDirection: "down",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
              <div className={`text-sm font-medium ${metric.trendDirection === "up" ? "text-green-600" : "text-red-600"}`}>
                {metric.trend}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
