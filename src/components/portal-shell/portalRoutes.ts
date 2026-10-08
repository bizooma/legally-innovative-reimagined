import { Activity, Bot, Briefcase, CalendarCheck, Clock, FolderKanban, KeyRound, Users, UserCog, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface PortalRoute { label: string; path: string; icon: LucideIcon; adminOnly: boolean }
export interface PortalGroup { label: string; items: PortalRoute[] }

export const PORTAL_NAV: PortalGroup[] = [
  { label: 'Work', items: [
    { label: 'Today', path: '/portal/today', icon: CalendarCheck, adminOnly: true },
    { label: 'Clients', path: '/portal/clients', icon: Users, adminOnly: false },
    { label: 'Projects', path: '/portal/projects', icon: FolderKanban, adminOnly: true },
    { label: 'Time', path: '/portal/time', icon: Clock, adminOnly: true },
  ] },
  { label: 'Business', items: [
    { label: 'Pipeline', path: '/portal/pipeline', icon: Briefcase, adminOnly: true },
    { label: 'Budget', path: '/portal/budget', icon: Wallet, adminOnly: true },
  ] },
  { label: 'System', items: [
    { label: 'Status Monitor', path: '/portal/system/status', icon: Activity, adminOnly: true },
    { label: 'Audit Codes', path: '/portal/system/audit-codes', icon: KeyRound, adminOnly: true },
    { label: 'Chatbot', path: '/portal/system/chatbot', icon: Bot, adminOnly: true },
    { label: 'Users', path: '/portal/system/users', icon: UserCog, adminOnly: true },
  ] },
];

export const findPortalRoute = (pathname: string) =>
  PORTAL_NAV.flatMap((g) => g.items).find((i) => i.path === pathname);
