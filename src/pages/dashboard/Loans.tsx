import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Button, Alert,
  CircularProgress, useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../../utils/api';
import type { Loan } from '../../types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SpeedIcon from '@mui/icons-material/Speed';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Loans: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const navigate = useNavigate();

  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'disbursed' | 'completed' | 'rejected'>('all');

  useEffect(() => { fetchLoans(); }, []);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const response = await api.get('/loans');
      setLoans(response.data.loans || []);
    } catch {
      setError('Failed to load loans');
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n: number) => '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2 });
  const fmtShort = (n: number) => '₦' + n.toLocaleString('en-NG');

  const statusConfig: Record<string, { label: string; color: string; accent: string; bg: string }> = {
    pending:   { label: 'Pending Review', color: '#ED6C02', accent: '#FF9800', bg: 'rgba(237,108,2,0.08)' },
    approved:  { label: 'Approved',       color: palette.info.dark,      accent: palette.info.main,      bg: `${palette.info.main}10` },
    disbursed: { label: 'Active',         color: palette.primary.dark,   accent: palette.primary.main,   bg: `${palette.primary.main}10` },
    completed: { label: 'Completed',      color: '#2E7D32',              accent: '#43A047',              bg: 'rgba(46,125,50,0.08)' },
    rejected:  { label: 'Rejected',       color: '#C62828',              accent: '#E53935',              bg: 'rgba(198,40,40,0.08)' },
  };

  const loanTypeConfig: Record<string, { icon: React.ElementType; color: string; accent: string }> = {
    personal:    { icon: PersonOutlineIcon,    color: palette.primary.dark,   accent: palette.primary.main },
    business:    { icon: BusinessCenterIcon,   color: palette.info.dark,      accent: palette.info.main },
    emergency:   { icon: SpeedIcon,            color: palette.secondary.dark, accent: palette.secondary.main },
    educational: { icon: SchoolIcon,           color: palette.info.dark,      accent: '#00897B' },
  };

  const getTypeConfig = (type: string) =>
    loanTypeConfig[type?.toLowerCase()] || loanTypeConfig['personal'];

  // Summary stats
  const totalLoans = loans.length;
  const activeLoans = loans.filter(l => l.status === 'disbursed');
  const completedLoans = loans.filter(l => l.status === 'completed');
  const pendingLoans = loans.filter(l => l.status === 'pending');
  const totalOutstanding = activeLoans.reduce(
    (s, l) => s + parseFloat(String(l.outstanding_balance ?? l.amount_approved ?? 0)), 0
  );
  const totalBorrowed = loans
    .filter(l => l.amount_approved)
    .reduce((s, l) => s + parseFloat(String(l.amount_approved ?? 0)), 0);

  const filters: { key: typeof filter; label: string; count: number }[] = [
    { key: 'all',       label: 'All Loans',  count: totalLoans },
    { key: 'disbursed', label: 'Active',      count: activeLoans.length },
    { key: 'pending',   label: 'Pending',     count: pendingLoans.length },
    { key: 'completed', label: 'Completed',   count: completedLoans.length },
    { key: 'rejected',  label: 'Rejected',    count: loans.filter(l => l.status === 'rejected').length },
  ];

  const filtered = filter === 'all' ? loans : loans.filter(l => l.status === filter);

  // ── LOADING ─────────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.background.default }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3, background: `${palette.primary.main}10`, border: `2px solid ${palette.primary.main}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={32} sx={{ color: palette.primary.main }} />
          </Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300 }}>Loading your loans…</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ background: palette.background.default, minHeight: '100vh', fontFamily: typography.fontFamily, pb: 8 }}>

      {/* ── HERO HEADER ───────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`,
        pt: { xs: 5, md: 7 }, pb: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}>
        {[{ size: 480, top: -130, right: -130 }, { size: 340, bottom: -90, left: -90 }, { size: 180, top: '30%', left: '48%' }].map((b, i) => (
          <Box key={i} sx={{ position: 'absolute', width: b.size, height: b.size, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none' }} />
        ))}
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundSize: '200px', opacity: 0.5 }} />
        {[...Array(5)].map((_, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', top: `${12 + i * 16}%`, right: `${4 + (i % 3) * 5}%`, animation: `hd${i} ${3 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`, [`@keyframes hd${i}`]: { '0%,100%': { opacity: 0.2, transform: 'scale(1)' }, '50%': { opacity: 0.9, transform: 'scale(1.5)' } } }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 3, alignItems: 'flex-end' }}>
            <Box>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, mb: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px' }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: palette.secondary.light, boxShadow: `0 0 8px ${palette.secondary.light}`, animation: 'blink 2.5s ease infinite', '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500, letterSpacing: '0.05em' }}>Loan Management</Typography>
              </Box>
              <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '2.2rem', md: '3.2rem' }, lineHeight: 1.1, mb: 1.5 }}>
                My Loans<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  & Repayments
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.62)', fontWeight: 300 }}>
                {totalLoans} loan{totalLoans !== 1 ? 's' : ''} · {activeLoans.length} active · {completedLoans.length} completed
              </Typography>
            </Box>

            <Button
              variant="contained" size="large"
              startIcon={<AddIcon />}
              onClick={() => navigate('/dashboard/loans/apply')}
              sx={{
                background: '#fff', color: palette.primary.dark,
                fontFamily: typography.fontFamily, fontWeight: 700, textTransform: 'none',
                borderRadius: `${br * 1.5}px`, px: 3.5, py: 1.5,
                boxShadow: '0 10px 36px rgba(0,0,0,0.2)',
                '&:hover': { background: palette.background.default, boxShadow: '0 16px 48px rgba(0,0,0,0.28)' },
                alignSelf: { xs: 'flex-start', md: 'flex-end' },
              }}
            >
              Apply for Loan
            </Button>
          </Box>
        </Container>

        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: { xs: 50, md: 72 }, background: palette.background.default, clipPath: 'ellipse(58% 100% at 50% 100%)' }} />
      </Box>

      {/* ── SUMMARY STAT CARDS (overlap hero) ─────────────── */}
      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, position: 'relative', zIndex: 3, mb: 5 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2.5 }}>
          {[
            { label: 'Total Loans', val: String(totalLoans), sub: 'All time', icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 20 }} />, color: palette.primary.dark, accent: palette.primary.main },
            { label: 'Active Loans', val: String(activeLoans.length), sub: 'In repayment', icon: <PaymentsOutlinedIcon sx={{ fontSize: 20 }} />, color: palette.info.dark, accent: palette.info.main },
            { label: 'Outstanding', val: totalOutstanding > 0 ? fmtShort(totalOutstanding) : '₦0', sub: 'Total balance due', icon: <TrendingDownIcon sx={{ fontSize: 20 }} />, color: palette.secondary.dark, accent: palette.secondary.main },
            { label: 'Total Borrowed', val: totalBorrowed > 0 ? fmtShort(totalBorrowed) : '₦0', sub: 'Approved & disbursed', icon: <TaskAltIcon sx={{ fontSize: 20 }} />, color: '#2E7D32', accent: '#43A047' },
          ].map((s, i) => (
            <Box key={i} sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: `${br * 2}px`,
              background: palette.background.paper,
              border: `1px solid ${palette.background.default}`,
              boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 20px 52px ${s.color}12`, borderColor: 'transparent', '& .sl-icon': { background: `linear-gradient(135deg, ${s.color}, ${s.accent})`, color: '#fff' } },
            }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, ${s.accent})` }} />
              <Box sx={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${s.color}08, transparent 70%)`, borderRadius: `0 ${br * 2}px 0 100%`, pointerEvents: 'none' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="overline" sx={{ color: palette.text.secondary, fontSize: '0.65rem' }}>{s.label}</Typography>
                <Box className="sl-icon" sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
                  {s.icon}
                </Box>
              </Box>
              <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: palette.text.primary, fontSize: { xs: '1.25rem', md: '1.5rem' }, lineHeight: 1, mb: 0.5 }}>
                {s.val}
              </Typography>
              <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem' }}>{s.sub}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── LOANS LIST ────────────────────────────────────── */}
      <Container maxWidth="lg">

        {/* Filter tabs */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
          {filters.map((f) => {
            const active = filter === f.key;
            const cfg = f.key !== 'all' ? statusConfig[f.key] : null;
            return (
              <Box
                key={f.key}
                onClick={() => setFilter(f.key)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1,
                  px: 2.5, py: 1,
                  borderRadius: '100px',
                  border: `1.5px solid ${active ? (cfg?.color || palette.primary.main) + '40' : palette.background.default}`,
                  background: active ? (cfg ? `${cfg.color}0e` : `${palette.primary.main}0a`) : palette.background.paper,
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': { borderColor: `${cfg?.color || palette.primary.main}25` },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: active ? 700 : 400, color: active ? (cfg?.color || palette.primary.main) : palette.text.secondary, fontSize: '0.82rem', fontFamily: typography.fontFamily }}>
                  {f.label}
                </Typography>
                <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: active ? (cfg?.color || palette.primary.main) : `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="caption" sx={{ color: active ? '#fff' : palette.text.secondary, fontWeight: 700, fontSize: '0.65rem', lineHeight: 1 }}>{f.count}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Empty state */}
        {filtered.length === 0 && (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Box sx={{ width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 3, background: `${palette.primary.main}08`, border: `2px dashed ${palette.primary.main}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AccountBalanceOutlinedIcon sx={{ fontSize: 36, color: `${palette.primary.main}40` }} />
            </Box>
            <Typography variant="h5" sx={{ color: palette.text.primary, fontWeight: 700, mb: 1.5 }}>
              {filter === 'all' ? "You haven't applied for any loans yet" : `No ${filter} loans`}
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4, maxWidth: 380, mx: 'auto' }}>
              {filter === 'all'
                ? 'From 8% p.a. — apply in minutes and get a decision within 48 hours.'
                : `You have no loans with "${filter}" status at the moment.`}
            </Typography>
            {filter === 'all' && (
              <Button
                variant="contained" size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate('/dashboard/loans/apply')}
                sx={{
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  boxShadow: `0 10px 30px ${palette.primary.main}35`,
                  textTransform: 'none', fontFamily: typography.fontFamily, fontWeight: 700,
                  borderRadius: `${br * 1.5}px`, px: 4, py: 1.5,
                  '&:hover': { boxShadow: `0 16px 42px ${palette.primary.main}50`, transform: 'translateY(-1px)' },
                  transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                Apply for Your First Loan
              </Button>
            )}
          </Box>
        )}

        {/* Loan cards */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {filtered.map((loan) => {
            const status = statusConfig[loan.status] || statusConfig['pending'];
            const typeConfig = getTypeConfig(loan.loan_type);
            const requested = parseFloat(String(loan.amount_requested ?? 0));
            const approved = parseFloat(String(loan.amount_approved ?? 0));
            const outstanding = parseFloat(String(loan.outstanding_balance ?? approved));
            const monthly = parseFloat(String(loan.monthly_repayment ?? 0));
            const repaidPct = approved > 0 && loan.status === 'disbursed'
              ? Math.min(100, Math.round(((approved - outstanding) / approved) * 100))
              : loan.status === 'completed' ? 100 : 0;

            return (
              <Box
                key={loan.id}
                sx={{
                  borderRadius: `${br * 2}px`,
                  background: palette.background.paper,
                  border: `1px solid ${palette.background.default}`,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 56px ${typeConfig.color}12`,
                    borderColor: 'transparent',
                    '& .lc-img': { transform: 'scale(1.06)' },
                  },
                }}
              >
                {/* Top accent bar */}
                <Box sx={{ height: 4, background: `linear-gradient(90deg, ${typeConfig.color}, ${typeConfig.accent}, ${status.color})` }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 220px' } }}>
                  {/* Main content */}
                  <Box sx={{ p: { xs: 3, md: 4.5 } }}>
                    {/* Header row */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                          width: 48, height: 48, borderRadius: `${br}px`, flexShrink: 0,
                          background: `linear-gradient(135deg, ${typeConfig.color}, ${typeConfig.accent})`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', boxShadow: `0 8px 22px ${typeConfig.color}30`,
                        }}>
                          <typeConfig.icon />
                        </Box>
                        <Box>
                          <Typography variant="h5" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1.1rem', textTransform: 'capitalize', lineHeight: 1.25, mb: 0.4 }}>
                            {loan.loan_type} Loan
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.3, background: status.bg, border: `1px solid ${status.color}20`, borderRadius: '100px' }}>
                              <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: status.color, flexShrink: 0 }} />
                              <Typography variant="caption" sx={{ color: status.color, fontWeight: 700, fontSize: '0.68rem' }}>{status.label}</Typography>
                            </Box>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.25, py: 0.3, background: `${typeConfig.color}08`, border: `1px solid ${typeConfig.color}15`, borderRadius: '100px' }}>
                              <PercentOutlinedIcon sx={{ fontSize: 10, color: typeConfig.accent }} />
                              <Typography variant="caption" sx={{ color: typeConfig.color, fontWeight: 600, fontSize: '0.65rem' }}>{loan.interest_rate}% p.a.</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarMonthOutlinedIcon sx={{ fontSize: 13 }} />
                        Applied {format(new Date(loan.application_date), 'MMM dd, yyyy')}
                      </Typography>
                    </Box>

                    {/* Amounts grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2,1fr)', sm: 'repeat(3,1fr)', md: 'repeat(4,1fr)' }, gap: 2, mb: 3 }}>
                      <Box sx={{ p: 2, borderRadius: `${br - 2}px`, background: palette.background.default, border: `1px solid ${typeConfig.color}08` }}>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.4, fontSize: '0.68rem' }}>Requested</Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: palette.text.primary, fontSize: '0.95rem', lineHeight: 1 }}>{fmtShort(requested)}</Typography>
                      </Box>
                      {approved > 0 && (
                        <Box sx={{ p: 2, borderRadius: `${br - 2}px`, background: 'rgba(46,125,50,0.06)', border: '1px solid rgba(46,125,50,0.12)' }}>
                          <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.4, fontSize: '0.68rem' }}>Approved</Typography>
                          <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#2E7D32', fontSize: '0.95rem', lineHeight: 1 }}>{fmtShort(approved)}</Typography>
                        </Box>
                      )}
                      {loan.status === 'disbursed' && (
                        <Box sx={{ p: 2, borderRadius: `${br - 2}px`, background: `${typeConfig.color}07`, border: `1px solid ${typeConfig.color}14` }}>
                          <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.4, fontSize: '0.68rem' }}>Outstanding</Typography>
                          <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: typeConfig.color, fontSize: '0.95rem', lineHeight: 1 }}>{fmtShort(outstanding)}</Typography>
                        </Box>
                      )}
                      <Box sx={{ p: 2, borderRadius: `${br - 2}px`, background: palette.background.default, border: `1px solid ${typeConfig.color}08` }}>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.4, fontSize: '0.68rem' }}>Duration</Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: palette.text.primary, fontSize: '0.95rem', lineHeight: 1 }}>{loan.duration_months}mo</Typography>
                      </Box>
                      {monthly > 0 && (
                        <Box sx={{ p: 2, borderRadius: `${br - 2}px`, background: palette.background.default, border: `1px solid ${typeConfig.color}08` }}>
                          <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.4, fontSize: '0.68rem' }}>Monthly</Typography>
                          <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: palette.text.primary, fontSize: '0.95rem', lineHeight: 1 }}>{fmtShort(monthly)}</Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Repayment progress bar — active loans only */}
                    {loan.status === 'disbursed' && (
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem' }}>Repayment progress</Typography>
                          <Typography variant="caption" sx={{ color: typeConfig.color, fontWeight: 700, fontSize: '0.72rem' }}>{repaidPct}% repaid</Typography>
                        </Box>
                        <Box sx={{ height: 8, borderRadius: '100px', background: `${typeConfig.color}12`, overflow: 'hidden' }}>
                          <Box sx={{ height: '100%', width: `${repaidPct}%`, background: `linear-gradient(90deg, ${typeConfig.color}, ${typeConfig.accent})`, borderRadius: '100px', transition: 'width 1s cubic-bezier(0.22,1,0.36,1)' }} />
                        </Box>
                      </Box>
                    )}

                    {/* Completed badge */}
                    {loan.status === 'completed' && (
                      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5, p: 2, borderRadius: `${br - 2}px`, background: 'rgba(46,125,50,0.06)', border: '1px solid rgba(46,125,50,0.15)' }}>
                        <TaskAltIcon sx={{ fontSize: 18, color: '#2E7D32' }} />
                        <Typography variant="body2" sx={{ color: '#2E7D32', fontWeight: 600, fontSize: '0.82rem' }}>Loan fully repaid — great financial track record!</Typography>
                      </Box>
                    )}

                    {/* Purpose */}
                    <Box sx={{ mb: 3, p: 2, borderRadius: `${br - 2}px`, background: palette.background.default, border: `1px solid ${typeConfig.color}08` }}>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.5, fontSize: '0.68rem' }}>PURPOSE</Typography>
                      <Typography variant="body2" sx={{ color: palette.text.primary, fontWeight: 300, lineHeight: 1.7, fontSize: '0.85rem' }}>
                        {loan.purpose.length > 140 ? loan.purpose.slice(0, 140) + '…' : loan.purpose}
                      </Typography>
                    </Box>

                    {/* Action buttons */}
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        size="small"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 15 }} />}
                        onClick={() => navigate(`/dashboard/loans/${loan.id}`)}
                        sx={{
                          background: `linear-gradient(135deg, ${typeConfig.color}, ${typeConfig.accent})`,
                          boxShadow: `0 6px 18px ${typeConfig.color}30`,
                          textTransform: 'none', fontFamily: typography.fontFamily,
                          fontWeight: 700, fontSize: '0.82rem',
                          borderRadius: `${br * 1.5}px`, px: 2.5, py: 1,
                          '&:hover': { boxShadow: `0 10px 26px ${typeConfig.color}45`, transform: 'translateY(-1px)' },
                          transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                        }}
                      >
                        View Details
                      </Button>
                      {loan.status === 'disbursed' && (
                        <Button
                          variant="outlined" size="small"
                          startIcon={<PaymentsOutlinedIcon sx={{ fontSize: 15 }} />}
                          onClick={() => navigate(`/dashboard/loans/${loan.id}`)}
                          sx={{
                            borderColor: `${typeConfig.color}30`, color: typeConfig.color,
                            textTransform: 'none', fontFamily: typography.fontFamily,
                            fontWeight: 600, fontSize: '0.82rem',
                            borderRadius: `${br * 1.5}px`, px: 2.5, py: 1,
                            '&:hover': { borderColor: `${typeConfig.color}60`, background: `${typeConfig.color}06` },
                          }}
                        >
                          Make Repayment
                        </Button>
                      )}
                    </Box>
                  </Box>

                  {/* Right: visual panel */}
                  <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `linear-gradient(145deg, ${typeConfig.color}0e, ${typeConfig.accent}06)`,
                    borderLeft: `1px solid ${typeConfig.color}12`,
                    p: 3.5, gap: 3,
                  }}>
                    {/* Big icon */}
                    <Box sx={{
                      width: 72, height: 72, borderRadius: `${br * 1.5}px`,
                      background: `linear-gradient(145deg, ${typeConfig.color}, ${typeConfig.accent})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', boxShadow: `0 12px 36px ${typeConfig.color}35`,
                    }}>
                      <typeConfig.icon sx={{ fontSize: 34 }} />
                    </Box>

                    {/* Loan ID */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.5, fontSize: '0.65rem' }}>LOAN ID</Typography>
                      <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, color: typeConfig.color, fontSize: '0.82rem', letterSpacing: '0.06em' }}>
                        #{loan.id.substring(0, 8).toUpperCase()}
                      </Typography>
                    </Box>

                    {/* Status ring */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{ width: 56, height: 56, borderRadius: '50%', mx: 'auto', mb: 1, background: status.bg, border: `3px solid ${status.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {loan.status === 'completed'
                          ? <TaskAltIcon sx={{ fontSize: 24, color: status.color }} />
                          : loan.status === 'rejected'
                          ? <InfoOutlinedIcon sx={{ fontSize: 24, color: status.color }} />
                          : <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: status.color, animation: ['disbursed','pending'].includes(loan.status) ? 'statusPulse 2s ease-in-out infinite' : 'none', '@keyframes statusPulse': { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.4, transform: 'scale(1.4)' } } }} />
                        }
                      </Box>
                      <Typography variant="caption" sx={{ color: status.color, fontWeight: 700, fontSize: '0.72rem' }}>{status.label}</Typography>
                    </Box>

                    {/* Completion pct for active */}
                    {(loan.status === 'disbursed' || loan.status === 'completed') && (
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: typeConfig.color, fontSize: '1.6rem', lineHeight: 1 }}>{repaidPct}%</Typography>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.68rem' }}>repaid</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Apply CTA bottom */}
        {loans.length > 0 && (
          <Box sx={{ mt: 6, p: { xs: 4, md: 5 }, borderRadius: `${br * 2}px`, background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
            <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', bottom: -30, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)', pointerEvents: 'none' }} />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                Need Another Loan?
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.62)', fontWeight: 300, mb: 4, maxWidth: 420, mx: 'auto' }}>
                From 8% p.a. — apply in minutes with your existing member profile.
              </Typography>
              <Button
                variant="contained" size="large"
                startIcon={<AddIcon />}
                onClick={() => navigate('/dashboard/loans/apply')}
                sx={{
                  background: '#fff', color: palette.primary.dark,
                  fontFamily: typography.fontFamily, fontWeight: 700,
                  textTransform: 'none', borderRadius: `${br * 1.5}px`,
                  px: 4, py: 1.5, boxShadow: '0 10px 36px rgba(0,0,0,0.2)',
                  '&:hover': { background: palette.background.default, boxShadow: '0 16px 48px rgba(0,0,0,0.28)' },
                }}
              >
                Apply for New Loan
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Loans;