import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppStore } from './store/useAppStore';

// Navigation & Footer Components
import { MainNavbar } from './components/MainNavbar';
import { ClientNavbar } from './components/ClientNavbar';
import { Footer } from './components/Footer';

// (main) Folder Views
import { HomeView } from './views/(main)/HomeView';
import { ServicesView } from './views/(main)/ServicesView';
import { AcademyView } from './views/(main)/AcademyView';
import { PricingView } from './views/(main)/PricingView';
import { AboutView } from './views/(main)/AboutView';
import { ContactView } from './views/(main)/ContactView';
import { LoginView } from './views/(main)/LoginView';
import { RegisterView } from './views/(main)/RegisterView';
import { QuoteCalculatorView } from './views/(main)/QuoteCalculatorView';
import { VerifyCertificateView } from './views/(main)/VerifyCertificateView';
import { CodeArchitectureView } from './views/(main)/CodeArchitectureView';

// client Folder Views
import { ClientDashboardView } from './views/client/ClientDashboardView';
import { ClientMakePaymentView } from './views/client/ClientMakePaymentView';

// admin Folder Views (Subdomain isolated)
import { AdminDashboardView } from './views/admin/AdminDashboardView';

export function App() {
  const {
    activeFolder,
    mainDestination,
    clientDestination,
    checkSubdomain,
    initializeSession,
    snackbar,
    closeSnackbar,
  } = useAppStore();

  useEffect(() => {
    checkSubdomain();
    initializeSession();
  }, [checkSubdomain, initializeSession]);

  // Render (main) Folder Destination
  const renderMainView = () => {
    switch (mainDestination) {
      case 'home':
        return <HomeView />;
      case 'services':
        return <ServicesView />;
      case 'academy':
        return <AcademyView />;
      case 'pricing':
        return <PricingView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'login':
        return <LoginView />;
      case 'register':
        return <RegisterView />;
      case 'quote-calculator':
        return <QuoteCalculatorView />;
      case 'verify-certificate':
        return <VerifyCertificateView />;
      case 'code-architecture':
        return <CodeArchitectureView />;
      default:
        return <HomeView />;
    }
  };

  // Render client Folder Destination
  const renderClientView = () => {
    if (clientDestination === 'make-payment') {
      return <ClientMakePaymentView />;
    }
    return <ClientDashboardView />;
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
      
      {/* 1. ADMIN SUBDOMAIN FOLDER VIEW */}
      {activeFolder === 'admin' && (
        <Box sx={{ flexGrow: 1, bgcolor: '#0b1120' }}>
          <AdminDashboardView />
        </Box>
      )}

      {/* 2. CLIENT PORTAL FOLDER VIEW */}
      {activeFolder === 'client' && (
        <>
          <ClientNavbar />
          <Box sx={{ flexGrow: 1 }}>{renderClientView()}</Box>
          <Footer />
        </>
      )}

      {/* 3. (MAIN) PUBLIC CORPORATE FOLDER VIEW */}
      {activeFolder === '(main)' && (
        <>
          <MainNavbar />
          <Box sx={{ flexGrow: 1 }}>{renderMainView()}</Box>
          <Footer />
        </>
      )}

      {/* Global Unified Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4500}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%', fontWeight: 700 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
}

export default App;
