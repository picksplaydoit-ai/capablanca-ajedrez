import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';

export interface GameStatus {
  isCorrect: boolean | null;
  feedback: string;
  isComplete: boolean;
}

export function useGameEngine(exercise: any, completeExercise: any) {
  const [game, setGame] = useState(() => {
    const chess = new Chess();
    if (exercise?.fen) {
      try {
        chess.load(exercise.fen);
      } catch (e) {
        console.error("Invalid FEN on init:", exercise.fen);
      }
    }
    return chess;
  });

  const [status, setStatus] = useState<GameStatus>({
    isCorrect: null,
    feedback: '',
    isComplete: false,
  });

  useEffect(() => {
    const newGame = new Chess();
    if (exercise?.fen) {
      try {
        newGame.load(exercise.fen);
      } catch (e) {
        console.error("Invalid FEN on update:", exercise.fen);
      }
    }
    setGame(newGame);
    setStatus({ isCorrect: null, feedback: '', isComplete: false });
  }, [exercise?.id, exercise?.fen]);

  const makeAMove = useCallback(
    (move: any) => {
      try {
        const gameCopy = new Chess();
        gameCopy.load(game.fen());
        const result = gameCopy.move(move);
        
        if (result) {
          setGame(gameCopy);
          
          const algebraicMove = result.san;
          if (algebraicMove === exercise.bestMove) {
            setStatus({
              isCorrect: true,
              feedback: exercise.successFeedback,
              isComplete: true,
            });
            completeExercise(exercise.id, exercise.xp, exercise.category);
          } else {
            setStatus({
              isCorrect: false,
              feedback: exercise.failureFeedback,
              isComplete: false,
            });
            setTimeout(() => {
              const resetGame = new Chess();
              if (exercise?.fen) {
                resetGame.load(exercise.fen);
              }
              setGame(resetGame);
              setStatus(s => ({ ...s, isCorrect: null }));
            }, 1500);
          }
          return result;
        }
      } catch (e) {
        return null;
      }
      return null;
    },
    [game, exercise, completeExercise]
  );

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to queen for simplicity
    });
    if (move === null) return false;
    return true;
  }

  return {
    game,
    status,
    onDrop,
    reset: () => {
      const resetGame = new Chess();
      if (exercise?.fen) {
        resetGame.load(exercise.fen);
      }
      setGame(resetGame);
      setStatus({ isCorrect: null, feedback: '', isComplete: false });
    },
  };
}
