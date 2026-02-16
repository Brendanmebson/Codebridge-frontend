import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UseInactivityTimeoutOptions {
  timeout?: number; // in milliseconds
  onTimeout?: () => void;
  enabled?: boolean;
}

export const useInactivityTimeout = ({
  timeout = 15000, // 15 seconds default
  onTimeout,
  enabled = true,
}: UseInactivityTimeoutOptions = {}) => {
  const { logout, user } = useAuth();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    // Clear existing timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!enabled || !user) return;

    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      console.log('⏱️ Inactivity timeout - logging out...');
      
      if (onTimeout) {
        onTimeout();
      }

      // Logout user (logout already handles navigation)
      await logout();
    }, timeout);

    console.log(`⏱️ Inactivity timer reset - will logout in ${timeout / 1000}s`);
  }, [enabled, user, timeout, onTimeout, logout]);

  useEffect(() => {
    if (!enabled || !user) {
      return;
    }

    console.log('🔒 Inactivity timeout enabled');

    // List of events to track user activity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Reset timer on any activity
    const handleActivity = () => {
      resetTimer();
    };

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      console.log('🔓 Inactivity timeout disabled');
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, user, resetTimer]);

  return { resetTimer };
};