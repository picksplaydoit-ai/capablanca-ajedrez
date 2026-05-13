import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Mail, Lock, User } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F27D26] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 text-white/40 hover:text-white transition-colors"
      >
        <ChevronLeft className="mr-2 w-4 h-4" /> Volver
      </Button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-black font-bold mx-auto mb-6">C</div>
          <h1 className="text-3xl font-light tracking-tighter mb-2 italic serif">
            {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h1>
          <p className="text-sm opacity-40 uppercase tracking-widest font-mono">
            {isLogin ? 'Continúa tu maestrazgo' : 'Inicia tu camino hoy'}
          </p>
        </div>

        <Card className="bg-[#0A0A0A] border-white/5 p-8 shadow-2xl rounded-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-widest opacity-40 ml-1">Nombre completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <Input 
                    id="name" 
                    placeholder="Jose Raul" 
                    className="bg-white/5 border-white/10 rounded-xl pl-10 focus:ring-[#F27D26]/30 h-11"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-widest opacity-40 ml-1">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="capablanca@chess.com" 
                  className="bg-white/5 border-white/10 rounded-xl pl-10 focus:ring-[#F27D26]/30 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pass" className="text-xs uppercase tracking-widest opacity-40 ml-1">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <Input 
                  id="pass" 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-white/5 border-white/10 rounded-xl pl-10 focus:ring-[#F27D26]/30 h-11"
                />
              </div>
            </div>

            <Button 
              className="w-full rounded-xl bg-[#E4E3E0] text-black hover:bg-white h-12 font-bold transition-all shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Procesando...
                </span>
              ) : (
                isLogin ? 'Entrar' : 'Registrarse'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest font-bold"
            >
              {isLogin ? '¿No tienes cuenta? Registrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </Card>
        
        <div className="mt-12 text-center opacity-20">
          <p className="text-[10px] uppercase tracking-[0.3em]">Pure • Logic • Elegance</p>
        </div>
      </motion.div>
    </div>
  );
}
