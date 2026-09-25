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
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowRight, Shield, Award } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const RegisterView: React.FC = () => {
  const router = useRouter();
  const { register, currentUser } = useAppStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'student'>('client');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('+256');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser.email && currentUser.email.trim() !== '') {
      if (currentUser.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/client');
      }
    }
  }, [currentUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage('Name, Email, and Password are mandatory fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await register({
        name,
        email: email.trim(),
        password,
        role,
        organization: organization || 'Survey Practice',
        phone,
        licenseNumber: role === 'client' ? licenseNumber : undefined,
      });

      if (result && result.success) {
        if (result.requires_verification) {
          router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
        } else {
          router.push('/client');
        }
      } else {
        setErrorMessage(result?.message || 'Failed to register account. Email address may already be registered.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during account registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '85vh', py: 8, bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' }, gap: 4 }}>
          {/* Visual Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 3,
              backgroundImage: `linear-gradient(135deg, rgba(3, 71, 50, 0.88), rgba(15, 23, 42, 0.90)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Box sx={{ mb: 3 }}>
                <Box
                  component="img"
                  src="/logo.png"
                  alt="SPM Geosolutions Logo"
                  sx={{
                    height: 52,
                    width: 'auto',
                    objectFit: 'contain',
                    bgcolor: 'white',
                    p: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>

              <Typography variant="overline" sx={{ color: '#eab308', fontWeight: 800, letterSpacing: 1.5 }}>
                PROFESSIONAL MEMBERSHIP
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, my: 2, lineHeight: 1.2 }}>
                Join Uganda's Geomatics Hub
              </Typography>
              <Typography variant="body1" sx={{ color: '#e2e8f0', mb: 4, lineHeight: 1.6 }}>
                Create an account to submit raw GNSS files, order drone photogrammetry processing, enroll in SRB-accredited GIS masterclasses, and access custom CAD title blocks.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Shield size={24} color="#86efac" />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      SRB & DeLIS Compliance
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                      All boundary adjudications and Deed Plans strictly match Uganda Survey Act Cap 232.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Award size={24} color="#86efac" />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Verifiable Digital Credentials
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#cbd5e1' }}>
                      Blockchain and cryptographic SHA-256 verifiable training certificates with instant QR validation.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ pt: 4, mt: 4, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                SPM Geosolutions (U) Ltd • Nakasero, Kampala • ISO 19152 LADM Compliant
              </Typography>
            </Box>
          </Paper>

          {/* Interactive Form */}
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: 'white',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                Register Account
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Fill in your professional practice or student details below. A 6-digit verification OTP will be sent to your email.
              </Typography>
            </Box>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                <Box sx={{ gridColumn: { xs: '1', sm: 'span 2' } }}>
                  <TextField
                    label="Account Type / Role"
                    select
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'client' | 'student')}
                  >
                    <MenuItem value="client">Licensed Land Surveyor / Consulting Engineering Firm</MenuItem>
                    <MenuItem value="student">GIS Scholar / University Student</MenuItem>
                  </TextField>
                </Box>

                <TextField
                  label="Full Official Name"
                  fullWidth
                  required
                  placeholder="e.g. Eng. Jane Asasira"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  label="Official Email Address"
                  type="email"
                  fullWidth
                  required
                  placeholder="e.g. surveyor@firm.ug"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  label="Password (min 6 chars)"
                  type="password"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                  label="Phone Number"
                  fullWidth
                  placeholder="+256772123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <TextField
                  label="Company / Practice Name / Institution"
                  fullWidth
                  placeholder="e.g. Survey Afrika Ltd"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />

                {role === 'client' && (
                  <TextField
                    label="SRB Registration / License Number"
                    fullWidth
                    placeholder="e.g. SRB/SURV/UG/041"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  />
                )}

                <Box sx={{ gridColumn: { xs: '1', sm: 'span 2' }, mt: 1 }}>
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
                    {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
                  </Button>
                </Box>
              </Box>
            </form>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Already registered?{' '}
                <Button
                  component={Link}
                  href="/login"
                  sx={{ textTransform: 'none', fontWeight: 700, color: '#034732', p: 0 }}
                >
                  Sign In to Existing Account
                </Button>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};
