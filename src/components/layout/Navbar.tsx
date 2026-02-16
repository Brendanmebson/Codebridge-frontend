import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.jpg';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = user
    ? [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Savings', path: '/dashboard/savings' },
        { label: 'Loans', path: '/dashboard/loans' },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Membership', path: '/membership' },
        { label: 'Contact', path: '/contact' },
      ];

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 3,
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map((item) => (
          <Button
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              justifyContent: 'flex-start',
              fontSize: '1rem',
              color: 'text.primary',
            }}
          >
            {item.label}
          </Button>
        ))}

        {user ? (
          <Button
            onClick={() => {
              handleLogout();
              handleDrawerToggle();
            }}
            variant="outlined"
            color="error"
            sx={{ marginTop: 2 }}
          >
            Logout
          </Button>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 2 }}>
            <Button
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              variant="outlined"
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              onClick={handleDrawerToggle}
              variant="contained"
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            paddingX: { xs: 2, md: 4, lg: 8 },
          }}
        >
          {/* LOGO */}
          <Box
            component={Link}
            to={isDashboard ? '/dashboard' : '/'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="CodeBridge Logo"
              sx={{
                height: { xs: 32, md: 40 },
                width: 'auto',
                cursor: 'pointer',
              }}
            />
          </Box>

          {isMobile ? (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: 'text.primary',
                    fontSize: '0.95rem',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="error"
                >
                  Logout
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button component={Link} to="/login" variant="outlined">
                    Login
                  </Button>
                  <Button component={Link} to="/register" variant="contained">
                    Register
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;