
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  ChevronLeft, 
  Brain, 
  Sword, 
  Shield, 
  Target, 
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { user } = useStore();

  const steps = [
    {
      title: "¿Cuál es tu nivel aproximado?",
      desc: "Esto nos ayuda a calibrar los primeros ejercicios.",
      options: [
        { label: "Principiante (<1200)", val: "Beginner" },
        { label: "Intermedio (1200-1800)", val: "Intermediate" },
        { label: "Avanzado (>1800)", val: "Advanced" },
      ]
    },
    {
      title: "¿Qué tipo de jugador eres?",
      desc: "Determina tu ADN inicial.",
      options: [
        { label: "Agresivo", icon: Sword, val: "Tactics" },
        { label: "Posicional", icon: Brain, val: "Strategy" },
        { label: "Sólido", icon: Shield, val: "Prophylaxis" },
        { label: "Técnico", icon: Target, val: "Endgames" },
      ]
    },
    {
      title: "¿Cuál es tu objetivo principal?",
      desc: "Personalizaremos tu ruta del maestro.",
      options: [
        { label: "Mejorar mi estrategia", val: "Strategy" },
        { label: "Dominar finales", val: "Endgames" },
        { label: "Calcular mejor", val: "Calculation" },
        { label: "Entender estructuras", val: "Structures" },
      ]
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F27D26] blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-xl w-full relative z-10">
        <header className="text-center mb-12">
          <div className="w-12 h-12 bg-white rounded-xl mx-auto flex items-center justify-center text-black font-bold mb-6 text-xl">C</div>
          <div className="h-1 w-24 bg-white/5 mx-auto rounded-full overflow-hidden">
             <motion.div 
              className="h-full bg-[#F27D26]"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
             />
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-4xl font-light italic serif mb-4">{steps[step].title}</h2>
              <p className="text-sm opacity-40 font-light">{steps[step].desc}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {steps[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={handleNext}
                  className="p-6 rounded-[2rem] border border-white/5 bg-[#0A0A0A] hover:border-[#F27D26]/50 hover:bg-white/5 transition-all text-left flex items-center justify-between group active:scale-95"
                >
                  <div className="flex items-center gap-4">
                    {opt.icon && <opt.icon className="w-5 h-5 text-white/40 group-hover:text-[#F27D26]" />}
                    <span className="text-lg font-light">{opt.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <footer className="mt-12 flex justify-between items-center px-4">
          <button 
            onClick={() => step > 0 && setStep(s => s - 1)}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity ${step === 0 ? 'opacity-0' : 'opacity-40 hover:opacity-100'}`}
          >
            <ChevronLeft className="w-4 h-4" /> Atrás
          </button>
          <p className="text-[10px] font-mono opacity-20 uppercase tracking-widest">Paso {step + 1} de {steps.length}</p>
        </footer>
      </div>
    </div>
  );
}
