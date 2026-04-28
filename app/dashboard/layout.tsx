'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { Spinner } from '@/components/ui/spinner';
import {
  LayoutDashboard,
  Wifi,
  BarChart3,
  Radio,
  AlertCircle,
  Settings,
  Menu,
  X,
  Leaf,
  LogOut,
} from 'lucide-react';

function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="text-foreground hover:bg-destructive/10 hover:text-destructive"
    >
      <LogOut className="w-4 h-4" />
    </Button>
  );
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'Devices',
    href: '/dashboard/devices',
    icon: <Wifi className="w-5 h-5" />,
  },
  // {
  //   label: 'Analytics',
  //   href: '/dashboard/analytics',
  //   icon: <BarChart3 className="w-5 h-5" />,
  // },
  {
    label: 'Network',
    href: '/dashboard/network',
    icon: <Radio className="w-5 h-5" />,
  },
  {
    label: 'Alerts',
    href: '/dashboard/alerts',
    icon: <AlertCircle className="w-5 h-5" />,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-500" />
          <h1 className="text-xl font-bold text-sidebar-foreground">Crop Link</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 ${
                  isActive(item.href)
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60 text-center">
            <p>v0.1.0</p>
            <p>LoRa IoT System</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-foreground"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
          <div className="text-lg font-semibold text-foreground">Crop Link Dashboard</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground/60">{user?.email}</span>
            <LogoutButton />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
