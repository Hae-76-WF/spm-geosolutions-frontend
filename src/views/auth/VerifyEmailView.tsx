"use client";

import React, { useState, useEffect } from 'react';
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
import { useSearchParams, useRouter } from 'next/navigation';
import { Mail, KeyRound, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const VerifyEmailView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verifyOtp, resendOtp, showSnackbar } = useAppStore();

  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !otpCode.trim()) {
      setErrorMessage('Please enter both your email address and 6-digit OTP code.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const result = await verifyOtp({ email: email.trim(), otp: otpCode.trim() });
      if (result.success) {
        setSuccessMessage('Email verified successfully! Redirecting to your dashboard...');
        showSnackbar('Email verified successfully!', 'success');
        setTimeout(() => {
          const role = useAppStore.getState().currentUser.role;
          router.push(role === 'admin' ? '/admin' : '/client');
        }, 1200);
      } else {
        setErrorMessage(result.message || 'Invalid or expired OTP code. Please request a new one.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification service error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email.trim() || cooldown > 0) return;
    setIsResending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await resendOtp(email.trim());
      if (result.success) {
        setSuccessMessage('A fresh 6-digit OTP has been sent to your email address.');
        setCooldown(60);
        showSnackbar('OTP resent successfully!', 'info');
      } else {
        setErrorMessage(result.message || 'Failed to resend OTP code.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to connect to resend service.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
      <Container>
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
                bgcolor: '#f0fdf4',
                color: '#034732',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #bbf7d0',
              }}
            >
              <KeyRound size={32} />
            </Box>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, color: '#034732', mb: 1 }}>
            Verify Your Email
          </Typography>

          <Typography variant="body2" sx={{ color: '#64748b', mb: 3.5, lineHeight: 1.6 }}>
            We've sent a 6-digit verification code to{' '}
            <strong style={{ color: '#0f172a' }}>{email || 'your email address'}</strong>. Enter the code below to complete your registration.
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

          <form onSubmit={handleVerify}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
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

              <TextField
                label="6-Digit Verification OTP"
                type="text"
                fullWidth
                required
                placeholder="e.g. 849201"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                slotProps={{
                  htmlInput: { maxLength: 6, style: { textAlign: 'center', letterSpacing: '0.3em', fontSize: '1.25rem', fontWeight: 800 } },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyRound size={18} color="#64748b" />
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
                {isSubmitting ? 'Verifying Code...' : 'Verify Email Address'}
              </Button>
            </Box>
          </form>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Didn't receive the OTP code? Check spam folder or resend.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleResend}
              disabled={isResending || cooldown > 0 || !email.trim()}
              startIcon={<RefreshCw size={14} className={isResending ? 'animate-spin' : ''} />}
              sx={{ borderColor: '#034732', color: '#034732', fontWeight: 700, textTransform: 'none', borderRadius: 2 }}
            >
              {cooldown > 0 ? `Resend Code in ${cooldown}s` : isResending ? 'Sending...' : 'Resend Verification Code'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
