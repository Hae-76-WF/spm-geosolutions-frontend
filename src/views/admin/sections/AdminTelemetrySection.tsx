"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppStore } from '@/store/useAppStore';

export const AdminTelemetrySection: React.FC = () => {
  const {
    adminMetrics,
    adminMetricsLoading,
    adminMetricsError,
    fetchAdminMetrics,
  } = useAppStore();

  useEffect(() => {
    fetchAdminMetrics();
  }, [fetchAdminMetrics]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {adminMetricsLoading ? (
        <CircularProgress sx={{ color: '#dc2626' }} />
      ) : adminMetricsError ? (
        <Alert severity="error">{adminMetricsError}</Alert>
      ) : adminMetrics ? (
        <>
          {/* Stats Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' }, gap: 3 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>MONTHLY REVENUE (UGX)</Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#4ade80', my: 1 }}>
                UGX {Number(adminMetrics.metrics.monthly_revenue_ugx).toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>Reconciled telecom B2B ledger</Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>MANAGED POSTGIS PARCELS</Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'white', my: 1 }}>
                {adminMetrics.metrics.postgis_parcels_managed.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>Indexed in EPSG:32636</Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>ACTIVE GEODETIC NODES</Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#38bdf8', my: 1 }}>
                {adminMetrics.metrics.geodetic_nodes_active}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>GDAL/PDAL Worker cluster</Typography>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>AVERAGE QA SCORE</Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#facc15', my: 1 }}>
                {adminMetrics.metrics.avg_qa_score}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>SRB standard compliance</Typography>
            </Paper>
          </Box>

          {/* Worker Cluster Nodes */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>
              Active Geospatial Processing Nodes & Daemons
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#0f172a' }}>
                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Node Name</TableCell>
                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Private IP</TableCell>
                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Role / Engine</TableCell>
                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>CPU Load</TableCell>
                    <TableCell sx={{ color: '#94a3b8', fontWeight: 700, textAlign: 'right' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(adminMetrics.cluster_nodes || []).map((node: any, nidx: number) => (
                    <TableRow key={nidx}>
                      <TableCell sx={{ color: 'white', fontWeight: 700 }}>{node.name}</TableCell>
                      <TableCell sx={{ color: '#94a3b8', fontFamily: 'monospace' }}>{node.host}</TableCell>
                      <TableCell sx={{ color: '#cbd5e1' }}>{node.role}</TableCell>
                      <TableCell sx={{ color: '#38bdf8', fontWeight: 700 }}>{node.load}</TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Chip label={node.status} size="small" color="success" sx={{ fontWeight: 800 }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      ) : null}
    </Box>
  );
};
