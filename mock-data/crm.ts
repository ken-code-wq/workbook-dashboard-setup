// ---------------------------------------------------------------------------
// CRM – Opportunities
// ---------------------------------------------------------------------------

export type OpportunityStage =
  | "prospecting"
  | "qualification"
  | "proposal"
  | "negotiation"
  | "closed-won"
  | "closed-lost";

export interface Opportunity {
  id: string;
  name: string;
  company: string;
  owner: string;
  stage: OpportunityStage;
  value: number;
  probability: number; // 0 – 100
  expectedClose: string;
}

export const opportunities: Opportunity[] = [
  { id: "opp-01", name: "Enterprise SaaS Deal", company: "Brightwave Co", owner: "Sophia Martinez", stage: "negotiation", value: 85000, probability: 70, expectedClose: "2026-03-15" },
  { id: "opp-02", name: "API Integration", company: "Aurora Tech", owner: "Noah Patel", stage: "proposal", value: 42000, probability: 50, expectedClose: "2026-04-01" },
  { id: "opp-03", name: "Annual Licence Renewal", company: "Zencloud", owner: "Sophia Martinez", stage: "closed-won", value: 31000, probability: 100, expectedClose: "2026-01-20" },
  { id: "opp-04", name: "Custom Dashboard Build", company: "PixelForge", owner: "Noah Patel", stage: "qualification", value: 18000, probability: 30, expectedClose: "2026-05-10" },
  { id: "opp-05", name: "Consulting Engagement", company: "NetPulse", owner: "Sophia Martinez", stage: "prospecting", value: 12000, probability: 15, expectedClose: "2026-06-01" },
  { id: "opp-06", name: "Data Migration Project", company: "OrbitTech", owner: "Ava Chen", stage: "proposal", value: 56000, probability: 45, expectedClose: "2026-03-28" },
  { id: "opp-07", name: "Support Contract", company: "StellarTech", owner: "Mia Johnson", stage: "closed-lost", value: 24000, probability: 0, expectedClose: "2026-02-01" },
  { id: "opp-08", name: "Hardware Provisioning", company: "Brightwave Co", owner: "Sophia Martinez", stage: "negotiation", value: 67000, probability: 65, expectedClose: "2026-04-15" },
];

// Pipeline stages with values (for funnel widget)
export function getOpportunityPipeline() {
  const stageOrder: OpportunityStage[] = [
    "prospecting",
    "qualification",
    "proposal",
    "negotiation",
    "closed-won",
  ];
  const stageLabels: Record<string, string> = {
    prospecting: "Prospecting",
    qualification: "Qualification",
    proposal: "Proposal",
    negotiation: "Negotiation",
    "closed-won": "Closed Won",
  };

  return stageOrder.map((stage) => {
    const opps = opportunities.filter((o) => o.stage === stage);
    return {
      name: stageLabels[stage],
      value: opps.reduce((sum, o) => sum + o.value, 0),
      count: opps.length,
    };
  });
}

// Win rate trend (monthly, area chart)
export interface WinRateMonth {
  month: string;
  winRate: number;
  deals: number;
}

export const winRateTrend: WinRateMonth[] = [
  { month: "Jan", winRate: 32, deals: 12 },
  { month: "Feb", winRate: 38, deals: 14 },
  { month: "Mar", winRate: 35, deals: 11 },
  { month: "Apr", winRate: 42, deals: 16 },
  { month: "May", winRate: 40, deals: 15 },
  { month: "Jun", winRate: 45, deals: 18 },
  { month: "Jul", winRate: 48, deals: 20 },
  { month: "Aug", winRate: 44, deals: 17 },
  { month: "Sep", winRate: 50, deals: 22 },
  { month: "Oct", winRate: 52, deals: 24 },
  { month: "Nov", winRate: 49, deals: 21 },
  { month: "Dec", winRate: 55, deals: 26 },
];
