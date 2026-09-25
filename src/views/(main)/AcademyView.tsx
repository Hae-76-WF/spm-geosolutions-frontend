"use client";

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Database,
  GraduationCap,
  Layers,
  Search,
  ShieldCheck,
  Users,
  Workflow,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { theme } from '@/theme/theme';

const colors = {
  green: theme.palette.primary.main,
  blue: theme.palette.secondary.main,
  cream: theme.palette.warning.light,
  orange: theme.palette.warning.main,
  dark: theme.palette.text.primary,
  muted: theme.palette.text.secondary,
  background: theme.palette.background.default,
  divider: theme.palette.divider,
  paleBlue: '#EEF5FC',
};

const learningTracks = [
  {
    label: 'GIS AND SPATIAL DATA',
    title: 'Build, manage and analyse spatial information',
    text: 'Learn the complete workflow from spatial data models and coordinate systems to analysis, databases, maps and web delivery.',
    modules: ['QGIS and ArcGIS Pro', 'Spatial databases and PostGIS', 'Web GIS and dashboards', 'Remote sensing and GIS programming'],
    icon: <Database size={27} />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'SURVEY FIELD-TO-FINISH',
    title: 'Move from equipment setup to final deliverable',
    text: 'Practise field and office workflows that connect planning, data capture, processing, checking and presentation.',
    modules: ['GNSS and RTK workflows', 'Total stations and levels', 'Cadastral and boundary workflows', 'Engineering survey applications'],
    icon: <Compass size={27} />,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'EMERGING TECHNOLOGIES',
    title: 'Work with the technologies shaping geospatial delivery',
    text: 'Gain practical exposure to specialised methods using realistic datasets, guided exercises and complete assignments.',
    modules: ['Drone mapping and photogrammetry', 'LiDAR point-cloud processing', 'Bathymetric surveying', 'Underground utility mapping'],
    icon: <Layers size={27} />,
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=85',
  },
  {
    label: 'INSTITUTIONAL CAPACITY',
    title: 'Train teams around their real operating context',
    text: 'Customise content, datasets, equipment and assessment around the roles and workflows your organisation needs to strengthen.',
    modules: ['Short professional courses', 'Graduate and university programmes', 'Corporate and institutional cohorts', 'Practical assessment and handover'],
    icon: <Users size={27} />,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85',
  },
];

const learningSteps = [
  ['01', 'Understand', 'Start with the workflow, role or technical gap you want to address.'],
  ['02', 'Practise', 'Work with realistic data, software, equipment and guided exercises.'],
  ['03', 'Complete', 'Carry a task through planning, fieldwork, processing, quality checks and presentation.'],
  ['04', 'Apply', 'Leave with a repeatable workflow, useful outputs and the confidence to continue.'],
];

export const AcademyView: React.FC = () => {
  const { courses, coursesLoading, coursesError, fetchCourses, navigateToMain } = useAppStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <Box sx={{ bgcolor: colors.background, color: colors.dark }}>
      {/* Hero */}
      <Box sx={{ bgcolor: colors.green, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', right: -130, top: -180, width: 450, height: 450, borderRadius: '50%', background: `radial-gradient(circle, rgba(39, 110, 185, 0.5) 0%, rgba(39, 110, 185, 0) 70%)` }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' }, gap: { xs: 5, md: 8 }, alignItems: 'center', py: { xs: 8, md: 11 } }}>
            <Box>
              <Chip icon={<GraduationCap size={16} color={colors.dark} />} label="PRACTICAL LEARNING FOR REAL GEOSPATIAL WORK" sx={{ bgcolor: colors.cream, color: colors.dark, fontWeight: 900, letterSpacing: 0.6, mb: 2.5 }} />
              <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '2.5rem', md: '4.25rem' }, lineHeight: 1.04, letterSpacing: '-0.04em', mb: 2.5 }}>
                Learn the workflow. Use the equipment. Produce the deliverable.
              </Typography>
              <Typography sx={{ color: '#E3F0EA', fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.75, maxWidth: 700, mb: 3.5 }}>
                SPM Academy connects classroom knowledge to practical GIS, surveying and emerging-technology assignments using realistic data, guided exercises and complete field-to-finish workflows.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Button component="a" href="#available-courses" variant="contained" endIcon={<ArrowRight size={18} />} sx={{ bgcolor: colors.orange, color: '#fff', fontWeight: 900, px: 2.8, py: 1.35, '&:hover': { bgcolor: '#D97518' } }}>
                  View Available Courses
                </Button>
                <Button variant="outlined" onClick={() => navigateToMain('contact')} sx={{ borderColor: 'rgba(255,255,255,0.65)', color: '#fff', fontWeight: 800, px: 2.8, py: 1.35, '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                  Request Team Training
                </Button>
              </Box>
            </Box>

            <Paper elevation={0} sx={{ p: { xs: 2, md: 2.5 }, bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 3 }}>
              <Box component="img" src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85" alt="Learners working through a practical training session" sx={{ width: '100%', height: { xs: 250, md: 360 }, objectFit: 'cover', borderRadius: 2 }} />
              <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center', mt: 2 }}><ShieldCheck size={19} color={colors.cream} /><Typography variant="body2" sx={{ color: '#E3F0EA', lineHeight: 1.5 }}>Practical, equipment- and project-based learning.</Typography></Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Introduction */}
      <Box sx={{ py: { xs: 7, md: 10 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'start' }}>
            <Box><Typography variant="overline" sx={{ color: colors.green, fontWeight: 900, letterSpacing: 2 }}>THE LEARNING PROMISE</Typography><Typography variant="h2" sx={{ color: colors.blue, fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mt: 1 }}>Theory becomes useful when learners can complete the work.</Typography></Box>
            <Box><Typography sx={{ color: colors.muted, fontSize: '1.08rem', lineHeight: 1.75, mb: 2 }}>SPM Academy is built around practical assignments rather than software menus alone. Learners work with the decisions, data, equipment and quality expectations that shape real professional delivery.</Typography><Typography sx={{ color: colors.muted, fontSize: '1.08rem', lineHeight: 1.75 }}>Programmes can be open to individuals or customised for firms, universities, government, utilities, NGOs and other institutions.</Typography></Box>
          </Box>
        </Container>
      </Box>

      {/* Tracks */}
      <Box sx={{ py: { xs: 7, md: 10 }, bgcolor: colors.background }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 760, mb: 5 }}><Typography variant="overline" sx={{ color: colors.green, fontWeight: 900, letterSpacing: 2 }}>LEARNING TRACKS</Typography><Typography variant="h2" sx={{ color: colors.blue, fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mt: 1, mb: 2 }}>Choose a capability to build.</Typography><Typography sx={{ color: colors.muted, fontSize: '1.06rem', lineHeight: 1.7 }}>Start with a focused module or combine tracks into a complete programme for a role, team or institution.</Typography></Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {learningTracks.map((track) => <Card key={track.title} elevation={0} sx={{ border: `1px solid ${colors.divider}`, borderRadius: 2.5, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, bgcolor: '#fff' }}><CardMedia component="img" image={track.image} alt={track.title} sx={{ width: { xs: '100%', sm: 180 }, height: { xs: 190, sm: 'auto' }, objectFit: 'cover' }} /><CardContent sx={{ p: 3, flex: 1 }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: colors.green, mb: 1.2 }}>{track.icon}<Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: 1 }}>{track.label}</Typography></Box><Typography variant="h5" sx={{ color: colors.blue, fontWeight: 900, lineHeight: 1.2, mb: 1.2 }}>{track.title}</Typography><Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.6, mb: 1.8 }}>{track.text}</Typography><Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.7 }}>{track.modules.map((module) => <Box key={module} sx={{ display: 'flex', gap: 0.8, alignItems: 'flex-start' }}><CheckCircle2 size={15} color={colors.green} style={{ marginTop: 3, flexShrink: 0 }} /><Typography variant="caption" sx={{ color: colors.muted, lineHeight: 1.45 }}>{module}</Typography></Box>)}</Box></CardContent></Card>)}
          </Box>
        </Container>
      </Box>

      {/* Learning model */}
      <Box sx={{ py: { xs: 7, md: 10 }, bgcolor: colors.blue, color: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 760, mb: 5 }}><Typography variant="overline" sx={{ color: colors.cream, fontWeight: 900, letterSpacing: 2 }}>FIELD-TO-FINISH LEARNING</Typography><Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mt: 1, mb: 2 }}>A practical learning model that ends with something usable.</Typography><Typography sx={{ color: '#E4EFF9', fontSize: '1.06rem', lineHeight: 1.7 }}>The exact exercises change by programme, but each learning experience connects knowledge to action.</Typography></Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>{learningSteps.map(([number, title, text]) => <Paper key={number} elevation={0} sx={{ p: 2.7, minHeight: 200, borderRadius: 2.5, bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.16)' }}><Typography sx={{ color: colors.cream, fontWeight: 900, fontSize: '1.2rem', mb: 2 }}>{number}</Typography><Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, mb: 1 }}>{title}</Typography><Typography variant="body2" sx={{ color: '#E4EFF9', lineHeight: 1.6 }}>{text}</Typography></Paper>)}</Box>
        </Container>
      </Box>

      {/* Courses from API */}
      <Box id="available-courses" sx={{ py: { xs: 7, md: 10 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 5 }}><Box><Typography variant="overline" sx={{ color: colors.green, fontWeight: 900, letterSpacing: 2 }}>CURRENT COURSE OFFERINGS</Typography><Typography variant="h2" sx={{ color: colors.blue, fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mt: 1 }}>Available learning opportunities.</Typography></Box><Button onClick={() => navigateToMain('contact')} endIcon={<ArrowUpRight size={17} />} sx={{ color: colors.blue, fontWeight: 900, px: 0, '&:hover': { bgcolor: 'transparent', color: colors.green } }}>Ask about a customised programme</Button></Box>

          {coursesLoading && <Box sx={{ textAlign: 'center', py: 7 }}><CircularProgress sx={{ color: colors.green }} /><Typography variant="body2" sx={{ mt: 2, color: colors.muted }}>Loading current course offerings...</Typography></Box>}
          {coursesError && <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>Current course schedules could not be loaded. You can still contact SPM to request an open or customised training programme.</Alert>}

          {!coursesLoading && courses.length === 0 && !coursesError && <Paper elevation={0} sx={{ p: 4, border: `1px solid ${colors.divider}`, borderRadius: 2.5, bgcolor: colors.background, textAlign: 'center' }}><GraduationCap size={38} color={colors.green} /><Typography variant="h5" sx={{ color: colors.blue, fontWeight: 900, mt: 1.5, mb: 1 }}>New course dates are being prepared.</Typography><Typography sx={{ color: colors.muted, mb: 2.5 }}>Contact SPM to discuss an open course or a programme for your team.</Typography><Button variant="contained" onClick={() => navigateToMain('contact')} sx={{ bgcolor: colors.green, fontWeight: 800, '&:hover': { bgcolor: '#022E20' } }}>Contact SPM Academy</Button></Paper>}

          {courses.length > 0 && <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>{courses.map((course) => <Card key={course.id} elevation={0} sx={{ border: `1px solid ${colors.divider}`, borderRadius: 2.5, overflow: 'hidden', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}><CardMedia component="img" height="220" image={course.image_url || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=85'} alt={course.title} /><CardContent sx={{ p: { xs: 3, md: 3.5 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}><Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 2 }}><Chip label={course.track || 'Practical training'} size="small" sx={{ bgcolor: colors.paleBlue || '#EEF5FC', color: colors.blue, fontWeight: 800 }} /><Typography variant="caption" sx={{ color: colors.muted, fontWeight: 700 }}>Duration: {course.duration_weeks || 'Flexible'} {course.duration_weeks ? 'weeks' : ''}</Typography></Box><Typography variant="h5" sx={{ color: colors.blue, fontWeight: 900, mb: 1.3 }}>{course.title}</Typography><Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.65, mb: 2.5 }}>{course.description}</Typography><Box sx={{ p: 2, bgcolor: colors.background, borderRadius: 1.5, border: `1px solid ${colors.divider}`, mb: 3 }}><Typography variant="caption" sx={{ fontWeight: 900, color: colors.green, display: 'block', mb: 1 }}>EQUIPMENT AND SOFTWARE COVERED</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>{(course.equipment_used || []).map((equipment, index) => <Chip key={index} label={equipment} size="small" sx={{ bgcolor: '#fff', border: `1px solid ${colors.divider}`, color: colors.muted, fontSize: '0.75rem' }} />)}</Box></Box><Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${colors.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}><Box><Typography variant="caption" sx={{ color: colors.muted, display: 'block' }}>Course fee</Typography><Typography variant="h5" sx={{ color: colors.green, fontWeight: 900 }}>{course.price_ugx ? `UGX ${Number(course.price_ugx).toLocaleString()}` : 'Contact us'}</Typography></Box><Button variant="contained" onClick={() => navigateToMain('login')} endIcon={<ArrowRight size={16} />} sx={{ bgcolor: colors.orange, color: '#fff', fontWeight: 800, '&:hover': { bgcolor: '#D97518' } }}>Enrol</Button></Box></CardContent></Card>)}</Box>}
        </Container>
      </Box>

      {/* Certificate and institutional CTA */}
      <Box sx={{ py: { xs: 7, md: 9 }, bgcolor: colors.cream }}>
        <Container maxWidth="lg"><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}><Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2.5, bgcolor: '#fff', border: `1px solid rgba(3, 71, 50, 0.12)` }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: colors.green, mb: 1.5 }}><Search size={24} /><Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 1.5 }}>CERTIFICATE LOOKUP</Typography></Box><Typography variant="h5" sx={{ color: colors.green, fontWeight: 900, mb: 1 }}>Need to check an SPM Academy certificate?</Typography><Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.65, mb: 2.5 }}>Use the certificate verification page for credentials issued through SPM Academy programmes.</Typography><Button onClick={() => navigateToMain('verify-certificate')} endIcon={<ArrowUpRight size={17} />} sx={{ color: colors.blue, fontWeight: 900, px: 0, '&:hover': { bgcolor: 'transparent', color: colors.green } }}>Verify a certificate</Button></Paper><Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2.5, bgcolor: colors.green, color: '#fff' }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, color: colors.cream, mb: 1.5 }}><Users size={24} /><Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 1.5 }}>FOR ORGANISATIONS</Typography></Box><Typography variant="h5" sx={{ color: '#fff', fontWeight: 900, mb: 1 }}>Build a programme around your team.</Typography><Typography variant="body2" sx={{ color: '#E3F0EA', lineHeight: 1.65, mb: 2.5 }}>Tell us the roles, tools, datasets and workflows your team needs to strengthen.</Typography><Button onClick={() => navigateToMain('contact')} endIcon={<ArrowRight size={17} />} sx={{ color: colors.cream, fontWeight: 900, px: 0, '&:hover': { bgcolor: 'transparent', color: colors.orange } }}>Request institutional training</Button></Paper></Box></Container>
      </Box>
    </Box>
  );
};
