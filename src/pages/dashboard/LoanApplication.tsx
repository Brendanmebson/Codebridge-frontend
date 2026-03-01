import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Button, Alert,
  MenuItem, useTheme, InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import CheckIcon from '@mui/icons-material/Check';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SpeedIcon from '@mui/icons-material/Speed';
import SchoolIcon from '@mui/icons-material/School';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';

const LoanApplication: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    loanType: '',
    amountRequested: '',
    durationMonths: '',
    purpose: '',
  });

  const loanTypes = [
    { value: 'personal', label: 'Personal Loan', rate: 12, max: 500000, icon: <PersonOutlineIcon sx={{ fontSize: 20 }} />, color: palette.primary.dark, accent: palette.primary.main, desc: 'Rent, medical, personal projects' },
    { value: 'business', label: 'Business Loan', rate: 10, max: 2000000, icon: <BusinessCenterIcon sx={{ fontSize: 20 }} />, color: palette.info.dark, accent: palette.info.main, desc: 'Working capital, equipment, growth' },
    { value: 'emergency', label: 'Emergency Loan', rate: 15, max: 200000, icon: <SpeedIcon sx={{ fontSize: 20 }} />, color: palette.secondary.dark, accent: palette.secondary.main, desc: 'Urgent needs, crises, repairs' },
    { value: 'educational', label: 'Educational Loan', rate: 8, max: 1000000, icon: <SchoolIcon sx={{ fontSize: 20 }} />, color: palette.info.dark, accent: '#00897B', desc: 'Tuition, certifications, training' },
  ];

  const durations = [3, 6, 12, 18, 24, 36];

  const selectedLoan = loanTypes.find(t => t.value === formData.loanType);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const principal = parseFloat(formData.amountRequested) || 0;
  const months = parseInt(formData.durationMonths) || 0;
  const annualRate = selectedLoan?.rate || 12;
  const monthlyRate = annualRate / 100 / 12;

  const monthlyRepayment = (principal > 0 && months > 0 && monthlyRate > 0)
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    : 0;

  const totalRepayment = monthlyRepayment * months;
  const totalInterest = totalRepayment - principal;
  const principalPct = totalRepayment > 0 ? Math.round((principal / totalRepayment) * 100) : 0;

  const fmt = (n: number) => '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2 });

  const fieldSx = (name: string) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: `${br * 1.5}px`,
      fontFamily: typography.fontFamily,
      fontSize: '0.9rem',
      background: focused === name
        ? palette.background.paper
        : `${palette.primary.main}04`,
      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      '& fieldset': {
        borderColor: focused === name ? palette.primary.main : `${palette.primary.main}20`,
        borderWidth: focused === name ? 2 : 1,
        transition: 'all 0.25s',
      },
      '&:hover fieldset': { borderColor: `${palette.primary.main}45` },
      '&.Mui-focused fieldset': { borderColor: palette.primary.main },
    },
    '& .MuiInputLabel-root': {
      fontFamily: typography.fontFamily, fontSize: '0.88rem',
      color: palette.text.secondary,
      '&.Mui-focused': { color: palette.primary.main },
    },
    '& .MuiFormHelperText-root': { fontFamily: typography.fontFamily, fontSize: '0.75rem' },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/loans/apply', {
        loanType: formData.loanType,
        amountRequested: parseFloat(formData.amountRequested),
        durationMonths: parseInt(formData.durationMonths),
        purpose: formData.purpose,
      });
      setSuccess(true);
      setTimeout(() => navigate('/dashboard/loans'), 2500);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const e = err as { response?: { data?: { error?: string } } };
        setError(e.response?.data?.error || 'Loan application failed');
      } else {
        setError('Loan application failed');
      }
    } finally {
      setLoading(false);
    }
  };

  // ── SUCCESS STATE ──────────────────────────────────────
  if (success) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.background.default, px: 3 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 420 }}>
          <Box sx={{
            width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 3,
            background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 16px 48px ${palette.primary.main}35`,
            animation: 'popIn 0.6s cubic-bezier(0.22,1,0.36,1)',
            '@keyframes popIn': { from: { opacity: 0, transform: 'scale(0.5)' }, to: { opacity: 1, transform: 'scale(1)' } },
          }}>
            <CheckIcon sx={{ fontSize: 38, color: '#fff' }} />
          </Box>
          <Typography variant="h4" sx={{ color: palette.text.primary, fontWeight: 700, mb: 1.5 }}>Application Submitted!</Typography>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 3 }}>
            Your loan application is under review. The Loans Committee will respond within 48 hours via SMS and email.
          </Typography>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px' }}>
            <TimerOutlinedIcon sx={{ fontSize: 15, color: palette.primary.main }} />
            <Typography variant="caption" sx={{ color: palette.primary.main, fontWeight: 600 }}>Redirecting to your loans…</Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ background: palette.background.default, minHeight: '100vh', fontFamily: typography.fontFamily, pb: 8 }}>

      {/* ── PAGE HEADER ───────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`,
        pt: { xs: 5, md: 7 }, pb: { xs: 10, md: 13 },
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
          {/* Back button */}
          <Button
            startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
            onClick={() => navigate('/dashboard/loans')}
            sx={{ color: 'rgba(255,255,255,0.75)', textTransform: 'none', fontFamily: typography.fontFamily, fontSize: '0.85rem', mb: 3, p: 0, '&:hover': { color: '#fff', background: 'transparent' } }}
          >
            Back to Loans
          </Button>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 4, alignItems: 'flex-end' }}>
            <Box>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, mb: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px' }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: palette.secondary.light, boxShadow: `0 0 8px ${palette.secondary.light}`, animation: 'blink 2.5s ease infinite', '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500, letterSpacing: '0.05em' }}>Member Loan Application</Typography>
              </Box>
              <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '2.2rem', md: '3.2rem' }, lineHeight: 1.1, mb: 1.5 }}>
                Apply for a<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Loan
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.62)', fontWeight: 300 }}>
                Complete the form below. The Loans Committee reviews every application within 48 hours.
              </Typography>
            </Box>

            {/* Trust pills */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: 1.5, alignItems: 'flex-end' }}>
              {[
                { icon: <TimerOutlinedIcon sx={{ fontSize: 14 }} />, label: '48h decision' },
                { icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 14 }} />, label: 'No hidden fees' },
                { icon: <HandshakeOutlinedIcon sx={{ fontSize: 14 }} />, label: 'Member-first terms' },
              ].map((p, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px' }}>
                  <Box sx={{ color: palette.secondary.light }}>{p.icon}</Box>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.78)', fontWeight: 500 }}>{p.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>

        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: { xs: 50, md: 72 }, background: palette.background.default, clipPath: 'ellipse(58% 100% at 50% 100%)' }} />
      </Box>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, position: 'relative', zIndex: 3 }}>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily, background: 'rgba(211,47,47,0.06)', border: '1px solid rgba(211,47,47,0.18)' }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 380px' }, gap: 4, alignItems: 'start' }}
        >

          {/* ── LEFT: FORM ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

            {/* Step 1: Loan Type */}
            <Box sx={{ p: { xs: 3, md: 4.5 }, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, boxShadow: '0 4px 32px rgba(0,0,0,0.05)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: '#fff', fontSize: '0.75rem' }}>1</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1rem' }}>Select Loan Type</Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2 }}>
                {loanTypes.map((lt) => {
                  const active = formData.loanType === lt.value;
                  return (
                    <Box
                      key={lt.value}
                      onClick={() => setFormData({ ...formData, loanType: lt.value })}
                      sx={{
                        p: 2.5, borderRadius: `${br * 1.5}px`,
                        border: `1.5px solid ${active ? lt.color + '40' : palette.background.default}`,
                        background: active ? `linear-gradient(145deg, ${lt.color}0e, ${lt.accent}06)` : palette.background.default,
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                        '&:hover': { borderColor: `${lt.color}28`, background: `${lt.color}07` },
                      }}
                    >
                      <Box sx={{ width: 38, height: 38, borderRadius: `${br - 2}px`, mb: 1.5, background: active ? `linear-gradient(135deg, ${lt.color}, ${lt.accent})` : `${lt.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: active ? '#fff' : lt.color, transition: 'all 0.3s' }}>
                        {lt.icon}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: active ? 700 : 500, color: active ? lt.color : palette.text.primary, lineHeight: 1.25, mb: 0.4, fontSize: '0.83rem' }}>
                        {lt.label}
                      </Typography>
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.25, py: 0.2, background: active ? `${lt.color}14` : `${palette.primary.main}08`, border: `1px solid ${active ? lt.color + '25' : palette.primary.main + '12'}`, borderRadius: '100px', mb: 0.75 }}>
                        <TrendingDownIcon sx={{ fontSize: 10, color: active ? lt.accent : palette.text.secondary }} />
                        <Typography variant="caption" sx={{ color: active ? lt.color : palette.text.secondary, fontWeight: 700, fontSize: '0.68rem' }}>{lt.rate}% p.a.</Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem', display: 'block', lineHeight: 1.4 }}>{lt.desc}</Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Max amount hint */}
              {selectedLoan && (
                <Box sx={{ mt: 2.5, p: 2, borderRadius: `${br - 2}px`, background: `${selectedLoan.color}08`, border: `1px solid ${selectedLoan.color}18`, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 16, color: selectedLoan.accent, flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.6 }}>
                    <Box component="span" sx={{ fontWeight: 700, color: selectedLoan.color }}>{selectedLoan.label}</Box>
                    {' '}· Max {fmt(selectedLoan.max)} · {selectedLoan.rate}% p.a. on reducing balance
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Step 2: Amount & Duration */}
            <Box sx={{ p: { xs: 3, md: 4.5 }, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, boxShadow: '0 4px 32px rgba(0,0,0,0.05)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: '#fff', fontSize: '0.75rem' }}>2</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1rem' }}>Amount & Duration</Typography>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
                <TextField
                  required fullWidth
                  name="amountRequested"
                  label="Amount Requested (₦)"
                  type="number"
                  value={formData.amountRequested}
                  onChange={handleChange}
                  onFocus={() => setFocused('amount')}
                  onBlur={() => setFocused(null)}
                  inputProps={{ min: 1000, step: 1000, max: selectedLoan?.max }}
                  helperText={`Min ₦1,000${selectedLoan ? ` · Max ${fmt(selectedLoan.max)}` : ''}`}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ color: focused === 'amount' ? palette.primary.main : palette.text.secondary, fontWeight: 700, fontFamily: typography.fontFamily, fontSize: '0.9rem', transition: 'color 0.25s' }}>₦</Typography>
                      </InputAdornment>
                    ),
                  }}
                  sx={fieldSx('amount')}
                />

                <Box>
                  <Typography variant="overline" sx={{ color: palette.text.secondary, display: 'block', mb: 1.25, fontSize: '0.68rem' }}>Repayment Duration</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1 }}>
                    {durations.map((m) => {
                      const active = formData.durationMonths === String(m);
                      return (
                        <Box
                          key={m}
                          onClick={() => setFormData({ ...formData, durationMonths: String(m) })}
                          sx={{
                            py: 1.25, borderRadius: `${br - 2}px`, textAlign: 'center',
                            border: `1.5px solid ${active ? (selectedLoan?.color || palette.primary.main) + '40' : palette.background.default}`,
                            background: active ? `${selectedLoan?.color || palette.primary.main}0e` : palette.background.default,
                            cursor: 'pointer',
                            transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                            '&:hover': { borderColor: `${selectedLoan?.color || palette.primary.main}25` },
                          }}
                        >
                          <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: active ? 700 : 400, color: active ? (selectedLoan?.color || palette.primary.main) : palette.text.primary, fontSize: '0.88rem', lineHeight: 1 }}>
                            {m}
                          </Typography>
                          <Typography variant="caption" sx={{ color: active ? (selectedLoan?.accent || palette.primary.light) : palette.text.secondary, fontSize: '0.65rem' }}>
                            mo
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Step 3: Purpose */}
            <Box sx={{ p: { xs: 3, md: 4.5 }, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, boxShadow: '0 4px 32px rgba(0,0,0,0.05)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: '#fff', fontSize: '0.75rem' }}>3</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1rem' }}>Purpose of Loan</Typography>
              </Box>

              <TextField
                required fullWidth multiline rows={4}
                name="purpose"
                label="Describe how you plan to use this loan"
                value={formData.purpose}
                onChange={handleChange}
                onFocus={() => setFocused('purpose')}
                onBlur={() => setFocused(null)}
                helperText="Be specific — this helps the Loans Committee assess your application accurately"
                sx={fieldSx('purpose')}
              />

              {/* Policy note */}
              <Box sx={{ mt: 2.5, p: 2.5, borderRadius: `${br - 2}px`, background: `${palette.info.main}07`, border: `1px solid ${palette.info.main}18`, display: 'flex', gap: 1.5 }}>
                <InfoOutlinedIcon sx={{ fontSize: 16, color: palette.info.main, flexShrink: 0, mt: 0.2 }} />
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.75 }}>
                  By submitting this application, you confirm the information provided is accurate and agree to the
                  {' '}<Box component="span" sx={{ color: palette.primary.main, fontWeight: 600, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => navigate('/loan-policy')}>
                    CodeBridge Loan Policy
                  </Box>.
                  Loan amounts are subject to committee approval and available funds.
                </Typography>
              </Box>
            </Box>

            {/* Action buttons */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/dashboard/loans')}
                startIcon={<ArrowBackIcon sx={{ fontSize: 17 }} />}
                sx={{
                  borderColor: `${palette.primary.main}25`, color: palette.text.secondary,
                  borderRadius: `${br * 1.5}px`, textTransform: 'none',
                  fontFamily: typography.fontFamily, fontWeight: 600, fontSize: '0.93rem',
                  py: 1.75,
                  '&:hover': { borderColor: `${palette.primary.main}45`, color: palette.text.primary, background: `${palette.primary.main}04` },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit" variant="contained" size="large"
                disabled={loading || !formData.loanType || !formData.amountRequested || !formData.durationMonths || !formData.purpose}
                endIcon={!loading ? <ArrowForwardIcon sx={{ fontSize: 17 }} /> : undefined}
                sx={{
                  background: loading ? `${palette.primary.main}70` : `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  color: '#fff',
                  fontFamily: typography.fontFamily, fontWeight: 600, fontSize: '0.97rem',
                  py: 1.75, borderRadius: `${br * 1.5}px`, textTransform: 'none',
                  boxShadow: loading ? 'none' : `0 10px 30px ${palette.primary.main}38`,
                  transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover:not(:disabled)': { boxShadow: `0 16px 42px ${palette.primary.main}50`, transform: 'translateY(-1px)' },
                  '&.Mui-disabled': { color: 'rgba(255,255,255,0.5)' },
                }}
              >
                {loading ? 'Submitting Application…' : 'Submit Application'}
              </Button>
            </Box>
          </Box>


          {/* ── RIGHT: SUMMARY PANEL ── */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: { lg: 'sticky' }, top: { lg: 24 } }}>

            {/* Live calculator */}
            <Box sx={{
              borderRadius: `${br * 2}px`, overflow: 'hidden',
              boxShadow: `0 16px 50px ${selectedLoan?.color || palette.primary.main}20`,
              transition: 'box-shadow 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}>
              {/* Header */}
              <Box sx={{
                p: 3.5,
                background: selectedLoan
                  ? `linear-gradient(145deg, ${selectedLoan.color}, ${selectedLoan.accent})`
                  : `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
                position: 'relative', overflow: 'hidden',
                transition: 'background 0.4s',
              }}>
                <Box sx={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)', pointerEvents: 'none' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: `${br - 4}px`, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CalculateOutlinedIcon sx={{ fontSize: 17, color: '#fff' }} />
                  </Box>
                  <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.7)' }}>Live Estimate</Typography>
                </Box>

                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)', display: 'block', mb: 0.5 }}>Monthly Repayment</Typography>
                <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '2.6rem', fontWeight: 700, color: '#fff', lineHeight: 1, mb: 0.5 }}>
                  {monthlyRepayment > 0 ? fmt(Math.round(monthlyRepayment)) : '₦—'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>
                  {months > 0 ? `for ${months} months` : 'select duration'}
                </Typography>

                {monthlyRepayment > 0 && (
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mt: 2.5, pt: 2.5, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', display: 'block', mb: 0.3 }}>Total Repayment</Typography>
                      <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{fmt(Math.round(totalRepayment))}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', display: 'block', mb: 0.3 }}>Total Interest</Typography>
                      <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{fmt(Math.round(totalInterest))}</Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Body */}
              <Box sx={{ p: 3, background: palette.background.paper }}>
                {monthlyRepayment > 0 ? (
                  <>
                    {/* Composition bar */}
                    <Typography variant="overline" sx={{ color: palette.text.secondary, display: 'block', mb: 1.5, fontSize: '0.65rem' }}>Loan Composition</Typography>
                    <Box sx={{ height: 10, borderRadius: '100px', overflow: 'hidden', display: 'flex', mb: 1 }}>
                      <Box sx={{ width: `${principalPct}%`, height: '100%', background: `linear-gradient(90deg, ${selectedLoan?.color || palette.primary.dark}, ${selectedLoan?.accent || palette.primary.main})`, transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)' }} />
                      <Box sx={{ flex: 1, height: '100%', background: `${selectedLoan?.color || palette.primary.main}18` }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: `linear-gradient(135deg, ${selectedLoan?.color || palette.primary.dark}, ${selectedLoan?.accent || palette.primary.main})` }} />
                        <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem' }}>Principal {principalPct}%</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: `${selectedLoan?.color || palette.primary.main}22` }} />
                        <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem' }}>Interest {100 - principalPct}%</Typography>
                      </Box>
                    </Box>

                    {/* Summary rows */}
                    {[
                      { label: 'Loan Amount', val: fmt(principal) },
                      { label: 'Interest Rate', val: `${selectedLoan?.rate || '—'}% p.a.` },
                      { label: 'Duration', val: `${months} months` },
                      { label: 'Monthly Payment', val: fmt(Math.round(monthlyRepayment)) },
                    ].map((r, i) => (
                      <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.25, borderBottom: i < 3 ? `1px dashed ${palette.primary.main}10` : 'none' }}>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.8rem' }}>{r.label}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: palette.text.primary, fontSize: '0.82rem' }}>{r.val}</Typography>
                      </Box>
                    ))}
                  </>
                ) : (
                  <Box sx={{ py: 3, textAlign: 'center' }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: '50%', background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
                      <CalculateOutlinedIcon sx={{ fontSize: 22, color: palette.primary.main }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 300, fontSize: '0.82rem' }}>
                      Select a loan type, enter an amount and duration to see your repayment estimate.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Process steps card */}
            <Box sx={{ p: 3.5, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}` }}>
              <Typography variant="overline" sx={{ color: palette.text.secondary, display: 'block', mb: 2.5, fontSize: '0.68rem' }}>What Happens Next</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { num: '01', label: 'Application Received', sub: 'Instant confirmation via email' },
                  { num: '02', label: 'Committee Review', sub: 'Within 48 hours' },
                  { num: '03', label: 'Decision Notified', sub: 'SMS & email notification' },
                  { num: '04', label: 'Funds Disbursed', sub: 'Within 24h of approval' },
                ].map((s, i) => (
                  <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: i < 3 ? 2.5 : 0 }}>
                      <Box sx={{ width: 32, height: 32, borderRadius: '50%', background: `${palette.primary.main}10`, border: `1.5px solid ${palette.primary.main}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                        <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: palette.primary.main, fontSize: '0.65rem' }}>{s.num}</Typography>
                      </Box>
                      {i < 3 && <Box sx={{ flex: 1, width: 1.5, background: `${palette.primary.main}15`, mt: 0.5, minHeight: 16 }} />}
                    </Box>
                    <Box sx={{ pb: i < 3 ? 2.5 : 0, pt: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, fontSize: '0.83rem', lineHeight: 1.25 }}>{s.label}</Typography>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem' }}>{s.sub}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Policy link */}
            <Box sx={{ p: 3, borderRadius: `${br * 2}px`, background: `${palette.primary.main}06`, border: `1px solid ${palette.primary.main}14`, display: 'flex', gap: 2, alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { background: `${palette.primary.main}10`, borderColor: `${palette.primary.main}25` } }} onClick={() => navigate('/loan-policy')}>
              <Box sx={{ width: 40, height: 40, borderRadius: `${br - 2}px`, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <InfoOutlinedIcon sx={{ fontSize: 20, color: palette.primary.main }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, fontSize: '0.83rem', mb: 0.25 }}>Read the Loan Policy</Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.75rem' }}>Understand rates, eligibility & repayment terms</Typography>
              </Box>
              <ArrowForwardIcon sx={{ fontSize: 16, color: palette.primary.main }} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoanApplication;