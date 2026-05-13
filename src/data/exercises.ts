export type ExerciseCategory = 
  | "Strategy" 
  | "Tactics" 
  | "Endgames" 
  | "Calculation" 
  | "Prophylaxis" 
  | "Structures";

export interface StrategicStep {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  principle: string;
  category: ExerciseCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  fen: string;
  bestMove: string;
  calculationVariants?: string[];
  strategicAssessment?: StrategicStep[];
  coachFeedback: {
    correct: string;
    incorrect: string;
    hint: string;
  };
  xp: number;
}

export const initialExercises: Exercise[] = [
  {
    id: "1",
    title: "El arte de la simplificación",
    description: "Capablanca solía simplificar sus posiciones cuando tenía una clara ventaja. En este final de partida, identifica la operación que te permita alcanzar la victoria.",
    principle: "Simplificación",
    category: "Endgames",
    difficulty: "Beginner",
    fen: "8/8/8/3k4/8/1P1K4/8/8 w - - 0 1",
    bestMove: "Kc3",
    strategicAssessment: [
      {
        question: "¿Cuál es la pieza más importante en este final?",
        options: ["Los peones del flanco de rey", "El Rey", "Los peones doblados"],
        correctIndex: 1,
        explanation: "En los finales, el Rey se convierte en una pieza de ataque activa. Capablanca dominaba esto mejor que nadie."
      }
    ],
    coachFeedback: {
      correct: "Excelente. Al activar el Rey, te preparas para apoyar a tus peones y simplificar la lucha hacia la victoria.",
      incorrect: "Mover peones innecesariamente puede crear debilidades. Céntrate en la pieza más importante del final: el Rey.",
      hint: "Capablanca decía: 'El Rey es una pieza de combate. ¡Úsalo!'"
    },
    xp: 100
  },
  {
    id: "2",
    title: "Piece Coordination",
    description: "Ensure your pieces are working together. The Knight and Bishop should control key squares around the center.",
    principle: "Coordination",
    category: "Strategy",
    difficulty: "Beginner",
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    bestMove: "Bc4",
    coachFeedback: {
      correct: "Classic development. The Bishop targets f7 and controls the center diagonal.",
      incorrect: "Developing without a target is inefficient. The Bishop belongs on an active diagonal.",
      hint: "Look for the most active square for your light-squared Bishop."
    },
    xp: 50
  },
  {
    id: "3",
    title: "The active Rook",
    description: "A Rook on the 7th rank is often worth a pawn. Find the way to maximize your rook's pressure.",
    principle: "Piece Activity",
    category: "Strategy",
    difficulty: "Intermediate",
    fen: "2r3k1/1R3ppp/p7/8/8/8/P4PPP/6K1 w - - 0 1",
    bestMove: "h3",
    coachFeedback: {
      correct: "Safety first. Providing 'Luft' for your King prevents back-rank issues while your Rook dominates.",
      incorrect: "Ignoring the back-rank threat is a common mistake even among experts.",
      hint: "Don't let a sudden checkmate ruin your positional advantage."
    },
    xp: 150
  },
  {
    id: "4",
    title: "Pawn Structure Integrity",
    description: "Avoid doubling your pawns unless it provides significant compensation. Evaluate the exchange.",
    principle: "Structure",
    category: "Structures",
    difficulty: "Beginner",
    fen: "r1bqk2r/pp1nppbp/2pp1np1/8/2PPP3/2N1BP2/PP4PP/R2QKBNR w KQkq - 1 7",
    bestMove: "Qd2",
    coachFeedback: {
      correct: "Perfect logic. Preparing long castles while keeping the structure flexible.",
      incorrect: "Rushing the attack without preparation was not Capablanca's way.",
      hint: "Prepare your development before launching an assault."
    },
    xp: 80
  },
  {
    id: "5",
    title: "Centralization is Key",
    description: "Centralizing your pieces early creates the foundation for a strong middle game.",
    principle: "Centralization",
    category: "Strategy",
    difficulty: "Beginner",
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3",
    bestMove: "Nf3",
    coachFeedback: {
      correct: "Strong and steady. You control the center and develop smoothly.",
      incorrect: "Developing your Queen too early makes it a target for the opponent.",
      hint: "Knight development should precede most other actions."
    },
    xp: 60
  },
  {
    id: "6",
    title: "The Minority Attack",
    description: "Launch a minority attack to create a weakness in the opponent's pawn structure.",
    principle: "Pawn Structure",
    category: "Structures",
    difficulty: "Advanced",
    fen: "1r3rk1/2p1bppp/p1n1p3/1pPq4/3P4/PQ2PN2/5PPP/R1B2RK1 w - - 0 1",
    bestMove: "Rb1",
    coachFeedback: {
      correct: "Correct. Preparing the advance of the b-pawn and adding pressure to the queenside.",
      incorrect: "Too passive. You must execute the strategic plan in this structure.",
      hint: "Support your queenside expansion."
    },
    xp: 200
  },
  {
    id: "7",
    title: "Opposition in Endgames",
    description: "Master the concept of 'Opposition'. Your King must reach the key squares to promote your pawn.",
    principle: "Endgames",
    category: "Endgames",
    difficulty: "Intermediate",
    fen: "8/8/8/3k4/8/1P1K4/8/8 w - - 0 1",
    bestMove: "Kc3",
    coachFeedback: {
      correct: "Excellent. Maintaining the opposition and preventing the enemy King from approaching.",
      incorrect: "Losing the opposition allows the enemy King to blockade your pawn.",
      hint: "Move towards the pawn while keeping an eye on the enemy King."
    },
    xp: 120
  },
  {
    id: "8",
    title: "Bishop vs Knight",
    description: "Capablanca often demonstrated the superiority of the Bishop over the Knight in open positions.",
    principle: "Piece Activity",
    category: "Strategy",
    difficulty: "Intermediate",
    fen: "4k3/1b6/8/4n3/8/5P2/4K1P1/8 w - - 0 1",
    bestMove: "Ke3",
    coachFeedback: {
      correct: "The King supports the center and limits the Knight's mobility.",
      incorrect: "Pawns alone cannot fight a centralized Knight and active Bishop.",
      hint: "Bring your King into the center."
    },
    xp: 130
  },
  {
    id: "9",
    title: "The Rook behind the Pawn",
    description: "Rooks belong behind passed pawns—both your own and your opponent's.",
    principle: "Piece Activity",
    category: "Endgames",
    difficulty: "Beginner",
    fen: "8/8/kp1R4/8/1P6/8/8/7K w - - 0 1",
    bestMove: "Rd7",
    coachFeedback: {
      correct: "Isolating the King on the edge is the most efficient way to promote.",
      incorrect: "Don't push the pawn too fast. Support it with your heavy pieces first.",
      hint: "Contain the enemy King."
    },
    xp: 70
  },
  {
    id: "10",
    title: "Structural Weakness",
    description: "Identify and target the isolated pawn. Capablanca would find the most direct route to pressure it.",
    principle: "Positional Control",
    category: "Prophylaxis",
    difficulty: "Intermediate",
    fen: "2r2rk1/pp1b1ppp/1qn1pn2/3p4/2PP4/1P1B1N2/P2N1PPP/R2Q1RK1 w - - 0 1",
    bestMove: "c5",
    coachFeedback: {
      correct: "Closes the center and creates a target on the a6/b7 complex. Very Capablanca-esque.",
      incorrect: "Leaving the tension in the center and allowing unnecessary counterplay.",
      hint: "Fix the structure to your advantage."
    },
    xp: 110
  },
  {
    id: "11",
    title: "Knight on the Rim",
    description: "A Knight on the rim is dim. Centralize the piece to dominate the board.",
    principle: "Centralization",
    category: "Strategy",
    difficulty: "Beginner",
    fen: "r1bqkbnr/pppp1ppp/n7/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
    bestMove: "Nf3",
    coachFeedback: {
      correct: "Strong centralization. You ignore the distraction on the edge.",
      incorrect: "Chasing the knight on the edge often wastes valuable time.",
      hint: "Develop towards the center."
    },
    xp: 50
  },
  {
    id: "12",
    title: "Passed Pawn Menace",
    description: "In the endgame, a passed pawn is a 'criminal' that must be kept under surveillance.",
    principle: "Endgames",
    category: "Endgames",
    difficulty: "Advanced",
    fen: "8/8/3P4/4k3/8/5K2/8/8 w - - 0 1",
    bestMove: "Ke3",
    coachFeedback: {
      correct: "By bringing the King closer, you ensure the pawn's promotion or trade for the enemy King.",
      incorrect: "If you push the pawn immediately, the King will catch it.",
      hint: "The King must support the advance."
    },
    xp: 180
  },
  {
    id: "13",
    title: "The Open File",
    description: "Control the only open file to infiltrate the opponent's position.",
    principle: "Positional Control",
    category: "Strategy",
    difficulty: "Intermediate",
    fen: "2r2rk1/pp3ppp/4p3/3pP3/8/1P6/P4PPP/2R2RK1 w - - 0 1",
    bestMove: "Rxc8",
    coachFeedback: {
      correct: "Controlling the file is good, but sometimes forcing a trade on your terms is better for the final endgame.",
      incorrect: "Allowing the opponent to maintain the file contest can lead to equality.",
      hint: "Think about the transition to the endgame."
    },
    xp: 140
  },
  {
    id: "14",
    title: "Double Bishop Power",
    description: "Coordinate your two Bishops to slice through the board.",
    principle: "Piece Activity",
    category: "Strategy",
    difficulty: "Intermediate",
    fen: "4k3/1b3b2/8/8/8/8/1B3B2/4K3 w - - 0 1",
    bestMove: "Bc3",
    coachFeedback: {
      correct: "Improving the placement of your Bishops step by step.",
      incorrect: "Moving pieces aimlessly loses the cooperative power of the pair.",
      hint: "Aim for long-reaching coordination."
    },
    xp: 100
  },
  {
    id: "15",
    title: "Space Advantage",
    description: "Use your space to restrict your opponent's pieces. Don't rush, just squeeze.",
    principle: "Positional Control",
    category: "Strategy",
    difficulty: "Advanced",
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 1",
    bestMove: "d5",
    coachFeedback: {
      correct: "Gaining space and forcing the enemy knight to a less active square.",
      incorrect: "Trading now simplifies the position too early, giving away your advantage.",
      hint: "Check which move limits your opponent more."
    },
    xp: 160
  },
  {
    id: "16",
    title: "The Seventh Rank",
    description: "The rook's ultimate destination. Use it to paralyze the enemy's defense.",
    principle: "Piece Activity",
    category: "Tactics",
    difficulty: "Intermediate",
    fen: "5rk1/R4ppp/8/8/8/8/5PPP/6K1 w - - 0 1",
    bestMove: "f3",
    coachFeedback: {
      correct: "Preventing any backrank surprises while maintaining the pressure.",
      incorrect: "Don't let your guard down when you have the advantage.",
      hint: "Safety before glory."
    },
    xp: 110
  },
  {
    id: "17",
    title: "Trading for Profit",
    description: "Not all trades are equal. Trade your active piece only for a clear positional gain.",
    principle: "Simplification",
    category: "Strategy",
    difficulty: "Intermediate",
    fen: "r1bqk2r/pp3ppp/2n1pn2/2pp4/2PP4/P1PBPN2/5PPP/R1BQK1R1 w KQkq - 0 1",
    bestMove: "O-O",
    coachFeedback: {
      correct: "Completing development. The center will resolve itself in your favor.",
      incorrect: "Trading in the center now releases the tension prematurely.",
      hint: "Castle first."
    },
    xp: 90
  },
  {
    id: "18",
    title: "Blockading the Pawn",
    description: "The best way to stop a passed pawn is to place a piece directly in front of it.",
    principle: "Positional Control",
    category: "Calculation",
    difficulty: "Beginner",
    fen: "8/1p6/1p6/1p6/pP6/P7/8/8 w - - 0 1",
    bestMove: "Kg2",
    coachFeedback: {
      correct: "Approaching the target calmly. No need to rush.",
      incorrect: "The pawns are blocked; move your King to help.",
      hint: "Bring the King."
    },
    xp: 40
  },
  {
    id: "19",
    title: "Improving the Worst Piece",
    description: "Identify your worst-placed piece and find the maneuver to improve it.",
    principle: "Piece Activity",
    category: "Strategy",
    difficulty: "Intermediate",
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 1",
    bestMove: "e4",
    coachFeedback: {
      correct: "Opening the center benefits your well-coordinated pieces.",
      incorrect: "Developing slowly allows your opponent to catch up.",
      hint: "Look for the central break."
    },
    xp: 120
  },
  {
    id: "20",
    title: "Calculating the Finish",
    description: "Sometimes a small combination is needed to convert a positional advantage into a win.",
    principle: "Technique",
    category: "Calculation",
    difficulty: "Advanced",
    fen: "4r1k1/pp3ppp/2p5/8/3P4/1P4P1/P4P1P/3R2K1 w - - 0 1",
    bestMove: "d5",
    coachFeedback: {
      correct: "The passed pawn creates massive problems for Black. The game is functionally won.",
      incorrect: "Moving the King is safe, but pushing the pawn wins faster.",
      hint: "Advance your trumps."
    },
    xp: 250
  },
  {
    id: "21",
    title: "The Greek Gift Sacrifice",
    description: "Classic tactical pattern. Evaluate if the sacrifice on h7 is decisive in this position.",
    principle: "Kingside Attack",
    category: "Tactics",
    difficulty: "Intermediate",
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 1",
    bestMove: "Bxh7+",
    coachFeedback: {
      correct: "Devastating. The King is exposed and the follow-up with Ng5+ and Qh5 is unstoppable.",
      incorrect: "Missing the tactical opportunity allows Black to consolidate the defense.",
      hint: "Target the h7 square."
    },
    xp: 150
  },
  {
    id: "22",
    title: "Prophylactic Thinking",
    description: "Stop your opponent's plan before it even starts. Identify Black's intention and neutralize it.",
    principle: "Prophylaxis",
    category: "Prophylaxis",
    difficulty: "Advanced",
    fen: "r1bq1rk1/pp2ppbp/2np1np1/8/2PP4/2N1BP2/PP2N1PP/R2QKB1R w KQ - 0 1",
    bestMove: "a3",
    coachFeedback: {
      correct: "Precise. Preventing ...Nb4 or ...b5 before expanding in the center.",
      incorrect: "Rushing ahead allows the opponent to create annoying counter-threats.",
      hint: "Control the b4 square."
    },
    xp: 200
  },
  {
    id: "23",
    title: "Simplifying to a Won Pawn Ending",
    description: "When ahead in material, sometimes trading all pieces is the cleanest path.",
    principle: "Simplification",
    category: "Endgames",
    difficulty: "Intermediate",
    fen: "8/5pk1/6p1/7p/7P/5KP1/5P2/8 w - - 0 1",
    bestMove: "Ke4",
    coachFeedback: {
      correct: "The King's activity is paramount here. Centralizing ensures control over the breakthrough squares.",
      incorrect: "Moving pawns blindly can lead to a draw in what should be a win.",
      hint: "Activate the King."
    },
    xp: 140
  },
  {
    id: "24",
    title: "The Isolated Queen's Pawn",
    description: "Understand the dynamics of the IQP. Should you simplify or keep pieces on the board?",
    principle: "Structure",
    category: "Structures",
    difficulty: "Advanced",
    fen: "r1bq1rk1/pp3ppp/2n1pn2/3p4/2PP4/P1PB1N2/5PPP/R1BQK2R w KQ - 0 1",
    bestMove: "O-O",
    coachFeedback: {
      correct: "Standard. Developing and waiting for the right moment to resolve the tension.",
      incorrect: "Trading now simplifies too much and gives away the dynamic potential of the center.",
      hint: "Complete development."
    },
    xp: 220
  },
  {
    id: "25",
    title: "Bishop Maneuvering",
    description: "The Bishop needs long diagonals. Find the way to reposition it against the enemy structure.",
    principle: "Piece Activity",
    category: "Strategy",
    difficulty: "Intermediate",
    fen: "r1bqk2r/pp2bppp/2n1pn2/2pp4/2PP4/PP1BPN2/5PPP/RNBQK2R w KQkq - 0 1",
    bestMove: "Bb2",
    coachFeedback: {
      correct: "The fianchettoed Bishop will exert immense pressure on the long diagonal once the center opens.",
      incorrect: "Leaving the Bishop on d3 blocks your own development and restricts its scope.",
      hint: "Target the center from the flank."
    },
    xp: 160
  }
];
