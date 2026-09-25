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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Package, Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';
import { spmApi } from '@/services/api';
import { useAppStore } from '@/store/useAppStore';

export const AdminProductsSection: React.FC = () => {
  const { showSnackbar } = useAppStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_ugx: 2500000,
    stock_quantity: 10,
  });

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await spmApi.getAdminProducts();
      setProducts(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch geomatics products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      description: '',
      price_ugx: 2500000,
      stock_quantity: 10,
    });
    setOpenModal(true);
  };

  const handleOpenEditModal = (prod: any) => {
    setEditingProductId(prod.id);
    setFormData({
      name: prod.name || '',
      description: prod.description || '',
      price_ugx: prod.price_ugx || 2500000,
      stock_quantity: prod.stock_quantity || 0,
    });
    setOpenModal(true);
  };

  const handleDeleteProduct = async (productId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete product "${name}"?`)) return;

    try {
      await spmApi.deleteAdminProduct(productId);
      showSnackbar(`Product '${name}' removed from inventory`, 'warning');
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err: any) {
      showSnackbar('Failed to delete product', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingProductId) {
        await spmApi.updateAdminProduct(editingProductId, formData);
        showSnackbar(`Product updated successfully!`, 'success');
      } else {
        await spmApi.createAdminProduct(formData);
        showSnackbar(`Product added to inventory!`, 'success');
      }
      setOpenModal(false);
      await loadProducts();
    } catch (err: any) {
      showSnackbar(err.message || 'Failed to save product.', 'error');
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
              Geomatics Hardware & Software Store
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Manage surveying equipment, GNSS base stations, LiDAR software licenses, and PostGIS enterprise add-ons.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={loadProducts}
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
              Add Product
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
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Product Name & Spec</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Stock Level</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Unit Price (UGX)</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700 }}>Availability</TableCell>
                  <TableCell sx={{ color: '#94a3b8', fontWeight: 700, textAlign: 'right' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', color: '#94a3b8', py: 4 }}>
                      No product inventory found. Click "Add Product" to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((prod) => (
                    <TableRow key={prod.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
                      <TableCell sx={{ color: 'white', fontWeight: 700, maxWidth: 300 }}>
                        {prod.name}
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                          {prod.description || 'Geodetic asset catalog item'}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: '#38bdf8', fontWeight: 800 }}>
                        {prod.stock_quantity ?? 0} Units
                      </TableCell>
                      <TableCell sx={{ color: '#4ade80', fontWeight: 800 }}>
                        UGX {Number(prod.price_ugx).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={prod.stock_quantity > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                          size="small"
                          color={prod.stock_quantity > 0 ? 'success' : 'default'}
                          sx={{ fontWeight: 800, fontSize: '0.68rem' }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'right' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenEditModal(prod)}
                            title="Edit Product"
                            sx={{ color: '#38bdf8' }}
                          >
                            <Edit2 size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteProduct(prod.id, prod.name)}
                            title="Delete Product"
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

      {/* Add / Edit Product Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ bgcolor: '#0f172a', color: 'white', fontWeight: 800 }}>
            {editingProductId ? 'Edit Product Item' : 'Add Geomatics Product to Catalog'}
          </DialogTitle>
          <DialogContent sx={{ bgcolor: '#1e293b', color: 'white', pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              <TextField
                label="Product Name"
                fullWidth
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                label="Price (UGX)"
                type="number"
                fullWidth
                required
                value={formData.price_ugx}
                onChange={(e) => setFormData({ ...formData, price_ugx: Number(e.target.value) })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                label="Available Stock Quantity"
                type="number"
                fullWidth
                required
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                slotProps={{ input: { sx: { color: 'white' } } }}
              />
              <TextField
                label="Product Description / Specifications"
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
              {saving ? 'Saving...' : editingProductId ? 'Update Product' : 'Add to Inventory'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
