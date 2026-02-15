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
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Pagination,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import api from '../../utils/api';
import type { Member } from '../../types';

const MemberManagement: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchMembers();
  }, [statusFilter, searchTerm, page]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/members', {
        params: { status: statusFilter, search: searchTerm, page, limit: 20 },
      });
      setMembers(response.data.members);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || 'Failed to load members');
      } else {
        setError('Failed to load members');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    if (!selectedMember || !newStatus) return;

    try {
      await api.patch(`/admin/members/${selectedMember.id}/status`, { status: newStatus });
      setSuccess(`Member status updated to ${newStatus}`);
      setStatusDialogOpen(false);
      fetchMembers();
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const error = err as { response?: { data?: { error?: string } } };
        setError(error.response?.data?.error || 'Failed to update status');
      } else {
        setError('Failed to update status');
      }
    }
  };

  const getStatusColor = (status: string): "default" | "success" | "warning" | "error" => {
    const colorMap: Record<string, "default" | "success" | "warning" | "error"> = {
      active: 'success',
      pending: 'warning',
      suspended: 'error',
    };
    return colorMap[status] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 700 }}>
        Member Management
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

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Search"
              placeholder="Name, email, or member number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 250 }}
            />
            <TextField
              select
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </TextField>
          </Box>
        </CardContent>
      </Card>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Member Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{member.member_number}</TableCell>
                    <TableCell>
                      {member.first_name} {member.last_name}
                    </TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>
                      <Chip
                        label={member.status.toUpperCase()}
                        color={getStatusColor(member.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{format(new Date(member.created_at), 'MMM dd, yyyy')}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        title="View Details"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="success"
                        title="Activate"
                        onClick={() => {
                          setSelectedMember(member);
                          setNewStatus('active');
                          setStatusDialogOpen(true);
                        }}
                        disabled={member.status === 'active'}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        title="Suspend"
                        onClick={() => {
                          setSelectedMember(member);
                          setNewStatus('suspended');
                          setStatusDialogOpen(true);
                        }}
                        disabled={member.status === 'suspended'}
                      >
                        <BlockIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}

      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Update Member Status</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to change the status of{' '}
            <strong>
              {selectedMember?.first_name} {selectedMember?.last_name}
            </strong>{' '}
            to <strong>{newStatus}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusChange} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MemberManagement;