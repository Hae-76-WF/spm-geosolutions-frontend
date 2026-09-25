"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { FileText, Building, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ClientBrandingSection: React.FC = () => {
  const { brandingConfig, updateBrandingConfig } = useAppStore();
  const [brandForm, setBrandForm] = useState(brandingConfig);

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandingConfig(brandForm);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
          CAD Title Block & Practice Stamp Configuration
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
          White-label delivered AutoCAD DWG title blocks and PDF Deed Plans with your registered firm stamp.
        </Typography>

        <form onSubmit={handleSaveBranding}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Registered Survey Firm Name"
              fullWidth
              value={brandForm.firm_name}
              onChange={(e) => setBrandForm({ ...brandForm, firm_name: e.target.value })}
            />

            <TextField
              label="Survey Registration Board (SRB) License No."
              fullWidth
              value={brandForm.registration_no}
              onChange={(e) => setBrandForm({ ...brandForm, registration_no: e.target.value })}
            />

            <TextField
              label="Lead Registered Land Surveyor"
              fullWidth
              value={brandForm.registered_surveyor}
              onChange={(e) => setBrandForm({ ...brandForm, registered_surveyor: e.target.value })}
            />

            <TextField
              label="Default Output Sheet Size"
              select
              fullWidth
              value={brandForm.paper_size}
              onChange={(e) => setBrandForm({ ...brandForm, paper_size: e.target.value as any })}
            >
              <MenuItem value="A0">A0 Standard Plot (841 x 1189 mm)</MenuItem>
              <MenuItem value="A1">A1 Standard Plot (594 x 841 mm)</MenuItem>
              <MenuItem value="A2">A2 Cadastral Sheet (420 x 594 mm)</MenuItem>
              <MenuItem value="A3">A3 Executive Deed Plan (297 x 420 mm)</MenuItem>
              <MenuItem value="A4">A4 Certificate Boundary (210 x 297 mm)</MenuItem>
            </TextField>

            <TextField
              label="Practice Stamp Legal Wording"
              fullWidth
              multiline
              rows={2}
              sx={{ gridColumn: { xs: '1', md: 'span 2' } }}
              value={brandForm.surveyor_stamp_text}
              onChange={(e) => setBrandForm({ ...brandForm, surveyor_stamp_text: e.target.value })}
            />

            <TextField
              label="Statutory Legal Disclaimer / Survey Act Note"
              fullWidth
              multiline
              rows={2}
              sx={{ gridColumn: { xs: '1', md: 'span 2' } }}
              value={brandForm.disclaimer}
              onChange={(e) => setBrandForm({ ...brandForm, disclaimer: e.target.value })}
            />

            <Box sx={{ gridColumn: { xs: '1', md: 'span 2' }, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<FileText size={18} />}
                sx={{
                  py: 1.5,
                  px: 4,
                  bgcolor: '#034732',
                  '&:hover': { bgcolor: '#023324' },
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                Save Title Block Settings & Update Template
              </Button>
            </Box>
          </Box>
        </form>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Live Cadastral Title Block Preview (Uganda Survey Act Cap 232)
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: '#f8fafc',
            border: '2px solid #034732',
            borderRadius: 2,
            fontFamily: 'sans-serif',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #034732', pb: 2, mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: '#034732' }}>
                {brandForm.firm_name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#475569', fontWeight: 700 }}>
                PRACTICING LICENSE: {brandForm.registration_no}
              </Typography>
            </Box>
            <Chip label={brandForm.paper_size} color="primary" sx={{ fontWeight: 800 }} />
          </Box>

          <Box sx={{ p: 2, bgcolor: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: 1, mb: 2, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#034732', display: 'block', mb: 0.5 }}>
              OFFICIAL SURVEYOR STAMP:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
              "{brandForm.surveyor_stamp_text}"
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Signed by: {brandForm.registered_surveyor}
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ color: '#64748b', fontStyle: 'italic', display: 'block' }}>
            {brandForm.disclaimer}
          </Typography>
        </Paper>
      </Paper>
    </Box>
  );
};
