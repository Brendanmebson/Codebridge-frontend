import React, { useEffect, useRef, useState } from 'react';
import {
  Box, Container, Typography, Button, useTheme, Stack, TextField, Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

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

const Contact: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;
  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`;

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactChannels = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 22 }} />,
      label: 'Visit Us',
      value: '14 Cooperative Drive, Victoria Island, Lagos',
      sub: 'Mon–Fri, 9am–5pm',
      color: palette.primary.dark,
      accent: palette.primary.main,
      bg: '#E8F5E9',
      action: null,
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 22 }} />,
      label: 'Call Us',
      value: '+234 901 234 5678',
      sub: 'Mon–Sat, 9am–5pm',
      color: palette.info.dark,
      accent: palette.info.main,
      bg: '#E0F2F1',
      action: 'tel:+2349012345678',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 22 }} />,
      label: 'Email Us',
      value: 'hello@codebridgecoop.ng',
      sub: 'We reply within 24 hours',
      color: palette.secondary.dark,
      accent: palette.secondary.main,
      bg: '#F1F8E9',
      action: 'mailto:hello@codebridgecoop.ng',
    },
    {
      icon: <WhatsAppIcon sx={{ fontSize: 22 }} />,
      label: 'WhatsApp',
      value: '+234 901 234 5678',
      sub: 'Quick replies, Mon–Sat',
      color: palette.info.dark,
      accent: '#00897B',
      bg: '#E0F7FA',
      action: 'https://wa.me/2349012345678',
    },
  ];

  const officeHours = [
    { day: 'Monday – Friday', hours: '9:00 AM – 5:00 PM', open: true },
    { day: 'Saturday', hours: '10:00 AM – 2:00 PM', open: true },
    { day: 'Sunday', hours: 'Closed', open: false },
  ];

  const faqs = [
    { q: 'How quickly will you respond?', a: 'Emails are answered within 24 hours on business days. WhatsApp typically replies within 2 hours.' },
    { q: 'Can I visit without an appointment?', a: 'Yes, walk-ins are welcome during office hours. For loan consultations, booking ahead is recommended.' },
    { q: 'Who should I contact for loan queries?', a: 'Reach our loans desk directly at loans@codebridgecoop.ng or call the main line and ask for the loans department.' },
  ];

  const { ref: formRef, visible: formVisible } = useFadeIn();
  const { ref: infoRef, visible: infoVisible } = useFadeIn();
  const { ref: faqRef, visible: faqVisible } = useFadeIn();

  const inputSx = (name: string) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: `${br * 1.5}px`,
      fontFamily: typography.fontFamily,
      fontSize: '0.93rem',
      background: focused === name ? palette.background.paper : palette.background.default,
      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      '& fieldset': {
        borderColor: focused === name ? palette.primary.main : `${palette.primary.main}15`,
        borderWidth: focused === name ? 2 : 1,
        transition: 'all 0.25s',
      },
      '&:hover fieldset': { borderColor: `${palette.primary.main}40` },
      '&.Mui-focused fieldset': { borderColor: palette.primary.main },
    },
    '& .MuiInputLabel-root': {
      fontFamily: typography.fontFamily,
      fontSize: '0.9rem',
      color: palette.text.secondary,
      '&.Mui-focused': { color: palette.primary.main },
    },
  });

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
                We're Here to Help
              </Typography>
            </Box>
          </Box>

          {/* Split: headline left, contact quick-cards right */}
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
                Get in<br />
                <Box component="span" sx={{
                  fontStyle: 'italic', fontWeight: 300,
                  background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9, ${palette.secondary.main})`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  Touch
                </Box>
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.68)', mb: 5, maxWidth: 480, fontWeight: 300 }}>
                Whether you have a question about your savings, want to apply for a loan, or just want
                to learn more — our team is ready to help.
              </Typography>

              {/* Response time pills */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {[
                  { icon: <EmailIcon sx={{ fontSize: 14 }} />, text: 'Email reply in 24h' },
                  { icon: <WhatsAppIcon sx={{ fontSize: 14 }} />, text: 'WhatsApp in 2h' },
                  { icon: <PhoneIcon sx={{ fontSize: 14 }} />, text: 'Mon–Sat, 9–5pm' },
                ].map((pill, i) => (
                  <Box key={i} sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 0.75,
                    px: 2, py: 0.75,
                    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.18)', borderRadius: '100px',
                    color: 'rgba(255,255,255,0.85)',
                  }}>
                    {pill.icon}
                    <Typography variant="caption" sx={{ fontWeight: 500, fontFamily: typography.fontFamily }}>
                      {pill.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right: floating team photo + support badge */}
            <Box sx={{
              display: { xs: 'none', md: 'block' },
              position: 'relative', height: 360,
              animation: 'heroRight 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s forwards',
              opacity: 0,
              '@keyframes heroRight': {
                from: { opacity: 0, transform: 'translateX(24px)' },
                to: { opacity: 1, transform: 'translateX(0)' },
              },
            }}>
              <Box sx={{
                position: 'absolute', top: 0, left: 0, right: '10%', bottom: '10%',
                borderRadius: `${br * 2.5}px`, overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&q=80"
                  alt="Our team"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box sx={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${palette.primary.dark}30, transparent 60%)`,
                }} />
              </Box>
              {/* Floating support card */}
              <Box sx={{
                position: 'absolute', bottom: 0, right: 0,
                background: palette.background.paper,
                borderRadius: `${br * 1.5}px`, p: 2.5,
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                display: 'flex', alignItems: 'center', gap: 1.75, width: 210,
                animation: 'float 4s ease-in-out infinite',
                '@keyframes float': {
                  '0%,100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-8px)' },
                },
              }}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <SupportAgentIcon sx={{ fontSize: 20, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: palette.text.primary, display: 'block', lineHeight: 1.2 }}>
                    Live Support
                  </Typography>
                  <Typography variant="caption" sx={{ color: palette.primary.main, fontWeight: 600, fontSize: '0.72rem' }}>
                    Currently Online
                  </Typography>
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


      {/* ── CONTACT CHANNELS ──────────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 7, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' },
            gap: 3,
          }}>
            {contactChannels.map((c, i) => (
              <Box
                key={i}
                component={c.action ? 'a' : 'div'}
                href={c.action ?? undefined}
                target={c.action?.startsWith('http') ? '_blank' : undefined}
                rel={c.action?.startsWith('http') ? 'noopener noreferrer' : undefined}
                sx={{
                  p: 3, borderRadius: `${br * 2}px`,
                  background: palette.background.paper,
                  border: `1px solid ${c.bg}`,
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 20px 50px ${c.color}14`,
                    borderColor: 'transparent',
                    background: `${c.bg}88`,
                    '& .ch-icon': {
                      background: `linear-gradient(135deg, ${c.color}, ${c.accent})`,
                      color: '#fff',
                    },
                  },
                }}
              >
                <Box className="ch-icon" sx={{
                  width: 46, height: 46, borderRadius: `${br}px`, mb: 2,
                  background: `${c.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.color,
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}>
                  {c.icon}
                </Box>
                <Typography variant="overline" sx={{ color: c.color, display: 'block', mb: 0.5 }}>
                  {c.label}
                </Typography>
                <Typography variant="body2" sx={{ color: palette.text.primary, fontWeight: 600, mb: 0.5, lineHeight: 1.4 }}>
                  {c.value}
                </Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary }}>
                  {c.sub}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>


      {/* ── MAIN FORM + INFO ──────────────────────────────────── */}
      <Box sx={{ background: palette.background.paper, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 8, md: 10 },
            alignItems: 'start',
          }}>

            {/* ── FORM ── */}
            <Box
              ref={formRef}
              sx={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? 'translateY(0)' : 'translateY(28px)',
                transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Send a Message</Typography>
              </Box>
              <Typography variant="h2" sx={{
                color: palette.text.primary,
                fontSize: { xs: '2.2rem', md: '3rem' },
                lineHeight: 1.15, mb: 1.5,
              }}>
                We'd Love to<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>
                  Hear From You
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4 }}>
                Fill in the form below and a member of our team will get back to you within one business day.
              </Typography>

              {submitted ? (
                <Box sx={{
                  p: 4, borderRadius: `${br * 2}px`,
                  background: `${palette.primary.main}08`,
                  border: `1px solid ${palette.primary.main}20`,
                  textAlign: 'center',
                }}>
                  <Box sx={{
                    width: 64, height: 64, borderRadius: '50%', mx: 'auto', mb: 2.5,
                    background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 10px 30px ${palette.primary.main}35`,
                  }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 32, color: '#fff' }} />
                  </Box>
                  <Typography variant="h5" sx={{ color: palette.text.primary, mb: 1 }}>
                    Message Sent!
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.text.secondary, mb: 3 }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </Typography>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outlined"
                    sx={{
                      borderColor: `${palette.primary.main}40`,
                      color: palette.primary.main,
                      borderRadius: '100px',
                      textTransform: 'none',
                      fontFamily: typography.fontFamily,
                      '&:hover': { background: `${palette.primary.main}08` },
                    }}
                  >
                    Send Another
                  </Button>
                </Box>
              ) : (
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={2.5}>
                    {/* Name + Email row */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                      <TextField
                        required fullWidth name="name" label="Full Name"
                        value={formData.name} onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        sx={inputSx('name')}
                      />
                      <TextField
                        required fullWidth name="email" label="Email Address" type="email"
                        value={formData.email} onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        sx={inputSx('email')}
                      />
                    </Box>

                    <TextField
                      required fullWidth name="subject" label="Subject"
                      value={formData.subject} onChange={handleChange}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused(null)}
                      sx={inputSx('subject')}
                    />

                    <TextField
                      required fullWidth multiline rows={5}
                      name="message" label="Your Message"
                      value={formData.message} onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      sx={inputSx('message')}
                    />

                    <Button
                      type="submit" variant="contained" size="large"
                      endIcon={<SendIcon sx={{ fontSize: 18 }} />}
                      sx={{
                        background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                        boxShadow: `0 10px 30px ${palette.primary.main}35`,
                        borderRadius: `${br * 1.5}px`,
                        textTransform: 'none',
                        fontFamily: typography.fontFamily,
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        py: 1.6,
                        '&:hover': { boxShadow: `0 16px 40px ${palette.primary.main}50` },
                        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                      }}
                    >
                      Send Message
                    </Button>
                  </Stack>
                </Box>
              )}
            </Box>

            {/* ── INFO PANEL ── */}
            <Box
              ref={infoRef}
              sx={{
                opacity: infoVisible ? 1 : 0,
                transform: infoVisible ? 'translateY(0)' : 'translateY(28px)',
                transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s',
              }}
            >
              {/* Office photo */}
              <Box sx={{
                borderRadius: `${br * 2}px`, overflow: 'hidden', height: 220, mb: 4,
                position: 'relative',
                '&:hover img': { transform: 'scale(1.04)' },
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1560264280-88b68371db39?w=700&q=80"
                  alt="Our office"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
                <Box sx={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${palette.primary.dark}40, transparent 60%)`,
                }} />
                <Box sx={{
                  position: 'absolute', bottom: 16, left: 20,
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
                  borderRadius: `${br}px`, px: 2, py: 1,
                  display: 'flex', alignItems: 'center', gap: 1,
                }}>
                  <LocationOnIcon sx={{ fontSize: 16, color: palette.primary.main }} />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: palette.text.primary, fontFamily: typography.fontFamily }}>
                    Victoria Island, Lagos
                  </Typography>
                </Box>
              </Box>

              {/* Office hours */}
              <Box sx={{
                p: 3.5, borderRadius: `${br * 2}px`,
                background: palette.background.default,
                border: `1px solid ${palette.background.default}`,
                mb: 3,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                  <Box sx={{
                    width: 36, height: 36, borderRadius: `${br - 2}px`,
                    background: `${palette.primary.main}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: palette.primary.main,
                  }}>
                    <AccessTimeIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: palette.text.primary, fontSize: '1rem' }}>
                    Office Hours
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {officeHours.map((h, i) => (
                    <Box key={i} sx={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      pb: i < officeHours.length - 1 ? 1.5 : 0,
                      borderBottom: i < officeHours.length - 1 ? `1px dashed ${palette.primary.main}15` : 'none',
                    }}>
                      <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 400 }}>
                        {h.day}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                          width: 7, height: 7, borderRadius: '50%',
                          background: h.open ? palette.primary.main : palette.text.secondary,
                          opacity: h.open ? 1 : 0.4,
                          boxShadow: h.open ? `0 0 0 3px ${palette.primary.main}20` : 'none',
                        }} />
                        <Typography variant="body2" sx={{
                          color: h.open ? palette.text.primary : palette.text.secondary,
                          fontWeight: h.open ? 500 : 400,
                        }}>
                          {h.hours}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Support callout */}
              <Box sx={{
                p: 3.5, borderRadius: `${br * 2}px`,
                background: `linear-gradient(145deg, ${palette.primary.dark}, ${palette.primary.main})`,
                position: 'relative', overflow: 'hidden',
              }}>
                <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)', pointerEvents: 'none' }} />
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, position: 'relative', zIndex: 1 }}>
                  <Box sx={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ChatBubbleOutlineIcon sx={{ fontSize: 20, color: '#fff' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff', mb: 0.5 }}>
                      Need Urgent Help?
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, display: 'block', mb: 2 }}>
                      For urgent loan or account matters, WhatsApp us for the fastest response — usually within 2 hours on business days.
                    </Typography>
                    <Box
                      component="a"
                      href="https://wa.me/2349012345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'inline-flex', alignItems: 'center', gap: 1,
                        px: 2.5, py: 1,
                        background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        borderRadius: '100px', textDecoration: 'none',
                        color: '#fff',
                        transition: 'all 0.25s',
                        '&:hover': { background: 'rgba(255,255,255,0.28)' },
                      }}
                    >
                      <WhatsAppIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, fontFamily: typography.fontFamily }}>
                        Open WhatsApp
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── MAP PLACEHOLDER + FAQ ─────────────────────────────── */}
      <Box sx={{ background: palette.background.default, py: { xs: 9, md: 14 } }}>
        <Container maxWidth="lg">
          <Box
            ref={faqRef}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 7, md: 10 },
              opacity: faqVisible ? 1 : 0,
              transform: faqVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Map / location visual */}
            <Box>
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Find Us</Typography>
              </Box>
              <Typography variant="h3" sx={{ color: palette.text.primary, mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                Visit Our Office
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4 }}>
                We're centrally located in Victoria Island, Lagos. Walk-ins welcome during business hours — no appointment needed for general enquiries.
              </Typography>

              {/* Address detail cards */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                {[
                  { icon: <LocationOnIcon sx={{ fontSize: 18 }} />, label: 'Address', val: '14 Cooperative Drive, Victoria Island, Lagos', color: palette.primary.main },
                  { icon: <PhoneIcon sx={{ fontSize: 18 }} />, label: 'Phone', val: '+234 901 234 5678', color: palette.info.main },
                  { icon: <EmailIcon sx={{ fontSize: 18 }} />, label: 'Email', val: 'hello@codebridgecoop.ng', color: palette.secondary.dark },
                ].map((d, i) => (
                  <Box key={i} sx={{
                    display: 'flex', alignItems: 'center', gap: 2,
                    p: 2.5, borderRadius: `${br * 1.5}px`,
                    background: palette.background.paper,
                    border: `1px solid ${palette.background.default}`,
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                    '&:hover': {
                      transform: 'translateX(5px)',
                      borderColor: `${d.color}20`,
                      boxShadow: `0 6px 24px ${d.color}0e`,
                    },
                  }}>
                    <Box sx={{
                      width: 38, height: 38, borderRadius: `${br - 2}px`, flexShrink: 0,
                      background: `${d.color}10`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: d.color,
                    }}>
                      {d.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: d.color, fontWeight: 600, display: 'block', mb: 0.25, letterSpacing: '0.04em' }}>
                        {d.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: palette.text.primary }}>{d.val}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Map image placeholder */}
              <Box sx={{
                borderRadius: `${br * 2}px`, overflow: 'hidden', height: 200,
                position: 'relative',
                '&:hover img': { transform: 'scale(1.03)' },
              }}>
                <Box component="img"
                  src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=700&q=80"
                  alt="Office location"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
                />
                <Box sx={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${palette.primary.dark}30, transparent 50%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Box sx={{
                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
                    borderRadius: '100px', px: 2.5, py: 1,
                    display: 'flex', alignItems: 'center', gap: 1,
                  }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: palette.primary.main }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, color: palette.text.primary, fontFamily: typography.fontFamily }}>
                      View on Google Maps
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: 13, color: palette.primary.main }} />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* FAQ */}
            <Box>
              <Box sx={{
                display: 'inline-block', px: 2.5, py: 0.6,
                background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`,
                borderRadius: '100px', mb: 2.5,
              }}>
                <Typography variant="overline" sx={{ color: palette.primary.main }}>Quick Answers</Typography>
              </Box>
              <Typography variant="h3" sx={{ color: palette.text.primary, mb: 2, fontSize: { xs: '1.8rem', md: '2.4rem' } }}>
                Before You<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, color: palette.primary.main }}>
                  Reach Out
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300, mb: 4 }}>
                Most questions are answered below. If yours isn't, our team is always happy to help.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  ...faqs,
                  { q: 'Do you have a member portal?', a: 'Yes. Active members can log in at any time to check savings, request loans, and download statements.' },
                  { q: 'How do I escalate a complaint?', a: 'Use the contact form above marked "Complaint / Escalation" or email complaints@codebridgecoop.ng directly.' },
                ].map((faq, i) => (
                  <Box key={i} sx={{
                    p: 3, borderRadius: `${br * 1.5}px`,
                    background: palette.background.paper,
                    border: `1px solid ${palette.background.default}`,
                    transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                    '&:hover': {
                      transform: 'translateX(5px)',
                      borderColor: `${palette.primary.main}20`,
                      boxShadow: `0 8px 28px ${palette.primary.main}0a`,
                    },
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0, mt: 0.2,
                        background: `${palette.primary.main}12`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: palette.primary.main }} />
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, mb: 0.5 }}>
                          {faq.q}
                        </Typography>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, display: 'block' }}>
                          {faq.a}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>


      {/* ── CTA ───────────────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: heroGradient,
        py: { xs: 10, md: 14 }, overflow: 'hidden',
      }}>
        {[{ size: 500, top: -100, right: -100 }, { size: 400, bottom: -100, left: -100 }].map((b, i) => (
          <Box key={i} sx={{
            position: 'absolute', width: b.size, height: b.size, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.07), transparent 70%)',
            top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none',
          }} />
        ))}

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h1" sx={{
              color: '#fff', mb: 2,
              fontSize: { xs: '2.6rem', md: '3.8rem' },
            }}>
              Ready to Join Our<br />
              <Box component="span" sx={{
                fontStyle: 'italic', fontWeight: 300,
                background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Community?
              </Box>
            </Typography>
            <Typography variant="subtitle1" sx={{
              color: 'rgba(255,255,255,0.62)', mb: 6, maxWidth: 480, mx: 'auto', fontWeight: 300,
            }}>
              Still have questions? Reach out — or take the leap and join 1,240+ members building
              their financial future with CodeBridge.
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
                Membership Info
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

export default Contact;