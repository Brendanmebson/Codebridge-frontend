import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  LinearProgress,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { useAuth } from './AuthContext';
import { useInactivityTimeout } from '../hooks/useInactivityTimeout';

interface InactivityContextType {
  resetTimer: () => void;
}

const InactivityContext = createContext<InactivityContextType | undefined>(undefined);

export const InactivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Main inactivity timer (15 seconds)
  const { resetTimer } = useInactivityTimeout({
    timeout: 15000, // 15 seconds
    enabled: !!user,
    onTimeout: () => {
      console.log('Session expired due to inactivity');
    },
  });

  const handleStayLoggedIn = () => {
    setShowWarning(false);
    setCountdown(10);
    resetTimer();
  };

  return (
    <>
      <InactivityContext.Provider value={{ resetTimer }}>
        {children}
      </InactivityContext.Provider>

      <Dialog open={showWarning} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" />
          Session Timeout Warning
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            You will be logged out in {countdown} seconds due to inactivity.
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(countdown / 10) * 100}
            color="warning"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStayLoggedIn} variant="contained" autoFocus>
            Stay Logged In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const useInactivity = () => {
  const context = useContext(InactivityContext);
  if (context === undefined) {
    throw new Error('useInactivity must be used within InactivityProvider');
  }
  return context;
};