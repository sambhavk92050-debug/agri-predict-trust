import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Brain, 
  Shield, 
  FileText, 
  Settings, 
  LogOut,
  Leaf,
  BarChart3,
  Users,
  TrendingUp,
  MapPin,
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  roles: UserRole[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['farmer', 'government', 'business']
  },
  {
    title: 'AI Predictions',
    href: '/predictions',
    icon: Brain,
    roles: ['farmer', 'government', 'business']
  },
  {
    title: 'Blockchain Verification',
    href: '/verification',
    icon: Shield,
    roles: ['farmer', 'government', 'business']
  },
  {
    title: 'Crop Management',
    href: '/crops',
    icon: Leaf,
    roles: ['farmer']
  },
  {
    title: 'Resource Optimization',
    href: '/resources',
    icon: TrendingUp,
    roles: ['farmer']
  },
  {
    title: 'Regional Analytics',
    href: '/analytics',
    icon: BarChart3,
    roles: ['government']
  },
  {
    title: 'Policy Dashboard',
    href: '/policy',
    icon: Users,
    roles: ['government']
  },
  {
    title: 'Market Insights',
    href: '/market',
    icon: TrendingUp,
    roles: ['business']
  },
  {
    title: 'Risk Assessment',
    href: '/risk',
    icon: BarChart3,
    roles: ['business']
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
    roles: ['farmer', 'government', 'business']
  },
  {
    title: 'Alerts',
    href: '/alerts',
    icon: Bell,
    badge: '3',
    roles: ['farmer', 'government', 'business']
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['farmer', 'government', 'business']
  }
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(user.role)
  );

  const getRoleBasePath = () => {
    return `/${user.role}`;
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Leaf className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">CropAI Portal</h2>
          <p className="text-sm text-muted-foreground capitalize">
            {user.role} Dashboard
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
          {user.verified && (
            <Badge variant="outline" className="text-success border-success">
              Verified
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const IconComponent = item.icon;
          const href = getRoleBasePath() + item.href;
          const isActive = location.pathname === href;
          
          return (
            <NavLink
              key={item.href}
              to={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <IconComponent className="h-4 w-4" />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge variant={isActive ? "secondary" : "outline"} className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button 
          onClick={logout}
          variant="outline" 
          className="w-full justify-start"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};