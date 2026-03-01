import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';
import { theme } from './theme/theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { InactivityProvider } from './contexts/InactivityContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';


// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import Membership from './pages/public/Membership';
import LoanCalculator from './pages/public/LoanCalculator';

// Auth Pages
import Login from './pages/auth/Login';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Savings from './pages/dashboard/Savings';
import Loans from './pages/dashboard/Loans';
import LoanApplication from './pages/dashboard/LoanApplication';
import LoanDetails from './pages/dashboard/LoanDetails';
import Governance from './pages/public/Governance';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsAndConditions from './pages/public/TermsAndConditions';
import LoanPolicy from './pages/public/LoanPolicy';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import MemberManagement from './pages/Admin/MemberManagement';
import LoanApprovals from './pages/Admin/LoanApprovals';


// =============================
// Scroll To Top Component
// =============================
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};


// =============================
// Protected Route Component
// =============================
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


// =============================
// Admin Route Component
// =============================
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};


// =============================
// Routes + Layout Wrapper
// =============================
const AppRoutes: React.FC = () => {
  const location = useLocation();

  const hideLayout =
  location.pathname.startsWith('/dashboard') ||
  location.pathname.startsWith('/admin') ||
  location.pathname === '/login';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
  {!hideLayout && <Navbar />}

      <Box sx={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/loan-policy" element={<LoanPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/savings"
            element={
              <ProtectedRoute>
                <Savings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/loans"
            element={
              <ProtectedRoute>
                <Loans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/loans/apply"
            element={
              <ProtectedRoute>
                <LoanApplication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/loans/:loanId"
            element={
              <ProtectedRoute>
                <LoanDetails />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/members"
            element={
              <AdminRoute>
                <MemberManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/loans"
            element={
              <AdminRoute>
                <LoanApprovals />
              </AdminRoute>
            }
          />

          {/* Catch All */}
<Route path="*" element={<NotFound />} />
        </Routes>
      </Box>

      {/* Hide footer on dashboard, admin & login */}
  {!hideLayout && <Footer />}
    </Box>
  );
};


// =============================
// Main App
// =============================
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <InactivityProvider>
            <AppRoutes />
          </InactivityProvider>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;