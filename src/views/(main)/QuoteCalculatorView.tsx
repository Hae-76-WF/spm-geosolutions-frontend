import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Calculator, CheckCircle2, ShieldCheck, Download, ArrowRight, MapPin, Layers } from 'lucide-react';
import { spmApi } from '../../services/api';
import { useAppStore } from '../../store/useAppStore';

export const QuoteCalculatorView: React.FC = () => {
  const { showSnackbar, navigateToMain } = useAppStore();

  const [surveyDomain, setSurveyDomain] = useState('cadastral');
  const [landAreaAcres, setLandAreaAcres] = useState('5');
  const [corridorLengthKm, setCorridorLengthKm] = useState('10');
  const [region, setRegion] = useState('Central (Kampala/Wakiso/Mukono)');
  const [terrainComplexity, setTerrainComplexity] = useState('standard_undulating');
  const [urgency, setUrgency] = useState('standard');
  const [includeTitleProcessing, setIncludeTitleProcessing] = useState(true);

  const [isCalculating, setIsCalculating] = useState(false);
  const [quoteResult, setQuoteResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setErrorMsg(null);

    try {
      const res = await spmApi.requestQuotation({
        surveyDomain,
        landAreaAcres: Number(landAreaAcres),
        corridorLengthKm: Number(corridorLengthKm),
        region,
        terrainComplexity,
        urgency,
        includeTitleProcessing,
      });

      setQuoteResult(res);
      showSnackbar('Quotation generated based on SRB Uganda fee scales!', 'success');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Quotation engine failed.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Box sx={{ minHeight: '85vh', py: 8, bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg">
        {/* Header with Visual Banner */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            mb: 5,
            borderRadius: 3,
            color: 'white',
            backgroundImage: `linear-gradient(135deg, rgba(3, 71, 50, 0.94), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box sx={{ maxWidth: 800 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Calculator size={28} color="#eab308" />
              <Typography variant="overline" sx={{ color: '#eab308', fontWeight: 800, letterSpacing: 1.5 }}>
                OFFICIAL RATE ESTIMATOR
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              Interactive Survey & Processing Quotation Calculator
            </Typography>
            <Typography variant="body1" sx={{ color: '#e2e8f0', lineHeight: 1.6 }}>
              Instant, transparent cost estimates compliant with Surveyors Registration Board (SRB) fee scales, terrain difficulty modifiers, and Ministry of Lands, Housing and Urban Development (MLHUD) guidelines.
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' }, gap: 4, alignItems: 'start' }}>
          
          {/* Form Column */}
          <Paper elevation={2} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1px solid #e2e8f0' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 3 }}>
              Project Parameters
            </Typography>

            {errorMsg && <Alert severity="error" sx={{ mb: 3 }}>{errorMsg}</Alert>}

            <form onSubmit={handleCalculate}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Survey Category / Domain"
                  select
                  fullWidth
                  value={surveyDomain}
                  onChange={(e) => setSurveyDomain(e.target.value)}
                >
                  <MenuItem value="cadastral">Cadastral Boundary Adjudication & Deed Plan (SLAAC)</MenuItem>
                  <MenuItem value="lidar_uav">High-Resolution UAV Drone LiDAR & Photogrammetry</MenuItem>
                  <MenuItem value="corridor_route">Route Corridor Alignment (Roads / Pipeline / Power lines)</MenuItem>
                  <MenuItem value="bathymetry">Bathymetric Hydrographic Survey (Lake Victoria / Rivers)</MenuItem>
                </TextField>

                {surveyDomain === 'corridor_route' ? (
                  <TextField
                    label="Corridor Length (Kilometres)"
                    type="number"
                    fullWidth
                    value={corridorLengthKm}
                    onChange={(e) => setCorridorLengthKm(e.target.value)}
                  />
                ) : (
                  <TextField
                    label="Land Extent / Area (Acres / Hectares)"
                    type="number"
                    fullWidth
                    value={landAreaAcres}
                    onChange={(e) => setLandAreaAcres(e.target.value)}
                  />
                )}

                <TextField
                  label="Geographical Location / Region in Uganda"
                  select
                  fullWidth
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <MenuItem value="Central (Kampala/Wakiso/Mukono)">Central (Kampala, Wakiso, Mukono - GKMA)</MenuItem>
                  <MenuItem value="Western (Mbarara/Kabale/Fort Portal)">Western (Mbarara, Kabale, Fort Portal, Albertine)</MenuItem>
                  <MenuItem value="Eastern (Jinja/Mbale/Soroti)">Eastern (Jinja, Mbale, Soroti, Tororo)</MenuItem>
                  <MenuItem value="Northern (Gulu/Arua/Lira)">Northern (Gulu, Arua, Lira, Karamoja)</MenuItem>
                </TextField>

                <TextField
                  label="Terrain Complexity & Vegetation Cover"
                  select
                  fullWidth
                  value={terrainComplexity}
                  onChange={(e) => setTerrainComplexity(e.target.value)}
                >
                  <MenuItem value="flat_open">Flat Open Farmland / Cleared Urban</MenuItem>
                  <MenuItem value="standard_undulating">Standard Undulating Savannah (1.0x)</MenuItem>
                  <MenuItem value="rugged_mountainous">Rugged Mountainous / Steep Escarpment (+35%)</MenuItem>
                  <MenuItem value="swamp_wetland">Swamp / Waterlogged Wetland (+25%)</MenuItem>
                </TextField>

                <TextField
                  label="Turnaround SLA & Urgency"
                  select
                  fullWidth
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <MenuItem value="standard">Standard Field & Delivery Timeline (5-7 Working Days)</MenuItem>
                  <MenuItem value="express_48h">Express Fast-Track Delivery (48 Hours, +40%)</MenuItem>
                </TextField>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeTitleProcessing}
                      onChange={(e) => setIncludeTitleProcessing(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Include Ministry of Lands (DeLIS/NLIS) Cadastral Deed Plan & Title Processing"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isCalculating}
                  endIcon={isCalculating ? <CircularProgress size={20} color="inherit" /> : <Calculator size={18} />}
                  sx={{
                    py: 1.5,
                    bgcolor: '#034732',
                    '&:hover': { bgcolor: '#023324' },
                    fontWeight: 700,
                    borderRadius: 2,
                  }}
                >
                  {isCalculating ? 'Computing Geodetic Rates...' : 'Calculate Official Quotation'}
                </Button>
              </Box>
            </form>
          </Paper>

          {/* Results Column */}
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              bgcolor: quoteResult ? '#f0fdf4' : '#f8fafc',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 2 }}>
              Official Quotation Summary
            </Typography>

            {quoteResult ? (
              <Box>
                <Box sx={{ my: 3, p: 3, bgcolor: 'white', borderRadius: 2, border: '2px solid #86efac' }}>
                  <Typography variant="caption" sx={{ color: '#15803d', fontWeight: 800, letterSpacing: 1 }}>
                    ESTIMATED TOTAL (UGX)
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#034732', my: 1 }}>
                    UGX {quoteResult.breakdown.totalEstimatedUgx.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Reference: {quoteResult.quote_id} • Subject to on-site reconnaissance
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>Base Field Geodetic Rate:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>UGX {quoteResult.breakdown.baseRateUgx.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>Regional Mobilization:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>UGX {quoteResult.breakdown.mobilizationUgx.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>Title / Deed Plan Processing:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>UGX {quoteResult.breakdown.titleProcessingCost.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>Terrain Multiplier Factor:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{quoteResult.breakdown.terrainMultiplier}x</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigateToMain('login')}
                    sx={{ bgcolor: '#034732', '&:hover': { bgcolor: '#023324' }, fontWeight: 700, py: 1.2 }}
                  >
                    Proceed to Order & Upload Survey Data
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Layers size={48} color="#94a3b8" style={{ margin: '0 auto 16px auto', display: 'block' }} />
                <Typography variant="body1" sx={{ color: '#64748b', mb: 2 }}>
                  Select your survey parameters on the left and click <strong>Calculate Official Quotation</strong> to generate an itemized breakdown.
                </Typography>
              </Box>
            )}
          </Paper>

        </Box>
      </Container>
    </Box>
  );
};
