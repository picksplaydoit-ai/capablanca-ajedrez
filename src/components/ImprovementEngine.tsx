
import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { Zap, Target, Brain, Activity } from 'lucide-react';

export default function ImprovementEngine() {
  const { user } = useStore();
  
  const data = [
    { subject: 'Estrategia', A: user.mastery.Strategy, fullMark: 150 },
    { subject: 'Táctica', A: user.mastery.Tactics, fullMark: 150 },
    { subject: 'Finales', A: user.mastery.Endgames, fullMark: 150 },
    { subject: 'Cálculo', A: user.mastery.Calculation, fullMark: 150 },
    { subject: 'Profilaxis', A: user.mastery.Prophylaxis, fullMark: 150 },
    { subject: 'Estructura', A: user.mastery.Structures, fullMark: 150 },
  ];

  const totalMastery = Object.values(user.mastery).reduce((a, b) => a + b, 0);

  return (
    <Card className="bg-[#0A0A0A] border-white/5 p-8 rounded-[2.5rem] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F27D26] opacity-60 mb-1">Algoritmo de Mejora</h3>
          <h2 className="text-2xl font-light italic serif">ADN Posicional</h2>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-[#F27D26]/10 flex items-center justify-center text-[#F27D26]">
          <Activity className="w-5 h-5" />
        </div>
      </div>

      <div className="h-64 -mx-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }} />
            <Radar
              name="Mastery"
              dataKey="A"
              stroke="#F27D26"
              fill="#F27D26"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
           <p className="text-[10px] font-mono opacity-40 uppercase mb-1">Precisión</p>
           <p className="text-lg font-bold text-white">84%</p>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
           <p className="text-[10px] font-mono opacity-40 uppercase mb-1">Impulsividad</p>
           <p className="text-lg font-bold text-red-500/80">Baja</p>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <div className="flex items-center gap-3 text-xs font-light text-white/40 italic">
          <Brain className="w-4 h-4 text-[#F27D26]" />
          "Tu juego automático ha disminuido. Estás calculando estructuras antes de mover."
        </div>
      </div>
    </Card>
  );
}
