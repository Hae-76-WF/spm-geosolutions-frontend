"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { Mail, ArrowRight, KeyRound, ArrowLeft } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ForgotPasswordView: React.FC = () => {
  const { forgotPassword, showSnackbar } = useAppStore();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const result = await forgotPassword(email.trim());
      if (result.success) {
        setSuccessMessage('Password reset instructions have been sent to your email address.');
        showSnackbar('Password reset link sent!', 'success');
      } else {
        setErrorMessage(result.message || 'Unable to process password reset request.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Service communication error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', bgcolor: '#f8fafc' }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            border: '1px solid #e2e8f0',
            bgcolor: 'white',
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: '#fef2f2',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fca5a5',
              }}
            >
              <KeyRound size={32} />
            </Box>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
            Forgot Password?
          </Typography>

          <Typography variant="body2" sx={{ color: '#64748b', mb: 3.5, lineHeight: 1.6 }}>
            Enter your registered SPM Geosolutions email address below. We'll send you a secure link to reset your account password.
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2, textAlign: 'left' }}>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2, textAlign: 'left' }}>
              {successMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Registered Email Address"
                type="email"
                fullWidth
                required
                placeholder="you@organisation.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} color="#64748b" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ArrowRight size={18} />}
                sx={{
                  py: 1.5,
                  bgcolor: '#034732',
                  '&:hover': { bgcolor: '#023324' },
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
              </Button>
            </Box>
          </form>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={Link}
              href="/auth/login"
              startIcon={<ArrowLeft size={16} />}
              sx={{ textTransform: 'none', fontWeight: 700, color: '#034732' }}
            >
              Back to Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
