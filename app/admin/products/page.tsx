import { Metadata } from 'next';
import { AdminProductsSection } from '@/views/admin/sections/AdminProductsSection';

export const metadata: Metadata = {
  title: 'Products & Hardware Store | Admin Portal | SPM Geosolutions',
  description: 'Manage surveying hardware inventory and software licenses.',
};

export default function AdminProductsPage() {
  return <AdminProductsSection />;
}
