import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  PendingActions as PendingActionsIcon,
} from '@mui/icons-material';
import api from '../../utils/api';
import type { AdminStats } from '../../types';

const StatCard = ({
  title,
  value,
  subtitle,
  subtitleColor = 'text.secondary',
  icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: string;
  icon: React.ReactNode;
}) => (
  <Card
    sx={{
      height: '100%',
      borderRadius: 3,
      transition: '0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
    }}
  >
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
            {value}
          </Typography>

          {subtitle && (
            <Typography variant="caption" color={subtitleColor}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ opacity: 0.2, fontSize: 48 }}>{icon}</Box>
      </Stack>
    </CardContent>
  </Card>
);

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
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const recoveryRate =
    stats?.loans.totalDisbursed && stats?.loans.totalOutstanding
      ? (
          ((stats.loans.totalDisbursed - stats.loans.totalOutstanding) /
            stats.loans.totalDisbursed) *
          100
        ).toFixed(1)
      : '0';

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Overview of system performance and financial metrics
        </Typography>
      </Box>

      {/* Top Stats Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        <StatCard
          title="Total Members"
          value={stats?.members.total || 0}
          subtitle={`${stats?.members.active || 0} active`}
          subtitleColor="success.main"
          icon={<PeopleIcon fontSize="inherit" />}
        />

        <StatCard
          title="Pending Members"
          value={stats?.members.pending || 0}
          subtitle="Awaiting approval"
          subtitleColor="warning.main"
          icon={<PendingActionsIcon fontSize="inherit" />}
        />

        <StatCard
          title="Total Savings"
          value={`₦${(stats?.savings.total || 0).toLocaleString('en-NG', {
            maximumFractionDigits: 0,
          })}`}
          subtitle={`${stats?.savings.accounts || 0} accounts`}
          icon={<AccountBalanceIcon fontSize="inherit" />}
        />

        <StatCard
          title="Pending Loans"
          value={stats?.loans.pending || 0}
          subtitle="Awaiting review"
          subtitleColor="warning.main"
          icon={<PendingActionsIcon fontSize="inherit" />}
        />
      </Box>

      {/* Financial Overview Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
          },
          gap: 3,
        }}
      >
        {/* Loans Overview */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Active Loans Overview
            </Typography>

            <Stack spacing={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Active Loans
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {stats?.loans.active || 0}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Disbursed
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: 'primary.main' }}
                >
                  ₦{(stats?.loans.totalDisbursed || 0).toLocaleString('en-NG', {
                    maximumFractionDigits: 0,
                  })}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Outstanding
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: 'error.main' }}
                >
                  ₦{(stats?.loans.totalOutstanding || 0).toLocaleString(
                    'en-NG',
                    { maximumFractionDigits: 0 }
                  )}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Collection Performance */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Collection Performance
            </Typography>

            <Stack direction="row" spacing={3} alignItems="center">
              <TrendingUpIcon sx={{ fontSize: 64, color: 'success.main' }} />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Recovery Rate
                </Typography>

                <Typography
                  variant="h3"
                  sx={{ fontWeight: 700, color: 'success.main' }}
                >
                  {recoveryRate}%
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  of disbursed funds recovered
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminDashboard;