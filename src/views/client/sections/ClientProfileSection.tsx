"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { User, KeyRound, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ClientProfileSection: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    changeUserPassword,
  } = useAppStore();

  const [profileName, setProfileName] = useState(currentUser.name || '');
  const [profileEmail, setProfileEmail] = useState(currentUser.email || '');
  const [profilePhone, setProfilePhone] = useState(currentUser.phone || '');
  const [profileOrg, setProfileOrg] = useState(currentUser.organization || '');
  const [profileLicense, setProfileLicense] = useState(currentUser.license_number || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser.id) {
      setProfileName(currentUser.name || '');
      setProfileEmail(currentUser.email || '');
      setProfilePhone(currentUser.phone || '');
      setProfileOrg(currentUser.organization || '');
      setProfileLicense(currentUser.license_number || '');
    }
  }, [currentUser]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await updateUserProfile({
        name: profileName,
        email: profileEmail,
        phone: profilePhone,
        organization: profileOrg,
        license_number: profileLicense,
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setIsChangingPassword(true);
    try {
      const success = await changeUserPassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });
      if (success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: 'white', border: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
          <Avatar
            src={currentUser.avatar}
            sx={{ width: 64, height: 64, bgcolor: '#034732', color: 'white', fontWeight: 800, fontSize: '1.5rem' }}
          >
            {currentUser.name ? currentUser.name.charAt(0) : 'U'}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
              {currentUser.name || 'Practitioner Profile'}
            </Typography>

            <Typography variant="body2" sx={{ color: '#64748b' }}>
              {currentUser.email} • {currentUser.organization || 'Survey Afrika Ltd'}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Practitioner Account Details
        </Typography>

        <form onSubmit={handleSaveProfile}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Full Name"
              fullWidth
              required
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />

            <TextField
              label="Email Address"
              fullWidth
              required
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
            />

            <TextField
              label="Phone / Mobile Money Contact"
              fullWidth
              value={profilePhone}
              onChange={(e) => setProfilePhone(e.target.value)}
            />

            <TextField
              label="Survey Firm / Organization"
              fullWidth
              value={profileOrg}
              onChange={(e) => setProfileOrg(e.target.value)}
            />

            <TextField
              label="SRB Survey License Number"
              fullWidth
              value={profileLicense}
              onChange={(e) => setProfileLicense(e.target.value)}
            />

            <Box sx={{ gridColumn: { xs: '1', md: 'span 2' }, mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSavingProfile}
                startIcon={isSavingProfile ? <CircularProgress size={16} color="inherit" /> : <User size={18} />}
                sx={{ bgcolor: '#034732', '&:hover': { bgcolor: '#023324' }, fontWeight: 700, py: 1.2, px: 3 }}
              >
                {isSavingProfile ? 'Saving Profile...' : 'Save Profile Changes'}
              </Button>
            </Box>
          </Box>
        </form>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Security & Password Management
        </Typography>

        {passwordError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {passwordError}
          </Alert>
        )}

        <form onSubmit={handleChangePassword}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <Box sx={{ display: { xs: 'none', md: 'block' } }} />

            <TextField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Box sx={{ gridColumn: { xs: '1', md: 'span 2' }, mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                color="warning"
                disabled={isChangingPassword}
                startIcon={isChangingPassword ? <CircularProgress size={16} color="inherit" /> : <KeyRound size={18} />}
                sx={{ fontWeight: 700, py: 1.2, px: 3 }}
              >
                {isChangingPassword ? 'Updating Password...' : 'Update Security Password'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
