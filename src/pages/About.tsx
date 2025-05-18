
import MainLayout from "@/layouts/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About</h1>
        <div className="prose prose-blue max-w-none">
          <p className="text-lg mb-4">
            This is a blank project template created to help you start your next web application quickly and efficiently.
          </p>
          <p className="text-lg mb-4">
            Feel free to customize this page and add your own content. You can add team information, company history, 
            mission statement, or any other information you'd like to share with your users.
          </p>
          <p className="text-lg">
            The template includes a responsive navigation, nice-looking UI components from Shadcn UI, and is built 
            with React, TypeScript, and Tailwind CSS for a modern development experience.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
