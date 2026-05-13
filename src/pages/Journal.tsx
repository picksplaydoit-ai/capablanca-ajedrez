
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ChevronLeft, 
  BookMarked, 
  Tag, 
  Plus, 
  Trash2, 
  Search,
  PenLine,
  Calendar
} from 'lucide-react';

export default function Journal() {
  const navigate = useNavigate();
  const { user, addJournalEntry } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');

  const handleSave = () => {
    if (newTitle && newText) {
      addJournalEntry({ title: newTitle, text: newText, tags: ['Reflexión'] });
      setNewTitle('');
      setNewText('');
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] pb-20">
      <header className="p-6 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-white/40" />
          </button>
          <div>
            <h1 className="text-xs font-bold tracking-widest uppercase italic text-[#F27D26]">Bitácora de Maestro</h1>
            <p className="text-[10px] opacity-40 font-mono tracking-widest">REFLEXIONES ESTRATÉGICAS</p>
          </div>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-widest gap-2"
        >
          {isAdding ? 'CANCELAR' : <><Plus className="w-4 h-4" /> NUEVA ENTRADA</>}
        </Button>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-8">
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A0A0A] border border-[#F27D26]/20 p-8 rounded-[2rem] space-y-4"
            >
              <input 
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Título de la reflexión..."
                className="w-full bg-transparent border-none text-2xl font-light italic serif outline-none placeholder:opacity-20"
              />
              <textarea 
                value={newText}
                onChange={e => setNewText(e.target.value)}
                placeholder="¿Qué has aprendido hoy sobre tu juego automático?"
                className="w-full bg-transparent border-none text-white/60 min-h-[150px] outline-none resize-none font-light leading-relaxed"
              />
              <div className="flex justify-end pt-4">
                 <Button 
                    className="bg-[#F27D26] hover:bg-[#F27D26]/80 text-white rounded-xl px-8 font-bold text-xs tracking-widest"
                    onClick={handleSave}
                 >
                    GUARDAR EN EL ADN
                 </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-6">
          {user.journal.length === 0 && !isAdding && (
            <div className="py-32 text-center space-y-4 opacity-20">
               <BookMarked className="w-16 h-16 mx-auto" />
               <p className="text-sm font-mono uppercase tracking-[0.3em]">Tu bitácora está vacía. Registra tus errores para que no se repitan.</p>
            </div>
          )}
          {user.journal.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] group hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-4 text-[10px] font-mono opacity-20 uppercase tracking-widest mb-4">
                 <Calendar className="w-3 h-3" />
                 {new Date(entry.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <h3 className="text-2xl font-light italic serif mb-4">{entry.title}</h3>
              <p className="text-white/60 font-light leading-relaxed mb-6">
                {entry.text}
              </p>
              <div className="flex gap-2">
                {entry.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono p-1 px-2 rounded bg-white/5 text-white/40 uppercase">#{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
