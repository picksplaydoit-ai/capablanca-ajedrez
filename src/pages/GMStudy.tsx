
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ChevronLeft, 
  User, 
  Lightbulb, 
  Play, 
  Star,
  Quote,
  Target,
  Zap,
  CheckCircle2
} from 'lucide-react';

const legends = [
  {
    id: "capablanca",
    name: "José Raúl Capablanca",
    title: "La Máquina de Ajedrez",
    quote: "Es necesario aprender los finales antes que nada.",
    desc: "Su estilo era la máxima economía de medios. Buscaba la simplificación hacia finales ganadores.",
    principles: ["Simplicidad extrema", "Control de finales", "Actividad del rey"],
    gameCount: 12,
    accent: "#F27D26"
  },
  {
    id: "karpov",
    name: "Anatoly Karpov",
    title: "El Boa Constrictor",
    quote: "El ajedrez es una forma de lucha intelectual.",
    desc: "Maestro de la profilaxis. Estrangulaba a sus rivales quitándoles toda opción de contrajuego.",
    principles: ["Profilaxis profunda", "Maniobras de piezas menores", "Restricción total"],
    gameCount: 8,
    accent: "#3B82F6"
  },
  {
    id: "fischer",
    name: "Bobby Fischer",
    title: "El Huracán de Brooklyn",
    quote: "No creo en la psicología. Creo en los buenos movimientos.",
    desc: "Un jugador universal con una voluntad de victoria inigualable y un cálculo concreto demoledor.",
    principles: ["Ataque directo", "Precisión absoluta", "Iniciativa constante"],
    gameCount: 15,
    accent: "#EF4444"
  }
];

export default function GMStudy() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(legends[0]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] pb-20">
      <header className="p-6 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-white/40" />
          </button>
          <div>
            <h1 className="text-xs font-bold tracking-widest uppercase italic">The Great Masters</h1>
            <p className="text-[10px] opacity-40 font-mono tracking-widest">ESTUDIO DE ADN CLÁSICO</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 grid lg:grid-cols-12 gap-12">
        {/* Sidebar: Legends List */}
        <div className="lg:col-span-4 space-y-4">
          {legends.map((legend) => (
            <Card 
              key={legend.id}
              onClick={() => setSelected(legend)}
              className={`p-6 rounded-[2rem] cursor-pointer transition-all border-white/5 ${selected.id === legend.id ? 'bg-[#111] border-[#F27D26]/30' : 'bg-[#0A0A0A] hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <User className={`w-6 h-6 ${selected.id === legend.id ? 'text-[#F27D26]' : 'opacity-20'}`} />
                 </div>
                 <div>
                    <h3 className="font-bold text-sm">{legend.name}</h3>
                    <p className="text-[10px] uppercase font-mono opacity-40">{legend.title}</p>
                 </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Content: Selected Legend */}
        <div className="lg:col-span-8 space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                   <Star className="w-3 h-3 text-[#F27D26]" />
                   <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">ADN Maestro Seleccionado</span>
                </div>
                <h2 className="text-6xl font-light italic serif tracking-tight">{selected.name}</h2>
                <div className="flex items-center gap-4 text-[#F27D26]">
                   <Quote className="w-8 h-8 opacity-40" />
                   <p className="text-2xl font-light italic serif text-white/80 leading-tight">
                     "{selected.quote}"
                   </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-sm">
                 <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Filosofía de Juego</h3>
                    <p className="leading-relaxed text-white/60 font-light italic underline decoration-white/5">
                       {selected.desc}
                    </p>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Pilares Estratégicos</h3>
                    <div className="space-y-2">
                       {selected.principles.map(p => (
                          <div key={p} className="flex items-center gap-2 text-white/80">
                             <CheckCircle2 className="w-4 h-4 text-[#F27D26]" />
                             <span className="font-light">{p}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                 <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Módulos de Entrenamiento Disponibles ({selected.gameCount})</h3>
                 <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="bg-[#111] border-[#F27D26]/20 p-8 rounded-[2.5rem] group cursor-pointer hover:border-[#F27D26]/50 transition-all">
                       <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-[#F27D26]/10 flex items-center justify-center text-[#F27D26]">
                             <Target className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono opacity-20">0 / {selected.gameCount}</span>
                       </div>
                       <h4 className="font-bold text-xl mb-2 italic serif">Partidas Modelo</h4>
                       <p className="text-xs text-white/40 font-light leading-relaxed mb-6">
                          Analiza sus decisiones críticas en momentos clave y entrena tu imitación del estilo.
                       </p>
                       <Button className="w-full rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#F27D26] group-hover:text-white transition-all font-bold h-11 text-[10px] tracking-widest">
                          INICIAR ESTUDIO
                       </Button>
                    </Card>
                    <Card className="bg-[#111] border-white/5 p-8 rounded-[2.5rem] group cursor-pointer hover:bg-white/5 transition-all">
                       <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/20">
                             <Zap className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono opacity-20">BLOQUEADO</span>
                       </div>
                       <h4 className="font-bold text-xl mb-2 italic serif">Evaluación de Estilo</h4>
                       <p className="text-xs text-white/40 font-light leading-relaxed mb-6">
                          Examen final para determinar si has absorbido los principios del maestro.
                       </p>
                       <Button disabled className="w-full rounded-2xl bg-white/5 border border-white/10 font-bold h-11 text-[10px] tracking-widest">
                          DESBLOQUEAR
                       </Button>
                    </Card>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
