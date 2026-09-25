import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CheckCircle2, ArrowRight, Calculator } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const PricingView: React.FC = () => {
  const { navigateToMain } = useAppStore();

  const plans = [
    {
      title: 'Ad-Hoc Cadastral QA',
      subtitle: 'For independent licensed surveyors and valuation firms',
      priceUgx: '350,000',
      period: 'per deed plan / traverse',
      features: [
        'Bowditch traverse balancing & angular adjustment',
        'Clarke 1880 / WGS84 coordinate transformation',
        'SRB-formatted Deed Plan CAD DWG / PDF output',
        '48-hour standard turnaround',
        'Single client login & audit trail',
      ],
      cta: 'Calculate Job Cost',
      popular: false,
    },
    {
      title: 'Dedicated Firm Retainer',
      subtitle: 'For active survey practices requiring continuous turnaround',
      priceUgx: '6,000,000',
      period: 'per month (up to 50 hours)',
      features: [
        'Priority queue: 4-hour emergency turnaround SLA',
        'Custom CAD title block with your firm stamp & logo',
        'Direct AWS S3 multipart high-speed raw file ingestion',
        'Full DeLIS / PostGIS parcel topology auditing',
        'Monthly reconciliation with MTN MoMo & Airtel B2B',
        'Dedicated senior geomatics analyst assigned',
      ],
      cta: 'Subscribe to Retainer',
      popular: true,
    },
    {
      title: 'Enterprise Infrastructure GIS',
      subtitle: 'For UNRA, MEMD, NWSC, and large civil contractors',
      priceUgx: 'Custom',
      period: 'milestone & SLA based',
      features: [
        'Multi-terabyte drone LiDAR & bathymetric processing',
        'Dedicated PostgreSQL / PostGIS 16 instance on cloud',
        'Interactive Leaflet / MapLibre enterprise web dashboards',
        'Staff training through SPM Academy masterclasses',
        'Custom REST APIs and GeoServer WMS/WFS pipelines',
      ],
      cta: 'Contact Geodesy Team',
      popular: false,
    },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg">
        
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: '#034732', fontWeight: 800, letterSpacing: 2 }}>
            TRANSPARENT GEOMATICS PRICING
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#0f172a', mt: 1, mb: 2 }}>
            Fee Scales & Retainer Options
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 700, mx: 'auto' }}>
            Built around the official Surveyors Registration Board (SRB) fee structures with transparent rates for raw data processing, QA balancing, and cloud GIS retainers.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mb: 8 }}>
          {plans.map((p, idx) => (
            <Card
              key={idx}
              elevation={p.popular ? 4 : 1}
              sx={{
                borderRadius: 3,
                border: p.popular ? '2px solid #034732' : '1px solid #e2e8f0',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {p.popular && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: '#034732',
                    color: 'white',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}
                >
                  MOST POPULAR
                </Box>
              )}

              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 1 }}>
                  {p.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 3, minHeight: 40 }}>
                  {p.subtitle}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#034732' }}>
                    {p.priceUgx === 'Custom' ? 'Custom' : `UGX ${p.priceUgx}`}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                    {p.period}
                  </Typography>
                </Box>

                <List dense sx={{ mb: 3 }}>
                  {p.features.map((feat, fidx) => (
                    <ListItem key={fidx} sx={{ px: 0, py: 0.8 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <CheckCircle2 size={18} color="#16a34a" />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="body2" sx={{ color: '#334155' }}>{feat}</Typography>}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <Box sx={{ p: 4, pt: 0 }}>
                <Button
                  variant={p.popular ? 'contained' : 'outlined'}
                  fullWidth
                  size="large"
                  onClick={() => navigateToMain('quote-calculator')}
                  sx={{
                    bgcolor: p.popular ? '#034732' : 'transparent',
                    borderColor: '#034732',
                    color: p.popular ? 'white' : '#034732',
                    fontWeight: 700,
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: p.popular ? '#023324' : '#f0fdf4',
                    },
                  }}
                >
                  {p.cta}
                </Button>
              </Box>
            </Card>
          ))}
        </Box>

        {/* Quick Calculator Callout */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ p: 2, bgcolor: '#fef3c7', borderRadius: 2 }}>
              <Calculator size={32} color="#b45309" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
                Need a specific site or route estimate?
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Use our interactive quotation calculator to configure land acreage, region, terrain multiplier, and SLA.
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => navigateToMain('quote-calculator')}
            endIcon={<ArrowRight size={18} />}
            sx={{
              bgcolor: '#034732',
              '&:hover': { bgcolor: '#023324' },
              fontWeight: 700,
              px: 3,
              py: 1.2,
              whiteSpace: 'nowrap',
            }}
          >
            Open Calculator
          </Button>
        </Paper>

      </Container>
    </Box>
  );
};
