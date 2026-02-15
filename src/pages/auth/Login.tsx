import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth(); // AuthContext loading
  const [loading, setLoading] = useState(false); // Component loading
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login using AuthContext
      await login(formData.email, formData.password);
      navigate('/dashboard'); // go to dashboard
    } catch (err: unknown) {
      console.error('Login failed:', err);

      if (err && typeof err === 'object' && 'message' in err) {
        const errorObj = err as { message: string };
        setError(errorObj.message || 'Login failed. Check your credentials.');
      } else {
        setError('Login failed. Check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 10 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" mb={1}>
          Member Login
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Access your cooperative account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading || authLoading} // disable while fetching profile
            >
              {loading || authLoading ? 'Logging in...' : 'Login'}
            </Button>

            <Box textAlign="center">
              <Button component={Link} to="/forgot-password" sx={{ textTransform: 'none', fontSize: '0.875rem' }}>
                Forgot Password?
              </Button>
            </Box>

            <Typography variant="body2" textAlign="center" mt={2}>
              Don't have an account?{' '}
              <Button component={Link} to="/register" sx={{ textTransform: 'none', p: 0 }}>
                Register here
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;