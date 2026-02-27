import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpeedIcon from '@mui/icons-material/Speed';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';

const C = {
  primaryMain:   '#2E7D32',
  primaryLight:  '#4CAF50',
  primaryDark:   '#1B5E20',
  secondaryMain: '#66BB6A',
  secondaryDark: '#388E3C',
  bgDefault:     '#F1F8E9',
  bgPaper:       '#FFFFFF',
  textPrimary:   '#1B1B1B',
  textSecondary: '#4F4F4F',
  infoMain:      '#26A69A',
  infoDark:      '#00796B',
};

const Services: React.FC = () => {
  const savingsProducts = [
    {
      name: 'Regular Monthly Savings',
      description: 'Build consistent savings habits with monthly contributions that grow over time.',
      features: ['Flexible contribution amounts', 'Dividend eligibility', 'Loan access qualification'],
      color: C.primaryDark,
      accent: C.primaryMain,
    },
    {
      name: 'Target / Special Purpose Savings',
      description: 'Save towards specific goals with dedicated target accounts and timelines.',
      features: ['Set personal savings targets', 'Timeline-based goals', 'Higher interest rates'],
      color: C.infoDark,
      accent: C.infoMain,
    },
  ];

  const loanProducts = [
    {
      icon: <PersonIcon sx={{ fontSize: 22 }} />,
      name: 'Personal Loans',
      description: 'Meet your personal financial needs quickly and affordably.',
      rate: '12%',
      period: 'p.a.',
      color: C.primaryDark,
      accent: C.primaryMain,
    },
    {
      icon: <BusinessCenterIcon sx={{ fontSize: 22 }} />,
      name: 'Business Loans',
      description: 'Grow your business with affordable capital and flexible terms.',
      rate: '10%',
      period: 'p.a.',
      color: C.infoDark,
      accent: C.infoMain,
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 22 }} />,
      name: 'Emergency Loans',
      description: 'Quick access to funds during unexpected emergencies.',
      rate: '15%',
      period: 'p.a.',
      color: C.secondaryDark,
      accent: C.secondaryMain,
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 22 }} />,
      name: 'Educational Loans',
      description: 'Invest in education and skill development for a better future.',
      rate: '8%',
      period: 'p.a.',
      color: '#004D40',
      accent: '#00897B',
    },
  ];

  return (
    <Box sx={{ fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primaryMain} 55%, ${C.secondaryDark} 100%)`,
        py: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: '-100px', right: '-100px', width: { xs: 300, md: 500 }, height: { xs: 300, md: 500 }, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', border: '1px solid rgba(255,255,255,0.1)' }} />
          <Box sx={{ position: 'absolute', bottom: '-60px', left: '-60px', width: { xs: 220, md: 360 }, height: { xs: 220, md: 360 }, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)' }} />
          <Box sx={{ position: 'absolute', top: '20%', left: '58%', width: 150, height: 150, borderRadius: '70% 30% 60% 40% / 50% 60% 40% 50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', transform: 'rotate(30deg)' }} />
          {[...Array(5)].map((_, i) => (
            <Box key={i} sx={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)', top: `${20 + i * 14}%`, right: `${8 + (i % 3) * 6}%`, animation: `sp${i} ${2.5 + i * 0.3}s ease-in-out ${i * 0.3}s infinite`, [`@keyframes sp${i}`]: { '0%,100%': { opacity: 0.2, transform: 'scale(1)' }, '50%': { opacity: 0.9, transform: 'scale(1.3)' } } }} />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ animation: 'svUp 0.9s ease forwards', '@keyframes svUp': { from: { opacity: 0, transform: 'translateY(28px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, mb: 3, border: '1px solid rgba(255,255,255,0.3)', borderRadius: '100px', backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.1)' }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#A5D6A7', animation: 'svBlink 2s ease infinite', '@keyframes svBlink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>
                Financial Solutions for Every Member
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '2.8rem', md: '3.8rem' }, fontWeight: 900, color: '#fff', lineHeight: 1.1, mb: 2.5 }}>
              Services Built<br />
              <Box component="span" sx={{ background: 'linear-gradient(90deg, #A5D6A7, #E8F5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Around You
              </Box>
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: { xs: '1rem', md: '1.1rem' }, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 560 }}>
              Comprehensive financial solutions — from disciplined savings schemes to affordable loan facilities — all designed to empower every member.
            </Typography>
          </Box>
        </Container>

        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: { xs: 40, md: 60 }, background: C.bgDefault, clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </Box>

      {/* ── SAVINGS ──────────────────────────────────────── */}
      <Box sx={{ background: C.bgDefault, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          {/* Section header */}
          <Box sx={{ mb: 7 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ width: 52, height: 52, borderRadius: '14px', background: `linear-gradient(135deg, ${C.primaryMain}, ${C.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 24px ${C.primaryMain}44` }}>
                <SavingsIcon sx={{ fontSize: 26, color: '#fff' }} />
              </Box>
              <Box>
                <Box sx={{ display: 'inline-block', px: 2, py: 0.4, mb: 0.5, background: `${C.primaryMain}14`, border: `1px solid ${C.primaryMain}30`, borderRadius: '100px' }}>
                  <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: C.primaryMain, fontWeight: 600, letterSpacing: '0.06em' }}>SAVINGS</Typography>
                </Box>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800, color: C.textPrimary, lineHeight: 1.1 }}>
                  Savings Products
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: C.textSecondary, lineHeight: 1.8, maxWidth: 720, mt: 1 }}>
              Our savings schemes help members cultivate a disciplined savings culture while building financial security. All accounts provide dividend eligibility, loan access qualification, and promote long-term financial discipline.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {savingsProducts.map((product, i) => (
              <Box key={i} sx={{
                position: 'relative',
                p: 4, borderRadius: '20px',
                background: C.bgPaper,
                border: `1px solid ${C.bgDefault}`,
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 24px 60px ${product.color}1e`,
                  borderColor: 'transparent',
                  '& .sp-bar': { width: '100%' },
                },
              }}>
                {/* Top bar */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${product.color}, ${product.accent})` }} />
                {/* Corner tint */}
                <Box sx={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at top right, ${product.color}0e, transparent 70%)`, borderRadius: '0 20px 0 100%' }} />

                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 800, color: C.textPrimary, mb: 1.5 }}>
                  {product.name}
                </Typography>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.97rem', color: C.textSecondary, lineHeight: 1.75, mb: 3 }}>
                  {product.description}
                </Typography>

                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: product.color, letterSpacing: '0.06em', mb: 1.5, textTransform: 'uppercase' }}>
                  Benefits
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {product.features.map((f, fi) => (
                    <Box key={fi} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 22, height: 22, borderRadius: '50%', background: `${product.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckIcon sx={{ fontSize: 13, color: product.color }} />
                      </Box>
                      <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: C.textPrimary }}>{f}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── LOANS ────────────────────────────────────────── */}
      <Box sx={{ backgroundColor: C.bgPaper, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          {/* Section header */}
          <Box sx={{ mb: 7 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ width: 52, height: 52, borderRadius: '14px', background: `linear-gradient(135deg, ${C.infoDark}, ${C.infoMain})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 24px ${C.infoMain}44` }}>
                <AccountBalanceIcon sx={{ fontSize: 26, color: '#fff' }} />
              </Box>
              <Box>
                <Box sx={{ display: 'inline-block', px: 2, py: 0.4, mb: 0.5, background: `${C.infoMain}14`, border: `1px solid ${C.infoMain}30`, borderRadius: '100px' }}>
                  <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: C.infoDark, fontWeight: 600, letterSpacing: '0.06em' }}>LOANS</Typography>
                </Box>
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800, color: C.textPrimary, lineHeight: 1.1 }}>
                  Loan Services
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: C.textSecondary, lineHeight: 1.8, maxWidth: 720, mt: 1 }}>
              We provide affordable loan facilities to meet members' personal, business, and emergency needs. All loans are subject to eligibility criteria and cooperative policies.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }, gap: 3, mb: 6 }}>
            {loanProducts.map((product, i) => (
              <Box key={i} sx={{
                position: 'relative',
                p: 3.5, borderRadius: '20px',
                border: `1px solid ${C.bgDefault}`,
                background: C.bgPaper,
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 20px 50px ${product.color}1e`,
                  borderColor: 'transparent',
                  '& .lp-icon': { background: `linear-gradient(135deg, ${product.color}, ${product.accent})`, color: '#fff' },
                },
              }}>
                {/* Top accent */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${product.color}, ${product.accent})` }} />
                <Box sx={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${product.color}0e, transparent 70%)`, borderRadius: '0 20px 0 100%' }} />

                <Box className="lp-icon" sx={{ width: 46, height: 46, borderRadius: '12px', background: `${product.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: product.color, mb: 2.5, transition: 'all 0.35s' }}>
                  {product.icon}
                </Box>

                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: C.textPrimary, mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: C.textSecondary, lineHeight: 1.7, mb: 2.5 }}>
                  {product.description}
                </Typography>

                {/* Rate badge */}
                <Box sx={{ display: 'inline-flex', alignItems: 'baseline', gap: 0.5, px: 1.5, py: 0.75, background: `${product.color}10`, border: `1px solid ${product.color}25`, borderRadius: '8px' }}>
                  <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 900, color: product.color, lineHeight: 1 }}>
                    {product.rate}
                  </Typography>
                  <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: product.color, fontWeight: 600 }}>
                    {product.period}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* CTA */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={Link} to="/login"
              variant="contained" size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                background: `linear-gradient(135deg, ${C.primaryMain}, ${C.primaryDark})`,
                color: '#fff', fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, fontSize: '1rem',
                px: 5, py: 1.8, borderRadius: '12px', textTransform: 'none',
                boxShadow: `0 8px 28px ${C.primaryMain}44`,
                transition: 'all 0.3s',
                '&:hover': { background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primaryMain})`, transform: 'translateY(-2px)', boxShadow: `0 14px 36px ${C.primaryMain}55` },
              }}
            >
              Apply for a Loan
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── CTA BAND ─────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primaryMain} 55%, ${C.secondaryDark} 100%)`,
        py: { xs: 8, md: 10 }, overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', top: '-60px', right: '-60px', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-80px', left: '-80px', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)', pointerEvents: 'none' }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 900, color: '#fff', lineHeight: 1.2, mb: 2 }}>
            Ready to Get Started?
          </Typography>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: { xs: '1rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.72)', mb: 4.5, maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}>
            Login to access your savings dashboard or apply for a loan today.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button component={Link} to="/login" variant="contained" size="large"
              sx={{ background: '#fff', color: C.primaryDark, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', px: 4, py: 1.8, borderRadius: '12px', textTransform: 'none', boxShadow: '0 8px 28px rgba(0,0,0,0.2)', transition: 'all 0.3s', '&:hover': { background: C.bgDefault, transform: 'translateY(-2px)' } }}>
              Login Now
            </Button>
            <Button component={Link} to="/membership" variant="outlined" size="large"
              sx={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.95rem', px: 4, py: 1.8, borderRadius: '12px', textTransform: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.3s', '&:hover': { borderColor: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)' } }}>
              Learn About Membership
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default Services;