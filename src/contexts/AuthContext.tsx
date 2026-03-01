import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../config/supabase';
import type { Member } from '../types';

interface AuthContextType {
  user: string | null;
  member: Member | null;
  userRole: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  idType: string;
  idNumber: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isAbortError = (error: unknown): boolean => {
  if (!error) return false;
  if (error instanceof Error && error.name === 'AbortError') return true;
  if (typeof error === 'object' && 'message' in error) {
    const msg = (error as any).message ?? '';
    return msg.includes('AbortError') || msg.includes('signal is aborted');
  }
  return false;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoggingIn = useRef(false);
  const initialSessionHandled = useRef(false);

  const finalizeInitialSession = () => {
    if (!initialSessionHandled.current) {
      initialSessionHandled.current = true;
      setLoading(false);
    }
  };

  const fetchProfile = async (authId: string): Promise<Member | null> => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('auth_id', authId)
        .maybeSingle();

      if (error) {
        if (error.message?.includes('AbortError') || error.code === '') return null;
        console.error('Profile fetch error:', error);
        return null;
      }

      return data ?? null;
    } catch (error: unknown) {
      if (isAbortError(error)) return null;
      console.error('Fetch profile error:', error);
      return null;
    }
  };

  const applyMemberState = (memberData: Member) => {
    setUser(memberData.member_number);
    setMember(memberData);
    setUserRole(memberData.role || 'member');
  };

  const clearMemberState = () => {
    setUser(null);
    setMember(null);
    setUserRole(null);
  };

  useEffect(() => {
    let isMounted = true;

    // Safety net — if INITIAL_SESSION never fires or is aborted by Strict Mode,
    // force loading off after 3 seconds so the app never hangs forever
    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        console.warn('Auth safety timer fired — forcing loading off');
        finalizeInitialSession();
      }
    }, 3000);

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      // ── INITIAL_SESSION ──────────────────────────────────────────────
      // Fires once on mount. Restores session silently if one exists.
      // This is the only place we auto-restore on page load.
      if (event === 'INITIAL_SESSION') {
        try {
          if (session?.user && isMounted) {
            const memberData = await fetchProfile(session.user.id);
            if (isMounted && memberData) applyMemberState(memberData);
          }
        } catch (err) {
          if (!isAbortError(err)) console.error('INITIAL_SESSION error:', err);
        } finally {
          clearTimeout(safetyTimer);
          if (isMounted) finalizeInitialSession();
        }
        return;
      }

      if (!isMounted) return;

      // ── SIGNED_IN ────────────────────────────────────────────────────
      // Supabase fires this on session restore AND explicit login.
      // We only care about explicit login — login() handles fetchProfile directly.
      // All other SIGNED_IN events (token refresh, restore) are ignored because
      // INITIAL_SESSION already covered the restore case above.
      if (event === 'SIGNED_IN') return;

      // ── TOKEN_REFRESHED ──────────────────────────────────────────────
      // Background token refresh — no UI action needed.
      if (event === 'TOKEN_REFRESHED') return;

      // ── SIGNED_OUT ───────────────────────────────────────────────────
      if (event === 'SIGNED_OUT') {
        clearMemberState();
        finalizeInitialSession();
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      data.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    isLoggingIn.current = true;
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      if (data.user) {
        const memberData = await fetchProfile(data.user.id);

        if (!memberData) {
          await supabase.auth.signOut();
          throw new Error('Member profile not found. Please contact support.');
        }

        applyMemberState(memberData);
      }
    } catch (error: unknown) {
      if (isAbortError(error)) {
        throw new Error('Login was interrupted. Please try again.');
      }
      throw error;
    } finally {
      isLoggingIn.current = false;
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      clearMemberState();
      localStorage.clear();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          idType: data.idType,
          idNumber: data.idNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const { member } = await response.json();
      if (member) applyMemberState(member);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, member, userRole, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};