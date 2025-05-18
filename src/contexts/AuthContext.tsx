
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isFullyInitialized: boolean; // New flag to track complete initialization
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isFullyInitialized: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullyInitialized, setIsFullyInitialized] = useState(false);

  useEffect(() => {
    let initialSessionChecked = false;
    let authListenerSetUp = false;

    // Track when both initialization steps have completed
    const checkFullyInitialized = () => {
      if (initialSessionChecked && authListenerSetUp) {
        console.log("Auth context is now fully initialized");
        setIsFullyInitialized(true);
      }
    };

    // Set up auth state listener FIRST with debounce to avoid race conditions
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        
        // Handle the session update
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Set loading to false after we've established the auth state
        setLoading(false);
      }
    );

    // Mark auth listener as set up
    authListenerSetUp = true;
    checkFullyInitialized();

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      
      // Set the session and user state
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Update loading state once the initial check is done
      setLoading(false);
      
      // Mark initial session check as complete
      initialSessionChecked = true;
      checkFullyInitialized();
    });

    // Clean up subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user, loading, isFullyInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
