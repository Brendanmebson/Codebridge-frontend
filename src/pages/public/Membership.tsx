import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, useTheme, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BadgeIcon from '@mui/icons-material/Badge';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CelebrationIcon from '@mui/icons-material/Celebration';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SchoolIcon from '@mui/icons-material/School';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';

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

const Membership: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`;

  const benefits = [
    { icon: <AccountBalanceIcon sx={{ fontSize: 22 }} />, text: 'Access to low-interest loans', sub: 'From 8% p.a. — among the lowest available', color: palette.primary.dark, accent: palette.primary.main },
    { icon: <SavingsIcon sx={{ fontSize: 22 }} />, text: 'Structured savings with dividends', sub: 'Competitive returns credited annually', color: palette.info.dark, accent: palette.info.main },
    { icon: <CelebrationIcon sx={{ fontSize: 22 }} />, text: 'Welfare support in times of need', sub: 'Bereavement, medical, and celebration grants', color: palette.secondary.dark, accent: palette.secondary.main },
    { icon: <HowToVoteIcon sx={{ fontSize: 22 }} />, text: 'Democratic governance rights', sub: 'Vote and be voted for at AGMs', color: palette.primary.dark, accent: palette.primary.light },
    { icon: <SchoolIcon sx={{ fontSize: 22 }} />, text: 'Financial literacy programs', sub: 'Workshops, webinars, and monthly newsletters', color: palette.info.dark, accent: palette.info.light },
    { icon: <LockOutlinedIcon sx={{ fontSize: 22 }} />, text: 'Secure account management', sub: 'Real-time dashboard with full transparency', color: palette.secondary.dark, accent: palette.secondary.main },
  ];

  const requirements = [
    { icon: <BadgeIcon sx={{ fontSize: 24 }} />, label: 'Valid ID', text: 'Government-issued identification (NIN, passport, or driver\'s licence)', color: palette.primary.dark, accent: palette.primary.main },
    { icon: <PhotoCameraIcon sx={{ fontSize: 24 }} />, label: 'Photograph', text: 'Recent passport photograph — clear, plain background', color: palette.info.dark, accent: palette.info.main },
    { icon: <AccountBalanceWalletIcon sx={{ fontSize: 24 }} />, label: 'Initial Deposit', text: 'Minimum ₦5,000 initial savings contribution to activate account', color: palette.secondary.dark, accent: palette.secondary.main },
    { icon: <HomeIcon sx={{ fontSize: 24 }} />, label: 'Address Proof', text: 'Utility bill or bank statement confirming residential address', color: palette.info.dark, accent: '#00897B' },
  ];

  const steps = [
    {
      num: '01', title: 'Gather Documents',
      desc: 'Prepare your valid ID, a passport photograph, and proof of address before starting.',
      color: palette.primary.dark, accent: palette.primary.main,
      img: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=400&q=80',
    },
    {
      num: '02', title: 'Complete Registration',
      desc: 'Fill out and submit the membership registration form — takes less than 10 minutes.',
      color: palette.info.dark, accent: palette.info.main,
      img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80',
    },
    {
      num: '03', title: 'Make Initial Deposit',
      desc: 'Pay the minimum ₦5,000 savings contribution to activate your member account.',
      color: palette.secondary.dark, accent: palette.secondary.main,
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    },
    {
      num: '04', title: 'Login & Start Saving',
      desc: 'Access your personal dashboard, set your savings goals, and begin your journey.',
      color: palette.info.dark, accent: '#00897B',
      img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&q=80',
    },
  ];

  const testimonials = [
    {
      quote: "Joining CodeBridge was the best financial decision I've made. Within six months I had my first loan approved and doubled my business capacity.",
      name: "Adaeze Nwosu", role: "Trader, Enugu",
      img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80',
      color: palette.primary.dark,
    },
    {
      quote: "The welfare support when my mother passed was extraordinary. No paperwork stress — just genuine human care from people who know you.",
      name: "Kelechi Eze", role: "Civil Servant, Abuja",
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      color: palette.info.dark,
    },
    {
      quote: "I love that I can vote at AGMs and my voice actually matters. This is what a real cooperative feels like.",
      name: "Bimpe Adeleke", role: "Nurse, Lagos",
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      color: palette.secondary.dark,
    },
  ];

  const { ref: benefitsRef, visible: benefitsVisible } = useFadeIn();
  const { ref: reqRef, visible: reqVisible } = useFadeIn();
  const { ref: stepsRef, visible: stepsVisible } = useFadeIn();
  const { ref: testiRef, visible: testiVisible } = useFadeIn();

  return (
    <Box sx={{ fontFamily: typography.fontFamily, overflowX: 'hidden', background: palette.background.paper }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: heroGradient,
       pt: { xs: 8, md: 8 },
        pb: { xs: 14, md: 22 },
        overflow: 'hidden',
      }}>
        {[
          { size: 620, top: -190, right: -190 },
          { size: 420, bottom: -130, left: -130 },
          { size: 260, top: '30%', left: '46%' },
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
          {/* Badge */}
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
                Join a Financially Empowered Community
              </Typography>
            </Box>
          </Box>

          {/* Split layout — headline left, cards right */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '55fr 45fr' },
            gap: { xs: 6, md: 10 },
            alignItems: 'center',
          }}>
            {/* Left */}
            <Box sx={{
              animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) forwards',
              '@keyframes heroUp': {
                from: { opacity: 0, transform: 'translateY(36px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}>
              <Typography variant="h1" sx={{
                color: '#fff',
                fontSize: { xs: '3rem', sm: '3.8rem', md: '4.8rem' },
                lineHeight: 1.1, mb: 3,
              }}>
                Membership<br />
                <Box component="span" sx={{
                  fontStyle: 'italic', fontWeight: 300,
                  background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Has Its Privileges
                </Box>
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.68)', mb: 5, maxWidth: 480, fontWeight: 300 }}>
                By joining CodeBridge, you become part of a community where members support one another
                to achieve economic goals through collective savings, affordable credit, and mutual welfare.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link} to="/login" variant="contained" size="large"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    background: '#fff', color: palette.primary.dark,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
                    '&:hover': { background: palette.background.default, boxShadow: '0 20px 50px rgba(0,0,0,0.28)' },
                  }}
                >
                  Join Today
                </Button>
                <Button
                  component={Link} to="/services" variant="outlined" size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.35)', color: '#fff',
                    backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.06)',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.12)' },
                  }}
                >
                  View Services
                </Button>
              </Stack>
            </Box>

            {/* Right: 2x2 stat cards */}
            <Box sx={{
              display: { xs: 'none', md: 'grid' }, gridTemplateColumns: '1fr 1fr', gap: 2,
              animation: 'heroRight 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s forwards',
              opacity: 0,
              '@keyframes heroRight': {
                from: { opacity: 0, transform: 'translateX(24px)' },
                to: { opacity: 1, transform: 'translateX(0)' },
              },
            }}>
              {[
                { val: '₦5K', label: 'Min. Deposit', sub: 'To get started' },
                { val: '1,240+', label: 'Members', sub: 'And growing' },
                { val: '48h', label: 'Loan Approval', sub: 'After eligibility' },
                { val: '8+', label: 'Years Active', sub: 'Est. 2016' },
              ].map((s, i) => (
                <Box key={i} sx={{
                  background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: `${br * 2}px`, p: 2.5,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': { background: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' },
                }}>
                  <Typography variant="h3" sx={{ color: '#fff', fontSize: '2rem', lineHeight: 1, mb: 0.5 }}>
                    {s.val}
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.secondary.light, fontWeight: 600, display: 'block', mb: 0.25 }}>
                    {s.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>{s.sub}</Typography>
                </Box>
              ))}
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


      {/* ── BENEFITS ──────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          {/* Header with photo */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 10 },
            alignItems: 'center',
            mb: { xs: 7, md: 10 },
          }}>
            <Box
              ref={benefitsRef}
              sx={{
                opacity: benefitsVisible ? 1 : 0,
                transform: benefitsVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Why Join Us</Typography>
              </Box>
              <Typography variant="h2" sx={{
                color: palette.text.primary,
                fontSize: { xs: '2.2rem', md: '3rem' },
                lineHeight: 1.15, mb: 2,
              }}>
                Benefits of<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>
                  Membership
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 420, mb: 3 }}>
                Everything you unlock when you become a CodeBridge member — from financial tools to
                a community that genuinely has your back.
              </Typography>
              {/* Quick trust row */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                {[
                  { val: '6', label: 'Core Benefits' },
                  { val: 'Free', label: 'To Register' },
                  { val: 'AGM', label: 'Voting Rights' },
                ].map((t, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {i > 0 && <Box sx={{ height: 24, background: `${palette.primary.main}20` }} />}
                    <Box>
                      <Typography variant="h5" sx={{ color: palette.primary.main, lineHeight: 1 }}>{t.val}</Typography>
                      <Typography variant="caption" sx={{ color: palette.text.secondary }}>{t.label}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Photo */}
            <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
              <Box sx={{
                borderRadius: `${br * 2}px`, overflow: 'hidden', height: 340,
                '&:hover img': { transform: 'scale(1.04)' },
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=700&q=80"
                  alt="Members"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
                {/* Overlay tint */}
                <Box sx={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${palette.primary.dark}22, transparent 60%)`,
                }} />
              </Box>
              {/* Floating badge */}
              <Box sx={{
                position: 'absolute', bottom: -18, left: -18,
                background: palette.background.paper,
                borderRadius: `${br * 1.5}px`, px: 2.5, py: 2,
                boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', gap: 1.5,
              }}>
                <Box sx={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <GroupsIcon sx={{ fontSize: 18, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, lineHeight: 1 }}>1,240+ Members</Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>and growing every month</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Benefits grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
            gap: 3,
          }}>
            {benefits.map((b, i) => (
              <Box key={i} sx={{
                display: 'flex', flexDirection: 'column', gap: 1.5,
                p: 3.5,
                background: palette.background.paper,
                borderRadius: `${br * 2}px`,
                border: `1px solid ${palette.background.default}`,
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 20px 50px ${b.color}14`,
                  borderColor: 'transparent',
                  '& .ben-icon': {
                    background: `linear-gradient(135deg, ${b.color}, ${b.accent})`,
                    color: '#fff',
                  },
                },
              }}>
                <Box className="ben-icon" sx={{
                  width: 48, height: 48, borderRadius: `${br}px`,
                  background: `${b.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: b.color,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  {b.icon}
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, fontSize: '0.97rem', fontWeight: 600 }}>
                  {b.text}
                </Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block', fontSize: '0.82rem' }}>
                  {b.sub}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── REQUIREMENTS ──────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            ref={reqRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 8, md: 12 },
              alignItems: 'center',
              opacity: reqVisible ? 1 : 0,
              transform: reqVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Image collage */}
            <Box sx={{ position: 'relative', height: 460, display: { xs: 'none', md: 'block' } }}>
              <Box sx={{
                position: 'absolute', top: 0, left: 0, width: '62%', height: '66%',
                borderRadius: `${br * 2}px`, overflow: 'hidden',
                boxShadow: '0 24px 72px rgba(0,0,0,0.1)',
                '&:hover img': { transform: 'scale(1.05)' },
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=500&q=80"
                  alt="Documents"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
              </Box>
              <Box sx={{
                position: 'absolute', bottom: 0, right: 0, width: '50%', height: '52%',
                borderRadius: `${br * 2}px`, overflow: 'hidden',
                boxShadow: '0 24px 72px rgba(0,0,0,0.12)',
                border: `5px solid ${palette.background.paper}`,
                '&:hover img': { transform: 'scale(1.05)' },
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&q=80"
                  alt="Registration"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
              </Box>
              {/* Decorative ring */}
              <Box sx={{
                position: 'absolute', top: '60%', left: '55%',
                width: 80, height: 80, borderRadius: '50%',
                background: `${palette.primary.light}15`,
                border: `2px solid ${palette.primary.light}25`,
              }} />
              {/* Floating badge */}
              <Box sx={{
                position: 'absolute', top: '64%', left: '2%',
                background: palette.background.paper,
                borderRadius: `${br * 1.5}px`, px: 2.5, py: 2,
                boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', gap: 1.5,
              }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: `${br - 2}px`,
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <TrendingUpIcon sx={{ fontSize: 18, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, lineHeight: 1 }}>₦5,000</Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>to get started</Typography>
                </Box>
              </Box>
            </Box>

            {/* Text */}
            <Box>
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>What You Need</Typography>
              </Box>
              <Typography variant="h2" sx={{
                color: palette.text.primary,
                fontSize: { xs: '2.2rem', md: '3rem' },
                lineHeight: 1.15, mb: 2,
              }}>
                Membership<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>
                  Requirements
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4 }}>
                Prospective members must complete a registration form and submit the following. The process takes under 30 minutes.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {requirements.map((req, i) => (
                  <Box key={i} sx={{
                    display: 'flex', gap: 2.5,
                    p: 2.5, borderRadius: `${br * 1.5}px`,
                    border: `1px solid ${palette.background.default}`,
                    background: palette.background.default,
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    '&:hover': {
                      transform: 'translateX(6px)',
                      borderColor: `${req.color}20`,
                      background: palette.background.paper,
                      boxShadow: `0 8px 28px ${req.color}0e`,
                      '& .req-icon': {
                        background: `linear-gradient(135deg, ${req.color}, ${req.accent})`,
                        color: '#fff',
                      },
                    },
                  }}>
                    <Box className="req-icon" sx={{
                      width: 44, height: 44, borderRadius: `${br}px`, flexShrink: 0,
                      background: `${req.color}10`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: req.color,
                      transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    }}>
                      {req.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: req.color, mb: 0.35, fontSize: '0.8rem', letterSpacing: '0.04em' }}>
                        {req.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: palette.text.primary, lineHeight: 1.6 }}>
                        {req.text}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── HOW TO JOIN ───────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            ref={stepsRef}
            sx={{
              opacity: stepsVisible ? 1 : 0,
              transform: stepsVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 9 }}>
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>The Process</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
                How to Join
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 460, mx: 'auto' }}>
                Four simple steps — from gathering your documents to accessing your personal dashboard.
              </Typography>
            </Box>

            {/* Steps — alternating layout */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {steps.map((step, i) => (
                <Box key={i} sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: i % 2 === 0 ? '1fr 320px' : '320px 1fr' },
                  gap: 3,
                  borderRadius: `${br * 2}px`,
                  overflow: 'hidden',
                  background: palette.background.paper,
                  border: `1px solid ${palette.background.default}`,
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 24px 60px ${step.color}12`,
                    borderColor: 'transparent',
                    '& .step-img': { transform: 'scale(1.05)' },
                  },
                }}>
                  {/* Content */}
                  <Box sx={{
                    p: { xs: 3.5, md: 5 },
                    order: { xs: 2, md: i % 2 === 0 ? 1 : 2 },
                    position: 'relative', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  }}>
                    {/* Top bar */}
                    <Box sx={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                      background: `linear-gradient(90deg, ${step.color}, ${step.accent})`,
                    }} />
                    {/* Ghost number */}
                    <Typography sx={{
                      position: 'absolute', top: 10, right: 20,
                      fontFamily: typography.fontFamily,
                      fontSize: '5.5rem', fontWeight: 700, lineHeight: 1,
                      color: `${step.color}08`, userSelect: 'none', pointerEvents: 'none',
                    }}>
                      {step.num}
                    </Typography>

                    <Box sx={{
                      display: 'inline-flex', px: 2, py: 0.5, mb: 2.5,
                      background: `${step.color}0e`, border: `1px solid ${step.color}18`,
                      borderRadius: '100px', width: 'fit-content',
                    }}>
                      <Typography variant="overline" sx={{ color: step.color, fontSize: '0.7rem' }}>
                        Step {step.num}
                      </Typography>
                    </Box>

                    <Typography variant="h4" sx={{ color: palette.text.primary, mb: 1.5 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.8 }}>
                      {step.desc}
                    </Typography>
                  </Box>

                  {/* Image */}
                  <Box sx={{
                    order: { xs: 1, md: i % 2 === 0 ? 2 : 1 },
                    minHeight: { xs: 180, md: 'auto' },
                    overflow: 'hidden', position: 'relative',
                  }}>
                    <Box className="step-img" component="img"
                      src={step.img} alt={step.title}
                      sx={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                      }}
                    />
                    <Box sx={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(135deg, ${step.color}25, transparent 60%)`,
                    }} />
                  </Box>
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
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Member Voices</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
                From Our Members
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 460, mx: 'auto' }}>
                Real stories from people whose lives changed when they joined CodeBridge.
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 3 }}>
              {testimonials.map((t, i) => (
                <Box key={i} sx={{
                  p: 4, borderRadius: `${br * 2}px`,
                  background: i === 1
                    ? `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`
                    : palette.background.default,
                  border: i === 1 ? 'none' : `1px solid ${palette.background.default}`,
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  position: 'relative', overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: i === 1 ? `0 32px 80px ${palette.primary.dark}55` : `0 24px 60px ${t.color}12`,
                  },
                }}>
                  {i === 1 && (
                    <Box sx={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
                  )}
                  <Box sx={{ display: 'flex', gap: 0.3, mb: 2.5 }}>
                    {[...Array(5)].map((_, si) => (
                      <StarIcon key={si} sx={{ fontSize: 14, color: i === 1 ? palette.warning.light : palette.warning.dark }} />
                    ))}
                  </Box>
                  <Typography sx={{
                    fontFamily: typography.fontFamily,
                    fontSize: '5rem', lineHeight: 0.5,
                    color: i === 1 ? 'rgba(255,255,255,0.12)' : `${t.color}12`,
                    fontWeight: 700, mb: 2, display: 'block',
                  }}>
                    "
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: i === 1 ? 'rgba(255,255,255,0.88)' : palette.text.secondary,
                    lineHeight: 1.85, mb: 3.5, fontSize: '0.95rem',
                  }}>
                    {t.quote}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{
                      width: 46, height: 46, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                      border: `2px solid ${i === 1 ? 'rgba(255,255,255,0.3)' : t.color + '30'}`,
                    }}>
                      <Box component="img" src={t.img} alt={t.name}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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


      {/* ── FAQ STRIP ─────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 5, alignItems: 'center',
          }}>
            <Box>
              <Typography variant="h3" sx={{ color: palette.text.primary, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                Common Questions
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300 }}>
                Quick answers before you join.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { q: 'Is my money safe?', a: 'Yes. All funds are held in regulated accounts, managed transparently with annual independent audits.' },
                { q: 'Can I withdraw my savings anytime?', a: 'After 12 months of active membership, withdrawals are permitted subject to cooperative policy.' },
                { q: 'How soon can I apply for a loan?', a: 'Members become eligible after 3 months of consistent savings contributions.' },
                { q: 'Is there a membership fee?', a: 'There is no registration fee. Only the minimum ₦5,000 initial savings deposit is required.' },
              ].map((faq, i) => (
                <Box key={i} sx={{
                  p: 3, borderRadius: `${br * 1.5}px`,
                  background: palette.background.paper,
                  border: `1px solid ${palette.background.default}`,
                  transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    borderColor: `${palette.primary.main}20`,
                    boxShadow: `0 8px 28px ${palette.primary.main}0a`,
                    transform: 'translateX(4px)',
                  },
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0, mt: 0.2,
                      background: `${palette.primary.main}12`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <CheckIcon sx={{ fontSize: 12, color: palette.primary.main }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.5 }}>{faq.q}</Typography>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block' }}>{faq.a}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
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
          width: 260, height: 260, borderRadius: '50%', overflow: 'hidden',
          opacity: 0.1, display: { xs: 'none', md: 'block' }, pointerEvents: 'none',
        }}>
          <Box component="img"
            src="https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=520&q=80"
            alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{
              color: '#fff', mb: 2,
              fontSize: { xs: '2.6rem', md: '3.8rem' },
            }}>
              Ready to Get<br />
              <Box component="span" sx={{
                fontStyle: 'italic', fontWeight: 300,
                background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Started?
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 520, mx: 'auto', fontWeight: 300,
            }}>
              Join thousands of members building financial security together.
              Your journey to financial empowerment starts with a single step.
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
                component={Link} to="/services" variant="outlined" size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)', color: '#fff',
                  backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.07)',
                  '&:hover': { borderColor: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.14)' },
                }}
              >
                View Services
              </Button>
            </Stack>

            {/* Social proof */}
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

export default Membership;