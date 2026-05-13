
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button.tsx';
import { Brain, HelpCircle, ArrowRight, Shield, Target, Sword } from 'lucide-react';

interface ThinkingTrainerProps {
  onComplete: (answers: Record<string, string>) => void;
  category: string;
}

export default function ThinkingTrainer({ onComplete, category }: ThinkingTrainerProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'threats',
      q: "¿Qué intenta hacer mi rival?",
      options: ["Crear una debilidad", "Activar una pieza pasiva", "Presionar el centro", "No hay amenaza directa"],
      icon: Shield
    },
    {
      id: 'worst_piece',
      q: "¿Cuál es mi pieza peor colocada?",
      options: ["Caballo", "Alfil", "Torre", "Rey"],
      icon: Target
    },
    {
      id: 'plan',
      q: "¿Cuál es mi objetivo principal ahora?",
      options: ["Centralizar", "Simplificar", "Atacar debilidad", "Maniobrar"],
      icon: Sword
    }
  ];

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [questions[step].id]: option };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-[2px] rounded-lg flex items-center justify-center p-4 overflow-hidden border border-[#F27D26]/20">
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(#F27D26_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 1.02 }}
          className="max-w-sm w-full relative z-10 space-y-6 bg-black/80 p-6 rounded-[2rem] border border-white/10 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F27D26]/10 flex items-center justify-center text-[#F27D26]">
                {React.createElement(questions[step].icon, { size: 24 })}
              </div>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#F27D26] opacity-60">Proceso de Pensamiento</h3>
            <h2 className="text-2xl font-light italic serif leading-tight px-4 underline decoration-[#F27D26]/20 underline-offset-8">
              {questions[step].q}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {questions[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className="w-full p-5 rounded-2xl border border-white/5 bg-white/5 hover:border-[#F27D26]/50 hover:bg-white/10 text-left text-sm font-light transition-all active:scale-95 flex items-center justify-between group"
              >
                <span>{opt}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {questions.map((_, i) => (
              <div key={i} className={`w-8 h-1 rounded-full transition-all ${i === step ? 'bg-[#F27D26] w-12' : i < step ? 'bg-[#F27D26]/40' : 'bg-white/10'}`} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
