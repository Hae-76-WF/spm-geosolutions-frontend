"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Server,
  Users,
  GraduationCap,
  Package,
  Receipt,
  Radio,
  FileCheck,
  ShieldAlert,
  Activity,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { adminMetrics } = useAppStore();

  const activeNodesCount = adminMetrics?.metrics?.geodetic_nodes_active || 6;

  const navLinks = [
    {
      label: 'Cluster Telemetry',
      href: '/admin',
      icon: Server,
      badge: `${activeNodesCount} Nodes`,
      badgeColor: '#38bdf8',
    },
    {
      label: 'RBAC Users',
      href: '/admin/users',
      icon: Users,
      badge: null,
    },
    {
      label: 'Academy Courses',
      href: '/admin/courses',
      icon: GraduationCap,
      badge: null,
    },
    {
      label: 'Geomatics Store',
      href: '/admin/products',
      icon: Package,
      badge: null,
    },
    {
      label: 'Invoices & Billing',
      href: '/admin/invoices',
      icon: Receipt,
      badge: null,
    },
    {
      label: 'Redis Event Bus',
      href: '/admin/event-bus',
      icon: Radio,
      badge: 'Live',
      badgeColor: '#ef4444',
    },
    {
      label: 'SHA-256 Audit Trail',
      href: '/admin/audit-trail',
      icon: FileCheck,
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
        bgcolor: '#1e293b',
        border: '1px solid #334155',
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignSelf: 'flex-start',
        position: { md: 'sticky' },
        top: { md: 24 },
        color: 'white',
      }}
    >
      {/* Admin Persona Header Badge */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2.5,
          bgcolor: '#0f172a',
          border: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box sx={{ p: 1, bgcolor: '#dc2626', borderRadius: 2 }}>
          <ShieldAlert size={22} color="white" />
        </Box>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="subtitle2" noWrap sx={{ fontWeight: 800, color: 'white' }}>
            ADMINISTRATION
          </Typography>
          <Typography variant="caption" noWrap sx={{ color: '#94a3b8', display: 'block' }}>
            Superuser Cluster Control
          </Typography>
          <Chip
            size="small"
            label="SRB CLUSTER v3.4"
            sx={{ mt: 0.5, height: 20, fontSize: '0.65rem', bgcolor: '#334155', color: '#cbd5e1', fontWeight: 700 }}
          />
        </Box>
      </Box>

      {/* Navigation List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
        <Typography variant="overline" sx={{ px: 1, color: '#64748b', fontWeight: 800, letterSpacing: 1 }}>
          ADMIN NAVIGATION
        </Typography>

        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
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
                bgcolor: isActive ? '#dc2626' : 'transparent',
                color: 'white',
                '&:hover': {
                  bgcolor: isActive ? '#b91c1c' : '#334155',
                  color: 'white',
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
                    bgcolor: isActive ? 'rgba(255,255,255,0.2)' : item.badgeColor || '#334155',
                    color: 'white',
                  }}
                />
              )}
            </Button>
          );
        })}
      </Box>

      {/* System Status Footer in Sidebar */}
      <Box sx={{ pt: 2, borderTop: '1px solid #334155' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Activity size={16} color="#4ade80" />
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#4ade80' }}>
            Cluster Status: Healthy
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block', lineHeight: 1.3 }}>
          PostGIS 16 Spatial Engine • Redis PubSub Broker Online
        </Typography>
      </Box>
    </Paper>
  );
};
