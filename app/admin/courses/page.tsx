import { Metadata } from 'next';
import { AdminCoursesSection } from '@/views/admin/sections/AdminCoursesSection';

export const metadata: Metadata = {
  title: 'Academy Courses Management | Admin Portal | SPM Geosolutions',
  description: 'Manage accredited geomatics masterclasses and professional training curricula.',
};

export default function AdminCoursesPage() {
  return <AdminCoursesSection />;
}
