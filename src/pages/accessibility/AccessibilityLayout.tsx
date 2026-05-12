import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AccessibilitySidebar } from "@/components/accessibility/AccessibilitySidebar";
import { Button } from "@/components/ui/button";
import { Bell, ScanLine } from "lucide-react";

export default function AccessibilityLayout() {
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
            <div className="flex-1" />
            <Button size="sm" variant="outline" className="gap-2">
              <ScanLine className="h-4 w-4" /> Run scan
            </Button>
            <Button size="icon" variant="ghost"><Bell className="h-4 w-4" /></Button>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}