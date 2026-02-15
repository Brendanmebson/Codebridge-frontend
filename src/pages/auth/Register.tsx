import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    idType: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
  });

  const idTypes = [
    'National ID',
    'International Passport',
    "Driver's License",
    "Voter's Card",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        idType: formData.idType,
        idNumber: formData.idNumber,
        password: formData.password,
      });

      setSuccess(response.data.message + ' Member Number: ' + response.data.memberNumber);
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        idType: '',
        idNumber: '',
        password: '',
        confirmPassword: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || 'Registration failed');
      } else {
        setError('Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingY: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          Register With Us
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 4 }}>
          Join CodeBridge Cooperative Society
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: '100%', marginBottom: 2 }}>
            {success}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: '100%' }}
        >
          <Stack spacing={2.5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <TextField
                required
                fullWidth
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                required
                fullWidth
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Box>

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
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              name="address"
              label="Residential Address"
              multiline
              rows={2}
              value={formData.address}
              onChange={handleChange}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <TextField
                required
                fullWidth
                select
                name="idType"
                label="ID Type"
                value={formData.idType}
                onChange={handleChange}
              >
                {idTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                required
                fullWidth
                name="idNumber"
                label="ID Number"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </Box>

            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              helperText="Minimum 8 characters"
            />

            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ marginTop: 2 }}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 2 }}>
              Already have an account?{' '}
              <Button
                onClick={() => navigate('/login')}
                sx={{ textTransform: 'none', padding: 0 }}
              >
                Login here
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;