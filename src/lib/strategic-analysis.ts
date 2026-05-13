
import { Chess, Square } from 'chess.js';

export interface StrategicMarker {
  square: Square;
  type: 'weakness' | 'outpost' | 'attacker' | 'defender' | 'target';
  description: string;
}

export function analyzePosition(fen: string): StrategicMarker[] {
  const game = new Chess(fen);
  const markers: StrategicMarker[] = [];

  // Logic: Identify "weak squares" (not defended by pawns, and could be reachable)
  // Logic: Identify "outposts" (squares protected by own pawns, in enemy half)
  // This is a simplified heuristic engine.

  const squares: Square[] = [];
  for (let rank = 1; rank <= 8; rank++) {
    for (const file of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
      squares.push((file + rank) as Square);
    }
  }

  squares.forEach(sq => {
    const piece = game.get(sq);
    if (!piece) {
       // Check for outposts (simplified)
       const rank = parseInt(sq[1]);
       const fileIdx = sq.charCodeAt(0) - 97;
       
       // Outpost for White: Rank 4, 5, 6
       if (rank >= 4 && rank <= 6) {
          // Is it defended by a white pawn?
          // (Check adjacent tiles on rank-1)
          const leftPawn = fileIdx > 0 ? game.get(String.fromCharCode(97 + fileIdx - 1) + (rank - 1) as Square) : null;
          const rightPawn = fileIdx < 7 ? game.get(String.fromCharCode(97 + fileIdx + 1) + (rank - 1) as Square) : null;
          
          if ((leftPawn?.type === 'p' && leftPawn.color === 'w') || (rightPawn?.type === 'p' && rightPawn.color === 'w')) {
             // Is it attacked by a black pawn?
             const blackLeftPawn = fileIdx > 0 ? game.get(String.fromCharCode(97 + fileIdx - 1) + (rank + 1) as Square) : null;
             const blackRightPawn = fileIdx < 7 ? game.get(String.fromCharCode(97 + fileIdx + 1) + (rank + 1) as Square) : null;
             
             if (!(blackLeftPawn?.type === 'p' && blackLeftPawn.color === 'b') && !(blackRightPawn?.type === 'p' && blackRightPawn.color === 'b')) {
                markers.push({ square: sq, type: 'outpost', description: "Casilla fuerte para tus piezas menores." });
             }
          }
       }
    }
    
    // Identify hanging pieces
    if (piece && piece.color === 'b') {
       // If it's a target
       if (piece.type === 'p' && (parseInt(sq[1]) < 4)) {
          // Isolated or doubled? (simplified)
          markers.push({ square: sq, type: 'target', description: "Punto de presión en la estructura rival." });
       }
    }
  });

  return markers;
}
