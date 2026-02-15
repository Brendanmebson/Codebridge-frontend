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
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const LoanApplication: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    loanType: '',
    amountRequested: '',
    durationMonths: '',
    purpose: '',
  });

  const loanTypes = [
    { value: 'personal', label: 'Personal Loan', rate: 12 },
    { value: 'business', label: 'Business Loan', rate: 10 },
    { value: 'emergency', label: 'Emergency Loan', rate: 15 },
    { value: 'educational', label: 'Educational Loan', rate: 8 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateMonthlyRepayment = (): number => {
    if (!formData.amountRequested || !formData.durationMonths || !formData.loanType) {
      return 0;
    }

    const principal = parseFloat(formData.amountRequested);
    const months = parseInt(formData.durationMonths);
    const annualRate = loanTypes.find(t => t.value === formData.loanType)?.rate || 12;
    const monthlyRate = annualRate / 100 / 12;

    const monthlyPayment =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    return monthlyPayment;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/loans/apply', {
        loanType: formData.loanType,
        amountRequested: parseFloat(formData.amountRequested),
        durationMonths: parseInt(formData.durationMonths),
        purpose: formData.purpose,
      });

      navigate('/dashboard/loans');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || 'Loan application failed');
      } else {
        setError('Loan application failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const monthlyRepayment = calculateMonthlyRepayment();
  const selectedLoan = loanTypes.find(t => t.value === formData.loanType);

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>
        Apply for a Loan
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 4 }}>
        Complete the form below to apply for a loan
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form" onSubmit={handleSubmit}
>
<Stack spacing={3}>
<TextField
         required
         select
         fullWidth
         name="loanType"
         label="Loan Type"
         value={formData.loanType}
         onChange={handleChange}
       >
{loanTypes.map((type) => (
<MenuItem key={type.value} value={type.value}>
{type.label} ({type.rate}% interest)
</MenuItem>
))}
</TextField>
      <TextField
        required
        fullWidth
        name="amountRequested"
        label="Amount Requested (₦)"
        type="number"
        value={formData.amountRequested}
        onChange={handleChange}
        inputProps={{ min: 1000, step: 1000 }}
        helperText="Minimum: ₦1,000"
      />

      <TextField
        required
        select
        fullWidth
        name="durationMonths"
        label="Loan Duration"
        value={formData.durationMonths}
        onChange={handleChange}
      >
        {[3, 6, 12, 18, 24, 36, 48, 60].map((months) => (
          <MenuItem key={months} value={months}>
            {months} months
          </MenuItem>
        ))}
      </TextField>

      <TextField
        required
        fullWidth
        multiline
        rows={4}
        name="purpose"
        label="Purpose of Loan"
        value={formData.purpose}
        onChange={handleChange}
        helperText="Provide details about how you plan to use the loan"
      />

      {monthlyRepayment > 0 && (
        <Card sx={{ backgroundColor: 'primary.light', color: 'white' }}>
          <CardContent>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Estimated Monthly Repayment
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              ₦{monthlyRepayment.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </Typography>
            {selectedLoan && (
              <Typography variant="body2" sx={{ marginTop: 1, opacity: 0.9 }}>
                Interest Rate: {selectedLoan.rate}% per annum
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          fullWidth
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/dashboard/loans')}
          fullWidth
        >
          Cancel
        </Button>
      </Box>
    </Stack>
  </Box>
</Container>
);
};
export default LoanApplication;