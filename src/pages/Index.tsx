
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Ready to Build Something Amazing</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Easy to Customize</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Modify components and layouts to match your specific needs.
              </p>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Responsive Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Looks great on all devices, from mobile phones to desktops.
              </p>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>Modern Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Built with React, TypeScript, and Tailwind CSS for modern development.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
