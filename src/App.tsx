import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import DashboardPage from "./pages/DashboardPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import AttendancePage from "./pages/AttendancePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import StudentManagement from "./pages/StudentManagement";
import NotFound from "./pages/NotFound";
import ClickSpark from "./components/ClickSpark";
import DockNavigation from "./components/DockNavigation";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showDock = !['/signin', '/'].includes(location.pathname);

  return (
    <ClickSpark sparkColor="hsl(160, 100%, 50%)" sparkSize={12} sparkRadius={20} sparkCount={10}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/students" element={<StudentManagement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showDock && <DockNavigation />}
    </ClickSpark>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
