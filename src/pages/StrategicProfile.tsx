import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { 
  ChevronLeft, 
  Target, 
  Brain, 
  Sword, 
  Shield, 
  Zap, 
  Dna,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { Card } from '@/components/ui/card.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

export default function StrategicProfile() {
  const navigate = useNavigate();
  const { user } = useStore();

  const radarData = [
    { subject: 'Estrategia', A: user.mastery.Strategy, fullMark: 100 },
    { subject: 'Táctica', A: user.mastery.Tactics, fullMark: 100 },
    { subject: 'Finales', A: user.mastery.Endgames, fullMark: 100 },
    { subject: 'Cálculo', A: user.mastery.Calculation, fullMark: 100 },
    { subject: 'Profilaxis', A: user.mastery.Prophylaxis, fullMark: 100 },
    { subject: 'Estructura', A: user.mastery.Structures, fullMark: 100 },
  ];

  const categories = [
    { name: 'Estrategia', val: user.mastery.Strategy, icon: Brain, color: 'text-blue-400' },
    { name: 'Táctica', val: user.mastery.Tactics, icon: Sword, color: 'text-red-400' },
    { name: 'Finales', val: user.mastery.Endgames, icon: Trophy, color: 'text-yellow-400' },
    { name: 'Cálculo', val: user.mastery.Calculation, icon: Target, color: 'text-green-400' },
    { name: 'Profilaxis', val: user.mastery.Prophylaxis, icon: Shield, color: 'text-purple-400' },
    { name: 'Estructura', val: user.mastery.Structures, icon: Zap, color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] pb-20">
      <header className="p-6 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-white/40" />
          </button>
          <div>
            <h1 className="text-xs font-bold tracking-widest uppercase">Perfil Estratégico</h1>
            <p className="text-[10px] opacity-40 font-mono italic">ADN DE JUGADOR</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 grid lg:grid-cols-12 gap-12">
        {/* Left: DNA Summary */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-[#0A0A0A] border border-white/5 rounded-[2rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8">
               <Dna className="w-12 h-12 text-[#F27D26] opacity-10 animate-pulse" />
            </div>
            
            <h2 className="text-xs font-bold uppercase tracking-widest opacity-30 mb-2">Estilo Dominante</h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-light italic serif text-[#F27D26] uppercase">{user.trait}</span>
            </div>
            <p className="text-sm opacity-50 leading-relaxed font-light mb-8">
              Tu patrón de juego indica una inclinación hacia la {user.trait === 'Técnico' ? 'precisión mecánica y el aprovechamiento de pequeñas ventajas.' : user.trait === 'Agresivo' ? 'búsqueda constante de desequilibrios y combinaciones tácticas.' : 'comprensión profunda de las debilidades estructurales.'}
            </p>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-30">Habilidades</h3>
              {categories.map((cat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-mono">
                    <span className="flex items-center gap-2">
                      <cat.icon className={`w-3 h-3 ${cat.color}`} />
                      {cat.name}
                    </span>
                    <span>{cat.val}%</span>
                  </div>
                  <Progress value={cat.val} className="h-1 bg-white/5" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Visualization */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="bg-[#0A0A0A] border-white/5 p-8 rounded-[2rem] h-[500px]">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-xs font-bold uppercase tracking-widest opacity-30">Balance de Inteligencia</h2>
                <Brain className="w-5 h-5 text-white/10" />
             </div>
             <ResponsiveContainer width="100%" height="85%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                  <Radar
                    name="Mastery"
                    dataKey="A"
                    stroke="#F27D26"
                    fill="#F27D26"
                    fillOpacity={0.3}
                  />
                </RadarChart>
             </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-2 gap-4">
             <Card className="bg-white/5 border-white/5 p-6 rounded-3xl">
                <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <h4 className="text-xs font-bold uppercase mb-1">Fortaleza</h4>
                <p className="text-sm opacity-50 font-light">Comprensión de finales técnicos.</p>
             </Card>
             <Card className="bg-white/5 border-white/5 p-6 rounded-3xl">
                <div className="w-10 h-10 rounded-xl bg-red-400/10 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-red-400" />
                </div>
                <h4 className="text-xs font-bold uppercase mb-1">Debilidad</h4>
                <p className="text-sm opacity-50 font-light">Tiempos de cálculo bajo presión.</p>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
