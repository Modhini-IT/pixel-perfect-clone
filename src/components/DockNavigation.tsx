import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, Settings, LayoutDashboard, ClipboardList } from "lucide-react";
import Dock from "./Dock";

const DockNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dockItems = [
    {
      icon: <Home className="w-6 h-6" />,
      label: "Home",
      onClick: () => navigate('/'),
      className: location.pathname === '/' ? 'ring-2 ring-primary' : ''
    },
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      label: "Dashboard",
      onClick: () => navigate('/dashboard'),
      className: location.pathname === '/dashboard' ? 'ring-2 ring-primary' : ''
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      label: "Attendance",
      onClick: () => navigate('/attendance'),
      className: location.pathname === '/attendance' ? 'ring-2 ring-primary' : ''
    },
    {
      icon: <User className="w-6 h-6" />,
      label: "Profile",
      onClick: () => navigate('/profile'),
      className: location.pathname === '/profile' ? 'ring-2 ring-primary' : ''
    },
    {
      icon: <Settings className="w-6 h-6" />,
      label: "Settings",
      onClick: () => navigate('/settings'),
      className: location.pathname === '/settings' ? 'ring-2 ring-primary' : ''
    },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4">
      <Dock
        items={dockItems}
        panelHeight={60}
        baseItemSize={45}
      />
    </div>
  );
};

export default DockNavigation;
