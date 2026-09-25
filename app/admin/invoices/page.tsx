import { Metadata } from 'next';
import { AdminInvoicesSection } from '@/views/admin/sections/AdminInvoicesSection';

export const metadata: Metadata = {
  title: 'Invoices & Billing | Admin Portal | SPM Geosolutions',
  description: 'Manage platform B2B invoicing, status reconciliation, and Mobile Money logs.',
};

export default function AdminInvoicesPage() {
  return <AdminInvoicesSection />;
}
