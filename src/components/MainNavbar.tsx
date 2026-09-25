"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu as MenuIcon,
  ShieldAlert,
  User,
  LogOut,
  ChevronDown,
  Compass,
  Layers,
  Receipt,
  Settings,
  Users,
  FileCheck,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

interface NavLink {
  href: string;
  label: string;
}

export const MainNavbar: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn, currentUser, logout } = useAppStore();
  const pathname = usePathname();
  const [mobileAnchor, setMobileAnchor] = useState<null | HTMLElement>(null);

  // User Avatar Dropdown state (Click to open/close)
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

  const navLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/academy', label: 'SPM Academy' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/projects', label: 'Projects' },
    { href: '/code-architecture', label: 'Technology' },
  ];

  // Generate initials for avatar
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
        bgcolor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>
          
          {/* Logo Brand Image */}
          <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }}>
            <Box
              component="img"
              src="/logo.png"
              alt="SPM Geosolutions Logo"
              sx={{
                height: { xs: 44, md: 52 },
                width: 'auto',
                maxHeight: 56,
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  sx={{
                    px: 1.8,
                    py: 0.8,
                    textTransform: 'none',
                    fontWeight: active ? 800 : 600,
                    color: active ? '#034732' : '#475569',
                    bgcolor: active ? '#f0fdf4' : 'transparent',
                    borderRadius: 2,
                    fontSize: '0.9rem',
                    '&:hover': {
                      bgcolor: '#f1f5f9',
                      color: '#0f172a',
                    },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>

          {/* Desktop User Avatar Dropdown / Auth CTA */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            {isLoggedIn ? (
              <Box sx={{ position: 'relative' }}>
                <Button
                  onClick={handleOpenUserMenu}
                  aria-controls={Boolean(userMenuAnchor) ? 'user-avatar-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(userMenuAnchor) ? 'true' : undefined}
                  sx={{
                    p: 0.6,
                    px: 1.5,
                    borderRadius: 3,
                    bgcolor: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                    textTransform: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: '#f1f5f9',
                      borderColor: '#034732',
                      boxShadow: '0 2px 8px rgba(3, 71, 50, 0.12)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                  }}
                >
                  <Avatar
                    src={currentUser.avatar}
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: currentUser.role === 'admin' ? '#dc2626' : '#034732',
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      border: `2px solid ${currentUser.role === 'admin' ? '#ef4444' : '#059669'}`,
                    }}
                  >
                    {initials}
                  </Avatar>

                  <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.1, fontSize: '0.82rem', color: '#0f172a' }}>
                      {currentUser.name || 'User'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 600, display: 'block' }}>
                      {currentUser.role === 'admin' ? 'System Administrator' : currentUser.organization || 'Client Workspace'}
                    </Typography>
                  </Box>

                  <ChevronDown size={16} color="#64748b" />
                </Button>

                {/* Light Mode User Dropdown Menu */}
                <Menu
                  id="user-avatar-menu"
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
                          bgcolor: currentUser.role === 'admin' ? '#dc2626' : '#034732',
                          fontWeight: 800,
                          color: 'white',
                          fontSize: '0.9rem',
                        }}
                      >
                        {initials}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>
                          {currentUser.name || 'Authenticated User'}
                        </Typography>
                        <Typography variant="caption" noWrap sx={{ color: '#64748b', display: 'block', fontSize: '0.72rem' }}>
                          {currentUser.email || 'user@spmgeosolutions.ug'}
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
                        bgcolor: currentUser.role === 'admin' ? '#fef2f2' : '#f0fdf4',
                        color: currentUser.role === 'admin' ? '#dc2626' : '#034732',
                        border: `1px solid ${currentUser.role === 'admin' ? '#fca5a5' : '#bbf7d0'}`,
                      }}
                    />
                  </Box>

                  {/* Primary Dashboards */}
                  <Typography variant="overline" sx={{ px: 1.5, color: '#94a3b8', fontWeight: 800, fontSize: '0.65rem', letterSpacing: 0.8 }}>
                    DASHBOARD PORTALS
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
                      primary={<Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#034732' }}>Client Workspace</Typography>}
                    />
                  </MenuItem>

                  {currentUser.role === 'admin' && (
                    <MenuItem
                      component={Link}
                      href="/admin"
                      onClick={handleCloseUserMenu}
                      selected={pathname.startsWith('/admin')}
                      sx={{
                        borderRadius: 1.8,
                        py: 1,
                        px: 1.5,
                        my: 0.3,
                        color: '#dc2626',
                        fontWeight: 700,
                        '&:hover': { bgcolor: '#fef2f2' },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32, color: '#dc2626' }}>
                        <ShieldAlert size={18} />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#dc2626' }}>Admin Portal</Typography>}
                      />
                    </MenuItem>
                  )}

                  <Divider sx={{ my: 1, borderColor: '#e2e8f0' }} />

                  {/* Quick Navigation Shortcuts */}
                  <Typography variant="overline" sx={{ px: 1.5, color: '#94a3b8', fontWeight: 800, fontSize: '0.65rem', letterSpacing: 0.8 }}>
                    QUICK ACTIONS
                  </Typography>

                  <MenuItem
                    component={Link}
                    href="/client/gis-studio"
                    onClick={handleCloseUserMenu}
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
                      <MenuItem
                        component={Link}
                        href="/admin/users"
                        onClick={handleCloseUserMenu}
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
                          <Users size={17} />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>RBAC Users</Typography>}
                        />
                      </MenuItem>

                      <MenuItem
                        component={Link}
                        href="/admin/audit-trail"
                        onClick={handleCloseUserMenu}
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
                          <FileCheck size={17} />
                        </ListItemIcon>
                        <ListItemText
                          primary={<Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>Audit Trail</Typography>}
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
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  href="/auth/login"
                  sx={{
                    borderColor: '#034732',
                    color: '#034732',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2.5,
                    py: 0.9,
                  }}
                >
                  Sign In
                </Button>
              </Box>
            )}
          </Box>

          {/* Mobile Navigation & Menu Drawer */}
          <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 1 }}>
            {isLoggedIn && (
              <Avatar
                onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                src={currentUser.avatar}
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: currentUser.role === 'admin' ? '#dc2626' : '#034732',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}
              >
                {initials}
              </Avatar>
            )}

            <IconButton onClick={(e) => setMobileAnchor(e.currentTarget)}>
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={mobileAnchor}
              open={Boolean(mobileAnchor)}
              onClose={() => setMobileAnchor(null)}
              slotProps={{
                paper: {
                  sx: { width: 260, borderRadius: 2, p: 1 }
                }
              }}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.href}
                  component={Link}
                  href={link.href}
                  onClick={() => setMobileAnchor(null)}
                >
                  {link.label}
                </MenuItem>
              ))}

              <Divider sx={{ my: 1 }} />

              {isLoggedIn ? (
                <>
                  <MenuItem
                    component={Link}
                    href="/client"
                    onClick={() => setMobileAnchor(null)}
                  >
                    Client Workspace
                  </MenuItem>
                  {currentUser.role === 'admin' && (
                    <MenuItem
                      component={Link}
                      href="/admin"
                      onClick={() => setMobileAnchor(null)}
                    >
                      Admin Portal
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      setMobileAnchor(null);
                      handleLogout();
                    }}
                    sx={{ color: '#dc2626', fontWeight: 700 }}
                  >
                    Sign Out
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  component={Link}
                  href="/auth/login"
                  onClick={() => setMobileAnchor(null)}
                >
                  Sign In
                </MenuItem>
              )}
            </Menu>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};
