import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Alert,
  InputAdornment, IconButton, useTheme,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';

const Login: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  const navigate = useNavigate();
  const { login, loading: authLoading, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message || 'Login failed. Check your credentials.');
      } else {
        setError('Login failed. Check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const isSubmitting = loading;

  const fieldSx = (name: string) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: `${br * 1.5}px`,
      fontFamily: typography.fontFamily,
      fontSize: '0.88rem',
      background: focused === name ? palette.background.paper : `${palette.primary.main}04`,
      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      '& fieldset': {
        borderColor: focused === name ? palette.primary.main : `${palette.primary.main}20`,
        borderWidth: focused === name ? 2 : 1,
        transition: 'all 0.25s',
      },
      '&:hover fieldset': { borderColor: `${palette.primary.main}50` },
      '&.Mui-focused fieldset': { borderColor: palette.primary.main },
    },
    '& .MuiInputLabel-root': {
      fontFamily: typography.fontFamily,
      fontSize: '0.85rem',
      color: palette.text.secondary,
      '&.Mui-focused': { color: palette.primary.main },
    },
    '& .MuiInputBase-input': { py: '11px' },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      transition: 'color 0.25s',
      color: focused === name ? palette.primary.main : palette.text.secondary,
    },
  });

  const stats = [
    { icon: <GroupsIcon sx={{ fontSize: 16 }} />, value: '1,240+', label: 'Active Members' },
    { icon: <TrendingUpIcon sx={{ fontSize: 16 }} />, value: '₦1.2B+', label: 'Total Disbursed' },
    { icon: <ShieldOutlinedIcon sx={{ fontSize: 16 }} />, value: '98%', label: 'Loan Approval Rate' },
  ];

  const memberAvatars = [
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80',
    'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=60&q=80',
  ];

  // Show spinner while auth state is being resolved
  if (authLoading) {
    return (
      <Box sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: palette.background.default,
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{
            width: 40, height: 40, borderRadius: '50%',
            border: `3px solid ${palette.primary.main}20`,
            borderTop: `3px solid ${palette.primary.main}`,
            animation: 'spin 0.8s linear infinite',
            mx: 'auto', mb: 2,
            '@keyframes spin': { to: { transform: 'rotate(360deg)' } },
          }} />
          <Typography variant="caption" sx={{ color: palette.text.secondary }}>
            Loading…
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      height: '100vh',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      fontFamily: typography.fontFamily,
    }}>

      {/* ── LEFT PANEL ──────────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: 6, py: 5,
        overflow: 'hidden',
        height: '100vh',
      }}>
        {/* Blobs */}
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.09), transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundSize: '200px', opacity: 0.6 }} />
        {[...Array(5)].map((_, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.45)', top: `${15 + i * 15}%`, right: `${6 + (i % 3) * 5}%`, animation: `d${i} ${2.8 + i * 0.3}s ease-in-out ${i * 0.35}s infinite`, [`@keyframes d${i}`]: { '0%,100%': { opacity: 0.15, transform: 'scale(1)' }, '50%': { opacity: 0.9, transform: 'scale(1.6)' } } }} />
        ))}

        {/* Middle: content */}
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.6, mb: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', width: 'fit-content' }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: palette.secondary.light, boxShadow: `0 0 8px ${palette.secondary.light}`, animation: 'blink 2.5s ease infinite', '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', letterSpacing: '0.06em', fontWeight: 500 }}>Secure Member Portal</Typography>
          </Box>

          <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '2.8rem', fontWeight: 700, color: '#fff', lineHeight: 1.1, mb: 1.5 }}>
            Welcome<br />
            <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Back
            </Box>
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 320, fontWeight: 300, mb: 4 }}>
            Login to access your cooperative account, manage savings, apply for loans, and track your financial progress.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {stats.map((s, i) => (
              <Box key={i} sx={{
                display: 'flex', alignItems: 'center', gap: 2, p: 1.5,
                background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: `${br * 1.5}px`,
                transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                '&:hover': { background: 'rgba(255,255,255,0.14)', transform: 'translateX(4px)' },
              }}>
                <Box sx={{ width: 32, height: 32, borderRadius: `${br - 2}px`, flexShrink: 0, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.secondary.light }}>
                  {s.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '1rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.value}</Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem' }}>{s.label}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Bottom: Social proof */}
        <Box sx={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: 'flex' }}>
            {memberAvatars.map((img, i) => (
              <Box key={i} sx={{ width: 28, height: 28, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.35)', ml: i > 0 ? -1.25 : 0 }}>
                <Box component="img" src={img} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            ))}
          </Box>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, fontSize: '0.72rem' }}>
            1,240 members already<br />on the platform
          </Typography>
        </Box>
      </Box>

      {/* ── RIGHT PANEL ─────────────────────────────────────── */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 3, sm: 6, md: 6 },
        background: palette.background.default,
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <Box sx={{ position: 'absolute', bottom: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${palette.primary.main}06, transparent 70%)`, pointerEvents: 'none' }} />

        <Box sx={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

          {/* Heading */}
          <Box sx={{ mb: 3.5 }}>
            <Box sx={{ display: 'inline-block', px: 2, py: 0.5, background: `${palette.primary.main}10`, border: `1px solid ${palette.primary.main}22`, borderRadius: '100px', mb: 2 }}>
              <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '0.68rem', fontWeight: 700, color: palette.primary.main, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Member Portal
              </Typography>
            </Box>
            <Typography sx={{ fontFamily: typography.fontFamily, fontSize: '2rem', fontWeight: 700, color: palette.text.primary, lineHeight: 1.2, mb: 0.5 }}>
              Member Login
            </Typography>
            <Typography variant="body2" sx={{ color: palette.text.secondary, fontWeight: 300, fontSize: '0.85rem' }}>
              Access your cooperative account
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily, background: 'rgba(211,47,47,0.06)', border: '1px solid rgba(211,47,47,0.18)', py: 0.5, '& .MuiAlert-icon': { color: 'error.main' } }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required fullWidth
              name="email" label="Email Address" type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={fieldSx('email')}
            />

            <TextField
              required fullWidth
              name="password" label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ fontSize: 18 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small" sx={{ color: palette.text.secondary, '&:hover': { color: palette.primary.main } }}>
                      {showPassword ? <VisibilityOff sx={{ fontSize: 17 }} /> : <Visibility sx={{ fontSize: 17 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={fieldSx('password')}
            />

            {/* Forgot */}
            <Box sx={{ textAlign: 'right', mt: -0.75 }}>
              <Button component={Link} to="/forgot-password"
                sx={{ fontFamily: typography.fontFamily, textTransform: 'none', fontSize: '0.8rem', color: palette.primary.main, p: 0, minWidth: 0, fontWeight: 500, '&:hover': { background: 'transparent', textDecoration: 'underline' } }}>
                Forgot Password?
              </Button>
            </Box>

            {/* Submit */}
            <Button
              type="submit" fullWidth variant="contained" size="large"
              disabled={isSubmitting}
              endIcon={!isSubmitting ? <ArrowForwardIcon sx={{ fontSize: 17 }} /> : undefined}
              sx={{
                background: isSubmitting ? `${palette.primary.main}70` : `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                color: '#fff',
                fontFamily: typography.fontFamily,
                fontWeight: 600, fontSize: '0.93rem',
                py: 1.5,
                borderRadius: `${br * 1.5}px`,
                textTransform: 'none',
                boxShadow: isSubmitting ? 'none' : `0 8px 24px ${palette.primary.main}35`,
                transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                '&:hover:not(:disabled)': { boxShadow: `0 14px 36px ${palette.primary.main}50`, transform: 'translateY(-1px)' },
                '&.Mui-disabled': { color: 'rgba(255,255,255,0.6)' },
              }}
            >
              {isSubmitting ? 'Logging in…' : 'Login to Account'}
            </Button>
          </Box>

          {/* Trust row */}
          <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${palette.primary.main}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.25 }}>
            <Box sx={{ width: 26, height: 26, borderRadius: `${br - 4}px`, background: `${palette.primary.main}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: palette.primary.main }}>
              <ShieldOutlinedIcon sx={{ fontSize: 14 }} />
            </Box>
            <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.76rem' }}>
              Secured with 256-bit SSL encryption
            </Typography>
          </Box>

          {/* Footer link */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.78rem' }}>
              Not a member yet?{' '}
              <Button component={Link} to="/membership"
                sx={{ fontFamily: typography.fontFamily, textTransform: 'none', fontSize: '0.78rem', color: palette.primary.main, p: 0, minWidth: 0, fontWeight: 600, '&:hover': { background: 'transparent', textDecoration: 'underline' } }}>
                Learn about membership
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default Login;