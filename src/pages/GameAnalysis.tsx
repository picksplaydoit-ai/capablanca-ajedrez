// @ts-nocheck
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronLeft, 
  Upload, 
  Search, 
  Activity, 
  BrainCircuit, 
  MessageSquare,
  Play,
  RotateCcw
} from 'lucide-react';
import { analyzePositionHeuristically, generateNarrativeSummary } from '@/lib/analysis-engine';

export default function GameAnalysis() {
  const navigate = useNavigate();
  const [pgn, setPgn] = useState('');
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState<string[]>([]);
  const [moveIndex, setMoveIndex] = useState(-1);
  const [analysis, setAnalysis] = useState<any[]>([]);
  const [narrative, setNarrative] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePgnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPgn(e.target.value);
  };

  const startAnalysis = () => {
    try {
      const newGame = new Chess();
      newGame.loadPgn(pgn);
      setGame(newGame);
      setHistory(newGame.history());
      setMoveIndex(newGame.history().length - 1);
      
      const feedback = analyzePositionHeuristically(newGame.fen());
      setAnalysis(feedback);
      setNarrative(generateNarrativeSummary(newGame.fen()));
      setIsAnalyzing(true);
    } catch (e) {
      alert("PGN inválido. Por favor intenta con otro.");
    }
  };

  const goToMove = (index: number) => {
    const tempGame = new Chess();
    const moves = new Chess();
    moves.loadPgn(pgn);
    const historyArray = moves.history();
    
    for (let i = 0; i <= index; i++) {
      tempGame.move(historyArray[i]);
    }
    
    setGame(tempGame);
    setMoveIndex(index);
    setAnalysis(analyzePositionHeuristically(tempGame.fen()));
    setNarrative(generateNarrativeSummary(tempGame.fen()));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] flex flex-col">
      <header className="p-4 px-8 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="hover:bg-white/5 text-white/40">
            <ChevronLeft />
          </Button>
          <div>
            <h1 className="text-xs font-bold tracking-widest uppercase">PGN Coach <span className="opacity-40 italic">Elite</span></h1>
            <p className="text-[10px] opacity-40 font-mono">ANÁLISIS ESTRATÉGICO ADN</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Activity className="w-4 h-4 text-[#F27D26] animate-pulse" />
           <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Motor Local: Activo</span>
        </div>
      </header>

      <main className="flex-1 grid lg:grid-cols-12 overflow-hidden">
        {/* Left: Input & History */}
        <div className="lg:col-span-3 border-r border-white/5 p-6 space-y-6 flex flex-col h-[calc(100vh-65px)] bg-[#080808]">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest opacity-40">ADN de la Partida</h2>
            <Textarea 
              placeholder="Pega tu PGN aquí..."
              className="bg-[#0A0A0A] border-white/10 rounded-2xl h-40 font-mono text-xs resize-none focus:border-[#F27D26]/50 transition-all"
              value={pgn}
              onChange={handlePgnChange}
            />
            <Button 
              className="w-full rounded-2xl bg-[#F27D26] hover:bg-[#F27D26]/80 text-white font-bold h-14 shadow-lg shadow-[#F27D26]/10"
              onClick={startAnalysis}
            >
              <Search className="w-4 h-4 mr-2" /> Iniciar Revisión Humana
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
            <h2 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-4 sticky top-0 bg-[#080808] py-2">Línea de Tiempo</h2>
            <div className="grid grid-cols-3 gap-2">
              {history.map((move, i) => (
                <button
                  key={i}
                  onClick={() => goToMove(i)}
                  className={`p-3 text-xs font-mono rounded-xl transition-all border ${
                    moveIndex === i 
                    ? 'bg-[#F27D26] text-white border-[#F27D26]' 
                    : 'bg-white/5 border-transparent hover:bg-white/10 text-white/50'
                  }`}
                >
                  <span className="opacity-30 mr-1">{Math.floor(i / 2) + 1}.</span> {move}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: Board */}
        <div className="lg:col-span-5 p-8 flex flex-col items-center justify-center bg-[#050505]">
           <div className="w-full max-w-[540px] aspect-square relative group">
             <div className="absolute -inset-8 bg-[#F27D26]/5 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="bg-[#111] p-1.5 rounded-xl border border-white/10 relative z-10 shadow-2xl">
               {/* @ts-ignore */}
               <Chessboard 
                 position={game.fen()}
                 boardOrientation="white"
                 customDarkSquareStyle={{ backgroundColor: '#1A1A1A' }}
                 customLightSquareStyle={{ backgroundColor: '#262626' }}
                 animationDuration={300}
               />
             </div>
           </div>
           
           <div className="mt-8 w-full max-w-[540px] flex justify-between items-center px-4">
              <div className="flex items-center gap-4 text-[10px] font-mono opacity-20 uppercase tracking-[0.2em]">
                 <span>Mover: {game.turn() === 'w' ? 'Blancas' : 'Negras'}</span>
                 <span>Jugada: {moveIndex + 1}</span>
              </div>
              <div className="flex gap-2">
                 <Button variant="outline" size="icon" className="rounded-full w-8 h-8 border-white/5 bg-white/5" onClick={() => goToMove(moveIndex - 1)} disabled={moveIndex < 0}>
                    <ChevronLeft className="w-4 h-4" />
                 </Button>
                 <Button variant="outline" size="icon" className="rounded-full w-8 h-8 border-white/5 bg-white/5" onClick={() => goToMove(moveIndex + 1)} disabled={moveIndex >= history.length - 1}>
                    <ChevronRight className="w-4 h-4" />
                 </Button>
              </div>
           </div>
        </div>

        {/* Right: Insights */}
        <div className="lg:col-span-4 bg-[#080808] border-l border-white/5 p-8 overflow-y-auto h-[calc(100vh-65px)] scrollbar-hide">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F27D26]/10 flex items-center justify-center text-[#F27D26]">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-light italic serif">Voz del Maestro</h3>
                <p className="text-[10px] uppercase font-mono opacity-30 mt-0.5">Diagnóstico Posicional</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <div className="space-y-6">
                  {analysis.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 bg-[#0A0A0A] border border-white/5 rounded-[2rem] space-y-3 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                         <Activity className="w-12 h-12" />
                      </div>
                      <div className="flex items-center justify-between relative z-10">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#F27D26]">{item.category}</span>
                      </div>
                      <p className="text-lg font-light leading-tight italic serif text-white/80 relative z-10">
                        "{item.message}"
                      </p>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-[#111] to-[#050505] border border-[#F27D26]/20 p-8 rounded-[2.5rem] mt-12 shadow-2xl relative group"
                  >
                    <div className="absolute inset-0 bg-[#F27D26]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                      <MessageSquare className="w-5 h-5 text-[#F27D26]" />
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Resumen de la Situación</h4>
                    </div>
                    <p className="text-xl font-light italic serif text-white/90 leading-relaxed mb-6 relative z-10">
                      {narrative}
                    </p>
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                       <span className="text-[10px] font-mono opacity-40 uppercase">Momento Clave detectado</span>
                       <Zap className="w-4 h-4 text-[#F27D26]" />
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center mb-8 bg-white/5">
                     <Play className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="text-sm font-mono uppercase tracking-[0.3em] opacity-20 max-w-[200px] leading-loose">Importa una partida para activar la voz del maestro</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
