import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, InputAdornment, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SavingsIcon from '@mui/icons-material/Savings';

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
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
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

  const isSubmitting = loading || authLoading;

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* ── LEFT PANEL ───────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(135deg, ${C.primaryDark} 0%, ${C.primaryMain} 55%, ${C.secondaryDark} 100%)`,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: 7, py: 8,
        overflow: 'hidden',
      }}>
        {/* Shapes */}
        <Box sx={{ position: 'absolute', top: '-80px', right: '-80px', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', border: '1px solid rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-60px', left: '-60px', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', top: '40%', right: '10%', width: 120, height: 120, borderRadius: '70% 30% 60% 40% / 50% 60% 40% 50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', transform: 'rotate(25deg)', pointerEvents: 'none' }} />
        {[...Array(4)].map((_, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.4)', top: `${18 + i * 18}%`, right: `${6 + (i % 2) * 8}%`, animation: `lp${i} ${2.5 + i * 0.4}s ease-in-out ${i * 0.4}s infinite`, [`@keyframes lp${i}`]: { '0%,100%': { opacity: 0.2 }, '50%': { opacity: 0.8 } } }} />
        ))}

        {/* Logo mark */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 6, position: 'relative', zIndex: 2 }}>
          <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
            <SavingsIcon sx={{ fontSize: 24, color: '#fff' }} />
          </Box>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
            CodeBridge
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '2.6rem', fontWeight: 900, color: '#fff', lineHeight: 1.15, mb: 2 }}>
            Welcome<br />
            <Box component="span" sx={{ background: 'linear-gradient(90deg, #A5D6A7, #E8F5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Back
            </Box>
          </Typography>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, mb: 5, maxWidth: 360 }}>
            Login to access your cooperative account, manage savings, and apply for loans.
          </Typography>

          {/* Mini stats */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { value: '1,240+', label: 'Active Members' },
              { value: '₦1.2B', label: 'Total Disbursed' },
              { value: '98%', label: 'Loan Approval Rate' },
            ].map((stat, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 4, height: 36, borderRadius: 4, background: `linear-gradient(180deg, #A5D6A7, rgba(165,214,167,0.3))` }} />
                <Box>
                  <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.value}</Typography>
                  <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>{stat.label}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── RIGHT PANEL (Form) ────────────────────────────── */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 3, sm: 6, md: 7 },
        py: { xs: 8, md: 6 },
        background: C.bgDefault,
        minHeight: { xs: '100vh', md: 'auto' },
      }}>
        {/* Mobile logo */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 6 }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '11px', background: `linear-gradient(135deg, ${C.primaryMain}, ${C.primaryDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SavingsIcon sx={{ fontSize: 22, color: '#fff' }} />
          </Box>
          <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: C.textPrimary }}>CodeBridge</Typography>
        </Box>

        <Box sx={{ width: '100%', maxWidth: 420 }}>
          {/* Heading */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'inline-block', px: 2, py: 0.5, mb: 2, background: `${C.primaryMain}14`, border: `1px solid ${C.primaryMain}30`, borderRadius: '100px' }}>
              <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: C.primaryMain, fontWeight: 600, letterSpacing: '0.06em' }}>MEMBER PORTAL</Typography>
            </Box>
            <Typography sx={{ fontFamily: "'Playfair Display', serif", fontSize: { xs: '2rem', md: '2.4rem' }, fontWeight: 800, color: C.textPrimary, lineHeight: 1.2, mb: 1 }}>
              Member Login
            </Typography>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.97rem', color: C.textSecondary }}>
              Access your cooperative account
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px', fontFamily: "'DM Sans', sans-serif" }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              required fullWidth
              name="email" label="Email Address" type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ fontSize: 20, color: C.primaryMain }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: C.bgPaper,
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: C.primaryMain },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: C.primaryMain, borderWidth: 2 },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: C.primaryMain },
              }}
            />

            <TextField
              required fullWidth
              name="password" label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ fontSize: 20, color: C.primaryMain }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: C.bgPaper,
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: C.primaryMain },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: C.primaryMain, borderWidth: 2 },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: C.primaryMain },
              }}
            />

            {/* Forgot password */}
            <Box sx={{ textAlign: 'right', mt: -1 }}>
              <Button component={Link} to="/forgot-password"
                sx={{ fontFamily: "'DM Sans', sans-serif", textTransform: 'none', fontSize: '0.85rem', color: C.primaryMain, p: 0, minWidth: 0, '&:hover': { background: 'transparent', textDecoration: 'underline' } }}>
                Forgot Password?
              </Button>
            </Box>

            {/* Submit */}
            <Button
              type="submit" fullWidth variant="contained" size="large"
              disabled={isSubmitting}
              endIcon={!isSubmitting && <ArrowForwardIcon />}
              sx={{
                background: isSubmitting
                  ? `${C.primaryMain}80`
                  : `linear-gradient(135deg, ${C.primaryMain}, ${C.primaryDark})`,
                color: '#fff',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, fontSize: '1rem',
                py: 1.8, borderRadius: '12px',
                textTransform: 'none',
                boxShadow: isSubmitting ? 'none' : `0 8px 28px ${C.primaryMain}44`,
                transition: 'all 0.3s',
                '&:hover:not(:disabled)': {
                  background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primaryMain})`,
                  transform: 'translateY(-1px)',
                  boxShadow: `0 12px 36px ${C.primaryMain}55`,
                },
                '&.Mui-disabled': { color: '#fff' },
              }}
            >
              {isSubmitting ? 'Logging in...' : 'Login to Account'}
            </Button>
          </Box>

          {/* Footer links */}
          <Box sx={{ mt: 4, pt: 4, borderTop: `1px solid ${C.primaryMain}18`, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: C.textSecondary }}>
              Not a member yet?{' '}
              <Button component={Link} to="/membership"
                sx={{ fontFamily: "'DM Sans', sans-serif", textTransform: 'none', fontSize: '0.85rem', color: C.primaryMain, p: 0, minWidth: 0, fontWeight: 600, '&:hover': { background: 'transparent', textDecoration: 'underline' } }}>
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