"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LogOut,
  ArrowLeft,
  ShieldAlert,
  ChevronDown,
  Compass,
  Layers,
  Receipt,
  Settings,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const ClientNavbar: React.FC = () => {
  const { currentUser, logout } = useAppStore();
  const router = useRouter();
  const pathname = usePathname();

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(userMenuAnchor ? null : event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    router.push('/auth/login');
  };

  const initials = currentUser.name
    ? currentUser.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: '#034732',
        color: 'white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          
          {/* Logo & Portal Identifier */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}>
              <Box
                component="img"
                src="/logo.png"
                alt="SPM Geosolutions Logo"
                sx={{
                  height: 42,
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </Box>

            <Chip
              label="CLIENT WORKSPACE"
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: 'white', fontWeight: 800, fontSize: '0.7rem' }}
            />

            {currentUser.role === 'admin' && (
              <Chip
                component={Link}
                href="/admin"
                icon={<ShieldAlert size={14} color="#fca5a5" />}
                label="ADMIN PORTAL"
                size="small"
                clickable
                sx={{ bgcolor: '#dc2626', color: 'white', fontWeight: 800, fontSize: '0.7rem' }}
              />
            )}
          </Box>

          {/* User Status & Avatar Dropdown Trigger */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              size="small"
              component={Link}
              href="/"
              startIcon={<ArrowLeft size={16} />}
              sx={{
                color: '#cbd5e1',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { color: 'white' },
              }}
            >
              Public Site
            </Button>

            <Box sx={{ position: 'relative' }}>
              <Box
                onClick={handleOpenUserMenu}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  pl: 2,
                  borderLeft: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  p: 0.8,
                  borderRadius: 2.5,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
                  transition: 'all 0.2s ease',
                }}
              >
                <Avatar
                  src={currentUser.avatar}
                  sx={{ width: 34, height: 34, bgcolor: '#eab308', color: '#0f172a', fontWeight: 800 }}
                >
                  {initials}
                </Avatar>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: 'white', lineHeight: 1.1 }}>
                    {currentUser.name || 'Practitioner'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#86efac', fontWeight: 600 }}>
                    {currentUser.organization || 'Licensed Surveyor'}
                  </Typography>
                </Box>
                <ChevronDown size={16} color="white" />
              </Box>

              {/* Light Mode Dropdown Menu for Client Portal */}
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleCloseUserMenu}
                slotProps={{
                  paper: {
                    elevation: 8,
                    sx: {
                      mt: 1.5,
                      width: 280,
                      borderRadius: 3,
                      bgcolor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                      color: '#0f172a',
                      p: 1.2,
                      overflow: 'hidden',
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {/* Header Info Block */}
                <Box sx={{ p: 1.8, borderRadius: 2.5, bgcolor: '#f8fafc', mb: 1, border: '1px solid #e2e8f0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Avatar
                      src={currentUser.avatar}
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: '#034732',
                        fontWeight: 800,
                        color: 'white',
                        fontSize: '0.9rem',
                      }}
                    >
                      {initials}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>
                        {currentUser.name || 'Practitioner'}
                      </Typography>
                      <Typography variant="caption" noWrap sx={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>
                        {currentUser.email || 'client@spmgeosolutions.ug'}
                      </Typography>
                    </Box>
                  </Box>

                  <Chip
                    label={`ROLE: ${(currentUser.role || 'CLIENT').toUpperCase()}`}
                    size="small"
                    sx={{
                      fontWeight: 800,
                      height: 22,
                      fontSize: '0.65rem',
                      bgcolor: '#f0fdf4',
                      color: '#034732',
                      border: '1px solid #bbf7d0',
                    }}
                  />
                </Box>

                <Typography variant="overline" sx={{ px: 1.5, color: '#94a3b8', fontWeight: 800, fontSize: '0.65rem', letterSpacing: 0.8 }}>
                  CLIENT WORKSPACE
                </Typography>

                <MenuItem
                  component={Link}
                  href="/client"
                  onClick={handleCloseUserMenu}
                  selected={pathname === '/client'}
                  sx={{
                    borderRadius: 1.8,
                    py: 1,
                    px: 1.5,
                    my: 0.3,
                    color: '#034732',
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#f0fdf4' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: '#034732' }}>
                    <Compass size={18} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#034732' }}>Overview Dashboard</Typography>}
                  />
                </MenuItem>

                <MenuItem
                  component={Link}
                  href="/client/gis-studio"
                  onClick={handleCloseUserMenu}
                  selected={pathname === '/client/gis-studio'}
                  sx={{
                    borderRadius: 1.5,
                    py: 0.8,
                    px: 1.5,
                    my: 0.2,
                    color: '#334155',
                    '&:hover': { bgcolor: '#f1f5f9', color: '#0f172a' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: '#64748b' }}>
                    <Layers size={17} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>GIS Studio & SLAAC</Typography>}
                  />
                </MenuItem>

                <MenuItem
                  component={Link}
                  href="/client/billing"
                  onClick={handleCloseUserMenu}
                  selected={pathname === '/client/billing'}
                  sx={{
                    borderRadius: 1.5,
                    py: 0.8,
                    px: 1.5,
                    my: 0.2,
                    color: '#334155',
                    '&:hover': { bgcolor: '#f1f5f9', color: '#0f172a' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: '#64748b' }}>
                    <Receipt size={17} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>Billing & Invoices</Typography>}
                  />
                </MenuItem>

                <MenuItem
                  component={Link}
                  href="/client/profile"
                  onClick={handleCloseUserMenu}
                  selected={pathname === '/client/profile'}
                  sx={{
                    borderRadius: 1.5,
                    py: 0.8,
                    px: 1.5,
                    my: 0.2,
                    color: '#334155',
                    '&:hover': { bgcolor: '#f1f5f9', color: '#0f172a' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: '#64748b' }}>
                    <Settings size={17} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>Profile & Settings</Typography>}
                  />
                </MenuItem>

                {currentUser.role === 'admin' && (
                  <>
                    <Divider sx={{ my: 1, borderColor: '#e2e8f0' }} />
                    <MenuItem
                      component={Link}
                      href="/admin"
                      onClick={handleCloseUserMenu}
                      sx={{
                        borderRadius: 1.8,
                        py: 1,
                        px: 1.5,
                        color: '#dc2626',
                        fontWeight: 700,
                        '&:hover': { bgcolor: '#fef2f2' },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32, color: '#dc2626' }}>
                        <ShieldAlert size={18} />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#dc2626' }}>Switch to Admin Portal</Typography>}
                      />
                    </MenuItem>
                  </>
                )}

                <Divider sx={{ my: 1, borderColor: '#e2e8f0' }} />

                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 1.8,
                    py: 1,
                    px: 1.5,
                    color: '#dc2626',
                    '&:hover': { bgcolor: '#fef2f2' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: '#dc2626' }}>
                    <LogOut size={18} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography sx={{ fontSize: '0.85rem', fontWeight: 800 }}>Sign Out</Typography>}
                  />
                </MenuItem>
              </Menu>
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};
