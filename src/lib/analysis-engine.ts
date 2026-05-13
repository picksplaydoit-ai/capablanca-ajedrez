
import { Chess } from 'chess.js';

export interface AnalysisFeedback {
  category: "Estructura" | "Movilidad" | "Seguridad" | "Desarrollo" | "Finales";
  message: string;
  severity: "low" | "medium" | "high";
}

export function analyzePositionHeuristically(fen: string): AnalysisFeedback[] {
  const game = new Chess(fen);
  const feedback: AnalysisFeedback[] = [];

  const board = game.board();
  const turn = game.turn();
  
  // Logic: Material check
  // Logic: Development check
  let whiteDev = 0;
  let blackDev = 0;
  
  board.forEach((row, r) => {
    row.forEach((piece, c) => {
      if (piece) {
        if (piece.type !== 'p' && piece.type !== 'k') {
          // Check if piece moved from starting rank
          if (piece.color === 'w' && r !== 7) whiteDev++;
          if (piece.color === 'b' && r !== 0) blackDev++;
        }
      }
    });
  });

  if (whiteDev < 3 && game.moveNumber() > 5) {
    feedback.push({ category: "Desarrollo", message: "Tus piezas menores aún duermen. Capablanca priorizaba la salida armoniosa.", severity: "high" });
  }

  // Logic: Structure
  const isEndgame = isEndgameHeuristic(fen);
  if (isEndgame) {
    feedback.push({ category: "Finales", message: "Activa tu rey. En el final, el rey es la pieza de ataque principal.", severity: "medium" });
  }

  // Logic: Empty check if nothing found
  if (feedback.length === 0) {
    feedback.push({ category: "Desarrollo", message: "La posición es sólida. Busca mejorar la peor colocada de tus piezas.", severity: "low" });
  }

  return feedback;
}

function isEndgameHeuristic(fen: string): boolean {
  const pieces = fen.split(' ')[0].replace(/[^a-zA-Z]/g, '');
  return pieces.length <= 12;
}

export function generateNarrativeSummary(fen: string): string {
  const isEndgame = isEndgameHeuristic(fen);
  const game = new Chess(fen);
  
  if (isEndgame) {
    return "La fase técnica ha comenzado. Aquí, la precisión en el cálculo de peones y la oposición del rey decidirán el resultado. No apresures las rupturas.";
  }
  
  if (game.moveNumber() < 10) {
    return "Estamos en la apertura. El objetivo es el control central y la seguridad del rey. Sigue los principios clásicos de desarrollo rápido.";
  }

  return "El medio juego está en su punto crítico. Evalúa las debilidades estructurales antes de lanzar un ataque prematuro. La paciencia es la virtud del maestro.";
}
