import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'white',
        paddingY: 6,
        paddingX: { xs: 2, md: 4, lg: 8 },
        marginTop: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 4,
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
            CodeBridge Multi-Purpose Cooperative Society
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
            A member-owned financial cooperative committed to promoting savings,
            providing affordable loans, and improving economic wellbeing through
            mutual support.
          </Typography>
        </Box>

        <Stack spacing={1} sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
            Quick Links
          </Typography>
          <Link
            to="/about"
            style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}
          >
            About Us
          </Link>
          <Link
            to="/services"
            style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}
          >
            Our Services
          </Link>
          <Link
            to="/membership"
            style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}
          >
            Membership
          </Link>
          <Link
            to="/contact"
            style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}
          >
            Contact Us
          </Link>
        </Stack>

        <Stack spacing={1} sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
            Legal
          </Typography>
          <Link
            to="/governance"
            style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}
          >
            Governance
          </Link>
          <Link
            to="/privacy"
            style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}
          >
            Terms & Conditions
          </Link>
        </Stack>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
            Contact
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, marginBottom: 1 }}>
            Email: info@codebridge.coop
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, marginBottom: 1 }}>
            Phone: +234 800 123 4567
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Address: 123 Cooperative Avenue, Lagos, Nigeria
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          marginTop: 4,
          paddingTop: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} CodeBridge Multi-Purpose Cooperative Society.
          All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;