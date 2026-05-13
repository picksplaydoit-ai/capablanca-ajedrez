
import React from 'react';
import { Card } from '@/components/ui/card';
import { modelGames } from '@/data/model-games';
import { BookOpen, Play, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ModelGameSection() {
  const navigate = useNavigate();
  const game = modelGames[0]; // Partida del día (podría ser aleatoria)

  return (
    <Card className="bg-[#0A0A0A] border-white/5 p-6 rounded-3xl group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
        <BookOpen className="w-20 h-20 text-[#F27D26]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-[#F27D26] mb-4">
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Partida del Día</span>
        </div>

        <h3 className="text-xl font-light italic serif text-white mb-2">{game.players}</h3>
        <p className="text-xs text-white/40 mb-6 leading-relaxed line-clamp-2">
          {game.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-mono opacity-30">Principio:</p>
            <p className="text-xs font-bold text-white/70">{game.keyPrinciple}</p>
          </div>
          <button 
            onClick={() => navigate('/analysis')}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all text-xs font-bold"
          >
            Estudiar <Play className="w-3 h-3 text-[#F27D26]" />
          </button>
        </div>
      </div>
    </Card>
  );
}
