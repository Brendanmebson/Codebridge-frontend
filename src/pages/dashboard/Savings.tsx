import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Button, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Alert, CircularProgress, useTheme, InputAdornment,
} from '@mui/material';
import { format } from 'date-fns';
import api from '../../utils/api';
import type { SavingsAccount, SavingsTransaction } from '../../types';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Savings: React.FC = () => {
  const theme = useTheme();
  const { palette, typography, shape } = theme;
  const br = shape.borderRadius as number;

  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<SavingsAccount | null>(null);
  const [transactions, setTransactions] = useState<SavingsTransaction[]>([]);
  const [txLoading, setTxLoading] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => { fetchSavingsAccounts(); }, []);

  const fetchSavingsAccounts = async () => {
    setPageLoading(true);
    try {
      const response = await api.get('/savings');
      const accs = response.data.savingsAccounts || [];
      setSavingsAccounts(accs);
      if (accs.length > 0 && !selectedAccount) {
        setSelectedAccount(accs[0]);
        fetchTransactionHistory(accs[0].id);
      }
    } catch {
      setError('Failed to load savings accounts');
    } finally {
      setPageLoading(false);
    }
  };

  const fetchTransactionHistory = async (accountId: string) => {
    setTxLoading(true);
    try {
      const response = await api.get(`/savings/${accountId}/history`);
      setTransactions(response.data.transactions || []);
    } catch {
      setTransactions([]);
    } finally {
      setTxLoading(false);
    }
  };

  const handleSelectAccount = (account: SavingsAccount) => {
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
      setSuccess('Deposit recorded successfully!');
      setAmount('');
      setDescription('');
      setDepositDialogOpen(false);
      await fetchSavingsAccounts();
      if (selectedAccount) await fetchTransactionHistory(selectedAccount.id);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const e = err as { response?: { data?: { error?: string } } };
        setError(e.response?.data?.error || 'Deposit failed');
      } else {
        setError('Deposit failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n: number) => '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2 });
  const fmtShort = (n: number) => '₦' + n.toLocaleString('en-NG');

  // Derive total savings
  const totalSavings = savingsAccounts.reduce(
    (s, a) => s + parseFloat(String(a.balance)), 0
  );
  const totalDeposits = transactions
    .filter(t => t.transaction_type === 'deposit')
    .reduce((s, t) => s + parseFloat(String(t.amount)), 0);
  const totalWithdrawals = transactions
    .filter(t => t.transaction_type !== 'deposit')
    .reduce((s, t) => s + parseFloat(String(t.amount)), 0);

  // Account color palette cycling
  const accentColors = [
    { color: palette.primary.dark, accent: palette.primary.main },
    { color: palette.info.dark, accent: palette.info.main },
    { color: palette.secondary.dark, accent: palette.secondary.main },
    { color: palette.info.dark, accent: '#00897B' },
  ];

  const fieldSx = (name: string) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: `${br * 1.5}px`,
      fontFamily: typography.fontFamily,
      fontSize: '0.9rem',
      background: focused === name ? palette.background.paper : `${palette.primary.main}04`,
      transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
      '& fieldset': {
        borderColor: focused === name ? palette.primary.main : `${palette.primary.main}20`,
        borderWidth: focused === name ? 2 : 1,
        transition: 'all 0.25s',
      },
      '&:hover fieldset': { borderColor: `${palette.primary.main}45` },
    },
    '& .MuiInputLabel-root': {
      fontFamily: typography.fontFamily, fontSize: '0.88rem',
      color: palette.text.secondary,
      '&.Mui-focused': { color: palette.primary.main },
    },
    '& .MuiFormHelperText-root': { fontFamily: typography.fontFamily, fontSize: '0.75rem' },
  });

  if (pageLoading) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: palette.background.default }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3, background: `${palette.primary.main}10`, border: `2px solid ${palette.primary.main}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={32} sx={{ color: palette.primary.main }} />
          </Box>
          <Typography variant="body1" sx={{ color: palette.text.secondary, fontWeight: 300 }}>Loading your savings…</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ background: palette.background.default, minHeight: '100vh', fontFamily: typography.fontFamily, pb: 8 }}>

      {/* ── HERO HEADER ───────────────────────────────────── */}
      <Box sx={{
        position: 'relative',
        background: `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`,
        pt: { xs: 5, md: 7 }, pb: { xs: 10, md: 14 },
        overflow: 'hidden',
      }}>
        {[{ size: 480, top: -130, right: -130 }, { size: 340, bottom: -90, left: -90 }, { size: 180, top: '30%', left: '48%' }].map((b, i) => (
          <Box key={i} sx={{ position: 'absolute', width: b.size, height: b.size, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', top: b.top, bottom: b.bottom, right: b.right, left: b.left, pointerEvents: 'none' }} />
        ))}
        <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`, backgroundSize: '200px', opacity: 0.5 }} />
        {[...Array(5)].map((_, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', top: `${12 + i * 16}%`, right: `${4 + (i % 3) * 5}%`, animation: `hd${i} ${3 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`, [`@keyframes hd${i}`]: { '0%,100%': { opacity: 0.2, transform: 'scale(1)' }, '50%': { opacity: 0.9, transform: 'scale(1.5)' } } }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 3, alignItems: 'flex-end' }}>
            <Box>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.75, mb: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px' }}>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: palette.secondary.light, boxShadow: `0 0 8px ${palette.secondary.light}`, animation: 'blink 2.5s ease infinite', '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.88)', fontWeight: 500, letterSpacing: '0.05em' }}>Savings Management</Typography>
              </Box>
              <Typography variant="h1" sx={{ color: '#fff', fontSize: { xs: '2.2rem', md: '3.2rem' }, lineHeight: 1.1, mb: 1.5 }}>
                My Savings<br />
                <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 300, background: `linear-gradient(90deg, ${palette.secondary.light}, #E8F5E9)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  & Accounts
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.62)', fontWeight: 300 }}>
                {savingsAccounts.length} account{savingsAccounts.length !== 1 ? 's' : ''} · {fmt(totalSavings)} total balance
              </Typography>
            </Box>

            {/* Total balance hero card */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, p: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: `${br * 2}px`, textAlign: 'right', minWidth: 220 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)', display: 'block', mb: 0.5 }}>Total Savings Balance</Typography>
              <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: '#fff', fontSize: '2rem', lineHeight: 1, mb: 0.5 }}>
                {fmtShort(totalSavings)}
              </Typography>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.5, py: 0.3, background: 'rgba(255,255,255,0.12)', borderRadius: '100px' }}>
                <TrendingUpIcon sx={{ fontSize: 11, color: palette.secondary.light }} />
                <Typography variant="caption" sx={{ color: palette.secondary.light, fontWeight: 600, fontSize: '0.68rem' }}>{savingsAccounts.length} active account{savingsAccounts.length !== 1 ? 's' : ''}</Typography>
              </Box>
            </Box>
          </Box>
        </Container>

        <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: { xs: 50, md: 72 }, background: palette.background.default, clipPath: 'ellipse(58% 100% at 50% 100%)' }} />
      </Box>

      {/* ── STAT CARDS ────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, position: 'relative', zIndex: 3, mb: 5 }}>
        {error && (
          <Alert severity="error" onClose={() => setError('')} sx={{ mb: 3, borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily, background: 'rgba(198,40,40,0.06)', border: '1px solid rgba(198,40,40,0.18)' }}>{error}</Alert>
        )}
        {success && (
          <Alert severity="success" onClose={() => setSuccess('')} sx={{ mb: 3, borderRadius: `${br * 1.5}px`, fontFamily: typography.fontFamily, background: 'rgba(46,125,50,0.06)', border: '1px solid rgba(46,125,50,0.18)' }}>{success}</Alert>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2.5 }}>
          {[
            { label: 'Total Balance', val: fmtShort(totalSavings), sub: 'Across all accounts', icon: <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 20 }} />, color: palette.primary.dark, accent: palette.primary.main },
            { label: 'Accounts', val: String(savingsAccounts.length), sub: 'Active savings accounts', icon: <SavingsOutlinedIcon sx={{ fontSize: 20 }} />, color: palette.info.dark, accent: palette.info.main },
            { label: 'Total Deposited', val: fmtShort(totalDeposits), sub: 'From transaction history', icon: <ArrowUpwardIcon sx={{ fontSize: 20 }} />, color: '#2E7D32', accent: '#43A047' },
            { label: 'Total Withdrawn', val: fmtShort(totalWithdrawals), sub: 'From transaction history', icon: <ArrowDownwardIcon sx={{ fontSize: 20 }} />, color: palette.secondary.dark, accent: palette.secondary.main },
          ].map((s, i) => (
            <Box key={i} sx={{
              p: { xs: 2.5, md: 3.5 }, borderRadius: `${br * 2}px`,
              background: palette.background.paper, border: `1px solid ${palette.background.default}`,
              boxShadow: '0 4px 32px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 20px 52px ${s.color}12`, borderColor: 'transparent', '& .sv-icon': { background: `linear-gradient(135deg, ${s.color}, ${s.accent})`, color: '#fff' } },
            }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, ${s.accent})` }} />
              <Box sx={{ position: 'absolute', top: 0, right: 0, width: 70, height: 70, background: `radial-gradient(circle at top right, ${s.color}08, transparent 70%)`, borderRadius: `0 ${br * 2}px 0 100%`, pointerEvents: 'none' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="overline" sx={{ color: palette.text.secondary, fontSize: '0.65rem' }}>{s.label}</Typography>
                <Box className="sv-icon" sx={{ width: 36, height: 36, borderRadius: `${br - 2}px`, background: `${s.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)', flexShrink: 0 }}>
                  {s.icon}
                </Box>
              </Box>
              <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: palette.text.primary, fontSize: { xs: '1.2rem', md: '1.45rem' }, lineHeight: 1, mb: 0.5 }}>{s.val}</Typography>
              <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem' }}>{s.sub}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '380px 1fr' }, gap: 4, alignItems: 'start' }}>

          {/* ── LEFT: ACCOUNT CARDS ── */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1.1rem', mb: 0.3 }}>Your Accounts</Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary }}>{savingsAccounts.length} savings account{savingsAccounts.length !== 1 ? 's' : ''}</Typography>
              </Box>
            </Box>

            {savingsAccounts.length === 0 ? (
              <Box sx={{ py: 8, textAlign: 'center', borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px dashed ${palette.primary.main}20` }}>
                <Box sx={{ width: 64, height: 64, borderRadius: '50%', mx: 'auto', mb: 2.5, background: `${palette.primary.main}08`, border: `2px dashed ${palette.primary.main}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SavingsOutlinedIcon sx={{ fontSize: 30, color: `${palette.primary.main}40` }} />
                </Box>
                <Typography variant="body2" sx={{ color: palette.text.secondary, mb: 2 }}>No savings accounts yet</Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {savingsAccounts.map((account, i) => {
                  const { color, accent } = accentColors[i % accentColors.length];
                  const bal = parseFloat(String(account.balance));
                  const target = account.target_amount ? parseFloat(String(account.target_amount)) : 0;
                  const pct = target > 0 ? Math.min(100, Math.round((bal / target) * 100)) : 0;
                  const isSelected = selectedAccount?.id === account.id;

                  return (
                    <Box
                      key={account.id}
                      sx={{
                        borderRadius: `${br * 2}px`, overflow: 'hidden',
                        border: `1.5px solid ${isSelected ? color + '35' : palette.background.default}`,
                        background: palette.background.paper,
                        boxShadow: isSelected ? `0 12px 40px ${color}15` : '0 4px 20px rgba(0,0,0,0.04)',
                        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                        cursor: 'pointer',
                        '&:hover': { borderColor: `${color}28`, boxShadow: `0 16px 44px ${color}12`, transform: 'translateY(-3px)' },
                      }}
                      onClick={() => handleSelectAccount(account)}
                    >
                      {/* Top bar */}
                      <Box sx={{ height: 4, background: `linear-gradient(90deg, ${color}, ${accent})` }} />

                      <Box sx={{ p: 3.5 }}>
                        {/* Header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 42, height: 42, borderRadius: `${br}px`, background: isSelected ? `linear-gradient(135deg, ${color}, ${accent})` : `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isSelected ? '#fff' : color, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)', boxShadow: isSelected ? `0 6px 18px ${color}30` : 'none' }}>
                              <SavingsOutlinedIcon sx={{ fontSize: 20 }} />
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary, textTransform: 'capitalize', lineHeight: 1.2 }}>
                                {account.account_type || 'Savings'} Account
                              </Typography>
                              <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.7rem' }}>
                                {(account as any).account_number || `ACC-${String(i + 1).padStart(4, '0')}`}
                              </Typography>
                            </Box>
                          </Box>
                          {isSelected && (
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}`, animation: 'svpulse 2.5s ease infinite', '@keyframes svpulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } } }} />
                          )}
                        </Box>

                        {/* Balance */}
                        <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 800, color: isSelected ? color : palette.text.primary, fontSize: '1.65rem', lineHeight: 1, mb: 0.5, transition: 'color 0.3s' }}>
                          {fmt(bal)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: palette.text.secondary, display: 'block', mb: 2.5 }}>Current balance</Typography>

                        {/* Target progress */}
                        {target > 0 && (
                          <Box sx={{ mb: 2.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <TrackChangesIcon sx={{ fontSize: 13, color: palette.text.secondary }} />
                                <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.7rem' }}>Target: {fmtShort(target)}</Typography>
                              </Box>
                              <Typography variant="caption" sx={{ color: isSelected ? color : palette.primary.main, fontWeight: 700, fontSize: '0.7rem' }}>{pct}%</Typography>
                            </Box>
                            <Box sx={{ height: 7, borderRadius: '100px', background: `${color}12`, overflow: 'hidden' }}>
                              <Box sx={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${accent})`, borderRadius: '100px', transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)' }} />
                            </Box>
                          </Box>
                        )}

                        {/* Target date */}
                        {account.target_date && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 2.5 }}>
                            <CalendarMonthOutlinedIcon sx={{ fontSize: 13, color: palette.text.secondary }} />
                            <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.72rem' }}>
                              Target date: {format(new Date(account.target_date), 'MMM dd, yyyy')}
                            </Typography>
                          </Box>
                        )}

                        {/* Actions */}
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                          <Button
                            variant="contained" size="small" fullWidth
                            startIcon={<AddIcon sx={{ fontSize: 15 }} />}
                            onClick={(e) => { e.stopPropagation(); setSelectedAccount(account); setDepositDialogOpen(true); }}
                            sx={{
                              background: `linear-gradient(135deg, ${color}, ${accent})`,
                              boxShadow: `0 6px 18px ${color}28`,
                              textTransform: 'none', fontFamily: typography.fontFamily,
                              fontWeight: 700, fontSize: '0.8rem',
                              borderRadius: `${br * 1.5}px`, py: 1,
                              '&:hover': { boxShadow: `0 10px 26px ${color}40`, transform: 'translateY(-1px)' },
                              transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
                            }}
                          >
                            Deposit
                          </Button>
                          <Button
                            variant="outlined" size="small" fullWidth
                            endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                            onClick={(e) => { e.stopPropagation(); handleSelectAccount(account); }}
                            sx={{
                              borderColor: `${color}28`, color: color,
                              textTransform: 'none', fontFamily: typography.fontFamily,
                              fontWeight: 600, fontSize: '0.8rem',
                              borderRadius: `${br * 1.5}px`, py: 1,
                              '&:hover': { borderColor: `${color}55`, background: `${color}06` },
                            }}
                          >
                            History
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* ── RIGHT: TRANSACTION HISTORY ── */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ color: palette.text.primary, fontWeight: 700, fontSize: '1.1rem', mb: 0.3 }}>
                  Transaction History
                </Typography>
                <Typography variant="caption" sx={{ color: palette.text.secondary }}>
                  {selectedAccount
                    ? `${(selectedAccount.account_type || 'Savings').charAt(0).toUpperCase() + (selectedAccount.account_type || 'Savings').slice(1)} account · ${transactions.length} transaction${transactions.length !== 1 ? 's' : ''}`
                    : 'Select an account to view history'}
                </Typography>
              </Box>
              {selectedAccount && (
                <Button
                  variant="contained" size="small"
                  startIcon={<AddIcon sx={{ fontSize: 15 }} />}
                  onClick={() => setDepositDialogOpen(true)}
                  sx={{
                    background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                    boxShadow: `0 6px 18px ${palette.primary.main}28`,
                    textTransform: 'none', fontFamily: typography.fontFamily,
                    fontWeight: 700, fontSize: '0.8rem',
                    borderRadius: `${br * 1.5}px`,
                    '&:hover': { boxShadow: `0 10px 26px ${palette.primary.main}40` },
                  }}
                >
                  New Deposit
                </Button>
              )}
            </Box>

            {/* No account selected */}
            {!selectedAccount && (
              <Box sx={{ py: 10, textAlign: 'center', borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px dashed ${palette.primary.main}15` }}>
                <Box sx={{ width: 64, height: 64, borderRadius: '50%', mx: 'auto', mb: 2.5, background: `${palette.primary.main}08`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ReceiptOutlinedIcon sx={{ fontSize: 30, color: `${palette.primary.main}35` }} />
                </Box>
                <Typography variant="body2" sx={{ color: palette.text.secondary }}>Select a savings account to view its transaction history</Typography>
              </Box>
            )}

            {/* Loading */}
            {txLoading && (
              <Box sx={{ py: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={28} sx={{ color: palette.primary.main }} />
              </Box>
            )}

            {/* Transactions */}
            {!txLoading && selectedAccount && (
              <>
                {transactions.length === 0 ? (
                  <Box sx={{ py: 8, textAlign: 'center', borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px dashed ${palette.primary.main}15` }}>
                    <Box sx={{ width: 64, height: 64, borderRadius: '50%', mx: 'auto', mb: 2.5, background: `${palette.primary.main}08`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ReceiptOutlinedIcon sx={{ fontSize: 30, color: `${palette.primary.main}35` }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: palette.text.secondary, mb: 2 }}>No transactions yet</Typography>
                    <Button size="small" variant="outlined"
                      onClick={() => setDepositDialogOpen(true)}
                      sx={{ borderColor: `${palette.primary.main}28`, color: palette.primary.main, textTransform: 'none', fontFamily: typography.fontFamily, borderRadius: '100px', fontSize: '0.8rem' }}>
                      Make your first deposit
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ borderRadius: `${br * 2}px`, background: palette.background.paper, border: `1px solid ${palette.background.default}`, overflow: 'hidden', boxShadow: '0 4px 28px rgba(0,0,0,0.05)' }}>
                    {/* Table header */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1.4fr 0.8fr 1.5fr 1fr 1fr' }, gap: 2, px: 3.5, py: 2, borderBottom: `1px solid ${palette.background.default}`, background: palette.background.default }}>
                      {['Date', 'Type', 'Description', 'Amount', 'Balance After'].map((h, i) => (
                        <Typography key={i} variant="overline" sx={{ color: palette.text.secondary, fontSize: '0.62rem', display: { xs: i > 1 ? 'none' : 'block', md: 'block' } }}>{h}</Typography>
                      ))}
                    </Box>

                    {/* Rows */}
                    <Box>
                      {transactions.map((tx, i) => {
                        const amt = parseFloat(String(tx.amount));
                        const balAfter = parseFloat(String(tx.balance_after));
                        const isDeposit = tx.transaction_type === 'deposit';
                        return (
                          <Box
                            key={tx.id}
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: { xs: '1fr 1fr', md: '1.4fr 0.8fr 1.5fr 1fr 1fr' },
                              gap: 2, px: 3.5, py: 2.25,
                              borderBottom: i < transactions.length - 1 ? `1px solid ${palette.background.default}` : 'none',
                              alignItems: 'center',
                              transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                              '&:hover': { background: `${palette.primary.main}04`, '& .tx-arrow': { opacity: 1, transform: 'translateX(0)' } },
                            }}
                          >
                            {/* Date */}
                            <Box>
                              <Typography variant="body2" sx={{ color: palette.text.primary, fontWeight: 600, fontSize: '0.82rem' }}>
                                {format(new Date(tx.transaction_date), 'MMM dd, yyyy')}
                              </Typography>
                              <Typography variant="caption" sx={{ color: palette.text.secondary, fontSize: '0.7rem' }}>
                                {format(new Date(tx.transaction_date), 'HH:mm')}
                              </Typography>
                            </Box>

                            {/* Type badge */}
                            <Box sx={{
                              display: 'inline-flex', alignItems: 'center', gap: 0.6,
                              px: 1.25, py: 0.35, borderRadius: '100px', width: 'fit-content',
                              background: isDeposit ? 'rgba(46,125,50,0.08)' : `${palette.secondary.main}0e`,
                              border: `1px solid ${isDeposit ? 'rgba(46,125,50,0.2)' : palette.secondary.main + '22'}`,
                            }}>
                              {isDeposit
                                ? <ArrowUpwardIcon sx={{ fontSize: 10, color: '#2E7D32' }} />
                                : <ArrowDownwardIcon sx={{ fontSize: 10, color: palette.secondary.dark }} />}
                              <Typography variant="caption" sx={{ color: isDeposit ? '#2E7D32' : palette.secondary.dark, fontWeight: 700, fontSize: '0.65rem', textTransform: 'capitalize' }}>
                                {tx.transaction_type}
                              </Typography>
                            </Box>

                            {/* Description */}
                            <Typography variant="body2" sx={{ color: palette.text.secondary, fontSize: '0.8rem', lineHeight: 1.4, display: { xs: 'none', md: 'block' } }}>
                              {tx.description}
                            </Typography>

                            {/* Amount */}
                            <Box sx={{ alignItems: 'center', gap: 0.5, display: { xs: 'none', md: 'flex' } }}>
                              <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: isDeposit ? '#2E7D32' : palette.secondary.dark, fontSize: '0.88rem' }}>
                                {isDeposit ? '+' : '−'}{fmt(amt)}
                              </Typography>
                            </Box>

                            {/* Balance after */}
                            <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 600, color: palette.text.primary, fontSize: '0.85rem', display: { xs: 'none', md: 'block' } }}>
                              {fmt(balAfter)}
                            </Typography>

                            {/* Mobile: amount */}
                            <Typography sx={{ fontFamily: typography.fontFamily, fontWeight: 700, color: isDeposit ? '#2E7D32' : palette.secondary.dark, fontSize: '0.88rem', display: { xs: 'block', md: 'none' } }}>
                              {isDeposit ? '+' : '−'}{fmt(amt)}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* ── SAVINGS TIPS ───────────────────────────────── */}
        <Box sx={{ mt: 6, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 3 }}>
          {[
            { icon: <TrendingUpIcon sx={{ fontSize: 22 }} />, title: 'Consistent Contributions', body: 'Members who save consistently every month are 3× more likely to qualify for higher loan amounts.', color: palette.primary.dark, accent: palette.primary.main },
            { icon: <TrackChangesIcon sx={{ fontSize: 22 }} />, title: 'Set a Savings Target', body: 'Use your target amount to stay focused. The progress bar on your account keeps you motivated.', color: palette.info.dark, accent: palette.info.main },
            { icon: <CheckCircleOutlineIcon sx={{ fontSize: 22 }} />, title: 'Loan Eligibility Tip', body: 'Your loan limit is a multiplier of your savings balance. The more you save, the more you can borrow.', color: palette.secondary.dark, accent: palette.secondary.main },
          ].map((tip, i) => (
            <Box key={i} sx={{
              p: 3.5, borderRadius: `${br * 2}px`,
              background: palette.background.paper,
              border: `1px solid ${palette.background.default}`,
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 20px 52px ${tip.color}10`, borderColor: 'transparent', '& .tip-icon': { background: `linear-gradient(135deg, ${tip.color}, ${tip.accent})`, color: '#fff' } },
            }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${tip.color}, ${tip.accent})` }} />
              <Box className="tip-icon" sx={{ width: 46, height: 46, borderRadius: `${br}px`, background: `${tip.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tip.color, mb: 2, transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
                {tip.icon}
              </Box>
              <Typography variant="h6" sx={{ color: palette.text.primary, fontWeight: 700, mb: 1, fontSize: '0.97rem' }}>{tip.title}</Typography>
              <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.75, display: 'block', fontSize: '0.82rem' }}>{tip.body}</Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ── DEPOSIT DIALOG ─────────────────────────────────── */}
      <Dialog
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
        maxWidth="sm" fullWidth
        PaperProps={{
          sx: {
            borderRadius: `${br * 2}px`,
            fontFamily: typography.fontFamily,
            background: palette.background.paper,
            overflow: 'hidden',
          }
        }}
      >
        {/* Gradient header */}
        <Box sx={{ px: 4, py: 3.5, background: `linear-gradient(135deg, ${palette.primary.dark}, ${palette.primary.main})`, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)', pointerEvents: 'none' }} />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: `${br - 4}px`, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AddIcon sx={{ fontSize: 18, color: '#fff' }} />
              </Box>
              <DialogTitle sx={{ p: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 700, fontFamily: typography.fontFamily }}>
                Make a Deposit
              </DialogTitle>
            </Box>
            {selectedAccount && (
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', textTransform: 'capitalize' }}>
                {selectedAccount.account_type} Account · Current balance: <strong style={{ color: '#fff' }}>{fmt(parseFloat(String(selectedAccount.balance)))}</strong>
              </Typography>
            )}
          </Box>
        </Box>

        <DialogContent sx={{ px: 4, pt: 4, pb: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth required
              label="Deposit Amount (₦)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setFocused('amt')}
              onBlur={() => setFocused(null)}
              inputProps={{ min: 100, step: 100 }}
              helperText="Minimum deposit: ₦100"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ color: focused === 'amt' ? palette.primary.main : palette.text.secondary, fontWeight: 700, fontFamily: typography.fontFamily, transition: 'color 0.25s' }}>₦</Typography>
                  </InputAdornment>
                ),
              }}
              sx={fieldSx('amt')}
            />
            <TextField
              fullWidth
              label="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setFocused('desc')}
              onBlur={() => setFocused(null)}
              placeholder="e.g. Monthly contribution"
              sx={fieldSx('desc')}
            />

            {/* Summary */}
            {amount && parseFloat(amount) >= 100 && (
              <Box sx={{ p: 2.5, borderRadius: `${br - 2}px`, background: `${palette.primary.main}08`, border: `1px solid ${palette.primary.main}15` }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: palette.text.secondary }}>Depositing</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: palette.primary.main }}>{fmt(parseFloat(amount))}</Typography>
                </Box>
                {selectedAccount && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: palette.text.secondary }}>New balance</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#2E7D32' }}>
                      {fmt(parseFloat(String(selectedAccount.balance)) + parseFloat(amount))}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Info note */}
            <Box sx={{ display: 'flex', gap: 1.5, p: 2, borderRadius: `${br - 2}px`, background: `${palette.info.main}07`, border: `1px solid ${palette.info.main}14` }}>
              <InfoOutlinedIcon sx={{ fontSize: 15, color: palette.info.main, flexShrink: 0, mt: 0.15 }} />
              <Typography variant="caption" sx={{ color: palette.text.secondary, lineHeight: 1.7, fontSize: '0.78rem' }}>
                Deposits are processed immediately and will reflect in your balance and loan eligibility right away.
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 4, py: 3, gap: 1.5 }}>
          <Button onClick={() => setDepositDialogOpen(false)}
            sx={{ textTransform: 'none', fontFamily: typography.fontFamily, borderRadius: `${br * 1.5}px`, color: palette.text.secondary, px: 3, '&:hover': { background: `${palette.primary.main}06` } }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeposit}
            variant="contained"
            disabled={loading || !amount || parseFloat(amount) < 100}
            startIcon={!loading ? <AddIcon sx={{ fontSize: 17 }} /> : undefined}
            sx={{
              background: loading ? `${palette.primary.main}70` : `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
              boxShadow: `0 8px 24px ${palette.primary.main}35`,
              textTransform: 'none', fontFamily: typography.fontFamily, fontWeight: 700,
              borderRadius: `${br * 1.5}px`, px: 3.5, py: 1.25,
              '&:hover:not(:disabled)': { boxShadow: `0 12px 32px ${palette.primary.main}50` },
              '&.Mui-disabled': { color: 'rgba(255,255,255,0.5)' },
            }}
          >
            {loading ? 'Processing…' : 'Confirm Deposit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Savings;