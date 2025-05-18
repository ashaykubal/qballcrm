
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isFullyInitialized: boolean;
  isStableAuth: boolean;
  isSessionExpired: boolean;
  loginEvent: boolean; // New flag to track explicit login events
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isFullyInitialized: false,
  isStableAuth: false,
  isSessionExpired: false,
  loginEvent: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullyInitialized, setIsFullyInitialized] = useState(false);
  const [isStableAuth, setIsStableAuth] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [loginEvent, setLoginEvent] = useState(false);
  
  // Use refs to track initialization progress and debounce auth changes
  const initialSessionCheckedRef = useRef(false);
  const authListenerSetUpRef = useRef(false);
  const authDebounceTimerRef = useRef<number | null>(null);
  const authStateChangeCountRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const previousAuthStateRef = useRef<{session: Session | null, user: User | null}>({
    session: null,
    user: null,
  });
  
  // Track consecutive stable auth checks
  const stableAuthChecksRef = useRef(0);
  const STABLE_AUTH_THRESHOLD = 3; // Number of checks needed to consider auth stable

  // Reset session expired flag when user interacts with the app
  useEffect(() => {
    const resetActivityTimer = () => {
      lastActivityRef.current = Date.now();
      if (isSessionExpired) {
        setIsSessionExpired(false);
      }
    };

    // Add event listeners for user activity
    window.addEventListener('mousedown', resetActivityTimer);
    window.addEventListener('keydown', resetActivityTimer);
    window.addEventListener('touchstart', resetActivityTimer);
    window.addEventListener('scroll', resetActivityTimer);
    
    return () => {
      window.removeEventListener('mousedown', resetActivityTimer);
      window.removeEventListener('keydown', resetActivityTimer);
      window.removeEventListener('touchstart', resetActivityTimer);
      window.removeEventListener('scroll', resetActivityTimer);
    };
  }, [isSessionExpired]);

  // Handle auth state updates with debouncing
  const updateAuthState = (newSession: Session | null, event?: string) => {
    // Clear any existing timer to debounce rapid changes
    if (authDebounceTimerRef.current !== null) {
      window.clearTimeout(authDebounceTimerRef.current);
    }
    
    // Increment the change counter to track volatility
    authStateChangeCountRef.current += 1;
    
    // Check if this is a session expiration event
    const isExpiredEvent = event === 'SIGNED_OUT' && session !== null && !newSession;
    
    // More precise login event detection - only consider it a login when:
    // 1. The event is SIGNED_IN
    // 2. We have a new session with a user
    // 3. We didn't have a user before OR the user ID has changed
    const wasSignedIn = previousAuthStateRef.current.session?.user?.id;
    const isNewSignIn = newSession?.user?.id && (!wasSignedIn || wasSignedIn !== newSession.user.id);
    const isLoginEvent = event === 'SIGNED_IN' && newSession?.user && isNewSignIn;
    
    if (isExpiredEvent) {
      console.log("Session expired detected");
      setIsSessionExpired(true);
    }
    
    if (isLoginEvent) {
      console.log("Explicit login event detected", newSession?.user?.email);
      setLoginEvent(true); // Set login event flag
      
      // Fast track auth stability for login events
      stableAuthChecksRef.current = STABLE_AUTH_THRESHOLD;
      
      // Update session and user immediately for login events
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
      setIsStableAuth(true);
      
      // Store the current auth state for comparison
      previousAuthStateRef.current = {
        session: newSession,
        user: newSession?.user ?? null
      };
      
      // Clear login event flag after a delay to prevent race conditions
      // but long enough to be detected by components
      setTimeout(() => {
        console.log("Clearing login event flag");
        setLoginEvent(false);
      }, 3000); // Extended from 2000ms to 3000ms
      
      return; // Skip debouncing for login events
    }
    
    // Debounce auth state updates to prevent rapid re-renders
    authDebounceTimerRef.current = window.setTimeout(() => {
      console.log("Auth state update (debounced):", 
        newSession ? `User: ${newSession.user?.email}` : "No session",
        event ? `Event: ${event}` : "");
      
      // Update the session and user state
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      // Store the current auth state for comparison
      previousAuthStateRef.current = {
        session: newSession,
        user: newSession?.user ?? null
      };
      
      // Check for session/user consistency
      const isConsistent = Boolean(
        (newSession && newSession.user) || (!newSession && !user)
      );
      
      if (isConsistent) {
        stableAuthChecksRef.current += 1;
      } else {
        stableAuthChecksRef.current = 0;
      }
      
      // Mark auth as stable after sufficient consistent checks
      if (stableAuthChecksRef.current >= STABLE_AUTH_THRESHOLD) {
        console.log("Auth state is now considered stable");
        setIsStableAuth(true);
      }
      
      // Always update loading state after debounced update
      setLoading(false);
      
      // Clean up timer reference
      authDebounceTimerRef.current = null;
    }, 100); // Short debounce period to stabilize frequent changes
  };

  useEffect(() => {
    // Track initialization completeness
    const checkFullyInitialized = () => {
      if (initialSessionCheckedRef.current && authListenerSetUpRef.current) {
        console.log("Auth context is now fully initialized");
        setIsFullyInitialized(true);
      }
    };

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        
        // Special handling for token refresh events to minimize disruption
        if (event === 'TOKEN_REFRESHED') {
          console.log("Token refreshed - maintaining existing auth state if possible");
          // Only update if there's a meaningful change to avoid loop
          if (!session || currentSession?.user?.id !== session.user.id) {
            updateAuthState(currentSession, event);
          }
        } else {
          // For other events, update the auth state with debouncing
          updateAuthState(currentSession, event);
        }
      }
    );

    // Mark auth listener as set up
    authListenerSetUpRef.current = true;
    checkFullyInitialized();

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession?.user?.email);
      
      // Update the auth state
      updateAuthState(currentSession);
      
      // Mark initial session check as complete
      initialSessionCheckedRef.current = true;
      checkFullyInitialized();
    });

    // Clean up subscription and timers on unmount
    return () => {
      subscription.unsubscribe();
      if (authDebounceTimerRef.current !== null) {
        window.clearTimeout(authDebounceTimerRef.current);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      loading, 
      isFullyInitialized,
      isStableAuth,
      isSessionExpired,
      loginEvent
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
