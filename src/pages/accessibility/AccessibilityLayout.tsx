import { Outlet, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AccessibilitySidebar } from "@/components/accessibility/AccessibilitySidebar";
import { Button } from "@/components/ui/button";
import { Bell, User as UserIcon, LogOut, Settings as SettingsIcon } from "lucide-react";
import { useAccessibilityOrg } from "@/hooks/useAccessibilityOrg";
import { OrgGate } from "@/components/accessibility/OrgGate";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export default function AccessibilityLayout() {
  const ctx = useAccessibilityOrg();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/accessibility/signup", { replace: true });
  };
  return (
    <SidebarProvider>
      <Helmet>
        <title>Accessibility Layer Dashboard</title>
      </Helmet>
      <div className="min-h-screen flex w-full bg-muted/20">
        <AccessibilitySidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b bg-background/80 backdrop-blur flex items-center px-4 gap-3 sticky top-0 z-10">
            <SidebarTrigger />
            <div className="text-sm font-medium truncate">{ctx.org?.name ?? "Accessibility Layer"}</div>
            <div className="flex-1" />
            <Button size="icon" variant="ghost"><Bell className="h-4 w-4" /></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" aria-label="Account menu">
                  <UserIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{email || "Signed in"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/accessibility/profile"><UserIcon className="h-4 w-4 mr-2" />Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/accessibility/settings"><SettingsIcon className="h-4 w-4 mr-2" />Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-6">
            <OrgGate ctx={ctx}>
              <Outlet context={ctx} />
            </OrgGate>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}