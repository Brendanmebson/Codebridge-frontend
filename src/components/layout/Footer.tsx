import React from 'react';
import { Box, Typography, Stack, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SavingsIcon from '@mui/icons-material/Savings';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  const quickLinks = [
    { label: 'About Us', to: '/about' },
    { label: 'Our Services', to: '/services' },
    { label: 'Membership', to: '/membership' },
    { label: 'Loan Calculator', to: '/loan-calculator' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const legalLinks = [
    { label: 'Governance', to: '/governance' },
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/termsandconditions' },
    { label: 'Loan Policy', to: '/loan-policy' },
  ];

  const socials = [
    { icon: <FacebookIcon sx={{ fontSize: 18 }} />, href: '#', label: 'Facebook' },
    { icon: <TwitterIcon sx={{ fontSize: 18 }} />, href: '#', label: 'Twitter' },
    { icon: <LinkedInIcon sx={{ fontSize: 18 }} />, href: '#', label: 'LinkedIn' },
    { icon: <InstagramIcon sx={{ fontSize: 18 }} />, href: '#', label: 'Instagram' },
    { icon: <WhatsAppIcon sx={{ fontSize: 18 }} />, href: '#', label: 'WhatsApp' },
  ];

  // const stats = [
  //   { val: '1,240+', lab: 'Members' },
  //   { val: '₦1.2B+', lab: 'Disbursed' },
  //   { val: '8+', lab: 'Years' },
  //   { val: '98%', lab: 'Approval' },
  // ];

  const LinkItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <Box
      component={Link}
      to={to}
      sx={{
        display: 'flex', alignItems: 'center', gap: 0.75,
        color: 'rgba(255,255,255,0.6)',
        textDecoration: 'none',
        fontFamily: typography.fontFamily,
        fontSize: '0.875rem',
        fontWeight: 400,
        transition: 'all 0.25s',
        width: 'fit-content',
        '&:hover': {
          color: '#fff',
          gap: 1.25,
        },
        '&:hover .link-arrow': { opacity: 1, transform: 'translateX(0)' },
      }}
    >
      <Box className="link-arrow" sx={{ opacity: 0, transform: 'translateX(-4px)', transition: 'all 0.25s', display: 'flex', alignItems: 'center' }}>
        <ArrowForwardIcon sx={{ fontSize: 11 }} />
      </Box>
      {children}
    </Box>
  );

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(175deg, ${palette.primary.dark} 0%, #0D2E0F 100%)`,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: typography.fontFamily,
      }}
    >
      {/* Background blobs */}
      {[
        { size: 500, top: -200, right: -150, opacity: 0.06 },
        { size: 350, bottom: -100, left: -100, opacity: 0.05 },
        { size: 200, top: '40%', left: '35%', opacity: 0.03 },
      ].map((b, i) => (
        <Box key={i} sx={{
          position: 'absolute',
          width: b.size, height: b.size, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255,255,255,${b.opacity * 2}), transparent 70%)`,
          top: b.top, bottom: b.bottom, right: b.right, left: b.left,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Grain overlay */}
      <Box sx={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
        backgroundSize: '200px', opacity: 0.5,
      }} />

      {/* ── STATS BAR ───────────────────────────────────────────
      <Box sx={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        py: { xs: 4, md: 5 },
        position: 'relative', zIndex: 1,
      }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6, lg: 8 } }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
            gap: { xs: 4, md: 0 },
          }}>
            {stats.map((s, i) => (
              <Box key={i} sx={{
                textAlign: 'center',
                position: 'relative',
                '&:not(:last-child)::after': {
                  content: '""',
                  display: { xs: 'none', md: 'block' },
                  position: 'absolute', right: 0, top: '15%', bottom: '15%',
                  width: 1, background: 'rgba(255,255,255,0.1)',
                },
              }}>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: { xs: '1.9rem', md: '2.4rem' },
                  fontWeight: 700, color: '#fff', lineHeight: 1, mb: 0.5,
                }}>
                  {s.val}
                </Typography>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
                }}>
                  {s.lab}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box> */}

      {/* ── MAIN FOOTER BODY ──────────────────────────────────── */}
      <Box sx={{
        maxWidth: 1200, mx: 'auto',
        px: { xs: 3, md: 6, lg: 8 },
        py: { xs: 7, md: 10 },
        position: 'relative', zIndex: 1,
      }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: '2fr 1fr 1fr 1.6fr' },
          gap: { xs: 7, md: 8 },
        }}>

          {/* ── COL 1: Brand ──────────────────────────────── */}
          <Box>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{
                width: 40, height: 40, borderRadius: `${br}px`,
                background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.secondary.dark})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 16px ${palette.primary.main}40`,
              }}>
                <SavingsIcon sx={{ fontSize: 20, color: '#fff' }} />
              </Box>
              <Box>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontWeight: 700, fontSize: '0.95rem', color: '#fff', lineHeight: 1.1,
                }}>
                  CodeBridge
                </Typography>
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  Cooperative Society
                </Typography>
              </Box>
            </Box>

            <Typography sx={{
              fontFamily: typography.fontFamily,
              fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.85, fontWeight: 300, mb: 4, maxWidth: 300,
            }}>
              A member-owned financial cooperative committed to promoting savings,
              providing affordable loans, and improving economic wellbeing through
              mutual support since 2016.
            </Typography>

            {/* Photo strip */}
            <Box sx={{ display: 'flex', mb: 4, gap: 1.5 }}>
              {[
                'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=120&q=80',
                'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&q=80',
                'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=120&q=80',
              ].map((img, i) => (
                <Box key={i} sx={{
                  width: 64, height: 64, borderRadius: `${br}px`, overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-3px)', border: `2px solid rgba(255,255,255,0.25)` },
                }}>
                  <Box component="img" src={img} alt="Community"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ))}
            </Box>

            {/* Socials */}
            <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
              {socials.map((s, i) => (
                <Box
                  key={i}
                  component="a" href={s.href} aria-label={s.label}
                  sx={{
                    width: 36, height: 36, borderRadius: `${br}px`,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                    '&:hover': {
                      background: `${palette.primary.main}40`,
                      border: `1px solid ${palette.primary.main}60`,
                      color: '#fff',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {s.icon}
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── COL 2: Quick Links ────────────────────────── */}
          <Box>
            <Typography sx={{
              fontFamily: typography.fontFamily,
              fontSize: '0.75rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              mb: 3,
            }}>
              Quick Links
            </Typography>
            <Stack spacing={2}>
              {quickLinks.map((link, i) => (
                <LinkItem key={i} to={link.to}>{link.label}</LinkItem>
              ))}
            </Stack>
          </Box>

          {/* ── COL 3: Legal ──────────────────────────────── */}
          <Box>
            <Typography sx={{
              fontFamily: typography.fontFamily,
              fontSize: '0.75rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              mb: 3,
            }}>
              Legal
            </Typography>
            <Stack spacing={2}>
              {legalLinks.map((link, i) => (
                <LinkItem key={i} to={link.to}>{link.label}</LinkItem>
              ))}
            </Stack>

            {/* Registered badge */}
            <Box sx={{
              mt: 5, p: 2,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: `${br}px`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: palette.secondary.light,
                  boxShadow: `0 0 6px ${palette.secondary.light}`,
                }} />
                <Typography sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: '0.68rem', fontWeight: 600,
                  color: palette.secondary.light, letterSpacing: '0.06em',
                }}>
                  REGISTERED
                </Typography>
              </Box>
              <Typography sx={{
                fontFamily: typography.fontFamily,
                fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6,
              }}>
                CAC Reg. No. RC12345<br />
                NCSB Certified Cooperative
              </Typography>
            </Box>
          </Box>

          {/* ── COL 4: Contact ────────────────────────────── */}
          <Box>
            <Typography sx={{
              fontFamily: typography.fontFamily,
              fontSize: '0.75rem', fontWeight: 600,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              mb: 3,
            }}>
              Contact
            </Typography>

            <Stack spacing={3}>
              {[
                {
                  icon: <LocationOnIcon sx={{ fontSize: 16 }} />,
                  label: 'Visit Us',
                  val: '14 Cooperative Drive,\nVictoria Island, Lagos',
                },
                {
                  icon: <EmailIcon sx={{ fontSize: 16 }} />,
                  label: 'Email Us',
                  val: 'hello@codebridgecoop.ng',
                },
                {
                  icon: <PhoneIcon sx={{ fontSize: 16 }} />,
                  label: 'Call Us',
                  val: '+234 901 234 5678',
                },
              ].map((c, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.75, alignItems: 'flex-start' }}>
                  <Box sx={{
                    width: 32, height: 32, borderRadius: `${br - 2}px`, flexShrink: 0,
                    background: `${palette.primary.main}25`,
                    border: `1px solid ${palette.primary.main}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: palette.secondary.light, mt: 0.25,
                  }}>
                    {c.icon}
                  </Box>
                  <Box>
                    <Typography sx={{
                      fontFamily: typography.fontFamily,
                      fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      fontWeight: 600, mb: 0.3,
                    }}>
                      {c.label}
                    </Typography>
                    <Typography sx={{
                      fontFamily: typography.fontFamily,
                      fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.65, fontWeight: 300,
                      whiteSpace: 'pre-line',
                    }}>
                      {c.val}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            {/* Office hours */}
            <Box sx={{
              mt: 4, p: 2.5,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: `${br}px`,
            }}>
              <Typography sx={{
                fontFamily: typography.fontFamily,
                fontSize: '0.68rem', fontWeight: 600,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.1em', textTransform: 'uppercase', mb: 1.5,
              }}>
                Office Hours
              </Typography>
              {[
                { day: 'Mon – Fri', time: '8:00 AM – 5:00 PM' },
                { day: 'Saturday', time: '9:00 AM – 1:00 PM' },
                { day: 'Sunday', time: 'Closed' },
              ].map((h, i) => (
                <Box key={i} sx={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  py: 0.6,
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
                    {h.day}
                  </Typography>
                  <Typography sx={{
                    fontFamily: typography.fontFamily,
                    fontSize: '0.78rem',
                    color: h.time === 'Closed' ? 'rgba(255,255,255,0.25)' : palette.secondary.light,
                    fontWeight: 500,
                  }}>
                    {h.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── BOTTOM BAR ────────────────────────────────────────── */}
      <Box sx={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        position: 'relative', zIndex: 1,
      }}>
        <Box sx={{
          maxWidth: 1200, mx: 'auto',
          px: { xs: 3, md: 6, lg: 8 },
          py: { xs: 3, md: 3.5 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}>
          <Typography sx={{
            fontFamily: typography.fontFamily,
            fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', fontWeight: 300,
          }}>
            © {new Date().getFullYear()} CodeBridge Multi-Purpose Cooperative Society. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy', to: '/privacy-policy' },
              { label: 'Terms', to: '/termsandconditions' },
            ].map((l, i) => (
              <Box
                key={i}
                component={Link} to={l.to}
                sx={{
                  fontFamily: typography.fontFamily,
                  fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)',
                  textDecoration: 'none', fontWeight: 400,
                  transition: 'color 0.2s',
                  '&:hover': { color: 'rgba(255,255,255,0.75)' },
                }}
              >
                {l.label}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;