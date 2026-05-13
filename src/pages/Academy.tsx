
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { academyModules } from '@/data/academy';
import { 
  ChevronLeft, 
  Layers, 
  Shield, 
  Trophy, 
  Zap, 
  Play, 
  Lock,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { Card } from '@/components/ui/card.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import { Button } from '@/components/ui/button.tsx';

const iconMap = {
  Layers: Layers,
  Shield: Shield,
  Trophy: Trophy,
  Zap: Zap
};

export default function Academy() {
  const navigate = useNavigate();
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] pb-20">
      <header className="p-6 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-white/40" />
          </button>
          <div>
            <h1 className="text-xs font-bold tracking-widest uppercase italic">Capablanca Academy</h1>
            <p className="text-[10px] opacity-40 font-mono tracking-widest">RUTA DE MAESTRÍA</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] font-mono opacity-40 uppercase">Puntos de Maestría</p>
              <p className="text-sm font-bold text-[#F27D26]">{Object.values(user.mastery).reduce((a, b) => a + b, 0)} MP</p>
           </div>
           <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
              <BookOpen className="w-4 h-4 opacity-40" />
           </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-16">
        <div className="mb-16 text-center space-y-4">
           <h2 className="text-6xl font-light italic serif tracking-tight">El Camino de la Claridad</h2>
           <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed">
              No se trata de calcular mil variantes, sino de entender la posición. 
              Sigue la ruta diseñada para reprogramar tu intuición ajedrecística.
           </p>
        </div>

        <div className="space-y-12 relative">
          {/* Vertical Line Connector */}
          <div className="absolute left-[39px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#F27D26]/40 via-white/5 to-transparent hidden md:block" />

          {academyModules.map((module, index) => {
            const Icon = iconMap[module.icon as keyof typeof iconMap] || BookOpen;
            const progress = user.academyProgress[module.id] || 0;
            const isUnlocked = index === 0 || (user.academyProgress[academyModules[index-1].id] || 0) >= 80;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative md:pl-24"
              >
                {/* Node on line */}
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-[#050505] flex items-center justify-center z-10 hidden md:flex ${isUnlocked ? 'bg-[#111] text-[#F27D26]' : 'bg-[#080808] text-white/10'}`}>
                   {isUnlocked ? <Icon className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                </div>

                <Card className={`group relative bg-[#0A0A0A] border-white/5 p-8 rounded-[2.5rem] overflow-hidden transition-all duration-500 ${isUnlocked ? 'hover:border-[#F27D26]/30' : 'opacity-40 grayscale pointer-events-none'}`}>
                   {/* Background Glow */}
                   <div className={`absolute -right-20 -top-20 w-64 h-64 blur-[100px] rounded-full transition-opacity duration-700 ${progress === 100 ? 'bg-green-500/5' : 'bg-[#F27D26]/5 group-hover:opacity-100 opacity-0'}`} />

                   <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-8 space-y-4">
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono p-1 px-2 rounded-md bg-white/5 text-white/40 uppercase tracking-widest">{module.difficulty}</span>
                            {progress === 100 && (
                               <div className="flex items-center gap-1.5 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                                  <CheckCircle2 className="w-3 h-3" /> Completado
                               </div>
                            )}
                         </div>
                         
                         <div>
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#F27D26] opacity-60 mb-1">{module.subtitle}</h3>
                            <h2 className="text-3xl font-light italic serif text-white">{module.title}</h2>
                         </div>
                         
                         <p className="text-sm text-white/40 font-light leading-relaxed max-w-lg">
                            {module.description}
                         </p>

                         <div className="pt-4 space-y-2">
                            <div className="flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-widest">
                               <span>Dominio del Módulo</span>
                               <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-1 bg-white/5" />
                         </div>
                      </div>

                      <div className="lg:col-span-4 flex justify-end">
                         <Button 
                            className={`rounded-full h-16 w-16 p-0 flex items-center justify-center transition-all ${progress === 100 ? 'bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20' : 'bg-[#F27D26] hover:bg-[#F27D26]/80 text-white shadow-[0_15px_40px_rgba(242,125,38,0.3)]'}`}
                            onClick={() => navigate('/training')}
                         >
                            <Play className={`w-6 h-6 ${progress === 100 ? 'fill-current' : 'fill-white'}`} />
                         </Button>
                      </div>
                   </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
