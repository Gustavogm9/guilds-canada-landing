export interface DiagnosticAnswers {
  q_sector?: string;
  q_employees?: string;
  q_revenue?: string;
  q_systems?: string[];
  q_adoption?: string;
  q_ghosts?: string;
  q_integration?: string;
  q_hours?: string;
  q_processes?: string;
  q_reports?: string;
  q_history?: string;
  q_reason?: string;
  q_dedicated?: string;
  q_sector1?: string;
  q_sector2?: string;
  q_sector3?: string;
  [key: string]: string | string[] | undefined;
}

export function calcScore(A: DiagnosticAnswers): number {
  let s = 0;
  const adoptionMap: Record<string, number> = { under_20: 0, '20_to_40': 4, '40_to_60': 9, '60_to_80': 14, over_80: 20 };
  const ghostsMap: Record<string, number> = { none: 12, '1': 7, '2': 3, '3_plus': 0 };
  const integrationMap: Record<string, number> = { yes: 15, partial: 8, no: 0 };
  const hoursMap: Record<string, number> = { under_2: 18, '2_to_5': 11, '5_to_10': 5, over_10: 0 };
  const processesMap: Record<string, number> = { none: 15, '1_to_2': 9, '3_to_5': 4, over_5: 0 };
  const reportsMap: Record<string, number> = { real_time: 10, days: 5, '1_week': 2, over_1_week: 0 };
  const historyMap: Record<string, number> = { no: 8, '1_time': 2, more_than_1: 0 };
  const dedicatedMap: Record<string, number> = { yes: 5, partial: 3, no: 0 };

  s += (adoptionMap[A.q_adoption as string] || 0) + (ghostsMap[A.q_ghosts as string] || 0) + (integrationMap[A.q_integration as string] || 0);
  s += (hoursMap[A.q_hours as string] || 0) + (processesMap[A.q_processes as string] || 0) + (reportsMap[A.q_reports as string] || 0);
  s += (historyMap[A.q_history as string] || 0) + (dedicatedMap[A.q_dedicated as string] || 0);

  // Sector points
  const isHealth = ['healthcare', 'clinic'].includes(A.q_sector || '');
  if (isHealth) {
    const regMap: Record<string, number> = { under_5: 6, '10_to_20': 0 };
    const nrMap: Record<string, number> = { compliant: 4, not_started: 0 };
    const sysMap: Record<string, number> = { '1': 4, over_5: 0 };
    s += (regMap[A.q_sector1 as string] || 0) + (nrMap[A.q_sector2 as string] || 0) + (sysMap[A.q_sector3 as string] || 0);
  } else {
    const onbMap: Record<string, number> = { up_to_2_days: 6, over_14_days: 0 };
    const aprovMap: Record<string, number> = { under_20: 6, over_80: 0 };
    const errMap: Record<string, number> = { rarely: 4, daily: 0 };
    s += (onbMap[A.q_sector1 as string] || 0) + (aprovMap[A.q_sector2 as string] || 0) + (errMap[A.q_sector3 as string] || 0);
  }

  return Math.round((s / 113) * 100);
}

export function calcLoss(A: DiagnosticAnswers) {
  // Estimated hourly cost in CAD based on revenue size
  const rates: Record<string, number> = { up_to_1m: 35, '1m_to_5m': 45, '5m_to_20m': 60, over_20m: 80 };
  const rate = rates[A.q_revenue as string] || 45;
  
  // Median employees for calculation
  const empMap: Record<string, number> = { '10-20': 15, '21-50': 35, '51-100': 75, '101-150': 125, 'over_150': 175 };
  const emp = empMap[A.q_employees as string] || 35;
  
  // Weekly hours wasted
  const hrsMap: Record<string, number> = { under_2: 1, '2_to_5': 3, '5_to_10': 6, over_10: 10 };
  const hrs = hrsMap[A.q_hours as string] || 3;
  
  const workers = Math.round(emp * 0.45); // Assuming 45% of employees do admin/system tasks
  const manualCost = hrs * 52 * rate * workers;
  
  // Ghost systems cost per year (~$1200 CAD/month)
  const ghostMap: Record<string, number> = { none: 0, '1': 1, '2': 2, '3_plus': 3 };
  const ghosts = ghostMap[A.q_ghosts as string] || 0;
  const ghostCost = ghosts * 1200 * 12; 
  
  // Reporting delay cost (estimated as management wasted hours)
  const relMap: Record<string, number> = { real_time: 0, days: rate * 4 * 12, '1_week': rate * 8 * 12, over_1_week: rate * 16 * 12 };
  const relCost = relMap[A.q_reports as string] || 0;
  
  return {
    total: Math.round(manualCost + ghostCost + relCost),
    manual: Math.round(manualCost),
    ghost: Math.round(ghostCost),
    rel: Math.round(relCost),
    rate,
    workers,
    hrs,
    emp
  };
}

export function getPhase(score: number) {
  if (score <= 15) return { name: 'Pre-FOUNDRY', color: '#E63946', pos: 7, desc: 'Your operation is essentially analog. Digitalization starts before any system.' };
  if (score <= 30) return { name: 'FOUNDRY', color: '#F97316', pos: 19, desc: 'You have systems, but the actual processes are not mapped or documented.' };
  if (score <= 45) return { name: 'OBSERVE', color: '#F59E0B', pos: 33, desc: 'Documented processes differ from what the team does, creating invisible rework.' };
  if (score <= 60) return { name: 'REFINE', color: '#84CC16', pos: 47, desc: 'Systems work, but there are many workarounds. The team bypasses the architecture.' };
  if (score <= 75) return { name: 'GENERATE', color: '#22C55E', pos: 62, desc: 'Good adoption, but lacking integration. Systems do not talk to each other.' };
  if (score <= 90) return { name: 'EMPOWER', color: '#3B82F6', pos: 81, desc: 'Integrated operation, but the team still needs active support to maintain adoption.' };
  return { name: 'EXPAND', color: '#7C3AED', pos: 95, desc: 'Mature digital operation. You are ready to scale with methodological confidence.' };
}

export function getBenchmark(sector: string) {
  const map: Record<string, { score: number, label: string }> = {
    healthcare: { score: 38, label: 'Healthcare' },
    clinic: { score: 42, label: 'Clinical Operations' },
    fintech: { score: 44, label: 'Fintech & Financial' },
    operations: { score: 36, label: 'Operations & Logistics' }
  };
  return map[sector] || { score: 40, label: 'Industry Average' };
}

export interface Gap {
  priority: number;
  impact: string;
  cls: string;
  badge: string;
  title: string;
  desc: string;
  action: string;
  cost: string;
}

export function getGaps(A: DiagnosticAnswers): Gap[] {
  const gaps: Gap[] = [];
  const adoption = A.q_adoption as string;
  const ghosts = A.q_ghosts as string;
  const integration = A.q_integration as string;
  const hours = A.q_hours as string;
  const processes = A.q_processes as string;
  const reports = A.q_reports as string;
  const history = A.q_history as string;

  if (['under_20', '20_to_40'].includes(adoption))
    gaps.push({ priority: adoption === 'under_20' ? 0 : 2, impact: 'CRITICAL', cls: 'gap-critico', badge: 'badge-critico', title: 'Critical System Adoption', desc: `Less than ${adoption === 'under_20' ? '20%' : '40%'} of your team uses the systems daily. Technology investments are severely underutilized.`, action: 'G-FORGE EMPOWER Phase — identify friction and enforce active adoption for 60 days', cost: 'Accounts for ~70% of estimated annual loss' });

  if (['over_10', '5_to_10'].includes(hours))
    gaps.push({ priority: hours === 'over_10' ? 1 : 3, impact: 'CRITICAL', cls: 'gap-critico', badge: 'badge-critico', title: 'High Manual Workload', desc: `${hours === 'over_10' ? 'More than 10' : 'Between 5 and 10'} hours per week wasted on repetitive tasks per employee. Your team serves the process instead of the process serving them.`, action: 'G-FORGE GENERATE Phase — calibrated automations aligned with real adoption', cost: 'Main component of operational cost' });

  if (integration === 'no')
    gaps.push({ priority: 4, impact: 'HIGH', cls: 'gap-alto', badge: 'badge-alto', title: 'Zero Integration — Manual Data Transfer', desc: 'Systems are siloed. The team manually bridges data, creating points of error, delays, and invisible rework.', action: 'REFINE + GENERATE Phases — workflow redesign before technical integration', cost: 'Generates operational errors and unquantified rework' });

  if (['3_plus', '2'].includes(ghosts))
    gaps.push({ priority: 5, impact: 'HIGH', cls: 'gap-alto', badge: 'badge-alto', title: 'Ghost Systems — Paying Without Using', desc: `${ghosts === '3_plus' ? '3 or more' : '2'} active systems with low or zero usage. This is a fixed cost with no return, occupying mental space from the team.`, action: 'G-FORGE FOUNDRY Phase — system mapping and consolidation', cost: `Estimated cost: $${(({'3_plus': 36000, '2': 24000} as Record<string, number>)[ghosts] || 0).toLocaleString('en-CA')} CAD/year` });

  if (['over_5', '3_to_5'].includes(processes))
    gaps.push({ priority: 6, impact: 'HIGH', cls: 'gap-alto', badge: 'badge-alto', title: 'Spreadsheet Reliance', desc: `${processes === 'over_5' ? 'More than 5' : '3 to 5'} critical processes running on spreadsheets or email. No traceability, no history, and high security risk.`, action: 'G-FORGE OBSERVE Phase — mapping the real process before digitizing', cost: 'High compliance risk and loss of operational history' });

  if (['over_1_week', '1_week'].includes(reports))
    gaps.push({ priority: 7, impact: 'MEDIUM', cls: 'gap-medio', badge: 'badge-medio', title: 'Slow Reporting Cycle', desc: `Management reports take ${reports === 'over_1_week' ? 'more than 1 week' : 'about 1 week'}. You are making decisions based on outdated data in a fast-paced market.`, action: 'G-FORGE GENERATE Phase — management dashboards integrated into adopted processes', cost: 'Cost of delayed strategic decisions' });

  if (['more_than_1', '1_time'].includes(history))
    gaps.push({ priority: 8, impact: 'HIGH', cls: 'gap-alto', badge: 'badge-alto', title: 'Abandonment Pattern', desc: `Your company has abandoned systems before. Without a methodological shift, the probability of repetition is high, regardless of the software.`, action: 'Full G-FORGE cycle — starting with diagnostic of previous failures', cost: 'Risk of losing the next implementation investment' });

  return gaps.sort((a, b) => a.priority - b.priority).slice(0, 3);
}

export function getDynamicRoadmap(score: number) {
  const isLowMaturity = score <= 45; // Pre-FOUNDRY, FOUNDRY, OBSERVE
  
  if (isLowMaturity) {
    return [
      { period: 'Weeks 1–2', title: 'Diagnostic & Real Process Mapping (FOUNDRY + OBSERVE)', desc: 'Before any system or automation: mapping how the team actually works, where workarounds happen, and where data exists but is not used.', gain: 'Clarity on the highest ROI without spending on the wrong solution' },
      { period: 'Weeks 3–7', title: 'Workflow Redesign & Calibrated Delivery (REFINE + GENERATE)', desc: 'Adjusting the process before implementing the system. Delivering a system configured for the team\'s maturity level, not just technical capacity.', gain: 'A system the team can actually use from day one' },
      { period: 'Weeks 8–12', title: 'Active Adoption & Consolidation (EMPOWER)', desc: 'Monitoring real usage during the first 4 weeks. Identifying friction points and adjusting the system in real time.', gain: '80% reduction in manual rework' }
    ];
  } else {
    return [
      { period: 'Weeks 1–2', title: 'Integration Gap Audit (REFINE)', desc: 'Identifying data silos and bottleneck points where information is lost or passed manually between systems.', gain: 'Complete visibility of locked data' },
      { period: 'Weeks 3–7', title: 'Core Automation Implementation (GENERATE)', desc: 'Building integration bridges (API/Webhooks) between existing systems, eliminating double data entry.', gain: 'Real-time management reports' },
      { period: 'Weeks 8–12', title: 'Training & Expansion (EMPOWER + EXPAND)', desc: 'Advanced team training on new automations and management dashboards. Transition to a data-driven culture.', gain: 'Sustained 90%+ adoption at scale' }
    ];
  }
}
