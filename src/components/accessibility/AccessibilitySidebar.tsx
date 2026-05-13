import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  ScanLine,
  ShieldCheck,
  Settings2,
  AlertCircle,
  Sparkles,
  FileBarChart2,
  CreditCard,
  Accessibility,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/accessibility/dashboard", icon: LayoutDashboard },
  { title: "Websites", url: "/accessibility/websites", icon: Globe },
  { title: "Scans", url: "/accessibility/scans", icon: ScanLine },
  { title: "Compliance", url: "/accessibility/compliance", icon: ShieldCheck },
  { title: "Widget", url: "/accessibility/widget", icon: Settings2 },
  { title: "Issues", url: "/accessibility/issues", icon: AlertCircle },
  { title: "AI Recommendations", url: "/accessibility/ai", icon: Sparkles },
  { title: "Reports", url: "/accessibility/reports", icon: FileBarChart2 },
];

const orgItems = [
  { title: "Billing", url: "/accessibility/billing", icon: CreditCard },
];

export function AccessibilitySidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (p: string) => pathname === p;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavLink to="/accessibility/dashboard" className="flex items-center gap-2 px-2 py-1">
          <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center shrink-0">
            <Accessibility className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-semibold text-sm">Accessibility Layer</div>
              <div className="text-[10px] text-muted-foreground">by Bizooma</div>
            </div>
          )}
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((it) => (
                <SidebarMenuItem key={it.url}>
                  <SidebarMenuButton asChild isActive={isActive(it.url)} tooltip={it.title}>
                    <NavLink to={it.url}>
                      <it.icon className="h-4 w-4" />
                      <span>{it.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {orgItems.map((it) => (
                <SidebarMenuItem key={it.url}>
                  <SidebarMenuButton asChild isActive={isActive(it.url)} tooltip={it.title}>
                    <NavLink to={it.url}>
                      <it.icon className="h-4 w-4" />
                      <span>{it.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}