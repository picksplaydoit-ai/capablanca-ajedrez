
import React from 'react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useStore } from '@/store/useStore';
import { Zap, Target, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DailyTrainingCard() {
  const { user } = useStore();
  const navigate = useNavigate();

  const tasks = [
    { title: 'Ejercicio Estratégico', icon: Target, xp: 50 },
    { title: 'Análisis Posicional', icon: BookOpen, xp: 50 },
    { title: 'Mini Final', icon: Zap, xp: 50 },
  ];

  return (
    <Card className="bg-[#111] border-[#F27D26]/20 p-6 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        <Clock className="w-24 h-24 text-[#F27D26]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h3 className="text-xl font-light italic serif text-white">Desafío del Día</h3>
            <p className="text-[10px] uppercase font-mono tracking-widest opacity-40">Resetea en 14h 22m</p>
          </div>
          <div className="flex items-center gap-2 bg-[#F27D26]/10 px-3 py-1.5 rounded-full border border-[#F27D26]/20">
            <Zap className="w-3.5 h-3.5 text-[#F27D26]" />
            <span className="text-[10px] font-bold text-[#F27D26]">+150 XP BONUS</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center justify-between group/task">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover/task:text-[#F27D26] transition-colors">
                  <task.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-light text-white/60">{task.title}</span>
              </div>
              <CheckCircle2 className={`w-4 h-4 ${user.dailyChallengeCompleted ? 'text-[#F27D26]' : 'text-white/5'}`} />
            </div>
          ))}
        </div>

        <Button 
          className="w-full rounded-2xl bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-bold h-12 shadow-[0_8px_30px_rgb(242,125,38,0.2)]"
          onClick={() => navigate('/training')}
          disabled={user.dailyChallengeCompleted}
        >
          {user.dailyChallengeCompleted ? 'COMPLETADO' : 'INICIAR ENTRENAMIENTO'}
        </Button>
      </div>
    </Card>
  );
}
