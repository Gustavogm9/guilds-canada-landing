'use client';
import { useState } from 'react';
import { useSaveAnswer } from '@/hooks/useSaveAnswer';
import { Button } from '@/components/ui/button';
import { OptionCard } from './fields/OptionCard';
import { MultiSelectCard } from './fields/MultiSelectCard';
import { TextAreaField } from './fields/TextAreaField';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface BlockProps {
  diagnosticId: string;
  onNext: () => void;
  onPrev: () => void;
}

const CHANNELS = [
  'Institutional website',
  'Instagram',
  'LinkedIn',
  'Facebook',
  'TikTok',
  'YouTube',
  'Blog / own content',
  'Google Business Profile',
  'No active channel',
];

const POSITIONING_REVIEW = [
  'In the last 6 months',
  'Between 6 months and 1 year',
  'More than 1 year ago',
  'Never been formalized',
];

export function Block4Brand({ diagnosticId, onNext, onPrev }: BlockProps) {
  const { saveAnswers } = useSaveAnswer();
  const [loading, setLoading] = useState(false);

  const [siteUrl, setSiteUrl] = useState('');
  const [channels, setChannels] = useState<string[]>([]);
  const [differentials, setDifferentials] = useState('');
  const [positioningReview, setPositioningReview] = useState('');

  const toggleChannel = (ch: string) => {
    setChannels(prev => prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]);
  };

  const handleNext = async () => {
    if (channels.length === 0 || !positioningReview) {
      alert("Select at least one channel and when you reviewed the positioning.");
      return;
    }

    setLoading(true);
    const { success } = await saveAnswers(diagnosticId, 4, [
      { question_key: 'q_site_url', value_text: siteUrl || null },
      { question_key: 'q_canais_ativos', value_array: channels },
      { question_key: 'q_diferenciais', value_free: differentials || null },
      { question_key: 'q_posicionamento', value_text: positioningReview },
    ]);
    setLoading(false);

    if (success) onNext();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold font-display text-white mb-2">Brand & Communication</h2>
        <p className="text-slate-400 text-sm">The clarity of your message directly impacts conversion. Let's audit.</p>
      </div>

      <div className="space-y-6">
        {/* URL do site */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-200">Your website URL</label>
          <p className="text-xs text-slate-500">If you don't have one, leave it blank.</p>
          <input
            type="url"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="https://yourcompany.com"
            className="w-full rounded-xl bg-slate-900/50 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-white placeholder:text-slate-600 text-sm p-4 transition-colors outline-none"
          />
        </div>

        {/* Canais ativos */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-200">Where is your brand present digitally?</label>
          <p className="text-xs text-slate-500">Select all channels that you keep active.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CHANNELS.map(ch => (
              <MultiSelectCard
                key={ch}
                label={ch}
                selected={channels.includes(ch)}
                onClick={() => toggleChannel(ch)}
              />
            ))}
          </div>
        </div>

        {/* Diferenciais */}
        <TextAreaField
          label="If a customer asked 'why hire you and not the competitor?', what would you answer?"
          placeholder="E.g. 'We are the only ones with X certification in the region', 'Our customer service is 24/7', 'We have 15 years in the market with a 92% retention rate'..."
          value={differentials}
          onChange={setDifferentials}
          hint="The more specific, the better the positioning analysis."
        />

        {/* Última revisão de posicionamento */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-200">When was the last time you formally reviewed your brand positioning?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POSITIONING_REVIEW.map(opt => (
              <OptionCard
                key={opt}
                label={opt}
                selected={positioningReview === opt}
                onClick={() => setPositioningReview(opt)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-white/10 flex justify-between">
        <Button variant="ghost" onClick={onPrev} className="text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={loading || channels.length === 0 || !positioningReview}
          className="bg-blue-600 hover:bg-blue-500 text-white min-w-[140px]"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Save and Continue
        </Button>
      </div>
    </div>
  );
}

