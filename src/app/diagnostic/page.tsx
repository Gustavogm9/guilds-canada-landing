import { DiagnosticEngine } from '@/components/diagnostic/DiagnosticEngine';

export const metadata = {
  title: 'Maturity Assessment | Guilds Canada',
  description: 'Evaluate your operational maturity and estimate the cost of inefficiency.',
};

export default function DiagnosticPage() {
  return (
    <main>
      <DiagnosticEngine />
    </main>
  );
}
