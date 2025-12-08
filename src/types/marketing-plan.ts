export interface MarketingPlanExecutiveSummary {
  strengths?: string;
  gaps?: string;
}

export interface MarketingPlanSWOT {
  strengths?: string[];
  weaknesses?: string[];
  opportunities?: string[];
  threats?: string[];
}

export interface MarketingPlanMarketAnalysis {
  geographic_focus?: string;
  market_size?: string;
  competitive_landscape?: string;
}

export interface MarketingPlanTargetAudience {
  name: string;
  description: string;
  brand?: string;
}

export interface MarketingPlanObjective {
  objective: string;
  timeline?: string;
  target?: number;
}

export interface MarketingPlanStrategies {
  dual_brand?: boolean;
  seo_focus?: string;
  content_strategy?: string;
  social_media?: string;
  [key: string]: any;
}

export interface MarketingPlanBudgetLineItem {
  category: string;
  monthly: number;
  annual: number;
  description: string;
}

export interface MarketingPlanBudget {
  total?: number;
  plg_allocation?: number;
  wwc_allocation?: number;
  breakdown?: {
    [key: string]: number;
  };
}

export interface MarketingPlanKPIFramework {
  [key: string]: {
    current?: number;
    target?: number;
  };
}

export interface MarketingPlan {
  id: string;
  client_id: string;
  title: string;
  executive_summary: MarketingPlanExecutiveSummary;
  swot_analysis: MarketingPlanSWOT;
  market_analysis: MarketingPlanMarketAnalysis;
  target_audiences: MarketingPlanTargetAudience[];
  marketing_objectives: MarketingPlanObjective[];
  strategies: MarketingPlanStrategies;
  budget: MarketingPlanBudget;
  budget_breakdown?: MarketingPlanBudgetLineItem[];
  kpi_framework: MarketingPlanKPIFramework;
  competitor_analysis?: any[];
  implementation_timeline?: any[];
  metadata?: any;
  created_at: string;
  updated_at: string;
}
