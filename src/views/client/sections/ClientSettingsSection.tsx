"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import { Settings as SettingsIcon } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ClientSettingsSection: React.FC = () => {
  const {
    userSettings,
    fetchUserSettings,
    updateUserSettings,
  } = useAppStore();

  const [settingsForm, setSettingsForm] = useState(userSettings);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    fetchUserSettings();
  }, [fetchUserSettings]);

  useEffect(() => {
    setSettingsForm(userSettings);
  }, [userSettings]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await updateUserSettings(settingsForm);
    } finally {
      setIsSavingSettings(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
          System Preferences & GIS Workstation Settings
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
          Configure default coordinate systems, automated deed plan downloads, and SMS alert preferences.
        </Typography>

        <form onSubmit={handleSaveSettings}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#034732' }}>
              NOTIFICATION PREFERENCES
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={settingsForm.email_notifications}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email_notifications: e.target.checked })}
                  color="success"
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Email Notifications for Deliverables
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Receive automated notifications when survey processing jobs finish QA review.
                  </Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settingsForm.sms_notifications}
                  onChange={(e) => setSettingsForm({ ...settingsForm, sms_notifications: e.target.checked })}
                  color="success"
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    SMS Alerts & Retainer Usage Alerts
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Get SMS notifications when retainer plot quotas reach 80% capacity.
                  </Typography>
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={settingsForm.auto_download_deed_plans}
                  onChange={(e) => setSettingsForm({ ...settingsForm, auto_download_deed_plans: e.target.checked })}
                  color="success"
                />
              }
              label={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Automated Deed Plan Auto-Download
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Automatically queue DXF and PDF title blocks for browser download upon completion.
                  </Typography>
                </Box>
              }
            />

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#034732' }}>
              GEODETIC & CRS DEFAULTS
            </Typography>

            <TextField
              label="Default Target Coordinate Reference System (CRS)"
              select
              fullWidth
              value={settingsForm.default_crs || 'EPSG:32636 (UTM Zone 36N / WGS84)'}
              onChange={(e) => setSettingsForm({ ...settingsForm, default_crs: e.target.value })}
            >
              <MenuItem value="EPSG:32636 (UTM Zone 36N / WGS84)">EPSG:32636 (UTM Zone 36N / WGS84 - Central/East Uganda)</MenuItem>
              <MenuItem value="EPSG:32635 (UTM Zone 35N / WGS84)">EPSG:32635 (UTM Zone 35N / WGS84 - West Uganda)</MenuItem>
              <MenuItem value="EPSG:21096 (Arc 1960 / UTM Zone 36N)">EPSG:21096 (Arc 1960 / UTM Zone 36N)</MenuItem>
              <MenuItem value="Clarke 1880 (Uganda Cassini-Soldner)">Clarke 1880 (Uganda Cassini-Soldner)</MenuItem>
            </TextField>

            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSavingSettings}
                startIcon={isSavingSettings ? <CircularProgress size={16} color="inherit" /> : <SettingsIcon size={18} />}
                sx={{ bgcolor: '#034732', '&:hover': { bgcolor: '#023324' }, fontWeight: 700, py: 1.2, px: 3 }}
              >
                {isSavingSettings ? 'Saving Settings...' : 'Save Workspace Settings'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
