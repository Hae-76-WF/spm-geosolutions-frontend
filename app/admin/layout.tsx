"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { AdminNavbar } from '@/components/AdminNavbar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { useAppStore } from '@/store/useAppStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    isLoggedIn,
    isSessionLoading,
    currentUser,
    initializeSession,
    showSnackbar,
  } = useAppStore();

  useEffect(() => {
    initializeSession();
  }, [initializeSession]);

  useEffect(() => {
    if (!isSessionLoading) {
      if (!isLoggedIn) {
        showSnackbar('Please log in with an administrator account to access the Admin Portal.', 'warning');
        router.replace('/login');
      } else if (currentUser.role !== 'admin') {
        showSnackbar('Access denied: Administrator privileges required.', 'error');
        router.replace('/client');
      }
    }
  }, [isLoggedIn, isSessionLoading, currentUser, router, showSnackbar]);

  if (isSessionLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#0b1120',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          color: 'white',
        }}
      >
        <CircularProgress sx={{ color: '#dc2626' }} size={48} />
        <Typography variant="subtitle1" sx={{ color: '#94a3b8', fontWeight: 600 }}>
          Authenticating Superuser Cluster Credentials...
        </Typography>
      </Box>
    );
  }

  // Prevent rendering unauthorized dashboard content during redirect
  if (!isLoggedIn || currentUser.role !== 'admin') {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#0b1120', minHeight: '100vh', color: '#f8fafc' }}>
      {/* Top Application Navigation Bar docked edge to edge */}
      <AdminNavbar />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* 2-Column Dashboard Layout: Left Admin Sidebar + Main Content */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3.5, alignItems: 'flex-start' }}>
          <AdminSidebar />
          <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%' }}>
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
