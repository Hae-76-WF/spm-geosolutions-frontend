"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { UserPlus, Trash2, Power, ShieldAlert, Search, RefreshCw } from 'lucide-react';
import { spmApi } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';

export const AdminUsersSection: React.FC = () => {
  const { showSnackbar } = useAppStore();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Create User Modal state
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
    organization: '',
    phone: '',
    license_number: '',
  });

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await spmApi.getAdminUsers();
      setUsers(res.data || res.users || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load user accounts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await spmApi.updateAdminUserRole(userId, newRole);
      showSnackbar(`User role updated to ${newRole.toUpperCase()}`, 'success');
      setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    } catch (err: any) {
      showSnackbar('Failed to update user role', 'error');
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      const res = await spmApi.toggleAdminUserStatus(userId);
      showSnackbar(res.message || 'User status updated', 'info');
      setUsers(users.map((u) => (u.id === userId ? { ...u, is_active: !u.is_active } : u)));
    } catch (err: any) {
      showSnackbar('Failed to toggle user status', 'error');
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user account "${userName}"?`)) return;

    try {
      await spmApi.deleteAdminUser(userId);
      showSnackbar(`User account ${userName} deleted`, 'warning');
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err: any) {
      showSnackbar('Failed to delete user', 'error');
    }
  };

  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await spmApi.createAdminUser(newUser);
      showSnackbar(`User ${newUser.name} created successfully!`, 'success');
      setOpenCreateModal(false);
      setNewUser({ name: '', email: '', password: '', role: 'client', organization: '', phone: '', license_number: '' });
      await loadUsers();
    } catch (err: any) {
      showSnackbar(err.message || 'Failed to create user account.', 'error');
    } finally {
      setCreating(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.organization?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    );
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
        
        {/* Header CTA row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              User Accounts & Role-Based Access Control (RBAC)
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Manage registered land surveyors, admin personnel, GIS scholars, and corporate firms.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={loadUsers}
              startIcon={<RefreshCw size={16} />}
              sx={{ color: '#cbd5e1', borderColor: '#475569', '&:hover': { borderColor: 'white' } }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setOpenCreateModal(true)}
              startIcon={<UserPlus size={16} />}
              sx={{ fontWeight: 800, px: 2.5 }}
            >
              Create Account
            </Button>
          </Box>
        </Box>

        {/* Search Input */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search users by name, email, role, or organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: <Search size={18} color="#94a3b8" style={{ marginRight: 8 }} />,
                sx: { color: 'white', bgcolor: '#0f172a', borderRadius: 2 },
              },
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#dc2626' }} />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#0f172a' }}>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Name & Firm</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Email & Contact</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>SRB License</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Account Role</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center', color: '#94a3b8', py: 4 }}>
                      No user records match your search query.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                      <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                        {user.name}
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                          {user.organization || 'Independent Surveyor'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: '#cbd5e1' }}>
                        {user.email}
                        <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                          {user.phone || 'No phone'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: '#facc15', fontWeight: 700 }}>
                        {user.license_number || 'SRB/UNLICENSED'}
                      </TableCell>
                      <TableCell>
                        <Select
                          size="small"
                          value={user.role || 'client'}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          sx={{
                            color: user.role === 'admin' ? '#ef4444' : user.role === 'staff' ? '#38bdf8' : '#86efac',
                            fontWeight: 800,
                            bgcolor: '#0f172a',
                            height: 32,
                            fontSize: '0.78rem',
                            borderRadius: 1.5,
                            '& .MuiSelect-icon': { color: 'white' },
                          }}
                        >
                          <MenuItem value="client">CLIENT</MenuItem>
                          <MenuItem value="staff">STAFF</MenuItem>
                          <MenuItem value="admin">ADMIN</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.is_active !== false ? 'ACTIVE' : 'DISABLED'}
                          size="small"
                          color={user.is_active !== false ? 'success' : 'default'}
                          sx={{ fontWeight: 800, fontSize: '0.68rem' }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleToggleStatus(user.id)}
                            title={user.is_active !== false ? 'Disable Account' : 'Activate Account'}
                            sx={{ color: user.is_active !== false ? '#f87171' : '#4ade80' }}
                          >
                            <Power size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            title="Delete User"
                            sx={{ color: '#ef4444' }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Create User Dialog */}
      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleCreateUserSubmit}>
          <DialogTitle sx={{ bgcolor: '#0f172a', color: 'white', fontWeight: 800 }}>
            Create New Platform User / Admin
          </DialogTitle>
          <DialogContent sx={{ bgcolor: '#1e293b', color: 'white', pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              <TextField
                label="Full Name"
                fullWidth
                required
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                label="Password (min 8 chars)"
                type="password"
                fullWidth
                required
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                select
                label="Role"
                fullWidth
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              >
                <MenuItem value="client">Client (Land Surveyor / Enterprise Firm)</MenuItem>
                <MenuItem value="staff">Staff (Geodetic Analyst / Analyst)</MenuItem>
                <MenuItem value="admin">Admin (System Cluster Superuser)</MenuItem>
              </TextField>
              <TextField
                label="Organization / Firm Name"
                fullWidth
                value={newUser.organization}
                onChange={(e) => setNewUser({ ...newUser, organization: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                label="SRB License Number"
                fullWidth
                placeholder="SRB/SURV/UG/041"
                value={newUser.license_number}
                onChange={(e) => setNewUser({ ...newUser, license_number: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ bgcolor: '#0f172a', px: 3, py: 2 }}>
            <Button onClick={() => setOpenCreateModal(false)} sx={{ color: '#cbd5e1' }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="error" disabled={creating} sx={{ fontWeight: 800 }}>
              {creating ? 'Creating...' : 'Save User Account'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
