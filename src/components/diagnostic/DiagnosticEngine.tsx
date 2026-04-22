"use client";

import React, { useState, useEffect } from 'react';
import { DiagnosticAnswers, calcScore, calcLoss, getDynamicRoadmap, getGaps, getPhase, getBenchmark } from '@/utils/diagnostic-logic';
import { ChevronRight, ChevronLeft, Check, Lock, ShieldCheck, Mail, User, Sparkles, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

// Extracted UI Components
const OptionCard = ({ selected, onClick, label, isSmall }: { selected: boolean, onClick: () => void, label: string, isSmall?: boolean }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-primary/50 ${selected ? 'border-primary bg-primary/10' : ''} ${isSmall ? 'p-3' : ''}`}
  >
    <div className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${selected ? 'border-primary bg-primary' : 'border-white/30'}`}>
      {selected && <div className="w-2 h-2 bg-zinc-950 rounded-full" />}
    </div>
    <span className={`text-sm font-medium ${selected ? 'text-white' : 'text-zinc-300'}`}>{label}</span>
  </div>
);

const CheckCard = ({ selected, onClick, label }: { selected: boolean, onClick: () => void, label: string }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-primary/50 ${selected ? 'border-primary bg-primary/10' : ''}`}
  >
    <div className={`w-5 h-5 flex-shrink-0 rounded-[4px] border-2 flex items-center justify-center transition-all ${selected ? 'bg-primary border-primary' : 'border-white/30'}`}>
      {selected && <Check className="w-3.5 h-3.5 text-zinc-950" strokeWidth={3} />}
    </div>
    <span className={`text-sm font-medium ${selected ? 'text-white' : 'text-zinc-300'}`}>{label}</span>
  </div>
);

export function DiagnosticEngine() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const [leadData, setLeadData] = useState({ name: '', email: '' });

  const setAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const toggleCheck = (key: string, value: string) => {
    setAnswers(prev => {
      const current = (prev[key] as string[]) || [];
      const isSelected = current.includes(value);
      return {
        ...prev,
        [key]: isSelected ? current.filter(v => v !== value) : [...current, value]
      };
    });
    setError('');
  };

  const getRequiredForStep = (s: number) => {
    switch(s) {
      case 1: return ['q_sector', 'q_employees', 'q_revenue'];
      case 2: return ['q_adoption', 'q_ghosts', 'q_integration'];
      case 3: return ['q_hours', 'q_processes', 'q_reports'];
      case 4: return ['q_history', 'q_reason', 'q_dedicated'];
      case 5: return ['q_sector1', 'q_sector2', 'q_sector3'];
      case 6: return ['lead_name', 'lead_email'];
      default: return [];
    }
  };

  const handleNext = () => {
    if (step === 6) {
      if (!leadData.name || !leadData.email || !leadData.email.includes('@')) {
        setError('Please provide a valid name and professional email.');
        return;
      }
      startProcessing();
      return;
    }

    const required = getRequiredForStep(step);
    const missing = required.filter(q => !answers[q]);
    
    if (missing.length > 0) {
      setError('Please answer all questions to continue.');
      return;
    }
    setError('');
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 4500);
  };

  if (showResults) {
    return <DiagnosticResultsPremium answers={answers} />;
  }

  if (isProcessing) {
    return <DiagnosticProcessing />;
  }

  const progress = (step / 6) * 100;
  const sectionNames = ['Profile', 'Systems', 'Processes', 'History', 'Sector', 'Finalization'];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans relative">
      {/* Abstract Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Header / Progress */}
      <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold tracking-widest text-sm text-white">
            <ShieldCheck className="w-5 h-5 text-primary" />
            GUILDS
          </div>
          <div className="flex-1 ml-8 max-w-[240px]">
            <div className="flex justify-between text-[10px] font-bold tracking-wider uppercase text-zinc-400 mb-2">
              <span>{sectionNames[step-1]}</span>
              <span>Step {step} of 6</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center pt-10 pb-24 px-6 relative z-10">
        <div className="w-full max-w-2xl">
          
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-white">Company Profile</h2>
              <p className="text-zinc-400 mb-10 text-lg">To calibrate the results to your real operational context.</p>
              
              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">What is your company's primary sector?</div>
                <div className="grid gap-3">
                  <OptionCard selected={answers.q_sector === 'healthcare'} onClick={() => setAnswer('q_sector', 'healthcare')} label="Healthcare / Occupational Health" />
                  <OptionCard selected={answers.q_sector === 'clinic'} onClick={() => setAnswer('q_sector', 'clinic')} label="Clinical Operations / Hospital" />
                  <OptionCard selected={answers.q_sector === 'fintech'} onClick={() => setAnswer('q_sector', 'fintech')} label="Fintech / Insurance / Finance" />
                  <OptionCard selected={answers.q_sector === 'operations'} onClick={() => setAnswer('q_sector', 'operations')} label="Operations / Logistics / Services" />
                  <OptionCard selected={answers.q_sector === 'other'} onClick={() => setAnswer('q_sector', 'other')} label="Other sector" />
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">How many employees do you have?</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <OptionCard isSmall selected={answers.q_employees === '10-20'} onClick={() => setAnswer('q_employees', '10-20')} label="10 to 20" />
                  <OptionCard isSmall selected={answers.q_employees === '21-50'} onClick={() => setAnswer('q_employees', '21-50')} label="21 to 50" />
                  <OptionCard isSmall selected={answers.q_employees === '51-100'} onClick={() => setAnswer('q_employees', '51-100')} label="51 to 100" />
                  <OptionCard isSmall selected={answers.q_employees === '101-150'} onClick={() => setAnswer('q_employees', '101-150')} label="101 to 150" />
                  <OptionCard isSmall selected={answers.q_employees === 'over_150'} onClick={() => setAnswer('q_employees', 'over_150')} label="More than 150" />
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">What is your approximate annual revenue (CAD)?</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <OptionCard isSmall selected={answers.q_revenue === 'up_to_1m'} onClick={() => setAnswer('q_revenue', 'up_to_1m')} label="Up to $1M" />
                  <OptionCard isSmall selected={answers.q_revenue === '1m_to_5m'} onClick={() => setAnswer('q_revenue', '1m_to_5m')} label="$1M to $5M" />
                  <OptionCard isSmall selected={answers.q_revenue === '5m_to_20m'} onClick={() => setAnswer('q_revenue', '5m_to_20m')} label="$5M to $20M" />
                  <OptionCard isSmall selected={answers.q_revenue === 'over_20m'} onClick={() => setAnswer('q_revenue', 'over_20m')} label="Over $20M" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-white">Digital Systems</h2>
              <p className="text-zinc-400 mb-10 text-lg">Let's map what exists and how the team actually uses it.</p>
              
              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-2">What systems does your company currently use?</div>
                <div className="text-xs text-zinc-500 mb-4">(Select all that apply)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <CheckCard selected={(answers.q_systems as string[] || []).includes('crm')} onClick={() => toggleCheck('q_systems', 'crm')} label="CRM / Sales" />
                  <CheckCard selected={(answers.q_systems as string[] || []).includes('erp')} onClick={() => toggleCheck('q_systems', 'erp')} label="ERP / Operations" />
                  <CheckCard selected={(answers.q_systems as string[] || []).includes('finance')} onClick={() => toggleCheck('q_systems', 'finance')} label="Finance / Accounting" />
                  <CheckCard selected={(answers.q_systems as string[] || []).includes('hr')} onClick={() => toggleCheck('q_systems', 'hr')} label="HR / Payroll" />
                  <CheckCard selected={(answers.q_systems as string[] || []).includes('bi')} onClick={() => toggleCheck('q_systems', 'bi')} label="BI / Reporting" />
                  <CheckCard selected={(answers.q_systems as string[] || []).includes('automation')} onClick={() => toggleCheck('q_systems', 'automation')} label="Custom Automations" />
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">What % of your team uses the systems daily as intended?</div>
                <div className="grid gap-3">
                  <OptionCard isSmall selected={answers.q_adoption === 'under_20'} onClick={() => setAnswer('q_adoption', 'under_20')} label="Less than 20% of the team" />
                  <OptionCard isSmall selected={answers.q_adoption === '20_to_40'} onClick={() => setAnswer('q_adoption', '20_to_40')} label="20% to 40% of the team" />
                  <OptionCard isSmall selected={answers.q_adoption === '40_to_60'} onClick={() => setAnswer('q_adoption', '40_to_60')} label="40% to 60% of the team" />
                  <OptionCard isSmall selected={answers.q_adoption === '60_to_80'} onClick={() => setAnswer('q_adoption', '60_to_80')} label="60% to 80% of the team" />
                  <OptionCard isSmall selected={answers.q_adoption === 'over_80'} onClick={() => setAnswer('q_adoption', 'over_80')} label="More than 80% of the team" />
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">How many "ghost systems" do you pay for but rarely use?</div>
                <div className="grid grid-cols-2 gap-3">
                  <OptionCard isSmall selected={answers.q_ghosts === 'none'} onClick={() => setAnswer('q_ghosts', 'none')} label="None" />
                  <OptionCard isSmall selected={answers.q_ghosts === '1'} onClick={() => setAnswer('q_ghosts', '1')} label="1 system" />
                  <OptionCard isSmall selected={answers.q_ghosts === '2'} onClick={() => setAnswer('q_ghosts', '2')} label="2 systems" />
                  <OptionCard isSmall selected={answers.q_ghosts === '3_plus'} onClick={() => setAnswer('q_ghosts', '3_plus')} label="3 or more" />
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">Do your systems integrate, or does the team copy data manually?</div>
                <div className="grid gap-3">
                  <OptionCard isSmall selected={answers.q_integration === 'yes'} onClick={() => setAnswer('q_integration', 'yes')} label="Yes, mostly integrated automatically" />
                  <OptionCard isSmall selected={answers.q_integration === 'partial'} onClick={() => setAnswer('q_integration', 'partial')} label="Partially — some manual work needed" />
                  <OptionCard isSmall selected={answers.q_integration === 'no'} onClick={() => setAnswer('q_integration', 'no')} label="No — we copy data manually between systems" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-white">Manual Processes</h2>
              <p className="text-zinc-400 mb-10 text-lg">Where your team works for the process, instead of the reverse.</p>
              
              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">How many hours per week does each employee waste on repetitive tasks?</div>
                <div className="grid grid-cols-2 gap-3">
                  <OptionCard isSmall selected={answers.q_hours === 'under_2'} onClick={() => setAnswer('q_hours', 'under_2')} label="Under 2h" />
                  <OptionCard isSmall selected={answers.q_hours === '2_to_5'} onClick={() => setAnswer('q_hours', '2_to_5')} label="2 to 5 hours" />
                  <OptionCard isSmall selected={answers.q_hours === '5_to_10'} onClick={() => setAnswer('q_hours', '5_to_10')} label="5 to 10 hours" />
                  <OptionCard isSmall selected={answers.q_hours === 'over_10'} onClick={() => setAnswer('q_hours', 'over_10')} label="Over 10h" />
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">How many critical processes still run entirely on spreadsheets or email?</div>
                <div className="grid grid-cols-2 gap-3">
                  <OptionCard isSmall selected={answers.q_processes === 'none'} onClick={() => setAnswer('q_processes', 'none')} label="None" />
                  <OptionCard isSmall selected={answers.q_processes === '1_to_2'} onClick={() => setAnswer('q_processes', '1_to_2')} label="1 to 2 processes" />
                  <OptionCard isSmall selected={answers.q_processes === '3_to_5'} onClick={() => setAnswer('q_processes', '3_to_5')} label="3 to 5 processes" />
                  <OptionCard isSmall selected={answers.q_processes === 'over_5'} onClick={() => setAnswer('q_processes', 'over_5')} label="More than 5" />
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">How long does it take to generate a full management report?</div>
                <div className="grid grid-cols-2 gap-3">
                  <OptionCard isSmall selected={answers.q_reports === 'real_time'} onClick={() => setAnswer('q_reports', 'real_time')} label="Real time" />
                  <OptionCard isSmall selected={answers.q_reports === 'days'} onClick={() => setAnswer('q_reports', 'days')} label="A few days" />
                  <OptionCard isSmall selected={answers.q_reports === '1_week'} onClick={() => setAnswer('q_reports', '1_week')} label="1 week" />
                  <OptionCard isSmall selected={answers.q_reports === 'over_1_week'} onClick={() => setAnswer('q_reports', 'over_1_week')} label="More than 1 week" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-white">History & Risk</h2>
              <p className="text-zinc-400 mb-10 text-lg">Past patterns determine future technological risks.</p>
              
              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">Has your company ever implemented a system that the team ended up abandoning?</div>
                <div className="grid gap-3">
                  <OptionCard isSmall selected={answers.q_history === 'no'} onClick={() => setAnswer('q_history', 'no')} label="Never — all fully adopted" />
                  <OptionCard isSmall selected={answers.q_history === '1_time'} onClick={() => setAnswer('q_history', '1_time')} label="Yes, once" />
                  <OptionCard isSmall selected={answers.q_history === 'more_than_1'} onClick={() => setAnswer('q_history', 'more_than_1')} label="Yes, more than once" />
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">If yes, what was the primary reason?</div>
                <div className="grid gap-3">
                  <OptionCard isSmall selected={answers.q_reason === 'training'} onClick={() => setAnswer('q_reason', 'training')} label="Insufficient training" />
                  <OptionCard isSmall selected={answers.q_reason === 'process'} onClick={() => setAnswer('q_reason', 'process')} label="System did not reflect reality" />
                  <OptionCard isSmall selected={answers.q_reason === 'resistance'} onClick={() => setAnswer('q_reason', 'resistance')} label="Team resistance" />
                  <OptionCard isSmall selected={answers.q_reason === 'na'} onClick={() => setAnswer('q_reason', 'na')} label="Not applicable" />
                </div>
              </div>

              <div className="mb-10">
                <div className="text-sm font-bold text-zinc-200 mb-4">Do you have someone actively dedicated to ensuring tech adoption?</div>
                <div className="grid gap-3">
                  <OptionCard isSmall selected={answers.q_dedicated === 'yes'} onClick={() => setAnswer('q_dedicated', 'yes')} label="Yes — dedicated person/role" />
                  <OptionCard isSmall selected={answers.q_dedicated === 'partial'} onClick={() => setAnswer('q_dedicated', 'partial')} label="Partially — they do it on top of other duties" />
                  <OptionCard isSmall selected={answers.q_dedicated === 'no'} onClick={() => setAnswer('q_dedicated', 'no')} label="No — nobody is specifically responsible" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-white">Specific Operations</h2>
              <p className="text-zinc-400 mb-10 text-lg">Final questions calibrated to your specific sector.</p>
              
              {['healthcare', 'clinic'].includes(answers.q_sector || '') ? (
                <>
                  <div className="mb-10">
                    <div className="text-sm font-bold text-zinc-200 mb-4">Time spent filling out records per patient/interaction?</div>
                    <div className="grid grid-cols-2 gap-3">
                      <OptionCard isSmall selected={answers.q_sector1 === 'under_5'} onClick={() => setAnswer('q_sector1', 'under_5')} label="Under 5 mins" />
                      <OptionCard isSmall selected={answers.q_sector1 === '10_to_20'} onClick={() => setAnswer('q_sector1', '10_to_20')} label="10 to 20 mins" />
                    </div>
                  </div>
                  <div className="mb-10">
                    <div className="text-sm font-bold text-zinc-200 mb-4">Adherence to PIPEDA and Health Data Privacy regulations?</div>
                    <div className="grid gap-3">
                      <OptionCard isSmall selected={answers.q_sector2 === 'compliant'} onClick={() => setAnswer('q_sector2', 'compliant')} label="Fully compliant and audited" />
                      <OptionCard isSmall selected={answers.q_sector2 === 'not_started'} onClick={() => setAnswer('q_sector2', 'not_started')} label="Not fully mapped or uncertain" />
                    </div>
                  </div>
                  <div className="mb-10">
                    <div className="text-sm font-bold text-zinc-200 mb-4">How many systems does the staff use daily to complete one workflow?</div>
                    <div className="grid grid-cols-2 gap-3">
                      <OptionCard isSmall selected={answers.q_sector3 === '1'} onClick={() => setAnswer('q_sector3', '1')} label="1 unified system" />
                      <OptionCard isSmall selected={answers.q_sector3 === 'over_5'} onClick={() => setAnswer('q_sector3', 'over_5')} label="More than 5" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-10">
                    <div className="text-sm font-bold text-zinc-200 mb-4">Average onboarding time for a new client/employee?</div>
                    <div className="grid grid-cols-2 gap-3">
                      <OptionCard isSmall selected={answers.q_sector1 === 'up_to_2_days'} onClick={() => setAnswer('q_sector1', 'up_to_2_days')} label="Up to 2 days" />
                      <OptionCard isSmall selected={answers.q_sector1 === 'over_14_days'} onClick={() => setAnswer('q_sector1', 'over_14_days')} label="Over 14 days" />
                    </div>
                  </div>
                  <div className="mb-10">
                    <div className="text-sm font-bold text-zinc-200 mb-4">% of approvals done informally (Email, Slack, WhatsApp)?</div>
                    <div className="grid grid-cols-2 gap-3">
                      <OptionCard isSmall selected={answers.q_sector2 === 'under_20'} onClick={() => setAnswer('q_sector2', 'under_20')} label="Under 20%" />
                      <OptionCard isSmall selected={answers.q_sector2 === 'over_80'} onClick={() => setAnswer('q_sector2', 'over_80')} label="Over 80%" />
                    </div>
                  </div>
                  <div className="mb-10">
                    <div className="text-sm font-bold text-zinc-200 mb-4">How often do errors occur due to outdated data between departments?</div>
                    <div className="grid grid-cols-2 gap-3">
                      <OptionCard isSmall selected={answers.q_sector3 === 'rarely'} onClick={() => setAnswer('q_sector3', 'rarely')} label="Rarely" />
                      <OptionCard isSmall selected={answers.q_sector3 === 'daily'} onClick={() => setAnswer('q_sector3', 'daily')} label="Daily" />
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {step === 6 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="bg-secondary border border-zinc-800 rounded-3xl p-8 md:p-12 text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-6 relative z-10" />
                <h2 className="font-serif text-3xl font-bold mb-4 text-white relative z-10">Ready for the Results!</h2>
                <p className="text-zinc-400 mb-8 text-sm leading-relaxed relative z-10">
                  We've calculated your Maturity Score and the estimated financial loss of your operation. Where should we send your executive summary?
                </p>
                
                <div className="space-y-5 text-left relative z-10">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Your Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
                      <input 
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                        placeholder="John Doe" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Professional Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
                      <input 
                        value={leadData.email}
                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                        type="email"
                        className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" 
                        placeholder="john@company.com" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
            {step > 1 ? (
              <button 
                className="flex items-center text-zinc-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-colors font-medium" 
                onClick={() => setStep(s => s - 1)}
              >
                <ChevronLeft className="w-5 h-5 mr-1" /> Back
              </button>
            ) : <div />}
            
            <div className="flex items-center gap-4">
              {error && <span className="text-red-400 text-sm font-medium">{error}</span>}
              <button 
                onClick={handleNext} 
                className="flex items-center bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 px-8 rounded-xl transition-colors shadow-lg shadow-primary/20"
              >
                {step === 6 ? 'Generate My Assessment' : 'Continue'} 
                {step !== 6 && <ChevronRight className="w-5 h-5 ml-1" />}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PROCESSING ANIMATION
// ----------------------------------------------------
function DiagnosticProcessing() {
  const [activeStep, setActiveStep] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(s => (s < 4 ? s + 1 : s));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    'Analyzing operational profile...',
    'Calculating inefficiencies in CAD ($)...',
    'Mapping critical process bottlenecks...',
    'Generating G-FORGE Maturity Score...',
    'Building 90-day architectural roadmap...'
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="flex gap-2 mb-10">
        {['G', 'F', 'O', 'R', 'G', 'E'].map((letter, i) => (
          <div key={i} className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 text-xl font-black transition-all duration-700 ${activeStep >= i * 0.8 ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-secondary border-zinc-800 text-zinc-600'}`}>
            {letter}
          </div>
        ))}
      </div>
      
      <div className="w-16 h-16 border-4 border-zinc-800 border-t-primary rounded-full animate-spin mb-8" />
      <h2 className="font-serif text-3xl font-bold text-white mb-8">Processing Assessment</h2>
      
      <div className="space-y-4 text-left max-w-sm mx-auto w-full">
        {steps.map((text, i) => (
          <div key={i} className="flex items-center gap-4 text-sm font-medium">
            <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-all ${activeStep > i ? 'bg-green-500' : activeStep === i ? 'bg-primary animate-pulse' : 'bg-zinc-800'}`} />
            <span className={activeStep >= i ? 'text-zinc-200' : 'text-zinc-600'}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PREMIUM RESULTS & PAYWALL
// ----------------------------------------------------
function DiagnosticResultsPremium({ answers }: { answers: DiagnosticAnswers }) {
  const score = calcScore(answers);
  const loss = calcLoss(answers);
  const phase = getPhase(score);
  const benchmark = getBenchmark(answers.q_sector || '');
  const gaps = getGaps(answers);
  const roadmap = getDynamicRoadmap(score);

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [price, setPrice] = useState(97);

  const applyCoupon = () => {
    const c = coupon.trim().toUpperCase();
    if (c === 'GUILDS50') {
      setPrice(47);
      setCouponError('');
    } else if (c === 'PILOT100' || c === 'LABGUEST') {
      setPrice(0);
      setCouponError('');
      setIsUnlocked(true);
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-24">
      {/* Navbar Result */}
      <div className="bg-zinc-950 border-b border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold tracking-widest text-sm text-white">
            <ShieldCheck className="w-5 h-5 text-primary" />
            GUILDS
          </div>
          <div className="text-xs text-zinc-500 font-medium">Assessment Completed</div>
        </div>
      </div>

      {/* Hero Teaser */}
      <div className="bg-secondary border-b border-zinc-800 py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-xs font-bold tracking-widest uppercase text-primary mb-6">Operational Maturity Assessment</div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12 tracking-tight text-white">The Cost of Inefficiency.</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-md">
              <div className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">Estimated Annual Loss</div>
              <div className="text-4xl font-bold text-red-400 mb-2 font-serif">
                {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(loss.total)}
              </div>
              <div className="text-sm text-red-300/70">In manual hours, unused systems, and rework.</div>
            </div>
            
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">G-FORGE™ Score</div>
              <div className="text-4xl font-bold text-primary mb-2 font-serif">{score}/100</div>
              <div className="text-sm text-zinc-400">Classification: <strong className="text-zinc-200">{phase.name}</strong></div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Benchmarking ({benchmark.label})</div>
              <div className="text-4xl font-bold text-zinc-300 mb-2 font-serif">{score - benchmark.score > 0 ? '+' : ''}{score - benchmark.score} pts</div>
              <div className="text-sm text-zinc-400">Compared to your industry average ({benchmark.score}/100).</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content (Paywall Gate) */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 font-serif text-white">
          <BarChart3 className="w-6 h-6 text-primary" />
          Detailed Analysis & Roadmap
        </h2>

        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-secondary/50">
          <div className={`p-8 md:p-12 transition-all duration-1000 ${!isUnlocked ? 'filter blur-[8px] opacity-40 pointer-events-none select-none' : ''}`}>
            {/* The Locked Content */}
            <div className="space-y-16">
              
              {/* Gaps Section */}
              <div>
                <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-sm border-b border-zinc-800 pb-2">Critical Bottlenecks Identified</h3>
                <div className="grid gap-6">
                  {gaps.map((g, i) => (
                    <div key={i} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 text-lg">
                          {i + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-white text-lg">{g.title}</h4>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/20">{g.impact}</span>
                          </div>
                          <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{g.desc}</p>
                          <div className="text-xs font-medium text-primary bg-primary/10 inline-flex items-center px-3 py-2 rounded-lg border border-primary/20">
                            Recommended Action: {g.action}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap Section */}
              <div>
                <h3 className="text-lg font-bold text-white mb-8 uppercase tracking-wider text-sm border-b border-zinc-800 pb-2">90-Day Strategic Roadmap</h3>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-zinc-800">
                  {roadmap.map((r, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-secondary text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        {i + 1}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                        <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">{r.period}</div>
                        <h4 className="font-bold text-white mb-3 text-lg">{r.title}</h4>
                        <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{r.desc}</p>
                        <div className="text-xs font-medium text-emerald-400 bg-emerald-500/10 inline-block px-3 py-1.5 rounded-md">
                          ↑ Expected Gain: {r.gain}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Paywall Overlay */}
          {!isUnlocked && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-6 text-center">
              <div className="max-w-md w-full bg-secondary border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />
                <Lock className="w-10 h-10 text-primary mx-auto mb-6 relative z-10" />
                <h3 className="font-serif text-3xl font-bold text-white mb-4 relative z-10">Unlock the Full Assessment</h3>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed relative z-10">
                  Access the detailed list of operational bottlenecks, your systems map, and the 90-day strategic roadmap custom-generated for your business.
                </p>
                
                <div className="bg-zinc-900 rounded-2xl p-5 mb-8 text-left border border-zinc-800 relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-zinc-300">Complete Assessment Report</span>
                    <span className="font-bold text-white">$97.00</span>
                  </div>
                  {price < 97 && (
                    <div className="flex justify-between items-center text-emerald-400 text-sm font-medium mb-2">
                      <span>Discount Applied</span>
                      <span>- ${97 - price}.00</span>
                    </div>
                  )}
                  <div className="border-t border-zinc-800 mt-4 pt-4 flex justify-between items-center">
                    <span className="font-bold text-white uppercase text-xs tracking-wider">Total (CAD)</span>
                    <span className="font-serif font-bold text-2xl text-primary">${price}.00</span>
                  </div>
                </div>

                {price > 0 && (
                  <button 
                    onClick={() => {
                      setIsUnlocked(true); // Mocking successful payment
                    }} 
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm rounded-xl mb-6 transition-colors shadow-lg shadow-primary/20 relative z-10"
                  >
                    Proceed to Secure Payment
                  </button>
                )}

                <div className="mt-2 pt-6 border-t border-zinc-800 relative z-10">
                  <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider font-medium">Have a partner coupon?</p>
                  <div className="flex gap-2">
                    <input 
                      value={coupon}
                      onChange={e => setCoupon(e.target.value)}
                      placeholder="COUPON" 
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl text-center uppercase focus:outline-none focus:border-primary text-sm h-12 text-white placeholder:text-zinc-700" 
                    />
                    <button 
                      onClick={applyCoupon} 
                      className="px-6 h-12 bg-white/5 hover:bg-white/10 text-white text-sm font-medium border border-white/10 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-red-400 text-xs mt-3">{couponError}</p>}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
