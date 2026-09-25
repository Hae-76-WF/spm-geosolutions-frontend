"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ClientBillingSection: React.FC = () => {
  const {
    invoices,
    invoicesLoading,
    invoicesError,
    fetchInvoices,
  } = useAppStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
              Invoices & Mobile Money Settlements
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Automated B2B reconciliation for survey computations and retainer hours.
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/client/make-payment"
            variant="contained"
            startIcon={<CreditCard size={18} />}
            sx={{ bgcolor: '#034732', '&:hover': { bgcolor: '#023324' }, fontWeight: 700 }}
          >
            Pay Invoice via MoMo (*165#)
          </Button>
        </Box>

        {invoicesLoading ? (
          <CircularProgress sx={{ color: '#034732' }} />
        ) : invoicesError ? (
          <Alert severity="error">{invoicesError}</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Invoice Number</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Service Description</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Amount (UGX)</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id} hover>
                    <TableCell sx={{ fontWeight: 800 }}>{inv.invoice_number}</TableCell>
                    <TableCell>{inv.project_or_service}</TableCell>
                    <TableCell sx={{ fontWeight: 800, color: '#034732' }}>
                      UGX {inv.amount_ugx.toLocaleString()}
                    </TableCell>
                    <TableCell>{inv.due_date}</TableCell>
                    <TableCell>
                      <Chip
                        label={inv.status.toUpperCase()}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          bgcolor: inv.status === 'Paid' ? '#dcfce7' : '#fee2e2',
                          color: inv.status === 'Paid' ? '#15803d' : '#b91c1c',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      {inv.status !== 'Paid' ? (
                        <Button
                          size="small"
                          variant="contained"
                          component={Link}
                          href="/client/make-payment"
                          sx={{ bgcolor: '#034732', textTransform: 'none', fontWeight: 700 }}
                        >
                          Pay Now
                        </Button>
                      ) : (
                        <Chip label="Settled" size="small" variant="outlined" color="success" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};
