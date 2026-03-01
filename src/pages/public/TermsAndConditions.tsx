import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, useTheme, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BalanceIcon from '@mui/icons-material/Balance';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

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

// Sticky sidebar nav hook
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [ids]);
  return active;
}

const SECTION_IDS = [
  'acceptance', 'membership', 'savings', 'loans',
  'conduct', 'privacy', 'liability', 'amendments', 'contact',
];

const TermsAndConditions: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`;

  const activeSection = useActiveSection(SECTION_IDS);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navSections = [
    { id: 'acceptance', label: 'Acceptance of Terms', icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} /> },
    { id: 'membership', label: 'Membership Obligations', icon: <PeopleOutlineIcon sx={{ fontSize: 16 }} /> },
    { id: 'savings', label: 'Savings & Deposits', icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 16 }} /> },
    { id: 'loans', label: 'Loans & Credit', icon: <BalanceIcon sx={{ fontSize: 16 }} /> },
    { id: 'conduct', label: 'Member Conduct', icon: <HandshakeOutlinedIcon sx={{ fontSize: 16 }} /> },
    { id: 'privacy', label: 'Privacy & Data', icon: <LockOutlinedIcon sx={{ fontSize: 16 }} /> },
    { id: 'liability', label: 'Liability & Disputes', icon: <GavelIcon sx={{ fontSize: 16 }} /> },
    { id: 'amendments', label: 'Amendments', icon: <UpdateOutlinedIcon sx={{ fontSize: 16 }} /> },
    { id: 'contact', label: 'Contact & Legal', icon: <EmailOutlinedIcon sx={{ fontSize: 16 }} /> },
  ];

  const highlights = [
    { icon: <PeopleOutlineIcon sx={{ fontSize: 22 }} />, title: 'Membership Rights', desc: 'Your rights as a member — voting, dividends, and account access.', color: palette.primary.dark, accent: palette.primary.main },
    { icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Savings Protection', desc: 'How your deposits are held, managed, and protected.', color: palette.info.dark, accent: palette.info.main },
    { icon: <BalanceIcon sx={{ fontSize: 22 }} />, title: 'Loan Obligations', desc: 'Your repayment commitments and what happens on default.', color: palette.secondary.dark, accent: palette.secondary.main },
    { icon: <LockOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Data Privacy', desc: 'How we collect, use, and protect your personal information.', color: palette.info.dark, accent: '#00897B' },
  ];

  const { ref: highlightsRef, visible: highlightsVisible } = useFadeIn();
  const { ref: bodyRef, visible: bodyVisible } = useFadeIn(0.02);

  const SectionBlock: React.FC<{
    id: string;
    icon: React.ReactNode;
    title: string;
    color: string;
    accent: string;
    children: React.ReactNode;
    notice?: string;
    noticeType?: 'info' | 'warning';
  }> = ({ id, icon, title, color, accent, children, notice, noticeType = 'info' }) => (
    <Box
      id={id}
      sx={{
        scrollMarginTop: '100px',
        p: { xs: 3.5, md: 5 },
        borderRadius: `${br * 2}px`,
        background: palette.background.paper,
        border: `1px solid ${palette.background.default}`,
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
        '&:hover': {
          boxShadow: `0 12px 48px ${color}0a`,
          borderColor: `${color}15`,
        },
      }}
    >
      {/* Top accent bar */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${color}, ${accent})` }} />
      {/* Corner tint */}
      <Box sx={{ position: 'absolute', top: 0, right: 0, width: 140, height: 140, background: `radial-gradient(circle at top right, ${color}06, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3.5 }}>
        <Box sx={{
          width: 46, height: 46, borderRadius: `${br}px`, flexShrink: 0,
          background: `linear-gradient(135deg, ${color}, ${accent})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', boxShadow: `0 8px 22px ${color}35`,
        }}>
          {icon}
        </Box>
        <Typography variant="h5" sx={{ color: palette.text.primary, fontSize: { xs: '1.1rem', md: '1.3rem' } }}>
          {title}
        </Typography>
      </Box>

      {children}

      {notice && (
        <Box sx={{
          mt: 3, p: 2.5, borderRadius: `${br * 1.5}px`,
          background: noticeType === 'warning' ? `${palette.warning.main}0a` : `${color}08`,
          border: `1px solid ${noticeType === 'warning' ? palette.warning.main + '25' : color + '20'}`,
          display: 'flex', gap: 1.5, alignItems: 'flex-start',
        }}>
          {noticeType === 'warning'
            ? <WarningAmberIcon sx={{ fontSize: 18, color: palette.warning.dark, mt: 0.2, flexShrink: 0 }} />
            : <InfoOutlinedIcon sx={{ fontSize: 18, color, mt: 0.2, flexShrink: 0 }} />}
          <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block', fontSize: '0.82rem' }}>
            {notice}
          </Typography>
        </Box>
      )}
    </Box>
  );

  const Clause: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Box sx={{
        width: 20, height: 20, borderRadius: '50%', flexShrink: 0, mt: 0.25,
        background: `${palette.primary.main}10`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: palette.primary.main }} />
      </Box>
      <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.85, fontWeight: 300 }}>
        {children}
      </Typography>
    </Box>
  );

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
                Last Updated: 1 January 2025
              </Typography>
            </Box>
          </Box>

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
                Terms &<br />
                <Box component="span" sx={{
                  fontStyle: 'italic', fontWeight: 300,
                  background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Conditions
                </Box>
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.68)', mb: 5, maxWidth: 460, fontWeight: 300 }}>
                These terms govern your membership and use of CodeBridge Cooperative Society services.
                Please read them carefully — they protect both you and the cooperative.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={Link} to="/membership"
                  variant="contained" size="large"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    background: '#fff', color: palette.primary.dark,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
                    '&:hover': { background: palette.background.default, boxShadow: '0 20px 50px rgba(0,0,0,0.28)' },
                  }}
                >
                  Membership Info
                </Button>
                <Button
                  component={Link} to="/contact"
                  variant="outlined" size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.35)', color: '#fff',
                    backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.06)',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.12)' },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Box>

            {/* Right: quick fact cards */}
            <Box sx={{
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: '1fr 1fr', gap: 2,
              animation: 'heroRight 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s forwards',
              opacity: 0,
              '@keyframes heroRight': {
                from: { opacity: 0, transform: 'translateX(24px)' },
                to: { opacity: 1, transform: 'translateX(0)' },
              },
            }}>
              {[
                { icon: <ArticleOutlinedIcon sx={{ fontSize: 22 }} />, val: '9 Sections', sub: 'Clearly structured' },
                { icon: <UpdateOutlinedIcon sx={{ fontSize: 22 }} />, val: 'Jan 2025', sub: 'Latest revision' },
                { icon: <GavelIcon sx={{ fontSize: 22 }} />, val: 'Nigerian Law', sub: 'Governing jurisdiction' },
                { icon: <SecurityOutlinedIcon sx={{ fontSize: 22 }} />, val: 'NDPR Compliant', sub: 'Data protection' },
              ].map((s, i) => (
                <Box key={i} sx={{
                  background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: `${br * 2}px`, p: 2.5,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': { background: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' },
                }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, mb: 1.5, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.secondary.light }}>
                    {s.icon}
                  </Box>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '1.1rem', fontWeight: 700, color: '#fff', lineHeight: 1, mb: 0.4 }}>{s.val}</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>{s.sub}</Typography>
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


      {/* ── KEY HIGHLIGHTS STRIP ──────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ color: palette.text.primary, fontSize: { xs: '1.6rem', md: '2rem' }, mb: 1 }}>
              What These Terms Cover
            </Typography>
            <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 300 }}>
              The four areas most important to your membership relationship with CodeBridge.
            </Typography>
          </Box>
          <Box
            ref={highlightsRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' },
              gap: 3,
              opacity: highlightsVisible ? 1 : 0,
              transform: highlightsVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {highlights.map((h, i) => (
              <Box
                key={i}
                onClick={() => scrollTo(['membership', 'savings', 'loans', 'privacy'][i])}
                sx={{
                  p: 3, borderRadius: `${br * 2}px`,
                  background: palette.background.paper,
                  border: `1px solid ${palette.background.default}`,
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 20px 50px ${h.color}12`,
                    borderColor: 'transparent',
                    '& .hl-icon': { background: `linear-gradient(135deg, ${h.color}, ${h.accent})`, color: '#fff' },
                  },
                }}
              >
                <Box className="hl-icon" sx={{
                  width: 46, height: 46, borderRadius: `${br}px`, mb: 2,
                  background: `${h.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: h.color,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  {h.icon}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.5 }}>{h.title}</Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.6, display: 'block', fontSize: '0.78rem' }}>{h.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── MAIN CONTENT: SIDEBAR + SECTIONS ─────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            ref={bodyRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '260px 1fr' },
              gap: { xs: 6, lg: 8 },
              alignItems: 'start',
              opacity: bodyVisible ? 1 : 0,
              transform: bodyVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* ── STICKY SIDEBAR NAV ── */}
            <Box sx={{
              display: { xs: 'none', lg: 'block' },
              position: 'sticky', top: 90,
            }}>
              <Box sx={{
                p: 3, borderRadius: `${br * 2}px`,
                background: palette.background.default,
                border: `1px solid ${palette.background.default}`,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main, display: 'block', mb: 2 }}>
                  Jump to Section
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {navSections.map((s) => {
                    const isActive = activeSection === s.id;
                    return (
                      <Box
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        sx={{
                          display: 'flex', alignItems: 'center', gap: 1.5,
                          px: 2, py: 1.25,
                          borderRadius: `${br * 1.25}px`,
                          cursor: 'pointer',
                          background: isActive ? `${palette.primary.main}10` : 'transparent',
                          border: `1px solid ${isActive ? palette.primary.main + '22' : 'transparent'}`,
                          transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                          '&:hover': { background: `${palette.primary.main}08` },
                        }}
                      >
                        <Box sx={{ color: isActive ? palette.primary.main : palette.text.secondary, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                          {s.icon}
                        </Box>
                        <Typography variant="caption" sx={{
                          color: isActive ? palette.primary.main : palette.text.secondary,
                          fontWeight: isActive ? 600 : 400,
                          lineHeight: 1.4, fontSize: '0.8rem',
                          transition: 'all 0.25s',
                        }}>
                          {s.label}
                        </Typography>
                        {isActive && (
                          <Box sx={{ ml: 'auto', width: 5, height: 5, borderRadius: '50%', background: palette.primary.main, flexShrink: 0 }} />
                        )}
                      </Box>
                    );
                  })}
                </Box>

                {/* Last updated card */}
                <Box sx={{
                  mt: 3, p: 2.5, borderRadius: `${br * 1.5}px`,
                  background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <Box sx={{ position: 'absolute', top: -15, right: -15, width: 60, height: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)', pointerEvents: 'none' }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', mb: 0.5 }}>Effective Date</Typography>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>1 January 2025</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mt: 0.5 }}>Governing Law: Nigeria</Typography>
                </Box>
              </Box>
            </Box>

            {/* ── SECTION BLOCKS ── */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

              {/* 1. Acceptance */}
              <SectionBlock
                id="acceptance"
                icon={<CheckCircleOutlineIcon sx={{ fontSize: 22 }} />}
                title="1. Acceptance of Terms"
                color={palette.primary.dark}
                accent={palette.primary.main}
              >
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.85, fontWeight: 300, mb: 2.5 }}>
                  By applying for or maintaining membership with CodeBridge Cooperative Society Limited ("the Cooperative"), you agree to be bound by these Terms and Conditions in full. These terms form part of your membership agreement and should be read together with the Cooperative's registered Bylaws.
                </Typography>
                <Clause>Use of the member portal, submission of a loan application, or continued payment of savings contributions constitutes acceptance of these terms.</Clause>
                <Clause>If you do not agree to any part of these terms, you must notify the Cooperative in writing and refrain from using its services.</Clause>
                <Clause>These terms apply to all members, whether individual or group, from the date of admission to membership.</Clause>
                <Clause>The Cooperative reserves the right to update these terms and will notify members of material changes at least 30 days in advance via the member portal and official notices.</Clause>
              </SectionBlock>

              {/* 2. Membership */}
              <SectionBlock
                id="membership"
                icon={<PeopleOutlineIcon sx={{ fontSize: 22 }} />}
                title="2. Membership Obligations"
                color={palette.info.dark}
                accent={palette.info.main}
                notice="Membership is voluntary but carries financial and conduct obligations. Failure to meet these may result in suspension or expulsion under the Cooperative's Disciplinary Procedure."
                noticeType="info"
              >
                <Box sx={{
                  display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2, mb: 3.5,
                }}>
                  {[
                    { label: 'Minimum Age', val: '18 years' },
                    { label: 'Registration Fee', val: 'None' },
                    { label: 'Minimum Deposit', val: '₦5,000' },
                    { label: 'Monthly Savings', val: '₦2,000+' },
                  ].map((stat, i) => (
                    <Box key={i} sx={{
                      p: 2.5, borderRadius: `${br * 1.5}px`,
                      background: `${palette.info.dark}08`,
                      border: `1px solid ${palette.info.dark}12`,
                    }}>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 0.35 }}>{stat.label}</Typography>
                      <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: palette.info.dark, fontSize: '1.05rem' }}>{stat.val}</Typography>
                    </Box>
                  ))}
                </Box>
                <Clause>Each member must submit a completed membership registration form, valid government-issued identification, a recent passport photograph, and proof of residential address.</Clause>
                <Clause>Members are required to make consistent monthly savings contributions of no less than ₦2,000. Lapses of more than 3 consecutive months without written notice may suspend loan eligibility.</Clause>
                <Clause>Every member is entitled to one vote at Annual General Meetings and special meetings, regardless of savings balance or loan status.</Clause>
                <Clause>Members may voluntarily withdraw from the cooperative by submitting a written resignation. Outstanding loan balances must be settled prior to withdrawal of savings.</Clause>
                <Clause>Membership is non-transferable and may not be assigned to another person.</Clause>
              </SectionBlock>

              {/* 3. Savings */}
              <SectionBlock
                id="savings"
                icon={<AccountBalanceOutlinedIcon sx={{ fontSize: 22 }} />}
                title="3. Savings & Deposits"
                color={palette.secondary.dark}
                accent={palette.secondary.main}
                notice="Savings contributions are cooperative share capital and are not bank deposits. They are not covered by the Nigeria Deposit Insurance Corporation (NDIC)."
                noticeType="warning"
              >
                <Clause>All savings contributions are pooled as cooperative share capital and used to fund member loans, cooperative operations, and approved investments in accordance with the Cooperative's Annual Budget.</Clause>
                <Clause>Dividends on savings, where declared, are approved at the Annual General Meeting and paid in proportion to each member's average balance during the financial year.</Clause>
                <Clause>Partial or full withdrawal of savings is only permitted after a minimum of 12 months active membership, subject to available liquidity and board approval.</Clause>
                <Clause>The Cooperative will provide each member with a savings passbook or digital account statement reflecting all transactions. Members should verify statements promptly and report discrepancies within 30 days.</Clause>
                <Clause>Target savings products have specific lock-in periods and purposes as defined in the product schedule. Early withdrawal from target savings attracts a processing fee of 2% of the withdrawn amount.</Clause>
                <Clause>In the event of a member's death, savings balances will be paid to the nominated next-of-kin or estate in accordance with the Cooperative's estate policy and applicable law.</Clause>
              </SectionBlock>

              {/* 4. Loans */}
              <SectionBlock
                id="loans"
                icon={<BalanceIcon sx={{ fontSize: 22 }} />}
                title="4. Loans & Credit Facilities"
                color={palette.primary.dark}
                accent={palette.primary.light}
                notice="Failure to repay a loan as agreed may result in the Cooperative recovering the outstanding balance from your savings balance, reporting the default to the Cooperative's credit register, and referring the matter to the Disciplinary Committee."
                noticeType="warning"
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3.5, p: 3, borderRadius: `${br * 1.5}px`, background: `${palette.primary.dark}06`, border: `1px solid ${palette.primary.dark}10` }}>
                  {[
                    { type: 'Personal Loan', rate: '12% p.a.', max: '₦500,000', tenure: 'Up to 24 months' },
                    { type: 'Business Loan', rate: '10% p.a.', max: '₦2,000,000', tenure: 'Up to 36 months' },
                    { type: 'Emergency Loan', rate: '15% p.a.', max: '₦200,000', tenure: 'Up to 12 months' },
                    { type: 'Education Loan', rate: '8% p.a.', max: '₦1,000,000', tenure: 'Up to 30 months' },
                  ].map((loan, i) => (
                    <Box key={i} sx={{
                      display: 'grid', gridTemplateColumns: '1fr repeat(3, auto)', gap: 2, alignItems: 'center',
                      pb: i < 3 ? 1.5 : 0, borderBottom: i < 3 ? `1px dashed ${palette.primary.main}12` : 'none',
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary }}>{loan.type}</Typography>
                      <Box sx={{ px: 1.5, py: 0.3, background: `${palette.primary.main}0d`, border: `1px solid ${palette.primary.main}18`, borderRadius: '100px' }}>
                        <Typography variant="caption" sx={{ color: palette.primary.dark, fontWeight: 700, fontSize: '0.72rem' }}>{loan.rate}</Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: palette.text.secondary }}>{loan.max}</Typography>
                      <Typography variant="caption" sx={{ color: palette.text.secondary, textAlign: 'right' }}>{loan.tenure}</Typography>
                    </Box>
                  ))}
                </Box>
                <Clause>Loan eligibility requires a minimum of 3 months active membership with consistent savings contributions and no existing defaulted loan.</Clause>
                <Clause>Loan applications are reviewed by the Loans Committee within 48 working hours. Approval is at the sole discretion of the Loans Committee based on creditworthiness criteria.</Clause>
                <Clause>All loan repayments must be made on or before the agreed due date each month. A late payment charge of 2% of the monthly instalment applies per week of delay.</Clause>
                <Clause>Members may settle a loan early without penalty. Interest is calculated on a reducing balance basis and will be adjusted accordingly.</Clause>
                <Clause>A guarantor (who must be an active member in good standing) may be required for loans above ₦200,000.</Clause>
              </SectionBlock>

              {/* 5. Conduct */}
              <SectionBlock
                id="conduct"
                icon={<HandshakeOutlinedIcon sx={{ fontSize: 22 }} />}
                title="5. Member Conduct"
                color={palette.info.dark}
                accent={palette.info.main}
              >
                <Clause>Members must treat fellow members, staff, and elected officials with respect. Harassment, intimidation, or abusive conduct at meetings or on cooperative platforms is strictly prohibited.</Clause>
                <Clause>Members may not use the Cooperative's name, logo, or resources for personal commercial gain or in any manner not expressly authorised by the Board.</Clause>
                <Clause>Providing false information during membership registration, loan applications, or any cooperative process constitutes misconduct and may result in immediate expulsion.</Clause>
                <Clause>Members found to have engaged in fraud, theft, or wilful damage to cooperative assets will be referred to law enforcement in addition to expulsion.</Clause>
                <Clause>Disputes between members, or between a member and the Cooperative, must first be submitted to the Disciplinary Committee for internal resolution before any external legal action is taken.</Clause>
                <Clause>Members are encouraged to participate actively in Annual General Meetings and contribute to the democratic governance of the Cooperative.</Clause>
              </SectionBlock>

              {/* 6. Privacy */}
              <SectionBlock
                id="privacy"
                icon={<LockOutlinedIcon sx={{ fontSize: 22 }} />}
                title="6. Privacy & Data Protection"
                color={palette.secondary.dark}
                accent={palette.secondary.main}
                notice="The Cooperative complies with the Nigeria Data Protection Regulation (NDPR) 2019. You may request access to, correction of, or deletion of your personal data at any time by contacting the Data Protection Officer."
                noticeType="info"
              >
                <Clause>The Cooperative collects personal data (including name, contact details, identification, and financial information) for the purpose of managing your membership and delivering cooperative services.</Clause>
                <Clause>Your data will not be sold, rented, or shared with third parties except where required by law or necessary to deliver a service you have requested (e.g. credit checks, regulatory filings).</Clause>
                <Clause>The member portal employs industry-standard 256-bit SSL encryption for all data transmitted between your device and our servers.</Clause>
                <Clause>By using the member portal, you consent to the use of session cookies necessary for authentication. No tracking or advertising cookies are used.</Clause>
                <Clause>You have the right to request a copy of all personal data held by the Cooperative, to correct inaccuracies, and to request deletion subject to legal retention obligations.</Clause>
                <Clause>The Cooperative retains financial records for a minimum of 7 years in compliance with Nigerian tax and cooperative law requirements.</Clause>
              </SectionBlock>

              {/* 7. Liability */}
              <SectionBlock
                id="liability"
                icon={<GavelIcon sx={{ fontSize: 22 }} />}
                title="7. Limitation of Liability & Dispute Resolution"
                color={palette.primary.dark}
                accent={palette.primary.main}
              >
                <Clause>The Cooperative's liability to any member for any claim arising from membership services shall not exceed the total savings balance held in that member's account at the time of the claim.</Clause>
                <Clause>The Cooperative is not liable for losses arising from a member's investment decisions, business activities, or use of loan funds outside the stated purpose.</Clause>
                <Clause>In the event of a system outage, cybersecurity incident, or force majeure event, the Cooperative will notify affected members promptly and work to restore services, but shall not be liable for consequential losses.</Clause>
                <Clause>All disputes must first be submitted in writing to the Disciplinary Committee. If unresolved within 30 days, either party may refer the matter to the Lagos State Cooperative Arbitration Panel or a mutually agreed arbitrator.</Clause>
                <Clause>These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. The courts of Lagos State shall have exclusive jurisdiction.</Clause>
              </SectionBlock>

              {/* 8. Amendments */}
              <SectionBlock
                id="amendments"
                icon={<UpdateOutlinedIcon sx={{ fontSize: 22 }} />}
                title="8. Amendments to These Terms"
                color={palette.info.dark}
                accent={palette.info.main}
              >
                <Clause>The Cooperative may amend these Terms and Conditions from time to time to reflect changes in law, regulatory requirements, or cooperative policy.</Clause>
                <Clause>Material amendments will be communicated to all active members via the member portal, email, and official notice at least 30 days before the amendment takes effect.</Clause>
                <Clause>Non-material corrections (such as typographical fixes or clarifications that do not change obligations) may be made without prior notice.</Clause>
                <Clause>Continued use of cooperative services after the effective date of an amendment constitutes acceptance of the revised terms.</Clause>
                <Clause>All previous versions of these terms are archived and available on request from the Secretary General.</Clause>
              </SectionBlock>

              {/* 9. Contact */}
              <SectionBlock
                id="contact"
                icon={<EmailOutlinedIcon sx={{ fontSize: 22 }} />}
                title="9. Contact & Legal Notices"
                color={palette.secondary.dark}
                accent={palette.secondary.main}
              >
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.85, fontWeight: 300, mb: 3 }}>
                  For questions about these terms, to exercise your data rights, or to submit a formal complaint, please contact us through any of the channels below. Legal notices must be submitted in writing and will be acknowledged within 5 business days.
                </Typography>
                <Box sx={{
                  display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3,
                }}>
                  {[
                    { icon: <EmailOutlinedIcon sx={{ fontSize: 18 }} />, label: 'General Enquiries', val: 'hello@codebridgecoop.ng', color: palette.secondary.dark },
                    { icon: <LockOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Data Protection Officer', val: 'dpo@codebridgecoop.ng', color: palette.info.dark },
                    { icon: <GavelIcon sx={{ fontSize: 18 }} />, label: 'Legal / Complaints', val: 'legal@codebridgecoop.ng', color: palette.primary.dark },
                    { icon: <PhoneOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Phone', val: '+234 901 234 5678', color: palette.secondary.dark },
                  ].map((c, i) => (
                    <Box key={i} sx={{
                      display: 'flex', gap: 1.75, p: 2.5,
                      borderRadius: `${br * 1.5}px`,
                      background: `${c.color}06`,
                      border: `1px solid ${c.color}12`,
                      transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                      '&:hover': { transform: 'translateX(4px)', borderColor: `${c.color}22` },
                    }}>
                      <Box sx={{ width: 34, height: 34, borderRadius: `${br - 2}px`, flexShrink: 0, background: `${c.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
                        {c.icon}
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: c.color, fontWeight: 600, display: 'block', mb: 0.25, fontSize: '0.72rem', letterSpacing: '0.04em' }}>{c.label}</Typography>
                        <Typography variant="body2" sx={{ color: palette.text.primary, fontWeight: 500, fontSize: '0.82rem' }}>{c.val}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box sx={{
                  p: 3, borderRadius: `${br * 1.5}px`,
                  background: palette.background.default,
                  border: `1px solid ${palette.background.default}`,
                }}>
                  <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block' }}>
                    <strong style={{ color: palette.text.primary }}>Registered Office:</strong> 14 Cooperative Drive, Victoria Island, Lagos, Nigeria.
                    Registered under the Lagos State Cooperative Societies Law. Registration No. LG-COOP-2016-04821.
                  </Typography>
                </Box>
              </SectionBlock>

            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── DOWNLOAD / PRINT BANNER ───────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}>
            <Box sx={{
              p: { xs: 3.5, md: 4.5 },
              borderRadius: `${br * 2}px`,
              background: palette.background.paper,
              border: `1px solid ${palette.background.default}`,
              display: 'flex', gap: 3, alignItems: 'flex-start',
            }}>
              <Box sx={{ width: 50, height: 50, borderRadius: `${br}px`, flexShrink: 0, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.primary.main }}>
                <ArticleOutlinedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, mb: 0.75 }}>Need a Copy?</Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 300, lineHeight: 1.7, mb: 2 }}>
                  A printed or PDF copy of these Terms and Conditions is available on request. Contact the Secretary General or email legal@codebridgecoop.ng.
                </Typography>
                <Button
                  component={Link} to="/contact"
                  variant="outlined" size="small"
                  sx={{
                    borderColor: `${palette.primary.main}30`, color: palette.primary.main,
                    borderRadius: '100px', textTransform: 'none',
                    fontFamily: typography.fontFamily,
                    '&:hover': { background: `${palette.primary.main}08` },
                  }}
                >
                  Request a Copy
                </Button>
              </Box>
            </Box>

            <Box sx={{
              p: { xs: 3.5, md: 4.5 },
              borderRadius: `${br * 2}px`,
              background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
              display: 'flex', gap: 3, alignItems: 'flex-start',
              position: 'relative', overflow: 'hidden',
            }}>
              <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
              <Box sx={{ width: 50, height: 50, borderRadius: `${br}px`, flexShrink: 0, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative', zIndex: 1 }}>
                <PrivacyTipOutlinedIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 0.75 }}>Questions About Your Rights?</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.72)', fontWeight: 300, lineHeight: 1.7, mb: 2 }}>
                  Our team is available to explain any clause in plain language. No legal jargon — just honest answers.
                </Typography>
                <Button
                  component={Link} to="/contact"
                  variant="outlined" size="small"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.35)', color: '#fff',
                    borderRadius: '100px', textTransform: 'none',
                    fontFamily: typography.fontFamily,
                    backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.08)',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.16)' },
                  }}
                >
                  Talk to Our Team
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── CTA ───────────────────────────────────────────────── */}
      <Box sx={{ position: 'relative', background: heroGradient, py: { xs: 10, md: 14 }, overflow: 'hidden' }}>
        {[{ size: 500, top: -100, right: -100 }, { size: 400, bottom: -100, left: -100 }].map((b, i) => (
          <Box key={i} sx={{ position: 'absolute', width: b.size, height: b.size, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)', top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none' }} />
        ))}
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{ color: '#fff', mb: 2, fontSize: { xs: '2.6rem', md: '3.8rem' } }}>
              Agree and<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Get Started
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 480, mx: 'auto', fontWeight: 300 }}>
              By logging in or applying for membership, you confirm you have read and agree
              to these Terms and Conditions.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mb: 6 }}>
              <Button component={Link} to="/login" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                sx={{ background: '#fff', color: palette.primary.dark, boxShadow: '0 10px 40px rgba(0,0,0,0.22)', '&:hover': { background: palette.background.default, boxShadow: '0 18px 56px rgba(0,0,0,0.28)' } }}>
                Login Now
              </Button>
              <Button component={Link} to="/contact" variant="outlined" size="large"
                sx={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.07)', '&:hover': { borderColor: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.14)' } }}>
                Ask a Question
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
                Join <Box component="span" sx={{ color: '#fff', fontWeight: 600 }}>1,240+</Box> members who've agreed
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default TermsAndConditions;