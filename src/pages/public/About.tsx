import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';

const About: React.FC = () => {
  const values = [
    { title: 'Integrity', description: 'Upholding honesty and ethical standards in all operations' },
    { title: 'Accountability', description: 'Taking responsibility for our actions and decisions' },
    { title: 'Member-First Approach', description: 'Prioritizing member needs and wellbeing' },
    { title: 'Transparency', description: 'Operating with openness and clear communication' },
    { title: 'Mutual Support', description: 'Fostering collective growth and shared success' },
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
            About Us
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 800 }}>
            Who We Are
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ paddingY: { xs: 6, md: 10 }, paddingX: { xs: 2, md:4 } }}>
{/* Mission Statement */}
<Box sx={{ marginBottom: 8 }}>
<Typography variant="body1" sx={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: 4 }}>
CodeBridge Multi-Purpose Cooperative Society is a duly registered cooperative
society committed to empowering its members through collective savings, access
to credit, and sustainable financial solutions. We operate on cooperative
principles of transparency, accountability, equity, and mutual benefit.
</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          marginTop: 6,
        }}
      >
        <Box
          sx={{
            flex: 1,
            padding: 4,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            borderLeft: '4px solid',
            borderColor: 'primary.main',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
            Our Vision
          </Typography>
          <Typography variant="body1" color="text.secondary">
            To be a trusted cooperative society that empowers members financially
            and promotes sustainable economic growth.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            padding: 4,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            borderLeft: '4px solid',
            borderColor: 'primary.main',
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" color="text.secondary">
            To mobilize savings, provide accessible credit facilities, and deliver
            welfare support to members through efficient and transparent cooperative
            management.
          </Typography>
        </Box>
      </Box>
    </Box>

    {/* Core Values */}
    <Box>
      <Typography variant="h3" sx={{ marginBottom: 4, textAlign: 'center' }}>
        Our Core Values
      </Typography>

      <Stack spacing={3}>
        {values.map((value, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              padding: 3,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                minWidth: { xs: '100%', sm: '200px' },
              }}
            >
              {value.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {value.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  </Container>
</Box>
);
};
export default About;