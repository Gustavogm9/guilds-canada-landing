'use client';
import { useState, useEffect } from 'react';
import type { DashboardData } from '@/components/raiox/dashboard/mockData';
import { MOCK_DASHBOARD_DATA } from '@/components/raiox/dashboard/mockData';
import { supabaseRaiox } from '@/lib/supabase-raiox';
import { useDiagnostic } from './useDiagnostic';

export function useDashboardData() {
  const { diagnostic } = useDiagnostic();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!diagnostic?.id || diagnostic.status !== 'completed') {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch scores
        const { data: scores, error: scoresError } = await supabaseRaiox
          .from('diagnostic_scores')
          .select('*')
          .eq('diagnostic_id', diagnostic.id)
          .single();

        if (scoresError) throw scoresError;

        // Fetch narratives
        const { data: narratives, error: narrativesError } = await supabaseRaiox
          .from('diagnostic_narratives')
          .select('section_id, content')
          .eq('diagnostic_id', diagnostic.id);

        if (narrativesError) throw narrativesError;

        if (!scores || !narratives || narratives.length === 0) {
          throw new Error('Dados incompletos');
        }

        // Map narratives to object
        const narrativesMap: Record<string, any> = {};
        narratives.forEach(n => {
          narrativesMap[n.section_id] = n.content;
        });

        // Construct DashboardData using mock base to satisfy strict DashboardData interface constraints
        const dashboardData: DashboardData = {
          ...MOCK_DASHBOARD_DATA,
          companyName: narrativesMap.empresa?.name || 'Sua Empresa',
          loss: { 
            ...MOCK_DASHBOARD_DATA.loss,
            total: scores.annual_loss_estimate || 0 
          },
          fitScore: {
            ...MOCK_DASHBOARD_DATA.fitScore,
            total: scores.fit_score || 0
          },
          phase: {
            ...MOCK_DASHBOARD_DATA.phase,
            name: 'Estruturação',
            description: 'Foco em estabilizar processos.'
          }
        };

        setData(dashboardData);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Ocorreu um erro ao carregar seu dashboard.');
        // Fallback to mock data during initial tests if real data fails
        // setData(MOCK_DASHBOARD_DATA);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [diagnostic?.id, diagnostic?.status]);

  return { data, loading, error, diagnostic };
}


