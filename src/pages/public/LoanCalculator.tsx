import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Container, Typography, Button, useTheme, Stack, Slider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpeedIcon from '@mui/icons-material/Speed';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import StarIcon from '@mui/icons-material/Star';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function useFadeIn(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function formatNaira(val: number): string {
  return '₦' + val.toLocaleString('en-NG');
}

const LoanCalculator: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`;

  // ── CALCULATOR STATE ────────────────────────────────────
  const loanTypes = [
    { id: 'personal', label: 'Personal', icon: <PersonIcon sx={{ fontSize: 18 }} />, rate: 12, max: 500000, color: palette.primary.dark, accent: palette.primary.main },
    { id: 'business', label: 'Business', icon: <BusinessCenterIcon sx={{ fontSize: 18 }} />, rate: 10, max: 2000000, color: palette.info.dark, accent: palette.info.main },
    { id: 'emergency', label: 'Emergency', icon: <SpeedIcon sx={{ fontSize: 18 }} />, rate: 15, max: 200000, color: palette.secondary.dark, accent: palette.secondary.main },
    { id: 'education', label: 'Education', icon: <SchoolIcon sx={{ fontSize: 18 }} />, rate: 8, max: 1000000, color: palette.info.dark, accent: '#00897B' },
  ];

  const [selectedType, setSelectedType] = useState(loanTypes[0]);
  const [amount, setAmount] = useState(100000);
  const [months, setMonths] = useState(12);

  useEffect(() => {
    // Clamp amount when type changes
    if (amount > selectedType.max) setAmount(selectedType.max);
  }, [selectedType]);

  const monthlyRate = selectedType.rate / 100 / 12;
  const monthlyPayment = monthlyRate === 0
    ? amount / months
    : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - amount;

  const breakdown = Array.from({ length: Math.min(months, 6) }, (_, i) => {
    const balance = amount * Math.pow(1 + monthlyRate, i);
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    return { month: i + 1, principal, interest, balance: balance - principal };
  });

  const progressPct = Math.round((amount / totalPayment) * 100);

  // ── DATA ────────────────────────────────────────────────
  const eligibility = [
    'Active member for at least 3 months',
    'Consistent monthly savings contributions',
    'No outstanding defaulted loan',
    'Completed member verification',
    'Valid government-issued ID on file',
  ];

  const process = [
    { num: '01', title: 'Check Eligibility', desc: 'Log in to your dashboard to confirm your eligibility status instantly.' },
    { num: '02', title: 'Submit Application', desc: 'Fill the loan form, select type and amount, and submit in under 5 minutes.' },
    { num: '03', title: 'Review & Approval', desc: 'Our loans team reviews and responds within 48 hours — often same day.' },
    { num: '04', title: 'Disbursement', desc: 'Approved funds are credited directly to your registered account.' },
  ];

  const testimonials = [
    {
      quote: "Got my ₦800K business loan approved in 36 hours. The rate was genuinely competitive — 10% p.a. is hard to beat anywhere.",
      name: 'Emeka Adeyemi', role: 'Business Owner, Lagos',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      loan: 'Business Loan · ₦800K',
      color: palette.primary.dark,
    },
    {
      quote: "Emergency loan approved the same afternoon I applied. The money hit my account before 5pm. Real cooperative spirit.",
      name: 'Funke Balogun', role: 'Nurse, Ibadan',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      loan: 'Emergency Loan · ₦150K',
      color: palette.secondary.dark,
    },
    {
      quote: "The education loan covered my MBA fees entirely. 8% p.a. is lower than any bank I checked. Life-changing access.",
      name: 'Adaeze Nwosu', role: 'Graduate Student, Abuja',
      img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80',
      loan: 'Education Loan · ₦600K',
      color: palette.info.dark,
    },
  ];

  const { ref: calcRef, visible: calcVisible } = useFadeIn(0.05);
  const { ref: processRef, visible: processVisible } = useFadeIn();
  const { ref: testiRef, visible: testiVisible } = useFadeIn();

  return (
    <Box sx={{ fontFamily: typography.fontFamily, overflowX: 'hidden', background: palette.background.paper }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: heroGradient,
                paddingTop: { xs: 7, md: 8 },
        paddingBottom: { xs: 12, md: 20 },
        overflow: 'hidden',
      }}>
        {[
          { size: 620, top: -190, right: -190 },
          { size: 420, bottom: -130, left: -130 },
          { size: 260, top: '28%', left: '44%' },
        ].map((b, i) => (
          <Box key={i} sx={{
            position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.09), transparent 70%)',
            top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none',
          }} />
        ))}
        <Box sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '200px', opacity: 0.6,
        }} />
        {[...Array(7)].map((_, i) => (
          <Box key={i} sx={{
            position: 'absolute', width: 4, height: 4, borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            top: `${12 + i * 11}%`, right: `${5 + (i % 3) * 5}%`,
            animation: `dot${i} ${3 + i * 0.35}s ease-in-out ${i * 0.3}s infinite`,
            [`@keyframes dot${i}`]: {
              '0%,100%': { opacity: 0.2, transform: 'scale(1)' },
              '50%': { opacity: 1, transform: 'scale(1.5)' },
            },
          }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              px: 2.5, py: 1,
              border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px',
              backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.08)',
            }}>
              <Box sx={{
                width: 7, height: 7, borderRadius: '50%',
                background: palette.secondary.light,
                boxShadow: `0 0 8px ${palette.secondary.light}`,
                animation: 'blink 2.5s ease infinite',
                '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
              }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', letterSpacing: '0.06em', fontWeight: 500 }}>
                Affordable Loans for Every Member
              </Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 9 }}>
            <Typography variant="h1" sx={{
              color: '#fff', fontSize: { xs: '3rem', sm: '3.8rem', md: '5rem' },
              lineHeight: 1.1, mb: 3,
              animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) forwards',
              '@keyframes heroUp': { from: { opacity: 0, transform: 'translateY(36px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
            }}>
              Loans Built for<br />
              <Box component="span" sx={{
                fontStyle: 'italic', fontWeight: 300,
                background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Real People
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'rgba(255,255,255,0.68)', maxWidth: 560, mx: 'auto', fontWeight: 300,
              animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards', opacity: 0,
            }}>
              From 8% p.a. — among the most competitive cooperative rates in Nigeria.
              Use the calculator below to plan your loan before you apply.
            </Typography>
          </Box>

          {/* Rate cards */}
          <Box sx={{
            display: 'grid', gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: 2.5,
            animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) 0.3s forwards', opacity: 0,
          }}>
            {loanTypes.map((lt, i) => (
              <Box key={i} sx={{
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: `${br * 2}px`, p: { xs: 2.5, md: 3 },
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                cursor: 'pointer',
                '&:hover': { background: 'rgba(255,255,255,0.2)', transform: 'translateY(-4px)' },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Box sx={{ width: 30, height: 30, borderRadius: `${br - 4}px`, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.secondary.light }}>
                    {lt.icon}
                  </Box>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{lt.label}</Typography>
                </Box>
                <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '2rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {lt.rate}%
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>per annum</Typography>
              </Box>
            ))}
          </Box>
        </Container>

        <Box sx={{
          position: 'absolute', bottom: -1, left: 0, right: 0,
          height: { xs: 50, md: 72 },
          background: palette.background.default,
          clipPath: 'ellipse(58% 100% at 50% 100%)',
        }} />
      </Box>


      {/* ── LOAN CALCULATOR ───────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          {/* Section header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
              <CalculateOutlinedIcon sx={{ fontSize: 14, color: palette.primary.main }} />
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Loan Calculator</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
              Calculate Your<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Repayment</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 480, mx: 'auto' }}>
              Adjust the sliders to see your estimated monthly payment, total cost, and a month-by-month breakdown.
            </Typography>
          </Box>

          <Box
            ref={calcRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 4,
              opacity: calcVisible ? 1 : 0,
              transform: calcVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* ── INPUT PANEL ── */}
            <Box sx={{
              p: { xs: 3.5, md: 5 },
              borderRadius: `${br * 2}px`,
              background: palette.background.paper,
              border: `1px solid ${palette.background.default}`,
              boxShadow: `0 4px 32px ${palette.primary.main}06`,
            }}>
              {/* Loan type selector */}
              <Typography variant="overline" sx={{ color: palette.text.secondary, display: 'block', mb: 1.5 }}>
                Loan Type
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1.5, mb: 4.5 }}>
                {loanTypes.map((lt) => {
                  const active = selectedType.id === lt.id;
                  return (
                    <Box key={lt.id} onClick={() => setSelectedType(lt)} sx={{
                      display: 'flex', alignItems: 'center', gap: 1.25,
                      px: 2, py: 1.5,
                      borderRadius: `${br * 1.5}px`,
                      border: `1.5px solid ${active ? lt.color + '40' : palette.background.default}`,
                      background: active ? `linear-gradient(135deg, ${lt.color}10, ${lt.accent}06)` : palette.background.default,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                      '&:hover': { borderColor: `${lt.color}30`, background: `${lt.color}08` },
                    }}>
                      <Box sx={{
                        width: 32, height: 32, borderRadius: `${br - 4}px`, flexShrink: 0,
                        background: active ? `linear-gradient(135deg, ${lt.color}, ${lt.accent})` : `${lt.color}12`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: active ? '#fff' : lt.color,
                        transition: 'all 0.25s',
                      }}>
                        {lt.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: active ? 600 : 400, color: active ? lt.color : palette.text.primary, lineHeight: 1.2 }}>
                          {lt.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: active ? lt.accent : palette.text.secondary, fontSize: '0.72rem' }}>
                          {lt.rate}% p.a.
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/* Amount slider */}
              <Box sx={{ mb: 4.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2.5 }}>
                  <Typography variant="overline" sx={{ color: palette.text.secondary }}>Loan Amount</Typography>
                  <Box sx={{
                    px: 2, py: 0.75,
                    background: `${selectedType.color}0e`,
                    border: `1px solid ${selectedType.color}20`,
                    borderRadius: '100px',
                  }}>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '1.1rem', fontWeight: 700, color: selectedType.color, lineHeight: 1 }}>
                      {formatNaira(amount)}
                    </Typography>
                  </Box>
                </Box>
                <Slider
                  value={amount}
                  onChange={(_, v) => setAmount(v as number)}
                  min={10000}
                  max={selectedType.max}
                  step={10000}
                  sx={{
                    color: selectedType.accent,
                    height: 6,
                    '& .MuiSlider-thumb': {
                      width: 22, height: 22,
                      background: `linear-gradient(135deg, ${selectedType.color}, ${selectedType.accent})`,
                      boxShadow: `0 4px 14px ${selectedType.color}50`,
                      '&:hover': { boxShadow: `0 6px 20px ${selectedType.color}65` },
                    },
                    '& .MuiSlider-rail': { background: `${selectedType.color}18`, height: 6 },
                    '& .MuiSlider-track': { height: 6 },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.75 }}>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>₦10,000</Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>{formatNaira(selectedType.max)}</Typography>
                </Box>
              </Box>

              {/* Duration slider */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2.5 }}>
                  <Typography variant="overline" sx={{ color: palette.text.secondary }}>Repayment Period</Typography>
                  <Box sx={{
                    px: 2, py: 0.75,
                    background: `${selectedType.color}0e`,
                    border: `1px solid ${selectedType.color}20`,
                    borderRadius: '100px',
                  }}>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '1.1rem', fontWeight: 700, color: selectedType.color, lineHeight: 1 }}>
                      {months} months
                    </Typography>
                  </Box>
                </Box>
                <Slider
                  value={months}
                  onChange={(_, v) => setMonths(v as number)}
                  min={3}
                  max={selectedType.id === 'business' ? 36 : selectedType.id === 'education' ? 30 : selectedType.id === 'personal' ? 24 : 12}
                  step={1}
                  marks={[3, 6, 12, 18, 24, 30, 36].filter(m => m <= (selectedType.id === 'business' ? 36 : selectedType.id === 'education' ? 30 : selectedType.id === 'personal' ? 24 : 12)).map(m => ({ value: m, label: `${m}m` }))}
                  sx={{
                    color: selectedType.accent,
                    height: 6,
                    '& .MuiSlider-thumb': {
                      width: 22, height: 22,
                      background: `linear-gradient(135deg, ${selectedType.color}, ${selectedType.accent})`,
                      boxShadow: `0 4px 14px ${selectedType.color}50`,
                    },
                    '& .MuiSlider-rail': { background: `${selectedType.color}18`, height: 6 },
                    '& .MuiSlider-track': { height: 6 },
                    '& .MuiSlider-markLabel': {
                      fontFamily: typography.fontFamily,
                      fontSize: '0.7rem', color: palette.text.secondary,
                    },
                  }}
                />
              </Box>
            </Box>

            {/* ── RESULTS PANEL ── */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Monthly payment hero card */}
              <Box sx={{
                p: { xs: 3.5, md: 4.5 },
                borderRadius: `${br * 2}px`,
                background: `linear-gradient(145deg, ${selectedType.color}, ${selectedType.accent})`,
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: `0 16px 50px ${selectedType.color}30`,
              }}>
                <Box sx={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: -20, left: '40%', width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)', pointerEvents: 'none' }} />

                <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.65)', display: 'block', mb: 1 }}>
                  Monthly Repayment
                </Typography>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: { xs: '2.8rem', md: '3.4rem' },
                  fontWeight: 700, color: '#fff', lineHeight: 1, mb: 0.5,
                }}>
                  {formatNaira(Math.round(monthlyPayment))}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)' }}>
                  for {months} months
                </Typography>

                {/* Mini breakdown row */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 3.5, pt: 3, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mb: 0.5 }}>Total Repayment</Typography>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                      {formatNaira(Math.round(totalPayment))}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mb: 0.5 }}>Total Interest</Typography>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                      {formatNaira(Math.round(totalInterest))}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Principal vs Interest visual */}
              <Box sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: `${br * 2}px`,
                background: palette.background.paper,
                border: `1px solid ${palette.background.default}`,
              }}>
                <Typography variant="overline" sx={{ color: palette.text.secondary, display: 'block', mb: 2 }}>
                  Loan Composition
                </Typography>
                {/* Stacked bar */}
                <Box sx={{ height: 14, borderRadius: '100px', overflow: 'hidden', display: 'flex', mb: 1.5 }}>
                  <Box sx={{
                    width: `${progressPct}%`, height: '100%',
                    background: `linear-gradient(90deg, ${selectedType.color}, ${selectedType.accent})`,
                    transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
                  }} />
                  <Box sx={{
                    flex: 1, height: '100%',
                    background: `${selectedType.color}18`,
                    transition: 'all 0.5s',
                  }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: `linear-gradient(135deg, ${selectedType.color}, ${selectedType.accent})` }} />
                    <Typography variant="caption" sx={{ color: palette.text.secondary }}>Principal {progressPct}%</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: `${selectedType.color}25` }} />
                    <Typography variant="caption" sx={{ color: palette.text.secondary }}>Interest {100 - progressPct}%</Typography>
                  </Box>
                </Box>

                {/* Mini schedule */}
                <Box sx={{ mt: 3, pt: 3, borderTop: `1px dashed ${palette.primary.main}15` }}>
                  <Typography variant="overline" sx={{ color: palette.text.secondary, display: 'block', mb: 1.5 }}>
                    First 6 Months Preview
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {breakdown.map((row, i) => (
                      <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '36px 1fr 1fr 1fr', gap: 1, alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, fontWeight: 600 }}>M{row.month}</Typography>
                        <Box sx={{ height: 5, borderRadius: '100px', overflow: 'hidden', background: `${selectedType.color}12` }}>
                          <Box sx={{ height: '100%', width: `${(row.principal / monthlyPayment) * 100}%`, background: `linear-gradient(90deg, ${selectedType.color}, ${selectedType.accent})`, transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)' }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: selectedType.color, fontWeight: 600, textAlign: 'right' }}>
                          ₦{Math.round(row.principal).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, textAlign: 'right' }}>
                          ₦{Math.round(row.interest).toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                    <Box sx={{ display: 'grid', gridTemplateColumns: '36px 1fr 1fr 1fr', gap: 1, mt: 0.5, pt: 1, borderTop: `1px solid ${palette.background.default}` }}>
                      <Box />
                      <Typography variant="caption" sx={{ color: palette.text.secondary }}>Principal bar</Typography>
                      <Typography variant="caption" sx={{ color: selectedType.color, textAlign: 'right', fontWeight: 600 }}>Principal</Typography>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, textAlign: 'right' }}>Interest</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Apply CTA */}
              <Button
                component={Link} to="/login"
                variant="contained" size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  boxShadow: `0 10px 30px ${palette.primary.main}35`,
                  py: 2,
                  fontSize: '1rem', fontWeight: 600,
                  '&:hover': { boxShadow: `0 16px 40px ${palette.primary.main}50`, transform: 'translateY(-1px)' },
                  transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                Apply for This Loan
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── LOAN TYPES DEEP DIVE ──────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Loan Products</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
              Every Loan, Explained
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 480, mx: 'auto' }}>
              Four products designed for different life situations — each with transparent rates and clear terms.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              {
                type: loanTypes[0],
                img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
                benefits: ['Rent & housing costs', 'Medical expenses', 'Personal projects', 'Debt consolidation'],
                maxTenure: '24 months',
              },
              {
                type: loanTypes[1],
                img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
                benefits: ['Working capital injection', 'Equipment purchase', 'Stock & inventory', 'Business expansion'],
                maxTenure: '36 months',
              },
              {
                type: loanTypes[2],
                img: 'https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=600&q=80',
                benefits: ['Medical emergencies', 'Urgent travel', 'Unexpected repairs', 'Family needs'],
                maxTenure: '12 months',
              },
              {
                type: loanTypes[3],
                img: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&q=80',
                benefits: ['University tuition', 'Professional certifications', 'Skill-acquisition programs', 'Study materials'],
                maxTenure: '30 months',
              },
            ].map((item, i) => (
              <Box key={i} sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: i % 2 === 0 ? '1fr 340px' : '340px 1fr' },
                borderRadius: `${br * 2}px`,
                overflow: 'hidden',
                border: `1px solid ${palette.background.default}`,
                background: palette.background.paper,
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  boxShadow: `0 28px 70px ${item.type.color}12`,
                  transform: 'translateY(-5px)',
                  borderColor: 'transparent',
                  '& .lt-img': { transform: 'scale(1.05)' },
                },
              }}>
                {/* Content */}
                <Box sx={{
                  p: { xs: 3.5, md: 5 },
                  order: { xs: 2, md: i % 2 === 0 ? 1 : 2 },
                  position: 'relative', overflow: 'hidden',
                }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${item.type.color}, ${item.type.accent})` }} />
                  <Box sx={{ position: 'absolute', top: 0, right: 0, width: 130, height: 130, background: `radial-gradient(circle at top right, ${item.type.color}07, transparent 70%)`, borderRadius: `0 ${br * 2}px 0 100%` }} />

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                    <Box sx={{
                      width: 44, height: 44, borderRadius: `${br}px`,
                      background: `linear-gradient(135deg, ${item.type.color}, ${item.type.accent})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', boxShadow: `0 8px 22px ${item.type.color}35`,
                    }}>
                      {item.type.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ color: palette.text.primary, lineHeight: 1.2 }}>{item.type.label} Loan</Typography>
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, mt: 0.25, px: 1.5, py: 0.25, background: `${item.type.color}0e`, border: `1px solid ${item.type.color}20`, borderRadius: '100px' }}>
                        <TrendingDownIcon sx={{ fontSize: 12, color: item.type.accent }} />
                        <Typography variant="caption" sx={{ color: item.type.color, fontWeight: 600 }}>{item.type.rate}% p.a.</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2.5, mb: 3.5 }}>
                    <Box sx={{ p: 2, borderRadius: `${br - 2}px`, background: `${item.type.color}08`, border: `1px solid ${item.type.color}12`, textAlign: 'center', flex: 1 }}>
                      <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: item.type.color, fontSize: '1.1rem', lineHeight: 1 }}>
                        {formatNaira(item.type.max)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: palette.text.secondary }}>Max amount</Typography>
                    </Box>
                    <Box sx={{ p: 2, borderRadius: `${br - 2}px`, background: `${item.type.color}08`, border: `1px solid ${item.type.color}12`, textAlign: 'center', flex: 1 }}>
                      <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: item.type.color, fontSize: '1.1rem', lineHeight: 1 }}>
                        {item.maxTenure}
                      </Typography>
                      <Typography variant="caption" sx={{ color: palette.text.secondary }}>Max tenure</Typography>
                    </Box>
                  </Box>

                  <Typography variant="overline" sx={{ color: item.type.color, display: 'block', mb: 1.5 }}>
                    Use Cases
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                    {item.benefits.map((b, bi) => (
                      <Box key={bi} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: `${item.type.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckIcon sx={{ fontSize: 11, color: item.type.color }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: palette.text.primary, fontSize: '0.82rem' }}>{b}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Image */}
                <Box sx={{ order: { xs: 1, md: i % 2 === 0 ? 2 : 1 }, minHeight: { xs: 200, md: 'auto' }, overflow: 'hidden', position: 'relative' }}>
                  <Box className="lt-img" component="img"
                    src={item.img} alt={item.type.label}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                  <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${item.type.color}25, transparent 60%)` }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── ELIGIBILITY + PROCESS ─────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 7, md: 10 },
            mb: { xs: 9, md: 12 },
          }}>
            {/* Eligibility */}
            <Box>
              <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Eligibility</Typography>
              </Box>
              <Typography variant="h3" sx={{ color: palette.text.primary, mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                Who Can<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Apply?</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4 }}>
                All active members in good standing are eligible. Check the criteria below and log in to confirm your status instantly.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {eligibility.map((e, i) => (
                  <Box key={i} sx={{
                    display: 'flex', alignItems: 'center', gap: 2,
                    p: 2.5, borderRadius: `${br * 1.5}px`,
                    background: palette.background.paper,
                    border: `1px solid ${palette.background.default}`,
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                    '&:hover': { transform: 'translateX(5px)', borderColor: `${palette.primary.main}20`, boxShadow: `0 6px 24px ${palette.primary.main}0a` },
                  }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: '50%', background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckIcon sx={{ fontSize: 14, color: palette.primary.main }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: palette.text.primary }}>{e}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right: photo + trust badges */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ borderRadius: `${br * 2}px`, overflow: 'hidden', height: 260, position: 'relative', '&:hover img': { transform: 'scale(1.04)' } }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=700&q=80"
                  alt="Loan eligibility"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
                <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${palette.primary.dark}35, transparent 55%)` }} />
                <Box sx={{
                  position: 'absolute', bottom: 16, left: 16,
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
                  borderRadius: `${br}px`, px: 2, py: 1,
                  display: 'flex', alignItems: 'center', gap: 1,
                }}>
                  <TimerOutlinedIcon sx={{ fontSize: 15, color: palette.primary.main }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: palette.text.primary, fontFamily: typography.fontFamily }}>Approval within 48 hours</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {[
                  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 20 }} />, title: 'No Hidden Fees', desc: 'Fully transparent rate disclosure upfront.' },
                  { icon: <AccountBalanceIcon sx={{ fontSize: 20 }} />, title: 'Direct Credit', desc: 'Funds wired straight to your account.' },
                  { icon: <TimerOutlinedIcon sx={{ fontSize: 20 }} />, title: '48h Decision', desc: 'Most applications reviewed same day.' },
                  { icon: <HelpOutlineIcon sx={{ fontSize: 20 }} />, title: 'Guided Process', desc: 'Our team supports you throughout.' },
                ].map((t, i) => (
                  <Box key={i} sx={{
                    p: 2.5, borderRadius: `${br * 1.5}px`,
                    background: palette.background.paper,
                    border: `1px solid ${palette.background.default}`,
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                    '&:hover': { borderColor: `${palette.primary.main}18`, boxShadow: `0 8px 24px ${palette.primary.main}0a`, transform: 'translateY(-3px)' },
                  }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.primary.main, mb: 1.5 }}>
                      {t.icon}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.4 }}>{t.title}</Typography>
                    <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.6, display: 'block', fontSize: '0.78rem' }}>{t.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* How it works */}
          <Box
            ref={processRef}
            sx={{
              opacity: processVisible ? 1 : 0,
              transform: processVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 7 }}>
              <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>The Process</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' } }}>
                How to Apply
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }, gap: 3 }}>
              {process.map((step, i) => (
                <Box key={i} sx={{
                  position: 'relative',
                  p: 3.5, borderRadius: `${br * 2}px`,
                  background: palette.background.paper,
                  border: `1px solid ${palette.background.default}`,
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 20px 50px ${palette.primary.main}10`, borderColor: `${palette.primary.main}15` },
                }}>
                  <Typography sx={{ position: 'absolute', top: 6, right: 14, fontFamily: typography.fontFamily, fontSize: '5rem', fontWeight: 700, lineHeight: 1, color: `${palette.primary.main}07`, userSelect: 'none', pointerEvents: 'none' }}>
                    {step.num}
                  </Typography>
                  <Box sx={{ width: 36, height: 4, borderRadius: '100px', background: `linear-gradient(90deg, ${palette.primary.dark}, ${palette.primary.main})`, mb: 2.5 }} />
                  <Box sx={{ display: 'inline-block', px: 1.5, py: 0.3, mb: 1.5, background: `${palette.primary.main}0a`, border: `1px solid ${palette.primary.main}15`, borderRadius: '100px' }}>
                    <Typography variant="caption" sx={{ color: palette.primary.main, fontWeight: 600 }}>Step {step.num}</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ color: palette.text.primary, mb: 0.75, fontSize: '1rem' }}>{step.title}</Typography>
                  <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.7, fontSize: '0.85rem' }}>{step.desc}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            ref={testiRef}
            sx={{
              opacity: testiVisible ? 1 : 0,
              transform: testiVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Member Stories</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
                Lives Changed<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>By Our Loans</Box>
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 3 }}>
              {testimonials.map((t, i) => (
                <Box key={i} sx={{
                  p: 4, borderRadius: `${br * 2}px`,
                  background: i === 1 ? `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})` : palette.background.default,
                  border: i === 1 ? 'none' : `1px solid ${palette.background.default}`,
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  position: 'relative', overflow: 'hidden',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: i === 1 ? `0 32px 80px ${palette.primary.dark}55` : `0 24px 60px ${t.color}12` },
                }}>
                  {i === 1 && <Box sx={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents: 'none' }} />}
                  <Box sx={{ display: 'flex', gap: 0.3, mb: 2 }}>
                    {[...Array(5)].map((_, si) => <StarIcon key={si} sx={{ fontSize: 14, color: i === 1 ? theme.palette.warning.light : theme.palette.warning.dark }} />)}
                  </Box>
                  <Box sx={{ display: 'inline-flex', px: 1.5, py: 0.4, mb: 2, background: i === 1 ? 'rgba(255,255,255,0.15)' : `${t.color}10`, border: `1px solid ${i === 1 ? 'rgba(255,255,255,0.2)' : t.color + '20'}`, borderRadius: '100px' }}>
                    <Typography variant="caption" sx={{ color: i === 1 ? 'rgba(255,255,255,0.8)' : t.color, fontWeight: 600, fontSize: '0.72rem' }}>{t.loan}</Typography>
                  </Box>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '5rem', lineHeight: 0.5, color: i === 1 ? 'rgba(255,255,255,0.12)' : `${t.color}12`, fontWeight: 700, mb: 2, display: 'block' }}>
                    "
                  </Typography>
                  <Typography variant="body2" sx={{ color: i === 1 ? 'rgba(255,255,255,0.88)' : palette.text.secondary, lineHeight: 1.85, mb: 3.5, fontSize: '0.95rem' }}>
                    {t.quote}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `2px solid ${i === 1 ? 'rgba(255,255,255,0.3)' : t.color + '30'}` }}>
                      <Box component="img" src={t.img} alt={t.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: i === 1 ? '#fff' : palette.text.primary }}>{t.name}</Typography>
                      <Typography variant="caption" sx={{ color: i === 1 ? 'rgba(255,255,255,0.5)' : '#94a3b8' }}>{t.role}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── CTA ───────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', background: heroGradient, py: { xs: 10, md: 16 }, overflow: 'hidden' }}>
        {[{ size: 500, top: -100, right: -100 }, { size: 400, bottom: -100, left: -100 }].map((b, i) => (
          <Box key={i} sx={{ position: 'absolute', width: b.size, height: b.size, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)', top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none' }} />
        ))}
        <Box sx={{ position: 'absolute', right: { md: 60 }, top: '50%', transform: 'translateY(-50%)', width: 260, height: 260, borderRadius: '50%', overflow: 'hidden', opacity: 0.1, display: { xs: 'none', md: 'block' }, pointerEvents: 'none' }}>
          <Box component="img" src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=520&q=80" alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{ color: '#fff', mb: 2, fontSize: { xs: '2.6rem', md: '3.8rem' } }}>
              Ready to Apply<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                For a Loan?
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 480, mx: 'auto', fontWeight: 300 }}>
              Log in to check your eligibility, use the calculator above to plan your repayment,
              and submit your application in minutes.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mb: 6 }}>
              <Button component={Link} to="/login" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                sx={{ background: '#fff', color: palette.primary.dark, boxShadow: '0 10px 40px rgba(0,0,0,0.22)', '&:hover': { background: palette.background.default, boxShadow: '0 18px 56px rgba(0,0,0,0.28)' } }}>
                Login & Apply Now
              </Button>
              <Button component={Link} to="/membership" variant="outlined" size="large"
                sx={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.07)', '&:hover': { borderColor: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.14)' } }}>
                Membership Info
              </Button>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex' }}>
                {[
                  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80',
                  'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=60&q=80',
                ].map((img, i) => (
                  <Box key={i} sx={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.4)', ml: i > 0 ? -1.5 : 0, position: 'relative', zIndex: 4 - i }}>
                    <Box component="img" src={img} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                ))}
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                Join <Box component="span" sx={{ color: '#fff', fontWeight: 600 }}>1,240+</Box> members already growing with us
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default LoanCalculator;