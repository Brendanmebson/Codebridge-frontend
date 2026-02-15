import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/cards/StatCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import api from '../../utils/api';
import type { SavingsAccount, Loan } from '../../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Use ref to prevent multiple simultaneous fetches
  const isFetchingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    // Only fetch once per mount
    if (hasLoadedRef.current || isFetchingRef.current) {
      return;
    }

    fetchDashboardData();

    // Cleanup function
    return () => {
      // Reset refs when component unmounts
      hasLoadedRef.current = false;
    };
  }, []); // Empty dependency array - only run once

  const fetchDashboardData = async () => {
    // Prevent concurrent fetches
    if (isFetchingRef.current) {
      console.log('Already fetching, skipping...');
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching dashboard data...');
      
      const [savingsResponse, loansResponse] = await Promise.all([
        api.get('/savings'),
        api.get('/loans'),
      ]);

      console.log('Savings response:', savingsResponse.data);
      console.log('Loans response:', loansResponse.data);

      setSavingsAccounts(savingsResponse.data.savingsAccounts || []);
      setLoans(loansResponse.data.loans || []);
      hasLoadedRef.current = true;
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string }; status?: number } };
        if (error.response?.status === 401) {
          setError('Session expired. Please login again.');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(error.response?.data?.error || 'Failed to load dashboard data');
        }
      } else {
        setError('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  const totalSavings = savingsAccounts.reduce(
    (sum, account) => sum + parseFloat(account.balance.toString()),
    0
  );

  const activeLoans = loans.filter(
    (loan) => loan.status === 'disbursed'
  );

  const totalLoanBalance = activeLoans.reduce(
    (sum, loan) => sum + parseFloat((loan.outstanding_balance || loan.amount_approved || 0).toString()),
    0
  );

  const completedLoans = loans.filter(
    (loan) => loan.status === 'completed'
  ).length;

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Loading your dashboard...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>
          Welcome back, {user?.first_name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Member Number: {user?.member_number}
        </Typography>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ marginBottom: 3 }}
          action={
            <Button color="inherit" size="small" onClick={fetchDashboardData}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {user?.status === 'pending' && (
        <Alert severity="info" sx={{ marginBottom: 3 }}>
          Your account is pending approval. You will be notified once your membership is activated.
        </Alert>
      )}

      {/* Stats Grid */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          marginBottom: 4,
        }}
      >
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <StatCard
            title="Total Savings"
            value={`₦${totalSavings.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`}
            subtitle={`${savingsAccounts.length} account(s)`}
            icon={<AccountBalanceWalletIcon fontSize="large" />}
            color="primary.main"
          />
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <StatCard
            title="Active Loans"
            value={activeLoans.length}
            subtitle={`₦${totalLoanBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })} outstanding`}
            icon={<TrendingUpIcon fontSize="large" />}
            color="warning.main"
          />
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <StatCard
            title="Loan Balance"
            value={`₦${totalLoanBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}`}
            subtitle="Total outstanding"
            icon={<PaymentIcon fontSize="large" />}
            color="error.main"
          />
        </Box>

        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <StatCard
            title="Completed Loans"
            value={completedLoans}
            subtitle="Fully repaid"
            icon={<CheckCircleIcon fontSize="large" />}
            color="success.main"
          />
        </Box>
      </Box>

      {/* Quick Actions */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Quick Actions
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/dashboard/savings')}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto' } }}
          >
            Manage Savings
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/dashboard/loans/apply')}
            disabled={user?.status !== 'active'}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto' } }}
          >
            Apply for Loan
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/dashboard/loans')}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto' } }}
          >
            View Loans
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/dashboard/profile')}
            sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto' } }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;