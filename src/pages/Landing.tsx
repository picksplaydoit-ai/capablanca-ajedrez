
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Brain, 
  Target, 
  Zap, 
  Shield, 
  Sword, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] overflow-x-hidden selection:bg-[#F27D26] selection:text-white">
      {/* Background Grid & Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#F27D2615,transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-bold italic serif text-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)]">C</div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase">Capablanca <span className="opacity-40">Method</span></span>
        </div>
        <div className="flex items-center gap-8">
          <button onClick={() => navigate('/auth')} className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Login</button>
          <Button 
            onClick={() => navigate('/onboarding')}
            className="rounded-full bg-white text-black hover:bg-opacity-90 font-bold text-xs h-10 px-6 tracking-widest"
          >
            COMENZAR
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-4"
          >
            <Zap className="w-3 h-3 text-[#F27D26]" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Entrenamiento Cognitivo de Élite</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-light italic serif tracking-tight leading-[0.95]"
          >
            Deja de memorizar. <br />
            <span className="text-[#F27D26]">Aprende a pensar.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed"
          >
            El método clásico de José Raúl Capablanca modernizado para el ajedrez actual. Entrena tu comprensión estratégica real, no solo tus reflejos.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
          >
            <Button 
              onClick={() => navigate('/onboarding')}
              className="group rounded-[2rem] bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-bold h-16 px-10 text-lg shadow-[0_20px_50px_rgba(242,125,38,0.2)] transition-all"
            >
              Iniciar mi ADN Ajedrecístico <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <button 
              onClick={() => navigate('/training')}
              className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity border-b border-transparent hover:border-white/20 pb-1"
            >
              Probar un ejercicio
            </button>
          </motion.div>
        </div>

        {/* Board Floating Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-32 max-w-5xl mx-auto relative px-4"
        >
          <div className="absolute inset-0 bg-[#F27D26]/10 blur-[120px] rounded-full" />
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-4 shadow-2xl relative overflow-hidden aspect-[16/10] md:aspect-[21/9] flex items-center justify-center">
             <div className="grid grid-cols-3 gap-6 w-full p-8">
                <div className="col-span-1 space-y-4 hidden md:block">
                   <div className="h-4 w-32 bg-white/5 rounded-full" />
                   <div className="h-24 w-full bg-white/5 rounded-3xl" />
                   <div className="h-24 w-full bg-[#F27D26]/10 border border-[#F27D26]/20 rounded-3xl" />
                </div>
                <div className="col-span-3 md:col-span-1 aspect-square bg-[#111] rounded-2xl border border-white/10 p-2">
                   <div className="w-full h-full bg-[repeating-conic-gradient(#1a1a1a_0%_25%,#111_0%_50%)] bg-[length:25%_25%] rounded-md opacity-20" />
                </div>
                <div className="col-span-1 space-y-4 hidden md:block">
                   <div className="h-4 w-24 bg-white/5 rounded-full" />
                   <div className="h-32 w-full bg-white/5 rounded-3xl" />
                   <div className="h-16 w-full bg-white/5 rounded-3xl" />
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="text-5xl font-light italic serif leading-tight">¿Por qué el Método Capablanca es diferente?</h2>
            <div className="space-y-8">
              {[
                { title: "Primero lo Simple", desc: "Empezamos por los finales. Si sabes ganar un final, sabes qué estructura buscar en el medio juego.", icon: Layers },
                { title: "ADN Estratégico", desc: "No te damos rompecabezas aleatorios. Analizamos tu estilo y fortalecemos tus debilidades estructurales.", icon: Brain },
                { title: "Comprensión Humana", desc: "Feedback diseñado para que entiendas el 'por qué', no solo el motor de 3500 Elo.", icon: Target }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-[#F27D26] transition-colors">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="opacity-40 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-tr from-[#F27D26]/20 to-transparent rounded-[4rem] absolute inset-0 blur-3xl" />
            <div className="relative aspect-square border border-white/5 rounded-[4rem] bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
               <h3 className="text-8xl font-serif italic text-white/5 select-none">Capablanca</h3>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 bg-[#F27D26]/10 rounded-full animate-pulse" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase font-mono tracking-[0.4em] opacity-40 mb-8 font-bold">Hecho para el 1% que busca la maestría real</p>
        <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest opacity-20">
          <a href="#" className="hover:opacity-100">Twitter</a>
          <a href="#" className="hover:opacity-100">Instagram</a>
          <a href="#" className="hover:opacity-100">Newsletter</a>
        </div>
      </footer>
    </div>
  );
}
