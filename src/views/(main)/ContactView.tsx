'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Database,
  ExternalLink,
  GraduationCap,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Send,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { theme } from '../../theme/theme';

const colors = {
  green: theme.palette.primary.main,
  blue: theme.palette.secondary.main,
  cream: theme.palette.warning.light,
  orange: theme.palette.warning.main,
  dark: theme.palette.text.primary,
  muted: theme.palette.text.secondary,
  background: theme.palette.background.default,
  divider: theme.palette.divider,
};

const whatsappNumber = '256709150757';
const whatsappDisplay = '+256 709 150 757';
const whatsappLink = `https://wa.me/${whatsappNumber}`;

const emailChannels = [
  {
    label: 'General enquiries',
    value: 'info@spmgeosolutions.com',
    href: 'mailto:info@spmgeosolutions.com',
    detail: 'Projects, partnerships, consultancy, and general questions.',
  },
  {
    label: 'Academy and training',
    value: 'academy@spmgeosolutions.com',
    href: 'mailto:academy@spmgeosolutions.com',
    detail: 'Course enquiries, practical training, and workforce development.',
  },
];

const onlineChannels = [
  { label: 'Website', value: 'www.spmgeosolutions.com', href: 'https://www.spmgeosolutions.com', icon: Globe2 },
  { label: 'WhatsApp', value: whatsappDisplay, href: whatsappLink, icon: MessageCircle },
  { label: 'X', value: '@SPMGeosolutions', href: 'https://x.com/SPMGeosolutions', icon: ExternalLink },
  { label: 'LinkedIn', value: 'SPM Geosolutions', href: 'https://linkedin.com/company/spmgeosolutions', icon: ExternalLink },
];

const projectTypes = [
  'Survey data processing',
  'GIS consultancy and spatial analysis',
  'Web GIS, dashboards, or field systems',
  'Drone, LiDAR, photogrammetry, or bathymetry',
  'Training and workforce development',
  'Partnership or back-office support',
];

const waysToStart = [
  {
    title: 'Bring a problem',
    description: 'Explain the decision, delivery bottleneck, or spatial workflow you want to improve.',
    icon: Workflow,
    accent: colors.green,
  },
  {
    title: 'Bring your data',
    description: 'Share what you already have and what you want to turn it into.',
    icon: Database,
    accent: colors.blue,
  },
  {
    title: 'Bring your team',
    description: 'Discuss practical capability-building for your staff, students, or project partners.',
    icon: GraduationCap,
    accent: colors.orange,
  },
];

export const ContactView: React.FC = () => {
  const { showSnackbar, navigateToMain } = useAppStore();

  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      showSnackbar('Please add your name and a short project description.', 'warning');
      return;
    }

    const enquiry = [
      'Hello SPM Geosolutions,',
      '',
      `Name: ${name.trim()}`,
      organization.trim() ? `Organisation: ${organization.trim()}` : '',
      email.trim() ? `Email: ${email.trim()}` : '',
      `Need: ${projectType}`,
      location.trim() ? `Project area/location: ${location.trim()}` : '',
      '',
      message.trim(),
    ].filter(Boolean).join('\n');

    const encodedMessage = encodeURIComponent(enquiry);
    window.open(`${whatsappLink}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    showSnackbar('Your enquiry is ready to send in WhatsApp.', 'success');
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setOrganization('');
    setEmail('');
    setProjectType(projectTypes[0]);
    setLocation('');
    setMessage('');
  };

  return (
    <Box sx={{ bgcolor: colors.background, py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Hero */}
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            p: { xs: 3, sm: 5, md: 7 },
            mb: 4,
            borderRadius: 4,
            color: 'white',
            background: `linear-gradient(120deg, ${colors.green} 0%, #075C43 52%, ${colors.dark} 100%)`,
            '&::after': {
              content: '""',
              position: 'absolute',
              width: 360,
              height: 360,
              right: -120,
              top: -170,
              border: '1px solid rgba(248, 245, 181, 0.24)',
              borderRadius: '50%',
              boxShadow: '0 0 0 38px rgba(248, 245, 181, 0.05), 0 0 0 76px rgba(248, 245, 181, 0.04)',
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' }, gap: { xs: 4, md: 7 }, alignItems: 'center' }}>
            <Box>
              <Chip
                icon={<ShieldCheck size={16} color={colors.dark} />}
                label="SPM GEOSOLUTIONS • UGANDA HEADQUARTERS"
                sx={{ bgcolor: colors.cream, color: colors.dark, fontWeight: 800, mb: 2.5, '& .MuiChip-icon': { color: colors.dark } }}
              />
              <Typography variant="h1" sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '2.5rem', md: '4.35rem' }, lineHeight: 1.03, letterSpacing: '-0.045em', mb: 2.5 }}>
                Let&apos;s discuss your next project.
              </Typography>
              <Typography variant="body1" sx={{ color: '#EAF4EF', lineHeight: 1.7, maxWidth: 680, fontSize: { md: '1.1rem' } }}>
                Let&apos;s turn your spatial data into something useful. Bring a problem, dataset, or team; SPM will help scope the requirement, shape a deliverable, or build practical capability.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3.5 }}>
                <Button
                  component="a"
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  endIcon={<MessageCircle size={18} />}
                  sx={{ bgcolor: colors.orange, color: colors.dark, fontWeight: 800, '&:hover': { bgcolor: '#F09A42' } }}
                >
                  Chat on WhatsApp
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigateToMain('services')}
                  endIcon={<ArrowUpRight size={17} />}
                  sx={{ borderColor: 'rgba(255,255,255,0.65)', color: 'white', fontWeight: 700, '&:hover': { borderColor: colors.cream, bgcolor: 'rgba(248,245,181,0.08)' } }}
                >
                  Explore services
                </Button>
              </Box>
            </Box>

            {/* QR connection card */}
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.95)', color: colors.dark, display: 'flex', gap: 2.5, alignItems: 'center', border: '1px solid rgba(255,255,255,0.65)' }}>
              <Box sx={{ width: { xs: 120, sm: 150 }, height: { xs: 120, sm: 150 }, p: 1, borderRadius: 2, bgcolor: 'white', flexShrink: 0, border: `2px solid ${colors.cream}` }}>
                <Box component="img" src="/images/code.png" alt="Scan the SPM Geosolutions QR code to connect on WhatsApp" sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }} />
              </Box>
              <Box>
                <QrCode size={24} color={colors.blue} />
                <Typography variant="h5" sx={{ color: colors.dark, fontWeight: 900, mt: 1, mb: 0.75 }}>Scan to connect</Typography>
                <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.55, mb: 1.5 }}>Use the QR code or WhatsApp button to start a project conversation.</Typography>
                <Typography variant="subtitle2" sx={{ color: colors.green, fontWeight: 900 }}>{whatsappDisplay}</Typography>
              </Box>
            </Paper>
          </Box>
        </Paper>

        {/* Company contact context */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 1.5, mb: 8 }}>
          {[
            { label: 'Organisation', value: 'SPM Geosolutions (U) Limited', icon: ShieldCheck },
            { label: 'Headquarters', value: 'Uganda', icon: MapPin },
            { label: 'Coverage', value: 'East Africa and beyond', icon: Workflow },
            { label: 'Direct channel', value: whatsappDisplay, icon: Phone },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Paper key={item.label} elevation={0} sx={{ p: { xs: 2, md: 2.5 }, minHeight: 118, borderRadius: 2.5, bgcolor: 'white', border: `1px solid ${colors.divider}` }}>
                <Icon size={20} color={colors.green} />
                <Typography variant="caption" sx={{ display: 'block', color: colors.muted, fontWeight: 800, mt: 1, textTransform: 'uppercase', letterSpacing: 0.6 }}>{item.label}</Typography>
                <Typography variant="subtitle2" sx={{ color: colors.dark, fontWeight: 900, lineHeight: 1.35, mt: 0.35 }}>{item.value}</Typography>
              </Paper>
            );
          })}
        </Box>

        {/* Official contact channels */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ maxWidth: 720, mb: 3.5 }}>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 800, letterSpacing: 1.5 }}>OFFICIAL CONTACT CHANNELS</Typography>
            <Typography variant="h3" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, mb: 1 }}>Choose the easiest way to reach SPM.</Typography>
            <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.7 }}>
              Email the right team, visit the website, or connect through our public channels. Each link opens directly in the appropriate app or browser.
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 3.5 }, borderRadius: 3, bgcolor: 'white', border: `1px solid ${colors.divider}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}>
                <Box sx={{ width: 42, height: 42, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: `${colors.orange}18`, color: colors.orange }}><Mail size={21} /></Box>
                <Box><Typography variant="h5" sx={{ color: colors.dark, fontWeight: 900 }}>Email SPM</Typography><Typography variant="caption" sx={{ color: colors.muted }}>Send a direct written enquiry</Typography></Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {emailChannels.map((channel) => (
                  <Box key={channel.value} component="a" href={channel.href} sx={{ display: 'block', p: 1.5, borderRadius: 2, bgcolor: '#FFFDF2', border: `1px solid ${colors.divider}`, textDecoration: 'none', '&:hover': { borderColor: colors.orange, bgcolor: colors.cream } }}>
                    <Typography variant="caption" sx={{ display: 'block', color: colors.orange, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5 }}>{channel.label}</Typography>
                    <Typography variant="subtitle2" sx={{ color: colors.blue, fontWeight: 900, overflowWrap: 'anywhere' }}>{channel.value}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: colors.muted, lineHeight: 1.45, mt: 0.25 }}>{channel.detail}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 3, md: 3.5 }, borderRadius: 3, bgcolor: colors.dark, color: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2.5 }}>
                <Box sx={{ width: 42, height: 42, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'rgba(248,245,181,0.12)', color: colors.cream }}><Globe2 size={21} /></Box>
                <Box><Typography variant="h5" sx={{ color: 'white', fontWeight: 900 }}>Connect online</Typography><Typography variant="caption" sx={{ color: '#CBD5E1' }}>One click to open each channel</Typography></Box>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.25 }}>
                {onlineChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <Button key={channel.label} component="a" href={channel.href} target="_blank" rel="noreferrer" variant="outlined" startIcon={<Icon size={17} />} sx={{ justifyContent: 'flex-start', textAlign: 'left', minHeight: 66, px: 1.5, borderColor: 'rgba(255,255,255,0.28)', color: 'white', '&:hover': { borderColor: colors.cream, bgcolor: 'rgba(248,245,181,0.08)' } }}>
                      <Box sx={{ minWidth: 0 }}><Typography variant="caption" sx={{ display: 'block', color: colors.cream, fontWeight: 900 }}>{channel.label}</Typography><Typography variant="caption" sx={{ display: 'block', color: '#E2E8F0', overflowWrap: 'anywhere', textTransform: 'none' }}>{channel.value}</Typography></Box>
                    </Button>
                  );
                })}
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Main contact area */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '0.85fr 1.15fr' }, gap: 4, alignItems: 'start', mb: 8 }}>
          <Box>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 800, letterSpacing: 1.5 }}>START WITH WHAT YOU HAVE</Typography>
            <Typography variant="h2" sx={{ color: colors.dark, fontWeight: 900, fontSize: { xs: '2.2rem', md: '3.1rem' }, lineHeight: 1.08, mt: 1, mb: 2 }}>
              A useful conversation starts simply.
            </Typography>
            <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.75, mb: 3 }}>
              SPM Geosolutions is a geospatial company operating across East Africa, with our headquarters in Uganda. Tell us where the workflow is stuck, what information you have, and what a useful result looks like.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {waysToStart.map((item) => {
                const Icon = item.icon;
                return (
                  <Paper key={item.title} elevation={0} sx={{ p: 2, borderRadius: 2.5, border: `1px solid ${colors.divider}`, bgcolor: 'white', display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 42, height: 42, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: `${item.accent}18`, color: item.accent, flexShrink: 0 }}><Icon size={21} /></Box>
                    <Box><Typography variant="subtitle1" sx={{ color: colors.dark, fontWeight: 900 }}>{item.title}</Typography><Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.55 }}>{item.description}</Typography></Box>
                  </Paper>
                );
              })}
            </Box>
          </Box>

          <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, bgcolor: 'white', border: `1px solid ${colors.divider}` }}>
            <Typography variant="h4" sx={{ color: colors.dark, fontWeight: 900, mb: 0.75 }}>Shape your enquiry</Typography>
            <Typography variant="body2" sx={{ color: colors.muted, mb: 3.5, lineHeight: 1.65 }}>
              Complete the short form and it will open a WhatsApp message with the project context already organised.
            </Typography>

            {submitted ? (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <CheckCircle2 size={58} color={colors.green} style={{ margin: '0 auto 16px auto' }} />
                <Typography variant="h4" sx={{ color: colors.dark, fontWeight: 900, mb: 1 }}>WhatsApp enquiry prepared</Typography>
                <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.65, maxWidth: 430, mx: 'auto', mb: 3 }}>
                  WhatsApp should have opened with your project details. Review the message and press send when you are ready.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.25 }}>
                  <Button component="a" href={whatsappLink} target="_blank" rel="noreferrer" variant="contained" endIcon={<ExternalLink size={16} />} sx={{ bgcolor: colors.green, '&:hover': { bgcolor: '#075C43' }, fontWeight: 800 }}>Open WhatsApp</Button>
                  <Button variant="outlined" onClick={resetForm} sx={{ borderColor: colors.blue, color: colors.blue, fontWeight: 800 }}>Edit enquiry</Button>
                </Box>
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <TextField label="Your name" fullWidth required value={name} onChange={(event) => setName(event.target.value)} />
                    <TextField label="Organisation (optional)" fullWidth value={organization} onChange={(event) => setOrganization(event.target.value)} />
                  </Box>
                  <TextField label="Email (optional)" type="email" fullWidth value={email} onChange={(event) => setEmail(event.target.value)} />
                  <TextField label="What do you need help with?" select fullWidth value={projectType} onChange={(event) => setProjectType(event.target.value)}>
                    {projectTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                  </TextField>
                  <TextField label="Project area or location (optional)" fullWidth value={location} onChange={(event) => setLocation(event.target.value)} placeholder="District, region, country, or project area" />
                  <TextField label="Tell us about the requirement" multiline rows={5} fullWidth required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What are you trying to collect, process, manage, analyse, or learn?" />
                  <Button type="submit" variant="contained" size="large" endIcon={<Send size={18} />} sx={{ py: 1.45, bgcolor: colors.green, '&:hover': { bgcolor: '#075C43' }, fontWeight: 800 }}>
                    Prepare WhatsApp enquiry
                  </Button>
                  <Typography variant="caption" sx={{ color: colors.muted, textAlign: 'center', lineHeight: 1.5 }}>
                    The form opens WhatsApp with your message. You review and send it yourself.
                  </Typography>
                </Box>
              </form>
            )}
          </Paper>
        </Box>

        {/* Contact alternatives */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: colors.cream, border: '1px solid #E6E0A3' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box>
              <Typography variant="overline" sx={{ color: colors.orange, fontWeight: 900, letterSpacing: 1.5 }}>NOT SURE WHERE TO START?</Typography>
              <Typography variant="h4" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, mb: 1 }}>Explore the work before you write.</Typography>
              <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.65 }}>See the service areas or explore practical training options, then come back with the question that matters.</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, flexShrink: 0 }}>
              <Button onClick={() => navigateToMain('services')} variant="contained" endIcon={<ArrowRight size={17} />} sx={{ bgcolor: colors.blue, '&:hover': { bgcolor: '#1C4E85' }, fontWeight: 800 }}>View services</Button>
              <Button onClick={() => navigateToMain('academy')} variant="outlined" endIcon={<ArrowUpRight size={17} />} sx={{ borderColor: colors.green, color: colors.green, fontWeight: 800 }}>Visit Academy</Button>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 4, color: colors.muted }}>
          <Clock size={16} />
          <Typography variant="caption">Project conversations are scoped around the information you provide.</Typography>
        </Box>
      </Container>
    </Box>
  );
};
