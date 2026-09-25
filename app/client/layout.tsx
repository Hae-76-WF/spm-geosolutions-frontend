"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, RefreshCw, UploadCloud } from 'lucide-react';
import { ClientNavbar } from '@/components/ClientNavbar';
import { ClientSidebar } from '@/components/ClientSidebar';
import { Footer } from '@/components/Footer';
import { useAppStore } from '@/store/useAppStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    isLoggedIn,
    isSessionLoading,
    currentUser,
    initializeSession,
    fetchJobs,
    fetchInvoices,
    fetchRetainers,
    fetchUserSettings,
    showSnackbar,
  } = useAppStore();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  useEffect(() => {
    if (!isSessionLoading && !isLoggedIn) {
      showSnackbar('Please log in to access your client workspace.', 'warning');
      router.replace('/login');
    }
  }, [isLoggedIn, isSessionLoading, router, showSnackbar]);

  if (isSessionLoading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <CircularProgress sx={{ color: '#034732' }} size={44} />
        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
          Loading Practitioner Workspace...
        </Typography>
      </Box>
    );
  }

  // Prevent rendering unauthorized workspace if redirecting to /login
  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <ClientNavbar />
      <Box sx={{ minHeight: '85vh', py: 4, bgcolor: '#f8fafc' }}>
        <Container maxWidth="xl">

          {/* Client Portal Workspace Header Shared across all Client pages */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              bgcolor: 'white',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ p: 1.5, bgcolor: '#034732', borderRadius: 2, color: 'white' }}>
                <Compass size={28} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  Client Workspace: {currentUser.name || 'Practitioner'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                  {currentUser.organization || 'Survey Afrika Ltd'} • License: {currentUser.license_number || 'SRB/SURV/UG/041'} • Role: {currentUser.role?.toUpperCase() || 'CLIENT'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshCw size={14} />}
                onClick={() => {
                  fetchJobs();
                  fetchInvoices();
                  fetchRetainers();
                  fetchUserSettings();
                  showSnackbar('Refreshed data from backend API', 'info');
                }}
              >
                Refresh
              </Button>
              <Button
                component={Link}
                href="/client/uploader"
                variant="contained"
                size="small"
                startIcon={<UploadCloud size={16} />}
                sx={{ bgcolor: '#034732', '&:hover': { bgcolor: '#023324' }, fontWeight: 700 }}
              >
                New S3 Upload
              </Button>
            </Box>
          </Paper>

          {/* 2-Column Dashboard Layout: Left Sidebar + Right Content */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3.5, alignItems: 'flex-start' }}>
            <ClientSidebar />
            <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%' }}>
              {children}
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
