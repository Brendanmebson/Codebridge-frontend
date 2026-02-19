import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Membership: React.FC = () => {
  const benefits = [
    'Access to low-interest loans',
    'Structured savings plans with competitive dividends',
    'Welfare support in times of need',
    'Participation in cooperative decision-making',
    'Financial literacy and education programs',
    'Secure and transparent account management',
  ];

  const requirements = [
    'Valid government-issued identification',
    'Passport photograph',
    'Initial savings contribution (minimum ₦5,000)',
    'Residential address verification',
  ];

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          paddingY: { xs: 6, md: 8 },
          paddingX: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ marginBottom: 2 }}>
            Membership
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 800 }}>
            Join a financially empowered community
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ paddingY: { xs: 6, md: 10 }, paddingX: { xs: 2, md: 4 } }}>
        {/* Introduction */}
        <Box sx={{ marginBottom: 6, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Why Join CodeBridge?
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, margin: '0 auto', fontSize: '1.125rem' }}>
            By joining CodeBridge, you become part of a financially empowered community
            where members support one another to achieve common economic goals through
            collective savings, affordable credit, and mutual welfare.
          </Typography>
        </Box>

        {/* Benefits */}
        <Box sx={{ marginBottom: 6 }}>
          <Typography variant="h4" sx={{ marginBottom: 3 }}>
            Benefits of Membership
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {benefits.map((benefit, index) => (
              <Box
                key={index}
                sx={{
                  flex: { xs: '1 1 100%', md: '1 1 calc(50% - 8px)' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  padding: 2,
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                }}
              >
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 32 }} />
                <Typography variant="body1">{benefit}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Requirements */}
        <Card sx={{ marginBottom: 6 }}>
          <CardContent sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
              Membership Requirements
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              Prospective members are required to have completed a registration
              form and submitted the necessary documents, then just Login:
            </Typography>

            <Box component="ul" sx={{ marginLeft: 3 }}>
              {requirements.map((requirement, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body1"
                  sx={{ marginBottom: 1.5 }}
                >
                  {requirement}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* CTA */}
        <Box
          sx={{
            textAlign: 'center',
            padding: 6,
            backgroundColor: 'secondary.light',
            borderRadius: 3,
            color: 'white',
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, opacity: 0.95 }}>
            Join thousands of members building financial security together
          </Typography>
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
        </Box>
      </Container>
    </Box>
  );
};

export default Membership;