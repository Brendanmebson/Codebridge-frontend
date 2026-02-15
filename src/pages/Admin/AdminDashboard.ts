import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  People as PeopleIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  PendingActions as PendingActionsIcon,
} from '@mui/icons-material';
import api from '../../utils/api';
import type { AdminStats } from '../../types';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || 'Failed to load stats');
      } else {
        setError('Failed to load stats');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 700 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Members Stats */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Members
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, marginTop: 1 }}>
                    {stats?.members.total || 0}
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    {stats?.members.active || 0} active
                  </Typography>
                </Box>
                <PeopleIcon sx={{ fontSize: 48, color: 'primary.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Members */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Pending Members
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, marginTop: 1 }}>
                    {stats?.members.pending || 0}
                  </Typography>
                  <Typography variant="caption" color="warning.main">
                    Awaiting approval
                  </Typography>
                </Box>
                <PendingActionsIcon sx={{ fontSize: 48, color: 'warning.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Savings */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Savings
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, marginTop: 1 }}>
                    ₦{(stats?.savings.total || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stats?.savings.accounts || 0} accounts
                  </Typography>
                </Box>
                <AccountBalanceIcon sx={{ fontSize: 48, color: 'success.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Loans */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Pending Loans
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, marginTop: 1 }}>
                    {stats?.loans.pending || 0}
                  </Typography>
                  <Typography variant="caption" color="warning.main">
                    Awaiting review
                  </Typography>
                </Box>
                <PendingActionsIcon sx={{ fontSize: 48, color: 'error.main', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Loans */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Active Loans Overview
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active Loans
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {stats?.loans.active || 0}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Disbursed
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    ₦{(stats?.loans.totalDisbursed || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Outstanding
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'error.main' }}>
                  ₦{(stats?.loans.totalOutstanding || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Collection Rate */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Collection Performance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUpIcon sx={{ fontSize: 48, color: 'success.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Recovery Rate
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                    {stats?.loans.totalDisbursed && stats?.loans.totalOutstanding
                      ? (((stats.loans.totalDisbursed - stats.loans.totalOutstanding) / stats.loans.totalDisbursed) * 100).toFixed(1)
                      : 0}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    of disbursed amount recovered
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;