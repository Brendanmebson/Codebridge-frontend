import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../../utils/api';
import type { Loan, LoanRepayment } from '../../types';

const LoanDetails: React.FC = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();
  const [loan, setLoan] = useState<Loan | null>(null);
  const [repayments, setRepayments] = useState<LoanRepayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [repaymentDialogOpen, setRepaymentDialogOpen] = useState(false);
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLoanDetails();
  }, [loanId]);

  const fetchLoanDetails = async () => {
    try {
      const response = await api.get(`/loans/${loanId}`);
      setLoan(response.data.loan);
      setRepayments(response.data.repayments || []);
    } catch (err) {
      setError('Failed to load loan details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRepayment = async () => {
    if (!loan || !repaymentAmount || !paymentMethod) return;

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/loans/repayment', {
        loanId: loan.id,
        amount: parseFloat(repaymentAmount),
        paymentMethod,
        referenceNumber: referenceNumber || 'N/A',
      });

      setSuccess('Repayment recorded successfully!');
      setRepaymentDialogOpen(false);
      setRepaymentAmount('');
      setPaymentMethod('');
      setReferenceNumber('');
      
      // Refresh loan details
      await fetchLoanDetails();
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || 'Repayment failed');
      } else {
        setError('Repayment failed');
      }
    } finally {
      setSubmitting(false);
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Loading loan details...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  if (!loan) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Alert severity="error">Loan not found</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/dashboard/loans')}
          sx={{ marginTop: 2 }}
        >
          Back to Loans
        </Button>
      </Container>
    );
  }

  // Safe parsing of outstanding balance
  const outstandingBalance = loan.outstanding_balance !== undefined && loan.outstanding_balance !== null
    ? parseFloat(String(loan.outstanding_balance))
    : (loan.amount_approved !== undefined && loan.amount_approved !== null
        ? parseFloat(String(loan.amount_approved))
        : 0);

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard/loans')}
        sx={{ marginBottom: 3 }}
      >
        Back to Loans
      </Button>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>
            {loan.loan_type} Loan
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Application ID: {loan.id.substring(0, 8)}
          </Typography>
        </Box>
        <Chip
          label={loan.status.toUpperCase()}
          color={getStatusColor(loan.status)}
          size="medium"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ marginBottom: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Loan Summary */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 3 }}>
            Loan Summary
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Amount Requested
              </Typography>
              <Typography variant="h6">
                ₦{parseFloat(String(loan.amount_requested || 0)).toLocaleString('en-NG')}
              </Typography>
            </Box>

            {loan.amount_approved && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Amount Approved
                </Typography>
                <Typography variant="h6" color="success.main">
                  ₦{parseFloat(String(loan.amount_approved)).toLocaleString('en-NG')}
                </Typography>
              </Box>
            )}

            {loan.status === 'disbursed' && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Outstanding Balance
                </Typography>
                <Typography variant="h6" color="error.main">
                  ₦{outstandingBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
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
                {loan.interest_rate}% p.a.
              </Typography>
            </Box>

            {loan.monthly_repayment && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Monthly Repayment
                </Typography>
                <Typography variant="h6">
                  ₦{parseFloat(String(loan.monthly_repayment)).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 0.5 }}>
              Purpose
            </Typography>
            <Typography variant="body1">{loan.purpose}</Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              marginTop: 3,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Application Date
              </Typography>
              <Typography variant="body1">
                {format(new Date(loan.application_date), 'MMM dd, yyyy')}
              </Typography>
            </Box>

            {loan.approval_date && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Approval Date
                </Typography>
                <Typography variant="body1">
                  {format(new Date(loan.approval_date), 'MMM dd, yyyy')}
                </Typography>
              </Box>
            )}

            {loan.disbursement_date && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Disbursement Date
                </Typography>
                <Typography variant="body1">
                  {format(new Date(loan.disbursement_date), 'MMM dd, yyyy')}
                </Typography>
              </Box>
            )}
          </Box>

          {loan.status === 'disbursed' && outstandingBalance > 0 && (
            <Button
              variant="contained"
              onClick={() => setRepaymentDialogOpen(true)}
              sx={{ marginTop: 3 }}
            >
              Make Repayment
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Repayment History */}
      {repayments.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Repayment History
            </Typography>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Reference</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Balance After</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {repayments.map((repayment) => (
                    <TableRow key={repayment.id}>
                      <TableCell>
                        {format(new Date(repayment.payment_date), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>
                        {repayment.payment_method}
                      </TableCell>
                      <TableCell>{repayment.reference_number}</TableCell>
                      <TableCell align="right" sx={{ color: 'success.main', fontWeight: 600 }}>
                        ₦{parseFloat(String(repayment.amount || 0)).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell align="right">
                        ₦{parseFloat(String(repayment.balance_after || 0)).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Repayment Dialog */}
      <Dialog
        open={repaymentDialogOpen}
        onClose={() => setRepaymentDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Make Loan Repayment</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
            <Alert severity="info">
              Outstanding Balance: ₦{outstandingBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </Alert>

            <TextField
              fullWidth
              label="Repayment Amount (₦)"
              type="number"
              value={repaymentAmount}
              onChange={(e) => setRepaymentAmount(e.target.value)}
              inputProps={{ min: 1, step: 100 }}
              required
            />

            <TextField
              fullWidth
              select
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="debit_card">Debit Card</MenuItem>
              <MenuItem value="mobile_money">Mobile Money</MenuItem>
            </TextField>

            <TextField
              fullWidth
              label="Reference Number (Optional)"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              helperText="Transaction reference or receipt number"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRepaymentDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleRepayment}
            variant="contained"
            disabled={submitting || !repaymentAmount || !paymentMethod || parseFloat(repaymentAmount) <= 0}
          >
            {submitting ? 'Processing...' : 'Confirm Payment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LoanDetails;