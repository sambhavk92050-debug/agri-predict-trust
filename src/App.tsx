import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Landing from "./pages/Landing";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import GovernmentDashboard from "./pages/government/GovernmentDashboard";
import BusinessDashboard from "./pages/business/BusinessDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={`/${user?.role}/dashboard`} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />} />
      
      <Route path="/farmer" element={<ProtectedRoute requiredRole="farmer"><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<FarmerDashboard />} />
        <Route path="predictions" element={<div className="p-6">AI Predictions (Coming Soon)</div>} />
        <Route path="verification" element={<div className="p-6">Blockchain Verification (Coming Soon)</div>} />
        <Route path="crops" element={<div className="p-6">Crop Management (Coming Soon)</div>} />
        <Route path="resources" element={<div className="p-6">Resource Optimization (Coming Soon)</div>} />
        <Route path="reports" element={<div className="p-6">Reports (Coming Soon)</div>} />
        <Route path="alerts" element={<div className="p-6">Alerts (Coming Soon)</div>} />
        <Route path="settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
      </Route>
      
      <Route path="/government" element={<ProtectedRoute requiredRole="government"><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<GovernmentDashboard />} />
        <Route path="predictions" element={<div className="p-6">AI Predictions (Coming Soon)</div>} />
        <Route path="verification" element={<div className="p-6">Blockchain Verification (Coming Soon)</div>} />
        <Route path="analytics" element={<div className="p-6">Regional Analytics (Coming Soon)</div>} />
        <Route path="policy" element={<div className="p-6">Policy Dashboard (Coming Soon)</div>} />
        <Route path="reports" element={<div className="p-6">Reports (Coming Soon)</div>} />
        <Route path="alerts" element={<div className="p-6">Alerts (Coming Soon)</div>} />
        <Route path="settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
      </Route>
      
      <Route path="/business" element={<ProtectedRoute requiredRole="business"><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<BusinessDashboard />} />
        <Route path="predictions" element={<div className="p-6">AI Predictions (Coming Soon)</div>} />
        <Route path="verification" element={<div className="p-6">Blockchain Verification (Coming Soon)</div>} />
        <Route path="market" element={<div className="p-6">Market Insights (Coming Soon)</div>} />
        <Route path="risk" element={<div className="p-6">Risk Assessment (Coming Soon)</div>} />
        <Route path="reports" element={<div className="p-6">Reports (Coming Soon)</div>} />
        <Route path="alerts" element={<div className="p-6">Alerts (Coming Soon)</div>} />
        <Route path="settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
      </Route>
      
      {/* Redirect legacy routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Navigate to={`/${useAuth().user?.role}/dashboard`} replace />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
