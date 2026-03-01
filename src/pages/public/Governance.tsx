import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, useTheme, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import GavelIcon from '@mui/icons-material/Gavel';
import BalanceIcon from '@mui/icons-material/Balance';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

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

const Governance: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`;

  const principles = [
    { num: '01', title: 'Voluntary & Open Membership', icon: <EmojiPeopleIcon sx={{ fontSize: 22 }} />, desc: 'Cooperatives are voluntary organisations, open to all persons able to use their services without gender, social, racial, political or religious discrimination.', color: palette.primary.dark, accent: palette.primary.main },
    { num: '02', title: 'Democratic Member Control', icon: <HowToVoteIcon sx={{ fontSize: 22 }} />, desc: 'Cooperatives are democratic organisations controlled by their members, who actively participate in setting policies and making decisions. Members have equal voting rights.', color: palette.info.dark, accent: palette.info.main },
    { num: '03', title: 'Member Economic Participation', icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 22 }} />, desc: 'Members contribute equitably to the capital of their cooperative. Surpluses may be allocated to developing the cooperative, benefiting members in proportion to transactions.', color: palette.secondary.dark, accent: palette.secondary.main },
    { num: '04', title: 'Autonomy & Independence', icon: <BalanceIcon sx={{ fontSize: 22 }} />, desc: 'Cooperatives are autonomous, self-help organisations controlled by their members. External agreements maintain democratic control and cooperative autonomy.', color: palette.primary.dark, accent: palette.primary.light },
    { num: '05', title: 'Education, Training & Information', icon: <ArticleOutlinedIcon sx={{ fontSize: 22 }} />, desc: 'Cooperatives provide education and training for members, elected representatives, managers and employees so they can contribute effectively to the cooperative.', color: palette.info.dark, accent: palette.info.light },
    { num: '06', title: 'Cooperation Among Cooperatives', icon: <HandshakeOutlinedIcon sx={{ fontSize: 22 }} />, desc: 'Cooperatives serve members most effectively and strengthen the cooperative movement by working together through local, national, regional and international structures.', color: palette.secondary.dark, accent: palette.secondary.main },
    { num: '07', title: 'Concern for Community', icon: <GroupsIcon sx={{ fontSize: 22 }} />, desc: 'While focusing on member needs, cooperatives work for the sustainable development of their communities through policies approved by their members.', color: palette.primary.dark, accent: palette.primary.main },
  ];

  const boardMembers = [
    { name: 'Chief Emeka Okonkwo', role: 'Chairman', tenure: 'Since 2016', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', color: palette.primary.dark },
    { name: 'Mrs Ngozi Adeleke', role: 'Vice Chairperson', tenure: 'Since 2018', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80', color: palette.info.dark },
    { name: 'Dr Femi Babatunde', role: 'Secretary General', tenure: 'Since 2020', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', color: palette.secondary.dark },
    { name: 'Mrs Amaka Eze', role: 'Treasurer', tenure: 'Since 2019', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', color: palette.primary.dark },
    { name: 'Mr Tunde Oladele', role: 'Loans Committee Chair', tenure: 'Since 2021', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80', color: palette.info.dark },
    { name: 'Mrs Bimpe Afolabi', role: 'Welfare Officer', tenure: 'Since 2022', img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=200&q=80', color: palette.secondary.dark },
  ];

  const agmTimeline = [
    { year: '2024', event: '8th Annual General Meeting', highlight: 'Approved ₦250M loan disbursement target', outcome: '98% member approval', color: palette.primary.dark },
    { year: '2023', event: '7th Annual General Meeting', highlight: 'Elected new Loans Committee and reviewed dividends', outcome: '94% attendance rate', color: palette.info.dark },
    { year: '2022', event: '6th Annual General Meeting', highlight: 'Ratified updated cooperative bylaws', outcome: 'Unanimous bylaw passage', color: palette.secondary.dark },
    { year: '2021', event: '5th Annual General Meeting', highlight: 'Launched digital member portal initiative', outcome: '120% savings growth', color: palette.primary.dark },
    { year: '2020', event: '4th Annual General Meeting', highlight: 'COVID-19 welfare fund established', outcome: '₦12M welfare disbursed', color: palette.info.dark },
  ];

  const committees = [
    { icon: <GavelIcon sx={{ fontSize: 22 }} />, name: 'Board of Directors', desc: 'Elected triennially by members at the AGM. Oversees policy, strategy, and executive management accountability.', members: 7, color: palette.primary.dark, accent: palette.primary.main },
    { icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 22 }} />, name: 'Loans Committee', desc: 'Reviews and approves loan applications, sets credit policy, and monitors the loan portfolio performance.', members: 5, color: palette.info.dark, accent: palette.info.main },
    { icon: <AssessmentOutlinedIcon sx={{ fontSize: 22 }} />, name: 'Audit Committee', desc: 'Independent oversight of financial reporting, internal controls, and compliance with cooperative regulations.', members: 3, color: palette.secondary.dark, accent: palette.secondary.main },
    { icon: <SecurityOutlinedIcon sx={{ fontSize: 22 }} />, name: 'Disciplinary Committee', desc: 'Handles member disputes, defaults, and conducts investigations in accordance with the cooperative\'s bylaws.', members: 4, color: palette.info.dark, accent: '#00897B' },
  ];

  const transparency = [
    { icon: <ArticleOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Annual Reports', desc: 'Audited financial statements published and distributed to all members within 90 days of financial year-end.', color: palette.primary.dark, accent: palette.primary.main },
    { icon: <HowToVoteIcon sx={{ fontSize: 22 }} />, title: 'AGM Minutes', desc: 'Full meeting minutes and resolutions from every Annual General Meeting are archived and available on request.', color: palette.info.dark, accent: palette.info.main },
    { icon: <BalanceIcon sx={{ fontSize: 22 }} />, title: 'Bylaws & Rules', desc: 'Our cooperative bylaws, standing rules, and committee charters are available to any member on demand.', color: palette.secondary.dark, accent: palette.secondary.main },
    { icon: <WorkspacePremiumOutlinedIcon sx={{ fontSize: 22 }} />, title: 'Dividend Notices', desc: 'Dividend declarations, rates, and payment schedules communicated to members via the portal and official notices.', color: palette.primary.dark, accent: palette.primary.light },
  ];

  const testimonials = [
    { quote: "I voted at the AGM for the first time last year and actually saw my suggestion adopted in the minutes. This cooperative is genuinely member-run.", name: 'Emeka Adeyemi', role: 'Member since 2019', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', color: palette.primary.dark, tag: 'Democratic Control' },
    { quote: "The annual report is detailed, independently audited, and written in plain language. I trust where my money is and exactly what it's doing.", name: 'Adaeze Nwosu', role: 'Member since 2018', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80', color: palette.info.dark, tag: 'Financial Transparency' },
    { quote: "When I had a loan dispute, the Disciplinary Committee resolved it fairly within two weeks. The process was clear and I felt heard.", name: 'Kelechi Balogun', role: 'Member since 2021', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', color: palette.secondary.dark, tag: 'Fair Process' },
  ];

  const { ref: principlesRef, visible: principlesVisible } = useFadeIn(0.05);
  const { ref: boardRef, visible: boardVisible } = useFadeIn();
  const { ref: committeeRef, visible: committeeVisible } = useFadeIn();
  const { ref: timelineRef, visible: timelineVisible } = useFadeIn();
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
                Member-Owned · Democratically Controlled
              </Typography>
            </Box>
          </Box>

          {/* Split layout */}
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
                Governance<br />
                <Box component="span" sx={{
                  fontStyle: 'italic', fontWeight: 300,
                  background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  & Accountability
                </Box>
              </Typography>
              <Typography variant="subtitle1" sx={{
                color: 'rgba(255,255,255,0.68)', mb: 5, maxWidth: 480, fontWeight: 300,
              }}>
                CodeBridge is governed by its members. Every policy, every election, every naira —
                managed transparently under the ICA cooperative principles and Nigerian cooperative law.
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
                  Member Portal
                </Button>
                <Button
                  component={Link} to="/about" variant="outlined" size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.35)', color: '#fff',
                    backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.06)',
                    '&:hover': { borderColor: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.12)' },
                  }}
                >
                  About Us
                </Button>
              </Stack>
            </Box>

            {/* Right: 4 governance pillars */}
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
                { icon: <HowToVoteIcon sx={{ fontSize: 22 }} />, val: '1 Member', sub: '1 Vote — always' },
                { icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 22 }} />, val: 'Annual', sub: 'General Meetings' },
                { icon: <PeopleOutlineIcon sx={{ fontSize: 22 }} />, val: '7-Member', sub: 'Elected Board' },
                { icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 22 }} />, val: 'ICA', sub: '7 Principles' },
              ].map((s, i) => (
                <Box key={i} sx={{
                  background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: `${br * 2}px`, p: 2.5,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': { background: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' },
                }}>
                  <Box sx={{
                    width: 38, height: 38, borderRadius: `${br - 2}px`, mb: 1.5,
                    background: 'rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: palette.secondary.light,
                  }}>
                    {s.icon}
                  </Box>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '1.15rem', fontWeight: 700, color: '#fff', lineHeight: 1, mb: 0.4 }}>
                    {s.val}
                  </Typography>
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


      {/* ── ICA PRINCIPLES ────────────────────────────────────── */}
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
              ref={principlesRef}
              sx={{
                opacity: principlesVisible ? 1 : 0,
                transform: principlesVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>ICA Framework</Typography>
              </Box>
              <Typography variant="h2" sx={{
                color: palette.text.primary,
                fontSize: { xs: '2.2rem', md: '3rem' },
                lineHeight: 1.15, mb: 2,
              }}>
                7 Cooperative<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>
                  Principles
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 420, mb: 3 }}>
                CodeBridge operates under the seven universally recognised International Cooperative
                Alliance principles — the ethical foundation of every cooperative worldwide.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3 }}>
                {[
                  { val: '7', label: 'Core Principles' },
                  { val: 'ICA', label: 'Certified Framework' },
                  { val: '2016', label: 'Est. Under These Rules' },
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

            {/* Photo with floating badge */}
            <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
              <Box sx={{
                borderRadius: `${br * 2}px`, overflow: 'hidden', height: 340,
                '&:hover img': { transform: 'scale(1.04)' },
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80"
                  alt="Cooperative governance"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
                <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${palette.primary.dark}22, transparent 60%)` }} />
              </Box>
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
                  <VerifiedUserOutlinedIcon sx={{ fontSize: 18, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, lineHeight: 1 }}>Fully Compliant</Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>Nigerian Cooperative Law</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Principles grid */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {principles.map((p, i) => (
              <Box key={i} sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '72px 1fr' },
                gap: { xs: 2, md: 4 },
                p: { xs: 3, md: 4 },
                borderRadius: `${br * 2}px`,
                background: palette.background.paper,
                border: `1px solid ${palette.background.default}`,
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                position: 'relative', overflow: 'hidden',
                '&:hover': {
                  transform: 'translateX(6px)',
                  boxShadow: `0 16px 50px ${p.color}0e`,
                  borderColor: `${p.color}18`,
                  '& .pr-icon': {
                    background: `linear-gradient(135deg, ${p.color}, ${p.accent})`,
                    color: '#fff',
                  },
                },
              }}>
                {/* Accent left bar */}
                <Box sx={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
                  background: `linear-gradient(180deg, ${p.color}, ${p.accent})`,
                  borderRadius: `${br * 2}px 0 0 ${br * 2}px`,
                }} />

                {/* Number + icon */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, alignItems: { xs: 'center', md: 'flex-start' }, gap: 1.5, pl: { xs: 1, md: 0.5 } }}>
                  <Box className="pr-icon" sx={{
                    width: 48, height: 48, borderRadius: `${br}px`,
                    background: `${p.color}10`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: p.color, flexShrink: 0,
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  }}>
                    {p.icon}
                  </Box>
                  <Typography sx={{
                    fontFamily: typography.fontFamily,
                    fontSize: '1.8rem', fontWeight: 800,
                    color: `${p.color}18`, lineHeight: 1,
                    display: { xs: 'block', md: 'block' },
                  }}>
                    {p.num}
                  </Typography>
                </Box>

                {/* Text */}
                <Box>
                  <Typography variant="h6" sx={{ color: palette.text.primary, mb: 0.75, fontSize: '1rem' }}>
                    {p.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8, fontWeight: 300 }}>
                    {p.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── GOVERNANCE STRUCTURE ──────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Structure</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
              Committees &<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Oversight Bodies</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 480, mx: 'auto' }}>
              Four elected bodies ensure democratic control, financial integrity, and member welfare at every level.
            </Typography>
          </Box>

          <Box
            ref={committeeRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)' },
              gap: 3, mb: 8,
              opacity: committeeVisible ? 1 : 0,
              transform: committeeVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {committees.map((c, i) => (
              <Box key={i} sx={{
                position: 'relative',
                p: { xs: 3.5, md: 4.5 },
                borderRadius: `${br * 2}px`,
                background: palette.background.default,
                border: `1px solid ${palette.background.default}`,
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 24px 60px ${c.color}12`,
                  borderColor: 'transparent',
                  background: palette.background.paper,
                  '& .cm-icon': { background: `linear-gradient(135deg, ${c.color}, ${c.accent})`, color: '#fff' },
                },
              }}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${c.color}, ${c.accent})` }} />
                <Box sx={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, ${c.color}07, transparent 70%)`, borderRadius: `0 ${br * 2}px 0 100%` }} />

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2.5 }}>
                  <Box className="cm-icon" sx={{
                    width: 50, height: 50, borderRadius: `${br}px`, flexShrink: 0,
                    background: `${c.color}10`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c.color,
                    transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  }}>
                    {c.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ color: palette.text.primary, fontSize: '1.05rem', mb: 0.4 }}>{c.name}</Typography>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.25, background: `${c.color}0e`, border: `1px solid ${c.color}18`, borderRadius: '100px' }}>
                      <PeopleOutlineIcon sx={{ fontSize: 12, color: c.accent }} />
                      <Typography variant="caption" sx={{ color: c.color, fontWeight: 600, fontSize: '0.72rem' }}>{c.members} elected members</Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8, fontWeight: 300 }}>
                  {c.desc}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Structure diagram — visual flow */}
          <Box sx={{
            p: { xs: 3.5, md: 5 },
            borderRadius: `${br * 2}px`,
            background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
            position: 'relative', overflow: 'hidden',
          }}>
            <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', bottom: -30, left: '40%', width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)', pointerEvents: 'none' }} />

            <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', mb: 1.5, position: 'relative', zIndex: 1 }}>
              Decision Chain
            </Typography>
            <Typography variant="h4" sx={{ color: '#fff', mb: 4, fontWeight: 300, fontStyle: 'italic', position: 'relative', zIndex: 1, fontSize: { xs: '1.4rem', md: '1.8rem' } }}>
              Power flows from members upward
            </Typography>

            <Box sx={{
              display: 'flex', flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: { xs: 2, md: 0 },
              position: 'relative', zIndex: 1,
            }}>
              {[
                { label: 'All Members', sub: '1,240+ voters', icon: <GroupsIcon sx={{ fontSize: 20 }} /> },
                { label: 'Annual AGM', sub: 'Policy & elections', icon: <HowToVoteIcon sx={{ fontSize: 20 }} /> },
                { label: 'Board of Directors', sub: 'Oversight & strategy', icon: <GavelIcon sx={{ fontSize: 20 }} /> },
                { label: 'Management', sub: 'Day-to-day operations', icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 20 }} /> },
              ].map((node, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Box sx={{
                    flex: 1, p: 2.5,
                    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: `${br * 1.5}px`,
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    '&:hover': { background: 'rgba(255,255,255,0.18)', transform: 'scale(1.03)' },
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, color: palette.secondary.light }}>
                      {node.icon}
                    </Box>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: '#fff', fontSize: '0.88rem', lineHeight: 1.3 }}>
                      {node.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>{node.sub}</Typography>
                  </Box>
                  {i < 3 && (
                    <Box sx={{
                      display: { xs: 'none', md: 'flex' },
                      alignItems: 'center', px: 1.5, color: 'rgba(255,255,255,0.3)',
                    }}>
                      <ArrowForwardIcon sx={{ fontSize: 20 }} />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── BOARD MEMBERS ─────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Elected Leadership</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
              Board of<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Directors</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 480, mx: 'auto' }}>
              Elected by members at the AGM every three years. Every board member is a cooperative member first.
            </Typography>
          </Box>

          <Box
            ref={boardRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3,1fr)', md: 'repeat(6,1fr)' },
              gap: 3,
              opacity: boardVisible ? 1 : 0,
              transform: boardVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {boardMembers.map((m, i) => (
              <Box key={i} sx={{
                borderRadius: `${br * 2}px`,
                background: palette.background.paper,
                border: `1px solid ${palette.background.default}`,
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 24px 60px ${m.color}18`,
                  borderColor: 'transparent',
                  '& .bm-img': { transform: 'scale(1.06)' },
                },
              }}>
                {/* Photo */}
                <Box sx={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                  <Box className="bm-img" component="img"
                    src={m.img} alt={m.name}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                  <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${m.color}55)` }} />
                  {/* Role badge */}
                  <Box sx={{
                    position: 'absolute', bottom: 8, left: 8, right: 8,
                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                    borderRadius: `${br - 2}px`, px: 1.25, py: 0.6,
                  }}>
                    <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.65rem', fontWeight: 700, color: m.color, lineHeight: 1, textAlign: 'center' }}>
                      {m.role}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, lineHeight: 1.3, mb: 0.4, fontSize: '0.82rem' }}>
                    {m.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.7rem' }}>
                    {m.tenure}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── AGM TIMELINE ──────────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 7, md: 12 },
            alignItems: 'center',
          }}>
            {/* Left: headline + photo */}
            <Box>
              <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>AGM History</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 2, lineHeight: 1.15 }}>
                Annual General<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Meetings</Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4 }}>
                Every member has the right to attend, vote, and speak at our Annual General Meeting.
                Below is a record of key decisions and outcomes since 2020.
              </Typography>
              <Box sx={{
                borderRadius: `${br * 2}px`, overflow: 'hidden', height: 260,
                position: 'relative',
                '&:hover img': { transform: 'scale(1.04)' },
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80"
                  alt="AGM meeting"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
                <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${palette.primary.dark}35, transparent 55%)` }} />
                <Box sx={{
                  position: 'absolute', bottom: 16, left: 16,
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
                  borderRadius: `${br}px`, px: 2, py: 1,
                  display: 'flex', alignItems: 'center', gap: 1,
                }}>
                  <CalendarMonthOutlinedIcon sx={{ fontSize: 15, color: palette.primary.main }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: palette.text.primary, fontFamily: typography.fontFamily }}>
                    Next AGM: Q1 2025
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Right: Timeline */}
            <Box
              ref={timelineRef}
              sx={{
                opacity: timelineVisible ? 1 : 0,
                transform: timelineVisible ? 'translateX(0)' : 'translateX(24px)',
                transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                {/* Vertical line */}
                <Box sx={{
                  position: 'absolute', left: 23, top: 24, bottom: 24,
                  width: 2,
                  background: `linear-gradient(180deg, ${palette.primary.main}30, ${palette.primary.main}05)`,
                  borderRadius: '100px',
                }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {agmTimeline.map((item, i) => (
                    <Box key={i} sx={{
                      display: 'grid', gridTemplateColumns: '48px 1fr', gap: 2.5,
                      transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                      '&:hover': { transform: 'translateX(5px)' },
                    }}>
                      {/* Year dot */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.5 }}>
                        <Box sx={{
                          width: 48, height: 48, borderRadius: '50%',
                          background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
                          border: `2px solid ${item.color}25`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, position: 'relative', zIndex: 1,
                        }}>
                          <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.72rem', fontWeight: 800, color: item.color, lineHeight: 1 }}>
                            {item.year}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Card */}
                      <Box sx={{
                        p: 2.5, borderRadius: `${br * 1.5}px`,
                        background: palette.background.default,
                        border: `1px solid ${palette.background.default}`,
                        '&:hover': { borderColor: `${item.color}18`, background: palette.background.paper, boxShadow: `0 6px 24px ${item.color}0a` },
                        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.5 }}>
                          {item.event}
                        </Typography>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.6, display: 'block', mb: 1.25 }}>
                          {item.highlight}
                        </Typography>
                        <Box sx={{
                          display: 'inline-flex', alignItems: 'center', gap: 0.75,
                          px: 1.5, py: 0.35,
                          background: `${item.color}0e`, border: `1px solid ${item.color}18`,
                          borderRadius: '100px',
                        }}>
                          <CheckIcon sx={{ fontSize: 11, color: item.color }} />
                          <Typography variant="caption" sx={{ color: item.color, fontWeight: 600, fontSize: '0.7rem' }}>
                            {item.outcome}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── TRANSPARENCY ──────────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'inline-block', px: 2.5, py: 0.6, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2.5 }}>
              <Typography variant="overline" sx={{ color: palette.primary.main }}>Open Books</Typography>
            </Box>
            <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
              Our Commitment to<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Transparency</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, maxWidth: 480, mx: 'auto' }}>
              Every member has the right to know. Here is how we maintain full financial and operational transparency.
            </Typography>
          </Box>

          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: 3, mb: 6,
          }}>
            {transparency.map((t, i) => (
              <Box key={i} sx={{
                p: 3.5, borderRadius: `${br * 2}px`,
                background: palette.background.paper,
                border: `1px solid ${palette.background.default}`,
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  transform: 'translateY(-7px)',
                  boxShadow: `0 20px 55px ${t.color}12`,
                  borderColor: 'transparent',
                  '& .tr-icon': { background: `linear-gradient(135deg, ${t.color}, ${t.accent})`, color: '#fff' },
                },
              }}>
                <Box className="tr-icon" sx={{
                  width: 50, height: 50, borderRadius: `${br}px`, mb: 2.5,
                  background: `${t.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: t.color,
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  {t.icon}
                </Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, mb: 1, fontSize: '0.97rem' }}>
                  {t.title}
                </Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block', fontSize: '0.82rem' }}>
                  {t.desc}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Compliance banner */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}>
            <Box sx={{
              p: 4, borderRadius: `${br * 2}px`,
              background: palette.background.paper,
              border: `1px solid ${palette.info.main}15`,
              display: 'flex', gap: 3, alignItems: 'flex-start',
            }}>
              <Box sx={{
                width: 52, height: 52, borderRadius: `${br}px`, flexShrink: 0,
                background: `${palette.info.main}10`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: palette.info.main,
              }}>
                <AccountBalanceOutlinedIcon sx={{ fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, mb: 0.75 }}>Regulatory Compliance</Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8, fontWeight: 300 }}>
                  Registered and regulated under the Nigerian Cooperative Societies Act. Annual returns filed with the Lagos State Ministry of Commerce and Cooperatives.
                </Typography>
              </Box>
            </Box>
            <Box sx={{
              p: 4, borderRadius: `${br * 2}px`,
              background: palette.background.paper,
              border: `1px solid ${palette.secondary.main}15`,
              display: 'flex', gap: 3, alignItems: 'flex-start',
            }}>
              <Box sx={{
                width: 52, height: 52, borderRadius: `${br}px`, flexShrink: 0,
                background: `${palette.secondary.main}10`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: palette.secondary.dark,
              }}>
                <AssessmentOutlinedIcon sx={{ fontSize: 26 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: palette.text.primary, mb: 0.75 }}>Independent Audits</Typography>
                <Typography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.8, fontWeight: 300 }}>
                  Annual financial statements audited by a certified independent auditor. Results published to all members and filed with regulatory authorities.
                </Typography>
              </Box>
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
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Member Voices</Typography>
              </Box>
              <Typography variant="h2" sx={{ color: palette.text.primary, fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1.5 }}>
                Why Governance<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>Matters to Members</Box>
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
          <Box component="img" src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=520&q=80" alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{ color: '#fff', mb: 2, fontSize: { xs: '2.6rem', md: '3.8rem' } }}>
              Your Voice<br />
              <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Shapes This Cooperative
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 520, mx: 'auto', fontWeight: 300 }}>
              Every member has a vote. Every vote shapes our direction. Join CodeBridge and become
              part of a democratic institution that puts members first.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mb: 6 }}>
              <Button component={Link} to="/login" variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                sx={{ background: '#fff', color: palette.primary.dark, boxShadow: '0 10px 40px rgba(0,0,0,0.22)', '&:hover': { background: palette.background.default, boxShadow: '0 18px 56px rgba(0,0,0,0.28)' } }}>
                Login & Participate
              </Button>
              <Button component={Link} to="/membership" variant="outlined" size="large"
                sx={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.07)', '&:hover': { borderColor: 'rgba(255,255,255,0.65)', background: 'rgba(255,255,255,0.14)' } }}>
                Become a Member
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
                Join <Box component="span" sx={{ color: '#fff', fontWeight: 600 }}>1,240+</Box> voting members
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default Governance;