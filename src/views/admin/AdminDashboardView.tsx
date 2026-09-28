"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { ShieldAlert, RefreshCw, LogOut } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminAuthView } from './AdminAuthView';
import { AdminTelemetrySection } from './sections/AdminTelemetrySection';
import { AdminUsersSection } from './sections/AdminUsersSection';
import { AdminEventBusSection } from './sections/AdminEventBusSection';
import { AdminAuditTrailSection } from './sections/AdminAuditTrailSection';

export const AdminDashboardView: React.FC = () => {
  const {
    isLoggedIn,
    currentUser,
    adminDestination,
    fetchAdminMetrics,
    fetchAdminEvents,
    fetchAuditLogs,
    logout,
    setAdminSubdomainOverride,
    showSnackbar,
  } = useAppStore();

  useEffect(() => {
    if (isLoggedIn && currentUser.role === 'admin') {
      fetchAdminMetrics();
      fetchAdminEvents();
      fetchAuditLogs();
    }
  }, [isLoggedIn, currentUser, fetchAdminMetrics, fetchAdminEvents, fetchAuditLogs]);

  // If user is not authenticated or does not have role 'admin', show separate Admin Auth portal
  if (!isLoggedIn || currentUser.role !== 'admin') {
    return <AdminAuthView />;
  }

  const renderSection = () => {
    switch (adminDestination) {
      case 'dashboard':
      case 'cluster':
        return <AdminTelemetrySection />;
      case 'users':
        return <AdminUsersSection />;
      case 'event-bus':
        return <AdminEventBusSection />;
      case 'audit-trail':
        return <AdminAuditTrailSection />;
      default:
        return <AdminTelemetrySection />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#0b1120', minHeight: '100vh', py: 4, color: '#f8fafc' }}>
      <Container maxWidth="xl">
        {/* Isolated Subdomain Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            bgcolor: '#1e293b',
            border: '1px solid #334155',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 1.5, bgcolor: '#dc2626', borderRadius: 2 }}>
              <ShieldAlert size={28} color="white" />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, color: 'white' }}>
                  admin.spmgeosolutions.com
                </Typography>
                <Chip label="ISOLATED SUBDOMAIN" size="small" color="error" sx={{ fontWeight: 800 }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Logged in as superuser: <strong>{currentUser.email}</strong> ({currentUser.name})
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshCw size={14} />}
              onClick={() => {
                fetchAdminMetrics();
                fetchAdminEvents();
                fetchAuditLogs();
                showSnackbar('Admin telemetry reloaded', 'info');
              }}
              sx={{ borderColor: '#475569', color: '#cbd5e1' }}
            >
              Reload Metrics
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              startIcon={<LogOut size={14} />}
              onClick={() => {
                logout();
                showSnackbar('Admin session terminated.', 'info');
              }}
            >
              Sign Out Admin
            </Button>
          </Box>
        </Paper>

        {/* 2-Column Dashboard Layout: Left Admin Sidebar + Right Content */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3.5, alignItems: 'flex-start' }}>
          <AdminSidebar />
          <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%' }}>
            {renderSection()}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

