"use client";

import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import PublicIcon from '@mui/icons-material/Public';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: '100vh',
          width: '100vw',
        background: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

        {/* Brand Header */}
        <Box sx={{ textAlign: 'center', pt: 9, pb: 3 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'white',
              '&:hover': { opacity: 0.9 },
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '10px',
                bgcolor: '#034732',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(3, 71, 50, 0.5)',
              }}
            >
              <PublicIcon sx={{ color: '#ffffff', fontSize: 26 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.5, color: '#044530' }}>
              SPM <Box component="span" sx={{ color: '#10b981' }}>GEOSOLUTIONS</Box>
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ display: 'block', color: '#94a3b8', mt: 0.5, letterSpacing: 1, textTransform: 'uppercase' }}>
            Geospatial SLAAC & Land Surveying Enterprise
          </Typography>
        </Box>

        {/* Main Auth Content Container */}
        {children}

        {/* Footer info */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} SPM Geosolutions (U) Ltd. All rights reserved.{' '}
            <MuiLink component={Link} href="/" sx={{ color: '#10b981', textDecoration: 'none' }}>
              Return to Website
            </MuiLink>
          </Typography>
        </Box>
    </Box>
  );
}
