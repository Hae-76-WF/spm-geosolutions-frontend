"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { ArrowUpRight, Globe2, Mail, MapPin, ShieldCheck } from 'lucide-react';

const colors = {
  green: '#034732',
  blue: '#276EB9',
  cream: '#F8F5B5',
  orange: '#E88821',
  white: '#FFFFFF',
  softText: '#D9EAE3',
  mutedText: '#B9D0C6',
};

const footerLinkSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.6,
  width: 'fit-content',
  color: colors.softText,
  textDecoration: 'none',
  fontSize: '0.875rem',
  lineHeight: 1.5,
  transition: 'color 160ms ease, transform 160ms ease',
  '&:hover': {
    color: colors.cream,
    transform: 'translateX(2px)',
  },
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Box component={Link} href={href} sx={footerLinkSx}>
    {children}
    <ArrowUpRight size={13} strokeWidth={2.4} />
  </Box>
);

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: colors.green,
        color: colors.white,
        pt: { xs: 7, md: 9 },
        pb: 4,
        borderTop: `4px solid ${colors.orange}`,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 360,
          height: 360,
          borderRadius: '50%',
          right: -180,
          top: -190,
          background: `radial-gradient(circle, rgba(39, 110, 185, 0.28) 0%, rgba(39, 110, 185, 0) 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1.4fr 1fr 1fr', lg: '1.55fr 1fr 1fr 1.15fr' },
            gap: { xs: 5, md: 6 },
            mb: 7,
          }}
        >
          {/* Brand */}
          <Box>
            <Box component={Link} href="/" sx={{ display: 'inline-flex', mb: 2.5 }}>
              <Box
                component="img"
                src="/logo.png"
                alt="SPM Geosolutions logo"
                sx={{ height: { xs: 48, md: 56 }, width: 'auto', objectFit: 'contain' }}
              />
            </Box>

            <Typography sx={{ color: colors.softText, maxWidth: 380, lineHeight: 1.75, mb: 3 }}>
              SPM Geosolutions is a Uganda-based geospatial services firm supporting survey and engineering teams with technical data processing, spatial intelligence, and practical workforce development.
            </Typography>

            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.1,
                px: 1.5,
                py: 1,
                borderRadius: 1.5,
                bgcolor: 'rgba(248, 245, 181, 0.1)',
                border: '1px solid rgba(248, 245, 181, 0.22)',
              }}
            >
              <ShieldCheck size={18} color={colors.cream} />
              <Typography variant="caption" sx={{ color: colors.cream, fontWeight: 800 }}>
                Accurate data. Practical systems. Confident delivery.
              </Typography>
            </Box>
          </Box>

          {/* Services */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: colors.cream, fontWeight: 900, letterSpacing: 1.1, mb: 2.3 }}>
              SERVICES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              <FooterLink href="/services">Survey data processing</FooterLink>
              <FooterLink href="/services">Spatial databases and information systems</FooterLink>
              <FooterLink href="/services">Web GIS and dashboards</FooterLink>
              <FooterLink href="/services">Mobile field data systems</FooterLink>
              <FooterLink href="/services">Spatial analysis and mapping</FooterLink>
              <FooterLink href="/services">Technical training</FooterLink>
            </Box>
          </Box>

          {/* Explore */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: colors.cream, fontWeight: 900, letterSpacing: 1.1, mb: 2.3 }}>
              EXPLORE SPM
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              <FooterLink href="/about">About SPM</FooterLink>
              <FooterLink href="/academy">SPM Academy</FooterLink>
              <FooterLink href="/pricing">Project and retainer options</FooterLink>
              <FooterLink href="/quote-calculator">Request a project scope</FooterLink>
              <FooterLink href="/login">Client portal</FooterLink>
              <FooterLink href="/contact">Contact our team</FooterLink>
            </Box>
          </Box>

          {/* Contact direction */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: colors.cream, fontWeight: 900, letterSpacing: 1.1, mb: 2.3 }}>
              CONNECT WITH SPM
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
              <Box sx={{ display: 'flex', gap: 1.3, alignItems: 'flex-start' }}>
                <MapPin size={19} color={colors.orange} style={{ marginTop: 3, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: colors.softText, lineHeight: 1.6 }}>
                  Uganda headquarters with national, regional, and cross-border project engagements.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.3, alignItems: 'flex-start' }}>
                <Globe2 size={19} color={colors.blue} style={{ marginTop: 3, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: colors.softText, lineHeight: 1.6 }}>
                  Supporting survey firms, infrastructure teams, institutions, utilities, NGOs, and professionals.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.3, alignItems: 'flex-start' }}>
                <Mail size={19} color={colors.cream} style={{ marginTop: 3, flexShrink: 0 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: colors.softText, lineHeight: 1.6, mb: 0.6 }}>
                    Have a project, dataset, or training need?
                  </Typography>
                  <FooterLink href="/contact">Send an enquiry</FooterLink>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(248, 245, 181, 0.2)', mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: colors.mutedText }}>
            © {new Date().getFullYear()} SPM Geosolutions (U) Limited. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: colors.mutedText, textAlign: { xs: 'left', sm: 'right' } }}>
            From field data to decisions that move Africa forward.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
