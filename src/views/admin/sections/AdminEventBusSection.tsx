"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { Send } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const AdminEventBusSection: React.FC = () => {
  const { integrationEvents, broadcastAdminEvent, showSnackbar } = useAppStore();

  const [broadcastType, setBroadcastType] = useState('SpatialDataIngested');
  const [broadcastModule, setBroadcastModule] = useState('DataProcessing');
  const [broadcastPayload, setBroadcastPayload] = useState(
    JSON.stringify({ job_id: 'job-spm-99', points: 12500000, crs: 'EPSG:32636' }, null, 2)
  );

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(broadcastPayload);
      await broadcastAdminEvent(broadcastType, broadcastModule, parsed);
    } catch (err: any) {
      showSnackbar('Invalid JSON payload in event broadcast form.', 'error');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1.3fr' }, gap: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          Publish Event to Redis Broker
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
          Simulate domain events across Laravel Horizon background worker queues.
        </Typography>

        <form onSubmit={handleBroadcast}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              label="Event Type"
              fullWidth
              value={broadcastType}
              onChange={(e) => setBroadcastType(e.target.value)}
              sx={{ input: { color: 'white' }, label: { color: '#94a3b8' } }}
            />
            <TextField
              label="Module / Domain"
              fullWidth
              value={broadcastModule}
              onChange={(e) => setBroadcastModule(e.target.value)}
              sx={{ input: { color: 'white' }, label: { color: '#94a3b8' } }}
            />
            <TextField
              label="JSON Payload"
              multiline
              rows={5}
              fullWidth
              value={broadcastPayload}
              onChange={(e) => setBroadcastPayload(e.target.value)}
              sx={{ textarea: { color: '#86efac', fontFamily: 'monospace' }, label: { color: '#94a3b8' } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              size="large"
              endIcon={<Send size={16} />}
              sx={{ fontWeight: 800 }}
            >
              Broadcast to Message Bus
            </Button>
          </Box>
        </form>
      </Paper>

      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          Live Event Bus Stream
        </Typography>
        <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
          Latest published domain integration events.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {integrationEvents.map((evt) => (
            <Box key={evt.id} sx={{ p: 2, bgcolor: '#0f172a', borderRadius: 2, border: '1px solid #334155' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Chip label={evt.event_type} size="small" sx={{ bgcolor: '#dc2626', color: 'white', fontWeight: 800 }} />
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>{evt.published_at}</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 700, display: 'block', mb: 1 }}>
                Module: {evt.module}
              </Typography>
              <Box sx={{ p: 1, bgcolor: '#020617', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.75rem', color: '#93c5fd' }}>
                {JSON.stringify(evt.payload, null, 2)}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
