import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../config/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Member } from '../types';

interface AuthContextType {
  user: string | null;
  member: Member | null;
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Fetch member profile
  const fetchProfile = async (authId: string) => {
    try {
      console.log('Fetching profile for auth_id:', authId);
      
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('auth_id', authId)
        .single();

      console.log('Profile fetch result:', { data, error });

      if (error) {
        console.error('Profile fetch error:', error);
        // If member not found, logout
        if (error.code === 'PGRST116') {
          console.log('Member not found, logging out...');
          await logout();
        }
        return null;
      }

      if (data) {
        console.log('Member found:', data.member_number);
        return data;
      }

      return null;
    } catch (error) {
      console.error('Fetch profile error:', error);
      return null;
    }
  };

  // Initialize auth state
  useEffect(() => {
    console.log('Initializing auth...');
    
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Session error:', error);
          if (mounted) {
            setUser(null);
            setMember(null);
            setLoading(false);
            setInitializing(false);
          }
          return;
        }

        if (session?.user) {
          console.log('Session found:', session.user.id);
          const memberData = await fetchProfile(session.user.id);
          
          if (mounted) {
            if (memberData) {
              setUser(memberData.member_number);
              setMember(memberData);
              console.log('Login complete, user set:', memberData.member_number);
            } else {
              setUser(null);
              setMember(null);
            }
          }
        } else {
          console.log('No active session');
          if (mounted) {
            setUser(null);
            setMember(null);
          }
        }
      } catch (error) {
        console.error('Initialize auth error:', error);
        if (mounted) {
          setUser(null);
          setMember(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setInitializing(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);

        if (!mounted) return;

        if (event === 'SIGNED_IN' && session?.user) {
          setLoading(true);
          const memberData = await fetchProfile(session.user.id);
          
          if (mounted) {
            if (memberData) {
              setUser(memberData.member_number);
              setMember(memberData);
            } else {
              setUser(null);
              setMember(null);
            }
            setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          if (mounted) {
            setUser(null);
            setMember(null);
            setLoading(false);
          }
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed');
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    if (initializing) {
      const timeout = setTimeout(() => {
        console.log('Auth initialization timeout - forcing loading to false');
        setLoading(false);
        setInitializing(false);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [initializing]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const memberData = await fetchProfile(data.user.id);
        
        if (!memberData) {
          await supabase.auth.signOut();
          throw new Error('Member profile not found. Please contact support.');
        }

        setUser(memberData.member_number);
        setMember(memberData);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setMember(null);
      
      // Clear localStorage
      localStorage.removeItem('supabase.auth.token');
      
      // Redirect to login
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

      // Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('Registration failed - no user created');
      }

      // Create member profile
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .insert({
          auth_id: authData.user.id,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          date_of_birth: data.dateOfBirth,
          address: data.address,
          id_type: data.idType,
          id_number: data.idNumber,
          status: 'active',
        })
        .select()
        .single();

      if (memberError) {
        // If member creation fails, delete the auth user
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw memberError;
      }

      // Create default savings account
      await supabase.from('savings_accounts').insert({
        member_id: memberData.id,
        account_type: 'regular',
        balance: 0,
      });

      // Auto-login after registration
      if (memberData) {
        setUser(memberData.member_number);
        setMember(memberData);
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, member, loading, login, logout, register }}>
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