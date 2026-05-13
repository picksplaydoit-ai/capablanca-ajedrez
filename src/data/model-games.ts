export interface ModelGame {
  id: string;
  players: string;
  year: number;
  result: string;
  opening: string;
  description: string;
  keyPrinciple: string;
  initialFen: string;
  moves: string[]; // Simplificado para navegación
  criticalPosition: string;
}

export const modelGames: ModelGame[] = [
  {
    id: "capa-1",
    players: "Capablanca vs Lasker",
    year: 1921,
    result: "1-0",
    opening: "Gambito de Dama Rehusado",
    description: "Una obra maestra de restricción. Capablanca neutraliza la actividad de las piezas negras antes de simplificar al final.",
    keyPrinciple: "Restricción y Simplificación",
    initialFen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 1",
    moves: ["e4", "dxe4", "Nxe4", "Nxe4", "Bxe4"],
    criticalPosition: "4r1k1/pp3ppp/2p5/8/3P4/1P4P1/P4P1P/3R2K1 w - - 0 1"
  },
  {
    id: "capa-2",
    players: "Tartakower vs Capablanca",
    year: 1924,
    result: "0-1",
    opening: "Apertura Holandesa",
    description: "El famoso final de torres donde Capablanca demuestra que el Rey activo es la pieza más fuerte.",
    keyPrinciple: "Actividad del Rey en Finales",
    initialFen: "8/8/3P4/4k3/8/5K2/8/8 w - - 0 1",
    moves: ["Ke3", "Kxd6", "Kd4"],
    criticalPosition: "8/8/8/3k4/8/1P1K4/8/8 w - - 0 1"
  }
];
