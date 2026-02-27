import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Container, Stack, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BalanceIcon from '@mui/icons-material/Balance';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// --- Intersection observer fade-in hook ---
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const About: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;

  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 50%, ${palette.secondary.dark} 100%)`;

  const values = [
    {
      icon: <VerifiedIcon sx={{ fontSize: 24 }} />,
      title: 'Integrity',
      description: 'Upholding honesty and ethical standards in every operation — from how we handle your savings to how we report our financials.',
      color: palette.primary.dark,
      accent: palette.primary.main,
    },
    {
      icon: <BalanceIcon sx={{ fontSize: 24 }} />,
      title: 'Accountability',
      description: 'Taking full responsibility for decisions with complete transparency, backed by annual audits and open member reporting.',
      color: palette.info.dark,
      accent: palette.info.main,
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 24 }} />,
      title: 'Member-First',
      description: 'Every decision centers on the needs of our members. Your growth is our growth; your wellbeing is our purpose.',
      color: palette.secondary.dark,
      accent: palette.secondary.main,
    },
    {
      icon: <RecordVoiceOverIcon sx={{ fontSize: 24 }} />,
      title: 'Transparency',
      description: 'Open communication at every level — from board decisions to interest calculations, nothing is hidden from members.',
      color: palette.primary.dark,
      accent: palette.success.main,
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 24 }} />,
      title: 'Mutual Support',
      description: 'Collective growth where every member rises together. We celebrate individual wins as community achievements.',
      color: palette.info.dark,
      accent: palette.info.light,
    },
  ];

  const team = [
    {
      name: 'Adebayo Okafor',
      role: 'Chairman',
      initials: 'AO',
      color: palette.primary.dark,
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      bio: 'Over 15 years in cooperative financial management and community development.',
    },
    {
      name: 'Ngozi Eze',
      role: 'Secretary',
      initials: 'NE',
      color: palette.info.dark,
      img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
      bio: 'Expert in cooperative governance and member relations with a decade of experience.',
    },
    {
      name: 'Chidi Amadi',
      role: 'Treasurer',
      initials: 'CA',
      color: palette.secondary.dark,
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
      bio: 'Certified accountant managing over ₦1.2B in cooperative funds with precision.',
    },
    {
      name: 'Fatima Bello',
      role: 'Loan Officer',
      initials: 'FB',
      color: palette.info.dark,
      img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=200&q=80',
      bio: 'Specialist in credit assessment ensuring fair and fast loan approvals for all members.',
    },
  ];

  const milestones = [
    { year: '2016', title: 'Founded', desc: 'CodeBridge registered as a multi-purpose cooperative society with 42 founding members.' },
    { year: '2018', title: 'First Major Loan', desc: 'Disbursed our first major business loan batch totalling ₦12M to 80 members.' },
    { year: '2020', title: '500 Members', desc: 'Crossed the 500-member mark, expanding welfare and emergency support programs.' },
    { year: '2022', title: 'Digital Platform', desc: 'Launched our digital member portal for real-time savings and loan tracking.' },
    { year: '2024', title: '1,200+ Members', desc: 'Reached 1,240 active members with ₦1.2B total disbursed and counting.' },
  ];

  const principles = [
    'Voluntary and open membership for all qualified individuals',
    'Democratic member control — one member, one vote',
    'Member economic participation and equitable contribution',
    'Autonomy and independence from external interference',
    'Education, training, and information for all members',
    'Cooperation among cooperatives for collective growth',
    'Concern for our wider community and environment',
  ];

  return (
    <Box sx={{ fontFamily: typography.fontFamily, overflowX: 'hidden', background: palette.background.paper }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: heroGradient,

        overflow: 'hidden',
                paddingTop: { xs: 3, md: 4 },
        paddingBottom: { xs: 12, md: 20 },
      }}>
        {/* Blobs */}
        {[
          { size: 600, top: -180, right: -180, opacity: 0.1 },
          { size: 400, bottom: -120, left: -120, opacity: 0.08 },
          { size: 250, top: '35%', left: '45%', opacity: 0.05 },
        ].map((b, i) => (
          <Box key={i} sx={{
            position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,255,255,${b.opacity * 2}), transparent 70%)`,
            top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none',
          }} />
        ))}

                {/* Shapes */}
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <Box sx={{
            position: 'absolute', top: '-100px', right: '-100px',
            width: { xs: 300, md: 500 }, height: { xs: 300, md: 500 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)',
            border: '1px solid rgba(255,255,255,0.1)',
          }} />
          <Box sx={{
            position: 'absolute', bottom: '-60px', left: '-60px',
            width: { xs: 220, md: 360 }, height: { xs: 220, md: 360 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)',
          }} />
          {/* Leaf blob */}
          <Box sx={{
            position: 'absolute', top: '20%', left: '55%',
            width: 160, height: 160,
            borderRadius: '70% 30% 60% 40% / 50% 60% 40% 50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            transform: 'rotate(30deg)',
          }} />
          {[...Array(5)].map((_, i) => (
            <Box key={i} sx={{
              position: 'absolute',
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.4)',
              top: `${20 + i * 14}%`, right: `${8 + (i % 3) * 6}%`,
              animation: `ap${i} ${2.5 + i * 0.3}s ease-in-out ${i * 0.3}s infinite`,
              [`@keyframes ap${i}`]: {
                '0%,100%': { opacity: 0.2, transform: 'scale(1)' },
                '50%': { opacity: 0.9, transform: 'scale(1.3)' },
              },
            }} />
          ))}
        </Box>

        {/* Grain */}
        <Box sx={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundSize: '200px', opacity: 0.6,
        }} />

        {/* Animated dots */}
        {[...Array(7)].map((_, i) => (
          <Box key={i} sx={{
            position: 'absolute', width: 4, height: 4, borderRadius: '50%',
            background: 'rgba(255,255,255,0.5)',
            top: `${12 + i * 12}%`, right: `${5 + (i % 3) * 5}%`,
            animation: `dot${i} ${3 + i * 0.35}s ease-in-out ${i * 0.3}s infinite`,
            [`@keyframes dot${i}`]: {
              '0%,100%': { opacity: 0.2, transform: 'scale(1)' },
              '50%': { opacity: 1, transform: 'scale(1.5)' },
            },
          }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Overline badge */}
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
                Registered Cooperative Society · Est. 2016
              </Typography>
            </Box>
          </Box>

          {/* Centered headline */}
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 8 }}>
            <Typography variant="h1" sx={{
              color: '#fff',
              fontSize: { xs: '3rem', sm: '3.8rem', md: '5rem' },
              mb: 3,
              animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) forwards',
              '@keyframes heroUp': {
                from: { opacity: 0, transform: 'translateY(36px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}>
              Our Story,<br />
              <Box component="span" sx={{
                fontStyle: 'italic', fontWeight: 300,
                background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Our Purpose
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'rgba(255,255,255,0.68)', maxWidth: 540, mx: 'auto', fontWeight: 300,
              animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) 0.15s forwards', opacity: 0,
            }}>
              A duly registered cooperative society committed to empowering members through
              collective savings, accessible credit, and sustainable financial solutions since 2016.
            </Typography>
          </Box>

          {/* Stat cards grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: { xs: 2, md: 3 },
            animation: 'heroUp 1s cubic-bezier(0.22,1,0.36,1) 0.3s forwards', opacity: 0,
          }}>
            {[
              { value: '2016', label: 'Founded', sub: 'Years of trust', icon: <CalendarTodayIcon sx={{ fontSize: 18 }} /> },
              { value: '1,240+', label: 'Members', sub: 'Active & growing', icon: <GroupsIcon sx={{ fontSize: 18 }} /> },
              { value: '₦1.2B', label: 'Disbursed', sub: 'Total loans given', icon: <TrendingUpIcon sx={{ fontSize: 18 }} /> },
              { value: '98%', label: 'Approval Rate', sub: 'Loan success', icon: <EmojiEventsIcon sx={{ fontSize: 18 }} /> },
            ].map((s, i) => (
              <Box key={i} sx={{
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: `${(shape.borderRadius as number) * 2}px`, p: { xs: 2.5, md: 3 },
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': { background: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: palette.secondary.light }}>
                  {s.icon}
                  <Typography variant="caption" sx={{ color: palette.secondary.light, fontWeight: 600, letterSpacing: '0.04em' }}>
                    {s.label}
                  </Typography>
                </Box>
                <Typography variant="h3" sx={{ color: '#fff', fontSize: { xs: '1.8rem', md: '2.2rem' }, lineHeight: 1 }}>
                  {s.value}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mt: 0.5 }}>
                  {s.sub}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>

        {/* Wave */}
        <Box sx={{
          position: 'absolute', bottom: -1, left: 0, right: 0,
          height: { xs: 50, md: 72 },
          background: palette.background.default,
          clipPath: 'ellipse(58% 100% at 50% 100%)',
        }} />
      </Box>


      {/* ── WHO WE ARE ────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 7, md: 8 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 8, md: 12 },
            alignItems: 'center',
          }}>
            {/* Image collage */}
            <Box sx={{ position: 'relative', height: 540, display: { xs: 'none', md: 'block' } }}>
              <Box sx={{
                position: 'absolute', top: 0, left: 0, width: '62%', height: '68%',
                borderRadius: `${(shape.borderRadius as number) * 2}px`, overflow: 'hidden',
                boxShadow: '0 24px 72px rgba(0,0,0,0.1)',
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&q=80"
                  alt="Community gathering"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              <Box sx={{
                position: 'absolute', bottom: 0, right: 0, width: '50%', height: '52%',
                borderRadius: `${(shape.borderRadius as number) * 2}px`, overflow: 'hidden',
                boxShadow: '0 24px 72px rgba(0,0,0,0.12)',
                border: `5px solid ${palette.background.default}`,
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=400&q=80"
                  alt="Team working"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              {/* Third small image */}
              <Box sx={{
                position: 'absolute', top: '4%', right: '-2%', width: '40%', height: '38%',
                borderRadius: `${(shape.borderRadius as number) * 2}px`, overflow: 'hidden',
                boxShadow: '0 16px 48px rgba(0,0,0,0.1)',
                border: `4px solid ${palette.background.default}`,
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&q=80"
                  alt="Financial meeting"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
              {/* Floating years badge */}
              <Box sx={{
                position: 'absolute', top: '60%', left: '3%',
                background: palette.background.paper, borderRadius: `${shape.borderRadius}px`,
                px: 2.5, py: 1.75,
                boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
                display: 'flex', alignItems: 'center', gap: 1.5,
              }}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: `${(shape.borderRadius as number) - 2}px`,
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <EmojiEventsIcon sx={{ fontSize: 18, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: palette.text.primary, lineHeight: 1 }}>8+ Years</Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>of community trust</Typography>
                </Box>
              </Box>
              {/* Decorative ring */}
              <Box sx={{
                position: 'absolute', bottom: '26%', left: '56%',
                width: 80, height: 80, borderRadius: '50%',
                background: `${palette.primary.light}15`,
                border: `2px solid ${palette.primary.light}25`,
              }} />
            </Box>

            {/* Text */}
            <Box>
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}12`,
                border: `1px solid ${palette.primary.main}25`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Who We Are</Typography>
              </Box>
              <Typography variant="h2" sx={{
                color: palette.text.primary,
                fontSize: { xs: '2.2rem', md: '3rem' },
                lineHeight: 1.15, mb: 3,
              }}>
                Built on Cooperative<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>
                  Principles
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, mb: 2 }}>
                CodeBridge Multi-Purpose Cooperative Society is a duly registered cooperative society
                committed to empowering its members through collective savings, access to credit, and
                sustainable financial solutions.
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, mb: 4 }}>
                We operate on the internationally recognized ICA cooperative principles of transparency,
                accountability, equity, and mutual benefit — ensuring every member's voice matters and
                every naira is managed with integrity.
              </Typography>

              <Stack spacing={2} sx={{ mb: 5 }}>
                {[
                  'Registered under Nigerian Cooperative Law',
                  'Annual general meetings with full financial disclosure',
                  'Independent external audits every year',
                  'Member-elected board of directors',
                ].map((point, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0, mt: 0.2,
                      background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: palette.text.primary, fontWeight: 400, fontSize: '0.93rem' }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Button
                component={Link} to="/login" variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  boxShadow: `0 10px 30px ${palette.primary.main}40`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${palette.primary.dark}, ${palette.primary.main})`,
                    boxShadow: `0 16px 40px ${palette.primary.main}50`,
                  },
                }}
              >
                Join Our Community
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── VISION & MISSION ──────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 9 }}>
            <Box sx={{
              display: 'inline-block', px: 2.5, py: 0.6,
              background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
              borderRadius: '100px', mb: 2.5,
            }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Where We're Going</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              Vision & Mission
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, maxWidth: 520, mx: 'auto', fontWeight: 300 }}>
              Two pillars that guide every decision we make, every product we build, every member we serve.
            </Typography>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}>
            {[
              {
                icon: <VisibilityIcon sx={{ fontSize: 28 }} />,
                label: 'Our Vision',
                color: palette.primary.dark,
                accent: palette.primary.main,
                bg: '#E8F5E9',
                text: 'To be a trusted cooperative society that empowers members financially and promotes sustainable economic growth across communities.',
                extra: 'We envision a Nigeria where every working person has access to dignified financial services, supported by the strength of their community.',
              },
              {
                icon: <RocketLaunchIcon sx={{ fontSize: 28 }} />,
                label: 'Our Mission',
                color: palette.info.dark,
                accent: palette.info.main,
                bg: '#E0F2F1',
                text: 'To mobilize savings, provide accessible credit facilities, and deliver welfare support to members through efficient and transparent cooperative management.',
                extra: 'We execute this mission daily through disciplined financial stewardship, member education, and a culture of collective accountability.',
              },
            ].map((item, i) => (
              <Box key={i} sx={{
                position: 'relative', p: { xs: 4, md: 5 },
                background: palette.background.paper,
                borderRadius: `${(shape.borderRadius as number) * 2}px`,
                border: `1px solid ${item.bg}`,
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 30px 70px ${item.color}18`,
                  borderColor: 'transparent',
                  background: `${item.bg}55`,
                  '& .vm-icon': { background: `linear-gradient(135deg, ${item.color}, ${item.accent})`, color: '#fff' },
                },
              }}>
                {/* Top accent bar */}
                <Box sx={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                  background: `linear-gradient(90deg, ${item.color}, ${item.accent})`,
                }} />
                {/* Corner tint */}
                <Box sx={{
                  position: 'absolute', top: 0, right: 0, width: 120, height: 120,
                  background: `radial-gradient(circle at top right, ${item.color}10, transparent 70%)`,
                  borderRadius: `0 ${(shape.borderRadius as number) * 2}px 0 100%`,
                }} />

                <Box className="vm-icon" sx={{
                  width: 56, height: 56, borderRadius: `${shape.borderRadius}px`,
                  background: `${item.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, mb: 3, transition: 'all 0.4s',
                }}>
                  {item.icon}
                </Box>
                <Typography variant="h4" sx={{ color: palette.text.primary, mb: 2 }}>
                  {item.label}
                </Typography>
                <Typography variant="body1" sx={{ color: palette.text.primary, mb: 2, fontWeight: 400, lineHeight: 1.75 }}>
                  {item.text}
                </Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8 }}>
                  {item.extra}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── CORE PRINCIPLES STRIP ─────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            background: `linear-gradient(135deg, ${palette.primary.dark}, ${palette.primary.main} 60%, ${palette.secondary.dark})`,
            borderRadius: `${(shape.borderRadius as number) * 2.5}px`, p: { xs: 4, md: 6 },
            display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 5, alignItems: 'start', position: 'relative', overflow: 'hidden',
          }}>
            <Box sx={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)', pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', bottom: -80, left: '45%', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)', pointerEvents: 'none' }} />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="overline" sx={{ color: palette.secondary.light, display: 'block', mb: 1.5 }}>
                ICA Principles
              </Typography>
              <Typography variant="h3" sx={{ color: '#fff', fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 2 }}>
                How We Operate<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.secondary.light }}>
                  Every Day
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300, maxWidth: 380 }}>
                We are guided by the seven internationally recognized principles of cooperative societies,
                adopted by the International Cooperative Alliance.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'relative', zIndex: 1 }}>
              {principles.map((p, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 15, color: palette.secondary.light }} />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 400, pt: 0.4 }}>
                    {p}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── CORE VALUES ───────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 9 }}>
            <Box sx={{
              display: 'inline-block', px: 2.5, py: 0.6,
              background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
              borderRadius: '100px', mb: 2.5,
            }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>What Drives Us</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              Our Core Values
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, maxWidth: 500, mx: 'auto', fontWeight: 300 }}>
              Five values that aren't just words on a wall — they shape how we treat every member, every day.
            </Typography>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' },
            gap: 3,
          }}>
            {values.map((v, i) => (
              <Box key={i} sx={{
                position: 'relative', p: { xs: 3.5, md: 4 },
                borderRadius: `${(shape.borderRadius as number) * 2}px`,
                border: `1px solid ${palette.background.default}`,
                background: palette.background.paper,
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                ...(i === 4 ? { gridColumn: { md: '2 / 3' } } : {}),
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 24px 60px ${v.color}1a`,
                  borderColor: 'transparent',
                  '& .cv-icon': { background: `linear-gradient(135deg, ${v.color}, ${v.accent})`, color: '#fff', transform: 'scale(1.08)' },
                  '& .cv-num': { color: `${v.color}22 !important` },
                },
              }}>
                {/* Background number */}
                <Typography className="cv-num" sx={{
                  position: 'absolute', top: 12, right: 20,
                  fontFamily: typography.fontFamily,
                  fontSize: '5rem', fontWeight: 700, lineHeight: 1,
                  color: `${v.color}0e`,
                  transition: 'color 0.4s',
                  userSelect: 'none', pointerEvents: 'none',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </Typography>
                {/* Corner tint */}
                <Box sx={{
                  position: 'absolute', top: 0, right: 0, width: 80, height: 80,
                  background: `radial-gradient(circle at top right, ${v.color}08, transparent 70%)`,
                  borderRadius: `0 ${(shape.borderRadius as number) * 2}px 0 100%`,
                }} />

                <Box className="cv-icon" sx={{
                  width: 54, height: 54, borderRadius: `${shape.borderRadius}px`,
                  background: `${v.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: v.color, mb: 3,
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  {v.icon}
                </Box>
                <Typography variant="h5" sx={{ color: palette.text.primary, mb: 1.5 }}>
                  {v.title}
                </Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8 }}>
                  {v.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── TIMELINE ──────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 9 }}>
            <Box sx={{
              display: 'inline-block', px: 2.5, py: 0.6,
              background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
              borderRadius: '100px', mb: 2.5,
            }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Our Journey</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              How Far We've Come
            </Typography>
          </Box>

          {/* Desktop timeline */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative' }}>
            {/* Center line */}
            <Box sx={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: 2, transform: 'translateX(-50%)',
              background: `linear-gradient(to bottom, transparent, ${palette.primary.main}40, ${palette.primary.main}60, ${palette.primary.main}40, transparent)`,
            }} />

            {milestones.map((m, i) => (
              <Box key={i} sx={{
                display: 'flex',
                justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                mb: 5, position: 'relative',
              }}>
                {/* Center dot */}
                <Box sx={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 16, height: 16, borderRadius: '50%', zIndex: 2,
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  boxShadow: `0 0 0 4px ${palette.background.default}, 0 0 0 6px ${palette.primary.main}30`,
                }} />

                <Box sx={{
                  width: '44%',
                  p: 3.5,
                  background: palette.background.paper,
                  borderRadius: `${(shape.borderRadius as number) * 2}px`,
                  border: `1px solid ${palette.background.default}`,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 20px 50px ${palette.primary.main}12`,
                    borderColor: `${palette.primary.main}20`,
                  },
                }}>
                  <Box sx={{
                    display: 'inline-flex', px: 2, py: 0.5, mb: 1.5,
                    background: `${palette.primary.main}10`,
                    borderRadius: '100px',
                  }}>
                    <Typography variant="overline" sx={{ color: palette.primary.main }}>{m.year}</Typography>
                  </Box>
                  <Typography variant="h5" sx={{ color: palette.text.primary, mb: 1 }}>{m.title}</Typography>
                  <Typography variant="body2" sx={{ color: palette.text.secondary }}>{m.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Mobile timeline */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', gap: 3, position: 'relative' }}>
            <Box sx={{
              position: 'absolute', left: 20, top: 0, bottom: 0, width: 2,
              background: `linear-gradient(to bottom, transparent, ${palette.primary.main}40, ${palette.primary.main}40, transparent)`,
            }} />
            {milestones.map((m, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 3, pl: 1 }}>
                <Box sx={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 1.5 }}>
                  <Box sx={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                    boxShadow: `0 0 0 3px ${palette.background.default}, 0 0 0 5px ${palette.primary.main}30`,
                    flexShrink: 0, zIndex: 1,
                  }} />
                </Box>
                <Box sx={{
                  flex: 1, p: 3, background: palette.background.paper,
                  borderRadius: `${(shape.borderRadius as number) * 1.5}px`,
                  border: `1px solid ${palette.background.default}`,
                }}>
                  <Typography variant="overline" sx={{ color: palette.primary.main }}>{m.year}</Typography>
                  <Typography variant="h6" sx={{ color: palette.text.primary, mt: 0.5, mb: 1 }}>{m.title}</Typography>
                  <Typography variant="body2" sx={{ color: palette.text.secondary }}>{m.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── LEADERSHIP ────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 9 }}>
            <Box sx={{
              display: 'inline-block', px: 2.5, py: 0.6,
              background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
              borderRadius: '100px', mb: 2.5,
            }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Meet the Team</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              Our Leadership
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, maxWidth: 500, mx: 'auto', fontWeight: 300 }}>
              Experienced professionals dedicated to growing a cooperative that truly serves its members.
            </Typography>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: { xs: 2.5, md: 3 },
          }}>
            {team.map((member, i) => (
              <Box key={i} sx={{
                background: palette.background.paper,
                borderRadius: `${(shape.borderRadius as number) * 2}px`,
                border: `1px solid ${palette.background.default}`,
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 24px 60px ${member.color}18`,
                  borderColor: 'transparent',
                  '& .member-img': { transform: 'scale(1.06)' },
                },
              }}>
                {/* Photo */}
                <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <Box className="member-img" component="img"
                    src={member.img} alt={member.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                  {/* Role badge overlay */}
                  <Box sx={{
                    position: 'absolute', bottom: 12, left: 12,
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                    borderRadius: '100px', px: 1.5, py: 0.4,
                  }}>
                    <Typography variant="caption" sx={{ color: '#fff', fontWeight: 500 }}>{member.role}</Typography>
                  </Box>
                </Box>
                {/* Info */}
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="h6" sx={{ color: palette.text.primary, mb: 0.5 }}>{member.name}</Typography>
                  <Typography variant="caption" sx={{ color: member.color, fontWeight: 600, display: 'block', mb: 1.5, letterSpacing: '0.04em' }}>
                    {member.role}
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block' }}>
                    {member.bio}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── IMPACT GALLERY ────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Typography variant="h2" sx={{ color: palette.text.primary, mb: 1.5, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              Our Community in Action
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300 }}>
              Moments of connection, growth, and shared financial achievement
            </Typography>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(12, 1fr)' },
            gridTemplateRows: { md: 'repeat(2, 220px)' },
            gap: 2.5,
          }}>
            {[
              { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', col: '1 / 5', row: '1 / 3' },
              { src: 'https://images.unsplash.com/photo-1565945887714-d5139f4eb0ce?w=400&q=80', col: '5 / 9', row: '1 / 2' },
              { src: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&q=80', col: '9 / 13', row: '1 / 2' },
              { src: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=400&q=80', col: '5 / 9', row: '2 / 3' },
              { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80', col: '9 / 13', row: '2 / 3' },
            ].map((img, i) => (
              <Box key={i} sx={{
                borderRadius: `${(shape.borderRadius as number) * 1.5}px`, overflow: 'hidden',
                gridColumn: { xs: undefined, md: img.col },
                gridRow: { xs: undefined, md: img.row },
                height: { xs: 160, md: 'auto' },
                position: 'relative',
                '&::after': {
                  content: '""', position: 'absolute', inset: 0,
                  background: `linear-gradient(to bottom, transparent 50%, ${palette.primary.dark}60)`,
                  opacity: 0, transition: 'opacity 0.4s',
                },
                '&:hover::after': { opacity: 1 },
                '&:hover img': { transform: 'scale(1.06)' },
              }}>
                <Box component="img" src={img.src} alt={`Community ${i + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── QUOTE ─────────────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="md">
          <Box sx={{
            background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
            borderRadius: `${(shape.borderRadius as number) * 2.5}px`,
            p: { xs: 5, md: 8 },
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', bottom: -60, left: -40, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)', pointerEvents: 'none' }} />

            <FormatQuoteIcon sx={{ fontSize: 52, color: 'rgba(255,255,255,0.2)', mb: 2 }} />
            <Typography variant="h3" sx={{
              color: '#fff', fontStyle: 'italic', fontWeight: 300,
              fontSize: { xs: '1.4rem', md: '1.9rem' },
              lineHeight: 1.65, mb: 4, position: 'relative', zIndex: 1,
            }}>
              "We don't just manage money — we build futures. CodeBridge exists to prove that
              financial empowerment is not a privilege of the wealthy, but a right of every
              hardworking Nigerian."
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <Box sx={{
                width: 48, height: 48, borderRadius: '50%', overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0,
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                  alt="Chairman" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>Adebayo Okafor</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)' }}>Chairman, CodeBridge Cooperative</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── CONTACT STRIP ─────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ color: palette.text.primary, mb: 1.5, fontSize: { xs: '2rem', md: '2.8rem' } }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300 }}>
              Have questions? We'd love to hear from you.
            </Typography>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3,1fr)' },
            gap: 3,
          }}>
            {[
              { icon: <LocationOnIcon sx={{ fontSize: 22 }} />, label: 'Visit Us', val: '14 Cooperative Drive, Victoria Island, Lagos', color: palette.primary.main },
              { icon: <EmailIcon sx={{ fontSize: 22 }} />, label: 'Email Us', val: 'hello@codebridgecoop.ng', color: palette.info.main },
              { icon: <PhoneIcon sx={{ fontSize: 22 }} />, label: 'Call Us', val: '+234 901 234 5678', color: palette.secondary.dark },
            ].map((c, i) => (
              <Box key={i} sx={{
                p: 3.5, background: palette.background.paper,
                borderRadius: `${(shape.borderRadius as number) * 1.5}px`,
                border: `1px solid ${palette.background.default}`,
                display: 'flex', alignItems: 'flex-start', gap: 2.5,
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 16px 40px ${c.color}12`,
                  borderColor: `${c.color}20`,
                },
              }}>
                <Box sx={{
                  width: 46, height: 46, borderRadius: `${shape.borderRadius}px`, flexShrink: 0,
                  background: `${c.color}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.color,
                }}>
                  {c.icon}
                </Box>
                <Box>
                  <Typography variant="overline" sx={{ color: c.color, display: 'block', mb: 0.5 }}>{c.label}</Typography>
                  <Typography variant="body2" sx={{ color: palette.text.primary, fontWeight: 400, lineHeight: 1.6 }}>{c.val}</Typography>
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
          width: 260, height: 260, borderRadius: '50%', overflow: 'hidden',
          opacity: 0.1, display: { xs: 'none', md: 'block' }, pointerEvents: 'none',
        }}>
          <Box component="img"
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=520&q=80"
            alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{
              color: '#fff', mb: 2,
              fontSize: { xs: '2.6rem', md: '3.8rem' },
            }}>
              Become Part of<br />
              <Box component="span" sx={{
                fontStyle: 'italic', fontWeight: 300,
                background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Our Community
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 520, mx: 'auto', fontWeight: 300,
            }}>
              Join a cooperative that truly cares about your financial growth and wellbeing.
              Over 1,200 members already trust us — and we'd love for you to be next.
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
                Get Started
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

            {/* Social proof avatars */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex' }}>
                {[
                  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80',
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=80',
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
                {' '}members growing with us
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default About;