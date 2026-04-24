'use client';
import { useState } from 'react';
import { useSaveAnswer } from '@/hooks/useSaveAnswer';
import { Button } from '@/components/ui/button';
import { OptionCard } from './fields/OptionCard';
import { Loader2 } from 'lucide-react';

interface BlockProps {
  diagnosticId: string;
  onNext: () => void;
  onPrev?: () => void;
}

const SECTORS = [
  'Healthcare (Clinics, Hospitals)',
  'B2B Services',
  'Technology / SaaS',
  'Education / Courses',
  'Retail / E-commerce',
  'Other'
];

export function Block1Profile({ diagnosticId, onNext }: BlockProps) {
  const { saveAnswers } = useSaveAnswer();
  const [loading, setLoading] = useState(false);
  
  // Local state for answers
  const [sector, setSector] = useState<string>('');
  const [employees, setEmployees] = useState<string>('');
  const [revenue, setRevenue] = useState<string>('');
  const [businessModel, setBusinessModel] = useState<string>('');

  const handleNext = async () => {
    // Basic validation
    if (!sector || !employees || !revenue || !businessModel) {
      alert("Please fill in all fields to continue.");
      return;
    }

    setLoading(true);
    const { success, error } = await saveAnswers(diagnosticId, 1, [
      { question_key: 'q_setor', value_text: sector },
      { question_key: 'q_funcionarios', value_text: employees },
      { question_key: 'q_faturamento', value_text: revenue },
      { question_key: 'q_modelo', value_text: businessModel },
    ]);
    setLoading(false);

    if (success) {
      onNext();
    } else {
      console.error(error);
      alert("Error saving answers. Please try again.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display text-white mb-2">Knowing your operation</h2>
        <p className="text-slate-400 text-sm">For the diagnostic to be accurate, we need to understand the scale of your challenge.</p>
      </div>

      <div className="space-y-6">
        {/* Setor */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-200">What is your primary industry?</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SECTORS.map(s => (
              <OptionCard
                key={s}
                label={s}
                selected={sector === s}
                onClick={() => setSector(s)}
              />
            ))}
          </div>
        </div>

        {/* Modelo de Negócio */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-200">What is your business model?</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['B2B (Business)', 'B2C (Consumer)', 'Hybrid'].map(m => (
              <OptionCard
                key={m}
                label={m}
                selected={businessModel === m}
                onClick={() => setBusinessModel(m)}
              />
            ))}
          </div>
        </div>

        {/* Funcionários */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-200">What is your current team size?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {['1 to 10', '11 to 50', '51 to 200', 'Over 200'].map(e => (
              <OptionCard
                key={e}
                label={e}
                selected={employees === e}
                onClick={() => setEmployees(e)}
              />
            ))}
          </div>
        </div>

        {/* Faturamento */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-200">What is your estimated annual revenue?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Up to $1 Million', '$1M to $5 Million', '$5M to $20 Million', 'Above $20 Million'].map(r => (
              <OptionCard
                key={r}
                label={r}
                selected={revenue === r}
                onClick={() => setRevenue(r)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
        <Button 
          onClick={handleNext} 
          disabled={loading || !sector || !employees || !revenue || !businessModel}
          className="bg-blue-600 hover:bg-blue-500 text-white min-w-[140px]"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Save and Continue
        </Button>
      </div>
    </div>
  );
}

