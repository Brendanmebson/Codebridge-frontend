import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, useTheme, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpeedIcon from '@mui/icons-material/Speed';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import StarIcon from '@mui/icons-material/Star';

function useFadeIn(threshold = 0.15) {
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

const Services: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`;

  const savingsProducts = [
    {
      name: 'Regular Monthly Savings',
      description: 'Build consistent savings habits with monthly contributions that compound and grow steadily over time. The backbone of every member\'s financial journey.',
      features: ['Flexible contribution amounts', 'Annual dividend eligibility', 'Loan access qualification', 'No withdrawal penalties after 12 months'],
      color: palette.primary.dark,
      accent: palette.primary.main,
      bg: '#E8F5E9',
      img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80',
      stat: { val: '₦842K', label: 'Avg. member balance' },
    },
    {
      name: 'Target / Special Purpose Savings',
      description: 'Save towards specific goals — a home, school fees, or a business — with dedicated accounts, defined timelines, and higher returns.',
      features: ['Set personal savings targets', 'Timeline-based goal tracking', 'Higher interest rates than regular', 'Automated contribution reminders'],
      color: palette.info.dark,
      accent: palette.info.main,
      bg: '#E0F2F1',
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
      stat: { val: '3.2x', label: 'Faster goal achievement' },
    },
  ];

  const loanProducts = [
    {
      icon: <PersonIcon sx={{ fontSize: 22 }} />,
      name: 'Personal Loans',
      description: 'Meet personal financial needs quickly — from rent to medical bills.',
      rate: '12%',
      period: 'p.a.',
      maxAmount: '₦500K',
      tenure: 'Up to 24 months',
      color: palette.primary.dark,
      accent: palette.primary.main,
      bg: '#E8F5E9',
      img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80',
    },
    {
      icon: <BusinessCenterIcon sx={{ fontSize: 22 }} />,
      name: 'Business Loans',
      description: 'Grow your business with affordable capital and flexible repayment terms.',
      rate: '10%',
      period: 'p.a.',
      maxAmount: '₦2M',
      tenure: 'Up to 36 months',
      color: palette.info.dark,
      accent: palette.info.main,
      bg: '#E0F2F1',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 22 }} />,
      name: 'Emergency Loans',
      description: 'Rapid access to funds within 48 hours — no collateral required.',
      rate: '15%',
      period: 'p.a.',
      maxAmount: '₦200K',
      tenure: 'Up to 12 months',
      color: palette.secondary.dark,
      accent: palette.secondary.main,
      bg: '#F1F8E9',
      img: 'https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=400&q=80',
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 22 }} />,
      name: 'Educational Loans',
      description: 'School fees, certifications, and professional training made accessible.',
      rate: '8%',
      period: 'p.a.',
      maxAmount: '₦1M',
      tenure: 'Up to 30 months',
      color: palette.info.dark,
      accent: '#00897B',
      bg: '#E0F7FA',
      img: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=400&q=80',
    },
  ];

  const whyUs = [
    { icon: <ShieldOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Fully Regulated', desc: 'Registered under Nigerian cooperative law with annual independent audits.' },
    { icon: <AccessTimeIcon sx={{ fontSize: 22 }} />, title: '48-Hour Turnaround', desc: 'Most loan applications are assessed and approved within two business days.' },
    { icon: <VerifiedOutlinedIcon sx={{ fontSize: 22 }} />, title: 'No Hidden Charges', desc: 'Rates and fees are disclosed upfront. No surprises at disbursement.' },
    { icon: <HandshakeOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Member-Owned', desc: 'Every member is a co-owner. Your interests and ours are identical.' },
  ];

  const testimonials = [
    {
      quote: "The business loan transformed my tailoring shop. The rate was fair and the approval process was human, not bureaucratic.",
      name: "Amara Okonkwo",
      role: "Business Owner, Lagos",
      img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80',
      color: palette.primary.dark,
      loan: 'Business Loan · ₦800K',
    },
    {
      quote: "Target savings helped me buy my first car in 18 months. Having a dedicated account with a goal made all the difference.",
      name: "Emeka Adeyemi",
      role: "Software Engineer, Abuja",
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      color: palette.info.dark,
      loan: 'Target Savings · 18 months',
    },
    {
      quote: "Emergency loan saved us when my father was hospitalised. Funds were in my account the next morning.",
      name: "Funke Balogun",
      role: "Teacher, Ibadan",
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      color: palette.secondary.dark,
      loan: 'Emergency Loan · ₦150K',
    },
  ];

  const { ref: savingsRef, visible: savingsVisible } = useFadeIn();
  const { ref: loansRef, visible: loansVisible } = useFadeIn();
  const { ref: whyRef, visible: whyVisible } = useFadeIn();

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
          { size: 600, top: -180, right: -180 },
          { size: 400, bottom: -120, left: -120 },
          { size: 240, top: '35%', left: '48%' },
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
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '100px',
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
                Financial Solutions for Every Member
              </Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 8 }}>
            <Typography variant="h1" sx={{
              color: '#fff',
              fontSize: { xs: '3rem', sm: '3.8rem', md: '5rem' },
              lineHeight: 1.1, mb: 3,
              animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) forwards',
              '@keyframes heroUp': {
                from: { opacity: 0, transform: 'translateY(36px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}>
              Services Built<br />
              <Box component="span" sx={{
                fontStyle: 'italic', fontWeight: 300,
                background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Around You
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'rgba(255,255,255,0.68)', maxWidth: 560, mx: 'auto', fontWeight: 300,
              animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards', opacity: 0,
            }}>
              Comprehensive financial solutions — from disciplined savings schemes to affordable loan
              facilities — all designed to empower every member of our cooperative.
            </Typography>
          </Box>

          {/* Quick stats */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: { xs: 2, md: 3 },
            animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) 0.3s forwards', opacity: 0,
          }}>
            {[
              { val: '₦1.2B+', label: 'Total Disbursed', sub: 'Since 2016' },
              { val: '8%–15%', label: 'Loan Rates', sub: 'Competitive & fair' },
              { val: '48h', label: 'Approval Time', sub: 'Most loan types' },
              { val: '98%', label: 'Approval Rate', sub: 'Member success' },
            ].map((s, i) => (
              <Box key={i} sx={{
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: `${br * 2}px`, p: { xs: 2.5, md: 3 },
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': { background: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' },
              }}>
                <Typography variant="h3" sx={{ color: '#fff', fontSize: { xs: '1.8rem', md: '2.2rem' }, lineHeight: 1, mb: 0.75 }}>
                  {s.val}
                </Typography>
                <Typography variant="body2" sx={{ color: palette.secondary.light, fontWeight: 600, display: 'block', mb: 0.25 }}>
                  {s.label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>{s.sub}</Typography>
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


      {/* ── WHY US STRIP ──────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box
            ref={whyRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' },
              gap: 3,
              opacity: whyVisible ? 1 : 0,
              transform: whyVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {whyUs.map((w, i) => (
              <Box key={i} sx={{
                p: 3, borderRadius: `${br * 2}px`,
                background: palette.background.paper,
                border: `1px solid ${palette.background.default}`,
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 16px 40px ${palette.primary.main}10`,
                  borderColor: `${palette.primary.main}18`,
                },
              }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: `${br}px`, mb: 2,
                  background: `linear-gradient(135deg, ${palette.primary.main}14, ${palette.primary.dark}0a)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: palette.primary.main,
                }}>
                  {w.icon}
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, mb: 0.75, fontSize: '0.95rem' }}>
                  {w.title}
                </Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block', fontSize: '0.82rem' }}>
                  {w.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── SAVINGS ───────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            ref={savingsRef}
            sx={{
              mb: { xs: 7, md: 9 },
              opacity: savingsVisible ? 1 : 0,
              transform: savingsVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 5, alignItems: 'flex-end',
            }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                  <Box sx={{
                    width: 54, height: 54, borderRadius: `${br * 1.5}px`,
                    background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 10px 28px ${palette.primary.main}40`,
                  }}>
                    <SavingsIcon sx={{ fontSize: 26, color: '#fff' }} />
                  </Box>
                  <Box sx={{
                    display: 'inline-block', px: 2.5, py: 0.6,
                    background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                    borderRadius: '100px',
                  }}>
                    <Typography variant="overline" sx={{ color: palette.primary.main }}>Savings</Typography>
                  </Box>
                </Box>
                <Typography variant="h2" sx={{
                  color: palette.text.primary,
                  fontSize: { xs: '2.2rem', md: '3rem' },
                  lineHeight: 1.15, mb: 2,
                }}>
                  Savings Products
                </Typography>
                <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 420 }}>
                  Cultivate a disciplined savings culture while building real financial security. Every scheme provides dividend eligibility, loan qualification, and long-term growth.
                </Typography>
              </Box>

              <Box sx={{
                display: { xs: 'none', md: 'block' },
                borderRadius: `${br * 2}px`, overflow: 'hidden',
                height: 180,
                '&:hover img': { transform: 'scale(1.04)' },
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=700&q=80"
                  alt="Savings"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {savingsProducts.map((product, i) => (
              <Box key={i} sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: i % 2 === 0 ? '1fr 380px' : '380px 1fr' },
                borderRadius: `${br * 2}px`,
                overflow: 'hidden',
                border: `1px solid ${product.bg}`,
                background: palette.background.paper,
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  boxShadow: `0 28px 70px ${product.color}14`,
                  transform: 'translateY(-6px)',
                  borderColor: 'transparent',
                },
              }}>
                <Box sx={{
                  p: { xs: 3.5, md: 5 },
                  order: { xs: 2, md: i % 2 === 0 ? 1 : 2 },
                  position: 'relative', overflow: 'hidden',
                }}>
                  <Box sx={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                    background: `linear-gradient(90deg, ${product.color}, ${product.accent})`,
                  }} />
                  <Box sx={{
                    position: 'absolute', top: 0, right: 0, width: 130, height: 130,
                    background: `radial-gradient(circle at top right, ${product.color}08, transparent 70%)`,
                    borderRadius: `0 ${br * 2}px 0 100%`,
                  }} />

                  <Box sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 1,
                    px: 2, py: 0.75, mb: 3,
                    background: `${product.color}0e`,
                    border: `1px solid ${product.color}20`,
                    borderRadius: '100px',
                  }}>
                    <TrendingUpIcon sx={{ fontSize: 14, color: product.accent }} />
                    <Typography variant="caption" sx={{ color: product.color, fontWeight: 600 }}>
                      {product.stat.val} — {product.stat.label}
                    </Typography>
                  </Box>

                  <Typography variant="h4" sx={{ color: palette.text.primary, mb: 1.5 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: palette.text.secondary, lineHeight: 1.8, mb: 3.5, fontWeight: 300 }}>
                    {product.description}
                  </Typography>

                  <Typography variant="overline" sx={{ color: product.color, display: 'block', mb: 1.5 }}>
                    Benefits
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                    {product.features.map((f, fi) => (
                      <Box key={fi} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
                        <Box sx={{
                          width: 20, height: 20, borderRadius: '50%', flexShrink: 0, mt: 0.15,
                          background: `${product.color}12`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <CheckIcon sx={{ fontSize: 12, color: product.color }} />
                        </Box>
                        <Typography variant="caption" sx={{ color: palette.text.primary, lineHeight: 1.6, fontSize: '0.84rem' }}>
                          {f}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box sx={{
                  order: { xs: 1, md: i % 2 === 0 ? 2 : 1 },
                  minHeight: { xs: 200, md: 'auto' },
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <Box component="img"
                    src={product.img}
                    alt={product.name}
                    sx={{
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                  <Box sx={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(135deg, ${product.color}22, transparent 60%)`,
                  }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── LOANS ─────────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            ref={loansRef}
            sx={{
              mb: { xs: 7, md: 9 },
              opacity: loansVisible ? 1 : 0,
              transform: loansVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 5, alignItems: 'flex-end',
            }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                  <Box sx={{
                    width: 54, height: 54, borderRadius: `${br * 1.5}px`,
                    background: `linear-gradient(135deg, ${palette.info.main}, ${palette.info.dark})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 10px 28px ${palette.info.main}40`,
                  }}>
                    <AccountBalanceIcon sx={{ fontSize: 26, color: '#fff' }} />
                  </Box>
                  <Box sx={{
                    display: 'inline-block', px: 2.5, py: 0.6,
                    background: `${palette.info.main}10`, border: `1px solid ${palette.info.main}22`,
                    borderRadius: '100px',
                  }}>
                    <Typography variant="overline" sx={{ color: palette.info.dark }}>Loans</Typography>
                  </Box>
                </Box>
                <Typography variant="h2" sx={{
                  color: palette.text.primary,
                  fontSize: { xs: '2.2rem', md: '3rem' },
                  lineHeight: 1.15, mb: 2,
                }}>
                  Loan Services
                </Typography>
                <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 420 }}>
                  Affordable loan facilities to meet personal, business, and emergency needs. All loans are subject to eligibility and cooperative policies.
                </Typography>
              </Box>

              {/* Eligibility callout */}
              <Box sx={{
                p: 3.5, borderRadius: `${br * 2}px`,
                background: palette.background.paper,
                border: `1px solid ${palette.info.main}18`,
                display: { xs: 'none', md: 'block' },
              }}>
                <Typography variant="overline" sx={{ color: palette.info.main, display: 'block', mb: 1.5 }}>
                  Eligibility Checklist
                </Typography>
                {[
                  'Active member for at least 3 months',
                  'Up-to-date savings contributions',
                  'No outstanding defaulted loan',
                  'Completed member verification',
                ].map((e, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.25 }}>
                    <Box sx={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: `${palette.info.main}14`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <CheckIcon sx={{ fontSize: 12, color: palette.info.main }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: palette.text.secondary, fontSize: '0.85rem' }}>{e}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: 3, mb: 7,
          }}>
            {loanProducts.map((product, i) => (
              <Box key={i} sx={{
                position: 'relative',
                borderRadius: `${br * 2}px`,
                border: `1px solid ${product.bg}`,
                background: palette.background.paper,
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 28px 64px ${product.color}18`,
                  borderColor: 'transparent',
                  '& .lp-img': { transform: 'scale(1.06)' },
                  '& .lp-icon': {
                    background: `linear-gradient(135deg, ${product.color}, ${product.accent})`,
                    color: '#fff',
                  },
                },
              }}>
                <Box sx={{ height: 150, overflow: 'hidden', position: 'relative' }}>
                  <Box className="lp-img" component="img"
                    src={product.img} alt={product.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                  <Box sx={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to bottom, transparent 30%, ${product.color}55)`,
                  }} />
                  {/* Rate badge on image */}
                  <Box sx={{
                    position: 'absolute', bottom: 12, right: 12,
                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                    borderRadius: `${br - 2}px`, px: 1.5, py: 0.75,
                    display: 'flex', alignItems: 'baseline', gap: 0.25,
                  }}>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '1.2rem', fontWeight: 700, color: product.color, lineHeight: 1 }}>
                      {product.rate}
                    </Typography>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.7rem', fontWeight: 600, color: product.color }}>
                      {product.period}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ p: 3 }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${product.color}, ${product.accent})` }} />

                  <Box className="lp-icon" sx={{
                    width: 40, height: 40, borderRadius: `${br - 2}px`,
                    background: `${product.color}10`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: product.color, mb: 1.75,
                    transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  }}>
                    {product.icon}
                  </Box>

                  <Typography variant="h6" sx={{ color: palette.text.primary, mb: 0.75, fontSize: '0.98rem' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.7, mb: 2.5, fontSize: '0.84rem' }}>
                    {product.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Box sx={{
                      flex: 1, p: 1.25, borderRadius: `${br - 2}px`,
                      background: `${product.color}08`,
                      border: `1px solid ${product.color}15`,
                      textAlign: 'center',
                    }}>
                      <Typography variant="caption" sx={{ color: product.color, fontWeight: 700, display: 'block', lineHeight: 1.1 }}>
                        {product.maxAmount}
                      </Typography>
                      <Typography sx={{ fontSize: '0.65rem', color: palette.text.secondary, fontFamily: typography.fontFamily }}>Max amount</Typography>
                    </Box>
                    <Box sx={{
                      flex: 1, p: 1.25, borderRadius: `${br - 2}px`,
                      background: `${product.color}08`,
                      border: `1px solid ${product.color}15`,
                      textAlign: 'center',
                    }}>
                      <Typography variant="caption" sx={{ color: product.color, fontWeight: 700, display: 'block', lineHeight: 1.1 }}>
                        {product.tenure.split(' ').slice(0, 2).join(' ')}
                      </Typography>
                      <Typography sx={{ fontSize: '0.65rem', color: palette.text.secondary, fontFamily: typography.fontFamily }}>Tenure</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Apply CTA row */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            p: { xs: 3.5, md: 4 },
            borderRadius: `${br * 2}px`,
            background: palette.background.paper,
            border: `1px solid ${palette.info.main}15`,
          }}>
            <Box>
              <Typography variant="h5" sx={{ color: palette.text.primary, mb: 0.5 }}>
                Ready to apply for a loan?
              </Typography>
              <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 300 }}>
                Login to your member dashboard and start your application in minutes.
              </Typography>
            </Box>
            <Button
              component={Link} to="/login"
              variant="contained" size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                boxShadow: `0 8px 24px ${palette.primary.main}35`,
                flexShrink: 0,
                '&:hover': { boxShadow: `0 14px 36px ${palette.primary.main}50` },
              }}
            >
              Apply for a Loan
            </Button>
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
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
              Heard From Our Members
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 480, mx: 'auto' }}>
              Real results from real members who used our savings and loan products.
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
                  boxShadow: i === 1
                    ? `0 32px 80px ${palette.primary.dark}55`
                    : `0 24px 60px ${t.color}12`,
                },
              }}>
                {i === 1 && (
                  <Box sx={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
                )}
                <Box sx={{ display: 'flex', gap: 0.3, mb: 2 }}>
                  {[...Array(5)].map((_, si) => (
                    <StarIcon key={si} sx={{ fontSize: 14, color: i === 1 ? palette.warning.light : palette.warning.dark }} />
                  ))}
                </Box>
                <Box sx={{
                  display: 'inline-flex', px: 1.5, py: 0.4, mb: 2,
                  background: i === 1 ? 'rgba(255,255,255,0.15)' : `${t.color}10`,
                  border: `1px solid ${i === 1 ? 'rgba(255,255,255,0.2)' : t.color + '20'}`,
                  borderRadius: '100px',
                }}>
                  <Typography variant="caption" sx={{
                    color: i === 1 ? 'rgba(255,255,255,0.8)' : t.color,
                    fontWeight: 600, fontSize: '0.72rem',
                  }}>
                    {t.loan}
                  </Typography>
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
        </Container>
      </Box>


      {/* ── CTA ───────────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: heroGradient,
        py: { xs: 10, md: 16 }, overflow: 'hidden',
      }}>
        {[{ size: 500, top: -100, right: -100 }, { size: 400, bottom: -100, left: -100 }].map((b, i) => (
          <Box key={i} sx={{
            position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)',
            top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none',
          }} />
        ))}
        <Box sx={{
          position: 'absolute', right: { md: 48 }, top: '50%', transform: 'translateY(-50%)',
          width: 280, height: 280, borderRadius: '50%', overflow: 'hidden',
          opacity: 0.1, display: { xs: 'none', md: 'block' }, pointerEvents: 'none',
        }}>
          <Box component="img"
            src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=560&q=80"
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
              color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 480, mx: 'auto', fontWeight: 300,
            }}>
              Login to access your savings dashboard or apply for a loan today.
              Our team is ready to guide you through every step.
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
                component={Link} to="/membership" variant="outlined" size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.3)', color: '#fff',
                  backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.07)',
                  '&:hover': { borderColor: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.14)' },
                }}
              >
                Learn About Membership
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

export default Services;