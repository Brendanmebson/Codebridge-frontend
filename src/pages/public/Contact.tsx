import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Stack,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to backend
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Address',
      details: '123 Cooperative Avenue, Lagos, Nigeria',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Phone',
      details: '+234 800 123 4567',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email',
      details: 'info@codebridge.coop',
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
Contact Us
</Typography>
<Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 800 }}>
Get in Touch
</Typography>
</Container>
</Box>
  <Container maxWidth="lg" sx={{ paddingY: { xs: 6, md: 10 }, paddingX: { xs: 2, md: 4 } }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
      }}
    >
      {/* Contact Form */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Send Us a Message
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ marginBottom: 3 }}>
            Thank you for your message! We'll get back to you soon.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              name="subject"
              label="Subject"
              value={formData.subject}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              multiline
              rows={5}
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            >
              Send Message
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Contact Information */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Contact Information
        </Typography>

        <Stack spacing={3}>
          {contactInfo.map((info, index) => (
            <Card key={index}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box sx={{ color: 'primary.main' }}>
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ marginBottom: 0.5 }}>
                      {info.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {info.details}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Card sx={{ marginTop: 3, backgroundColor: 'secondary.light', color: 'white' }}>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Office Hours
            </Typography>
            <Typography variant="body1">
              Monday - Friday: 9:00 AM - 5:00 PM
            </Typography>
            <Typography variant="body1">
              Saturday: 10:00 AM - 2:00 PM
            </Typography>
            <Typography variant="body1">
              Sunday: Closed
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  </Container>
</Box>
);
};
export default Contact;