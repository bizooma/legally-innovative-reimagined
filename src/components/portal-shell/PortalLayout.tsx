import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import { AddClientDialog } from '@/components/portal/AddClientDialog';
import { PORTAL_NAV, findPortalRoute } from './portalRoutes';

interface PortalCtx {
  user: any;
  isAdmin: boolean;
  /** Bumped when a client is added from the top bar, so client-using views refetch. */
  clientsVersion: number;
}
const Ctx = createContext<PortalCtx | null>(null);
export const usePortal = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('usePortal must be used inside PortalLayout');
  return v;
};

function PortalSidebar({ isAdmin }: { isAdmin: boolean }) {
  const { pathname } = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <div className="px-4 pt-5 pb-2 font-playfair text-lg font-bold">Bizooma Portal</div>
        {PORTAL_NAV.map((group) => {
          const items = group.items.filter((i) => isAdmin || !i.adminOnly);
          if (items.length === 0) return null;
          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const active = pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild isActive={active}>
                          <NavLink
                            to={item.path}
                            aria-current={active ? 'page' : undefined}
                            onClick={() => isMobile && setOpenMobile(false)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <a href="/" className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> bizooma.com
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function PortalLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);
  const [clientsVersion, setClientsVersion] = useState(0);

  // Auth guard — runs once for every portal view (same behaviour as useDashboard).
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: 'Authentication Required', description: 'Please login to access the dashboard', variant: 'destructive' });
        navigate('/portal');
        return;
      }
      setUser(session.user);
      const { data, error } = await supabase.from('users').select('is_admin').eq('id', session.user.id).maybeSingle();
      setIsAdmin(!error && !!data?.is_admin);
      setChecked(true);
    })();
  }, [navigate, toast]);

  const handleLogout = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) await supabase.auth.signOut();
    } catch { /* logging out anyway */ }
    setUser(null);
    setIsAdmin(false);
    toast({ title: 'Logged Out', description: 'You have been successfully logged out' });
    navigate('/portal');
  }, [navigate, toast]);

  if (!checked) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  const route = findPortalRoute(pathname);
  if (route?.adminOnly && !isAdmin) return <Navigate to="/portal/clients" replace />;

  return (
    <Ctx.Provider value={{ user, isAdmin, clientsVersion }}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <PortalSidebar isAdmin={isAdmin} />
          <SidebarInset className="min-w-0 bg-gray-50">
            <header className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b bg-background px-4 py-3">
              <SidebarTrigger className="md:hidden" aria-label="Open menu" />
              <h1 className="flex-1 min-w-0 truncate text-2xl font-playfair font-bold">{route?.label ?? 'Portal'}</h1>
              <div className="flex gap-2">
                {isAdmin && <AddClientDialog onClientAdded={() => setClientsVersion((v) => v + 1)} />}
                <Button variant="outline" onClick={handleLogout} className="bg-white hover:bg-gray-100">Logout</Button>
              </div>
            </header>
            <main className="min-w-0 p-4 md:p-8">
              <div className="max-w-7xl mx-auto"><Outlet /></div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </Ctx.Provider>
  );
}
