import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '@/store/useStore';
import { initialExercises } from '@/data/exercises';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import { 
  Trophy, 
  Flame, 
  Target, 
  Award, 
  ChevronRight, 
  BookOpen,
  CheckCircle2,
  Lock,
  Zap,
  Dna,
  Search,
  PenLine
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import DailyTrainingCard from '@/components/DailyTrainingCard';
import RecommendationEngine from '@/components/RecommendationEngine';
import ModelGameSection from '@/components/ModelGameSection';
import ImprovementEngine from '@/components/ImprovementEngine';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useStore();
  
  const completedCount = user.completedExercises.length;
  const totalCount = initialExercises.length;
  const progressPercent = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] pb-20">
      <header className="p-6 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F27D26] flex items-center justify-center font-bold italic serif text-white">C</div>
          <h1 className="text-sm font-bold tracking-widest uppercase">Capablanca <span className="opacity-40">Método</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F27D26]" />
            <span className="text-sm font-mono font-bold">{user.streak}</span>
          </div>
          <div 
            className="w-10 h-10 rounded-full border border-white/10 p-0.5 cursor-pointer hover:scale-105 transition-transform" 
            onClick={() => navigate('/profile')}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#F27D26] to-[#F27D26]/20" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 grid lg:grid-cols-12 gap-8">
        {/* Left: User Progress Card */}
        <div className="lg:col-span-4 space-y-6">
          <ImprovementEngine />

          <Card className="bg-[#0A0A0A] border-white/5 p-8 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
              <Award className="w-16 h-16 text-[#F27D26]" />
            </div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#222] to-[#111] border border-white/5 p-1 mb-6">
                <div className="w-full h-full rounded-2xl bg-[#0A0A0A] flex items-center justify-center text-3xl font-serif">JR</div>
              </div>
              <h2 className="text-2xl font-light tracking-tight mb-1 italic serif">José Raúl</h2>
              <p className="text-[10px] uppercase font-mono tracking-widest opacity-40 mb-6">Nivel {user.level} • {user.trait}</p>
              
              <div className="w-full space-y-6">
                <Button 
                  className="w-full rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 h-11 text-xs font-bold gap-3"
                  onClick={() => navigate('/profile')}
                >
                  <Dna className="w-4 h-4 text-[#F27D26]" /> ADN ESTRATÉGICO
                </Button>
                <div className="flex justify-between text-xs font-mono opacity-60">
                  <span>PROGRESO TOTAL</span>
                  <span>{completedCount}/{totalCount}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-[#F27D26]"
                  />
                </div>
              </div>
            </div>
          </Card>

          <RecommendationEngine />
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 ml-2">Actividad Semanal</h3>
            <Card className="bg-[#0A0A0A] border-white/5 p-6 rounded-3xl h-48 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { name: 'Lun', xp: 400 },
                  { name: 'Mar', xp: 300 },
                  { name: 'Mie', xp: 600 },
                  { name: 'Jue', xp: 800 },
                  { name: 'Vie', xp: 500 },
                  { name: 'Sab', xp: 900 },
                  { name: 'Dom', xp: 1000 },
                ]}>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#F27D26' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#F27D26" 
                    strokeWidth={3} 
                    dot={{ fill: '#F27D26', r: 4 }} 
                    activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>

        {/* Middle: Content */}
        <div className="lg:col-span-5 space-y-8">
          <DailyTrainingCard />
          <ModelGameSection />
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 ml-2">Módulos de Entrenamiento</h3>
            <div className="grid grid-cols-1 gap-4">
              <Card className="bg-[#111] border border-[#F27D26]/20 p-6 rounded-3xl group cursor-pointer hover:border-[#F27D26]/50 transition-all shadow-[0_20px_50px_rgba(242,125,38,0.1)]" onClick={() => navigate('/academy')}>
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-5 h-5 text-[#F27D26]" />
                  <span className="text-[10px] bg-[#F27D26]/10 text-[#F27D26] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest italic">Academy Solo</span>
                </div>
                <h4 className="font-bold mb-1 italic serif text-xl">Ruta de Maestría</h4>
                <p className="text-xs opacity-50 font-light leading-relaxed">Currículo estructurado diseñado para reprogramar tu intuición estratégica. De fundamentos a finales.</p>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-[#0A0A0A] border border-white/5 p-6 rounded-3xl group cursor-pointer hover:bg-white/5 transition-all" onClick={() => navigate('/gm-study')}>
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:text-[#F27D26] transition-colors">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">Grandes Maestros</h4>
                  <p className="text-[10px] opacity-40 font-light">Estudia el ADN de Capablanca, Karpov y Fischer.</p>
                </Card>
                <Card className="bg-[#0A0A0A] border border-white/5 p-6 rounded-3xl group cursor-pointer hover:bg-white/5 transition-all" onClick={() => navigate('/journal')}>
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:text-[#F27D26] transition-colors">
                    <PenLine className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">Bitácora</h4>
                  <p className="text-[10px] opacity-40 font-light">Tus reflexiones y errores críticos guardados.</p>
                </Card>
              </div>

              <Card className="bg-[#0A0A0A] border border-white/5 p-6 rounded-3xl group cursor-pointer hover:border-[#F27D26]/50 transition-all" onClick={() => navigate('/analysis')}>
                <div className="flex items-center justify-between mb-4">
                  <Search className="w-5 h-5 text-white/40 group-hover:text-[#F27D26]" />
                  <span className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Herramienta</span>
                </div>
                <h4 className="font-bold mb-1">Coach de PGN</h4>
                <p className="text-xs opacity-50 font-light leading-relaxed">Sube tus partidas y recibe feedback posicional humano basado en principios clásicos.</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Right: History & Stats */}
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 ml-2">Ruta del Maestro</h3>
            <div className="space-y-3">
              {[
                { level: 1, title: 'Fundamentos', status: 'Iniciado', xp: '0/1000' },
                { level: 2, title: 'Pieza Pasiva', status: 'Bloqueado', xp: '1000/2000' },
                { level: 3, title: 'Estructuras', status: 'Bloqueado', xp: '2000/3000' },
              ].map((item, i) => (
                <Card key={i} className={`p-5 rounded-3xl border-white/5 bg-[#0A0A0A] relative overflow-hidden group ${item.status === 'Bloqueado' ? 'opacity-30' : ''}`}>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-xs font-mono">
                        {item.level}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{item.title}</h4>
                        <p className="text-[10px] uppercase font-mono opacity-40">{item.xp} XP</p>
                      </div>
                    </div>
                    {item.status === 'Bloqueado' ? <Lock className="w-4 h-4 opacity-20" /> : <ChevronRight className="w-4 h-4 text-[#F27D26]" />}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-40 ml-2">Logros Recientes</h3>
            {[
              { title: 'Primer Paso', icon: Award, date: 'Hoy' },
              { title: 'Finalista', icon: Zap, date: 'Ayer' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#F27D26]/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#F27D26]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">{item.title}</h4>
                  <p className="text-[10px] opacity-40 font-mono italic">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
