import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Home: React.FC = () => {
  const features = [
    {
      icon: <SavingsIcon sx={{ fontSize: 48 }} />,
      title: 'Secure Savings Plans',
      description: 'Build financial security with our disciplined savings schemes',
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 48 }} />,
      title: 'Affordable Loans',
      description: 'Access credit facilities for personal, business, and emergency needs',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 48 }} />,
      title: 'Welfare Support',
      description: 'Benefit from mutual support during times of need',
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 48 }} />,
      title: 'Transparent Governance',
      description: 'Member-focused decision-making with full accountability',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'secondary.dark',
          color: 'white',
          paddingY: { xs: 8, md: 12 },
          paddingX: { xs: 2, md: 4, lg: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 3,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' },
                fontWeight: 700,
                maxWidth: 900,
              }}
            >
              Welcome to CodeBridge Multi-Purpose Cooperative Society
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                opacity: 0.95,
                maxWidth: 800,
                lineHeight: 1.7,
              }}
            >
              A member-owned financial cooperative established to promote savings,
              provide affordable loans, and improve the economic wellbeing of its
              members through mutual support and responsible financial management.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ marginTop: 2 }}
            >
              {/* <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  paddingX: 4,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                Register With Us
              </Button> */}
              {/* <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  paddingX: 4,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
               Login Now
              </Button> */}
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Core Offerings */}
      <Container
        maxWidth="lg"
        sx={{ paddingY: { xs: 8, md: 12 }, paddingX: { xs: 2, md: 4 } }}
      >
        <Box sx={{ textAlign: 'center', marginBottom: 6 }}>
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            Our Core Offerings
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, margin: '0 auto' }}>
            We provide comprehensive financial services designed to empower our members
            and promote sustainable economic growth.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 24px)' },
                minWidth: { xs: '100%', sm: '250px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 3,
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'background.paper',
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.08)',
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <Box sx={{ color: 'primary.main', marginBottom: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: 600 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          paddingY: { xs: 6, md: 8 },
          paddingX: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ marginBottom: 2 }}>
              Ready to Join Our Community?
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 4, opacity: 0.95 }}>
              Become part of a financially empowered community where members support
              one another to achieve common economic goals.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                Login Now
              </Button>
              <Button
                component={Link}
                to="/loans"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Apply for a Loan
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;