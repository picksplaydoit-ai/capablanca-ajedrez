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
  const [currentIndex, setCurrentIndex] = useState(0);
  const exercise = initialExercises[currentIndex];
  const { completeExercise, user, setDailyChallengeStatus, recordThinkingPattern, toggleFocusMode } = useStore();
  
  const [showThinkingTrainer, setShowThinkingTrainer] = useState(false);
  const [strategicMarkers, setStrategicMarkers] = useState([]);
  const [showInsights, setShowInsights] = useState(false);

  const { game, status, onDrop: originalOnDrop, reset: originalReset } = useGameEngine(
    exercise,
    (id: string, xp: number, category: string) => {
      completeExercise(id, xp, category);
      if (currentIndex === 0) setDailyChallengeStatus(true);
      setShowInsights(true);
    }
  );

  const [showHint, setShowHint] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [showAssessment, setShowAssessment] = useState(false);
  const [isBlind, setIsBlind] = useState(false);
  const [showOverlays, setShowOverlays] = useState(false);

  useEffect(() => {
    setShowHint(false);
    setAssessmentStep(0);
    setShowAssessment(!!exercise.strategicAssessment && !user.completedExercises.includes(exercise.id));
    setIsBlind(false);
    setShowInsights(false);
    setShowThinkingTrainer(!user.completedExercises.includes(exercise.id));
    
    // Analyze markers
    setStrategicMarkers(analyzePosition(exercise.fen));
  }, [exercise, user.completedExercises]);

  const onDrop = (s: string, t: string) => {
    if (showAssessment || showThinkingTrainer) return false;
    const result = originalOnDrop(s, t);
    if (!result) {
       // record failure pattern if needed
    }
    return result;
  };

  const reset = () => {
    setAssessmentStep(0);
    setShowAssessment(!!exercise.strategicAssessment && !user.completedExercises.includes(exercise.id));
    setIsBlind(false);
    originalReset();
  };

  const handleAssessmentAnswer = (index: number) => {
    if (!exercise.strategicAssessment) return;
    
    if (index === exercise.strategicAssessment[assessmentStep].correctIndex) {
      if (assessmentStep < exercise.strategicAssessment.length - 1) {
        setAssessmentStep(prev => prev + 1);
      } else {
        setShowAssessment(false);
      }
    } else {
      // Small penalty or shaking effect could go here
    }
  };

  const nextExercise = () => {
    if (currentIndex < initialExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowHint(false);
    }
  };

  const prevExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowHint(false);
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
              <p className="text-[10px] opacity-40 font-mono">EJERCICIO {currentIndex + 1} DE {initialExercises.length}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFocusMode}
              className="rounded-full border-white/5 bg-white/5 hover:bg-white/10 h-8 gap-2 px-3 text-[10px] uppercase font-bold tracking-widest"
            >
              <Maximize2 className="w-3 h-3" /> Modo Enfoque
            </Button>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Nivel {user.level} • {user.trait}</span>
              <div className="w-32 h-1.5 bg-[#1A1A1A] rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-[#F27D26] transition-all duration-500" 
                  style={{ width: `${(user.xp % 1000) / 10}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full">
              <Trophy className="w-4 h-4 text-[#F27D26]" />
              <span className="text-xs font-bold">{user.xp} XP</span>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 grid ${user.focusMode ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-0 overflow-hidden relative`}>
        {/* Left: Board */}
        <div className={`${user.focusMode ? 'lg:col-span-1' : 'lg:col-span-7'} p-6 md:p-12 flex items-center justify-center bg-[#020202] relative`}>
          <div className="w-full max-w-[600px] aspect-square relative">
            <AnimatePresence>
              {showThinkingTrainer && (
                <ThinkingTrainer 
                  category={exercise.category} 
                  onComplete={(answers) => {
                    Object.keys(answers).forEach(key => recordThinkingPattern(key, true));
                    setShowThinkingTrainer(false);
                  }} 
                />
              )}

              {showAssessment && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center p-8"
                >
                  <div className="max-w-md w-full space-y-6">
                    <div className="flex items-center gap-2 text-[#F27D26] mb-2">
                      <HelpCircle className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Evaluación Estratégica</span>
                    </div>
                    <h3 className="text-2xl font-light italic serif leading-tight">
                      {exercise.strategicAssessment?.[assessmentStep].question}
                    </h3>
                    <div className="space-y-3">
                      {exercise.strategicAssessment?.[assessmentStep].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAssessmentAnswer(i)}
                          className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left text-sm font-light transition-all active:scale-95"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] uppercase font-mono opacity-30 text-center">
                      Paso {assessmentStep + 1} de {exercise.strategicAssessment?.length}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`bg-[#111] p-1.5 rounded-lg shadow-2xl border border-white/5 transition-all duration-700 ${isBlind ? 'blur-2xl opacity-20' : ''}`}>
              {/* @ts-ignore */}
              <Chessboard 
                position={game.fen()} 
                onPieceDrop={onDrop}
                boardOrientation="white"
                customDarkSquareStyle={{ backgroundColor: '#1A1A1A' }}
                customLightSquareStyle={{ backgroundColor: '#262626' }}
                customBoardStyle={{ borderRadius: '4px' }}
                customSquareStyles={customSquareStyles}
                animationDuration={300}
              />
            </div>
            
            <div className="mt-8 flex justify-between items-center text-xs opacity-40 font-mono tracking-widest uppercase">
              <div className="flex gap-4">
                <button onClick={() => setShowOverlays(!showOverlays)} className={`flex items-center gap-2 transition-colors ${showOverlays ? 'text-[#F27D26]' : 'hover:text-white'}`}>
                   {showOverlays ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />} Analítica Local
                </button>
                <span>Jugador: Blanca</span>
              </div>
              <div className="flex items-center gap-4">
                {exercise.category === "Calculation" && (
                  <button 
                    onClick={() => setIsBlind(!isBlind)}
                    className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${isBlind ? 'bg-[#F27D26] text-white opacity-100' : 'hover:bg-white/5'}`}
                  >
                    {isBlind ? 'Ver Tablero' : 'Modo Ciego'}
                  </button>
                )}
                <span>Dificultad: {exercise.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info & Feedback */}
        {!user.focusMode && (
          <div className="lg:col-span-5 bg-[#080808] border-l border-[#1A1A1A] p-6 md:p-10 flex flex-col h-full overflow-y-auto">
            <motion.div 
              key={exercise.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 h-full flex flex-col"
            >
              <AnimatePresence mode="wait">
                {showInsights ? (
                  <motion.div
                    key="insights"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-[#F27D26]/5 border border-[#F27D26]/30 rounded-[2.5rem] space-y-6"
                  >
                    <div className="flex items-center gap-3 text-[#F27D26]">
                      <BookOpen className="w-6 h-6" />
                      <h3 className="text-xl font-bold uppercase tracking-widest">Lección Posicional</h3>
                    </div>
                    <p className="text-lg font-light italic serif text-white/80 leading-relaxed">
                      "Aprende primero los finales, luego el medio juego y solo al final las aperturas. La claridad estructural es tu mayor arma."
                    </p>
                    <div className="space-y-4 pt-4 border-t border-[#F27D26]/20">
                      <div className="flex items-center gap-2 text-xs font-mono opacity-60">
                        <CheckCircle2 className="w-4 h-4" /> PRINCIPIO REFORZADO: {exercise.principle}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono opacity-60">
                         <CheckCircle2 className="w-4 h-4" /> ERROR EVITADO: Juego Automático
                      </div>
                    </div>
                    <Button 
                      className="w-full rounded-2xl bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-bold h-14"
                      onClick={nextExercise}
                    >
                      CONTINUAR ENTRENAMIENTO
                    </Button>
                  </motion.div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#F27D26] mb-3 block">
                        {exercise.principle}
                      </span>
                      <h2 className="text-3xl font-light leading-tight mb-4 tracking-tighter">
                        {exercise.title}
                      </h2>
                      <p className="text-white/60 leading-relaxed font-light">
                        {exercise.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {status.isCorrect === true ? (
                        <div className="p-6 bg-[#F27D26]/10 border border-[#F27D26]/30 rounded-2xl flex gap-4">
                          <CheckCircle2 className="w-6 h-6 text-[#F27D26] shrink-0" />
                          <div>
                            <h4 className="font-bold text-[#F27D26] text-sm mb-1 uppercase tracking-wider">Coach: Piense como Capablanca</h4>
                            <p className="text-sm italic leading-relaxed text-[#F27D26]/90">
                              "{status.feedback}"
                            </p>
                          </div>
                        </div>
                      ) : status.isCorrect === false ? (
                        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex gap-4">
                          <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                          <div>
                            <h4 className="font-bold text-red-500 text-sm mb-1 uppercase tracking-wider">Coach Feedback</h4>
                            <p className="text-sm italic leading-relaxed text-red-500/90 font-light">
                              "{status.feedback}"
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex gap-4 text-white/30">
                          <HelpCircle className="w-6 h-6 shrink-0" />
                          <div>
                            <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Esperando movimiento</h4>
                            <p className="text-sm italic font-light">
                              Encuentra el plan maestro...
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {showHint && (
                      <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-3 italic text-sm text-blue-300 font-light leading-relaxed">
                        <Lightbulb className="w-4 h-4 shrink-0 text-blue-400" />
                        "{exercise.coachFeedback.hint}"
                      </div>
                    )}

                    <div className="flex gap-3 pt-4 border-t border-white/5">
                      <Button 
                        variant="outline" 
                        className="flex-1 rounded-xl h-12 border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100"
                        onClick={() => setShowHint(true)}
                      >
                        Recibir Pista
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-xl w-12 h-12 border-white/10 hover:bg-white/5 opacity-60 hover:opacity-100"
                        onClick={reset}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </AnimatePresence>
              
              <div className="flex justify-between items-center pt-8 mt-auto">
                <Button 
                  variant="ghost" 
                  onClick={prevExercise} 
                  className="hover:bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest opacity-40"
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="mr-2 w-4 h-4" /> Anterior
                </Button>
                <Button 
                  onClick={nextExercise} 
                  className="bg-white text-black hover:bg-opacity-90 rounded-full px-6 text-xs font-bold uppercase tracking-widest"
                  disabled={currentIndex === initialExercises.length - 1}
                >
                  Siguiente <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
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
