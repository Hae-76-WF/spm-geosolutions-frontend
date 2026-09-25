"use client";

import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import PublicIcon from '@mui/icons-material/Public';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #034732 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        {/* Brand Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
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
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.5, color: '#ffffff' }}>
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
      </Container>
    </Box>
  );
}
