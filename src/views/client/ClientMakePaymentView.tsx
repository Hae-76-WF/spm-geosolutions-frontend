"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import { CreditCard, ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ClientMakePaymentView: React.FC = () => {
  const { invoices, fetchInvoices, payInvoice, showSnackbar } = useAppStore();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [provider, setProvider] = useState<'MTN Mobile Money' | 'Airtel Money' | 'Bank EFT'>('MTN Mobile Money');
  const [phoneNumber, setPhoneNumber] = useState('+256772123456');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  useEffect(() => {
    if (invoices.length > 0 && !selectedInvoiceId) {
      const pending = invoices.find((i) => i.status === 'Pending') || invoices[0];
      setSelectedInvoiceId(pending.id);
    }
  }, [invoices, selectedInvoiceId]);

  const selectedInvoice = invoices.find((i) => i.id === selectedInvoiceId) || invoices[0];

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceId) {
      showSnackbar('Please select an invoice to pay', 'warning');
      return;
    }
    setIsProcessing(true);
    setPaymentSuccess(false);

    try {
      await payInvoice(selectedInvoiceId, provider, phoneNumber);
      setPaymentSuccess(true);
    } catch (err: any) {
      showSnackbar('Payment initiation failed', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ minHeight: '85vh', py: 6, bgcolor: '#f8fafc' }}>
      <Container maxWidth="md">
        
        {/* Back Button */}
        <Button
          component={Link}
          href="/client/billing"
          startIcon={<ArrowLeft size={18} />}
          sx={{ mb: 3, textTransform: 'none', fontWeight: 700, color: '#034732' }}
        >
          Back to Client Invoices
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            color: 'white',
            backgroundImage: `linear-gradient(135deg, rgba(3, 71, 50, 0.94), rgba(15, 23, 42, 0.96)), url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Zap size={24} color="#eab308" />
            <Typography variant="overline" sx={{ color: '#eab308', fontWeight: 800 }}>
              INSTANT SETTLEMENT GATEWAY
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
            Make Invoice Payment
          </Typography>
          <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
            Instant telecom B2B settlement for cadastral processing jobs, retainers, and academy course fees.
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, border: '1px solid #e2e8f0' }}>
          
          {paymentSuccess ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircle2 size={64} color="#16a34a" style={{ margin: '0 auto 16px auto' }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                Payment Received & Reconciled!
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 500, mx: 'auto', mb: 4 }}>
                Your payment via {provider} for Invoice <strong>{selectedInvoice?.invoice_number || 'SPM-INV'}</strong> has been verified. Deliverable downloads are now unlocked.
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/client/billing"
                sx={{ bgcolor: '#034732', '&:hover': { bgcolor: '#023324' }, fontWeight: 700, px: 4 }}
              >
                Return to Invoices & Ledger
              </Button>
            </Box>
          ) : (
            <form onSubmit={handlePay}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                <TextField
                  label="Select Invoice to Pay"
                  select
                  fullWidth
                  value={selectedInvoiceId || ''}
                  onChange={(e) => setSelectedInvoiceId(e.target.value)}
                >
                  {invoices.length > 0 ? (
                    invoices.map((inv) => (
                      <MenuItem key={inv.id} value={inv.id}>
                        {inv.invoice_number} — {inv.project_or_service} (UGX {inv.amount_ugx.toLocaleString()}) [{inv.status}]
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Loading invoices...</MenuItem>
                  )}
                </TextField>

                {selectedInvoice && (
                  <Box sx={{ p: 2.5, bgcolor: '#f1f5f9', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                      INVOICE AMOUNT PAYABLE
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#034732', my: 0.5 }}>
                      UGX {selectedInvoice.amount_ugx.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#475569' }}>
                      Client: {selectedInvoice.client_name} • Due: {selectedInvoice.due_date}
                    </Typography>
                  </Box>
                )}

                <TextField
                  label="Payment Channel / Gateway"
                  select
                  fullWidth
                  value={provider}
                  onChange={(e) => {
                    const p = e.target.value as any;
                    setProvider(p);
                    setPhoneNumber(p === 'MTN Mobile Money' ? '+256772123456' : '+256752987654');
                  }}
                >
                  <MenuItem value="MTN Mobile Money">MTN Mobile Money Uganda (*165# Open API)</MenuItem>
                  <MenuItem value="Airtel Money">Airtel Money Uganda (*185# Push)</MenuItem>
                  <MenuItem value="Bank EFT">Bank Wire Transfer / Electronic Funds Transfer (EFT)</MenuItem>
                </TextField>

                {provider !== 'Bank EFT' ? (
                  <TextField
                    label="Mobile Money Registered MSISDN Phone"
                    fullWidth
                    required
                    placeholder="+256772123456"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    helperText="A push USSD prompt will be sent to this phone to authorize the debit."
                  />
                ) : (
                  <Alert severity="info">
                    Bank EFT transfers will be reconciled within 2 hours. Send proof of transfer with invoice reference.
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isProcessing}
                  endIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <CreditCard size={18} />}
                  sx={{
                    py: 1.5,
                    bgcolor: '#034732',
                    '&:hover': { bgcolor: '#023324' },
                    fontWeight: 700,
                    borderRadius: 2,
                  }}
                >
                  {isProcessing ? 'Authorizing Webhook Settlement...' : `Pay UGX ${(selectedInvoice?.amount_ugx || 1850000).toLocaleString()} Now`}
                </Button>

              </Box>
            </form>
          )}

        </Paper>
      </Container>
    </Box>
  );
};
