"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Folder,
  UploadCloud,
  Layers,
  Database,
  CreditCard,
  FileText,
  User,
  Settings as SettingsIcon,
  ShieldCheck,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const ClientSidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, jobs, invoices } = useAppStore();

  const pendingInvoices = invoices.filter((i) => i.status === 'Pending').length;
  const activeJobs = jobs.filter((j) => j.status === 'processing' || j.status === 'queued').length;

  const navLinks = [
    {
      label: 'Overview & Retainers',
      href: '/client',
      icon: Folder,
      badge: null,
    },
    {
      label: 'S3 Direct Ingestion',
      href: '/client/uploader',
      icon: UploadCloud,
      badge: null,
    },
    {
      label: 'Processing Pipeline',
      href: '/client/pipeline',
      icon: Layers,
      badge: activeJobs > 0 ? `${activeJobs} active` : null,
      badgeColor: '#eab308',
    },
    {
      label: 'PostGIS Studio',
      href: '/client/gis-studio',
      icon: Database,
      badge: null,
    },
    {
      label: 'Invoices & Billing',
      href: '/client/billing',
      icon: CreditCard,
      badge: pendingInvoices > 0 ? `${pendingInvoices} due` : null,
      badgeColor: '#ef4444',
    },
    {
      label: 'CAD Title Block & Stamp',
      href: '/client/branding',
      icon: FileText,
      badge: null,
    },
    {
      label: 'My Profile & Security',
      href: '/client/profile',
      icon: User,
      badge: null,
    },
    {
      label: 'System Settings',
      href: '/client/settings',
      icon: SettingsIcon,
      badge: null,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: { xs: '100%', md: 280 },
        flexShrink: 0,
        borderRadius: 3,
        bgcolor: 'white',
        border: '1px solid #e2e8f0',
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignSelf: 'flex-start',
        position: { md: 'sticky' },
        top: { md: 88 },
      }}
    >
      {/* Practitioner Mini Badge */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2.5,
          bgcolor: '#f1f5f9',
          border: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Avatar
          src={currentUser.avatar}
          sx={{ width: 42, height: 42, bgcolor: '#034732', color: 'white', fontWeight: 800 }}
        >
          {currentUser.name ? currentUser.name.charAt(0) : 'U'}
        </Avatar>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, color: '#0f172a' }}>
            {currentUser.name || 'Licensed Surveyor'}
          </Typography>
          <Typography variant="caption" noWrap sx={{ color: '#64748b', display: 'block' }}>
            {currentUser.organization || 'Survey Afrika Ltd'}
          </Typography>
          <Chip
            size="small"
            label={currentUser.license_number || 'SRB/SURV/UG/041'}
            sx={{ mt: 0.5, height: 20, fontSize: '0.65rem', bgcolor: '#e2e8f0', fontWeight: 700 }}
          />
        </Box>
      </Box>

      {/* Navigation List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
        <Typography variant="overline" sx={{ px: 1, color: '#94a3b8', fontWeight: 800, letterSpacing: 1 }}>
          CLIENT NAVIGATION
        </Typography>

        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/client'
              ? pathname === '/client'
              : pathname.startsWith(item.href);

          return (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              startIcon={<Icon size={18} />}
              sx={{
                justifyContent: 'flex-start',
                px: 2,
                py: 1.2,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: isActive ? 800 : 600,
                fontSize: '0.88rem',
                bgcolor: isActive ? '#034732' : 'transparent',
                color: isActive ? 'white' : '#475569',
                '&:hover': {
                  bgcolor: isActive ? '#023324' : '#f8fafc',
                  color: isActive ? 'white' : '#0f172a',
                },
                position: 'relative',
              }}
            >
              <Box sx={{ flexGrow: 1, textAlign: 'left' }}>{item.label}</Box>
              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    bgcolor: isActive ? 'rgba(255,255,255,0.2)' : item.badgeColor || '#e2e8f0',
                    color: isActive ? 'white' : '#0f172a',
                  }}
                />
              )}
            </Button>
          );
        })}
      </Box>

      {/* Trust & Support Footer in Sidebar */}
      <Box sx={{ pt: 2, borderTop: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <ShieldCheck size={16} color="#16a34a" />
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#034732' }}>
            SRB & DeLIS Compliant
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block', lineHeight: 1.3 }}>
          Uganda Survey Act Cap 232 • 4-Hour Emergency SLA Turnaround
        </Typography>
      </Box>
    </Paper>
  );
};
