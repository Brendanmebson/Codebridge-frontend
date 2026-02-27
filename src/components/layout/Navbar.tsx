import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.jpg';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const { palette, shape } = theme;
  const br = shape.borderRadius as number;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isDashboard = location.pathname.startsWith('/dashboard');

  // Detect scroll to toggle glass effect intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const publicNavItems = [
    { label: 'Home', path: '/', icon: <HomeOutlinedIcon sx={{ fontSize: 18 }} /> },
    { label: 'About', path: '/about', icon: <InfoOutlinedIcon sx={{ fontSize: 18 }} /> },
    { label: 'Services', path: '/services', icon: <MiscellaneousServicesIcon sx={{ fontSize: 18 }} /> },
    { label: 'Membership', path: '/membership', icon: <BadgeOutlinedIcon sx={{ fontSize: 18 }} /> },
    { label: 'Contact', path: '/contact', icon: <ContactMailOutlinedIcon sx={{ fontSize: 18 }} /> },
  ];

  const dashboardNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon sx={{ fontSize: 18 }} /> },
    { label: 'Savings', path: '/dashboard/savings', icon: <SavingsIcon sx={{ fontSize: 18 }} /> },
    { label: 'Loans', path: '/dashboard/loans', icon: <AccountBalanceIcon sx={{ fontSize: 18 }} /> },
  ];

  const navItems = user ? dashboardNavItems : publicNavItems;

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // ── MOBILE DRAWER ─────────────────────────────────────────────
  const drawer = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: palette.background.paper,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Drawer background blob */}
      <Box sx={{
        position: 'absolute', bottom: -80, right: -80,
        width: 260, height: 260, borderRadius: '50%',
        background: `radial-gradient(circle, ${palette.primary.main}12, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', top: -60, left: -60,
        width: 200, height: 200, borderRadius: '50%',
        background: `radial-gradient(circle, ${palette.primary.light}08, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Drawer header */}
      <Box sx={{
        px: 3, pt: 3, pb: 2.5,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Box component={Link} to={isDashboard ? '/dashboard' : '/'} onClick={handleDrawerToggle}
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box component="img" src={logo} alt="CodeBridge Logo"
            sx={{ height: 34, width: 'auto', borderRadius: `${br - 4}px` }} />
        </Box>
        <IconButton onClick={handleDrawerToggle} size="small" sx={{
          background: `${palette.primary.main}10`,
          color: palette.text.primary,
          '&:hover': { background: `${palette.primary.main}18` },
        }}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Divider sx={{ mx: 3, borderColor: `${palette.primary.main}15` }} />

      {/* Nav items */}
      <Box sx={{ px: 2.5, pt: 2.5, flex: 1 }}>
        <Typography variant="overline" sx={{
          color: palette.text.secondary, px: 1.5, mb: 1, display: 'block',
          fontSize: '0.68rem', letterSpacing: '0.08em',
        }}>
          {user ? 'My Account' : 'Navigation'}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Box
                key={item.path}
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.75,
                  px: 2, py: 1.5,
                  borderRadius: `${br}px`,
                  textDecoration: 'none',
                  background: active ? `linear-gradient(135deg, ${palette.primary.main}18, ${palette.primary.dark}10)` : 'transparent',
                  border: `1px solid ${active ? palette.primary.main + '20' : 'transparent'}`,
                  color: active ? palette.primary.main : palette.text.primary,
                  transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                  '&:hover': {
                    background: `${palette.primary.main}0e`,
                    color: palette.primary.main,
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <Box sx={{
                  width: 32, height: 32, borderRadius: `${br - 4}px`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: active ? `${palette.primary.main}15` : `${palette.text.primary}08`,
                  color: active ? palette.primary.main : palette.text.secondary,
                  flexShrink: 0,
                }}>
                  {item.icon}
                </Box>
                <Typography sx={{
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '0.92rem',
                  fontWeight: active ? 600 : 400,
                  letterSpacing: active ? '0.01em' : 0,
                }}>
                  {item.label}
                </Typography>
                {active && (
                  <Box sx={{
                    ml: 'auto', width: 6, height: 6, borderRadius: '50%',
                    background: palette.primary.main,
                  }} />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Drawer footer */}
      <Box sx={{ px: 2.5, pb: 4, pt: 2 }}>
        <Divider sx={{ mb: 2.5, borderColor: `${palette.primary.main}12` }} />

        {user ? (
          <>
            {/* User info chip */}
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              px: 2, py: 1.5, mb: 2,
              background: palette.background.default,
              borderRadius: `${br}px`,
              border: `1px solid ${palette.primary.main}15`,
            }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: '50%',
                background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <GroupsIcon sx={{ fontSize: 18, color: '#fff' }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: palette.text.primary, lineHeight: 1.2, noWrap: true }}>
                  {user.email?.split('@')[0] ?? 'Member'}
                </Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary }}>Active Member</Typography>
              </Box>
            </Box>
            <Button
              fullWidth
              onClick={() => { handleLogout(); handleDrawerToggle(); }}
              startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
              sx={{
                justifyContent: 'flex-start',
                color: theme.palette.error.main,
                background: `${theme.palette.error.main}0a`,
                border: `1px solid ${theme.palette.error.main}20`,
                borderRadius: `${br}px`,
                textTransform: 'none',
                fontFamily: theme.typography.fontFamily,
                fontWeight: 500,
                py: 1.25,
                '&:hover': { background: `${theme.palette.error.main}14` },
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              fullWidth
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              variant="outlined"
              sx={{
                borderColor: `${palette.primary.main}50`,
                color: palette.primary.main,
                borderRadius: `${br}px`,
                textTransform: 'none',
                fontFamily: theme.typography.fontFamily,
                fontWeight: 500,
                py: 1.25,
                '&:hover': { background: `${palette.primary.main}08`, borderColor: palette.primary.main },
              }}
            >
              Login
            </Button>
            <Button
              fullWidth
              component={Link}
              to="/register"
              onClick={handleDrawerToggle}
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
              sx={{
                background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                boxShadow: `0 6px 20px ${palette.primary.main}35`,
                borderRadius: `${br}px`,
                textTransform: 'none',
                fontFamily: theme.typography.fontFamily,
                fontWeight: 600,
                py: 1.25,
                '&:hover': { boxShadow: `0 10px 28px ${palette.primary.main}45` },
              }}
            >
              Get Started
            </Button>
          </Box>
        )}

        {/* Bottom trust line */}
        {!user && (
          <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Box sx={{ display: 'flex' }}>
              {[
                'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&q=80',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&q=80',
              ].map((img, i) => (
                <Box key={i} sx={{
                  width: 22, height: 22, borderRadius: '50%', overflow: 'hidden',
                  border: `1.5px solid ${palette.background.paper}`,
                  ml: i > 0 ? -0.75 : 0,
                }}>
                  <Box component="img" src={img} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.7rem' }}>
              1,240+ members
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  // ── DESKTOP NAV ───────────────────────────────────────────────
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: scrolled
            ? 'rgba(255,255,255,0.82)'
            : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? palette.primary.main + '14' : palette.divider}`,
          boxShadow: scrolled ? `0 4px 32px ${palette.primary.main}0e` : 'none',
          transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{
          justifyContent: 'space-between',
          px: { xs: 2, md: 4, lg: 8 },
          minHeight: { xs: 60, md: 68 },
        }}>

          {/* ── LOGO ── */}
          <Box
            component={Link}
            to={isDashboard ? '/dashboard' : '/'}
            sx={{
              display: 'flex', alignItems: 'center',
              gap: 1.5, textDecoration: 'none',
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.82 },
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="CodeBridge Logo"
              sx={{
                height: { xs: 34, md: 40 },
                width: 'auto',
                borderRadius: `${br - 2}px`,
              }}
            />
          </Box>

          {/* ── MOBILE MENU BUTTON ── */}
          {isMobile ? (
            <IconButton
              onClick={handleDrawerToggle}
              size="small"
              sx={{
                width: 38, height: 38,
                background: mobileOpen ? `${palette.primary.main}12` : `${palette.text.primary}06`,
                border: `1px solid ${palette.primary.main}15`,
                borderRadius: `${br - 4}px`,
                color: palette.text.primary,
                transition: 'all 0.25s',
                '&:hover': { background: `${palette.primary.main}12` },
              }}
            >
              {mobileOpen ? <CloseIcon sx={{ fontSize: 18 }} /> : <MenuIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          ) : (

            // ── DESKTOP NAV LINKS + ACTIONS ──
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>

              {/* Nav pill container */}
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 0.5,
                background: `${palette.text.primary}04`,
                border: `1px solid ${palette.primary.main}10`,
                borderRadius: '100px',
                px: 0.75, py: 0.5,
                mr: 2,
              }}>
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Box
                      key={item.path}
                      component={Link}
                      to={item.path}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 0.75,
                        px: 1.75, py: 0.9,
                        borderRadius: '100px',
                        textDecoration: 'none',
                        position: 'relative',
                        background: active
                          ? `linear-gradient(135deg, ${palette.primary.main}18, ${palette.primary.dark}10)`
                          : 'transparent',
                        border: `1px solid ${active ? palette.primary.main + '22' : 'transparent'}`,
                        color: active ? palette.primary.main : palette.text.secondary,
                        transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                        '&:hover': {
                          color: palette.primary.main,
                          background: `${palette.primary.main}0c`,
                        },
                      }}
                    >
                      <Typography sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '0.875rem',
                        fontWeight: active ? 600 : 400,
                        lineHeight: 1,
                        letterSpacing: active ? '0.01em' : 0,
                        whiteSpace: 'nowrap',
                      }}>
                        {item.label}
                      </Typography>
                      {active && (
                        <Box sx={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: palette.primary.main,
                          flexShrink: 0,
                        }} />
                      )}
                    </Box>
                  );
                })}
              </Box>

              {/* Auth actions */}
              {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  {/* User avatar chip */}
                  <Box sx={{
                    display: 'flex', alignItems: 'center', gap: 1.25,
                    px: 1.5, py: 0.75,
                    background: palette.background.default,
                    border: `1px solid ${palette.primary.main}18`,
                    borderRadius: '100px',
                  }}>
                    <Box sx={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#fff', fontFamily: theme.typography.fontFamily }}>
                        {(user.email?.[0] ?? 'M').toUpperCase()}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{
                      fontFamily: theme.typography.fontFamily,
                      fontWeight: 500, color: palette.text.primary,
                      maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {user.email?.split('@')[0] ?? 'Member'}
                    </Typography>
                  </Box>

                  <Button
                    onClick={handleLogout}
                    startIcon={<LogoutIcon sx={{ fontSize: 15 }} />}
                    size="small"
                    sx={{
                      color: theme.palette.error.main,
                      background: `${theme.palette.error.main}08`,
                      border: `1px solid ${theme.palette.error.main}20`,
                      borderRadius: '100px',
                      textTransform: 'none',
                      fontFamily: theme.typography.fontFamily,
                      fontWeight: 500,
                      fontSize: '0.82rem',
                      px: 1.75, py: 0.75,
                      '&:hover': { background: `${theme.palette.error.main}14` },
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: palette.text.primary,
                      fontFamily: theme.typography.fontFamily,
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      textTransform: 'none',
                      px: 2, py: 0.9,
                      borderRadius: '100px',
                      border: `1px solid ${palette.primary.main}25`,
                      background: 'transparent',
                      '&:hover': {
                        background: `${palette.primary.main}08`,
                        borderColor: `${palette.primary.main}50`,
                        color: palette.primary.main,
                      },
                      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    Login
                  </Button>

                  {/* Register — kept commented out as per original, but styled: */}
                  {/* <Button
                    component={Link}
                    to="/register"
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                    sx={{
                      background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                      color: '#fff',
                      fontFamily: theme.typography.fontFamily,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textTransform: 'none',
                      px: 2.5, py: 0.9,
                      borderRadius: '100px',
                      boxShadow: `0 4px 16px ${palette.primary.main}35`,
                      '&:hover': { boxShadow: `0 8px 24px ${palette.primary.main}45` },
                      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    Get Started
                  </Button> */}
                </Box>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* ── MOBILE DRAWER ── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            border: 'none',
            boxShadow: `-8px 0 48px ${palette.primary.main}14, -2px 0 12px rgba(0,0,0,0.08)`,
          },
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
            background: 'rgba(0,0,0,0.18)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;