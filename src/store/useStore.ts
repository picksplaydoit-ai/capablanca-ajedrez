import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Mastery {
  Estrategia: number;
  Táctica: number;
  Finales: number;
  Cálculo: number;
  Profilaxis: number;
  Estructuras: number;
}

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  text: string;
  tags: string[];
}

interface UserStats {
  xp: number;
  level: number;
  streak: number;
  completedExercises: string[];
  lastCompletedDate: string | null;
  dailyChallengeCompleted: boolean;
  mastery: Mastery;
  trait: string;
  academyProgress: Record<string, number>; // moduleId -> completion %
  journal: JournalEntry[];
  thinkingPatterns: Record<string, number>; // Pattern key -> confidence score
  focusMode: boolean;
  spacedRepetition: Record<string, number>; // itemId -> nextReviewTimestamp
}

interface GameState {
  user: UserStats;
  addXp: (amount: number) => void;
  completeExercise: (id: string, xp: number, category: string) => void;
  setDailyChallengeStatus: (status: boolean) => void;
  updateStreak: () => void;
  detectTrait: () => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  updateAcademyProgress: (moduleId: string, increment: number) => void;
  toggleFocusMode: () => void;
  recordThinkingPattern: (patternKey: string, success: boolean) => void;
  scheduleReview: (itemId: string, intervalDays: number) => void;
}

export const useStore = create<GameState>()(
  persist(
    (set, get) => ({
      user: {
        xp: 0,
        level: 1,
        streak: 0,
        completedExercises: [],
        lastCompletedDate: null,
        dailyChallengeCompleted: false,
        mastery: {
          Estrategia: 0,
          Táctica: 0,
          Finales: 0,
          Cálculo: 0,
          Profilaxis: 0,
          Estructuras: 0,
        },
        trait: "Aprendiz",
        academyProgress: {},
        journal: [],
        thinkingPatterns: {},
        focusMode: false,
        spacedRepetition: {},
      },
      addXp: (amount) => set((state) => {
        const newXp = state.user.xp + amount;
        const newLevel = Math.floor(newXp / 1000) + 1;
        return {
          user: {
            ...state.user,
            xp: newXp,
            level: newLevel,
          }
        };
      }),
      setDailyChallengeStatus: (status) => set((state) => ({
        user: { ...state.user, dailyChallengeCompleted: status }
      })),
      addJournalEntry: (entry) => set((state) => ({
        user: {
          ...state.user,
          journal: [
            { id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString(), ...entry },
            ...state.user.journal
          ]
        }
      })),
      updateAcademyProgress: (moduleId, increment) => set((state) => ({
        user: {
          ...state.user,
          academyProgress: {
            ...state.user.academyProgress,
            [moduleId]: Math.min(100, (state.user.academyProgress[moduleId] || 0) + increment)
          }
        }
      })),
      toggleFocusMode: () => set((state) => ({
        user: { ...state.user, focusMode: !state.user.focusMode }
      })),
      recordThinkingPattern: (patternKey, success) => set((state) => {
        const current = state.user.thinkingPatterns[patternKey] || 50;
        const next = success ? Math.min(100, current + 5) : Math.max(0, current - 5);
        return {
          user: {
            ...state.user,
            thinkingPatterns: { ...state.user.thinkingPatterns, [patternKey]: next }
          }
        };
      }),
      scheduleReview: (itemId, intervalDays) => set((state) => ({
        user: {
          ...state.user,
          spacedRepetition: {
            ...state.user.spacedRepetition,
            [itemId]: Date.now() + (intervalDays * 24 * 60 * 60 * 1000)
          }
        }
      })),
      completeExercise: (id, xp, category) => {
        if (get().user.completedExercises.includes(id)) return;
        
        set((state) => {
          const newXp = state.user.xp + xp;
          const newLevel = Math.floor(newXp / 1000) + 1;
          const newMastery = { ...state.user.mastery };
          if (category in newMastery) {
            newMastery[category as keyof Mastery] += 10;
          }

          // Spaced rep: First review in 1 day
          const newSR = {
            ...state.user.spacedRepetition,
            [id]: Date.now() + (1 * 24 * 60 * 60 * 1000)
          };

          return {
            user: {
              ...state.user,
              xp: newXp,
              level: newLevel,
              completedExercises: [...state.user.completedExercises, id],
              mastery: newMastery,
              spacedRepetition: newSR,
            }
          };
        });
        get().updateStreak();
        get().detectTrait();
      },
      detectTrait: () => {
        const { mastery } = get().user;
        let trait = "Equilibrado";
        
        if (mastery.Finales > mastery.Táctica + 20) trait = "Técnico";
        if (mastery.Táctica > mastery.Estrategia + 20) trait = "Agresivo";
        if (mastery.Estrategia > mastery.Táctica + 20) trait = "Posicional";
        if (mastery.Profilaxis > 30) trait = "Sólido";

        set((state) => ({ user: { ...state.user, trait } }));
      },
      updateStreak: () => {
        const today = new Date().toDateString();
        const lastDate = get().user.lastCompletedDate;
        
        if (lastDate === today) return;
        
        set((state) => {
          let newStreak = state.user.streak;
          if (lastDate) {
            const last = new Date(lastDate);
            const diff = (new Date(today).getTime() - last.getTime()) / (1000 * 3600 * 24);
            if (diff === 1) {
              newStreak += 1;
            } else if (diff > 1) {
              newStreak = 1;
            }
          } else {
            newStreak = 1;
          }
          
          return {
            user: {
              ...state.user,
              streak: newStreak,
              lastCompletedDate: today,
            }
          };
        });
      },
    }),
    {
      name: 'capablanca-store',
    }
  )
);
