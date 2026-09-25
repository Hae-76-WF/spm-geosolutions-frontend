"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Download, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ClientPipelineSection: React.FC = () => {
  const {
    jobs,
    jobsLoading,
    jobsError,
    fetchJobs,
    recordDownload,
  } = useAppStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {jobsLoading ? (
        <CircularProgress sx={{ color: '#034732' }} />
      ) : jobsError ? (
        <Alert severity="error">{jobsError}</Alert>
      ) : (
        jobs.map((job) => (
          <Paper key={job.id} elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a' }}>
                    {job.project_name}
                  </Typography>
                  <Chip
                    label={job.status.toUpperCase()}
                    sx={{
                      fontWeight: 800,
                      bgcolor: job.status === 'completed' ? '#dcfce7' : '#fef3c7',
                      color: job.status === 'completed' ? '#15803d' : '#b45309',
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Job ID: {job.id} • Target CRS: <strong>{job.target_crs}</strong> • Analyst: {job.analyst_assigned || 'Eng. Dennis Mukasa'}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ color: '#64748b' }}>SRB QA Score</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#16a34a' }}>
                  {job.qa_score || 99.2}%
                </Typography>
              </Box>
            </Box>

            {/* QA Checklist */}
            <Box sx={{ p: 2.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0', mb: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#475569', display: 'block', mb: 1.5 }}>
                GEODETIC RIGOR & QA CHECKS:
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {job.qa_checks.map((check, cidx) => (
                  <Box key={cidx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircle2 size={18} color="#16a34a" style={{ marginTop: 2, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        {check.check_name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {check.notes}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Deliverables Download List */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#034732', mb: 2 }}>
              CRYPTOGRAPHIC DELIVERABLES:
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              {job.deliverables.map((del) => (
                <Box
                  key={del.id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid #cbd5e1',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: '#ffffff',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                      {del.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      Format: {del.format} • Size: {del.size_mb} MB
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Download size={14} />}
                    onClick={() => recordDownload(del.id, del.name, del.format, del.size_mb)}
                    sx={{ bgcolor: '#034732', '&:hover': { bgcolor: '#023324' }, fontWeight: 700 }}
                  >
                    Download
                  </Button>
                </Box>
              ))}
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
};
