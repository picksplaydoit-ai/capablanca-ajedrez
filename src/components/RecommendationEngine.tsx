
import React from 'react';
import { Card } from '@/components/ui/card.tsx';
import { useStore } from '@/store/useStore';
import { BrainCircuit, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RecommendationEngine() {
  const { user } = useStore();
  const navigate = useNavigate();

  // Simple local recommendation logic
  const getRecommendation = () => {
    const { mastery } = user;
    const sorted = Object.entries(mastery).sort(([, a], [, b]) => (a as number) - (b as number));
    const weakest = sorted[0][0];
    
    const recommendations: Record<string, { title: string, desc: string }> = {
      Estrategia: { title: "Comprensión de Centro", desc: "Tus piezas necesitan mejores casillas centrales." },
      Táctica: { title: "Patrones de Mate", desc: "Falta precisión en el remate táctico." },
      Finales: { title: "Técnica de Oposición", desc: "El Rey debe activarse más en el final." },
      Cálculo: { title: "Visualización Profunda", desc: "Entrena variantes de 3+ jugadas." },
      Profilaxis: { title: "Sentido del Peligro", desc: "No ignores los planes del rival." },
      Estructuras: { title: "Cadenas de Peones", desc: "Coordina mejor tus rupturas." },
    };

    return { 
      category: weakest, 
      ...recommendations[weakest as keyof typeof recommendations] 
    };
  };

  const rec = getRecommendation();

  return (
    <Card className="bg-[#0A0A0A] border-white/5 p-6 rounded-3xl overflow-hidden relative group cursor-pointer hover:border-[#F27D26]/30 transition-all" onClick={() => navigate('/training')}>
      <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#F27D26] opacity-[0.02] blur-3xl rounded-full group-hover:opacity-[0.05] transition-opacity" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <BrainCircuit className="w-5 h-5 text-[#F27D26]" />
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Sugerencia AI Local</h3>
          <p className="text-sm font-medium">Foco Estratégico</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <AlertCircle className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Debilidad Detectada</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-1">{rec.title}</h4>
          <p className="text-[11px] text-white/40 leading-relaxed italic">"{rec.desc}"</p>
        </div>

        <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-[#F27D26] font-bold">
          <span>Ver Módulo: {rec.category}</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </Card>
  );
}
