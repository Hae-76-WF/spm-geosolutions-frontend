import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { Award, ShieldCheck, CheckCircle2, Search, QrCode, Lock, ExternalLink } from 'lucide-react';
import { spmApi } from '../../services/api';
import { useAppStore } from '../../store/useAppStore';

export const VerifyCertificateView: React.FC = () => {
  const { showSnackbar } = useAppStore();

  const [certId, setCertId] = useState('SPM-CERT-2026-9041');
  const [isVerifying, setIsVerifying] = useState(false);
  const [certData, setCertData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId) {
      setErrorMsg('Please enter a valid SPM Academy Certificate ID.');
      return;
    }
    setIsVerifying(true);
    setErrorMsg(null);
    setCertData(null);

    try {
      const res = await spmApi.verifyCertificate(certId.trim());
      setCertData(res);
      showSnackbar('Cryptographic credential verified successfully!', 'success');
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.message ||
        `Certificate ID "${certId}" could not be authenticated on the SRB cryptographic registry.`
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Box sx={{ minHeight: '85vh', py: 8, bgcolor: '#f8fafc' }}>
      <Container maxWidth="md">
        
        {/* Verification Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 5 },
            mb: 4,
            borderRadius: 3,
            color: 'white',
            backgroundImage: `linear-gradient(135deg, rgba(3, 71, 50, 0.94), rgba(15, 23, 42, 0.96)), url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
          }}
        >
          <Award size={48} color="#eab308" style={{ margin: '0 auto 12px auto' }} />
          <Typography variant="overline" sx={{ color: '#eab308', fontWeight: 800, letterSpacing: 2 }}>
            OFFICIAL ACCREDITATION PORTAL
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 1.5 }}>
            Digital Certificate & Credential Verifier
          </Typography>
          <Typography variant="body1" sx={{ color: '#e2e8f0', maxWidth: 650, mx: 'auto' }}>
            Verify the authenticity of professional certificates issued by SPM Geosolutions Academy under the Surveyors Registration Board (SRB Uganda) Continuous Professional Development (CPD) framework.
          </Typography>
        </Paper>

        {/* Search Bar Paper */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4, border: '1px solid #e2e8f0' }}>
          <form onSubmit={handleVerify}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                fullWidth
                label="Certificate Serial Number"
                placeholder="e.g. SPM-CERT-2026-9041"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isVerifying}
                endIcon={isVerifying ? <CircularProgress size={20} color="inherit" /> : <Search size={20} />}
                sx={{
                  bgcolor: '#034732',
                  '&:hover': { bgcolor: '#023324' },
                  fontWeight: 700,
                  px: 4,
                  minWidth: 160,
                }}
              >
                {isVerifying ? 'Verifying...' : 'Verify Now'}
              </Button>
            </Box>
          </form>

          {errorMsg && (
            <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
              {errorMsg}
            </Alert>
          )}
        </Paper>

        {/* Verification Result Card */}
        {certData && (
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              border: '2px solid #16a34a',
              bgcolor: '#ffffff',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircle2 size={32} color="#16a34a" />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                    Authentic Verified Credential
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 700 }}>
                    SRB CPD Registration Verified
                  </Typography>
                </Box>
              </Box>
              <Chip label="STATUS: ACTIVE & ACCREDITED" color="success" sx={{ fontWeight: 800 }} />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5, mb: 3 }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#64748b' }}>Recipient / Scholar</Typography>
                <Typography variant="body1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  {certData.recipient_name}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: '#64748b' }}>Course Title</Typography>
                <Typography variant="body1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  {certData.course_title}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: '#64748b' }}>Grade & Distinction</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#15803d' }}>
                  {certData.grade}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: '#64748b' }}>Date of Issue</Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {certData.issue_date}
                </Typography>
              </Box>
            </Box>

            {/* Cryptographic Hash */}
            <Box sx={{ p: 2.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', mb: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Lock size={14} /> IMMUTABLE SHA-256 REGISTRY FINGERPRINT
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#0f172a', wordBreak: 'break-all' }}>
                {certData.sha256_fingerprint}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<ExternalLink size={16} />}
                onClick={() => window.print()}
                sx={{ textTransform: 'none', fontWeight: 700 }}
              >
                Print Verification Receipt
              </Button>
            </Box>
          </Paper>
        )}

      </Container>
    </Box>
  );
};
