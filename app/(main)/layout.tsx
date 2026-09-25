import Box from '@mui/material/Box';
import { MainNavbar } from '@/components/MainNavbar';
import { Footer } from '@/components/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavbar />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </>
  );
}