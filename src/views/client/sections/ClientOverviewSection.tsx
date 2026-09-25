"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { Layers, CreditCard, UploadCloud } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ClientOverviewSection: React.FC = () => {
  const {
    jobs,
    jobsLoading,
    jobsError,
    fetchJobs,
    invoices,
    fetchInvoices,
    retainers,
    retainersLoading,
    retainersError,
    fetchRetainers,
  } = useAppStore();

  useEffect(() => {
    fetchJobs();
    fetchInvoices();
    fetchRetainers();
  }, [fetchJobs, fetchInvoices, fetchRetainers]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {/* Retainer Card */}
      {retainersLoading ? (
        <CircularProgress sx={{ color: '#034732' }} />
      ) : retainersError ? (
        <Alert severity="error">{retainersError}</Alert>
      ) : retainers.length > 0 ? (
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: 'white',
            border: '1px solid #e2e8f0',
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.92)), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Chip label="ACTIVE PREMIUM RETAINER" sx={{ bgcolor: '#034732', color: 'white', fontWeight: 800, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
                {retainers[0].tier}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                SLA: 4-Hour Emergency Turnaround • Renewal Date: {retainers[0].billing_cycle_end}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" sx={{ color: '#64748b' }}>Monthly Retainer Cost</Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#034732' }}>
                UGX {retainers[0].monthly_fee_ugx.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ my: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Allocated Hours Used</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {retainers[0].plots_used_this_month} / {retainers[0].monthly_plot_quota} Hours ({Math.round((retainers[0].plots_used_this_month / retainers[0].monthly_plot_quota) * 100)}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(retainers[0].plots_used_this_month / retainers[0].monthly_plot_quota) * 100}
              sx={{ height: 10, borderRadius: 5, bgcolor: '#e2e8f0', '& .MuiLinearProgress-bar': { bgcolor: '#034732' } }}
            />
          </Box>
        </Paper>
      ) : null}

      {/* Quick Metrics */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3 }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>ACTIVE JOBS</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', my: 1 }}>
            {jobs.filter((j) => j.status === 'processing' || j.status === 'queued').length}
          </Typography>
          <Typography variant="body2" sx={{ color: '#16a34a', fontWeight: 600 }}>
            In pipeline queue
          </Typography>
        </Paper>

        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>COMPLETED DELIVERABLES</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', my: 1 }}>
            {jobs.filter((j) => j.status === 'completed').length}
          </Typography>
          <Typography variant="body2" sx={{ color: '#0369a1', fontWeight: 600 }}>
            Ready for secure download
          </Typography>
        </Paper>

        <Paper elevation={1} sx={{ p: 3, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>PENDING INVOICES</Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', my: 1 }}>
            {invoices.filter((i) => i.status === 'Pending').length}
          </Typography>
          <Button
            size="small"
            component={Link}
            href="/client/make-payment"
            sx={{ textTransform: 'none', fontWeight: 700, color: '#034732', p: 0 }}
          >
            Pay via Mobile Money →
          </Button>
        </Paper>
      </Box>

      {/* Recent Jobs Table */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Recent Geodetic Processing Jobs
          </Typography>
          <Button
            component={Link}
            href="/client/uploader"
            variant="contained"
            size="small"
            startIcon={<UploadCloud size={16} />}
            sx={{ bgcolor: '#034732', '&:hover': { bgcolor: '#023324' }, fontWeight: 700 }}
          >
            New S3 Upload
          </Button>
        </Box>

        {jobsLoading ? (
          <CircularProgress sx={{ color: '#034732', my: 2 }} />
        ) : jobsError ? (
          <Alert severity="error">{jobsError}</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Job ID & Project</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Survey Domain</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Target CRS</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>QA Score</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        {job.project_name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {job.id} • {job.uploaded_at}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={job.survey_type} size="small" sx={{ textTransform: 'capitalize' }} />
                    </TableCell>
                    <TableCell>{job.target_crs}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.status.toUpperCase()}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          bgcolor: job.status === 'completed' ? '#dcfce7' : job.status === 'failed' ? '#fee2e2' : '#fef3c7',
                          color: job.status === 'completed' ? '#15803d' : job.status === 'failed' ? '#b91c1c' : '#b45309',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#16a34a' }}>
                        {job.qa_score ? `${job.qa_score}%` : 'Pending'}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        href="/client/pipeline"
                        sx={{ textTransform: 'none', fontWeight: 700 }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};
