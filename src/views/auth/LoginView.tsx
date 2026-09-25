"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const accessPoints = [
  'Manage survey and spatial-data processing workflows.',
  'Track project files, jobs, deliverables, and activity.',
  'Use role-based tools for client and administration work.',
];

export const LoginView: React.FC = () => {
  const { login, currentUser } = useAppStore();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setErrorMessage('Enter your email address and password to continue.');
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await login({ email: email.trim(), password });
      if (res && res.success) {
        const role = useAppStore.getState().currentUser.role;
        router.push(role === 'admin' ? '/admin' : '/client');
      } else if (res && res.requires_verification) {
        router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
      } else {
        setErrorMessage(res?.message || 'Sign-in failed. Please check your credentials and try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to connect to the authentication service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (currentUser.email && currentUser.email.trim() !== '') {
      router.replace(currentUser.role === 'admin' ? '/admin' : '/client');
    }
  }, [currentUser, router]);

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 76px)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 5, md: 8 },
        bgcolor: '#FFFDF2',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            gap: { xs: 3, md: 5 },
            alignItems: 'stretch',
          }}
        >
          {/* Brand and workspace context */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              minHeight: { md: 560 },
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: 'white',
              backgroundImage: `linear-gradient(135deg, rgba(3, 71, 50, 0.95), rgba(39, 110, 185, 0.88)), url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 18px 45px rgba(3, 71, 50, 0.16)',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: 220,
                height: 220,
                right: -90,
                bottom: -90,
                borderRadius: '50%',
                border: '32px solid rgba(255, 140, 0, 0.28)',
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ mb: 4 }}>
                <Box
                  component="img"
                  src="/logo.png"
                  alt="SPM Geosolutions Logo"
                  sx={{
                    height: 58,
                    width: 'auto',
                    objectFit: 'contain',
                    bgcolor: 'white',
                    p: 1.25,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.14)',
                  }}
                />
              </Box>

              <Chip
                icon={<ShieldCheck size={16} color="#212529" />}
                label="SPM GEOSOLUTIONS WORKSPACE"
                size="small"
                sx={{
                  bgcolor: '#F8F5B5',
                  color: '#212529',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  mb: 2.5,
                }}
              />

              <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, lineHeight: 1.12, maxWidth: 540 }}>
                Your spatial work, ready when you are.
              </Typography>
              <Typography variant="body1" sx={{ color: '#E6F0FA', mb: 4, lineHeight: 1.7, maxWidth: 560 }}>
                Sign in to continue your SPM Geosolutions workflow—from project files and survey processing to spatial intelligence and client deliverables.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.1, my: 3 }}>
                {accessPoints.map((point) => (
                  <Box key={point} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <CheckCircle2 size={20} color="#FF8C00" style={{ flexShrink: 0, marginTop: 2 }} />
                    <Typography variant="body2" sx={{ color: '#F2F7FB' }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1, pt: 3, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <Typography variant="caption" sx={{ color: '#E6F0FA' }}>
                SPM Geosolutions • Spatial intelligence for confident decisions
              </Typography>
            </Box>
          </Paper>

          {/* Sign-in form */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              border: '1px solid #D9E3EA',
              bgcolor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 12px 35px rgba(33, 37, 41, 0.07)',
            }}
          >
            <Box sx={{ mb: 3.5 }}>
              <Typography variant="overline" sx={{ color: '#276EB9', fontWeight: 800, letterSpacing: 1.6 }}>
                PORTAL ACCESS
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#034732', mt: 0.5, mb: 1 }}>
                Welcome back
              </Typography>
              <Typography variant="body2" sx={{ color: '#53616D', lineHeight: 1.7 }}>
                Use the email associated with your SPM account to access your workspace.
              </Typography>
            </Box>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  label="Email address"
                  type="email"
                  fullWidth
                  placeholder="you@organisation.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={18} color="#53616D" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Box>
                  <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    required
                    autoComplete="current-password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock size={18} color="#53616D" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              type="button"
                              onClick={() => setShowPassword((visible) => !visible)}
                              edge="end"
                              aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Link href="/forgot-password" style={{ textDecoration: 'none' }}>
                      <Typography variant="caption" sx={{ color: '#034732', fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}>
                        Forgot Password?
                      </Typography>
                    </Link>
                  </Box>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ArrowRight size={18} />}
                  sx={{
                    py: 1.5,
                    bgcolor: '#034732',
                    '&:hover': { bgcolor: '#022E20' },
                    fontWeight: 800,
                    borderRadius: 2,
                    boxShadow: '0 8px 18px rgba(3, 71, 50, 0.18)',
                  }}
                >
                  {isSubmitting ? 'Signing in…' : 'Sign in to workspace'}
                </Button>
              </Box>
            </form>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: '#53616D' }}>
                Don't have a practitioner account yet?
              </Typography>
              <Button
                component={Link}
                href="/register"
                sx={{ textTransform: 'none', fontWeight: 800, color: '#034732' }}
              >
                Register New Practice / Account
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};
