
export interface AcademyModule {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  theory: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  exercises: string[]; // IDs from exercises.ts
  masteryTarget: number;
}

export const academyModules: AcademyModule[] = [
  {
    id: "fundamentals",
    title: "Fundamentos Clásicos",
    subtitle: "La base de Capablanca",
    icon: "Layers",
    description: "Aprende los principios que permitieron a Capablanca dominar el mundo sin esfuerzo aparente.",
    theory: "El ajedrez se basa en tres pilares: seguridad del rey, actividad de piezas y estructura de peones. Primero, miramos el final para entender el destino de la partida.",
    difficulty: "Beginner",
    exercises: ["1", "2", "5", "9", "11"],
    masteryTarget: 50
  },
  {
    id: "restriction",
    title: "El Arte de la Restricción",
    subtitle: "Neutralizar al oponente",
    icon: "Shield",
    description: "Aprende a identificar las mejores piezas del rival y a restringir su movilidad.",
    theory: "La restricción no es solo defensa; es el control preventivo. Si el rival no tiene casillas, no tiene planes.",
    difficulty: "Intermediate",
    exercises: ["3", "10", "22"],
    masteryTarget: 100
  },
  {
    id: "endgame-technique",
    title: "Técnica de Finales",
    subtitle: "La fase decisiva",
    icon: "Trophy",
    description: "Dominio de torres, oposición y la actividad del rey.",
    theory: "En el final, el rey es un atacante. Las torres pertenecen detrás de los peones pasados. La precisión aquí es lo que separa a los maestros de los aficionados.",
    difficulty: "Intermediate",
    exercises: ["7", "12", "23"],
    masteryTarget: 150
  },
  {
    id: "structures",
    title: "Dominio de Estructuras",
    subtitle: "El esqueleto del juego",
    icon: "Zap",
    description: "Cómo jugar con peones aislados, colgantes y mayorías en el flanco.",
    theory: "Los peones determinan dónde van las piezas. Aprende a 'leer' la estructura para encontrar el plan correcto sin calcular cada variante.",
    difficulty: "Advanced",
    exercises: ["4", "6", "24"],
    masteryTarget: 200
  }
];
