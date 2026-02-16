import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Chip,
  CircularProgress,
} from '@mui/material';
import { format } from 'date-fns';
import api from '../../utils/api';
import type { PendingLoan } from '../../types';

const LoanApprovals: React.FC = () => {
  const [loans, setLoans] = useState<PendingLoan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedLoan, setSelectedLoan] = useState<PendingLoan | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject' | 'disburse' | null>(null);
  const [amountApproved, setAmountApproved] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPendingLoans();
  }, []);

  const fetchPendingLoans = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/loans/pending');
      setLoans(response.data.loans);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || 'Failed to load pending loans');
      } else {
        setError('Failed to load pending loans');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedLoan || !action) return;

    setSubmitting(true);
    setError('');

    try {
      await api.patch(`/admin/loans/${selectedLoan.id}/status`, {
        action,
        amountApproved: amountApproved ? parseFloat(amountApproved) : undefined,
        rejectionReason: rejectionReason || undefined,
      });

      setSuccess(`Loan ${action}d successfully`);
      setActionDialogOpen(false);
      setSelectedLoan(null);
      setAction(null);
      setAmountApproved('');
      setRejectionReason('');
      fetchPendingLoans();
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || `Failed to ${action} loan`);
      } else {
        setError(`Failed to ${action} loan`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const openActionDialog = (loan: PendingLoan, actionType: 'approve' | 'reject' | 'disburse') => {
    setSelectedLoan(loan);
    setAction(actionType);
    setAmountApproved(String(loan.amount_requested));
    setActionDialogOpen(true);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 700 }}>
        Loan Approvals
      </Typography>

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

      {loans.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No pending loan applications
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Loan Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Monthly Payment</TableCell>
                <TableCell>Applied</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {loan.member.first_name} {loan.member.last_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {loan.member.member_number}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={loan.loan_type} size="small" sx={{ textTransform: 'capitalize' }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    ₦{parseFloat(String(loan.amount_requested)).toLocaleString('en-NG')}
                  </TableCell>
                  <TableCell>{loan.duration_months} months</TableCell>
                  <TableCell>
                    ₦{parseFloat(String(loan.monthly_repayment || 0)).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{format(new Date(loan.application_date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => openActionDialog(loan, 'approve')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => openActionDialog(loan, 'reject')}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {action === 'approve' ? 'Approve Loan' : action === 'reject' ? 'Reject Loan' : 'Disburse Loan'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
            {selectedLoan && (
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Member:</strong> {selectedLoan.member.first_name} {selectedLoan.member.last_name}
                </Typography>
                <Typography variant="body2">
                  <strong>Requested:</strong> ₦{parseFloat(String(selectedLoan.amount_requested)).toLocaleString('en-NG')}
                </Typography>
                <Typography variant="body2">
                  <strong>Purpose:</strong> {selectedLoan.purpose}
                </Typography>
              </Alert>
            )}

            {action === 'approve' && (
              <TextField
                fullWidth
                label="Amount to Approve (₦)"
                type="number"
                value={amountApproved}
                onChange={(e) => setAmountApproved(e.target.value)}
                helperText="You can approve a different amount than requested"
              />
            )}

            {action === 'reject' && (
              <TextField
                fullWidth
                label="Rejection Reason"
                multiline
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide a reason for rejection..."
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAction}
            variant="contained"
            color={action === 'reject' ? 'error' : 'success'}
            disabled={submitting || (action === 'approve' && !amountApproved)}
          >
            {submitting ? 'Processing...' : `Confirm ${action}`}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LoanApprovals;