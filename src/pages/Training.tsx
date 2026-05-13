// @ts-nocheck
import { useState, useMemo, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { motion, AnimatePresence } from 'motion/react';
import { useGameEngine } from '@/lib/chess-engine';
import { initialExercises } from '@/data/exercises';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThinkingTrainer from '@/components/ThinkingTrainer';
import { analyzePosition } from '@/lib/strategic-analysis';

export default function Training() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeExercise, user, setDailyChallengeStatus, recordThinkingPattern, toggleFocusMode } = useStore();
  
  const filteredExercises = useMemo(() => {
    if (selectedCategory === 'All') return initialExercises;
    return initialExercises.filter(ex => ex.category === selectedCategory);
  }, [selectedCategory]);

  const exercise = filteredExercises[currentIndex] || filteredExercises[0];
  
  const [showThinkingTrainer, setShowThinkingTrainer] = useState(false);
  const [strategicMarkers, setStrategicMarkers] = useState([]);
  const [showInsights, setShowInsights] = useState(false);
  const [hintIndex, setHintIndex] = useState(-1);

  const { game, status, onDrop: originalOnDrop, reset: originalReset } = useGameEngine(
    exercise,
    (id: string, xp: number, category: string) => {
      completeExercise(id, xp, category);
      if (currentIndex === 0) setDailyChallengeStatus(true);
      setShowInsights(true);
    }
  );

  const [assessmentStep, setAssessmentStep] = useState(0);
  const [showAssessment, setShowAssessment] = useState(false);
  const [isBlind, setIsBlind] = useState(false);
  const [showOverlays, setShowOverlays] = useState(false);

  useEffect(() => {
    setHintIndex(-1);
    setAssessmentStep(0);
    setShowAssessment(false); // Strategic assessment removed for now in favor of direct strategy
    setIsBlind(false);
    setShowInsights(false);
    setShowThinkingTrainer(!user.completedExercises.includes(exercise?.id));
    
    if (exercise?.fen) {
      setStrategicMarkers(analyzePosition(exercise.fen));
    }
  }, [exercise, user.completedExercises]);

  const onDrop = (s: string, t: string) => {
    if (showAssessment || showThinkingTrainer) return false;
    const result = originalOnDrop(s, t);
    return result;
  };

  const reset = () => {
    setAssessmentStep(0);
    setHintIndex(-1);
    setIsBlind(false);
    originalReset();
  };

  const nextExercise = () => {
    if (currentIndex < filteredExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const isCompleted = user.completedExercises.includes(exercise.id);

  const customSquareStyles = useMemo(() => {
    if (!showOverlays) return {};
    const styles: Record<string, any> = {};
    strategicMarkers.forEach(m => {
      styles[m.square] = {
        background: m.type === 'outpost' ? 'radial-gradient(rgba(34, 197, 94, 0.4) 20%, transparent 80%)' : 'radial-gradient(rgba(242, 125, 38, 0.4) 20%, transparent 80%)',
        borderRadius: '50%'
      };
    });
    return styles;
  }, [strategicMarkers, showOverlays]);

  const categories = ['TODOS', 'Estrategia', 'Táctica', 'Finales', 'Profilaxis', 'Estructuras', 'Técnica'];

  if (!exercise) return null;

  return (
    <div className={`min-h-screen bg-[#050505] text-[#E4E3E0] font-sans flex flex-col ${user.focusMode ? 'cursor-none select-none' : ''}`}>
      {/* Header */}
      {!user.focusMode && (
        <header className="p-4 md:px-8 border-b border-[#1A1A1A] flex items-center justify-between bg-[#080808]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="hover:bg-[#1A1A1A]">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-sm font-bold tracking-widest uppercase">{exercise.category}</h1>
              <p className="text-[10px] opacity-40 font-mono">EJERCICIO {currentIndex + 1} DE {filteredExercises.length}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 mr-4 bg-white/5 p-1 rounded-full border border-white/5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat === 'TODOS' ? 'All' : cat);
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter transition-all ${
                    (selectedCategory === 'All' && cat === 'TODOS') || selectedCategory === cat ? 'bg-[#F27D26] text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleFocusMode}
              className="rounded-full border-white/5 bg-white/5 hover:bg-white/10 h-8 gap-2 px-3 text-[10px] uppercase font-bold tracking-widest text-[#F27D26]"
            >
              <Maximize2 className="w-3 h-3" /> Modo Enfoque
            </Button>
            <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full border border-white/5">
              <Trophy className="w-4 h-4 text-[#F27D26]" />
              <span className="text-xs font-bold">{user.xp} XP</span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col ${user.focusMode ? '' : 'lg:flex-row'} overflow-hidden relative`}>
        {/* Left: Board Area */}
        <div className={`flex-1 ${user.focusMode ? 'w-full' : 'lg:w-[55%]'} p-4 md:p-8 flex items-center justify-center bg-[#020202] relative overflow-hidden`}>
          <div className="w-full h-full max-w-[600px] max-h-[600px] aspect-square flex flex-col relative transition-all duration-500">
            <div className={`bg-[#111] p-1 rounded-lg shadow-2xl border border-white/10 transition-all duration-700 flex-1 relative ${isBlind ? 'blur-3xl opacity-10' : ''}`}>
              {/* @ts-ignore */}
              <Chessboard 
                key={exercise.id}
                position={game.fen()} 
                onPieceDrop={onDrop}
                boardOrientation={exercise.sideToMove === 'w' ? 'white' : 'black'}
                customDarkSquareStyle={{ backgroundColor: '#1A1A1A' }}
                customLightSquareStyle={{ backgroundColor: '#262626' }}
                customBoardStyle={{ borderRadius: '4px' }}
                customSquareStyles={customSquareStyles}
                animationDuration={300}
              />
              
              {isBlind && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                   <div className="p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 text-center space-y-4">
                      <EyeOff className="w-12 h-12 text-[#F27D26] mx-auto opacity-50" />
                      <p className="text-sm font-light italic serif text-white/60">Posición mentalmente activa</p>
                      <Button onClick={() => setIsBlind(false)} className="bg-white text-black rounded-full h-10 px-6 text-[10px] font-bold uppercase tracking-widest">
                        Revelar Tablero
                      </Button>
                   </div>
                </div>
              )}
            </div>
            
            {!user.focusMode && (
              <div className="mt-4 flex justify-between items-center text-[10px] opacity-30 font-mono tracking-widest uppercase">
                <div className="flex gap-4">
                  <button onClick={() => setShowOverlays(!showOverlays)} className={`flex items-center gap-2 transition-colors ${showOverlays ? 'text-[#F27D26]' : 'hover:text-white'}`}>
                     {showOverlays ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />} Analítica Local
                  </button>
                  <span>Jugador: {exercise.sideToMove === 'w' ? 'Blanca' : 'Negra'}</span>
                </div>
                <div className="flex items-center gap-4">
                  {exercise.category === "Cálculo" && !isBlind && (
                    <button 
                      onClick={() => setIsBlind(true)}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 transition-colors"
                    >
                      <Maximize2 className="w-3 h-3" /> Modo Ciego
                    </button>
                  )}
                  <span>Dificultad: {exercise.difficulty}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Info & Feedback Area */}
        {!user.focusMode && (
          <div className="lg:w-[45%] bg-[#080808] border-l border-[#1A1A1A] flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 custom-scrollbar">
              <motion.div 
                key={exercise.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 lg:space-y-8"
              >
                  <AnimatePresence mode="wait">
                    {showInsights ? (
                      <motion.div
                        key="insights"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 md:p-8 bg-[#F27D26]/5 border border-[#F27D26]/30 rounded-[2.5rem] space-y-6"
                      >
                        <div className="flex items-center gap-3 text-[#F27D26]">
                          <BookOpen className="w-6 h-6" />
                          <h3 className="text-xl font-bold uppercase tracking-widest">Lección Posicional</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-lg font-light italic serif text-white leading-relaxed">
                            "{exercise.explanation}"
                          </p>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-white/60 font-light leading-relaxed">
                            <span className="text-[#F27D26] font-bold block mb-1">MOVIMIENTO CORRECTO: {exercise.bestMove}</span>
                            Principio: {exercise.principle}
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-[#F27D26]/20">
                           <div className="flex flex-wrap gap-2">
                              {exercise.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-bold uppercase text-white/40 tracking-wider">#{tag}</span>
                              ))}
                           </div>
                        </div>

                        <Button 
                          className="w-full rounded-2xl bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-bold h-14 shadow-xl shadow-[#F27D26]/20"
                          onClick={nextExercise}
                        >
                          SIGUIENTE EJERCICIO
                        </Button>
                      </motion.div>
                    ) : showThinkingTrainer ? (
                      <motion.div
                        key="thinking-trainer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6 bg-[#F27D26]/5 p-8 rounded-[2.5rem] border border-[#F27D26]/20 text-center"
                      >
                         <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-[#F27D26]/20 flex items-center justify-center border border-[#F27D26]/40">
                               <BookOpen className="w-8 h-8 text-[#F27D26]" />
                            </div>
                         </div>
                         <h3 className="text-2xl font-light italic serif">Iniciando protocolo de pensamiento</h3>
                         <p className="text-sm text-white/60 font-light leading-relaxed">
                           Capablanca analizaba primero la estructura de peones y la actividad de las piezas antes de calcular variantes concretas.
                         </p>
                         <Button 
                           onClick={() => setShowThinkingTrainer(false)}
                           className="w-full bg-[#F27D26] h-12 rounded-2xl font-bold uppercase tracking-widest text-[10px]"
                         >
                           EMPEZAR ANÁLISIS ESTRATÉGICO
                         </Button>
                      </motion.div>
                    ) : (
                      <div className="space-y-6 lg:space-y-8">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#F27D26]">
                              {exercise.principle}
                            </span>
                            <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">
                               {exercise.difficulty}
                            </span>
                          </div>
                          <h2 className="text-2xl lg:text-3xl font-light leading-tight mb-6 tracking-tighter">
                            {exercise.title}
                          </h2>
                          
                          <div className="space-y-6">
                            <Card className="bg-white/5 border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                  <BookOpen className="w-24 h-24" />
                               </div>
                               <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Contexto de la Partida</h4>
                               <p className="text-sm lg:text-base text-white/80 leading-relaxed font-light italic serif">
                                 {exercise.context}
                               </p>
                            </Card>

                            <div className="p-6 bg-[#F27D26]/5 border border-[#F27D26]/20 rounded-2xl">
                               <div className="flex items-center gap-2 mb-3">
                                  <HelpCircle className="w-4 h-4 text-[#F27D26]" />
                                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#F27D26]">Tu Misión</h4>
                               </div>
                               <p className="text-base lg:text-lg text-white font-medium leading-tight">
                                 {exercise.question}
                               </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {status.isCorrect === true ? (
                            <div className="p-5 lg:p-6 bg-[#F27D26]/10 border border-[#F27D26]/30 rounded-2xl flex gap-4">
                              <CheckCircle2 className="w-6 h-6 text-[#F27D26] shrink-0" />
                              <div>
                                <h4 className="font-bold text-[#F27D26] text-sm mb-1 uppercase tracking-wider">¡BRILLANTE!</h4>
                                <p className="text-sm italic leading-relaxed text-[#F27D26]/90">
                                  "{status.feedback}"
                                </p>
                              </div>
                            </div>
                          ) : status.isCorrect === false ? (
                            <div className="p-5 lg:p-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex gap-4">
                              <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                              <div>
                                <h4 className="font-bold text-red-500 text-sm mb-1 uppercase tracking-wider">SIGUE BUSCANDO...</h4>
                                <p className="text-sm italic leading-relaxed text-red-500/90 font-light">
                                  "{status.feedback}"
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="p-5 lg:p-6 bg-white/5 border border-white/10 rounded-2xl flex gap-4 text-white/30">
                              <HelpCircle className="w-6 h-6 shrink-0" />
                              <div>
                                <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Esperando movimiento</h4>
                                <p className="text-sm italic font-light">
                                  Mueve sobre el tablero para responder...
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {hintIndex >= 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-3 italic text-xs lg:text-sm text-blue-100 font-light leading-relaxed"
                          >
                            <Lightbulb className="w-4 h-4 shrink-0 text-blue-400" />
                            "{exercise.hints[hintIndex]}"
                          </motion.div>
                        )}

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <Button 
                            variant="outline" 
                            className={`rounded-xl h-12 border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                              hintIndex >= 0 ? 'text-blue-400 border-blue-400/20' : 'opacity-60 hover:opacity-100'
                            }`}
                            onClick={() => setHintIndex(prev => Math.min(prev + 1, exercise.hints.length - 1))}
                            disabled={hintIndex === exercise.hints.length - 1}
                          >
                            {hintIndex < 0 ? 'Recibir Pista' : `Pista ${hintIndex + 1}/${exercise.hints.length}`}
                          </Button>
                          <Button 
                            variant="outline" 
                            className="rounded-xl h-12 border-white/10 hover:bg-white/5 opacity-60 hover:opacity-100 gap-2 text-[10px] font-bold uppercase tracking-widest"
                            onClick={reset}
                          >
                            <RotateCcw className="w-3 h-3" /> Reiniciar
                          </Button>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
            </div>
            
            {/* Action Bar at the bottom of panel */}
            <div className="p-6 md:p-8 lg:p-10 border-t border-[#1A1A1A] bg-[#050505]">
              <div className="flex justify-between items-center bg-white/5 p-1.5 rounded-full border border-white/5">
                <Button 
                  variant="ghost" 
                  onClick={prevExercise} 
                  className="rounded-full text-[10px] font-bold uppercase tracking-widest opacity-40 px-6 hover:bg-white/10"
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="mr-2 w-4 h-4" /> Anterior
                </Button>
                
                <div className="flex items-center gap-2 px-4">
                   {filteredExercises.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i === currentIndex ? 'bg-[#F27D26] w-4' : 'bg-white/10'
                        }`} 
                      />
                   ))}
                </div>

                <Button 
                  onClick={nextExercise} 
                  className="bg-white text-black hover:bg-opacity-90 rounded-full px-8 h-10 text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                  disabled={currentIndex === filteredExercises.length - 1}
                >
                  Siguiente <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}


        {/* Focus Mode Exit UI */}
        {user.focusMode && (
          <div className="absolute bottom-8 right-8 z-[100]">
             <Button
                variant="outline"
                size="sm"
                onClick={toggleFocusMode}
                className="rounded-full bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/10 h-10 gap-2 px-4 text-xs font-bold uppercase tracking-widest text-[#F27D26]"
             >
                <Minimize2 className="w-4 h-4" /> Salir de Enfoque
             </Button>
          </div>
        )}
      </main>
    </div>
  );
}
