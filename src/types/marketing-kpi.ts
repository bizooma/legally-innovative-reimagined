export interface MarketingKPI {
  id: string;
  client_id: string;
  metric_name: string;
  metric_value: number;
  target_value: number | null;
  metric_unit: string | null;
  category: 'leads' | 'traffic' | 'conversion' | 'cost' | 'seo' | 'brand' | 'content';
  period_start: string;
  period_end: string;
  created_at: string;
  updated_at: string;
  metadata: {
    trend?: 'up' | 'down' | 'stable';
    change_pct?: number;
    brand?: 'plg' | 'wwc';
    [key: string]: any;
  };
}

export interface KPIMetric {
  name: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
  trend?: 'up' | 'down' | 'stable';
  changePct?: number;
}
