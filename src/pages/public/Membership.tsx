import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BadgeIcon from '@mui/icons-material/Badge';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HomeIcon from '@mui/icons-material/Home';

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

const Membership: React.FC = () => {
  const benefits = [
    { text: 'Access to low-interest loans', color: C.primaryDark },
    { text: 'Structured savings plans with competitive dividends', color: C.infoDark },
    { text: 'Welfare support in times of need', color: C.secondaryDark },
    { text: 'Participation in cooperative decision-making', color: C.primaryDark },
    { text: 'Financial literacy and education programs', color: C.infoDark },
    { text: 'Secure and transparent account management', color: C.secondaryDark },
  ];

  const requirements = [
    { icon: <BadgeIcon sx={{ fontSize: 22 }} />, text: 'Valid government-issued identification', color: C.primaryDark, accent: C.primaryMain },
    { icon: <PhotoCameraIcon sx={{ fontSize: 22 }} />, text: 'Passport photograph', color: C.infoDark, accent: C.infoMain },
    { icon: <AccountBalanceWalletIcon sx={{ fontSize: 22 }} />, text: 'Initial savings contribution (minimum ₦5,000)', color: C.secondaryDark, accent: C.secondaryMain },
    { icon: <HomeIcon sx={{ fontSize: 22 }} />, text: 'Residential address verification', color: '#004D40', accent: '#00897B' },
  ];

  const steps = [
    { num: '01', title: 'Gather Documents', desc: 'Prepare your ID, photograph, and address proof.', color: C.primaryDark, accent: C.primaryMain },
    { num: '02', title: 'Complete Registration', desc: 'Fill out and submit your membership registration form.', color: C.infoDark, accent: C.infoMain },
    { num: '03', title: 'Make Initial Deposit', desc: 'Pay the minimum ₦5,000 savings contribution.', color: C.secondaryDark, accent: C.secondaryMain },
    { num: '04', title: 'Login & Start Saving', desc: 'Access your dashboard and begin your financial journey.', color: '#004D40', accent: '#00897B' },
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
            <Box key={i} sx={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)', top: `${20 + i * 14}%`, right: `${8 + (i % 3) * 6}%`, animation: `mp${i} ${2.5 + i * 0.3}s ease-in-out ${i * 0.3}s infinite`, [`@keyframes mp${i}`]: { '0%,100%': { opacity: 0.2, transform: 'scale(1)' }, '50%': { opacity: 0.9, transform: 'scale(1.3)' } } }} />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ animation: 'mUp 0.9s ease forwards', '@keyframes mUp': { from: { opacity: 0, transform: 'translateY(28px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, mb: 3, border: '1px solid rgba(255,255,255,0.3)', borderRadius: '100px', backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.1)' }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#A5D6A7', animation: 'mBlink 2s ease infinite', '@keyframes mBlink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.05em' }}>
                Join a Financially Empowered Community
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '2.8rem', md: '3.8rem' }, fontWeight: 900, color: '#fff', lineHeight: 1.1, mb: 2.5 }}>
              Membership<br />
              <Box component="span" sx={{ background: 'linear-gradient(90deg, #A5D6A7, #E8F5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Has Its Privileges
              </Box>
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: { xs: '1rem', md: '1.1rem' }, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 560 }}>
              By joining CodeBridge, you become part of a community where members support one another to achieve common economic goals through collective savings, affordable credit, and mutual welfare.
            </Typography>
          </Box>
        </Container>

        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: { xs: 40, md: 60 }, background: C.bgDefault, clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </Box>

      {/* ── WHY JOIN ─────────────────────────────────────── */}
      <Box sx={{ background: C.bgDefault, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Box sx={{ display: 'inline-block', px: 2, py: 0.5, mb: 2, background: `${C.primaryMain}14`, border: `1px solid ${C.primaryMain}30`, borderRadius: '100px' }}>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: C.primaryMain, fontWeight: 600, letterSpacing: '0.06em' }}>WHY JOIN US</Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, color: C.textPrimary, mb: 1.5 }}>
              Benefits of Membership
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: C.textSecondary, maxWidth: 560, mx: 'auto', lineHeight: 1.7 }}>
              Everything you get when you become a CodeBridge member.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2,1fr)' }, gap: 2.5 }}>
            {benefits.map((b, i) => (
              <Box key={i} sx={{
                display: 'flex', alignItems: 'center', gap: 2,
                p: 3, background: C.bgPaper, borderRadius: '16px',
                border: `1px solid ${C.bgDefault}`,
                transition: 'all 0.3s',
                '&:hover': { transform: 'translateX(6px)', boxShadow: `0 8px 28px ${b.color}14`, borderColor: 'transparent' },
              }}>
                <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: `${b.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircleIcon sx={{ fontSize: 22, color: b.color }} />
                </Box>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.97rem', color: C.textPrimary, fontWeight: 500 }}>
                  {b.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── REQUIREMENTS ─────────────────────────────────── */}
      <Box sx={{ backgroundColor: C.bgPaper, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Box sx={{ display: 'inline-block', px: 2, py: 0.5, mb: 2, background: `${C.primaryMain}12`, border: `1px solid ${C.primaryMain}28`, borderRadius: '100px' }}>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: C.primaryMain, fontWeight: 600, letterSpacing: '0.06em' }}>WHAT YOU NEED</Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 800, color: C.textPrimary, mb: 1.5 }}>
              Membership Requirements
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: C.textSecondary, maxWidth: 560, mx: 'auto', lineHeight: 1.7 }}>
              Prospective members must complete a registration form and submit the following documents, then simply login.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }, gap: 3 }}>
            {requirements.map((req, i) => (
              <Box key={i} sx={{
                position: 'relative',
                p: 3.5, borderRadius: '20px',
                border: `1px solid ${C.bgDefault}`,
                background: C.bgPaper, overflow: 'hidden',
                transition: 'all 0.35s',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 20px 50px ${req.color}1e`,
                  borderColor: 'transparent',
                  '& .req-icon': { background: `linear-gradient(135deg, ${req.color}, ${req.accent})`, color: '#fff' },
                },
              }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${req.color}, ${req.accent})` }} />
                <Box sx={{ position: 'absolute', top: 0, right: 0, width: 70, height: 70, background: `radial-gradient(circle at top right, ${req.color}0e, transparent 70%)`, borderRadius: '0 20px 0 100%' }} />
                <Box className="req-icon" sx={{ width: 48, height: 48, borderRadius: '13px', background: `${req.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: req.color, mb: 2, transition: 'all 0.35s' }}>
                  {req.icon}
                </Box>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.93rem', color: C.textPrimary, lineHeight: 1.6 }}>
                  {req.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── HOW TO JOIN ──────────────────────────────────── */}
      <Box sx={{ background: C.bgDefault, py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Box sx={{ display: 'inline-block', px: 2, py: 0.5, mb: 2, background: `${C.primaryMain}14`, border: `1px solid ${C.primaryMain}30`, borderRadius: '100px' }}>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: C.primaryMain, fontWeight: 600, letterSpacing: '0.06em' }}>THE PROCESS</Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 800, color: C.textPrimary }}>
              How to Join
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }, gap: 3 }}>
            {steps.map((step, i) => (
              <Box key={i} sx={{
                position: 'relative',
                p: 3.5, borderRadius: '20px',
                background: C.bgPaper,
                border: `1px solid ${C.bgDefault}`,
                overflow: 'hidden',
                transition: 'all 0.3s',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 16px 40px ${step.color}1a` },
              }}>
                {/* Big background number */}
                <Typography sx={{ position: 'absolute', top: 8, right: 16, fontFamily: "'Playfair Display', serif", fontSize: '4rem', fontWeight: 900, lineHeight: 1, color: `${step.color}10`, userSelect: 'none' }}>
                  {step.num}
                </Typography>
                <Box sx={{ width: 36, height: 4, borderRadius: 4, background: `linear-gradient(90deg, ${step.color}, ${step.accent})`, mb: 2.5 }} />
                <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: C.textPrimary, mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', color: C.textSecondary, lineHeight: 1.7 }}>
                  {step.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── CTA ──────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primaryMain} 55%, ${C.secondaryDark} 100%)`,
        py: { xs: 8, md: 12 }, overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', top: '-60px', right: '-60px', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-80px', left: '-80px', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', top: '15%', right: '15%', width: 120, height: 120, borderRadius: '70% 30% 60% 40% / 50% 60% 40% 50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', transform: 'rotate(20deg)', pointerEvents: 'none' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '2.2rem', md: '3rem' }, fontWeight: 900, color: '#fff', lineHeight: 1.2, mb: 2 }}>
            Ready to Get Started?<br />
            <Box component="span" sx={{ background: 'linear-gradient(90deg, #A5D6A7, #E8F5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Login Now
            </Box>
          </Typography>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: { xs: '1rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.72)', mb: 5, maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}>
            Join thousands of members building financial security together. Your journey to financial empowerment starts here.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button component={Link} to="/login" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
              sx={{ background: '#fff', color: C.primaryDark, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', px: 4, py: 1.8, borderRadius: '12px', textTransform: 'none', boxShadow: '0 8px 28px rgba(0,0,0,0.2)', transition: 'all 0.3s', '&:hover': { background: C.bgDefault, transform: 'translateY(-2px)' } }}>
              Login Now
            </Button>
            <Button component={Link} to="/services" variant="outlined" size="large"
              sx={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '0.95rem', px: 4, py: 1.8, borderRadius: '12px', textTransform: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.3s', '&:hover': { borderColor: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)' } }}>
              View Services
            </Button>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default Membership;