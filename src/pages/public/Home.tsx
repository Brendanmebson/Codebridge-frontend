import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Container, Stack, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// --- Animated counter hook ---
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function StatCounter({ value, label, prefix = '', suffix = '' }: {
  value: number; label: string; prefix?: string; suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(value, 2000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={ref} sx={{ textAlign: 'center', p: { xs: 2, md: 3 } }}>
      <Typography variant="h2" sx={{
        color: '#fff',
        fontSize: { xs: '2.8rem', md: '3.6rem' },
        lineHeight: 1,
        mb: 0.5,
      }}>
        {prefix}{count.toLocaleString()}{suffix}
      </Typography>
      <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.6)' }}>
        {label}
      </Typography>
    </Box>
  );
}

const Home: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  const features = [
    {
      icon: <SavingsIcon sx={{ fontSize: 24 }} />,
      title: 'Secure Savings',
      description: 'Build financial security with our disciplined savings schemes tailored to your personal and family goals.',
      color: palette.primary.dark,
      accent: palette.primary.main,
      bg: '#E8F5E9',
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 24 }} />,
      title: 'Affordable Loans',
      description: 'Access credit facilities for personal, business, and emergency needs at fair, transparent rates.',
      color: palette.info.dark,
      accent: palette.info.main,
      bg: '#E0F2F1',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 24 }} />,
      title: 'Welfare Support',
      description: 'Benefit from collective mutual aid during times of hardship, celebration, and community milestones.',
      color: palette.secondary.dark,
      accent: palette.secondary.main,
      bg: '#F1F8E9',
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 24 }} />,
      title: 'Transparent Governance',
      description: 'Member-focused decision-making with full accountability, open reporting, and democratic oversight.',
      color: palette.primary.dark,
      accent: palette.success.main,
      bg: '#F9FBE7',
    },
  ];

  const values = [
    { icon: <SecurityIcon sx={{ fontSize: 22 }} />, title: 'Trust & Security', desc: 'Your funds are protected by best-in-class financial safeguards and cooperative law.' },
    { icon: <SpeedIcon sx={{ fontSize: 22 }} />, title: 'Fast Processing', desc: 'Loan decisions within 48 hours. Savings credited instantly. No bureaucratic delays.' },
    { icon: <HandshakeIcon sx={{ fontSize: 22 }} />, title: 'Mutual Support', desc: 'Every member gains access to a network of people invested in their financial success.' },
    { icon: <EmojiEventsIcon sx={{ fontSize: 22 }} />, title: 'Proven Results', desc: '8+ years of consistent member growth, competitive returns, and community impact.' },
  ];

  const testimonials = [
    {
      quote: "CodeBridge helped me secure a loan to expand my tailoring business. The process was seamless, the rates were fair, and the team genuinely cared.",
      name: "Amara Okonkwo",
      role: "Business Owner, Lagos",
      color: palette.primary.dark,
      img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80',
      stars: 5,
    },
    {
      quote: "I've been saving with CodeBridge for two years now. Their disciplined approach and consistent dividends helped me buy my first home.",
      name: "Emeka Adeyemi",
      role: "Software Engineer, Abuja",
      color: palette.info.dark,
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
      stars: 5,
    },
    {
      quote: "When my father passed, the welfare support from CodeBridge was extraordinary. This cooperative truly feels like an extended family.",
      name: "Funke Balogun",
      role: "Teacher, Ibadan",
      color: palette.secondary.dark,
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
      stars: 5,
    },
  ];

  const howItWorks = [
    { step: '01', title: 'Register', desc: 'Complete a simple membership form and get verified in under 24 hours.' },
    { step: '02', title: 'Contribute', desc: 'Set up your monthly savings plan and make your first contribution.' },
    { step: '03', title: 'Access Benefits', desc: 'Unlock loans, dividends, and welfare support as an active member.' },
    { step: '04', title: 'Grow Together', desc: 'Participate in governance, referrals, and community investment programs.' },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80',
    'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=500&q=80',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80',
    'https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=500&q=80',
    'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=500&q=80',
    'https://images.unsplash.com/photo-1560264280-88b68371db39?w=500&q=80',
  ];

  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 50%, ${palette.secondary.dark} 100%)`;
  const statsGradient = `linear-gradient(135deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`;
  const gold = palette.warning.dark;

  return (
    <Box sx={{ fontFamily: typography.fontFamily, overflowX: 'hidden', background: palette.background.paper }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        minHeight: '100vh',
        background: heroGradient,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingBottom: { xs: 12, md: 14 },
      }}>

                 <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <Box sx={{
            position: 'absolute', top: '-120px', right: '-120px',
            width: { xs: 340, md: 560 }, height: { xs: 340, md: 560 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            border: '1px solid rgba(255,255,255,0.1)',
          }} />
          <Box sx={{
            position: 'absolute', bottom: '-80px', left: '-80px',
            width: { xs: 280, md: 420 }, height: { xs: 280, md: 420 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            border: '1px solid rgba(255,255,255,0.07)',
          }} />
          {/* Leaf blob */}
          <Box sx={{
            position: 'absolute', top: '25%', right: '10%',
            width: 180, height: 180,
            borderRadius: '70% 30% 60% 40% / 50% 60% 40% 50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            transform: 'rotate(25deg)',
          }} />
          {[...Array(6)].map((_, i) => (
            <Box key={i} sx={{
              position: 'absolute',
              width: { xs: 5, md: 7 }, height: { xs: 5, md: 7 },
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.45)',
              top: `${15 + i * 13}%`,
              right: `${6 + (i % 3) * 5}%`,
              animation: `dp${i} ${2.5 + i * 0.3}s ease-in-out ${i * 0.3}s infinite`,
              [`@keyframes dp${i}`]: {
                '0%,100%': { opacity: 0.2, transform: 'scale(1)' },
                '50%': { opacity: 0.9, transform: 'scale(1.3)' },
              },
            }} />
          ))}
        </Box>
                {/* Soft blobs */}
        {[
          { size: 700, top: -200, right: -200, opacity: 0.14 },
          { size: 500, bottom: -150, left: -150, opacity: 0.12 },
          { size: 300, top: '30%', left: '40%', opacity: 0.08 },
        ].map((b, i) => (
          <Box key={i} sx={{
            position: 'absolute',
            width: b.size, height: b.size, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,255,255,${b.opacity}), transparent 70%)`,
            top: b.top, bottom: b.bottom, right: b.right, left: b.left,
            pointerEvents: 'none',
          }} />
        ))}
        {[
          { size: 700, top: -200, right: -200, opacity: 0.14 },
          { size: 500, bottom: -150, left: -150, opacity: 0.12 },
          { size: 300, top: '30%', left: '40%', opacity: 0.08 },
        ].map((b, i) => (
          <Box key={i} sx={{
            position: 'absolute',
            width: b.size, height: b.size, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,255,255,${b.opacity}), transparent 70%)`,
            top: b.top, bottom: b.bottom, right: b.right, left: b.left,
            pointerEvents: 'none',
          }} />
        ))}
        <Box sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '200px', opacity: 0.6,
        }} />
        {[...Array(8)].map((_, i) => (
          <Box key={i} sx={{
            position: 'absolute', width: 4, height: 4, borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            top: `${10 + i * 11}%`, right: `${4 + (i % 4) * 4}%`,
            animation: `pulse${i} ${3 + i * 0.4}s ease-in-out ${i * 0.25}s infinite`,
            [`@keyframes pulse${i}`]: {
              '0%,100%': { opacity: 0.2, transform: 'scale(1)' },
              '50%': { opacity: 1, transform: 'scale(1.6)' },
            },
          }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '55fr 45fr' },
            gap: { xs: 6, md: 10 },
            alignItems: 'center',
            py: { xs: 12, md: 8 },
          }}>
            <Box sx={{
              animation: 'fadeUp 1s cubic-bezier(0.22,1,0.36,1) forwards',
              '@keyframes fadeUp': {
                from: { opacity: 0, transform: 'translateY(40px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}>
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 1,
                px: 2.5, py: 1,
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '100px', mb: 4,
                backdropFilter: 'blur(12px)',
                background: 'rgba(255,255,255,0.08)',
              }}>
                <Box sx={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: palette.secondary.light,
                  boxShadow: `0 0 8px ${palette.secondary.light}`,
                  animation: 'blink 2.5s ease infinite',
                  '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
                }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', letterSpacing: '0.06em', fontWeight: 500 }}>
                  Trusted by 1,200+ Members across Nigeria
                </Typography>
              </Box>

              <Typography variant="h1" sx={{
                color: '#fff',
                fontSize: { xs: '3rem', sm: '3.8rem', md: '4.8rem' },
                mb: 3,
              }}>
                Financial<br />
                <Box component="span" sx={{
                  fontWeight: 300, fontStyle: 'italic',
                  background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Empowerment
                </Box>
                <br />Starts Here.
              </Typography>

              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.68)', mb: 5, maxWidth: 500, fontWeight: 300 }}>
                A member-owned cooperative promoting savings, providing affordable loans,
                and improving economic wellbeing through mutual support and responsible financial management.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 5 }}>
                <Button
                  component={Link} to="/login" variant="contained" size="large"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    background: '#fff', color: palette.primary.dark,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
                    '&:hover': { background: palette.background.default, boxShadow: '0 20px 50px rgba(0,0,0,0.28)' },
                  }}
                >
                  Get Started Today
                </Button>
                <Button
                  component={Link} to="/loans" variant="outlined" size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.35)', color: '#fff',
                    backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.06)',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.12)' },
                  }}
                >
                  Apply for a Loan
                </Button>
              </Stack>

              {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                {[
                  { val: '₦1.2B+', lab: 'Disbursed' },
                  { val: '98%', lab: 'Approval Rate' },
                  { val: '48h', lab: 'Loan Turnaround' },
                ].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {i > 0 && <Box sx={{ width: 1, height: 28, background: 'rgba(255,255,255,0.2)' }} />}
                    <Box>
                      <Typography variant="h5" sx={{ color: '#fff', lineHeight: 1 }}>{item.val}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>{item.lab}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box> */}
            </Box>

            {/* Right: floating cards */}
            <Box sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'relative', height: 520,
              justifyContent: 'center', alignItems: 'center',
              animation: 'fadeRight 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s forwards',
              opacity: 0,
              '@keyframes fadeRight': {
                from: { opacity: 0, transform: 'translateX(30px)' },
                to: { opacity: 1, transform: 'translateX(0)' },
              },
            }}>
              <Box sx={{
                position: 'absolute', width: 300, height: 185,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)',
                backdropFilter: 'blur(24px)',
                borderRadius: `${br * 2}px`, p: 3,
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -58%) rotate(-5deg)',
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3.5 }}>
                  <Box>
                    <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.55)', display: 'block', mb: 0.5 }}>Savings Balance</Typography>
                    <Typography variant="h3" sx={{ color: '#fff', fontSize: '2rem' }}>₦ 842,500</Typography>
                  </Box>
                  <Box sx={{ width: 42, height: 42, borderRadius: `${br}px`, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SavingsIcon sx={{ fontSize: 20, color: '#fff' }} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.75 }}>
                  {[...Array(5)].map((_, i) => (
                    <Box key={i} sx={{ height: 3, flex: 1, borderRadius: 6, background: i < 4 ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.18)' }} />
                  ))}
                </Box>
              </Box>

              <Box sx={{
                position: 'absolute', top: '8%', right: '-2%',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.18)', borderRadius: `${br * 1.5}px`,
                p: 2.5, width: 160,
                animation: 'float1 4s ease-in-out infinite',
                '@keyframes float1': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                  <TrendingUpIcon sx={{ fontSize: 14, color: palette.secondary.light }} />
                  <Typography variant="caption" sx={{ color: palette.secondary.light, fontWeight: 600 }}>+12.4% growth</Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#fff', lineHeight: 1, fontSize: '1.7rem' }}>₦1.2B</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mt: 0.3 }}>Total Disbursed</Typography>
              </Box>

              <Box sx={{
                position: 'absolute', bottom: '12%', left: '0%',
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.18)', borderRadius: `${br * 1.5}px`,
                p: 2.5, width: 150,
                animation: 'float2 3.6s ease-in-out infinite 0.8s',
                '@keyframes float2': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                  <PeopleAltIcon sx={{ fontSize: 14, color: palette.info.light }} />
                  <Typography variant="caption" sx={{ color: palette.info.light, fontWeight: 600 }}>Active Members</Typography>
                </Box>
                <Typography variant="h4" sx={{ color: '#fff', lineHeight: 1, fontSize: '1.7rem' }}>1,240</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mt: 0.3 }}>& growing</Typography>
              </Box>

              <Box sx={{
                position: 'absolute', bottom: '2%', right: '5%',
                width: 120, height: 120, borderRadius: '50%', overflow: 'hidden',
                border: '3px solid rgba(255,255,255,0.22)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
                animation: 'float3 5s ease-in-out infinite 1.4s',
                '@keyframes float3': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-7px)' } },
              }}>
                <Box component="img" src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=240&q=80" alt="Member"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>

              <Box sx={{
                position: 'absolute', top: '40%', right: '-5%',
                background: palette.background.paper, borderRadius: `${br}px`,
                px: 2, py: 1.5, boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
                display: 'flex', alignItems: 'center', gap: 1.5, width: 200,
                animation: 'float4 4.5s ease-in-out infinite 2s',
                '@keyframes float4': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
              }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: `${br - 4}px`,
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: palette.text.primary, lineHeight: 1.2, display: 'block' }}>Loan Approved!</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>₦250,000 disbursed</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>

        <Box sx={{
          position: 'absolute', bottom: -1, left: 0, right: 0,
          height: { xs: 50, md: 72 },
          background: palette.background.default,
          clipPath: 'ellipse(58% 100% at 50% 100%)',
        }} />
      </Box>


      {/* ── REAL IMPACT ───────────────────────────────────────── */}
      {/* Replaces the old "Who We Are" section. Shows measurable proof 
          of what the cooperative has done — numbers, faces, a quote. 
          Unique to this page; About page covers the story/mission. */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">

          {/* Top label + headline */}
          <Box sx={{ mb: { xs: 7, md: 10 } }}>
            <Box sx={{
              display: 'inline-block', px: 2.5, py: 0.6,
              background: `${palette.primary.main}12`, border: `1px solid ${palette.primary.main}25`,
              borderRadius: '100px', mb: 2.5,
            }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Real Impact</Typography>
            </Box>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 3, md: 6 },
              alignItems: 'flex-end',
            }}>
              <Typography variant="h2" sx={{
                color: palette.text.primary,
                fontSize: { xs: '2.2rem', md: '3rem' },
                lineHeight: 1.15,
              }}>
                Numbers That<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>
                  Speak for Themselves
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 420 }}>
                Every figure below is a real member whose life we've touched — a business funded,
                a home purchased, a family supported through hardship.
              </Typography>
            </Box>
          </Box>

          {/* Impact grid — large numbers + photo mosaic side by side */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 5 },
            alignItems: 'stretch',
          }}>

            {/* Left: impact metric cards */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              {[
                { value: '₦1.2B+', label: 'Total Disbursed', sub: 'Across all loan categories', color: palette.primary.main, bg: '#E8F5E9' },
                { value: '1,240', label: 'Active Members', sub: 'And growing every month', color: palette.info.main, bg: '#E0F2F1' },
                { value: '98%', label: 'Approval Rate', sub: 'Fastest in the sector', color: palette.secondary.dark, bg: '#F1F8E9' },
                { value: '₦150K', label: 'Avg. Loan Size', sub: 'Accessible to all members', color: palette.primary.dark, bg: '#F9FBE7' },
              ].map((m, i) => (
                <Box key={i} sx={{
                  p: 3, borderRadius: `${br * 2}px`,
                  background: palette.background.paper,
                  border: `1px solid ${m.bg}`,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 20px 50px ${m.color}18`,
                    background: `${m.bg}88`,
                    borderColor: 'transparent',
                  },
                }}>
                  <Box sx={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: m.color, mb: 2,
                    boxShadow: `0 0 0 4px ${m.color}20`,
                  }} />
                  <Typography variant="h3" sx={{
                    color: palette.text.primary,
                    fontSize: { xs: '1.7rem', md: '2rem' },
                    lineHeight: 1, mb: 0.75,
                  }}>
                    {m.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.text.primary, fontWeight: 600, mb: 0.5 }}>
                    {m.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block' }}>
                    {m.sub}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Right: stacked photos + inline quote */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Photos row */}
              <Box sx={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2,
                flex: 1,
              }}>
                <Box sx={{
                  borderRadius: `${br * 2}px`, overflow: 'hidden',
                  height: { xs: 180, md: 220 },
                  '&:hover img': { transform: 'scale(1.05)' },
                }}>
                  <Box component="img"
                    src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&q=80"
                    alt="Member"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                </Box>
                <Box sx={{
                  borderRadius: `${br * 2}px`, overflow: 'hidden',
                  height: { xs: 180, md: 220 },
                  '&:hover img': { transform: 'scale(1.05)' },
                }}>
                  <Box component="img"
                    src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&q=80"
                    alt="Community"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                </Box>
              </Box>

              {/* Pull quote card */}
              <Box sx={{
                p: 3.5,
                background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
                borderRadius: `${br * 2}px`,
                position: 'relative', overflow: 'hidden',
              }}>
                <Box sx={{
                  position: 'absolute', top: -20, right: -20, width: 120, height: 120,
                  borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: '4rem', lineHeight: 0.6,
                  color: 'rgba(255,255,255,0.15)',
                  fontWeight: 700, mb: 1.5, display: 'block',
                }}>
                  "
                </Typography>
                <Typography variant="body2" sx={{
                  color: 'rgba(255,255,255,0.88)', lineHeight: 1.85,
                  fontStyle: 'italic', mb: 2.5, fontSize: '0.95rem',
                }}>
                  Eight years ago we started with 42 members and a shared belief.
                  Today, over 1,200 families are building better futures together.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: '50%', overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0,
                  }}>
                    <Box component="img"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80"
                      alt="Chairman"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#fff', fontWeight: 600, display: 'block' }}>Adebayo Okafor</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>Chairman, CodeBridge</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Bottom CTA row */}
          <Box sx={{
            mt: 6, pt: 5,
            borderTop: `1px solid ${palette.background.default}`,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}>
            <Box>
              <Typography variant="h5" sx={{ color: palette.text.primary, mb: 0.5 }}>
                Ready to be part of the story?
              </Typography>
              <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 300 }}>
                Join over 1,240 members already building financial freedom.
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button
                component={Link} to="/login" variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  boxShadow: `0 8px 24px ${palette.primary.main}35`,
                  '&:hover': { boxShadow: `0 14px 36px ${palette.primary.main}50` },
                }}
              >
                Join Today
              </Button>
              <Button
                component={Link} to="/about" variant="outlined"
                sx={{ borderColor: palette.primary.main, color: palette.primary.main }}
              >
                Our Story
              </Button>
            </Stack>
          </Box>

        </Container>
      </Box>


      {/* ── SERVICES ──────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 9 }}>
            <Box sx={{
              display: 'inline-block', px: 2.5, py: 0.6,
              background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
              borderRadius: '100px', mb: 2.5,
            }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>What We Offer</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              Our Core Services
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, maxWidth: 520, mx: 'auto' }}>
              Comprehensive financial services designed to empower every member and promote sustainable, shared growth.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }, gap: 3 }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{
                position: 'relative', p: 4,
                borderRadius: `${br * 2}px`,
                border: `1px solid ${feature.bg}`,
                background: palette.background.paper,
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                overflow: 'hidden', cursor: 'default',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 30px 70px ${feature.color}18`,
                  borderColor: 'transparent',
                  background: `${feature.bg}88`,
                  '& .svc-icon': { background: `linear-gradient(135deg, ${feature.color}, ${feature.accent})`, color: '#fff', transform: 'scale(1.08)' },
                  '& .svc-arrow': { opacity: 1, transform: 'translateX(0)' },
                },
              }}>
                <Box sx={{
                  position: 'absolute', top: 0, right: 0, width: 90, height: 90,
                  background: `radial-gradient(circle at top right, ${feature.color}10, transparent 70%)`,
                  borderRadius: `0 ${br * 2}px 0 100%`,
                }} />
                <Box className="svc-icon" sx={{
                  width: 54, height: 54, borderRadius: `${br}px`,
                  background: `${feature.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  mb: 3, color: feature.color,
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ color: palette.text.primary, mb: 1.5 }}>{feature.title}</Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary }}>{feature.description}</Typography>
                <Box className="svc-arrow" sx={{
                  mt: 3, display: 'flex', alignItems: 'center', gap: 0.5,
                  color: feature.color, opacity: 0, transform: 'translateX(-8px)',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Learn more</Typography>
                  <ArrowForwardIcon sx={{ fontSize: 14 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 9 }}>
            <Box sx={{
              display: 'inline-block', px: 2.5, py: 0.6,
              background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
              borderRadius: '100px', mb: 2.5,
            }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>The Process</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              How It Works
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }, gap: 4, position: 'relative' }}>
            <Box sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1,
              background: `linear-gradient(90deg, transparent, ${palette.primary.main}30, ${palette.primary.main}50, ${palette.primary.main}30, transparent)`,
            }} />
            {howItWorks.map((step, i) => (
              <Box key={i} sx={{ textAlign: 'center', position: 'relative' }}>
                <Box sx={{
                  width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3,
                  background: i === 0 ? `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})` : palette.background.paper,
                  border: `2px solid ${i === 0 ? 'transparent' : palette.primary.main + '30'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: i === 0 ? `0 12px 36px ${palette.primary.main}35` : '0 4px 20px rgba(0,0,0,0.06)',
                  position: 'relative', zIndex: 1,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                    transform: 'scale(1.08)',
                    boxShadow: `0 16px 40px ${palette.primary.main}40`,
                  },
                  '&:hover .step-num': { color: '#fff !important' },
                }}>
                  <Typography className="step-num" variant="h5" sx={{
                    color: i === 0 ? '#fff' : palette.primary.main,
                    transition: 'color 0.35s',
                  }}>
                    {step.step}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, mb: 1.5 }}>{step.title}</Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary }}>{step.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── VALUES ────────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 8, md: 12 },
            alignItems: 'center',
          }}>
            <Box>
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Our Values</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, lineHeight: 1.15, mb: 2.5 }}>
                Built on Principles<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>
                  That Last
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, mb: 4 }}>
                Our cooperative is grounded in the ICA cooperative principles — voluntary membership,
                democratic governance, economic participation, and concern for community.
              </Typography>
              <Button
                component={Link} to="/about" variant="outlined"
                endIcon={<ArrowForwardIcon />}
                sx={{ borderColor: palette.primary.main, color: palette.primary.main, '&:hover': { background: `${palette.primary.main}08` } }}
              >
                Learn Our Story
              </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              {values.map((v, i) => (
                <Box key={i} sx={{
                  p: 3, borderRadius: `${br * 1.5}px`,
                  border: `1px solid ${palette.background.default}`,
                  background: palette.background.paper,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 20px 50px ${palette.primary.main}14`,
                    borderColor: `${palette.primary.main}20`,
                    background: palette.background.default,
                  },
                }}>
                  <Box sx={{
                    width: 46, height: 46, borderRadius: `${br}px`, mb: 2,
                    background: `linear-gradient(135deg, ${palette.primary.main}18, ${palette.primary.dark}10)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: palette.primary.main,
                  }}>
                    {v.icon}
                  </Box>
                  <Typography variant="h6" sx={{ color: palette.text.primary, mb: 1 }}>{v.title}</Typography>
                  <Typography variant="body2" sx={{ color: palette.text.secondary }}>{v.desc}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── GALLERY ───────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Typography variant="h2" sx={{ color: palette.text.primary, mb: 1.5, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              Life at CodeBridge
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary }}>
              Moments of community, growth, and shared success
            </Typography>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3,1fr)' },
            gridTemplateRows: { md: '240px 240px' },
            gap: 2.5,
          }}>
            {gallery.map((img, i) => (
              <Box key={i} sx={{
                borderRadius: `${br * 1.5}px`, overflow: 'hidden',
                gridColumn: i === 0 ? { md: '1 / 2' } : undefined,
                gridRow: i === 0 ? { md: '1 / 3' } : undefined,
                height: { xs: 180, md: 'auto' },
                position: 'relative',
                '&::after': {
                  content: '""', position: 'absolute', inset: 0,
                  background: `linear-gradient(to bottom, transparent 50%, ${palette.primary.dark}60)`,
                  opacity: 0, transition: 'opacity 0.4s',
                },
                '&:hover::after': { opacity: 1 },
                '&:hover img': { transform: 'scale(1.06)' },
              }}>
                <Box component="img" src={img} alt={`Community ${i + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Box sx={{
              display: 'inline-block', px: 2.5, py: 0.6,
              background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
              borderRadius: '100px', mb: 2.5,
            }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Member Stories</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              What Our Members Say
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary }}>
              Real experiences from our growing community across Nigeria
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 3 }}>
            {testimonials.map((t, i) => (
              <Box key={i} sx={{
                background: i === 1 ? `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})` : palette.background.default,
                borderRadius: `${br * 2}px`, p: 4,
                border: i === 1 ? 'none' : `1px solid ${palette.background.default}`,
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: i === 1 ? `0 32px 80px ${palette.primary.dark}55` : `0 24px 60px ${t.color}15`,
                },
              }}>
                <Typography sx={{
                  fontFamily: typography.fontFamily, fontSize: '6rem', lineHeight: 0.5,
                  color: i === 1 ? 'rgba(255,255,255,0.12)' : `${t.color}14`,
                  fontWeight: 700, mb: 2.5, display: 'block',
                }}>
                  "
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.3, mb: 2.5 }}>
                  {[...Array(t.stars)].map((_, si) => (
                    <StarIcon key={si} sx={{ fontSize: 14, color: i === 1 ? palette.warning.light : gold }} />
                  ))}
                </Box>
                <Typography variant="body2" sx={{
                  color: i === 1 ? 'rgba(255,255,255,0.85)' : palette.text.secondary,
                  lineHeight: 1.85, mb: 3.5, fontSize: '0.95rem',
                }}>
                  {t.quote}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{
                    width: 48, height: 48, borderRadius: '50%', overflow: 'hidden',
                    border: `2px solid ${i === 1 ? 'rgba(255,255,255,0.3)' : t.color + '30'}`,
                    flexShrink: 0,
                  }}>
                    <Box component="img" src={t.img} alt={t.name}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: i === 1 ? '#fff' : palette.text.primary }}>{t.name}</Typography>
                    <Typography variant="caption" sx={{ color: i === 1 ? 'rgba(255,255,255,0.55)' : '#94a3b8' }}>{t.role}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── CTA ───────────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: heroGradient,
        py: { xs: 10, md: 16 }, overflow: 'hidden',
      }}>
        {[{ size: 500, top: -100, right: -100 }, { size: 400, bottom: -100, left: -100 }, { size: 200, top: '20%', right: '15%' }].map((b, i) => (
          <Box key={i} sx={{
            position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)',
            top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none',
          }} />
        ))}
        <Box sx={{
          position: 'absolute', right: { md: 60 }, top: '50%', transform: 'translateY(-50%)',
          width: 280, height: 280, borderRadius: '50%', overflow: 'hidden',
          opacity: 0.1, display: { xs: 'none', md: 'block' }, pointerEvents: 'none',
        }}>
          <Box component="img" src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=560&q=80"
            alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{ color: '#fff', mb: 2, fontSize: { xs: '2.6rem', md: '3.8rem' } }}>
              Ready to Join Our<br />
              <Box component="span" sx={{
                fontStyle: 'italic', fontWeight: 300,
                background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Community?
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 520, mx: 'auto', fontWeight: 300 }}>
              Become part of a financially empowered community where members support
              one another to achieve common economic goals — together.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mb: 6 }}>
              <Button
                component={Link} to="/login" variant="contained" size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: '#fff', color: palette.primary.dark,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.22)',
                  '&:hover': { background: palette.background.default, boxShadow: '0 18px 56px rgba(0,0,0,0.28)' },
                }}
              >
                Login Now
              </Button>
              <Button
                component={Link} to="/loans" variant="outlined" size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)', color: '#fff',
                  backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.07)',
                  '&:hover': { borderColor: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.14)' },
                }}
              >
                Apply for a Loan
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
                  <Box key={i} sx={{
                    width: 36, height: 36, borderRadius: '50%', overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.4)',
                    ml: i > 0 ? -1.5 : 0, position: 'relative', zIndex: 4 - i,
                  }}>
                    <Box component="img" src={img} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                ))}
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)' }}>
                Join{' '}
                <Box component="span" sx={{ color: '#fff', fontWeight: 600 }}>1,240+</Box>
                {' '}members already growing with us
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default Home;