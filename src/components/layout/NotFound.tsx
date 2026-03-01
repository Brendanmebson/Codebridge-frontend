import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, useTheme, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NotFound: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 18,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 18,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const quickLinks = [
    { label: 'Home', sub: 'Back to the main page', icon: <HomeOutlinedIcon sx={{ fontSize: 20 }} />, to: '/', color: palette.primary.dark, accent: palette.primary.main },
    { label: 'About Us', sub: 'Learn about the cooperative', icon: <GroupsOutlinedIcon sx={{ fontSize: 20 }} />, to: '/about', color: palette.info.dark, accent: palette.info.main },
    { label: 'Loans', sub: 'Explore loan products', icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 20 }} />, to: '/services', color: palette.secondary.dark, accent: palette.secondary.main },
    { label: 'Savings', sub: 'Savings accounts & rates', icon: <SavingsOutlinedIcon sx={{ fontSize: 20 }} />, to: '/services', color: palette.info.dark, accent: '#00897B' },
    { label: 'Governance', sub: 'ICA principles & board', icon: <GavelOutlinedIcon sx={{ fontSize: 20 }} />, to: '/governance', color: palette.primary.dark, accent: palette.primary.main },
    { label: 'Contact', sub: 'Get in touch with us', icon: <ContactSupportOutlinedIcon sx={{ fontSize: 20 }} />, to: '/contact', color: palette.secondary.dark, accent: palette.secondary.main },
  ];

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        background: palette.background.default,
        fontFamily: typography.fontFamily,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── BACKGROUND ──────────────────────────────────── */}
      {/* Gradient blobs */}
      <Box sx={{
        position: 'absolute', top: -160, right: -160, width: 600, height: 600,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${palette.primary.main}14, transparent 70%)`,
        pointerEvents: 'none',
        transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
        transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
      }} />
      <Box sx={{
        position: 'absolute', bottom: -100, left: -100, width: 450, height: 450,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${palette.secondary.main}10, transparent 70%)`,
        pointerEvents: 'none',
        transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
        transition: 'transform 1s cubic-bezier(0.22,1,0.36,1)',
      }} />
      <Box sx={{
        position: 'absolute', top: '40%', left: '30%', width: 300, height: 300,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${palette.info.main}08, transparent 70%)`,
        pointerEvents: 'none',
        transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        transition: 'transform 1.2s cubic-bezier(0.22,1,0.36,1)',
      }} />
      {/* Grain overlay */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`, backgroundSize: '200px', opacity: 0.5 }} />
      {/* Floating dots */}
      {[...Array(8)].map((_, i) => (
        <Box key={i} sx={{
          position: 'absolute', width: 4, height: 4, borderRadius: '50%',
          background: i % 2 === 0 ? `${palette.primary.main}40` : `${palette.secondary.main}30`,
          top: `${8 + i * 11}%`, left: `${5 + (i % 4) * 24}%`,
          animation: `fdot${i} ${3.5 + i * 0.4}s ease-in-out ${i * 0.5}s infinite`,
          [`@keyframes fdot${i}`]: { '0%,100%': { opacity: 0.15, transform: 'translateY(0) scale(1)' }, '50%': { opacity: 0.9, transform: 'translateY(-12px) scale(1.5)' } },
          pointerEvents: 'none',
        }} />
      ))}

      {/* ── HERO SECTION ────────────────────────────────── */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 8, lg: 12 }, alignItems: 'center', py: { xs: 8, md: 12 } }}>

            {/* Left — text */}
            <Box sx={{ animation: 'slideUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards', '@keyframes slideUp': { from: { opacity: 0, transform: 'translateY(40px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
              {/* Badge */}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 0.75, mb: 4, background: `${palette.primary.main}08`, border: `1px solid ${palette.primary.main}20`, borderRadius: '100px' }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: palette.primary.main, animation: 'nblink 2.5s ease infinite', '@keyframes nblink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
                <Typography variant="caption" sx={{ color: palette.primary.main, fontWeight: 600, letterSpacing: '0.06em' }}>
                  Error 404
                </Typography>
              </Box>

              {/* Giant 404 */}
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Typography sx={{
                  fontFamily: typography.fontFamily, fontWeight: 800,
                  fontSize: { xs: '7rem', sm: '9rem', md: '11rem' },
                  lineHeight: 0.9, letterSpacing: '-0.04em',
                  background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main} 40%, ${palette.secondary.main})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  userSelect: 'none',
                  transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
                  transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  404
                </Typography>
                {/* Shadow / echo */}
                <Typography sx={{
                  fontFamily: typography.fontFamily, fontWeight: 800,
                  fontSize: { xs: '7rem', sm: '9rem', md: '11rem' },
                  lineHeight: 0.9, letterSpacing: '-0.04em',
                  color: `${palette.primary.main}05`,
                  position: 'absolute', top: 6, left: 6,
                  userSelect: 'none', pointerEvents: 'none',
                }}>
                  404
                </Typography>
              </Box>

              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '1.8rem', md: '2.4rem' }, lineHeight: 1.2, mb: 2, fontWeight: 700 }}>
                Page Not Found
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.85, mb: 5, maxWidth: 460 }}>
                The page you're looking for doesn't exist or may have been moved.
                Don't worry — use the links below to find what you need, or head back to our homepage.
              </Typography>

              {/* CTA buttons */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link} to="/" variant="contained" size="large"
                  startIcon={<HomeOutlinedIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                    color: '#fff', fontFamily: typography.fontFamily, fontWeight: 700,
                    fontSize: '0.95rem', textTransform: 'none',
                    borderRadius: `${br * 1.5}px`, px: 3.5, py: 1.5,
                    boxShadow: `0 10px 30px ${palette.primary.main}35`,
                    '&:hover': { boxShadow: `0 16px 42px ${palette.primary.main}50`, transform: 'translateY(-2px)' },
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  Go to Homepage
                </Button>
                <Button
                  variant="outlined" size="large"
                  startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
                  onClick={() => navigate(-1)}
                  sx={{
                    borderColor: `${palette.primary.main}25`, color: palette.text.secondary,
                    fontFamily: typography.fontFamily, fontWeight: 600,
                    fontSize: '0.95rem', textTransform: 'none',
                    borderRadius: `${br * 1.5}px`, px: 3.5, py: 1.5,
                    '&:hover': { borderColor: `${palette.primary.main}50`, color: palette.text.primary, background: `${palette.primary.main}04` },
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  Go Back
                </Button>
              </Stack>
            </Box>

            {/* Right — illustration */}
            <Box sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              animation: 'slideRight 1.1s cubic-bezier(0.22,1,0.36,1) 0.2s forwards',
              opacity: 0,
              '@keyframes slideRight': { from: { opacity: 0, transform: 'translateX(40px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
            }}>
              <Box sx={{ position: 'relative', width: { xs: 280, sm: 360, md: 420 }, height: { xs: 280, sm: 360, md: 420 } }}>
                {/* Main circle */}
                <Box sx={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: `linear-gradient(145deg, ${palette.primary.main}12, ${palette.secondary.main}08)`,
                  border: `2px solid ${palette.primary.main}12`,
                  transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
                  transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
                }} />
                {/* Outer ring */}
                <Box sx={{
                  position: 'absolute', inset: -24, borderRadius: '50%',
                  border: `1px dashed ${palette.primary.main}18`,
                  animation: 'spin 30s linear infinite',
                  '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
                }} />
                {/* Inner ring */}
                <Box sx={{
                  position: 'absolute', inset: 32, borderRadius: '50%',
                  border: `1px dashed ${palette.secondary.main}20`,
                  animation: 'spin 20s linear infinite reverse',
                }} />

                {/* Center icon */}
                <Box sx={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  <Box sx={{
                    width: 120, height: 120, borderRadius: `${br * 2.5}px`,
                    background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 24px 64px ${palette.primary.main}40`,
                    animation: 'float 4s ease-in-out infinite',
                    '@keyframes float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
                  }}>
                    <SearchIcon sx={{ fontSize: 52, color: 'rgba(255,255,255,0.85)' }} />
                  </Box>
                </Box>

                {/* Orbiting decorative dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                  const radius = 170;
                  const rad = (deg * Math.PI) / 180;
                  const x = 50 + (radius / 4.2) * Math.cos(rad);
                  const y = 50 + (radius / 4.2) * Math.sin(rad);
                  return (
                    <Box key={i} sx={{
                      position: 'absolute',
                      left: `${x}%`, top: `${y}%`,
                      width: i % 2 === 0 ? 10 : 7, height: i % 2 === 0 ? 10 : 7,
                      borderRadius: '50%',
                      background: i % 3 === 0
                        ? `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`
                        : i % 3 === 1
                        ? `linear-gradient(135deg, ${palette.secondary.main}, ${palette.secondary.dark})`
                        : `linear-gradient(135deg, ${palette.info.main}, ${palette.info.dark})`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 4px 12px ${palette.primary.main}30`,
                      animation: `orb${i} ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
                      [`@keyframes orb${i}`]: { '0%,100%': { transform: 'translate(-50%,-50%) scale(1)', opacity: 0.6 }, '50%': { transform: 'translate(-50%,-50%) scale(1.5)', opacity: 1 } },
                    }} />
                  );
                })}

                {/* Floating mini cards */}
                {[
                  { label: '404', sub: 'Not Found', top: '8%', right: '-8%', color: palette.primary.main, delay: '0s' },
                  { label: 'Oops!', sub: 'Wrong path', bottom: '10%', left: '-10%', color: palette.secondary.main, delay: '1.5s' },
                ].map((card, i) => (
                  <Box key={i} sx={{
                    position: 'absolute', top: card.top, right: card.right, bottom: card.bottom, left: card.left,
                    background: palette.background.paper,
                    border: `1px solid ${card.color}20`,
                    borderRadius: `${br * 1.5}px`, px: 2, py: 1.5,
                    boxShadow: `0 8px 28px ${card.color}14`,
                    animation: `minifloat 4.5s ease-in-out ${card.delay} infinite`,
                    [`@keyframes minifloat`]: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
                    zIndex: 3,
                  }}>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: card.color, fontSize: '0.95rem', lineHeight: 1 }}>{card.label}</Typography>
                    <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.68rem' }}>{card.sub}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── QUICK LINKS ─────────────────────────────────── */}
      <Box sx={{ position: 'relative', zIndex: 2, py: { xs: 6, md: 8 }, borderTop: `1px solid ${palette.primary.main}08` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}08`, border: `1px solid ${palette.primary.main}18`, borderRadius: '100px', mb: 2 }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Quick Navigation</Typography>
            </Box>
            <Typography variant="h4" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' }, mb: 1 }}>
              Where would you like to go?
            </Typography>
            <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 300 }}>
              Here are some of the most visited pages on our site.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3,1fr)', md: 'repeat(6,1fr)' }, gap: 2 }}>
            {quickLinks.map((link, i) => (
              <Box
                key={i}
                component={Link}
                to={link.to}
                sx={{
                  textDecoration: 'none',
                  p: 3, borderRadius: `${br * 2}px`,
                  background: palette.background.paper,
                  border: `1px solid ${palette.background.default}`,
                  textAlign: 'center',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5,
                  position: 'relative', overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 18px 48px ${link.color}12`,
                    borderColor: 'transparent',
                    '& .ql-icon': { background: `linear-gradient(135deg, ${link.color}, ${link.accent})`, color: '#fff' },
                    '& .ql-arrow': { opacity: 1, transform: 'translateX(0)' },
                  },
                }}
              >
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${link.color}, ${link.accent})` }} />
                <Box className="ql-icon" sx={{ width: 44, height: 44, borderRadius: `${br}px`, background: `${link.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: link.color, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
                  {link.icon}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, lineHeight: 1.2, mb: 0.3 }}>{link.label}</Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.7rem', display: 'block', lineHeight: 1.4 }}>{link.sub}</Typography>
                </Box>
                <Box className="ql-arrow" sx={{ display: 'flex', alignItems: 'center', gap: 0.3, opacity: 0, transform: 'translateX(-6px)', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)' }}>
                  <Typography variant="caption" sx={{ color: link.accent, fontWeight: 700, fontSize: '0.68rem' }}>Visit</Typography>
                  <ArrowForwardIcon sx={{ fontSize: 11, color: link.accent }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── BOTTOM STRIP ────────────────────────────────── */}
      <Box sx={{ position: 'relative', zIndex: 2, py: 3, borderTop: `1px solid ${palette.primary.main}06` }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.78rem' }}>
              © {new Date().getFullYear()} CodeBridge Cooperative Society · All rights reserved
            </Typography>
            <Box sx={{ display: 'flex', gap: 2.5 }}>
              {[
                { label: 'Privacy Policy', to: '/privacy-policy' },
                { label: 'Loan Policy', to: '/loan-policy' },
                { label: 'Terms', to: '/termsandconditions' },
              ].map((l, i) => (
                <Typography key={i} component={Link} to={l.to} variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.78rem', textDecoration: 'none', '&:hover': { color: palette.primary.main } }}>
                  {l.label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default NotFound;