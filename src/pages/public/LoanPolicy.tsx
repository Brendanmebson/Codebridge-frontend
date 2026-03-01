import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, useTheme, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GavelIcon from '@mui/icons-material/Gavel';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import StarIcon from '@mui/icons-material/Star';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';

function useFadeIn(threshold = 0.1) {
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

const LoanPolicy: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`;

  const quickFacts = [
    { val: '8%–15%', label: 'Interest Range', sub: 'p.a. by product', icon: <PercentOutlinedIcon sx={{ fontSize: 20 }} /> },
    { val: '3 Months', label: 'Min. Membership', sub: 'before eligibility', icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 20 }} /> },
    { val: '48 Hours', label: 'Decision Time', sub: 'after full submission', icon: <HourglassTopOutlinedIcon sx={{ fontSize: 20 }} /> },
    { val: 'Zero', label: 'Hidden Fees', sub: 'transparent terms', icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 20 }} /> },
  ];

  const loanProducts = [
    {
      name: 'Personal Loan',
      rate: '12% p.a.',
      max: '₦500,000',
      tenure: 'Up to 24 months',
      color: palette.primary.dark,
      accent: palette.primary.main,
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80',
      uses: ['Rent & housing', 'Medical expenses', 'Family needs', 'Debt consolidation'],
    },
    {
      name: 'Business Loan',
      rate: '10% p.a.',
      max: '₦2,000,000',
      tenure: 'Up to 36 months',
      color: palette.info.dark,
      accent: palette.info.main,
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80',
      uses: ['Working capital', 'Equipment purchase', 'Inventory & stock', 'Business growth'],
    },
    {
      name: 'Emergency Loan',
      rate: '15% p.a.',
      max: '₦200,000',
      tenure: 'Up to 12 months',
      color: palette.secondary.dark,
      accent: palette.secondary.main,
      img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80',
      uses: ['Medical emergencies', 'Urgent travel', 'Unexpected repairs', 'Family crises'],
    },
    {
      name: 'Education Loan',
      rate: '8% p.a.',
      max: '₦1,000,000',
      tenure: 'Up to 30 months',
      color: palette.info.dark,
      accent: '#00897B',
      img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80',
      uses: ['University tuition', 'Professional courses', 'Certifications', 'Study materials'],
    },
  ];

  const eligibilityCriteria = [
    { text: 'Active member for a minimum of 3 consecutive months', pass: true },
    { text: 'Up-to-date with monthly savings contributions — no arrears', pass: true },
    { text: 'No outstanding defaulted or non-performing loan on record', pass: true },
    { text: 'Completed member identity verification with valid government ID', pass: true },
    { text: 'Loan amount within the permitted multiple of savings balance', pass: true },
    { text: 'Members on suspension or under disciplinary action', pass: false },
    { text: 'Members with two or more active loans simultaneously', pass: false },
    { text: 'Members who have not met savings targets in the previous quarter', pass: false },
  ];

  const applicationSteps = [
    {
      num: '01', title: 'Submit Application',
      desc: 'Log in to your member dashboard, select the loan product, enter the amount and duration, and submit your application form.',
      color: palette.primary.dark, accent: palette.primary.main,
      img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&q=80',
    },
    {
      num: '02', title: 'Document Verification',
      desc: 'The Loans Committee verifies your identity, savings history, and existing obligations. No physical documents needed for existing members.',
      color: palette.info.dark, accent: palette.info.main,
      img: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=400&q=80',
    },
    {
      num: '03', title: 'Committee Review',
      desc: 'Applications are reviewed by the elected Loans Committee within 48 hours. You receive notification via SMS and email.',
      color: palette.secondary.dark, accent: palette.secondary.main,
      img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80',
    },
    {
      num: '04', title: 'Disbursement',
      desc: 'Approved funds are disbursed directly to your registered bank account within 24 hours of approval confirmation.',
      color: palette.info.dark, accent: '#00897B',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    },
  ];

  const repaymentRules = [
    { icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 20 }} />, title: 'Monthly Deductions', desc: 'Repayments are deducted from your savings account on the same date each month, starting 30 days after disbursement.', color: palette.primary.dark, accent: palette.primary.main },
    { icon: <RecyclingOutlinedIcon sx={{ fontSize: 20 }} />, title: 'Early Repayment', desc: 'Members may repay their loan early at any time with zero prepayment penalty. Interest is recalculated to the actual repayment date.', color: palette.info.dark, accent: palette.info.main },
    { icon: <PaymentsOutlinedIcon sx={{ fontSize: 20 }} />, title: 'Top-Up Eligibility', desc: 'After repaying at least 50% of an existing loan, members may apply for a top-up loan subject to normal eligibility criteria.', color: palette.secondary.dark, accent: palette.secondary.main },
    { icon: <HandshakeOutlinedIcon sx={{ fontSize: 20 }} />, title: 'Restructuring', desc: 'Members facing genuine financial hardship may apply to the Loans Committee for repayment restructuring before a default occurs.', color: palette.info.dark, accent: '#00897B' },
  ];

  const defaultConsequences = [
    { stage: 'Day 1–30', label: 'Reminder Notice', desc: 'SMS and email reminders sent. No penalty yet.', severity: 'low', color: palette.info.main },
    { stage: 'Day 31–60', label: 'Formal Warning', desc: 'Written notice issued. 2% monthly penalty begins.', severity: 'medium', color: palette.warning?.main || '#ED6C02' },
    { stage: 'Day 61–90', label: 'Account Restriction', desc: 'Savings access restricted. Referral to Disciplinary Committee.', severity: 'high', color: palette.error?.main || '#D32F2F' },
    { stage: 'Day 91+', label: 'Legal Action', desc: 'Legal recovery proceedings may commence. Membership suspended.', severity: 'critical', color: palette.error?.dark || '#B71C1C' },
  ];

  const testimonials = [
    {
      quote: "I read the policy before applying and everything was exactly as stated. No surprise charges, no hidden terms. The transparency is what makes this cooperative trustworthy.",
      name: 'Emeka Adeyemi', role: 'Business Loan Member', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      tag: 'Transparency', color: palette.primary.dark,
    },
    {
      quote: "I had difficulty repaying during a hard month. The Loans Committee worked with me to restructure — no judgment, just genuine cooperative support.",
      name: 'Adaeze Nwosu', role: 'Personal Loan Member', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80',
      tag: 'Member Support', color: palette.info.dark,
    },
    {
      quote: "The 8% education loan rate is unbeatable anywhere in Nigeria. I read the policy, applied within the hour, and had my funds in 48 hours. Incredible.",
      name: 'Funke Balogun', role: 'Education Loan Member', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      tag: 'Fast Disbursement', color: palette.secondary.dark,
    },
  ];

  const { ref: productsRef, visible: productsVisible } = useFadeIn();
  const { ref: eligRef, visible: eligVisible } = useFadeIn();
  const { ref: stepsRef, visible: stepsVisible } = useFadeIn();
  const { ref: repayRef, visible: repayVisible } = useFadeIn();
  const { ref: defaultRef, visible: defaultVisible } = useFadeIn();
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
        {[{ size: 620, top: -190, right: -190 }, { size: 420, bottom: -130, left: -130 }, { size: 260, top: '28%', left: '44%' }].map((b, i) => (
          <Box key={i} sx={{ position: 'absolute', width: b.size, height: b.size, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.09), transparent 70%)', top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none' }} />
        ))}
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundSize: '200px', opacity: 0.6 }} />
        {[...Array(7)].map((_, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', top: `${12 + i * 11}%`, right: `${5 + (i % 3) * 5}%`, animation: `dot${i} ${3 + i * 0.35}s ease-in-out ${i * 0.3}s infinite`, [`@keyframes dot${i}`]: { '0%,100%': { opacity: 0.2, transform: 'scale(1)' }, '50%': { opacity: 1, transform: 'scale(1.5)' } } }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1, border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.08)' }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: palette.secondary.light, boxShadow: `0 0 8px ${palette.secondary.light}`, animation: 'blink 2.5s ease infinite', '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', letterSpacing: '0.06em', fontWeight: 500 }}>
                Effective January 2024 · Last Reviewed by Board
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '55fr 45fr' }, gap: { xs: 6, md: 10 }, alignItems: 'center' }}>
            {/* Left */}
            <Box sx={{ animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) forwards', '@keyframes heroUp': { from: { opacity: 0, transform: 'translateY(36px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
              <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '3rem', sm: '3.8rem', md: '4.8rem' }, lineHeight: 1.1, mb: 3 }}>
                Loan Policy &<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Guidelines
                </Box>
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.68)', mb: 5, maxWidth: 480, fontWeight: 300 }}>
                Everything you need to know about how CodeBridge loans work — eligibility, rates,
                repayment, and your rights as a borrowing member. Clear, plain language, no surprises.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={Link} to="/loans" variant="contained" size="large" endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />} sx={{ background: '#fff', color: palette.primary.dark, boxShadow: '0 12px 40px rgba(0,0,0,0.22)', '&:hover': { background: palette.background.default, boxShadow: '0 20px 50px rgba(0,0,0,0.28)' } }}>
                  Apply for a Loan
                </Button>
                <Button component={Link} to="/governance" variant="outlined" size="large" sx={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.06)', '&:hover': { borderColor: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.12)' } }}>
                  Governance
                </Button>
              </Stack>
            </Box>

            {/* Right: quick fact cards */}
            <Box sx={{ display: { xs: 'none', md: 'grid' }, gridTemplateColumns: '1fr 1fr', gap: 2, animation: 'heroRight 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s forwards', opacity: 0, '@keyframes heroRight': { from: { opacity: 0, transform: 'translateX(24px)' }, to: { opacity: 1, transform: 'translateX(0)' } } }}>
              {quickFacts.map((f, i) => (
                <Box key={i} sx={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: `${br * 2}px`, p: 2.5, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)', '&:hover': { background: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' } }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, mb: 1.5, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.secondary.light }}>
                    {f.icon}
                  </Box>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '1.4rem', fontWeight: 700, color: '#fff', lineHeight: 1, mb: 0.3 }}>{f.val}</Typography>
                  <Typography variant="caption" sx={{ color: palette.secondary.light, fontWeight: 600, display: 'block', mb: 0.2 }}>{f.label}</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>{f.sub}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>

        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: { xs: 50, md: 72 }, background: palette.background.default, clipPath: 'ellipse(58% 100% at 50% 100%)' }} />
      </Box>


      {/* ── PURPOSE & SCOPE ───────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 6, md: 12 }, alignItems: 'center' }}>
            {/* Photo */}
            <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ borderRadius: `${br * 2}px`, overflow: 'hidden', height: 420, position: 'relative', '&:hover img': { transform: 'scale(1.04)' } }}>
                <Box component="img" src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80" alt="Loan policy" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
                <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${palette.primary.dark}25, transparent 60%)` }} />
              </Box>
              {/* Floating badge */}
              <Box sx={{ position: 'absolute', bottom: -18, right: -18, background: palette.background.paper, borderRadius: `${br * 1.5}px`, px: 2.5, py: 2, boxShadow: '0 12px 40px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GavelIcon sx={{ fontSize: 18, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, lineHeight: 1 }}>Board Approved</Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>Effective January 2024</Typography>
                </Box>
              </Box>
              {/* Second decorative image */}
              <Box sx={{ position: 'absolute', top: 20, right: -24, width: 120, height: 120, borderRadius: `${br * 2}px`, overflow: 'hidden', border: `4px solid ${palette.background.default}`, boxShadow: '0 12px 36px rgba(0,0,0,0.12)', '&:hover img': { transform: 'scale(1.06)' } }}>
                <Box component="img" src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=240&q=80" alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }} />
              </Box>
            </Box>

            {/* Text */}
            <Box>
              <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Purpose & Scope</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, lineHeight: 1.15, mb: 2 }}>
                Why This<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Policy Exists</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 3, lineHeight: 1.85 }}>
                This policy governs the administration of all loans issued by CodeBridge Cooperative Society.
                It was adopted by the Board of Directors in January 2024 and applies to all loan types offered to
                active members. It exists to ensure fairness, protect member funds, and maintain the cooperative's
                long-term financial health.
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4, lineHeight: 1.85 }}>
                The Loans Committee, elected by members at the AGM, is the sole body authorised to approve,
                restructure, or decline loan applications. No administrative staff may override a Committee decision.
              </Typography>

              {/* Key stats row */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {[
                  { val: '4', label: 'Loan Products' },
                  { val: 'Jan 2024', label: 'Effective Date' },
                  { val: 'Board', label: 'Reviewing Authority' },
                ].map((s, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {i > 0 && <Box sx={{ height: 24, background: `${palette.primary.main}20` }} />}
                    <Box>
                      <Typography variant="h5" sx={{ color: palette.primary.main, lineHeight: 1 }}>{s.val}</Typography>
                      <Typography variant="caption" sx={{ color: palette.text.secondary }}>{s.label}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── LOAN PRODUCTS TABLE ───────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Products & Rates</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
              Approved Loan<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Products</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 480, mx: 'auto' }}>
              Four products with fixed rates, set annually by the Board. All rates are flat per annum on reducing balance.
            </Typography>
          </Box>

          <Box
            ref={productsRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 3,
              opacity: productsVisible ? 1 : 0,
              transform: productsVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {loanProducts.map((p, i) => (
              <Box key={i} sx={{
                borderRadius: `${br * 2}px`, overflow: 'hidden',
                border: `1px solid ${palette.background.default}`,
                background: palette.background.paper,
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 24px 64px ${p.color}14`, borderColor: 'transparent', '& .lp-img': { transform: 'scale(1.06)' } },
              }}>
                {/* Image strip */}
                <Box sx={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                  <Box className="lp-img" component="img" src={p.img} alt={p.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
                  <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${p.color}55, transparent 60%)` }} />
                  {/* Rate badge */}
                  <Box sx={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', borderRadius: `${br}px`, px: 1.5, py: 0.75, display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <TrendingDownIcon sx={{ fontSize: 14, color: p.accent }} />
                    <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: p.color, fontSize: '0.85rem' }}>{p.rate}</Typography>
                  </Box>
                </Box>

                {/* Content */}
                <Box sx={{ p: 3.5, position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, ${p.accent})` }} />
                  <Typography variant="h5" sx={{ color: palette.text.primary, mb: 2, fontSize: '1.05rem' }}>{p.name}</Typography>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 2.5 }}>
                    {[{ label: 'Max Amount', val: p.max }, { label: 'Max Tenure', val: p.tenure }].map((d, di) => (
                      <Box key={di} sx={{ p: 2, borderRadius: `${br - 2}px`, background: `${p.color}08`, border: `1px solid ${p.color}12`, textAlign: 'center' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: p.color, fontSize: '0.95rem', lineHeight: 1, mb: 0.4 }}>{d.val}</Typography>
                        <Typography variant="caption" sx={{ color: palette.text.secondary }}>{d.label}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Typography variant="overline" sx={{ color: p.color, display: 'block', mb: 1 }}>Permitted Uses</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75 }}>
                    {p.uses.map((u, ui) => (
                      <Box key={ui} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: `${p.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <CheckIcon sx={{ fontSize: 10, color: p.color }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: palette.text.primary, fontSize: '0.8rem' }}>{u}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Rate note */}
          <Box sx={{ mt: 4, p: 3, borderRadius: `${br * 1.5}px`, background: `${palette.info.main}08`, border: `1px solid ${palette.info.main}18`, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <InfoOutlinedIcon sx={{ fontSize: 20, color: palette.info.main, mt: 0.2, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8 }}>
              All interest rates are calculated on a <strong style={{ color: palette.text.primary }}>reducing balance</strong> basis. Rates are reviewed annually by the Board and may change for new applications. Existing loans are not affected by rate changes during their tenure.
            </Typography>
          </Box>
        </Container>
      </Box>


      {/* ── ELIGIBILITY ───────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 7, md: 12 }, alignItems: 'start' }}>
            {/* Left */}
            <Box
              ref={eligRef}
              sx={{
                opacity: eligVisible ? 1 : 0,
                transform: eligVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Eligibility Criteria</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, lineHeight: 1.15, mb: 2 }}>
                Who Qualifies &<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Who Does Not</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4 }}>
                Eligibility is assessed automatically from your member record at the time of application. No manual submission required.
              </Typography>

              {/* Eligible */}
              <Typography variant="overline" sx={{ color: palette.primary.main, display: 'block', mb: 1.5 }}>Qualifying Criteria</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3.5 }}>
                {eligibilityCriteria.filter(e => e.pass).map((e, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2.5, borderRadius: `${br * 1.5}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)', '&:hover': { transform: 'translateX(5px)', borderColor: `${palette.primary.main}20`, boxShadow: `0 6px 20px ${palette.primary.main}0a` } }}>
                    <Box sx={{ width: 26, height: 26, borderRadius: '50%', background: `${palette.primary.main}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.1 }}>
                      <CheckIcon sx={{ fontSize: 14, color: palette.primary.main }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: palette.text.primary, lineHeight: 1.7 }}>{e.text}</Typography>
                  </Box>
                ))}
              </Box>

              {/* Ineligible */}
              <Typography variant="overline" sx={{ color: palette.error?.main || '#D32F2F', display: 'block', mb: 1.5 }}>Disqualifying Conditions</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {eligibilityCriteria.filter(e => !e.pass).map((e, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2.5, borderRadius: `${br * 1.5}px`, background: `${palette.error?.main || '#D32F2F'}05`, border: `1px solid ${palette.error?.main || '#D32F2F'}15`, transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)', '&:hover': { transform: 'translateX(5px)' } }}>
                    <Box sx={{ width: 26, height: 26, borderRadius: '50%', background: `${palette.error?.main || '#D32F2F'}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.1 }}>
                      <CloseIcon sx={{ fontSize: 14, color: palette.error?.main || '#D32F2F' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.7 }}>{e.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right: Loan limit formula + photo */}
            <Box>
              {/* Photo */}
              <Box sx={{ borderRadius: `${br * 2}px`, overflow: 'hidden', height: 220, mb: 3, position: 'relative', '&:hover img': { transform: 'scale(1.04)' } }}>
                <Box component="img" src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=700&q=80" alt="Eligibility" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
                <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${palette.primary.dark}35, transparent 55%)` }} />
                <Box sx={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', borderRadius: `${br}px`, px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityOutlinedIcon sx={{ fontSize: 15, color: palette.primary.main }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: palette.text.primary, fontFamily: typography.fontFamily }}>Assessed from your member record</Typography>
                </Box>
              </Box>

              {/* Loan limit formula */}
              <Box sx={{ p: 4, borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                  <Box sx={{ width: 38, height: 38, borderRadius: `${br - 2}px`, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.primary.main }}>
                    <PercentOutlinedIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: palette.text.primary, fontSize: '1rem' }}>Loan Limit Formula</Typography>
                </Box>
                <Box sx={{ p: 2.5, borderRadius: `${br - 2}px`, background: palette.background.default, border: `1px solid ${palette.primary.main}10`, mb: 2 }}>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: '0.88rem', color: palette.primary.main, fontWeight: 700, letterSpacing: '0.02em', lineHeight: 1.8 }}>
                    Max Loan = Savings Balance × Product Multiplier
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                  {[
                    { product: 'Personal', multiplier: '2× savings balance' },
                    { product: 'Business', multiplier: '3× savings balance' },
                    { product: 'Emergency', multiplier: '1× savings balance' },
                    { product: 'Education', multiplier: '2.5× savings balance' },
                  ].map((r, i) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: i < 3 ? `1px dashed ${palette.primary.main}12` : 'none' }}>
                      <Typography variant="body2" sx={{ color: palette.text.secondary }}>{r.product} Loan</Typography>
                      <Box sx={{ px: 1.5, py: 0.35, background: `${palette.primary.main}0a`, border: `1px solid ${palette.primary.main}15`, borderRadius: '100px' }}>
                        <Typography variant="caption" sx={{ color: palette.primary.main, fontWeight: 600 }}>{r.multiplier}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Note */}
              <Box sx={{ p: 3, borderRadius: `${br * 1.5}px`, background: `${palette.warning?.main || '#ED6C02'}08`, border: `1px solid ${palette.warning?.main || '#ED6C02'}20`, display: 'flex', gap: 1.5 }}>
                <WarningAmberOutlinedIcon sx={{ fontSize: 18, color: palette.warning?.main || '#ED6C02', mt: 0.2, flexShrink: 0 }} />
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.8 }}>
                  Loan amounts are subject to the Loans Committee's discretion and the cooperative's available lending pool at the time of application.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── APPLICATION PROCESS ───────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Application Process</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
              From Application<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>to Disbursement</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 480, mx: 'auto' }}>
              Four clearly defined steps — completed entirely online from your member dashboard.
            </Typography>
          </Box>

          <Box
            ref={stepsRef}
            sx={{
              display: 'flex', flexDirection: 'column', gap: 4,
              opacity: stepsVisible ? 1 : 0,
              transform: stepsVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {applicationSteps.map((step, i) => (
              <Box key={i} sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: i % 2 === 0 ? '1fr 320px' : '320px 1fr' },
                borderRadius: `${br * 2}px`, overflow: 'hidden',
                border: `1px solid ${palette.background.default}`,
                background: palette.background.default,
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 24px 60px ${step.color}10`, borderColor: 'transparent', '& .as-img': { transform: 'scale(1.05)' } },
              }}>
                {/* Content */}
                <Box sx={{ p: { xs: 3.5, md: 5 }, order: { xs: 2, md: i % 2 === 0 ? 1 : 2 }, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${step.color}, ${step.accent})` }} />
                  <Typography sx={{ position: 'absolute', top: 8, right: 20, fontFamily: typography.fontFamily, fontSize: '5.5rem', fontWeight: 700, lineHeight: 1, color: `${step.color}07`, userSelect: 'none', pointerEvents: 'none' }}>
                    {step.num}
                  </Typography>
                  <Box sx={{ display: 'inline-flex', px: 2, py: 0.5, mb: 2.5, background: `${step.color}0e`, border: `1px solid ${step.color}18`, borderRadius: '100px', width: 'fit-content' }}>
                    <Typography variant="overline" sx={{ color: step.color, fontSize: '0.7rem' }}>Step {step.num}</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: palette.text.primary, mb: 1.5, fontSize: '1.3rem' }}>{step.title}</Typography>
                  <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.8 }}>{step.desc}</Typography>
                </Box>
                {/* Image */}
                <Box sx={{ order: { xs: 1, md: i % 2 === 0 ? 2 : 1 }, minHeight: { xs: 180, md: 'auto' }, overflow: 'hidden', position: 'relative' }}>
                  <Box className="as-img" component="img" src={step.img} alt={step.title} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
                  <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${step.color}25, transparent 60%)` }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── REPAYMENT RULES ───────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Repayment Terms</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
              Repayment Rules<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>& Member Rights</Box>
            </Typography>
          </Box>

          <Box
            ref={repayRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
              gap: 3, mb: 6,
              opacity: repayVisible ? 1 : 0,
              transform: repayVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {repaymentRules.map((r, i) => (
              <Box key={i} sx={{
                p: 3.5, borderRadius: `${br * 2}px`,
                background: palette.background.paper,
                border: `1px solid ${palette.background.default}`,
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': { transform: 'translateY(-7px)', boxShadow: `0 20px 55px ${r.color}12`, borderColor: 'transparent', '& .rr-icon': { background: `linear-gradient(135deg, ${r.color}, ${r.accent})`, color: '#fff' } },
              }}>
                <Box className="rr-icon" sx={{ width: 50, height: 50, borderRadius: `${br}px`, mb: 2.5, background: `${r.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.color, transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
                  {r.icon}
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, mb: 1, fontSize: '0.97rem' }}>{r.title}</Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block', fontSize: '0.82rem' }}>{r.desc}</Typography>
              </Box>
            ))}
          </Box>

          {/* Repayment photo strip */}
          <Box sx={{ borderRadius: `${br * 2}px`, overflow: 'hidden', height: 220, position: 'relative', '&:hover img': { transform: 'scale(1.03)' } }}>
            <Box component="img" src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&q=80" alt="Repayment" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
            <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${palette.primary.dark}80 0%, ${palette.primary.dark}20 100%)` }} />
            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', px: { xs: 4, md: 8 } }}>
              <Box>
                <Typography variant="h4" sx={{ color: '#fff', mb: 1, fontWeight: 300, fontStyle: 'italic', fontSize: { xs: '1.4rem', md: '2rem' } }}>
                  No prepayment penalties. Ever.
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 460 }}>
                  Repay early, save on interest. We believe in empowering members, not locking them in.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── DEFAULT & CONSEQUENCES ────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 7, md: 12 }, alignItems: 'start' }}>
            {/* Left */}
            <Box
              ref={defaultRef}
              sx={{
                opacity: defaultVisible ? 1 : 0,
                transform: defaultVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.error?.main || '#D32F2F'}10`, border: `1px solid ${palette.error?.main || '#D32F2F'}22`, borderRadius: '100px', mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: palette.error?.main || '#D32F2F' }}>Default Policy</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, lineHeight: 1.15, mb: 2 }}>
                What Happens<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.error?.main || '#D32F2F' }}>on Default</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4 }}>
                A loan is considered in default when repayment is overdue by 30 or more days.
                The cooperative follows a structured escalation process, giving members every
                opportunity to resolve their situation before legal action.
              </Typography>

              {/* Escalation timeline */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {defaultConsequences.map((d, i) => (
                  <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 2.5 }}>
                    {/* Stage */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: i < defaultConsequences.length - 1 ? 3 : 0 }}>
                      <Box sx={{ px: 1.5, py: 0.75, borderRadius: `${br - 2}px`, background: `${d.color}10`, border: `1px solid ${d.color}22`, mb: 1.5, textAlign: 'center', width: '100%' }}>
                        <Typography variant="caption" sx={{ color: d.color, fontWeight: 700, fontSize: '0.7rem', display: 'block', lineHeight: 1.3 }}>{d.stage}</Typography>
                      </Box>
                      {i < defaultConsequences.length - 1 && (
                        <Box sx={{ flex: 1, width: 2, background: `linear-gradient(180deg, ${d.color}30, ${defaultConsequences[i + 1].color}30)`, borderRadius: '100px', minHeight: 24 }} />
                      )}
                    </Box>
                    {/* Card */}
                    <Box sx={{ pb: i < defaultConsequences.length - 1 ? 3 : 0 }}>
                      <Box sx={{ p: 2.5, borderRadius: `${br * 1.5}px`, background: `${d.color}06`, border: `1px solid ${d.color}15`, transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)', '&:hover': { transform: 'translateX(5px)', background: `${d.color}10` } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <PriorityHighOutlinedIcon sx={{ fontSize: 15, color: d.color }} />
                          <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary }}>{d.label}</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block' }}>{d.desc}</Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right */}
            <Box>
              {/* Enforcement photo */}
              <Box sx={{ borderRadius: `${br * 2}px`, overflow: 'hidden', height: 240, mb: 3, position: 'relative', '&:hover img': { transform: 'scale(1.04)' } }}>
                <Box component="img" src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80" alt="Legal enforcement" sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
                <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${palette.primary.dark}35, transparent 55%)` }} />
                <Box sx={{ position: 'absolute', bottom: 16, left: 16, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)', borderRadius: `${br}px`, px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssignmentOutlinedIcon sx={{ fontSize: 15, color: palette.primary.main }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: palette.text.primary, fontFamily: typography.fontFamily }}>Documented & transparent process</Typography>
                </Box>
              </Box>

              {/* Appeal rights */}
              <Box sx={{ p: 4, borderRadius: `${br * 2}px`, background: palette.background.default, border: `1px solid ${palette.background.default}`, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ width: 38, height: 38, borderRadius: `${br - 2}px`, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.primary.main }}>
                    <AccountBalanceOutlinedIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: palette.text.primary, fontSize: '1rem' }}>Your Right to Appeal</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8, fontWeight: 300, mb: 2 }}>
                  Any member facing disciplinary action related to a loan default has the right to formally appeal
                  the Loans Committee's decision to the full Board of Directors within 14 days of notification.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {['Submit written appeal to the Board Secretary within 14 days', 'Board decision is final and communicated within 21 days', 'Member may be represented by another member at the hearing'].map((r, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                      <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: `${palette.primary.main}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.2 }}>
                        <CheckIcon sx={{ fontSize: 10, color: palette.primary.main }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7 }}>{r}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Help CTA */}
              <Box sx={{ p: 3.5, borderRadius: `${br * 2}px`, background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)', pointerEvents: 'none' }} />
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <HandshakeOutlinedIcon sx={{ fontSize: 20, color: '#fff' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>Struggling to repay?</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, display: 'block', mb: 2 }}>
                      Contact the Loans Committee before you default. Restructuring options are available and far better than escalation.
                    </Typography>
                    <Button component={Link} to="/contact" size="small"
                      sx={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: '100px', textTransform: 'none', fontFamily: typography.fontFamily, fontWeight: 600, fontSize: '0.8rem', px: 2.5, '&:hover': { background: 'rgba(255,255,255,0.28)' } }}>
                      Contact Us
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
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
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Member Voices</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
                The Policy in<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Practice</Box>
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 3 }}>
              {testimonials.map((t, i) => (
                <Box key={i} sx={{
                  p: 4, borderRadius: `${br * 2}px`,
                  background: i === 1 ? `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})` : palette.background.paper,
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
                    <Typography variant="caption" sx={{ color: i === 1 ? 'rgba(255,255,255,0.8)' : t.color, fontWeight: 600, fontSize: '0.72rem' }}>{t.tag}</Typography>
                  </Box>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '5rem', lineHeight: 0.5, color: i === 1 ? 'rgba(255,255,255,0.12)' : `${t.color}12`, fontWeight: 700, mb: 2, display: 'block' }}>"</Typography>
                  <Typography variant="body2" sx={{ color: i === 1 ? 'rgba(255,255,255,0.88)' : palette.text.secondary, lineHeight: 1.85, mb: 3.5, fontSize: '0.95rem' }}>{t.quote}</Typography>
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
          <Box component="img" src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=520&q=80" alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{ color: '#fff', mb: 2, fontSize: { xs: '2.6rem', md: '3.8rem' } }}>
              Ready to Apply<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                With Confidence?
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 520, mx: 'auto', fontWeight: 300 }}>
              Now that you understand the policy, log in to apply. Transparent rates, clear terms,
              and a Loans Committee that genuinely works for members.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mb: 6 }}>
              <Button component={Link} to="/loans" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                sx={{ background: '#fff', color: palette.primary.dark, boxShadow: '0 10px 40px rgba(0,0,0,0.22)', '&:hover': { background: palette.background.default, boxShadow: '0 18px 56px rgba(0,0,0,0.28)' } }}>
                Loan Calculator
              </Button>
              <Button component={Link} to="/login" variant="outlined" size="large"
                sx={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.07)', '&:hover': { borderColor: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.14)' } }}>
                Login & Apply
              </Button>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex' }}>
                {['https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80', 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=60&q=80'].map((img, i) => (
                  <Box key={i} sx={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.4)', ml: i > 0 ? -1.5 : 0, position: 'relative', zIndex: 4 - i }}>
                    <Box component="img" src={img} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                ))}
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                Join <Box component="span" sx={{ color: '#fff', fontWeight: 600 }}>1,240+</Box> members already borrowing with us
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default LoanPolicy;