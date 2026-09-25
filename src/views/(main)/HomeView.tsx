import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Compass,
  Database,
  FileCheck2,
  GraduationCap,
  Layers,
  Map,
  MapPin,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const brand = {
  blue: '#276EB9',
  green: '#034732',
  gold: '#E88821',
  dark: '#212529',
  muted: '#5F6B76',
  paleBlue: '#F8F5B5',
  paleGreen: '#F0F7F1',
  paleGold: '#FFF6E9',
};

const serviceCards = [
  {
    label: 'BACK-OFFICE SUPPORT',
    title: 'Survey Data Processing',
    description: 'Help your survey or engineering firm move from raw field observations to checked, deliverable-ready outputs.',
    features: ['Topographic and cadastral processing', 'Engineering and field survey data', 'Drone, LiDAR, photogrammetry and bathymetric workflows', 'White-label support where agreed'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    icon: <Compass size={25} />,
  },
  {
    label: 'SPATIAL INTELLIGENCE',
    title: 'Spatial Databases and Information Systems',
    description: 'Turn scattered maps, spreadsheets, field records and documents into a structured spatial information system.',
    features: ['PostgreSQL and PostGIS database design', 'Land, asset and utility information systems', 'Data models, permissions and workflows', 'Handover, documentation and support'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    icon: <Database size={25} />,
  },
  {
    label: 'WEB GIS AND FIELD SYSTEMS',
    title: 'Dashboards, Maps and Mobile Data Collection',
    description: 'Give teams a practical way to capture, view, update and report location-based information.',
    features: ['Interactive web maps and dashboards', 'Mobile forms with GPS, photos and validation', 'Operational tracking and reporting views', 'User training and adoption support'],
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80',
    icon: <Layers size={25} />,
  },
  {
    label: 'ANALYSIS AND COMMUNICATION',
    title: 'Spatial Analysis, Remote Sensing and Mapping',
    description: 'Make complex spatial evidence easier to interpret, compare and use in planning and decision-making.',
    features: ['Suitability and risk analysis', 'Remote sensing and change detection', 'Terrain, hydrology and accessibility analysis', 'Cartography, thematic maps and visual reports'],
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80',
    icon: <Map size={25} />,
  },
  {
    label: 'WORKFORCE DEVELOPMENT',
    title: 'Practical GIS, Survey and Technology Training',
    description: 'Build capability through realistic datasets, equipment-based learning and complete field-to-finish assignments.',
    features: ['QGIS, ArcGIS Pro and spatial databases', 'GNSS, total stations and levels', 'Web GIS, programming and remote sensing', 'Drones, LiDAR, bathymetry and utility mapping'],
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
    icon: <GraduationCap size={25} />,
  },
  {
    label: 'TECHNICAL PARTNERSHIP',
    title: 'Diagnostics, Pilots and Reserved Capacity',
    description: 'Start with a focused need, test the workflow and scale when the value and delivery model are clear.',
    features: ['Spatial workflow diagnostic', 'Dashboard or information-system pilot', 'Reserved processing capacity', 'Project scoping and technical advisory'],
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80',
    icon: <Workflow size={25} />,
  },
];

const audiences = [
  ['Licensed survey firms', 'Clear processing backlogs, protect deadlines and extend office capacity.'],
  ['Civil and infrastructure contractors', 'Support topographic, as-built, progress, utility and project reporting workflows.'],
  ['Government and land agencies', 'Improve records, spatial data access, operational visibility and continuity.'],
  ['Utilities and asset owners', 'Connect assets, inspections, faults, maps and maintenance information.'],
  ['NGOs and development partners', 'Capture cleaner evidence, report geographic coverage and target programmes.'],
  ['Professionals and institutions', 'Build practical, job-ready GIS, survey and emerging-technology capability.'],
];

export const HomeView: React.FC = () => {
  const { navigateToMain } = useAppStore();
  const goTo = (destination: any) => navigateToMain(destination);

  return (
    <Box sx={{ bgcolor: '#ffffff', color: brand.dark }}>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(120deg, rgba(0, 51, 102, 0.98) 0%, rgba(0, 51, 102, 0.9) 47%, rgba(46, 125, 50, 0.78) 100%), url('/images/gis1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.13, backgroundImage: 'radial-gradient(circle at 20% 20%, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ maxWidth: 890, py: { xs: 9, md: 13 } }}>
           {/* <Chip icon={<MapPin size={16} color={brand.dark} />} label="UGANDA-BASED • EAST AFRICA AND PAN-AFRICA ENGAGEMENTS" sx={{ bgcolor: brand.gold, color: brand.dark, fontWeight: 800, mb: 3, letterSpacing: 0.4, maxWidth: '100%' }} />*/}
            <Typography
  variant="h1"
  sx={{
    fontSize: { xs: '2.55rem', sm: '3.5rem', md: '5rem' },
    fontWeight: 900,
    lineHeight: 1.03,
    letterSpacing: '-0.04em',
    mb: 3,
    color: '#F8F5B5',
  }}
>
  From{' '}
  <Box component="span" sx={{ color: '#E88821' }}>
    field data
  </Box>{' '}
  to decisions that move Africa forward.
          </Typography>
            <Typography sx={{ color: '#E7F0F7', fontSize: { xs: '1.05rem', md: '1.28rem' }, lineHeight: 1.7, maxWidth: 780, mb: 4 }}>
              SPM Geosolutions helps survey and engineering teams process technical data, build practical spatial systems, and develop the people who turn geospatial information into confident action.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" size="large" onClick={() => goTo('contact')} endIcon={<ArrowRight size={19} />} sx={{ bgcolor: brand.gold, color: brand.dark, fontWeight: 800, px: 3.3, py: 1.5, borderRadius: 1.5, '&:hover': { bgcolor: '#FF9F2E' } }}>
                Start a Project Conversation
              </Button>
              <Button variant="outlined" size="large" onClick={() => goTo('services')} sx={{ borderColor: 'rgba(255,255,255,0.65)', color: '#fff', fontWeight: 700, px: 3.3, py: 1.5, borderRadius: 1.5, '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                Explore Our Services
              </Button>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 2, md: 3 }, mt: 8, pt: 3, borderTop: '1px solid rgba(255,255,255,0.25)' }}>
              {[
                ['Uganda HQ', 'Africa-facing delivery'],
                ['Field to finish', 'Practical workflows'],
                ['Project or retainer', 'Flexible engagement'],
                ['One technical partner', 'Connected capability'],
              ].map(([value, caption]) => (
                <Box key={value}><Typography sx={{ color: '#fff', fontWeight: 800, fontSize: { xs: '0.95rem', md: '1.08rem' }, mb: 0.4 }}>{value}</Typography><Typography variant="caption" sx={{ color: '#C8D9E6', lineHeight: 1.35 }}>{caption}</Typography></Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Audience strip */}
      <Box sx={{ borderBottom: '1px solid #E3EAF0', bgcolor: '#fff' }}>
        <Container maxWidth="lg"><Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', py: 2.2 }}><Typography variant="caption" sx={{ color: brand.muted, fontWeight: 800, letterSpacing: 1 }}>SUPPORTING</Typography>{['Survey firms', 'Engineering teams', 'Government', 'Utilities', 'NGOs', 'Institutions'].map((item) => <Chip key={item} label={item} size="small" sx={{ bgcolor: brand.paleBlue, color: brand.blue, fontWeight: 700 }} />)}</Box></Container>
      </Box>

      {/* Positioning */}
      <Box sx={{ py: { xs: 8, md: 11 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.92fr 1.08fr' }, gap: { xs: 5, md: 9 }, alignItems: 'center' }}>
            <Box>
              <Typography variant="overline" sx={{ color: brand.green, fontWeight: 900, letterSpacing: 2 }}>THE SPM DIFFERENCE</Typography>
              <Typography variant="h2" sx={{ color: brand.blue, fontWeight: 900, fontSize: { xs: '2rem', md: '3.1rem' }, lineHeight: 1.1, mt: 1, mb: 2 }}>Your extended technical team for spatial work.</Typography>
              <Typography sx={{ color: brand.muted, fontSize: '1.08rem', lineHeight: 1.75, mb: 3 }}>Field teams often collect more information than an office can process. Institutions may have maps and spreadsheets without a dependable system. Graduates and staff may understand theory without enough opportunity to complete a real assignment.</Typography>
              <Typography sx={{ color: brand.muted, fontSize: '1.08rem', lineHeight: 1.75, mb: 3 }}>SPM connects the processing capacity, spatial intelligence and practical training needed to move from information to useful delivery.</Typography>
              <Button onClick={() => goTo('about')} endIcon={<ArrowUpRight size={18} />} sx={{ color: brand.blue, fontWeight: 800, px: 0, '&:hover': { bgcolor: 'transparent', color: brand.green } }}>Learn how we work</Button>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {[
                { icon: <Compass size={26} />, title: 'Production pressure', text: 'Clear backlogs and protect deadlines when field data outpaces office capacity.', color: brand.paleBlue, iconColor: brand.blue },
                { icon: <Database size={26} />, title: 'Disconnected information', text: 'Create structured systems that make spatial records easier to find, update and use.', color: brand.paleGreen, iconColor: brand.green },
                { icon: <GraduationCap size={26} />, title: 'Practical skills gaps', text: 'Build capability through equipment, software and complete field-to-finish assignments.', color: brand.paleGold, iconColor: '#B65D00' },
                { icon: <ShieldCheck size={26} />, title: 'Delivery confidence', text: 'Use clear scope, review stages, secure handling and useful handover to reduce risk.', color: '#F2F3F5', iconColor: brand.dark },
              ].map((item) => <Paper key={item.title} elevation={0} sx={{ p: 2.6, border: '1px solid #E3EAF0', borderRadius: 2.5, bgcolor: '#fff' }}><Box sx={{ display: 'inline-flex', p: 1.2, borderRadius: 1.5, bgcolor: item.color, color: item.iconColor, mb: 2 }}>{item.icon}</Box><Typography variant="h6" sx={{ color: brand.dark, fontWeight: 800, mb: 1 }}>{item.title}</Typography><Typography variant="body2" sx={{ color: brand.muted, lineHeight: 1.6 }}>{item.text}</Typography></Paper>)}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Services */}
      <Box sx={{ py: { xs: 8, md: 11 }, bgcolor: '#F6F9FB' }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 760, mb: 6 }}><Typography variant="overline" sx={{ color: brand.green, fontWeight: 900, letterSpacing: 2 }}>SERVICES CLIENTS CAN BUY</Typography><Typography variant="h2" sx={{ color: brand.blue, fontWeight: 900, fontSize: { xs: '2rem', md: '3.1rem' }, lineHeight: 1.1, mt: 1, mb: 2 }}>Specific support for real project needs.</Typography><Typography sx={{ color: brand.muted, fontSize: '1.08rem', lineHeight: 1.7 }}>Whether you need processing capacity, a spatial system, analysis, mapping or practical training, we scope the work around your data, users, deliverables and operating context.</Typography></Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {serviceCards.map((service) => <Card key={service.title} elevation={0} sx={{ border: '1px solid #DFE7ED', borderRadius: 2.5, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, minHeight: 300, bgcolor: '#fff' }}><CardMedia component="img" image={service.image} alt={service.title} sx={{ width: { xs: '100%', sm: 175 }, height: { xs: 190, sm: 'auto' }, objectFit: 'cover' }} /><CardContent sx={{ p: 3, flex: 1 }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: brand.green, mb: 1.5 }}>{service.icon}<Typography variant="caption" sx={{ fontWeight: 900, letterSpacing: 1 }}>{service.label}</Typography></Box><Typography variant="h5" sx={{ color: brand.blue, fontWeight: 900, lineHeight: 1.2, mb: 1.2 }}>{service.title}</Typography><Typography variant="body2" sx={{ color: brand.muted, lineHeight: 1.6, mb: 1.5 }}>{service.description}</Typography><Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.7 }}>{service.features.map((feature) => <Box key={feature} sx={{ display: 'flex', gap: 0.8, alignItems: 'flex-start' }}><CheckCircle2 size={15} color={brand.green} style={{ marginTop: 3, flexShrink: 0 }} /><Typography variant="caption" sx={{ color: '#46535F', lineHeight: 1.45 }}>{feature}</Typography></Box>)}</Box></CardContent></Card>)}
          </Box>
          <Box sx={{ textAlign: 'center', mt: 5 }}><Button variant="outlined" onClick={() => goTo('services')} endIcon={<ArrowRight size={18} />} sx={{ borderColor: brand.blue, color: brand.blue, fontWeight: 800, px: 3, '&:hover': { borderColor: brand.green, color: brand.green } }}>View the complete service portfolio</Button></Box>
        </Container>
      </Box>

      {/* Process */}
      <Box sx={{ py: { xs: 8, md: 11 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: 6 }}><Typography variant="overline" sx={{ color: brand.green, fontWeight: 900, letterSpacing: 2 }}>A CONTROLLED DELIVERY MODEL</Typography><Typography variant="h2" sx={{ color: brand.blue, fontWeight: 900, fontSize: { xs: '2rem', md: '3.1rem' }, lineHeight: 1.1, mt: 1, mb: 2 }}>Clear from first conversation to handover.</Typography><Typography sx={{ color: brand.muted, fontSize: '1.08rem', lineHeight: 1.7 }}>The details change from project to project, but the working discipline stays consistent.</Typography></Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            {[
              ['01', 'Understand', 'We clarify the problem, users, data, constraints and intended decisions.', <MapPin size={24} />],
              ['02', 'Scope', 'We agree inputs, assumptions, outputs, responsibilities, schedule and review points.', <FileCheck2 size={24} />],
              ['03', 'Deliver', 'We process, build, analyse or train using the agreed workflow and standards.', <Workflow size={24} />],
              ['04', 'Handover', 'We provide usable outputs, documentation, guidance and next-step support.', <ArrowUpRight size={24} />],
            ].map(([number, title, text, icon]) => <Paper key={String(number)} elevation={0} sx={{ p: 3, bgcolor: brand.paleBlue, borderRadius: 2.5, minHeight: 220 }}><Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}><Typography sx={{ color: brand.gold, fontSize: '1.4rem', fontWeight: 900 }}>{number}</Typography><Box sx={{ color: brand.blue }}>{icon}</Box></Box><Typography variant="h6" sx={{ color: brand.blue, fontWeight: 900, mb: 1 }}>{title}</Typography><Typography variant="body2" sx={{ color: brand.muted, lineHeight: 1.6 }}>{text}</Typography></Paper>)}
          </Box>
        </Container>
      </Box>

      {/* Who we support */}
      <Box sx={{ py: { xs: 8, md: 11 }, bgcolor: brand.blue, color: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.75fr 1.25fr' }, gap: { xs: 5, md: 8 }, alignItems: 'start' }}>
            <Box><Typography variant="overline" sx={{ color: '#A9D7AD', fontWeight: 900, letterSpacing: 2 }}>WHO WE SUPPORT</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' },
             lineHeight: 1.1, mt: 1, mb: 2, color: '#F8F5B5', }}>Built for the people who make projects move.</Typography>
             <Typography sx={{ color: '#D8E7F1', lineHeight: 1.75, fontSize: '1.06rem' }}>Our clients work across land, infrastructure, utilities, public programmes, research and professional development. We adapt the technical response to the decision that needs to be made.</Typography></Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>{audiences.map(([title, text]) => <Box key={title} sx={{ p: 2.2, border: '1px solid rgba(255,255,255,0.18)', borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)' }}><Typography sx={{ color: '#fff', fontWeight: 800, mb: 0.7 }}>{title}</Typography><Typography variant="body2" sx={{ color: '#C8D9E6', lineHeight: 1.55 }}>{text}</Typography></Box>)}</Box>
          </Box>
        </Container>
      </Box>

      {/* Proof and academy */}
      <Box sx={{ py: { xs: 8, md: 11 }, bgcolor: '#F6F9FB' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' }, gap: 4 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, border: '1px solid #DFE7ED', bgcolor: '#fff' }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}><Box sx={{ display: 'inline-flex', p: 1.2, bgcolor: brand.paleGreen, color: brand.green, borderRadius: 1.5 }}><ShieldCheck size={25} /></Box><Typography variant="overline" sx={{ color: brand.green, fontWeight: 900, letterSpacing: 1.7 }}>WHAT PROTECTS DELIVERY</Typography></Box><Typography variant="h3" sx={{ color: brand.blue, fontWeight: 900, fontSize: { xs: '1.9rem', md: '2.5rem' }, lineHeight: 1.15, mb: 2 }}>Useful outputs are more than attractive maps.</Typography><Typography sx={{ color: brand.muted, lineHeight: 1.7, mb: 3 }}>SPM builds confidence through the way work is managed—not through unsupported promises.</Typography><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>{['Clear scope and assumptions', 'Visible QA and review stages', 'Qualified responsibility', 'Secure data handling', 'Progress communication', 'Useful handover and support'].map((item) => <Box key={item} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><CheckCircle2 size={17} color={brand.green} /><Typography variant="body2" sx={{ color: '#46535F' }}>{item}</Typography></Box>)}</Box></Paper>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: brand.green, color: '#fff' }}><GraduationCap size={34} color="#FFB35C" /><Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: '1.9rem', md: '2.45rem' }, lineHeight: 1.15, mt: 2, mb: 2 }}>Build the capability to keep using the work.</Typography><Typography sx={{ color: '#E0F0E2', lineHeight: 1.7, mb: 3 }}>SPM training connects theory to equipment, software, realistic data and complete field-to-finish assignments.</Typography><Button onClick={() => goTo('academy')} endIcon={<ArrowRight size={18} />} sx={{ color: '#fff', fontWeight: 800, px: 0, '&:hover': { bgcolor: 'transparent', color: '#FFB35C' } }}>Explore SPM Academy</Button></Paper>
          </Box>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: brand.gold }}>
        <Container maxWidth="lg"><Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 4 }}>
          <Box sx={{ maxWidth: 720 }}><Typography variant="overline" sx={{ color: brand.paleBlue, fontWeight: 900, letterSpacing: 2 }}>BRING US A PROBLEM, DATASET OR TEAM</Typography>
        <Typography variant="h2" sx={{ color: brand.green, fontWeight: 900, fontSize: { xs: '2rem', md: '3.15rem' }, lineHeight: 1.08, mt: 1, mb: 1.5 }}>Let’s make the spatial work useful.</Typography>
        <Typography sx={{ color: brand.paleBlue, lineHeight: 1.7, fontSize: '1.06rem' }}>We will help you clarify the requirement, choose a practical delivery model and identify the right next step.</Typography></Box><Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}><Button variant="contained" onClick={() => goTo('contact')} endIcon={<ArrowRight size={18} />} sx={{ bgcolor: brand.blue, color: '#fff', fontWeight: 800, px: 2.5, py: 1.4, '&:hover': { bgcolor: '#00264D' } }}>Talk to SPM</Button><Button variant="outlined" onClick={() => goTo('quote-calculator')} sx={{ borderColor: brand.dark, color: brand.dark, fontWeight: 800, px: 2.5, py: 1.4, '&:hover': { borderColor: brand.blue, bgcolor: 'rgba(255,255,255,0.2)' } }}>Request a scope</Button></Box></Box></Container>
      </Box>
    </Box>
  );
};
