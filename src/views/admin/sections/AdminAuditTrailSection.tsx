"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppStore } from '@/store/useAppStore';

export const AdminAuditTrailSection: React.FC = () => {
  const { auditLogs, fetchAuditLogs } = useAppStore();

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          Cryptographic Deliverable Download Audit Trail
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 4 }}>
          Immutable access ledger recording timestamp, user identity, IP address, and SHA-256 checksums.
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#0f172a' }}>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Timestamp (EAT)</TableCell>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Practitioner</TableCell>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>File Name & Format</TableCell>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>IP Address</TableCell>
                <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>SHA-256 Fingerprint</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell sx={{ color: '#cbd5e1', fontSize: '0.8rem' }}>{log.timestamp}</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 700 }}>
                    {log.user_name}<br />
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>{log.user_email}</Typography>
                  </TableCell>
                  <TableCell sx={{ color: '#38bdf8', fontWeight: 700 }}>
                    {log.file_name} ({log.format})
                  </TableCell>
                  <TableCell sx={{ color: '#cbd5e1', fontSize: '0.8rem' }}>{log.ip_address}</TableCell>
                  <TableCell sx={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {log.sha256_checksum}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
