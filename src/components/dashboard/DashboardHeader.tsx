
import NavMenu from "./NavMenu";
import AddMenu from "./AddMenu";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({
  title
}: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-6">
        <NavMenu />
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      
      <AddMenu />
    </div>
  );
};

export default DashboardHeader;
