"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Plus, Edit2, Trash2, GraduationCap, RefreshCw } from 'lucide-react';
import { spmApi } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';

export const AdminCoursesSection: React.FC = () => {
  const { showSnackbar } = useAppStore();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: '',
    track: 'GIS Consultancy',
    description: '',
    instructor: '',
    fee_ugx: 750000,
    duration_weeks: 4,
  });

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await spmApi.getAdminCourses();
      setCourses(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch academy courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingCourseId(null);
    setFormData({
      title: '',
      track: 'GIS Consultancy',
      description: '',
      instructor: 'Eng. Dennis Mukasa',
      fee_ugx: 750000,
      duration_weeks: 4,
    });
    setOpenModal(true);
  };

  const handleOpenEditModal = (course: any) => {
    setEditingCourseId(course.id);
    setFormData({
      title: course.title || '',
      track: course.track || 'GIS Consultancy',
      description: course.description || '',
      instructor: course.instructor || '',
      fee_ugx: course.fee_ugx || 750000,
      duration_weeks: course.duration_weeks || 4,
    });
    setOpenModal(true);
  };

  const handleDeleteCourse = async (courseId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete course "${title}"?`)) return;

    try {
      await spmApi.deleteAdminCourse(courseId);
      showSnackbar(`Course '${title}' deleted successfully`, 'warning');
      setCourses(courses.filter((c) => c.id !== courseId));
    } catch (err: any) {
      showSnackbar('Failed to delete course', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCourseId) {
        await spmApi.updateAdminCourse(editingCourseId, formData);
        showSnackbar(`Course updated successfully!`, 'success');
      } else {
        await spmApi.createAdminCourse(formData);
        showSnackbar(`New course created successfully!`, 'success');
      }
      setOpenModal(false);
      await loadCourses();
    } catch (err: any) {
      showSnackbar(err.message || 'Failed to save course.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: '#1e293b', border: '1px solid #334155', color: 'white' }}>
        
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              SPM Academy Course Management
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Create, update, or remove accredited geomatics masterclasses and professional training curricula.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={loadCourses}
              startIcon={<RefreshCw size={16} />}
              sx={{ color: '#cbd5e1', borderColor: '#475569', '&:hover': { borderColor: 'white' } }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleOpenCreateModal}
              startIcon={<Plus size={16} />}
              sx={{ fontWeight: 800, px: 2.5 }}
            >
              Create Course
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#dc2626' }} />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#0f172a' }}>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Course Title & Track</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Instructor</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Duration</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Fee (UGX)</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', color: '#94a3b8', py: 4 }}>
                      No course curricula recorded yet. Click "Create Course" to add one.
                    </TableCell>
                  </TableRow>
                ) : (
                  courses.map((course) => (
                    <TableRow key={course.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                      <TableCell sx={{ color: 'white', fontWeight: 700, maxWidth: 320 }}>
                        {course.title}
                        <Box sx={{ mt: 0.5 }}>
                          <Chip label={course.track || 'GIS'} size="small" sx={{ bgcolor: '#334155', color: '#38bdf8', fontWeight: 700, fontSize: '0.68rem' }} />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#cbd5e1' }}>{course.instructor || 'SPM Faculty'}</TableCell>
                      <TableCell sx={{ color: '#cbd5e1' }}>{course.duration_weeks} Weeks</TableCell>
                      <TableCell sx={{ color: '#4ade80', fontWeight: 800 }}>
                        UGX {Number(course.fee_ugx).toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenEditModal(course)}
                            title="Edit Course"
                            sx={{ color: '#38bdf8' }}
                          >
                            <Edit2 size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteCourse(course.id, course.title)}
                            title="Delete Course"
                            sx={{ color: '#ef4444' }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Create / Edit Course Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ bgcolor: '#0f172a', color: 'white', fontWeight: 800 }}>
            {editingCourseId ? 'Edit Academy Course' : 'Create New SPM Academy Course'}
          </DialogTitle>
          <DialogContent sx={{ bgcolor: '#1e293b', color: 'white', pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              <TextField
                label="Course Title"
                fullWidth
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                select
                label="Specialist Track"
                fullWidth
                value={formData.track}
                onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              >
                <MenuItem value="GIS Consultancy">GIS Consultancy</MenuItem>
                <MenuItem value="Hands-on Surveying">Hands-on Surveying</MenuItem>
                <MenuItem value="Emerging Technologies">Emerging Technologies</MenuItem>
              </TextField>
              <TextField
                label="Lead Instructor"
                fullWidth
                required
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                label="Tuition Fee (UGX)"
                type="number"
                fullWidth
                required
                value={formData.fee_ugx}
                onChange={(e) => setFormData({ ...formData, fee_ugx: Number(e.target.value) })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                label="Duration (Weeks)"
                type="number"
                fullWidth
                required
                value={formData.duration_weeks}
                onChange={(e) => setFormData({ ...formData, duration_weeks: Number(e.target.value) })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                label="Curriculum Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ bgcolor: '#0f172a', px: 3, py: 2 }}>
            <Button onClick={() => setOpenModal(false)} sx={{ color: '#cbd5e1' }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="error" disabled={saving} sx={{ fontWeight: 800 }}>
              {saving ? 'Saving...' : editingCourseId ? 'Update Course' : 'Publish Course'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
