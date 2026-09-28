"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Server,
  Users,
  GraduationCap,
  Package,
  Receipt,
  Radio,
  FileCheck,
  LogOut,
  ChevronDown,
  Activity,
  Compass,
  RefreshCw,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const AdminNavbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isLoggedIn,
    currentUser,
    logout,
    fetchAdminMetrics,
    fetchAdminEvents,
    fetchAuditLogs,
    showSnackbar,
  } = useAppStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
    logout();
    router.replace('/');
  };

  const navMenuItems = [
    { label: 'Cluster Telemetry', href: '/admin', icon: Server },
    { label: 'RBAC Users', href: '/admin/users', icon: Users },
    { label: 'Academy Courses', href: '/admin/courses', icon: GraduationCap },
    { label: 'Geomatics Store', href: '/admin/products', icon: Package },
    { label: 'Invoices & Billing', href: '/admin/invoices', icon: Receipt },
    { label: 'Redis Event Bus', href: '/admin/event-bus', icon: Radio },
    { label: 'SHA-256 Audit Trail', href: '/admin/audit-trail', icon: FileCheck },
  ];

  const initials = currentUser.name
    ? currentUser.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AD';

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: '#1e293b',
        borderBottom: '1px solid #334155',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        color: 'white',
        width: '100%',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 68,
          }}
        >
          {/* Brand & Subdomain Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box
                component="img"
                src="/logo.png"
                alt="SPM Geosolutions Logo"
                sx={{
                  height: 38,
                  width: 'auto',
                  objectFit: 'contain',
                  bgcolor: 'white',
                  p: 0.6,
                  borderRadius: 1.5,
                }}
              />
            </Link>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, color: 'white', letterSpacing: 0.5, lineHeight: 1.2, fontSize: '1.05rem' }}>
                  SPM GEOSOLUTIONS
                </Typography>
                <Chip
                  label="ADMIN PORTAL"
                  size="small"
                  sx={{ bgcolor: '#dc2626', color: 'white', fontWeight: 800, height: 22, fontSize: '0.68rem' }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>admin.spmgeosolutions.com</span>
                <span>•</span>
                <span style={{ color: '#4ade80', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Activity size={12} /> Cluster Active
                </span>
              </Typography>
            </Box>
          </Box>

          {/* Right Controls: Refresh Button & User Avatar Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshCw size={14} />}
              onClick={() => {
                fetchAdminMetrics();
                fetchAdminEvents();
                fetchAuditLogs();
                showSnackbar('Admin telemetry reloaded from backend', 'info');
              }}
              sx={{ borderColor: '#475569', color: '#cbd5e1', textTransform: 'none', '&:hover': { borderColor: 'white' } }}
            >
              Reload Telemetry
            </Button>

            {isLoggedIn && (
              <>
                <Button
                  onClick={handleOpenMenu}
                  sx={{
                    p: 0.75,
                    px: 1.5,
                    borderRadius: 2.5,
                    bgcolor: '#0f172a',
                    border: '1px solid #334155',
                    color: 'white',
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#334155' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: '#dc2626',
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      border: '2px solid #ef4444',
                    }}
                  >
                    {initials}
                  </Avatar>

                  <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.1, fontSize: '0.82rem' }}>
                      {currentUser.name || 'System Admin'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                      {currentUser.email || 'admin@spmgeosolutions.ug'}
                    </Typography>
                  </Box>

                  <ChevronDown size={16} color="#94a3b8" />
                </Button>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  slotProps={{
                    paper: {
                      elevation: 6,
                      sx: {
                        mt: 1.5,
                        width: 260,
                        borderRadius: 3,
                        bgcolor: '#1e293b',
                        border: '1px solid #334155',
                        color: 'white',
                        p: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {/* User Persona Details */}
                  <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: '#0f172a', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'white' }}>
                      {currentUser.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1 }}>
                      {currentUser.email}
                    </Typography>
                    <Chip
                      label={`ROLE: ${currentUser.role?.toUpperCase() || 'ADMIN'}`}
                      size="small"
                      color="error"
                      sx={{ fontWeight: 800, height: 20, fontSize: '0.65rem' }}
                    />
                  </Box>

                  <Typography variant="overline" sx={{ px: 1.5, color: '#64748b', fontWeight: 800, fontSize: '0.65rem' }}>
                    ADMIN DASHBOARD SECTIONS
                  </Typography>

                  {navMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                    return (
                      <MenuItem
                        key={item.href}
                        component={Link}
                        href={item.href}
                        onClick={handleCloseMenu}
                        selected={isActive}
                        sx={{
                          borderRadius: 1.5,
                          py: 1,
                          px: 1.5,
                          my: 0.3,
                          border: isActive ? '1px solid #f87171' : '1px solid transparent',
                          fontSize: '0.85rem',
                          fontWeight: isActive ? 800 : 500,
                          color: isActive ? '#f87171' : '#cbd5e1',
                          bgcolor: isActive ? 'rgb(35 33 33 / 0.65)' : 'transparent',
                          '&:hover': { backgroundColor: '#334155', color: '#c3bfbf' },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, color: isActive ? '#f87171' : '#94a3b8' }}>
                          <Icon size={18} />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography sx={{ fontSize: '0.85rem', fontWeight: isActive ? 800 : 500, color: '#c3bfbf' }}>{item.label}</Typography>}
                        />
                      </MenuItem>
                    );
                  })}

                  <Divider sx={{ my: 1, borderColor: '#334155' }} />

                  <MenuItem
                    component={Link}
                    href="/client"
                    onClick={handleCloseMenu}
                    sx={{
                      borderRadius: 1.5,
                      py: 1,
                      px: 1.5,
                      fontSize: '0.85rem',
                      color: '#38bdf8',
                      '&:hover': { bgcolor: '#334155' },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, color: '#38bdf8' }}>
                      <Compass size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography sx={{ fontSize: '0.85rem', color: '#c3bfbf' }}>Switch to Client Portal</Typography>}
                    />
                  </MenuItem>

                  <MenuItem
                    onClick={handleLogout}
                    sx={{
                      borderRadius: 1.5,
                      py: 1,
                      px: 1.5,
                      fontSize: '0.85rem',
                      color: '#ef4444',
                      '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.15)' },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, color: '#ef4444' }}>
                      <LogOut size={18} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#c3bfbf' }}>Sign Out</Typography>}
                    />
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
