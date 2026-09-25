'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Compass,
  Database,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Target,
  Users,
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

const companyFacts = [
  {
    label: 'Established',
    value: '2025',
    detail: 'A focused geospatial practice built for practical delivery.',
    icon: Building2,
  },
  {
    label: 'Company',
    value: 'Private limited liability',
    detail: 'SPM Geosolutions (U) Limited.',
    icon: ShieldCheck,
  },
  {
    label: 'Base',
    value: 'Uganda',
    detail: 'Designed for work in Uganda and across East Africa.',
    icon: MapPin,
  },
  {
    label: 'Engagements',
    value: 'National to cross-border',
    detail: 'Supporting projects at the scale and context required.',
    icon: Compass,
  },
];

const values = [
  {
    title: 'Precision',
    description: 'We treat data quality, consistency, and traceability as part of the deliverable.',
  },
  {
    title: 'Integrity',
    description: 'We communicate clearly, protect information, and stand behind the work we undertake.',
  },
  {
    title: 'Innovation',
    description: 'We apply useful tools and emerging technologies where they improve the workflow.',
  },
  {
    title: 'Partnership',
    description: 'We work as an extension of client teams and adapt to the project context.',
  },
  {
    title: 'Knowledge-sharing',
    description: 'We leave clients and practitioners better able to use and manage their spatial information.',
  },
];

const supportPillars = [
  {
    title: 'Data Collection & Processing',
    description: 'Turn field observations and source data into clean, structured information that teams can use with confidence.',
    icon: MapPin,
    accent: colors.orange,
  },
  {
    title: 'White-Label Back-Office Production',
    description: 'Give survey and technical firms dependable production capacity that fits their client-facing workflow.',
    icon: Database,
    accent: colors.blue,
  },
  {
    title: 'Practical Field-to-Finish Training',
    description: 'Build capability through applied learning that connects equipment, software, field practice, and final deliverables.',
    icon: GraduationCap,
    accent: colors.green,
  },
];

const audiences = [
  {
    title: 'Survey companies',
    description: 'Processing capacity, spatial systems, and practical support that help teams deliver consistently.',
  },
  {
    title: 'Infrastructure & engineering teams',
    description: 'Organised spatial information for planning, design, construction, monitoring, and reporting.',
  },
  {
    title: 'Utilities & asset owners',
    description: 'Reliable location intelligence for assets, networks, field operations, and maintenance decisions.',
  },
  {
    title: 'Government agencies & NGOs',
    description: 'Fit-for-purpose mapping, analysis, data management, and capacity-building support.',
  },
  {
    title: 'Professionals & institutions',
    description: 'Practical training and technical guidance for people building careers and programmes around spatial data.',
  },
];

const deliverySteps = [
  'Clarify the decision, deliverable, scope, and constraints.',
  'Process, structure, and validate the spatial information.',
  'Package outputs so they are usable by the people who need them.',
  'Document the workflow and transfer practical capability where required.',
];

export const AboutView: React.FC = () => {
  const { navigateToMain } = useAppStore();

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
            background: `linear-gradient(120deg, ${colors.green} 0%, #075c43 52%, ${colors.dark} 100%)`,
            '&::after': {
              content: '""',
              position: 'absolute',
              width: 360,
              height: 360,
              right: -120,
              top: -160,
              border: `1px solid rgba(248, 245, 181, 0.22)`,
              borderRadius: '50%',
              boxShadow: `0 0 0 38px rgba(248, 245, 181, 0.05), 0 0 0 76px rgba(248, 245, 181, 0.04)`,
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.08fr 0.92fr' },
              gap: { xs: 4, md: 7 },
              alignItems: 'center',
            }}
          >
            <Box>
              <Chip
                icon={<ShieldCheck size={16} color={colors.dark} />}
                label="SPM GEOSOLUTIONS (U) LIMITED • ESTABLISHED 2025"
                sx={{
                  bgcolor: colors.cream,
                  color: colors.dark,
                  fontWeight: 800,
                  mb: 2.5,
                  '& .MuiChip-icon': { color: colors.dark },
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  color: 'white',
                  fontWeight: 900,
                  fontSize: { xs: '2.45rem', md: '4.3rem' },
                  lineHeight: 1.03,
                  letterSpacing: '-0.045em',
                  mb: 2.5,
                }}
              >
                From field data to decision-ready intelligence.
              </Typography>
              <Typography variant="body1" sx={{ color: '#EAF4EF', lineHeight: 1.7, maxWidth: 680, fontSize: { md: '1.1rem' } }}>
                SPM Geosolutions is a Uganda-based geospatial delivery firm supporting survey companies, infrastructure teams, utilities, government agencies, NGOs, and professionals across East Africa.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3.5 }}>
                <Button
                  variant="contained"
                  onClick={() => navigateToMain('contact')}
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    bgcolor: colors.orange,
                    color: colors.dark,
                    fontWeight: 800,
                    '&:hover': { bgcolor: '#F09A42' },
                  }}
                >
                  Talk to SPM
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

            {/* A simple visual model of the company promise */}
            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.20)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography variant="overline" sx={{ color: colors.cream, fontWeight: 800, letterSpacing: 1.5 }}>
                THE SPM APPROACH
              </Typography>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 800, mt: 0.5, mb: 2.5 }}>
                One connected workflow
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {[
                  { label: 'Field data', detail: 'Capture and source information', icon: MapPin, color: colors.orange },
                  { label: 'Spatial systems', detail: 'Process, structure, and manage it', icon: Database, color: '#8CC5F2' },
                  { label: 'Better decisions', detail: 'Deliver outputs people can use', icon: Target, color: colors.cream },
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <Box key={step.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 38, height: 38, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'rgba(255,255,255,0.12)', color: step.color, flexShrink: 0 }}>
                        <Icon size={20} />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 800 }}>{step.label}</Typography>
                        <Typography variant="caption" sx={{ color: '#C7DED4' }}>{step.detail}</Typography>
                      </Box>
                      {index < 2 && <ArrowRight size={15} color="#A7C7BB" style={{ marginLeft: 'auto' }} />}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Company snapshot */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 1.5, mb: 9 }}>
          {companyFacts.map((fact) => {
            const Icon = fact.icon;
            return (
              <Paper key={fact.label} elevation={0} sx={{ p: { xs: 2, md: 2.5 }, minHeight: 154, border: `1px solid ${colors.divider}`, borderRadius: 2.5, bgcolor: 'white' }}>
                <Icon size={21} color={colors.green} />
                <Typography variant="caption" sx={{ display: 'block', color: colors.muted, fontWeight: 800, mt: 1.25, textTransform: 'uppercase', letterSpacing: 0.7 }}>
                  {fact.label}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: colors.dark, fontWeight: 800, lineHeight: 1.25, mt: 0.5 }}>
                  {fact.value}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', color: colors.muted, lineHeight: 1.45, mt: 0.5 }}>
                  {fact.detail}
                </Typography>
              </Paper>
            );
          })}
        </Box>

        {/* Story */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' }, gap: { xs: 4, md: 8 }, alignItems: 'start', mb: 10 }}>
          <Box>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 800, letterSpacing: 1.5 }}>
              WHO WE ARE
            </Typography>
            <Typography variant="h2" sx={{ color: colors.dark, fontWeight: 900, fontSize: { xs: '2.2rem', md: '3.15rem' }, lineHeight: 1.08, mt: 1, mb: 2.5 }}>
              A practical partner for geospatial delivery.
            </Typography>
            <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.75, mb: 2 }}>
              Clients often need more than a field exercise or a software tool. They need clean data, dependable processing, usable systems, and people who can carry the workflow forward. SPM brings those needs together in one focused geospatial practice.
            </Typography>
            <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.75, mb: 2 }}>
              Our work combines GIS consultancy, land surveying data processing, spatial systems, and hands-on technical training. We support teams that need to complete work, control information, and build practical capability without adding unnecessary complexity.
            </Typography>
            <Typography variant="body2" sx={{ color: colors.green, fontWeight: 800, lineHeight: 1.6, mt: 3 }}>
              SPM Geosolutions, incorporating the foundations of GeoNexus.
            </Typography>
          </Box>

          <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: colors.cream, border: `1px solid #E6E0A3` }}>
            <Typography variant="overline" sx={{ color: colors.orange, fontWeight: 900, letterSpacing: 1.5 }}>
              WHAT MAKES THE MODEL USEFUL
            </Typography>
            <Typography variant="h4" sx={{ color: colors.dark, fontWeight: 900, mt: 1, mb: 2 }}>
              Capability that travels with the project.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                ['Practical', 'Translate requirements into outputs teams can actually use.'],
                ['Integrated', 'Connect collection, processing, storage, analysis, and training.'],
                ['Transferable', 'Document workflows and build capability beyond a single assignment.'],
              ].map(([title, description]) => (
                <Box key={title} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start' }}>
                  <CheckCircle2 size={20} color={colors.green} style={{ marginTop: 2, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: colors.dark, fontWeight: 900 }}>{title}</Typography>
                    <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.55 }}>{description}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Vision and mission */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 800, letterSpacing: 1.5 }}>
              DIRECTION
            </Typography>
            <Typography variant="h3" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75 }}>
              What SPM is building
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.35fr' }, gap: 2 }}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: colors.green, color: 'white' }}>
              <Compass size={28} color={colors.cream} />
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 900, mt: 2, mb: 1.5 }}>Our vision</Typography>
              <Typography variant="body1" sx={{ color: '#EAF4EF', lineHeight: 1.7 }}>
                To be the leading partner of choice for integrated geospatial consultancy and practical solutions, data processing, and capacity-building services.
              </Typography>
            </Paper>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: 'white', border: `1px solid ${colors.divider}` }}>
              <Workflow size={28} color={colors.blue} />
              <Typography variant="h4" sx={{ color: colors.dark, fontWeight: 900, mt: 2, mb: 1.5 }}>Our mission</Typography>
              <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.7 }}>
                To deliver accurate, timely, and technically sound geospatial solutions that enable survey firms, institutions, and infrastructure projects to succeed, while building a skilled pipeline of GIS and survey professionals through practical, technology-driven training.
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Support pillars */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 2, flexWrap: 'wrap', mb: 4 }}>
            <Box>
              <Typography variant="overline" sx={{ color: colors.green, fontWeight: 800, letterSpacing: 1.5 }}>
                HOW WE HELP
              </Typography>
              <Typography variant="h3" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75 }}>
                Three ways to extend your team.
              </Typography>
            </Box>
            <Button onClick={() => navigateToMain('services')} endIcon={<ArrowUpRight size={17} />} sx={{ color: colors.blue, fontWeight: 800 }}>
              See all services
            </Button>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            {supportPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} elevation={0} sx={{ height: '100%', borderRadius: 3, border: `1px solid ${colors.divider}`, bgcolor: 'white', overflow: 'hidden' }}>
                  <Box sx={{ height: 5, bgcolor: pillar.accent }} />
                  <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: `${pillar.accent}18`, color: pillar.accent, mb: 2.5 }}>
                      <Icon size={24} />
                    </Box>
                    <Typography variant="h5" sx={{ color: colors.dark, fontWeight: 900, mb: 1.25 }}>{pillar.title}</Typography>
                    <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.7 }}>{pillar.description}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Who we serve */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ maxWidth: 720, mb: 4 }}>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 800, letterSpacing: 1.5 }}>
              WHO WE SERVE
            </Typography>
            <Typography variant="h3" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, mb: 1.5 }}>
              Built around real delivery teams.
            </Typography>
            <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.7 }}>
              SPM works with organisations and professionals who depend on accurate spatial information to plan, build, manage, and make decisions.
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 1.5 }}>
            {audiences.map((audience, index) => (
              <Paper key={audience.title} elevation={0} sx={{ p: 2.5, minHeight: 190, borderRadius: 2.5, border: `1px solid ${colors.divider}`, bgcolor: index % 2 === 0 ? 'white' : '#F4F8FC' }}>
                <Users size={21} color={index % 2 === 0 ? colors.green : colors.blue} />
                <Typography variant="subtitle1" sx={{ color: colors.dark, fontWeight: 900, lineHeight: 1.25, mt: 1.5, mb: 1 }}>{audience.title}</Typography>
                <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.6 }}>{audience.description}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Delivery principles */}
        <Paper elevation={0} sx={{ mb: 10, p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: colors.dark, color: 'white' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' }, gap: { xs: 3, md: 7 }, alignItems: 'center' }}>
            <Box>
              <Typography variant="overline" sx={{ color: colors.cream, fontWeight: 800, letterSpacing: 1.5 }}>
                OUR DELIVERY PRINCIPLES
              </Typography>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 900, mt: 0.75, mb: 1.5 }}>
                Quality you can inspect.
              </Typography>
              <Typography variant="body1" sx={{ color: '#CBD5E1', lineHeight: 1.7 }}>
                We make the workflow visible, the outputs usable, and the handover practical. That is how clients gain confidence in the work without relying on unsupported “best” claims.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {deliverySteps.map((step, index) => (
                <Box key={step} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: colors.orange, color: colors.dark, fontWeight: 900, fontSize: '0.85rem', flexShrink: 0 }}>
                    {index + 1}
                  </Box>
                  <Typography variant="body2" sx={{ color: '#F1F5F9', lineHeight: 1.55, pt: 0.35 }}>{step}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Values */}
        <Box sx={{ mb: 9 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 800, letterSpacing: 1.5 }}>
              WHAT GUIDES US
            </Typography>
            <Typography variant="h3" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75 }}>
              Our values in practice
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }, gap: 1.5 }}>
            {values.map((value, index) => (
              <Paper key={value.title} elevation={0} sx={{ p: 2.5, minHeight: 190, borderRadius: 2.5, bgcolor: 'white', border: `1px solid ${colors.divider}`, borderTop: `4px solid ${index % 2 === 0 ? colors.green : colors.blue}` }}>
                <Typography variant="h6" sx={{ color: colors.dark, fontWeight: 900, mb: 1 }}>{value.title}</Typography>
                <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.65 }}>{value.description}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* CTA */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: colors.cream, border: `1px solid #E6E0A3` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ maxWidth: 680 }}>
              <Typography variant="overline" sx={{ color: colors.orange, fontWeight: 900, letterSpacing: 1.5 }}>
                LET&apos;S BUILD THE RIGHT WORKFLOW
              </Typography>
              <Typography variant="h3" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, mb: 1 }}>
                Have a spatial delivery challenge?
              </Typography>
              <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.7 }}>
                Tell us what needs to be collected, processed, managed, or learned. We will help you shape the next practical step.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, flexShrink: 0 }}>
              <Button variant="contained" onClick={() => navigateToMain('contact')} endIcon={<ArrowRight size={18} />} sx={{ bgcolor: colors.green, '&:hover': { bgcolor: '#075C43' }, fontWeight: 800 }}>
                Start a conversation
              </Button>
              <Button variant="outlined" onClick={() => navigateToMain('academy')} sx={{ borderColor: colors.blue, color: colors.blue, fontWeight: 800 }}>
                Explore the Academy
              </Button>
            </Box>
          </Box>
        </Paper>

        <Divider sx={{ mt: 5, borderColor: colors.divider }} />
      </Container>
    </Box>
  );
};
