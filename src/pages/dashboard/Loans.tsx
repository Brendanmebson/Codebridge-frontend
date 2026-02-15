import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../../utils/api';
import type { Loan } from '../../types';

const Loans: React.FC = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await api.get('/loans');
      setLoans(response.data.loans || []);
    } catch (err) {
      setError('Failed to load loans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
    const colorMap: Record<string, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
      pending: 'warning',
      approved: 'info',
      disbursed: 'primary',
      completed: 'success',
      rejected: 'error',
    };
    return colorMap[status] || 'default';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Typography>Loading loans...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Loans
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard/loans/apply')}
        >
          Apply for New Loan
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 3 }}>
          {error}
        </Alert>
      )}

      {loans.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', paddingY: 6 }}>
            <Typography variant="h6" color="text.secondary" sx={{ marginBottom: 2 }}>
              You haven't applied for any loans yet
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard/loans/apply')}
            >
              Apply for Your First Loan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {loans.map((loan) => (
            <Card key={loan.id}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 2,
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ textTransform: 'capitalize', marginBottom: 0.5 }}>
                      {loan.loan_type} Loan
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Applied: {format(new Date(loan.application_date), 'MMM dd, yyyy')}
                    </Typography>
                  </Box>
                  <Chip
                    label={loan.status.toUpperCase()}
                    color={getStatusColor(loan.status)}
                    size="small"
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    marginY: 2,
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Amount Requested
                    </Typography>
                    <Typography variant="h6">
                      ₦{parseFloat(loan.amount_requested.toString()).toLocaleString('en-NG')}
                    </Typography>
                  </Box>

                  {loan.amount_approved && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Amount Approved
                      </Typography>
                      <Typography variant="h6" color="success.main">
                        ₦{parseFloat(loan.amount_approved.toString()).toLocaleString('en-NG')}
                      </Typography>
                    </Box>
                  )}

                  {loan.outstanding_balance !== undefined && loan.status === 'disbursed' && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Outstanding Balance
                      </Typography>
                      <Typography variant="h6" color="error.main">
                        ₦{parseFloat(loan.outstanding_balance.toString()).toLocaleString('en-NG')}
                      </Typography>
                    </Box>
                  )}

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Duration
                    </Typography>
                    <Typography variant="h6">
                      {loan.duration_months} months
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Interest Rate
                    </Typography>
                    <Typography variant="h6">
                      {loan.interest_rate}%
                    </Typography>
                  </Box>

                  {loan.monthly_repayment && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Monthly Repayment
                      </Typography>
                      <Typography variant="h6">
                        ₦{parseFloat(loan.monthly_repayment.toString()).toLocaleString('en-NG')}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                  <strong>Purpose:</strong> {loan.purpose}
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate(`/dashboard/loans/${loan.id}`)}
                  sx={{ marginTop: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Loans;