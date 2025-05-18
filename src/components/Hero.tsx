
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
            Welcome to Your <span className="text-blue-600">New Project</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Start building your next great idea with this clean, modern template.
            Add components, pages, and features as you need them.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="transition transform hover:scale-105">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="transition transform hover:scale-105">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
