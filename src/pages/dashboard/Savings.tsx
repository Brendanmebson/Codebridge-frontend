import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { format } from 'date-fns';
import api from '../../utils/api';
import type { SavingsAccount, SavingsTransaction } from '../../types';

const Savings: React.FC = () => {
  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<SavingsAccount | null>(null);
  const [transactions, setTransactions] = useState<SavingsTransaction[]>([]);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSavingsAccounts();
  }, []);

  const fetchSavingsAccounts = async () => {
    try {
      const response = await api.get('/savings');
      setSavingsAccounts(response.data.savingsAccounts || []);
    } catch (err) {
      setError('Failed to load savings accounts');
      console.error(err);
    }
  };

  const fetchTransactionHistory = async (accountId: string) => {
    try {
      const response = await api.get(`/savings/${accountId}/history`);
      setTransactions(response.data.transactions || []);
    } catch (err) {
      console.error('Failed to load transaction history:', err);
    }
  };

  const handleViewDetails = (account: SavingsAccount) => {
    setSelectedAccount(account);
    fetchTransactionHistory(account.id);
  };

  const handleDeposit = async () => {
    if (!selectedAccount || !amount) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/savings/deposit', {
        savingsAccountId: selectedAccount.id,
        amount: parseFloat(amount),
        description: description || 'Deposit',
      });

      setSuccess('Deposit successful!');
      setAmount('');
      setDescription('');
      setDepositDialogOpen(false);
      
      // Refresh data
      await fetchSavingsAccounts();
      if (selectedAccount) {
        await fetchTransactionHistory(selectedAccount.id);
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || 'Deposit failed');
      } else {
        setError('Deposit failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 4 }}>
        Savings Management
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

      {/* Savings Accounts */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          marginBottom: 4,
        }}
      >
        {savingsAccounts.map((account) => (
          <Card
            key={account.id}
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' },
              minWidth: 300,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 1, textTransform: 'capitalize' }}>
                {account.account_type} Savings
              </Typography>
              
              <Typography variant="h4" sx={{ marginBottom: 2, color: 'primary.main', fontWeight: 700 }}>
                ₦{parseFloat(account.balance.toString()).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </Typography>

              {account.target_amount && (
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  Target: ₦{parseFloat(account.target_amount.toString()).toLocaleString('en-NG')}
                </Typography>
              )}

              {account.target_date && (
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                  Target Date: {format(new Date(account.target_date), 'MMM dd, yyyy')}
                </Typography>
              )}

              <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    setSelectedAccount(account);
                    setDepositDialogOpen(true);
                  }}
                >
                  Deposit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleViewDetails(account)}
                >
                  View History
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Transaction History */}
      {selectedAccount && transactions.length > 0 && (
        <Box>
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
            Transaction History - {selectedAccount.account_type} Savings
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {format(new Date(transaction.transaction_date), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>
                      {transaction.transaction_type}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: transaction.transaction_type === 'deposit' ? 'success.main' : 'error.main',
                        fontWeight: 600,
                      }}
                    >
                      {transaction.transaction_type === 'deposit' ? '+' : '-'}
                      ₦{parseFloat(transaction.amount.toString()).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell align="right">
                      ₦{parseFloat(transaction.balance_after.toString()).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Deposit Dialog */}
      <Dialog
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Make a Deposit</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputProps={{ min: 100, step: 100 }}
            />
            <TextField
              fullWidth
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDepositDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDeposit}
            variant="contained"
            disabled={loading || !amount || parseFloat(amount) < 100}
          >
            {loading ? 'Processing...' : 'Confirm Deposit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Savings;