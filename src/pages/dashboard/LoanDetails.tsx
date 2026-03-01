import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Button, Alert, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, CircularProgress, useTheme, InputAdornment,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SpeedIcon from '@mui/icons-material/Speed';
import SchoolIcon from '@mui/icons-material/School';
import api from '../../utils/api';
import type { Loan, LoanRepayment } from '../../types';

const LoanDetails: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<Loan | null>(null);
  const [repayments, setRepayments] = useState<LoanRepayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => { fetchLoanDetails(); }, [loanId]);

  const fetchLoanDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/loans/${loanId}`);
      setLoan(response.data.loan);
      setRepayments(response.data.repayments || []);
    } catch {
      setError('Failed to load loan details');
    } finally {
      setLoading(false);
    }
  };

  const handleRepayment = async () => {
    if (!loan || !repaymentAmount || !paymentMethod) return;
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/loans/repayment', {
        loanId: loan.id,
        amount: parseFloat(repaymentAmount),
        paymentMethod,
        referenceNumber: referenceNumber || 'N/A',
      });
      setSuccess('Repayment recorded successfully!');
      setDialogOpen(false);
      setRepaymentAmount('');
      setPaymentMethod('');
      setReferenceNumber('');
      await fetchLoanDetails();
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const e = err as { response?: { data?: { error?: string } } };
        setError(e.response?.data?.error || 'Repayment failed');
      } else {
        setError('Repayment failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const fmt = (n: number) => '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2 });

  const statusConfig: Record<string, { label: string; color: string; accent: string; bg: string }> = {
    pending:   { label: 'Pending Review', color: '#ED6C02', accent: '#FF9800', bg: 'rgba(237,108,2,0.08)' },
    approved:  { label: 'Approved',       color: palette.info.dark, accent: palette.info.main, bg: `${palette.info.main}10` },
    disbursed: { label: 'Active',         color: palette.primary.dark, accent: palette.primary.main, bg: `${palette.primary.main}10` },
    completed: { label: 'Completed',      color: '#2E7D32', accent: '#43A047', bg: 'rgba(46,125,50,0.08)' },
    rejected:  { label: 'Rejected',       color: '#C62828', accent: '#E53935', bg: 'rgba(198,40,40,0.08)' },
  };

  const loanTypeConfig: Record<string, { icon: React.ReactNode; color: string; accent: string }> = {
    personal:    { icon: <PersonOutlineIcon sx={{ fontSize: 22 }} />, color: palette.primary.dark, accent: palette.primary.main },
    business:    { icon: <BusinessCenterIcon sx={{ fontSize: 22 }} />, color: palette.info.dark, accent: palette.info.main },
    emergency:   { icon: <SpeedIcon sx={{ fontSize: 22 }} />, color: palette.secondary.dark, accent: palette.secondary.main },
    educational: { icon: <SchoolIcon sx={{ fontSize: 22 }} />, color: palette.info.dark, accent: '#00897B' },
  };

  const fieldSx = (name: string) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: `${br * 1.5}px`,
      fontFamily: typography.fontFamily,
      fontSize: '0.9rem',
      background: focused === name ? palette.background.paper : `${palette.primary.main}04`,
      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      '& fieldset': {
        borderColor: focused === name ? palette.primary.main : `${palette.primary.main}20`,
        borderWidth: focused === name ? 2 : 1,
        transition: 'all 0.25s',
      },
      '&:hover fieldset': { borderColor: `${palette.primary.main}45` },
    },
    '& .MuiInputLabel-root': {
      fontFamily: typography.fontFamily, fontSize: '0.88rem',
      color: palette.text.secondary,
      '&.Mui-focused': { color: palette.primary.main },
    },
    '& .MuiFormHelperText-root': { fontFamily: typography.fontFamily, fontSize: '0.75rem' },
  });

  // ── LOADING ────────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.background.default }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3, background: `${palette.primary.main}10`, border: `2px solid ${palette.primary.main}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={32} sx={{ color: palette.primary.main }} />
          </Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300 }}>Loading loan details…</Typography>
        </Box>
      </Box>
    );
  }

  if (!loan) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.background.default, px: 3 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 380 }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', mx: 'auto', mb: 3, background: 'rgba(198,40,40,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CloseIcon sx={{ fontSize: 28, color: '#C62828' }} />
          </Box>
          <Typography variant="h5" sx={{ color: palette.text.primary, fontWeight: 700, mb: 1 }}>Loan Not Found</Typography>
          <Typography variant="body2" sx={{ color: palette.text.secondary, mb: 3 }}>We couldn't locate this loan. It may have been removed or you may not have access.</Typography>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard/loans')} variant="outlined"
            sx={{ borderColor: `${palette.primary.main}30`, color: palette.primary.main, textTransform: 'none', borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily }}>
            Back to Loans
          </Button>
        </Box>
      </Box>
    );
  }

  const status = statusConfig[loan.status] || statusConfig['pending'];
  const typeConfig = loanTypeConfig[loan.loan_type?.toLowerCase()] || loanTypeConfig['personal'];
  const outstanding = parseFloat(String(loan.outstanding_balance ?? loan.amount_approved ?? 0));
  const approved = parseFloat(String(loan.amount_approved ?? 0));
  const requested = parseFloat(String(loan.amount_requested ?? 0));
  const monthly = parseFloat(String(loan.monthly_repayment ?? 0));
  const repaid = approved - outstanding;
  const repaidPct = approved > 0 ? Math.min(100, Math.round((repaid / approved) * 100)) : 0;
  const totalRepaid = repayments.reduce((s, r) => s + parseFloat(String(r.amount || 0)), 0);

  const paymentMethods = [
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'cash', label: 'Cash' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'mobile_money', label: 'Mobile Money' },
  ];

  const formatDate = (d?: string | null) => d ? format(new Date(d), 'MMM dd, yyyy') : '—';

  return (
    <Box sx={{ background: palette.background.default, minHeight: '100vh', fontFamily: typography.fontFamily, pb: 8 }}>

      {/* ── HERO HEADER ───────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(150deg, ${typeConfig.color} 0%, ${typeConfig.accent} 55%, ${palette.secondary.dark} 100%)`,
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
          <Button startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />} onClick={() => navigate('/dashboard/loans')}
            sx={{ color: 'rgba(255,255,255,0.75)', textTransform: 'none', fontFamily: typography.fontFamily, fontSize: '0.85rem', mb: 3, p: 0, '&:hover': { color: '#fff', background: 'transparent' } }}>
            Back to Loans
          </Button>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 4, alignItems: 'flex-end' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 44, height: 44, borderRadius: `${br}px`, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  {typeConfig.icon}
                </Box>
                <Box sx={{ display: 'inline-flex', px: 2, py: 0.6, background: status.bg.replace('0.08', '0.15'), backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px' }}>
                  <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.06em' }}>{status.label}</Typography>
                </Box>
              </Box>

              <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.15, mb: 1.5, textTransform: 'capitalize' }}>
                {loan.loan_type} Loan<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  #{loan.id.substring(0, 8).toUpperCase()}
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
                Applied {formatDate(loan.application_date)} · {loan.duration_months} month repayment plan
              </Typography>
            </Box>

            {/* Outstanding balance big display */}
            {loan.status === 'disbursed' && (
              <Box sx={{ display: { xs: 'none', md: 'block' }, p: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: `${br * 2}px`, textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)', display: 'block', mb: 0.5 }}>Outstanding Balance</Typography>
                <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: '#fff', fontSize: '2.2rem', lineHeight: 1 }}>
                  {fmt(outstanding)}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>{repaidPct}% repaid</Typography>
              </Box>
            )}
          </Box>
        </Container>

        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: { xs: 50, md: 72 }, background: palette.background.default, clipPath: 'ellipse(58% 100% at 50% 100%)' }} />
      </Box>


      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, position: 'relative', zIndex: 3 }}>

        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ mb: 3, borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily, background: 'rgba(198,40,40,0.06)', border: '1px solid rgba(198,40,40,0.18)' }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" onClose={() => setSuccess('')} sx={{ mb: 3, borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily, background: 'rgba(46,125,50,0.06)', border: '1px solid rgba(46,125,50,0.18)' }}>
            {success}
          </Alert>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 360px' }, gap: 4, alignItems: 'start' }}>

          {/* ── LEFT COLUMN ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

            {/* Stat cards row */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2.5 }}>
              {[
                { label: 'Amount Requested', val: fmt(requested), icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 20 }} />, color: palette.primary.dark, accent: palette.primary.main },
                { label: 'Amount Approved', val: approved > 0 ? fmt(approved) : '—', icon: <TaskAltIcon sx={{ fontSize: 20 }} />, color: '#2E7D32', accent: '#43A047' },
                { label: 'Monthly Payment', val: monthly > 0 ? fmt(monthly) : '—', icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 20 }} />, color: palette.info.dark, accent: palette.info.main },
                { label: 'Interest Rate', val: `${loan.interest_rate}%`, icon: <PercentOutlinedIcon sx={{ fontSize: 20 }} />, color: palette.secondary.dark, accent: palette.secondary.main },
              ].map((s, i) => (
                <Box key={i} sx={{
                  p: { xs: 2.5, md: 3 }, borderRadius: `${br * 2}px`,
                  background: palette.background.paper,
                  border: `1px solid ${palette.background.default}`,
                  boxShadow: '0 4px 28px rgba(0,0,0,0.05)',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 16px 44px ${s.color}12`, borderColor: 'transparent', '& .ld-icon': { background: `linear-gradient(135deg, ${s.color}, ${s.accent})`, color: '#fff' } },
                }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, ${s.accent})` }} />
                  <Box className="ld-icon" sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, mb: 2, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
                    {s.icon}
                  </Box>
                  <Typography variant="overline" sx={{ color: palette.text.secondary, fontSize: '0.65rem', display: 'block', mb: 0.4 }}>{s.label}</Typography>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: palette.text.primary, fontSize: '1.1rem', lineHeight: 1 }}>{s.val}</Typography>
                </Box>
              ))}
            </Box>

            {/* Repayment progress (disbursed only) */}
            {loan.status === 'disbursed' && (
              <Box sx={{ p: { xs: 3, md: 4.5 }, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, boxShadow: '0 4px 32px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${typeConfig.color}, ${typeConfig.accent})` }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1rem', mb: 0.4 }}>Repayment Progress</Typography>
                    <Typography variant="caption" sx={{ color: palette.text.secondary }}>
                      {fmt(repaid)} repaid of {fmt(approved)} approved
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2, py: 0.75, background: `${typeConfig.color}0e`, border: `1px solid ${typeConfig.color}20`, borderRadius: '100px' }}>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: typeConfig.color, fontSize: '1rem', lineHeight: 1 }}>{repaidPct}%</Typography>
                  </Box>
                </Box>

                {/* Main progress bar */}
                <Box sx={{ height: 14, borderRadius: '100px', background: `${typeConfig.color}12`, overflow: 'hidden', mb: 2 }}>
                  <Box sx={{ height: '100%', width: `${repaidPct}%`, background: `linear-gradient(90deg, ${typeConfig.color}, ${typeConfig.accent})`, borderRadius: '100px', transition: 'width 1s cubic-bezier(0.22,1,0.36,1)' }} />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, mt: 3, pt: 3, borderTop: `1px dashed ${typeConfig.color}15` }}>
                  {[
                    { label: 'Outstanding', val: fmt(outstanding), color: typeConfig.color },
                    { label: 'Total Repaid', val: fmt(totalRepaid), color: '#2E7D32' },
                    { label: 'Payments Made', val: String(repayments.length), color: palette.info.dark },
                  ].map((r, i) => (
                    <Box key={i} sx={{ textAlign: 'center', p: 2, borderRadius: `${br - 2}px`, background: `${r.color}07`, border: `1px solid ${r.color}12` }}>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.4 }}>{r.label}</Typography>
                      <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: r.color, fontSize: '0.97rem', lineHeight: 1 }}>{r.val}</Typography>
                    </Box>
                  ))}
                </Box>

                {outstanding > 0 && (
                  <Button
                    variant="contained" fullWidth size="large"
                    onClick={() => setDialogOpen(true)}
                    startIcon={<PaymentsOutlinedIcon />}
                    sx={{
                      mt: 3, background: `linear-gradient(135deg, ${typeConfig.color}, ${typeConfig.accent})`,
                      boxShadow: `0 10px 30px ${typeConfig.color}35`, textTransform: 'none',
                      fontFamily: typography.fontFamily, fontWeight: 700, fontSize: '0.97rem',
                      borderRadius: `${br * 1.5}px`, py: 1.75,
                      '&:hover': { boxShadow: `0 16px 42px ${typeConfig.color}50`, transform: 'translateY(-1px)' },
                      transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    Make a Repayment
                  </Button>
                )}
              </Box>
            )}

            {/* Loan Purpose */}
            <Box sx={{ p: { xs: 3, md: 4.5 }, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, boxShadow: '0 4px 32px rgba(0,0,0,0.05)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, background: `${typeConfig.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: typeConfig.color }}>
                  <ReceiptOutlinedIcon sx={{ fontSize: 18 }} />
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1rem' }}>Loan Purpose</Typography>
              </Box>
              <Box sx={{ p: 3, borderRadius: `${br - 2}px`, background: palette.background.default, border: `1px solid ${typeConfig.color}10` }}>
                <Typography variant="body1" sx={{ color: palette.text.primary, lineHeight: 1.85, fontWeight: 300 }}>{loan.purpose}</Typography>
              </Box>
            </Box>

            {/* Repayment History */}
            <Box sx={{ p: { xs: 3, md: 4.5 }, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, boxShadow: '0 4px 32px rgba(0,0,0,0.05)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.primary.main }}>
                    <TrendingDownIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>Repayment History</Typography>
                    <Typography variant="caption" sx={{ color: palette.text.secondary }}>{repayments.length} payment{repayments.length !== 1 ? 's' : ''} recorded</Typography>
                  </Box>
                </Box>
              </Box>

              {repayments.length === 0 ? (
                <Box sx={{ py: 5, textAlign: 'center' }}>
                  <Box sx={{ width: 56, height: 56, borderRadius: '50%', background: `${palette.primary.main}08`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                    <PaymentsOutlinedIcon sx={{ fontSize: 26, color: palette.primary.main }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 300 }}>No repayments recorded yet</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Header row */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr 1fr' }, gap: 2, px: 2.5, pb: 1.5, borderBottom: `1px solid ${palette.background.default}` }}>
                    {['Date', 'Method', 'Reference', 'Amount', 'Balance After'].map((h, i) => (
                      <Typography key={i} variant="overline" sx={{ color: palette.text.secondary, fontSize: '0.62rem', display: { xs: i > 1 ? 'none' : 'block', md: 'block' } }}>{h}</Typography>
                    ))}
                  </Box>

                  {repayments.map((r, i) => {
                    const amt = parseFloat(String(r.amount || 0));
                    const balAfter = parseFloat(String(r.balance_after || 0));
                    return (
                      <Box key={r.id} sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr 1fr' },
                        gap: 2, px: 2.5, py: 2,
                        borderRadius: `${br - 2}px`,
                        background: i % 2 === 0 ? palette.background.default : 'transparent',
                        border: `1px solid ${i % 2 === 0 ? palette.background.default : 'transparent'}`,
                        alignItems: 'center',
                        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                        '&:hover': { background: `${palette.primary.main}06`, borderColor: `${palette.primary.main}12`, transform: 'translateX(4px)' },
                      }}>
                        <Box>
                          <Typography variant="body2" sx={{ color: palette.text.primary, fontWeight: 600, fontSize: '0.82rem' }}>
                            {format(new Date(r.payment_date), 'MMM dd, yyyy')}
                          </Typography>
                          <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.7rem' }}>
                            {format(new Date(r.payment_date), 'HH:mm')}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'inline-flex', px: 1.5, py: 0.4, background: `${palette.info.main}08`, border: `1px solid ${palette.info.main}15`, borderRadius: '100px', width: 'fit-content' }}>
                          <Typography variant="caption" sx={{ color: palette.info.dark, fontWeight: 600, fontSize: '0.7rem', textTransform: 'capitalize' }}>
                            {r.payment_method?.replace('_', ' ')}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: palette.text.secondary, fontSize: '0.78rem', display: { xs: 'none', md: 'block' } }}>
                          {r.reference_number}
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#2E7D32', fontSize: '0.9rem', display: { xs: 'none', md: 'block' } }}>
                          {fmt(amt)}
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 600, color: palette.text.primary, fontSize: '0.85rem', display: { xs: 'none', md: 'block' } }}>
                          {fmt(balAfter)}
                        </Typography>
                        {/* Mobile: amount visible */}
                        <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#2E7D32', fontSize: '0.88rem', display: { xs: 'block', md: 'none' } }}>
                          {fmt(amt)}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>


          {/* ── RIGHT COLUMN ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: { lg: 'sticky' }, top: { lg: 24 } }}>

            {/* Status card */}
            <Box sx={{
              p: 4, borderRadius: `${br * 2}px`,
              background: `linear-gradient(145deg, ${typeConfig.color}, ${typeConfig.accent})`,
              position: 'relative', overflow: 'hidden',
              boxShadow: `0 16px 50px ${typeConfig.color}30`,
            }}>
              <Box sx={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)', pointerEvents: 'none' }} />
              <Box sx={{ position: 'absolute', bottom: -20, left: '30%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)', pointerEvents: 'none' }} />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.55)', display: 'block', mb: 0.5 }}>Current Status</Typography>
                <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: '#fff', fontSize: '1.4rem', lineHeight: 1, mb: 3 }}>{status.label}</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                  {[
                    { label: 'Duration', val: `${loan.duration_months} months`, icon: <TimerOutlinedIcon sx={{ fontSize: 15 }} /> },
                    { label: 'Applied', val: formatDate(loan.application_date), icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 15 }} /> },
                    ...(loan.approval_date ? [{ label: 'Approved', val: formatDate(loan.approval_date), icon: <TaskAltIcon sx={{ fontSize: 15 }} /> }] : []),
                    ...(loan.disbursement_date ? [{ label: 'Disbursed', val: formatDate(loan.disbursement_date), icon: <PaymentsOutlinedIcon sx={{ fontSize: 15 }} /> }] : []),
                  ].map((d, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.75, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: `${br - 2}px` }}>
                      <Box sx={{ color: 'rgba(255,255,255,0.65)', flexShrink: 0 }}>{d.icon}</Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', display: 'block' }}>{d.label}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff', fontSize: '0.82rem' }}>{d.val}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ pt: 2.5, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', display: 'block', mb: 0.4 }}>Loan ID</Typography>
                  <Typography sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', letterSpacing: '0.04em' }}>
                    #{loan.id.substring(0, 8).toUpperCase()}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Loan type badge */}
            <Box sx={{ p: 3.5, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ width: 48, height: 48, borderRadius: `${br}px`, background: `linear-gradient(135deg, ${typeConfig.color}, ${typeConfig.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0, boxShadow: `0 8px 22px ${typeConfig.color}30` }}>
                {typeConfig.icon}
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, textTransform: 'capitalize' }}>{loan.loan_type} Loan</Typography>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, mt: 0.4, px: 1.5, py: 0.25, background: `${typeConfig.color}0e`, border: `1px solid ${typeConfig.color}18`, borderRadius: '100px' }}>
                  <PercentOutlinedIcon sx={{ fontSize: 11, color: typeConfig.accent }} />
                  <Typography variant="caption" sx={{ color: typeConfig.color, fontWeight: 700, fontSize: '0.72rem' }}>{loan.interest_rate}% p.a. reducing balance</Typography>
                </Box>
              </Box>
            </Box>

            {/* Info note */}
            <Box sx={{ p: 3, borderRadius: `${br * 2}px`, background: `${palette.info.main}07`, border: `1px solid ${palette.info.main}15`, display: 'flex', gap: 1.5 }}>
              <InfoOutlinedIcon sx={{ fontSize: 17, color: palette.info.main, flexShrink: 0, mt: 0.2 }} />
              <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.8 }}>
                Interest is calculated on a <strong style={{ color: palette.text.primary }}>reducing balance</strong> basis. Early repayment attracts zero penalty and reduces total interest owed.
              </Typography>
            </Box>

            {/* View policy link */}
            <Box
              onClick={() => navigate('/loan-policy')}
              sx={{ p: 3, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, display: 'flex', gap: 2, alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)', '&:hover': { borderColor: `${palette.primary.main}20`, boxShadow: `0 6px 24px ${palette.primary.main}0a`, transform: 'translateY(-3px)' } }}
            >
              <Box sx={{ width: 38, height: 38, borderRadius: `${br - 2}px`, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.primary.main, flexShrink: 0 }}>
                <InfoOutlinedIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, fontSize: '0.83rem', mb: 0.25 }}>Loan Policy</Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.75rem' }}>Understand your rights & repayment terms</Typography>
              </Box>
              <ArrowForwardIcon sx={{ fontSize: 16, color: palette.primary.main }} />
            </Box>
          </Box>
        </Box>
      </Container>


      {/* ── REPAYMENT DIALOG ──────────────────────────────── */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm" fullWidth
        PaperProps={{
          sx: {
            borderRadius: `${br * 2}px`,
            fontFamily: typography.fontFamily,
            background: palette.background.paper,
            overflow: 'hidden',
          }
        }}
      >
        {/* Dialog header */}
        <Box sx={{
          px: 4, py: 3.5, position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${typeConfig.color}, ${typeConfig.accent})`,
        }}>
          <Box sx={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)', pointerEvents: 'none' }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            <Box>
              <DialogTitle sx={{ p: 0, color: '#fff', fontSize: '1.15rem', fontWeight: 700, fontFamily: typography.fontFamily, mb: 0.5 }}>
                Make a Repayment
              </DialogTitle>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Outstanding: <strong style={{ color: '#fff' }}>{fmt(outstanding)}</strong>
              </Typography>
            </Box>
            <Box sx={{ px: 2, py: 0.75, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px' }}>
              <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600 }}>{repaidPct}% repaid</Typography>
            </Box>
          </Box>
        </Box>

        <DialogContent sx={{ px: 4, pt: 4, pb: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth required
              label="Repayment Amount (₦)"
              type="number"
              value={repaymentAmount}
              onChange={(e) => setRepaymentAmount(e.target.value)}
              onFocus={() => setFocused('repayAmt')}
              onBlur={() => setFocused(null)}
              inputProps={{ min: 1, step: 100, max: outstanding }}
              helperText={`Max: ${fmt(outstanding)}`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ color: focused === 'repayAmt' ? palette.primary.main : palette.text.secondary, fontWeight: 700, fontFamily: typography.fontFamily, transition: 'color 0.25s' }}>₦</Typography>
                  </InputAdornment>
                ),
              }}
              sx={fieldSx('repayAmt')}
            />

            <TextField
              fullWidth required select
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              onFocus={() => setFocused('method')}
              onBlur={() => setFocused(null)}
              sx={fieldSx('method')}
            >
              {paymentMethods.map((m) => (
                <MenuItem key={m.value} value={m.value} sx={{ fontFamily: typography.fontFamily }}>{m.label}</MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Reference Number (Optional)"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              onFocus={() => setFocused('ref')}
              onBlur={() => setFocused(null)}
              helperText="Transaction reference or receipt number"
              sx={fieldSx('ref')}
            />

            {/* Summary */}
            {repaymentAmount && parseFloat(repaymentAmount) > 0 && (
              <Box sx={{ p: 2.5, borderRadius: `${br - 2}px`, background: `${typeConfig.color}08`, border: `1px solid ${typeConfig.color}15` }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>Amount paying</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: typeConfig.color }}>{fmt(parseFloat(repaymentAmount))}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>Balance after payment</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: palette.text.primary }}>
                    {fmt(Math.max(0, outstanding - parseFloat(repaymentAmount)))}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 4, py: 3, gap: 1.5 }}>
          <Button onClick={() => setDialogOpen(false)}
            sx={{ textTransform: 'none', fontFamily: typography.fontFamily, borderRadius: `${br * 1.5}px`, color: palette.text.secondary, px: 3, '&:hover': { background: `${palette.primary.main}06` } }}>
            Cancel
          </Button>
          <Button
            onClick={handleRepayment}
            variant="contained"
            disabled={submitting || !repaymentAmount || !paymentMethod || parseFloat(repaymentAmount) <= 0}
            startIcon={!submitting ? <PaymentsOutlinedIcon sx={{ fontSize: 17 }} /> : undefined}
            sx={{
              background: submitting ? `${typeConfig.color}70` : `linear-gradient(135deg, ${typeConfig.color}, ${typeConfig.accent})`,
              boxShadow: `0 8px 24px ${typeConfig.color}35`,
              textTransform: 'none', fontFamily: typography.fontFamily, fontWeight: 700,
              borderRadius: `${br * 1.5}px`, px: 3.5, py: 1.25,
              '&:hover:not(:disabled)': { boxShadow: `0 12px 32px ${typeConfig.color}50` },
              '&.Mui-disabled': { color: 'rgba(255,255,255,0.5)' },
            }}
          >
            {submitting ? 'Processing…' : 'Confirm Payment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoanDetails;