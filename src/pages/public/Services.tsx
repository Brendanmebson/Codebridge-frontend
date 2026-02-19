import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Services: React.FC = () => {
  const savingsProducts = [
    {
      name: 'Regular Monthly Savings',
      description: 'Build consistent savings habits with monthly contributions',
      features: [
        'Flexible contribution amounts',
        'Dividend eligibility',
        'Loan access qualification',
      ],
    },
    {
      name: 'Target / Special Purpose Savings',
      description: 'Save towards specific goals with dedicated target accounts',
      features: [
        'Set savings targets',
        'Timeline-based goals',
        'Higher interest rates',
      ],
    },
  ];

  const loanProducts = [
    {
      name: 'Personal Loans',
      description: 'Meet your personal financial needs',
      rate: '12% p.a.',
    },
    {
      name: 'Business Loans',
      description: 'Grow your business with affordable capital',
      rate: '10% p.a.',
    },
    {
      name: 'Emergency Loans',
      description: 'Quick access to funds during emergencies',
      rate: '15% p.a.',
    },
    {
      name: 'Educational Loans',
      description: 'Invest in education and skill development',
      rate: '8% p.a.',
    },
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
            Our Services
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 800 }}>
            Comprehensive financial solutions designed to empower our members
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ paddingY: { xs: 6, md: 10 }, paddingX: { xs: 2, md: 4 } }}>
        {/* Savings Products */}
        <Box sx={{ marginBottom: 8 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 4,
            }}
          >
            <SavingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h3">
              Savings Products
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ marginBottom: 4, maxWidth: 800 }}>
            Our savings schemes are designed to help members cultivate a disciplined
            savings culture while building financial security. All savings accounts
            provide dividend eligibility, loan access qualification, and promote
            financial discipline.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
            }}
          >
            {savingsProducts.map((product, index) => (
              <Card
                key={index}
                sx={{
                  flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' },
                }}
              >
                <CardContent sx={{ padding: 4 }}>
                  <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: 1 }}>
                    Benefits:
                  </Typography>
                  <Box component="ul" sx={{ marginLeft: 3, marginTop: 0 }}>
                    {product.features.map((feature, idx) => (
                      <Typography
                        key={idx}
                        component="li"
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginBottom: 0.5 }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Loan Products */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              marginBottom: 4,
            }}
          >
            <AccountBalanceIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h3">
              Loan Services
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ marginBottom: 4, maxWidth: 800 }}>
            We provide affordable loan facilities to meet members' personal, business,
            and emergency needs. All loans are subject to eligibility criteria and
            cooperative policies.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              marginBottom: 4,
            }}
          >
            {loanProducts.map((product, index) => (
              <Card
                key={index}
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: 600 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 700,
                    }}
                  >
                    {product.rate}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="large"
            >
              Apply for a Loan
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;