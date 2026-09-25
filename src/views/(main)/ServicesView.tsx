"use client";

import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Database,
  FileCheck2,
  GraduationCap,
  Layers,
  Map,
  ShieldCheck,
  Smartphone,
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
};

type ServiceCategory = 'all' | 'processing' | 'systems' | 'analysis' | 'training';

const categoryOptions: { id: ServiceCategory; label: string }[] = [
  { id: 'all', label: 'All services' },
  { id: 'processing', label: 'Data processing' },
  { id: 'systems', label: 'Spatial systems' },
  { id: 'analysis', label: 'Analysis and mapping' },
  { id: 'training', label: 'Training and capacity' },
];

const services = [
  {
    id: 'survey-processing',
    categories: ['processing'],
    label: 'BACK-OFFICE SUPPORT',
    title: 'Survey Data Processing',
    summary: 'Additional technical capacity for survey and engineering firms that need help moving from field data to checked, deliverable-ready outputs.',
    bestFor: 'Licensed survey and engineering firms',
    deliverables: ['Topographic and cadastral data processing', 'Engineering survey and field-data workflows', 'Processing review and quality checks', 'White-label delivery where agreed'],
    value: 'Clear backlogs, protect deadlines, and take on more work without immediately increasing permanent office overhead.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=85',
    icon: <Compass size={25} />,
  },
  {
    id: 'specialist-processing',
    categories: ['processing'],
    label: 'SPECIALIST DATA',
    title: 'Drone, LiDAR, Photogrammetry and Bathymetric Processing',
    summary: 'Technical processing support for specialised datasets that require appropriate software, workflows, quality checks and agreed final formats.',
    bestFor: 'Survey, infrastructure, environment and project teams',
    deliverables: ['Point-cloud processing and classification', 'Orthomosaics, DSMs, DTMs and terrain products', 'Photogrammetric and remote-sensing outputs', 'Bathymetric processing and technical reporting'],
    value: 'Use specialist data with greater confidence and receive outputs that fit the next stage of design, analysis or reporting.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=85',
    icon: <Layers size={25} />,
  },
  {
    id: 'spatial-databases',
    categories: ['systems'],
    label: 'SPATIAL INTELLIGENCE',
    title: 'Spatial Database Design and Management',
    summary: 'Structured spatial databases for organizations that need reliable records, controlled updates, repeatable queries and a shared source of information.',
    bestFor: 'Government, utilities, institutions, NGOs and project teams',
    deliverables: ['Spatial data model and database design', 'PostgreSQL and PostGIS implementation', 'Data cleaning, migration and population', 'Permissions, maintenance guidance and documentation'],
    value: 'Replace scattered files and repeated manual consolidation with information that is easier to find, update and manage.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85',
    icon: <Database size={25} />,
  },
  {
    id: 'web-gis',
    categories: ['systems'],
    label: 'WEB GIS AND DASHBOARDS',
    title: 'Web GIS, Operational Dashboards and Field Tracking',
    summary: 'Practical systems that connect spatial databases, maps, field updates and reporting so teams can see what is happening and where.',
    bestFor: 'Project managers, public programmes, utilities, contractors and NGOs',
    deliverables: ['Interactive web maps and configured layers', 'Dashboards, charts and performance indicators', 'Status maps, issue registers and user roles', 'Deployment guidance, training and support'],
    value: 'Improve visibility, identify issues earlier and reduce dependence on disconnected spreadsheets and late manual reports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85',
    icon: <Workflow size={25} />,
  },
  {
    id: 'mobile-data',
    categories: ['systems'],
    label: 'FIELD DATA SYSTEMS',
    title: 'Mobile Field Data Collection Systems',
    summary: 'Digital field forms that capture required attributes, locations, photographs and validation rules at the source.',
    bestFor: 'Utilities, government, NGOs, inspectors and research teams',
    deliverables: ['Configured mobile forms and form logic', 'GPS capture, photographs and validation', 'Offline workflows where appropriate', 'Synchronization, dashboards and field guides'],
    value: 'Capture cleaner information once, reduce re-entry and follow-up calls, and speed up reporting from distributed teams.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85',
    icon: <Smartphone size={25} />,
  },
  {
    id: 'land-asset-utility',
    categories: ['systems'],
    label: 'INFORMATION SYSTEMS',
    title: 'Land, Asset and Utility Information Systems',
    summary: 'Connected maps, records, documents, inspections and workflows for land, facilities, infrastructure and utility assets.',
    bestFor: 'Land agencies, municipalities, utilities and infrastructure owners',
    deliverables: ['Parcel, asset or network maps', 'Document links and inspection history', 'Status workflows and user permissions', 'Operational dashboards and handover plans'],
    value: 'Strengthen control of assets and land, support maintenance planning and reduce dependence on individual staff members.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85',
    icon: <Map size={25} />,
  },
  {
    id: 'analysis',
    categories: ['analysis'],
    label: 'DECISION SUPPORT',
    title: 'Spatial Analysis and Remote Sensing',
    summary: 'Spatial evidence turned into clear comparisons, patterns and decision support for planning, targeting, risk management and feasibility work.',
    bestFor: 'Government, planners, agriculture, environment, infrastructure and investors',
    deliverables: ['Suitability, risk and accessibility analysis', 'Terrain, hydrology and network analysis', 'Remote-sensing classification and change detection', 'Technical maps, results and interpretation reports'],
    value: 'Move from large datasets and imagery to a clear basis for prioritisation, targeting and resource allocation.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=85',
    icon: <Compass size={25} />,
  },
  {
    id: 'cartography',
    categories: ['analysis'],
    label: 'CARTOGRAPHY AND COMMUNICATION',
    title: 'Cartography, Thematic Mapping and Data Visualisation',
    summary: 'Clear, audience-focused maps and visual products for reports, publications, field operations, public communication and decision-makers.',
    bestFor: 'Consultants, government, NGOs, researchers and project teams',
    deliverables: ['Thematic, reference and topographic maps', 'Report maps, atlases and map templates', 'Large-format and web-optimised outputs', 'Visualisation guidance and quality review'],
    value: 'Make technical findings easier to understand and help stakeholders act on the information.',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=85',
    icon: <Map size={25} />,
  },
  {
    id: 'training',
    categories: ['training'],
    label: 'WORKFORCE DEVELOPMENT',
    title: 'Practical GIS, Survey and Emerging-Technology Training',
    summary: 'Equipment- and project-based learning that connects planning, fieldwork, processing, quality checking and final presentation.',
    bestFor: 'Professionals, graduates, universities, firms, government and NGOs',
    deliverables: ['QGIS, ArcGIS Pro, Web GIS and spatial databases', 'GNSS, total stations and levels', 'Programming, remote sensing and field workflows', 'Drones, LiDAR, photogrammetry, bathymetry and utility mapping'],
    value: 'Build job-ready capability, improve equipment and software adoption, and help junior teams become productive faster.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85',
    icon: <GraduationCap size={25} />,
  },
];

const engagementOptions = [
  ['Fixed-scope project', 'A defined dataset, workflow or deliverable with agreed inputs, outputs, assumptions and schedule.'],
  ['Reserved processing capacity', 'A retainer for firms that need defined production hours, priority scheduling and agreed turnaround targets.'],
  ['Diagnostic or pilot', 'A focused assessment or one high-value use case used to prove value before a wider rollout.'],
  ['Practical training programme', 'A structured cohort or institutional programme built around realistic tasks and assessed outputs.'],
];

export const ServicesView: React.FC = () => {
  const { navigateToMain } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const filteredServices = useMemo(
    () => activeCategory === 'all' ? services : services.filter((service) => service.categories.includes(activeCategory)),
    [activeCategory],
  );

  return (
    <Box sx={{ bgcolor: colors.background, color: colors.dark }}>
      {/* Header */}
      <Box sx={{ bgcolor: colors.green, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', right: -120, top: -160, width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle, rgba(39, 110, 185, 0.5) 0%, rgba(39, 110, 185, 0) 70%)` }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ py: { xs: 8, md: 11 }, maxWidth: 850 }}>
            <Chip label="SERVICES CLIENTS CAN BUY" sx={{ bgcolor: colors.cream, color: colors.dark, fontWeight: 900, letterSpacing: 0.8, mb: 2.5 }} />
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '2.45rem', md: '4.25rem' }, lineHeight: 1.05, letterSpacing: '-0.04em', mb: 2.5 }}>
              Practical geospatial support for work that needs to move.
            </Typography>
            <Typography sx={{ color: '#E3F0EA', fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.75, maxWidth: 760, mb: 3.5 }}>
              SPM Geosolutions helps organisations process technical data, build useful spatial systems, communicate evidence clearly, and develop the people who use them.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button variant="contained" onClick={() => navigateToMain('contact')} endIcon={<ArrowRight size={18} />} sx={{ bgcolor: colors.orange, color: '#fff', fontWeight: 900, px: 2.8, py: 1.35, '&:hover': { bgcolor: '#D97518' } }}>
                Discuss Your Requirement
              </Button>
              <Button variant="outlined" onClick={() => navigateToMain('quote-calculator')} sx={{ borderColor: 'rgba(255,255,255,0.65)', color: '#fff', fontWeight: 800, px: 2.8, py: 1.35, '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                Request a Scope
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Introduction */}
      <Box sx={{ py: { xs: 7, md: 10 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'start' }}>
            <Box>
              <Typography variant="overline" sx={{ color: colors.green, fontWeight: 900, letterSpacing: 2 }}>ONE PARTNER, CONNECTED CAPABILITY</Typography>
              <Typography variant="h2" sx={{ color: colors.blue, fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mt: 1, mb: 2 }}>
                Choose the support your project actually needs.
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: colors.muted, fontSize: '1.08rem', lineHeight: 1.75, mb: 2 }}>
                Our public offer is organised around specific client needs and useful deliverables—not broad technical labels. A project may involve one service or a connected combination of processing, systems, analysis and training.
              </Typography>
              <Typography sx={{ color: colors.muted, fontSize: '1.08rem', lineHeight: 1.75 }}>
                Every engagement is scoped around the available data, users, operating context, professional responsibilities and intended outcome.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 5 }}>
            {categoryOptions.map((category) => (
              <Chip
                key={category.id}
                label={category.label}
                clickable
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? 'filled' : 'outlined'}
                sx={{
                  px: 0.7,
                  py: 2.2,
                  borderRadius: 1.5,
                  fontWeight: 800,
                  color: activeCategory === category.id ? '#fff' : colors.blue,
                  bgcolor: activeCategory === category.id ? colors.blue : 'transparent',
                  borderColor: colors.blue,
                  '&:hover': { bgcolor: activeCategory === category.id ? colors.green : colors.cream },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Service portfolio */}
      <Box sx={{ pb: { xs: 8, md: 11 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {filteredServices.map((service) => (
              <Card key={service.id} elevation={0} sx={{ border: `1px solid ${colors.divider}`, borderRadius: 2.5, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#fff' }}>
                <CardMedia component="img" image={service.image} alt={service.title} sx={{ height: { xs: 210, md: 230 }, objectFit: 'cover' }} />
                <CardContent sx={{ p: { xs: 3, md: 3.5 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: colors.green, mb: 1.3 }}>
                    {service.icon}
                    <Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: 1.1 }}>{service.label}</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: colors.blue, fontWeight: 900, fontSize: { xs: '1.45rem', md: '1.75rem' }, lineHeight: 1.18, mb: 1.3 }}>{service.title}</Typography>
                  <Typography sx={{ color: colors.muted, lineHeight: 1.65, mb: 2 }}>{service.summary}</Typography>

                  <Box sx={{ p: 1.5, mb: 2.2, borderRadius: 1.5, bgcolor: colors.cream }}>
                    <Typography variant="caption" sx={{ color: colors.dark, fontWeight: 900, display: 'block', mb: 0.35 }}>BEST FOR</Typography>
                    <Typography variant="body2" sx={{ color: '#4B3F1D', fontWeight: 700 }}>{service.bestFor}</Typography>
                  </Box>

                  <Typography variant="subtitle2" sx={{ color: colors.green, fontWeight: 900, mb: 1 }}>TYPICAL DELIVERABLES</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 2.5 }}>
                    {service.deliverables.map((deliverable) => (
                      <Box key={deliverable} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.9 }}>
                        <CheckCircle2 size={16} color={colors.green} style={{ marginTop: 3, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.5 }}>{deliverable}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${colors.divider}` }}>
                    <Typography variant="body2" sx={{ color: colors.dark, lineHeight: 1.6, mb: 2 }}>
                      <strong>Client value:</strong> {service.value}
                    </Typography>
                    <Button onClick={() => navigateToMain('contact')} endIcon={<ArrowUpRight size={17} />} sx={{ color: colors.blue, fontWeight: 900, px: 0, '&:hover': { bgcolor: 'transparent', color: colors.green } }}>
                      Discuss this service
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Engagement models */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: colors.background }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 760, mb: 5 }}>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 900, letterSpacing: 2 }}>WAYS TO WORK WITH US</Typography>
            <Typography variant="h2" sx={{ color: colors.blue, fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mt: 1, mb: 2 }}>A delivery model that fits the assignment.</Typography>
            <Typography sx={{ color: colors.muted, fontSize: '1.06rem', lineHeight: 1.7 }}>We can begin with a small, clearly defined need or structure a longer technical partnership as your workload and system mature.</Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            {engagementOptions.map(([title, text], index) => (
              <Paper key={title} elevation={0} sx={{ p: 2.6, border: `1px solid ${colors.divider}`, borderRadius: 2.5, bgcolor: '#fff', minHeight: 210 }}>
                <Typography sx={{ color: colors.orange, fontWeight: 900, fontSize: '1.2rem', mb: 2 }}>0{index + 1}</Typography>
                <Typography variant="h6" sx={{ color: colors.green, fontWeight: 900, mb: 1 }}>{title}</Typography>
                <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.6 }}>{text}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Quality and responsibility */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: colors.blue, color: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' }, gap: { xs: 5, md: 9 }, alignItems: 'center' }}>
            <Box>
              <Typography variant="overline" sx={{ color: colors.cream, fontWeight: 900, letterSpacing: 2 }}>DELIVERY CONFIDENCE</Typography>
              <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mt: 1, mb: 2 }}>The process protects the output.</Typography>
              <Typography sx={{ color: '#E4EFF9', lineHeight: 1.75, fontSize: '1.06rem' }}>We make responsibilities, assumptions, review stages and handover visible so clients know what is being delivered and how to continue using it.</Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
              {['Clear scope and assumptions', 'Visible QA and review stages', 'Qualified responsibility', 'Secure data transfer and handling', 'Progress communication', 'Useful handover and support'].map((item) => <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.1, p: 1.8, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.09)' }}><ShieldCheck size={18} color={colors.cream} /><Typography variant="body2" sx={{ color: '#F0F6FB' }}>{item}</Typography></Box>)}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: colors.cream }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 4 }}>
            <Box sx={{ maxWidth: 720 }}>
              <Typography variant="overline" sx={{ color: colors.dark, fontWeight: 900, letterSpacing: 2 }}>NOT SURE WHERE TO START?</Typography>
              <Typography variant="h2" sx={{ color: colors.green, fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.1, mt: 1, mb: 1.5 }}>Bring us the problem.</Typography>
              <Typography sx={{ color: '#4B3F1D', lineHeight: 1.7, fontSize: '1.06rem' }}>Share your project context, available data and intended outcome. We will help identify the right service or combination of services.</Typography>
            </Box>
            <Button variant="contained" onClick={() => navigateToMain('contact')} endIcon={<ArrowRight size={18} />} sx={{ bgcolor: colors.orange, color: '#fff', fontWeight: 900, px: 3, py: 1.45, '&:hover': { bgcolor: '#D97518' } }}>
              Start a Conversation
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
