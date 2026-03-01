import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Container, Typography, Button, Alert, CircularProgress, useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import api from '../../utils/api';
import type { SavingsAccount, Loan } from '../../types';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  const { user, member } = useAuth();
  const navigate = useNavigate();
  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isFetchingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (hasLoadedRef.current || isFetchingRef.current) return;
    fetchDashboardData();
    return () => { hasLoadedRef.current = false; };
  }, []);

  const fetchDashboardData = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    setError('');
    try {
      const [savingsResponse, loansResponse] = await Promise.all([
        api.get('/savings'),
        api.get('/loans'),
      ]);
      setSavingsAccounts(savingsResponse.data.savingsAccounts || []);
      setLoans(loansResponse.data.loans || []);
      hasLoadedRef.current = true;
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const e = err as { response?: { data?: { error?: string }; status?: number } };
        if (e.response?.status === 401) {
          setError('Session expired. Please login again.');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(e.response?.data?.error || 'Failed to load dashboard data');
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
    (sum, a) => sum + parseFloat(a.balance.toString()), 0
  );
  const activeLoans = loans.filter(l => l.status === 'disbursed');
  const totalLoanBalance = activeLoans.reduce(
    (sum, l) => sum + parseFloat((l.outstanding_balance || l.amount_approved || 0).toString()), 0
  );
  const completedLoans = loans.filter(l => l.status === 'completed').length;
  const pendingLoans = loans.filter(l => l.status === 'pending').length;
  const firstName = member?.first_name || 'Member';

  const fmt = (n: number) => '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2 });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // ── LOADING ────────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{
        minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: palette.background.default,
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{
            width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3,
            background: `linear-gradient(135deg, ${palette.primary.main}18, ${palette.primary.main}06)`,
            border: `2px solid ${palette.primary.main}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CircularProgress size={32} sx={{ color: palette.primary.main }} />
          </Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300 }}>
            Loading your dashboard…
          </Typography>
        </Box>
      </Box>
    );
  }

  // ── STAT CARDS DATA ────────────────────────────────────
  const statCards = [
    {
      title: 'Total Savings',
      value: fmt(totalSavings),
      sub: `${savingsAccounts.length} account${savingsAccounts.length !== 1 ? 's' : ''}`,
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 22 }} />,
      color: palette.primary.dark,
      accent: palette.primary.main,
      trend: '+8.3% this month',
      trendUp: true,
    },
    {
      title: 'Active Loans',
      value: String(activeLoans.length),
      sub: `${fmt(totalLoanBalance)} outstanding`,
      icon: <TrendingUpIcon sx={{ fontSize: 22 }} />,
      color: palette.info.dark,
      accent: palette.info.main,
      trend: activeLoans.length > 0 ? 'In repayment' : 'None active',
      trendUp: false,
    },
    {
      title: 'Loan Balance',
      value: fmt(totalLoanBalance),
      sub: 'Total outstanding',
      icon: <PaymentIcon sx={{ fontSize: 22 }} />,
      color: palette.secondary.dark,
      accent: palette.secondary.main,
      trend: totalLoanBalance > 0 ? 'Next due: 1st of month' : 'All clear',
      trendUp: totalLoanBalance === 0,
    },
    {
      title: 'Completed Loans',
      value: String(completedLoans),
      sub: 'Fully repaid',
      icon: <CheckCircleIcon sx={{ fontSize: 22 }} />,
      color: palette.primary.dark,
      accent: palette.primary.light,
      trend: completedLoans > 0 ? 'Great track record' : 'First loan pending',
      trendUp: true,
    },
  ];

  const quickActions = [
    { label: 'Manage Savings', sub: 'View & manage accounts', icon: <SavingsIcon sx={{ fontSize: 22 }} />, path: '/dashboard/savings', color: palette.primary.dark, accent: palette.primary.main, disabled: false },
    { label: 'Apply for Loan', sub: 'Quick online application', icon: <AccountBalanceIcon sx={{ fontSize: 22 }} />, path: '/dashboard/loans/apply', color: palette.info.dark, accent: palette.info.main, disabled: member?.status !== 'active' },
    { label: 'View Loans', sub: 'Track all your loans', icon: <TrendingUpIcon sx={{ fontSize: 22 }} />, path: '/dashboard/loans', color: palette.secondary.dark, accent: palette.secondary.main, disabled: false },
    { label: 'Update Profile', sub: 'Edit personal details', icon: <PersonOutlineIcon sx={{ fontSize: 22 }} />, path: '/dashboard/profile', color: palette.info.dark, accent: '#00897B', disabled: false },
  ];

  const recentActivity = [
    { icon: <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />, label: 'Monthly savings deducted', sub: 'Savings Account', time: '2 days ago', color: palette.primary.main },
    { icon: <AccountBalanceIcon sx={{ fontSize: 18 }} />, label: 'Loan repayment processed', sub: 'Personal Loan', time: '5 days ago', color: palette.info.main },
    { icon: <SavingsIcon sx={{ fontSize: 18 }} />, label: 'Dividend credited to account', sub: 'Annual dividend', time: '12 days ago', color: palette.secondary.main },
    { icon: <InfoOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Profile verification complete', sub: 'Member portal', time: '1 month ago', color: palette.primary.light },
  ];

  return (
    <Box sx={{ background: palette.background.default, minHeight: '100vh', fontFamily: typography.fontFamily }}>

      {/* ── HERO HEADER ───────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`,
        pt: { xs: 5, md: 7 }, pb: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}>
        {/* Blobs */}
        {[{ size: 500, top: -140, right: -140 }, { size: 360, bottom: -100, left: -100 }, { size: 200, top: '20%', left: '45%' }].map((b, i) => (
          <Box key={i} sx={{ position: 'absolute', width: b.size, height: b.size, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none' }} />
        ))}
        {/* Grain */}
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundSize: '200px', opacity: 0.5 }} />
        {[...Array(5)].map((_, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', top: `${10 + i * 17}%`, right: `${4 + (i % 3) * 5}%`, animation: `hd${i} ${3 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`, [`@keyframes hd${i}`]: { '0%,100%': { opacity: 0.2, transform: 'scale(1)' }, '50%': { opacity: 0.9, transform: 'scale(1.5)' } } }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 3, alignItems: 'flex-start' }}>
            {/* Left */}
            <Box>
              {/* Status badge */}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, mb: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px' }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: member?.status === 'active' ? palette.secondary.light : '#FFC107', boxShadow: `0 0 8px ${member?.status === 'active' ? palette.secondary.light : '#FFC107'}`, animation: 'pulse 2.5s ease infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.4 } } }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500, letterSpacing: '0.04em' }}>
                  {member?.status === 'active' ? 'Active Member' : 'Account Pending Approval'}
                </Typography>
              </Box>

              <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.15, mb: 1.5 }}>
                {greeting},<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {firstName}
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300, mb: 0 }}>
                Member #{member?.member_number || user} · {new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </Typography>
            </Box>

            {/* Right: notification + quick badge */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, px: 2.5, py: 1.5, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: `${br * 1.5}px` }}>
                <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: palette.secondary.light }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                  Next AGM: Q1 2025
                </Typography>
              </Box>
              <Box sx={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', '&:hover': { background: 'rgba(255,255,255,0.2)' } }}>
                <NotificationsNoneIcon sx={{ fontSize: 20, color: '#fff' }} />
                {pendingLoans > 0 && (
                  <Box sx={{ position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: '50%', background: '#FFC107', border: '1.5px solid rgba(255,255,255,0.8)' }} />
                )}
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Wave divider */}
        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: { xs: 50, md: 72 }, background: palette.background.default, clipPath: 'ellipse(58% 100% at 50% 100%)' }} />
      </Box>


      {/* ── STAT CARDS (overlap hero) ─────────────────────── */}
      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, position: 'relative', zIndex: 3, mb: 5 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily }}
            action={<Button color="inherit" size="small" onClick={fetchDashboardData}>Retry</Button>}>
            {error}
          </Alert>
        )}
        {member?.status === 'pending' && (
          <Alert severity="info" icon={<WarningAmberOutlinedIcon />} sx={{ mb: 3, borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily, background: `${palette.info.main}08`, border: `1px solid ${palette.info.main}20` }}>
            Your account is pending approval. You'll be notified once membership is activated.
          </Alert>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2.5 }}>
          {statCards.map((s, i) => (
            <Box key={i} sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: `${br * 2}px`,
              background: palette.background.paper,
              border: `1px solid ${palette.background.default}`,
              boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              position: 'relative', overflow: 'hidden',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 20px 52px ${s.color}12`, borderColor: 'transparent', '& .sc-icon': { background: `linear-gradient(135deg, ${s.color}, ${s.accent})`, color: '#fff' } },
            }}>
              {/* Top accent */}
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, ${s.accent})` }} />
              {/* Corner tint */}
              <Box sx={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${s.color}09, transparent 70%)`, borderRadius: `0 ${br * 2}px 0 100%`, pointerEvents: 'none' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: palette.text.secondary, fontSize: '0.68rem', lineHeight: 1.3 }}>{s.title}</Typography>
                <Box className="sc-icon" sx={{ width: 38, height: 38, borderRadius: `${br - 2}px`, background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)', flexShrink: 0 }}>
                  {s.icon}
                </Box>
              </Box>

              <Typography sx={{ fontFamily: typography.fontFamily, fontSize: { xs: '1.3rem', md: '1.55rem' }, fontWeight: 700, color: palette.text.primary, lineHeight: 1, mb: 0.5 }}>
                {s.value}
              </Typography>
              <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 2, fontSize: '0.75rem' }}>
                {s.sub}
              </Typography>

              {/* Trend pill */}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.25, py: 0.3, background: s.trendUp ? `${palette.primary.main}0a` : `${s.accent}0a`, border: `1px solid ${s.trendUp ? palette.primary.main : s.accent}18`, borderRadius: '100px' }}>
                <ArrowUpwardIcon sx={{ fontSize: 10, color: s.trendUp ? palette.primary.main : s.accent, transform: s.trendUp ? 'none' : 'rotate(180deg)' }} />
                <Typography variant="caption" sx={{ color: s.trendUp ? palette.primary.main : s.accent, fontWeight: 600, fontSize: '0.68rem' }}>{s.trend}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>


      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 380px' }, gap: 4 }}>

          {/* ── LEFT COLUMN ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

            {/* Quick Actions */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h5" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1.15rem', mb: 0.3 }}>
                    Quick Actions
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>
                    Everything you need, one click away
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2.5 }}>
                {quickActions.map((a, i) => (
                  <Box
                    key={i}
                    onClick={() => !a.disabled && navigate(a.path)}
                    sx={{
                      p: 3, borderRadius: `${br * 2}px`,
                      background: palette.background.paper,
                      border: `1px solid ${palette.background.default}`,
                      cursor: a.disabled ? 'not-allowed' : 'pointer',
                      opacity: a.disabled ? 0.5 : 1,
                      transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                      position: 'relative', overflow: 'hidden',
                      '&:hover': a.disabled ? {} : {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 18px 48px ${a.color}14`,
                        borderColor: 'transparent',
                        '& .qa-icon': { background: `linear-gradient(135deg, ${a.color}, ${a.accent})`, color: '#fff' },
                        '& .qa-arrow': { opacity: 1, transform: 'translateX(0)' },
                      },
                    }}
                  >
                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${a.color}, ${a.accent})` }} />
                    <Box className="qa-icon" sx={{ width: 44, height: 44, borderRadius: `${br}px`, background: `${a.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.color, mb: 2, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
                      {a.icon}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, mb: 0.4 }}>{a.label}</Typography>
                    <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.75rem', display: 'block', mb: 1.5 }}>{a.sub}</Typography>
                    <Box className="qa-arrow" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0, transform: 'translateX(-4px)', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)' }}>
                      <Typography variant="caption" sx={{ color: a.accent, fontWeight: 600, fontSize: '0.72rem' }}>Open</Typography>
                      <ArrowForwardIcon sx={{ fontSize: 12, color: a.accent }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Savings Accounts */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h5" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1.15rem', mb: 0.3 }}>
                    Savings Accounts
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>
                    {savingsAccounts.length} account{savingsAccounts.length !== 1 ? 's' : ''} active
                  </Typography>
                </Box>
                <Button size="small" endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                  onClick={() => navigate('/dashboard/savings')}
                  sx={{ fontFamily: typography.fontFamily, textTransform: 'none', fontSize: '0.82rem', color: palette.primary.main, fontWeight: 600, '&:hover': { background: `${palette.primary.main}08` } }}>
                  View all
                </Button>
              </Box>

              {savingsAccounts.length === 0 ? (
                <Box sx={{ p: 4, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px dashed ${palette.primary.main}20`, textAlign: 'center' }}>
                  <Box sx={{ width: 52, height: 52, borderRadius: '50%', background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                    <SavingsIcon sx={{ fontSize: 24, color: palette.primary.main }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: palette.text.secondary, mb: 1.5 }}>No savings accounts yet</Typography>
                  <Button size="small" variant="outlined" onClick={() => navigate('/dashboard/savings')}
                    sx={{ borderColor: `${palette.primary.main}30`, color: palette.primary.main, textTransform: 'none', fontFamily: typography.fontFamily, borderRadius: '100px', fontSize: '0.8rem' }}>
                    Set up savings
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {savingsAccounts.slice(0, 3).map((acc, i) => {
                    const bal = parseFloat(acc.balance.toString());
                    const pct = totalSavings > 0 ? (bal / totalSavings) * 100 : 0;
                    return (
                      <Box key={i} sx={{
                        p: 3, borderRadius: `${br * 1.5}px`,
                        background: palette.background.paper,
                        border: `1px solid ${palette.background.default}`,
                        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                        '&:hover': { transform: 'translateX(5px)', borderColor: `${palette.primary.main}20`, boxShadow: `0 8px 28px ${palette.primary.main}0a` },
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <SavingsIcon sx={{ fontSize: 18, color: palette.primary.main }} />
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, lineHeight: 1.2 }}>
                                {(acc as any).account_type || 'Savings Account'}
                              </Typography>
                              <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem' }}>
                                {(acc as any).account_number || `ACC-${String(i + 1).padStart(4, '0')}`}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: palette.primary.main, fontSize: '1.05rem' }}>
                            {fmt(bal)}
                          </Typography>
                        </Box>
                        {/* Progress bar */}
                        <Box sx={{ height: 5, borderRadius: '100px', background: `${palette.primary.main}10`, overflow: 'hidden' }}>
                          <Box sx={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${palette.primary.main}, ${palette.primary.dark})`, borderRadius: '100px', transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)' }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, mt: 0.75, display: 'block', fontSize: '0.7rem' }}>
                          {pct.toFixed(1)}% of total savings
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>

            {/* Active Loans */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h5" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1.15rem', mb: 0.3 }}>
                    Active Loans
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>
                    {activeLoans.length} loan{activeLoans.length !== 1 ? 's' : ''} in repayment
                  </Typography>
                </Box>
                <Button size="small" endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                  onClick={() => navigate('/dashboard/loans')}
                  sx={{ fontFamily: typography.fontFamily, textTransform: 'none', fontSize: '0.82rem', color: palette.primary.main, fontWeight: 600, '&:hover': { background: `${palette.primary.main}08` } }}>
                  View all
                </Button>
              </Box>

              {activeLoans.length === 0 ? (
                <Box sx={{ p: 4, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px dashed ${palette.primary.main}20`, textAlign: 'center' }}>
                  <Box sx={{ width: 52, height: 52, borderRadius: '50%', background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                    <AccountBalanceIcon sx={{ fontSize: 24, color: palette.primary.main }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: palette.text.secondary, mb: 1.5 }}>No active loans</Typography>
                  <Button size="small" variant="outlined" onClick={() => navigate('/dashboard/loans/apply')}
                    disabled={member?.status !== 'active'}
                    sx={{ borderColor: `${palette.primary.main}30`, color: palette.primary.main, textTransform: 'none', fontFamily: typography.fontFamily, borderRadius: '100px', fontSize: '0.8rem' }}>
                    Apply for a loan
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {activeLoans.slice(0, 3).map((loan, i) => {
                    const outstanding = parseFloat((loan.outstanding_balance || loan.amount_approved || 0).toString());
                    const approved = parseFloat((loan.amount_approved || 0).toString());
                    const repaid = approved - outstanding;
                    const pct = approved > 0 ? (repaid / approved) * 100 : 0;
                    return (
                      <Box key={i} sx={{
                        p: 3, borderRadius: `${br * 1.5}px`,
                        background: palette.background.paper,
                        border: `1px solid ${palette.background.default}`,
                        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                        '&:hover': { transform: 'translateX(5px)', borderColor: `${palette.info.main}20`, boxShadow: `0 8px 28px ${palette.info.main}0a` },
                      }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, background: `${palette.info.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <AccountBalanceIcon sx={{ fontSize: 18, color: palette.info.main }} />
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, lineHeight: 1.2 }}>
                                {(loan as any).loan_type || 'Personal Loan'}
                              </Typography>
                              <Box sx={{ display: 'inline-flex', px: 1, py: 0.2, background: `${palette.info.main}10`, border: `1px solid ${palette.info.main}18`, borderRadius: '100px', mt: 0.4 }}>
                                <Typography variant="caption" sx={{ color: palette.info.main, fontWeight: 600, fontSize: '0.65rem' }}>Active</Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: palette.info.dark, fontSize: '1.05rem', lineHeight: 1 }}>
                              {fmt(outstanding)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.7rem' }}>remaining</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ height: 5, borderRadius: '100px', background: `${palette.info.main}10`, overflow: 'hidden' }}>
                          <Box sx={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${palette.info.main}, ${palette.info.dark})`, borderRadius: '100px', transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)' }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, mt: 0.75, display: 'block', fontSize: '0.7rem' }}>
                          {pct.toFixed(1)}% repaid · {fmt(approved)} approved
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>


          {/* ── RIGHT COLUMN ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

            {/* Member card */}
            <Box sx={{
              borderRadius: `${br * 2}px`, overflow: 'hidden',
              background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
              position: 'relative',
              boxShadow: `0 12px 40px ${palette.primary.dark}30`,
            }}>
              <Box sx={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.09), transparent 70%)', pointerEvents: 'none' }} />
              <Box sx={{ position: 'absolute', bottom: -20, left: '30%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)', pointerEvents: 'none' }} />
              <Box sx={{ p: 3.5, position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box sx={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: '#fff', fontSize: '1.3rem' }}>
                      {firstName.charAt(0).toUpperCase()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#fff', fontSize: '1rem', lineHeight: 1.2 }}>{member?.first_name} {member?.last_name}</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)' }}>#{member?.member_number || user}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 3 }}>
                  {[
                    { label: 'Savings', val: fmt(totalSavings) },
                    { label: 'Loans', val: String(loans.length) },
                    { label: 'Status', val: member?.status === 'active' ? 'Active' : 'Pending' },
                    { label: 'Completed', val: String(completedLoans) },
                  ].map((d, i) => (
                    <Box key={i} sx={{ p: 1.5, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: `${br - 2}px` }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mb: 0.25, fontSize: '0.68rem' }}>{d.label}</Typography>
                      <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#fff', fontSize: '0.88rem', lineHeight: 1 }}>{d.val}</Typography>
                    </Box>
                  ))}
                </Box>

                <Button fullWidth size="small" onClick={() => navigate('/dashboard/profile')}
                  sx={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '100px', textTransform: 'none', fontFamily: typography.fontFamily, fontWeight: 600, fontSize: '0.82rem', '&:hover': { background: 'rgba(255,255,255,0.25)' } }}>
                  View Profile
                </Button>
              </Box>
            </Box>

            {/* Recent Activity */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h5" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1.15rem', mb: 0.3 }}>
                    Recent Activity
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>Your latest transactions</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {recentActivity.map((a, i) => (
                  <Box key={i} sx={{
                    display: 'flex', alignItems: 'center', gap: 2,
                    p: 2.5, borderRadius: `${br * 1.5}px`,
                    background: palette.background.paper,
                    border: `1px solid ${palette.background.default}`,
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                    '&:hover': { transform: 'translateX(4px)', borderColor: `${a.color}18`, boxShadow: `0 4px 18px ${a.color}0a` },
                  }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '50%', background: `${a.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.color, flexShrink: 0 }}>
                      {a.icon}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, fontSize: '0.83rem', lineHeight: 1.3 }}>{a.label}</Typography>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem' }}>{a.sub}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.68rem', flexShrink: 0 }}>{a.time}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Apply CTA card */}
            {member?.status === 'active' && (
              <Box sx={{
                p: 3.5, borderRadius: `${br * 2}px`,
                background: palette.background.paper,
                border: `1px solid ${palette.background.default}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${palette.secondary.dark}, ${palette.secondary.main})` }} />
                <Box sx={{ width: 44, height: 44, borderRadius: `${br}px`, background: `${palette.secondary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.secondary.dark, mb: 2 }}>
                  <AccountBalanceIcon sx={{ fontSize: 22 }} />
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, mb: 0.75, fontSize: '0.97rem' }}>Need a loan?</Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block', mb: 2.5, fontSize: '0.8rem' }}>
                  From 8% p.a. — apply in minutes, get a decision in 48 hours.
                </Typography>
                <Button fullWidth variant="contained" size="small"
                  onClick={() => navigate('/dashboard/loans/apply')}
                  sx={{ background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`, boxShadow: `0 6px 20px ${palette.primary.main}30`, textTransform: 'none', fontFamily: typography.fontFamily, fontWeight: 600, borderRadius: `${br * 1.5}px`, '&:hover': { boxShadow: `0 10px 28px ${palette.primary.main}45` } }}>
                  Apply Now
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;