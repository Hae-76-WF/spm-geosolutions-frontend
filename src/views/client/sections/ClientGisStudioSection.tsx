"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { spmApi } from '@/services/api';

export const ClientGisStudioSection: React.FC = () => {
  const [parcels, setParcels] = useState<any[]>([]);
  const [parcelsLoading, setParcelsLoading] = useState(false);
  const [parcelsError, setParcelsError] = useState<string | null>(null);
  const [searchParcelQuery, setSearchParcelQuery] = useState('');

  const loadParcels = async () => {
    setParcelsLoading(true);
    setParcelsError(null);
    try {
      const res = await spmApi.getParcels(searchParcelQuery);
      setParcels(res.data || []);
    } catch (err: any) {
      setParcelsError(err.response?.data?.message || err.message || 'Failed to load PostGIS parcel layers.');
    } finally {
      setParcelsLoading(false);
    }
  };

  useEffect(() => {
    loadParcels();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
              PostGIS Spatial Database Explorer
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Queried directly from PostgreSQL 16 / PostGIS 3.4 spatial indices.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search parcel code or owner..."
              value={searchParcelQuery}
              onChange={(e) => setSearchParcelQuery(e.target.value)}
            />
            <Button variant="contained" onClick={loadParcels} sx={{ bgcolor: '#034732' }}>
              Filter
            </Button>
          </Box>
        </Box>

        {parcelsLoading ? (
          <CircularProgress sx={{ color: '#034732', my: 3 }} />
        ) : parcelsError ? (
          <Alert severity="error">{parcelsError}</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Parcel ID / Deed Code</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Owner / Tenure</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>District & Zone</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Acreage (Acres)</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Coordinates (E/N)</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'right' }}>DeLIS Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parcels.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0f172a' }}>
                        {p.parcel_code}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        Block {p.block_number}, Plot {p.plot_number}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{p.owner_name}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>{p.tenure_type}</Typography>
                    </TableCell>
                    <TableCell>{p.district} (UTM 36N)</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{p.area_acres} ac</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      E: {p.centroid_easting?.toLocaleString()}<br />
                      N: {p.centroid_northing?.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Chip label="NLIS VERIFIED" size="small" color="success" sx={{ fontWeight: 700 }} />
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
