import React, { createContext, useContext, useEffect, useState } from 'react';
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch member profile - SIMPLIFIED
  const fetchProfile = async (authId: string): Promise<Member | null> => {
    try {
      console.log('Fetching profile for auth_id:', authId);
      
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('auth_id', authId)
        .maybeSingle(); // Use maybeSingle instead of single

      if (error) {
        console.error('Profile fetch error:', error);
        return null;
      }

      if (data) {
        console.log('Member found:', data.member_number, 'Role:', data.role || 'member');
        return data;
      }

      console.log('No member found for auth_id:', authId);
      return null;
    } catch (error) {
      console.error('Fetch profile error:', error);
      return null;
    }
  };

  // Initialize auth state - SIMPLIFIED
  useEffect(() => {
    console.log('Initializing auth...');
    
    let subscription: any;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          console.log('Session found:', session.user.id);
          const memberData = await fetchProfile(session.user.id);
          
          if (memberData) {
            setUser(memberData.member_number);
            setMember(memberData);
            setUserRole(memberData.role || 'member');
            console.log('User authenticated:', memberData.member_number, 'Role:', memberData.role);
          }
        }
      } catch (error) {
        console.error('Initialize auth error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Auth state listener
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);

      if (event === 'SIGNED_IN' && session?.user) {
        const memberData = await fetchProfile(session.user.id);
        
        if (memberData) {
          setUser(memberData.member_number);
          setMember(memberData);
          setUserRole(memberData.role || 'member');
          console.log('Login successful:', memberData.member_number, 'Role:', memberData.role);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setMember(null);
        setUserRole(null);
      }
    });

    subscription = data.subscription;

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      if (data.user) {
        console.log('Auth successful, fetching profile...');
        const memberData = await fetchProfile(data.user.id);
        
        if (!memberData) {
          await supabase.auth.signOut();
          throw new Error('Member profile not found. Please contact support.');
        }

        setUser(memberData.member_number);
        setMember(memberData);
        setUserRole(memberData.role || 'member');
        
        console.log('Login complete:', {
          member_number: memberData.member_number,
          role: memberData.role,
          email: memberData.email
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
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
      setUserRole(null);
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
        headers: {
          'Content-Type': 'application/json',
        },
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

      if (member) {
        setUser(member.member_number);
        setMember(member);
        setUserRole(member.role || 'member');
      }
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
