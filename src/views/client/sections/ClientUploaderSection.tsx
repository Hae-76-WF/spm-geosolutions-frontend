"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';
import { UploadCloud, Play, Pause, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ClientUploaderSection: React.FC = () => {
  const {
    activeUpload,
    startDirectS3Upload,
    pauseUpload,
    resumeUpload,
    cancelUpload,
    showSnackbar,
  } = useAppStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState('');
  const [surveyType, setSurveyType] = useState<any>('cadastral_slaac');
  const [targetCrs, setTargetCrs] = useState('EPSG:32636 (UTM Zone 36N)');

  const handleStartUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showSnackbar('Please select a survey file (LAS, RINEX, DXF, LandXML).', 'warning');
      return;
    }
    if (!projectName) {
      showSnackbar('Please enter a project or parcel title.', 'warning');
      return;
    }
    startDirectS3Upload(selectedFile, projectName, surveyType, targetCrs);
    setSelectedFile(null);
    setProjectName('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
          Direct S3 High-Speed Multipart Upload
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
          Upload raw GNSS observations, drone LiDAR LAS files, or total station DXF files directly into our encrypted cloud storage bucket.
        </Typography>

        {/* Active Upload Live Progress */}
        {activeUpload && activeUpload.isUploading && (
          <Box sx={{ p: 3, mb: 4, bgcolor: '#f0fdf4', borderRadius: 3, border: '2px solid #86efac' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a' }}>
                  Uploading: {activeUpload.fileName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Project: {activeUpload.projectName} • S3 Bucket: {activeUpload.s3Bucket}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                {activeUpload.isPaused ? (
                  <Button size="small" variant="contained" color="success" onClick={resumeUpload} startIcon={<Play size={14} />}>
                    Resume
                  </Button>
                ) : (
                  <Button size="small" variant="outlined" color="warning" onClick={pauseUpload} startIcon={<Pause size={14} />}>
                    Pause
                  </Button>
                )}
                <Button size="small" variant="outlined" color="error" onClick={cancelUpload} startIcon={<X size={14} />}>
                  Cancel
                </Button>
              </Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={activeUpload.progressPercent}
              sx={{ height: 12, borderRadius: 6, mb: 1, bgcolor: '#dcfce7', '& .MuiLinearProgress-bar': { bgcolor: '#16a34a' } }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#15803d' }}>
                {activeUpload.progressPercent}% Completed ({activeUpload.currentChunkIndex}/{activeUpload.chunks.length} chunks)
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Speed: {activeUpload.uploadSpeedMbps} Mbps • ETA: {activeUpload.etaSeconds}s
              </Typography>
            </Box>
          </Box>
        )}

        {/* Upload Form */}
        <form onSubmit={handleStartUpload}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Project / Parcel Title"
              fullWidth
              required
              placeholder="e.g. Mbarara Block 12 Cadastral Subdiv"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <TextField
              label="Survey Domain / File Type"
              select
              fullWidth
              value={surveyType}
              onChange={(e) => setSurveyType(e.target.value)}
            >
              <MenuItem value="cadastral_slaac">Cadastral Boundary Adjudication (SLAAC / Deed Plan)</MenuItem>
              <MenuItem value="lidar_survey">Drone LiDAR Point Cloud (.LAS / .LAZ)</MenuItem>
              <MenuItem value="photogrammetry">Aerial Photogrammetry UAV (.JPG / GeoTIFF)</MenuItem>
              <MenuItem value="gnss_topographic">Raw GNSS Observations (RINEX / Trimble .T02)</MenuItem>
            </TextField>

            <TextField
              label="Target Coordinate Reference System (CRS)"
              select
              fullWidth
              value={targetCrs}
              onChange={(e) => setTargetCrs(e.target.value)}
            >
              <MenuItem value="EPSG:32636 (UTM Zone 36N)">EPSG:32636 (UTM Zone 36N / WGS84 - Central/East Uganda)</MenuItem>
              <MenuItem value="EPSG:32635 (UTM Zone 35N)">EPSG:32635 (UTM Zone 35N / WGS84 - West Uganda)</MenuItem>
              <MenuItem value="EPSG:21096 (Arc 1960 / UTM 36N)">EPSG:21096 (Arc 1960 / UTM Zone 36N)</MenuItem>
              <MenuItem value="Clarke 1880 Cassini-Soldner">Clarke 1880 (Uganda Cassini-Soldner)</MenuItem>
            </TextField>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569' }}>
                SELECT LOCAL DATA FILE (LAS, RINEX, DXF, ZIP):
              </Typography>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                style={{
                  padding: '10px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  background: '#f8fafc',
                }}
              />
            </Box>

            <Box sx={{ gridColumn: { xs: '1', md: 'span 2' }, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<UploadCloud size={20} />}
                sx={{
                  py: 1.5,
                  px: 4,
                  bgcolor: '#034732',
                  '&:hover': { bgcolor: '#023324' },
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              >
                Initiate S3 Multipart Transfer & Dispatch Pipeline
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
