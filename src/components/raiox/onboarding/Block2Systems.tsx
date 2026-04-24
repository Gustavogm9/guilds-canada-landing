'use client';
import { useState } from 'react';
import { useSaveAnswer } from '@/hooks/useSaveAnswer';
import { Button } from '@/components/ui/button';
import { OptionCard } from './fields/OptionCard';
import { MultiSelectCard } from './fields/MultiSelectCard';
import { SliderField } from './fields/SliderField';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface BlockProps {
  diagnosticId: string;
  onNext: () => void;
  onPrev: () => void;
}

const SYSTEMS = [
  'ERP (Totvs, SAP, Omie, Bling, etc.)',
  'CRM (HubSpot, Pipedrive, Salesforce, etc.)',
  'Spreadsheets (Excel / Google Sheets)',
  'WhatsApp Business / Groups',
  'Proprietary / Legacy System',
  'Project Tools (Trello, Monday, Notion)',
  'BI / Analytics (Power BI, Looker, GA4)',
  'No formal system',
];

const INTEGRATION_LEVELS = [
  { label: 'Not integrated at all', description: 'Each system is an island. Data is copied manually.' },
  { label: 'Partially integrated', description: 'Some specific integrations (e.g. CRM to email), but not across all tools.' },
  { label: 'Well integrated', description: 'Main systems talk to each other. Few manual processes.' },
  { label: 'Fully integrated', description: 'API-first, data flows automatically across all points.' },
];

export function Block2Systems({ diagnosticId, onNext, onPrev }: BlockProps) {
  const { saveAnswers } = useSaveAnswer();
  const [loading, setLoading] = useState(false);
  
  const [systems, setSystems] = useState<string[]>([]);
  const [adoption, setAdoption] = useState(50);
  const [ghostSystems, setGhostSystems] = useState<string>('');
  const [integration, setIntegration] = useState<string>('');
  const [manualHours, setManualHours] = useState(10);

  const toggleSystem = (sys: string) => {
    setSystems(prev => prev.includes(sys) ? prev.filter(s => s !== sys) : [...prev, sys]);
  };

  const handleNext = async () => {
    if (systems.length === 0 || !integration) {
      alert("Please select at least one system and the integration level.");
      return;
    }

    setLoading(true);
    const { success } = await saveAnswers(diagnosticId, 2, [
      { question_key: 'q_sistemas', value_array: systems },
      { question_key: 'q_adocao', value_text: `${adoption}%` },
      { question_key: 'q_fantasmas', value_text: ghostSystems },
      { question_key: 'q_integracao', value_text: integration },
      { question_key: 'q_horas_manuais', value_text: `${manualHours}h/week` },
    ]);
    setLoading(false);

    if (success) onNext();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display text-white mb-2">Operations & Systems</h2>
        <p className="text-slate-400 text-sm">Understanding the digital infrastructure that supports (or bottlenecks) your operation.</p>
      </div>

      <div className="space-y-6">
        {/* Sistemas usados */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-200">What systems does the operation use daily?</label>
          <p className="text-xs text-slate-500">Select all that apply.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SYSTEMS.map(s => (
              <MultiSelectCard
                key={s}
                label={s}
                selected={systems.includes(s)}
                onClick={() => toggleSystem(s)}
              />
            ))}
          </div>
        </div>

        {/* Adoção */}
        <SliderField
          label="What is the actual adoption level of the systems by the team?"
          value={adoption}
          onChange={setAdoption}
          min={0}
          max={100}
          step={5}
          suffix="%"
          labels={{ min: '0% — No one uses them', max: '100% — Everyone uses them' }}
        />

        {/* Sistemas fantasmas */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-200">Are there contracted systems that almost no one uses?</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Yes, 1 or 2', 'Yes, several', 'No'].map(opt => (
              <OptionCard
                key={opt}
                label={opt}
                selected={ghostSystems === opt}
                onClick={() => setGhostSystems(opt)}
              />
            ))}
          </div>
        </div>

        {/* Integração */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-200">What is the level of integration between the systems?</label>
          <div className="grid grid-cols-1 gap-3">
            {INTEGRATION_LEVELS.map(lvl => (
              <OptionCard
                key={lvl.label}
                label={lvl.label}
                description={lvl.description}
                selected={integration === lvl.label}
                onClick={() => setIntegration(lvl.label)}
              />
            ))}
          </div>
        </div>

        {/* Horas manuais */}
        <SliderField
          label="How many hours a week does the team spend on repetitive manual tasks?"
          value={manualHours}
          onChange={setManualHours}
          min={0}
          max={60}
          step={2}
          suffix="h"
          labels={{ min: '0h', max: '60h+/week' }}
        />
      </div>

      <div className="pt-6 mt-6 border-t border-white/10 flex justify-between">
        <Button variant="ghost" onClick={onPrev} className="text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={loading || systems.length === 0 || !integration}
          className="bg-blue-600 hover:bg-blue-500 text-white min-w-[140px]"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Save and Continue
        </Button>
      </div>
    </div>
  );
}

