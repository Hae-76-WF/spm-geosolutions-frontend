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
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FileCode2,
  Globe,
  GraduationCap,
  Layers,
  LockKeyhole,
  Map,
  Network,
  Satellite,
  Server,
  ShieldCheck,
  Smartphone,
  Workflow,
  Zap,
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

const technologyLayers = [
  {
    number: '01',
    label: 'Capture',
    title: 'Field and sensor inputs',
    description: 'RTK/GNSS, total station, UAV imagery, LiDAR, bathymetry, mobile forms, and structured observations.',
    icon: Map,
    accent: colors.orange,
  },
  {
    number: '02',
    label: 'Process',
    title: 'Convert raw data into evidence',
    description: 'Coordinate checks, raster/vector conversion, point-cloud pipelines, photogrammetry, classification, and QA/QC.',
    icon: Cpu,
    accent: colors.blue,
  },
  {
    number: '03',
    label: 'Store',
    title: 'Keep information structured',
    description: 'PostgreSQL/PostGIS, GeoPackage, Cloud Optimized GeoTIFF, GeoParquet, object storage, and metadata catalogs.',
    icon: Database,
    accent: colors.green,
  },
  {
    number: '04',
    label: 'Serve',
    title: 'Publish the right information',
    description: 'Web GIS, dashboards, OGC services, vector tiles, 3D scenes, APIs, and controlled downloads.',
    icon: Globe,
    accent: colors.orange,
  },
  {
    number: '05',
    label: 'Operate',
    title: 'Automate and observe workflows',
    description: 'Laravel APIs, Redis jobs, Docker environments, MinIO/S3-compatible storage, audit trails, and monitoring.',
    icon: Workflow,
    accent: colors.blue,
  },
  {
    number: '06',
    label: 'Decide',
    title: 'Deliver useful decisions',
    description: 'Survey packages, maps, models, dashboards, reports, operational alerts, and practical skills transfer.',
    icon: Zap,
    accent: colors.green,
  },
];

const foundationStack = [
  {
    title: 'Next.js + React + TypeScript',
    detail: 'Fast, typed web interfaces for public pages, client workspaces, dashboards, and future offline-capable experiences.',
    icon: Code2,
    status: 'CURRENT PROJECT FOUNDATION',
  },
  {
    title: 'Laravel API layer',
    detail: 'A structured backend for authentication, validation, business workflows, payments, Academy features, and integrations.',
    icon: Server,
    status: 'CURRENT PROJECT FOUNDATION',
  },
  {
    title: 'PostgreSQL + PostGIS',
    detail: 'The spatial system of record for geometry, spatial relationships, validation, indexing, analysis, and operational data.',
    icon: Database,
    status: 'CURRENT PROJECT FOUNDATION',
  },
  {
    title: 'Redis + MinIO + Docker',
    detail: 'Queues and caching, S3-compatible object storage, reproducible environments, and a clean path from local build to deployment.',
    icon: Cloud,
    status: 'CURRENT PROJECT FOUNDATION',
  },
];

const technologyDomains = [
  {
    title: 'Spatial databases',
    status: 'FOUNDATION',
    tools: 'PostgreSQL 18.6 • PostGIS 3.6.x • GiST/R-tree • geometry validation',
    description: 'Reliable spatial records, fast spatial queries, topology checks, raster support, and a traceable source of truth for client systems.',
    icon: Database,
    accent: colors.green,
  },
  {
    title: 'Web GIS and APIs',
    status: 'FOUNDATION',
    tools: 'Next.js • React • TypeScript • Laravel • REST APIs',
    description: 'Responsive client portals, map dashboards, role-aware workflows, public information pages, and integrations that fit existing teams.',
    icon: Globe,
    accent: colors.blue,
  },
  {
    title: 'Raster and vector processing',
    status: 'DEPLOYABLE',
    tools: 'GDAL/OGR • QGIS • Python • GeoPackage • COG',
    description: 'Move between formats, coordinate systems, rasters, vectors, and analysis-ready datasets without locking a client into one desktop tool.',
    icon: Layers,
    accent: colors.orange,
  },
  {
    title: 'LiDAR, point clouds and 3D',
    status: 'DEPLOYABLE',
    tools: 'PDAL • LAS/LAZ • COPC/EPT • CesiumJS • 3D Tiles',
    description: 'Process dense point clouds, classify ground, derive terrain products, and present infrastructure or terrain in interactive 3D.',
    icon: Cpu,
    accent: colors.green,
  },
  {
    title: 'Drone and remote sensing',
    status: 'DEPLOYABLE',
    tools: 'OpenDroneMap • orthomosaics • DTM/DSM • STAC • Earth Engine',
    description: 'Turn aerial imagery and satellite collections into repeatable mapping, monitoring, change-detection, and environmental workflows.',
    icon: Satellite,
    accent: colors.blue,
  },
  {
    title: 'Field and offline systems',
    status: 'DEPLOYABLE',
    tools: 'RTK/GNSS • mobile GIS • offline forms • photo and metadata capture',
    description: 'Capture structured observations in the field, work where connectivity is limited, and synchronise usable data back to the office.',
    icon: Smartphone,
    accent: colors.orange,
  },
  {
    title: 'Open geospatial services',
    status: 'DEPLOYABLE',
    tools: 'GeoServer • OGC API Features • WMS/WFS • MapLibre vector maps',
    description: 'Publish interoperable services that can be consumed by QGIS, web applications, partner systems, and future platforms.',
    icon: Network,
    accent: colors.green,
  },
  {
    title: 'Cloud and operations',
    status: 'DEPLOYABLE',
    tools: 'Docker • Redis • MinIO/S3 • queues • backups • observability',
    description: 'Separate heavy processing from web traffic, make workloads repeatable, and keep operational health visible as a project grows.',
    icon: Cloud,
    accent: colors.blue,
  },
  {
    title: 'Responsible GeoAI',
    status: 'PILOT-READY',
    tools: 'Python • PyTorch • scikit-learn • segmentation • change detection',
    description: 'Use machine learning to assist classification, extraction, anomaly detection, and review—while keeping human QA in the decision loop.',
    icon: Zap,
    accent: colors.orange,
  },
];

const solutionPaths = [
  {
    title: 'Survey and cadastral production',
    input: 'GNSS / total station / source plans',
    output: 'Checked coordinates, structured records, maps, CAD/GIS deliverables',
    value: 'Reduce rework and improve confidence in the final package.',
    icon: Map,
  },
  {
    title: 'Infrastructure and construction',
    input: 'UAV imagery / terrain / point clouds / design data',
    output: 'Orthomosaics, DTM/DSM, models, quantities, corridor dashboards',
    value: 'Give project teams a shared view of progress, terrain, and risk.',
    icon: Layers,
  },
  {
    title: 'Utilities and asset information',
    input: 'Mobile observations / GPS / asset registers',
    output: 'PostGIS information system, field tracking, operational Web GIS',
    value: 'Move from scattered records to decisions that can be located and acted on.',
    icon: Network,
  },
  {
    title: 'Environment and land intelligence',
    input: 'Satellite / drone / land-cover / time-series data',
    output: 'Change indicators, reviewable evidence, maps, and monitoring views',
    value: 'Make change visible while keeping analytical assumptions clear.',
    icon: Satellite,
  },
  {
    title: 'Professional and student training',
    input: 'Real tools, real datasets, and a practical project brief',
    output: 'Field-to-finish workflow, portfolio evidence, and reusable skills',
    value: 'Learn the technology by producing a deliverable—not memorising menus.',
    icon: GraduationCap,
  },
];

const readinessLevels = [
  {
    title: 'Ready in the current platform',
    description: 'Next.js, Laravel, PostgreSQL/PostGIS, Redis, MinIO, Docker, role-aware portals, and the existing client workflow.',
    accent: colors.green,
  },
  {
    title: 'Deployable for a project',
    description: 'GDAL, PDAL, QGIS/QField, GeoServer, MapLibre, Cesium, OpenDroneMap, OGC APIs, STAC, and cloud processing patterns.',
    accent: colors.blue,
  },
  {
    title: 'Pilot and research track',
    description: 'GeoAI, automated feature extraction, change detection, live sensors, 3D digital twins, and advanced decision support.',
    accent: colors.orange,
  },
];

const technologyReferences = [
  { label: 'PostgreSQL', href: 'https://www.postgresql.org/docs/current/' },
  { label: 'PostGIS', href: 'https://postgis.net/docs/' },
  { label: 'GDAL', href: 'https://gdal.org/en/stable/about.html' },
  { label: 'PDAL', href: 'https://pdal.io/en/latest/' },
  { label: 'OGC API Features', href: 'https://www.ogc.org/standards/ogcapi-features/' },
  { label: 'STAC', href: 'https://www.ogc.org/standards/stac/' },
  { label: 'MapLibre', href: 'https://maplibre.org/maplibre-gl-js/docs/' },
  { label: 'CesiumJS', href: 'https://cesium.com/platform/cesiumjs/' },
  { label: 'OpenDroneMap', href: 'https://www.opendronemap.org/' },
  { label: 'OpenTelemetry', href: 'https://opentelemetry.io/docs/' },
];

export const CodeArchitectureView: React.FC = () => {
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
            background: `linear-gradient(120deg, ${colors.green} 0%, #075C43 48%, ${colors.dark} 100%)`,
            '&::after': {
              content: '""',
              position: 'absolute',
              width: 420,
              height: 420,
              right: -170,
              top: -220,
              border: '1px solid rgba(248, 245, 181, 0.24)',
              borderRadius: '50%',
              boxShadow: '0 0 0 42px rgba(248,245,181,0.05), 0 0 0 84px rgba(248,245,181,0.04)',
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' }, gap: { xs: 4, md: 7 }, alignItems: 'center' }}>
            <Box>
              <Chip
                icon={<Code2 size={16} color={colors.dark} />}
                label="SPM TECHNOLOGY • FIELD TO FINISH"
                sx={{ bgcolor: colors.cream, color: colors.dark, fontWeight: 900, mb: 2.5, '& .MuiChip-icon': { color: colors.dark } }}
              />
              <Typography variant="h1" sx={{ color: 'white', fontWeight: 900, fontSize: { xs: '2.45rem', md: '4.35rem' }, lineHeight: 1.03, letterSpacing: '-0.045em', mb: 2.5 }}>
                Technology that turns spatial data into confident decisions.
              </Typography>
              <Typography variant="body1" sx={{ color: '#EAF4EF', lineHeight: 1.75, maxWidth: 720, fontSize: { md: '1.1rem' } }}>
                SPM combines modern web engineering, spatial databases, field technology, remote sensing, open standards, and applied intelligence to help clients deliver work and help students learn the workflows behind it.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3.5 }}>
                <Button variant="contained" onClick={() => navigateToMain('contact')} endIcon={<ArrowRight size={18} />} sx={{ bgcolor: colors.orange, color: colors.dark, fontWeight: 900, '&:hover': { bgcolor: '#F09A42' } }}>
                  Discuss a technology need
                </Button>
                <Button variant="outlined" onClick={() => navigateToMain('academy')} endIcon={<ArrowUpRight size={17} />} sx={{ borderColor: 'rgba(255,255,255,0.65)', color: 'white', fontWeight: 800, '&:hover': { borderColor: colors.cream, bgcolor: 'rgba(248,245,181,0.08)' } }}>
                  Learn the stack
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                {['Modular', 'Interoperable', 'Human-reviewed', 'Deployment-ready'].map((label) => (
                  <Chip key={label} label={label} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.10)', color: '#EAF4EF', border: '1px solid rgba(255,255,255,0.18)', fontWeight: 700 }} />
                ))}
              </Box>
            </Box>

            <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.20)', backdropFilter: 'blur(8px)' }}>
              <Typography variant="overline" sx={{ color: colors.cream, fontWeight: 900, letterSpacing: 1.5 }}>THE DELIVERY STACK</Typography>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 900, mt: 0.5, mb: 2.5 }}>One connected path</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {technologyLayers.map((layer, index) => {
                  const Icon = layer.icon;
                  return (
                    <Box key={layer.number} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, p: 1.25, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.08)' }}>
                      <Box sx={{ width: 34, height: 34, borderRadius: 1.5, display: 'grid', placeItems: 'center', bgcolor: 'rgba(255,255,255,0.10)', color: layer.accent, flexShrink: 0 }}><Icon size={18} /></Box>
                      <Box sx={{ minWidth: 0, flexGrow: 1 }}><Typography variant="caption" sx={{ display: 'block', color: colors.cream, fontWeight: 900 }}>{layer.number} · {layer.label}</Typography><Typography variant="body2" sx={{ color: 'white', fontWeight: 800 }}>{layer.title}</Typography></Box>
                      {index < technologyLayers.length - 1 && <ArrowRight size={15} color="#A7C7BB" />}
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </Box>
        </Paper>

        {/* Positioning */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 8, borderRadius: 3, bgcolor: colors.cream, border: '1px solid #E6E0A3' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' }, gap: { xs: 3, md: 6 }, alignItems: 'center' }}>
            <Box>
              <Typography variant="overline" sx={{ color: colors.orange, fontWeight: 900, letterSpacing: 1.5 }}>OUR TECHNOLOGY PRINCIPLE</Typography>
              <Typography variant="h3" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, lineHeight: 1.1 }}>The best stack is the one that delivers.</Typography>
            </Box>
            <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.75 }}>
              SPM does not choose tools because they are fashionable. We choose them when they improve a workflow, reduce technical risk, create a usable deliverable, or help a team build capability it can carry forward. That keeps our technology ambitious, practical, and honest.
            </Typography>
          </Box>
        </Paper>

        {/* Current foundation 
        <Box sx={{ mb: 9 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            <Box>
              <Typography variant="overline" sx={{ color: colors.green, fontWeight: 900, letterSpacing: 1.5 }}>CURRENT PROJECT FOUNDATION</Typography>
              <Typography variant="h2" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, fontSize: { xs: '2.2rem', md: '3.1rem' } }}>The platform underneath SPM.</Typography>
            </Box>
            <Chip label="Already shaping this platform" icon={<CheckCircle2 size={16} />} sx={{ bgcolor: '#E2F0EA', color: colors.green, fontWeight: 900 }} />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            {foundationStack.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} elevation={0} sx={{ height: '100%', borderRadius: 3, bgcolor: 'white', border: `1px solid ${colors.divider}` }}>
                  <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}><Box sx={{ width: 46, height: 46, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: '#EAF4EF', color: colors.green }}><Icon size={23} /></Box><Chip label={item.status} size="small" sx={{ bgcolor: '#F4F8FC', color: colors.blue, fontWeight: 800, fontSize: '0.68rem' }} /></Box>
                    <Typography variant="h5" sx={{ color: colors.dark, fontWeight: 900, mb: 1 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.7 }}>{item.detail}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        */}

        {/* Technology domains */}
        <Box sx={{ mb: 9 }}>
          <Box sx={{ maxWidth: 760, mb: 4 }}>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 900, letterSpacing: 1.5 }}>THE TECHNOLOGY RADAR</Typography>
            <Typography variant="h2" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, mb: 1.5, fontSize: { xs: '2.2rem', md: '3.1rem' } }}>A stack for the whole spatial workflow.</Typography>
            <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.75 }}>
              From a field observation to an operational dashboard, the technology choice changes with the job. These are the tools and patterns SPM can use, combine, and teach across Uganda, East Africa, and cross-border projects.
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
            {technologyDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <Card key={domain.title} elevation={0} sx={{ height: '100%', borderRadius: 3, bgcolor: 'white', border: `1px solid ${colors.divider}`, overflow: 'hidden' }}>
                  <Box sx={{ height: 5, bgcolor: domain.accent }} />
                  <CardContent sx={{ p: { xs: 2.75, md: 3 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 2 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: `${domain.accent}18`, color: domain.accent }}><Icon size={22} /></Box>
                      <Chip label={domain.status} size="small" sx={{ bgcolor: domain.status === 'FOUNDATION' ? '#E2F0EA' : domain.status === 'DEPLOYABLE' ? '#EEF5FC' : colors.cream, color: domain.status === 'FOUNDATION' ? colors.green : domain.status === 'DEPLOYABLE' ? colors.blue : colors.orange, fontWeight: 900, fontSize: '0.66rem' }} />
                    </Box>
                    <Typography variant="h5" sx={{ color: colors.dark, fontWeight: 900, mb: 1 }}>{domain.title}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: colors.blue, fontWeight: 800, lineHeight: 1.5, mb: 1.25 }}>{domain.tools}</Typography>
                    <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.65 }}>{domain.description}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Client and student pathways */}
        <Box sx={{ mb: 9 }}>
          <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: 4 }}>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 900, letterSpacing: 1.5 }}>FROM TECHNOLOGY TO DELIVERY</Typography>
            <Typography variant="h2" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, mb: 1.5, fontSize: { xs: '2.2rem', md: '3.1rem' } }}>What clients and students can build with it.</Typography>
            <Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.75 }}>Technology matters when it creates a clear result. Each pathway below connects a real input to a usable output.</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {solutionPaths.map((path, index) => {
              const Icon = path.icon;
              return (
                <Paper key={path.title} elevation={0} sx={{ p: { xs: 2.25, md: 2.5 }, borderRadius: 2.5, bgcolor: index % 2 === 0 ? 'white' : '#F4F8FC', border: `1px solid ${colors.divider}`, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.95fr 1fr 1fr 1.05fr' }, gap: { xs: 1.5, md: 2.5 }, alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center' }}><Box sx={{ width: 42, height: 42, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: '#EAF4EF', color: colors.green, flexShrink: 0 }}><Icon size={21} /></Box><Typography variant="subtitle1" sx={{ color: colors.dark, fontWeight: 900 }}>{path.title}</Typography></Box>
                  <Box><Typography variant="caption" sx={{ display: 'block', color: colors.orange, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5 }}>Input</Typography><Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.5 }}>{path.input}</Typography></Box>
                  <Box><Typography variant="caption" sx={{ display: 'block', color: colors.blue, fontWeight: 900, textTransform: 'uppercase', letterSpacing: 0.5 }}>Output</Typography><Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.5 }}>{path.output}</Typography></Box>
                  <Box sx={{ p: 1.25, borderRadius: 1.5, bgcolor: colors.cream }}><Typography variant="caption" sx={{ color: colors.dark, fontWeight: 800, lineHeight: 1.5 }}>{path.value}</Typography></Box>
                </Paper>
              );
            })}
          </Box>
        </Box>

        {/* Readiness and trust */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 9 }}>
          <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: colors.dark, color: 'white' }}>
            <Typography variant="overline" sx={{ color: colors.cream, fontWeight: 900, letterSpacing: 1.5 }}>HONEST TECHNOLOGY MATURITY</Typography>
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 900, mt: 0.75, mb: 2 }}>Know what is ready, deployable, or experimental.</Typography>
            <Typography variant="body1" sx={{ color: '#CBD5E1', lineHeight: 1.7, mb: 3 }}>A credible technology partner makes the boundary visible. We do not present a research idea as a production deployment.</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {readinessLevels.map((level) => (
                <Box key={level.title} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start', p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: level.accent, mt: 0.6, flexShrink: 0 }} /><Box><Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 900 }}>{level.title}</Typography><Typography variant="body2" sx={{ color: '#CBD5E1', lineHeight: 1.55 }}>{level.description}</Typography></Box>
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, bgcolor: 'white', border: `1px solid ${colors.divider}` }}>
            <Typography variant="overline" sx={{ color: colors.green, fontWeight: 900, letterSpacing: 1.5 }}>WHY CLIENTS CAN TRUST THE STACK</Typography>
            <Typography variant="h3" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, mb: 2 }}>Modern does not have to mean fragile.</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
              {[
                { title: 'Open standards', detail: 'Use OGC APIs, common geospatial formats, and documented interfaces so data can move between tools.', icon: Globe },
                { title: 'Visible QA/QC', detail: 'Validate coordinates, geometry, metadata, processing steps, and final outputs before handover.', icon: CheckCircle2 },
                { title: 'Security and access', detail: 'Separate public, client, and administration surfaces with controlled roles, storage, and audit paths.', icon: LockKeyhole },
                { title: 'Human-in-the-loop', detail: 'Use automation and AI to assist technical teams, not to hide assumptions or replace professional review.', icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon;
                return <Box key={item.title} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}><Icon size={21} color={colors.green} style={{ marginTop: 2, flexShrink: 0 }} /><Box><Typography variant="subtitle2" sx={{ color: colors.dark, fontWeight: 900 }}>{item.title}</Typography><Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.55 }}>{item.detail}</Typography></Box></Box>;
              })}
            </Box>
          </Paper>
        </Box>

        {/* Official references */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, mb: 9, borderRadius: 3, bgcolor: '#F4F8FC', border: `1px solid ${colors.divider}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <Box><Typography variant="overline" sx={{ color: colors.blue, fontWeight: 900, letterSpacing: 1.5 }}>LEARN THE TECHNOLOGY</Typography><Typography variant="h4" sx={{ color: colors.dark, fontWeight: 900, mt: 0.5 }}>Official tools and standards behind the stack.</Typography></Box><ExternalLink size={22} color={colors.blue} />
          </Box>
          <Typography variant="body2" sx={{ color: colors.muted, lineHeight: 1.7, mb: 2.5 }}>We use official documentation and open standards as the reference point for training, integration, and responsible deployment.</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {technologyReferences.map((reference) => <Button key={reference.label} component="a" href={reference.href} target="_blank" rel="noreferrer" variant="outlined" size="small" endIcon={<ArrowUpRight size={14} />} sx={{ borderColor: colors.blue, color: colors.blue, fontWeight: 800, '&:hover': { bgcolor: 'white', borderColor: colors.green, color: colors.green } }}>{reference.label}</Button>)}
          </Box>
        </Paper>

        {/* CTA */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: colors.cream, border: '1px solid #E6E0A3' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ maxWidth: 720 }}><Typography variant="overline" sx={{ color: colors.orange, fontWeight: 900, letterSpacing: 1.5 }}>PUT THE STACK TO WORK</Typography><Typography variant="h3" sx={{ color: colors.dark, fontWeight: 900, mt: 0.75, mb: 1 }}>Have a workflow to improve or a skill to build?</Typography><Typography variant="body1" sx={{ color: colors.muted, lineHeight: 1.7 }}>Bring the data, the bottleneck, or the learning goal. We will help shape a technology path that fits the outcome.</Typography></Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, flexShrink: 0 }}><Button variant="contained" onClick={() => navigateToMain('contact')} endIcon={<ArrowRight size={17} />} sx={{ bgcolor: colors.green, '&:hover': { bgcolor: '#075C43' }, fontWeight: 900 }}>Discuss a project</Button><Button variant="outlined" onClick={() => navigateToMain('services')} endIcon={<ArrowUpRight size={17} />} sx={{ borderColor: colors.blue, color: colors.blue, fontWeight: 800 }}>View services</Button></Box>
          </Box>
        </Paper>

        <Divider sx={{ mt: 5, borderColor: colors.divider }} />
      </Container>
    </Box>
  );
};
