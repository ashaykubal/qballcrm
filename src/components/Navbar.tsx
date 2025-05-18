
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Successfully logged out");
        navigate("/login");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Logout error:", err);
    }
  };

  // Add active styles for the current page
  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-600 font-medium" : "text-gray-700";
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">MySite</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={`px-3 py-2 text-sm font-medium ${isActive('/')} hover:text-blue-600`}>
              Home
            </Link>
            <Link to="/about" className={`px-3 py-2 text-sm font-medium ${isActive('/about')} hover:text-blue-600`}>
              About
            </Link>
            
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <User className="mr-1" size={16} />
                  {user.email?.split('@')[0]}
                </Button>
                <Button variant="default" size="sm" onClick={handleLogout} className="ml-2">
                  <LogOut className="mr-1" size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm" className="ml-4">
                  <LogIn className="mr-1" size={16} />
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 focus:outline-none"
              aria-expanded="false"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')} hover:text-blue-600 hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about')} hover:text-blue-600 hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {user ? (
              <>
                <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">
                  <User className="inline mr-1" size={16} />
                  {user.email?.split('@')[0]}
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="ml-3 mt-2 w-full justify-start"
                >
                  <LogOut className="mr-1" size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  variant="default"
                  size="sm"
                  className="ml-3 mt-2 w-auto"
                >
                  <LogIn className="mr-1" size={16} />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
