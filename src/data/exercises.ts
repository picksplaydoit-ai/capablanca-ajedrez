export type ExerciseCategory = 
  | "Estrategia" 
  | "Táctica" 
  | "Finales" 
  | "Cálculo" 
  | "Profilaxis" 
  | "Estructuras"
  | "Técnica";

export interface Exercise {
  id: string;
  title: string;
  fen: string;
  sideToMove: "w" | "b";
  bestMove: string;
  principle: string;
  category: ExerciseCategory;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  tags: string[];
  context: string;
  question: string;
  explanation: string;
  hints: string[];
  successFeedback: string;
  failureFeedback: string;
  xp: number;
}

export const initialExercises: Exercise[] = [
  {
    id: "capa-1",
    title: "El puesto avanzado del Caballo",
    fen: "1r3rk1/1p1qbppp/p1n1p3/3p4/3P4/P1NBP3/1P3PPP/2RQ1RK1 w - - 0 1",
    sideToMove: "w",
    bestMove: "Na4",
    principle: "Actividad de Piezas",
    category: "Estrategia",
    difficulty: "Intermedio",
    tags: ["caballo", "outpost", "minority attack"],
    context: "En esta posición típica del Gambito de Dama, las blancas tienen un desarrollo armonioso. Sin embargo, el caballo de c3 está bloqueado por su propio peón de d4 y no tiene un objetivo claro.",
    question: "¿Cómo puede el blanco iniciar una maniobra para ocupar una casilla débil en el campo enemigo?",
    explanation: "Na4 es una jugada estratégica excelente. El objetivo es la casilla c5, un 'outpost' ideal donde el caballo presionará b7 y restringirá la actividad negra. Si las negras juegan ...b5, habrán creado debilidades permanentes que el blanco sabrá explotar.",
    hints: [
      "Busca una maniobra para llevar el caballo a c5.",
      "Identifica qué pieza negra defiende la casilla c5.",
      "A veces hay que alejar una pieza del centro para mejorar su posición a largo plazo."
    ],
    successFeedback: "¡Excelente! Na4 es el inicio de la famosa maniobra de Capablanca para dominar el flanco de dama.",
    failureFeedback: "Ese movimiento no prepara la mejora del caballo. Busca la casilla c5.",
    xp: 150
  },
  {
    id: "capa-2",
    title: "Simplificación Ganadora",
    fen: "2r2rk1/pp3p1b/4p2p/3p1qp1/3P4/1NP1R1P1/PP3P1P/R2Q2K1 w - - 0 1",
    sideToMove: "w",
    bestMove: "Qd3",
    principle: "Simplificación",
    category: "Técnica",
    difficulty: "Avanzado",
    tags: ["finales", "seguridad", "cambio"],
    context: "Las blancas tienen una estructura más sólida y una mejor coordinación. La dama negra en f5 es la única pieza activa del rival que genera contrajuego.",
    question: "¿Cuál es el método más simple de Capablanca para neutralizar el peligro y entrar en un final favorable?",
    explanation: "Qd3 invita al cambio de damas. Al eliminar la pieza más peligrosa del negro, el blanco transpone a un final donde su superioridad estructural y la debilidad de los peones negros aseguran una victoria técnica sin riesgos.",
    hints: [
      "No temas cambiar piezas si eso elimina el contrajuego enemigo.",
      "Las damas iguales suelen favorecer al bando con mejor estructura en el final.",
      "Busca la máxima seguridad."
    ],
    successFeedback: "¡Correcto! Qd3 anula el ataque negro y simplifica hacia una victoria técnica impecable.",
    failureFeedback: "Evitar el cambio permite que el negro mantenga esperanzas de ataque. El camino de Capablanca es la claridad.",
    xp: 200
  },
  {
    id: "capa-3",
    title: "La Torre en Séptima",
    fen: "r1r3k1/1p3ppp/3p4/pP1Pp3/4P3/R1N2P2/1P4PP/5RK1 w - - 0 1",
    sideToMove: "w",
    bestMove: "b6",
    principle: "Actividad de Piezas",
    category: "Estrategia",
    difficulty: "Avanzado",
    tags: ["columna abierta", "infiltracion", "espacio"],
    context: "El blanco domina el espacio y tiene un peón pasado en b5. Las negras intentan bloquear la columna a.",
    question: "¿Cómo puede el blanco forzar la entrada de sus piezas pesadas o mejorar su ventaja de espacio?",
    explanation: "b6 es un golpe demoledor. Si las negras comen, la columna a se abre completamente para la torre blanca. Si no comen, el peón en b6 paraliza el flanco de dama negro y prepara la entrada triunfal de las piezas blancas.",
    hints: [
      "Usa tu peón pasado para crear caos.",
      "Busca abrir líneas para tus torres.",
      "La casilla c7 es el objetivo final."
    ],
    successFeedback: "¡Brillante! b6 abre las compuertas. La parálisis negra es total.",
    failureFeedback: "Un movimiento lento permite que el negro se organice. ¡Hay que actuar con energía!",
    xp: 220
  },
  {
    id: "capa-4",
    title: "Profilaxis en el Enroque",
    fen: "r4rk1/pp1qbppp/2n1pn2/1B1p4/3P1B2/P1N1P3/1P3PPP/2RQ1RK1 w - - 0 1",
    sideToMove: "w",
    bestMove: "h3",
    principle: "Profilaxis",
    category: "Profilaxis",
    difficulty: "Intermedio",
    tags: ["seguridad", "prevencion", "aire"],
    context: "La posición es equilibrada. El blanco tiene una ligera presión en c6, pero antes de lanzarse al ataque debe asegurar su propio rey contra posibles sorpresas.",
    question: "¿Cuál es el movimiento preventivo 'clásico' para evitar temas de mate en la última fila y limitar piezas enemigas?",
    explanation: "h3 da un 'aire' al rey (Luft) y evita que piezas negras (como un alfil o caballo) salten a g4 para molestar la coordinación blanca. Es la paciencia capablanquina antes del golpe.",
    hints: [
      "Piensa en la seguridad a largo plazo del rey.",
      "Evita que el negro use la casilla g4.",
      "Un movimiento de peón pequeño puede evitar grandes dolores de cabeza."
    ],
    successFeedback: "Exacto. h3 es la marca de un maestro que no deja nada al azar.",
    failureFeedback: "Demasiada prisa puede ser peligrosa. No ignores la seguridad de tu rey.",
    xp: 120
  },
  {
    id: "capa-5",
    title: "Restricción del Alfil",
    fen: "r3rbk1/ppq2ppp/2p1bn2/4p3/2P5/1PN1P1P1/PB2QPBP/2RR2K1 w - - 0 1",
    sideToMove: "w",
    bestMove: "Nd5",
    principle: "Posicional Control",
    category: "Estrategia",
    difficulty: "Avanzado",
    tags: ["centro", "caballo dominante", "tension"],
    context: "El negro ha centralizado sus piezas y preparado ...Bg4. El blanco necesita tomar la iniciativa en el centro para no quedar pasivo.",
    question: "¿Cómo puede el blanco usar su ventaja central para crear una crisis inmediata en la posición negra?",
    explanation: "Nd5 es un movimiento temático. Si el negro captura con el peón, el blanco obtiene un peón pasado protegido devastador. Si captura con pieza, el blanco debilita la estructura negra o gana la pareja de alfiles en mejores condiciones.",
    hints: [
      "Busca una casilla central fuerte para tu caballo.",
      "Considera las consecuencias de los cambios en d5.",
      "La dama negra en c7 está en la misma línea que tu torre."
    ],
    successFeedback: "¡Espectacular! Nd5 rompe la armonía negra y obliga a decisiones difíciles.",
    failureFeedback: "Un juego pasivo solo ayuda al plan de las negras. Tienes que golpear en el centro.",
    xp: 250
  },
  {
    id: "capa-6",
    title: "Final de Reyes Activos",
    fen: "8/1p3kp1/p1p1p2p/P1P1P1PP/P4K2/8/8/8 w - - 0 1",
    sideToMove: "w",
    bestMove: "g6+",
    principle: "Finales Técnicos",
    category: "Finales",
    difficulty: "Intermedio",
    tags: ["rey", "oposicion", "bloqueo"],
    context: "La estructura de peones está casi fijada. En este final, el bando que logre infiltrar su rey primero ganará los peones débiles del otro.",
    question: "¿Cómo debe el blanco avanzar para asegurar la invasión de su rey o fijar debilidades?",
    explanation: "g6+ es fundamental. Si el negro captura, el peón h pasará pronto. Si el rey se mueve a e7 (por ejemplo), el blanco puede maniobrar para castigar la debilidad de f7 o usar su rey activo en el flanco de dama tras fijar el de rey.",
    hints: [
      "No permitas que el rey negro se active.",
      "Usa tus peones para restringir el espacio.",
      "El rey es una pieza de ataque."
    ],
    successFeedback: "¡Excelente! g6+ paraliza al negro y te da el control total del final.",
    failureFeedback: "Permitir que el negro iguale la actividad de los reyes es un error grave en finales.",
    xp: 180
  },
  {
    id: "capa-7",
    title: "Debilidad en d5",
    fen: "r1r3k1/pp1b1ppp/1qn1pn2/2pp4/2PP4/P1PBPN2/5PPP/R1BQK2R w KQ - 0 1",
    sideToMove: "w",
    bestMove: "O-O",
    principle: "Estructuras",
    category: "Estructuras",
    difficulty: "Principiante",
    tags: ["desarrollo", "seguridad", "enroque"],
    context: "La tensión en el centro es alta. El negro presiona d4 y c4. El blanco aún no tiene a su rey seguro.",
    question: "¿Cuál es la prioridad antes de decidir la estructura final del centro?",
    explanation: "Enrocarse (O-O) es la jugada más sensata. Capablanca rara vez se lanzaba a aventuras tácticas sin antes haber completado su desarrollo básico y asegurado a su monarca.",
    hints: [
      "Desarrolla antes de atacar.",
      "Pon tu rey a salvo.",
      "La tensión central puede esperar un turno."
    ],
    successFeedback: "Correcto. Desarrollo armonioso primero, estrategia compleja después.",
    failureFeedback: "Resolver el centro sin estar desarrollado es invitar al desastre. ¡Enrócate!",
    xp: 80
  },
  {
    id: "capa-8",
    title: "El ataque de minorías",
    fen: "1r3rk1/2p1bppp/p1n1p3/1pPq4/3P4/PQ2PN2/5PPP/R1B2RK1 w - - 0 1",
    sideToMove: "w",
    bestMove: "Rb1",
    principle: "Mejora de Estructura",
    category: "Estructuras",
    difficulty: "Avanzado",
    tags: ["minority attack", "debilitamiento", "planes"],
    context: "El blanco tiene una mayoría de peones en el flanco de dama pero la estructura negra es sólida. El objetivo es crear una debilidad en c6 o b5.",
    question: "¿Cómo preparar el avance b4-b5 para debilitar la cadena de peones negra?",
    explanation: "Rb1 apoya el avance b4. Es el inicio del ataque de minorías, donde el blanco usa menos peones para atacar una cadena superior, buscando crear un peón aislado o una debilidad permanente en c6.",
    hints: [
      "Prepara el avance b4.",
      "Tus torres deben apoyar el plan del flanco de dama.",
      "Identifica el peón que quieres atacar en el futuro."
    ],
    successFeedback: "¡Muy bien! Estás ejecutando un plan posicional de alto nivel: el ataque de minorías.",
    failureFeedback: "Sin apoyo, el avance b4 será ineficaz. Usa tus piezas pesadas.",
    xp: 230
  },
  {
    id: "capa-9",
    title: "La fuerza del Alfil de Casillas Blancas",
    fen: "2r2rk1/1p1qbppp/p1n1p3/3p4/2PP4/P1NBP3/1P3PPP/2RQ1RK1 w - - 0 1",
    sideToMove: "w",
    bestMove: "cxd5",
    principle: "Apertura de Líneas",
    category: "Estrategia",
    difficulty: "Principiante",
    tags: ["alfil", "diagonal", "tension"],
    context: "El blanco tiene un alfil muy fuerte en d3 apuntando al enroque. Sin embargo, el centro está cerrado y el alfil no puede expresar todo su potencial.",
    question: "¿Cómo debe el blanco resolver la tensión central para activar su pieza más peligrosa?",
    explanation: "cxd5 abre la diagonal h1-a8 y la columna c. Tras exd5, el alfil de d3 se vuelve una pieza ofensiva terrible que presiona h7 y coordina con el caballo de e5 en el futuro.",
    hints: [
      "Busca abrir la diagonal de tu alfil de d3.",
      "El cambio en d5 aclara la situación central.",
      "Considera qué pieza negra quedará bloqueada tras el cambio."
    ],
    successFeedback: "¡Excelente! Aclarar el centro es vital para que tus piezas de largo alcance dominen.",
    failureFeedback: "Mantener la tensión bloquea a tus propios alfiles. ¡Abre el juego!",
    xp: 90
  },
  {
    id: "capa-10",
    title: "Caballo vs Alfil en el Final",
    fen: "8/1b3kp1/p3p2p/1p1nPp1P/1P1P1P2/P2K4/3B4/8 w - - 0 1",
    sideToMove: "w",
    bestMove: "Bc1",
    principle: "Finales Técnicos",
    category: "Finales",
    difficulty: "Avanzado",
    tags: ["bloqueo", "maniobra", "final complejo"],
    context: "Un final bloqueado clásico. El negro tiene un caballo centralizado excelente. El blanco tiene un alfil 'malo' restringido por sus propios peones.",
    question: "¿Qué maniobra profiláctica debe hacer el blanco para evitar que el caballo negro penetre o para mejorar su alfil?",
    explanation: "Bc1 parece pasivo, pero es una jugada de espera y reubicación. El blanco debe estar listo para jugar Be3 o Bd2 dependiendo de los movimientos del negro, manteniendo el bloqueo absoluto en las casillas blancas.",
    hints: [
      "No permitas rupturas en el centro.",
      "A veces, la mejor jugada es una que mantiene el status quo mientras el rival se debilita.",
      "El alfil debe defender y esperar su momento."
    ],
    successFeedback: "¡Paciencia de campeón! Bc1 mantiene el control y no concede nada al rival.",
    failureFeedback: "Mover peones en esta posición solo crearía debilidades que el caballo negro explotaría.",
    xp: 220
  },
  {
    id: "capa-11",
    title: "La ruptura f4",
    fen: "r4rk1/pp1b1ppp/1qn1pn2/1B1p4/2PP4/P1N1PN2/5PPP/R1BQ1RK1 w - - 0 1",
    sideToMove: "w",
    bestMove: "c5",
    principle: "Ganancia de Espacio",
    category: "Estrategia",
    difficulty: "Intermedio",
    tags: ["espacio", "centro", "maniobra"],
    context: "El blanco tiene una posición sólida. Las negras están bien desarrolladas pero su dama en b6 es vulnerable.",
    question: "¿Cómo puede el blanco ganar espacio en el flanco de dama y forzar a la dama negra a una casilla peor?",
    explanation: "c5 gana espacio, ataca la dama y define la estructura. El alfil de b5 se vuelve más fuerte y el blanco prepara un posible ataque en el flanco de rey o una expansión mayor en el de dama.",
    hints: [
      "Ataca la dama negra.",
      "Gana espacio en el flanco donde tienes ventaja numérica de peones.",
      "Restringe las opciones del negro en d5."
    ],
    successFeedback: "¡Exacto! c5 es el movimiento más natural y fuerte para dominar el tablero.",
    failureFeedback: "Ser pasivo permite que el negro rompa con ...e5 en el futuro. ¡Toma el espacio!",
    xp: 140
  },
  {
    id: "capa-12",
    title: "Cambio de Piezas Menores",
    fen: "r1b2rk1/pp2ppbp/2n2np1/2pp4/2PP4/2N1PN1P/PP2BPP1/R1BQ1RK1 b - - 0 1",
    sideToMove: "b",
    bestMove: "cxd4",
    principle: "Simplificación",
    category: "Estructuras",
    difficulty: "Avanzado",
    tags: ["tension", "centro", "estructura simetrica"],
    context: "Estamos con las negras. El blanco tiene una posición muy sólida (Sistema Londres/Eslava). Hay mucha tensión en el centro d4-c5.",
    question: "¿Cómo debe el negro resolver la tensión central para evitar quedar con una posición inferior tras el desarrollo blanco?",
    explanation: "cxd4 es vital. Si el negro espera, el blanco puede jugar c5 o mantener una presión asfixiante. Al cambiar, el negro asegura una estructura más clara y prepara ...Be6 o ...Bf5 para disputar el control.",
    hints: [
      "No permitas que el blanco cierre el centro a su favor.",
      "Busca la claridad estructural.",
      "Considera qué pieza blanca capturará en d4."
    ],
    successFeedback: "¡Muy bien! Has entendido que mantener la tensión a veces favorece al bando con más espacio.",
    failureFeedback: "Ignorar la tensión central permitirá que el blanco te asfixie con c5.",
    xp: 190
  },
  {
    id: "capa-13",
    title: "El Sacrificio de Atracción",
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 1",
    sideToMove: "w",
    bestMove: "Qc2",
    principle: "Coordinación",
    category: "Estrategia",
    difficulty: "Principiante",
    tags: ["desarrollo", "presion", "dama"],
    context: "Posición clásica de la Ortodoxa. El blanco ha desarrollado sus piezas menores y ahora debe decidir dónde colocar su dama para coordinar con las torres.",
    question: "¿Cuál es la casilla más flexible para la dama blanca en esta estructura?",
    explanation: "Qc2 es la jugada estándar. Prepara la presión en la columna c y defiende e4 ante posibles rupturas. Capablanca prefería colocar sus piezas en casillas donde tuvieran influencia múltiple sin comprometerse demasiado pronto.",
    hints: [
      "Busca una casilla que conecte tus torres.",
      "La dama en c2 presiona indirectamente c7 y defiende el centro.",
      "Completa la primera fase del desarrollo."
    ],
    successFeedback: "¡Correcto! Qc2 es sólido y prepara planes profundos en el flanco de dama.",
    failureFeedback: "Lanzar ataques prematuros no es el método Capablanca. Desarrolla armoniosamente.",
    xp: 80
  },
  {
    id: "capa-14",
    title: "La debilidad de b7",
    fen: "r1b2rk1/1pq1bppp/p1n1pn2/3p4/3P4/PPNBP3/1B2NPPP/R2Q1RK1 w - - 0 1",
    sideToMove: "w",
    bestMove: "Na4",
    principle: "Actividad de Piezas",
    category: "Estrategia",
    difficulty: "Intermedio",
    tags: ["caballo", "outpost", "flanco de dama"],
    context: "El blanco ha construido una posición sólida. El caballo en c3 está parado por d4. Las negras han jugado ...a6, lo cual debilita b6 y c5.",
    question: "¿Cómo puede el blanco aprovechar esas debilidades periféricas?",
    explanation: "Na4 se encamina a c5. Es una maniobra posicional pura. El caballo en c5 será intocable y forzará a las negras a tomar decisiones dolorosas sobre su alfil de d7.",
    hints: [
      "Usa la casilla que el peón 'a' ya no defiende.",
      "El caballo busca un puesto avanzado.",
      "Prepara la presión sobre b7."
    ],
    successFeedback: "¡Excelente! Has captado la esencia del juego posicional: mejorar las piezas explotando debilidades de peones.",
    failureFeedback: "Mover piezas en el centro ahora es menos efectivo que dominar el flanco debilitado.",
    xp: 150
  },
  {
    id: "capa-15",
    title: "Final de Torres: Actividad",
    fen: "6k1/1R3ppp/p7/8/8/8/P4PPP/6K1 w - - 0 1",
    sideToMove: "w",
    bestMove: "h3",
    principle: "Profilaxis",
    category: "Finales",
    difficulty: "Principiante",
    tags: ["seguridad", "final de torres", "aire"],
    context: "Tienes una torre dominante en la séptima fila. El negro está paralizado, pero su torre en c8 amenaza con un mate en la última fila si te descuidas.",
    question: "¿Qué debe hacer el blanco antes de proceder con el ataque a los peones negros?",
    explanation: "h3 (o g3) es esencial. En los finales de torres, la seguridad del rey es lo primero. Una vez que el rey tiene aire, la torre blanca en b7 puede comerse todo el flanco de dama negro sin miedo a contraataques.",
    hints: [
      "No mueras por un mate básico mientras vas ganando.",
      "Crea una salida para tu rey.",
      "La profilaxis es el escudo del atacante."
    ],
    successFeedback: "¡Sabio! Primero la seguridad, luego la gloria. Ahora tu torre es libre para devastar al rival.",
    failureFeedback: "Ignorar el mate en la última fila es el error más común en este nivel. ¡Cuidado!",
    xp: 70
  },
  {
    id: "capa-16",
    title: "La ruptura central d5",
    fen: "rnbq1rk1/pp2bppp/4pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 1",
    sideToMove: "w",
    bestMove: "dxc5",
    principle: "Simplificación",
    category: "Estrategia",
    difficulty: "Intermedio",
    tags: ["centro", "cambio", "estructura"],
    context: "Estructura simétrica del Gambito de Dama. Ambos bandos han completado el desarrollo básico. La tensión en d4-c5 debe resolverse.",
    question: "¿Cómo debe el blanco aclarar la situación central para buscar una ligera ventaja duradera?",
    explanation: "dxc5 seguido de un posible cambio en d8 o desarrollo del alfil a c4. El blanco busca una posición donde su mejor desarrollo y control de la columna d le den una ventaja mínima pero persistente, al estilo de Capablanca.",
    hints: [
      "Aclara el centro para evitar complicaciones tácticas.",
      "Prepara el desarrollo de tu alfil de f1.",
      "Busca la simetría favorable."
    ],
    successFeedback: "¡Muy bien! Estás eligiendo el camino de la claridad y el control.",
    failureFeedback: "Dejar que el negro decida la estructura central puede ser arriesgado.",
    xp: 110
  },
  {
    id: "capa-17",
    title: "El final de Reyes: Oposición",
    fen: "8/8/8/4k1p1/6P1/4K3/8/8 w - - 0 1",
    sideToMove: "w",
    bestMove: "Kf3",
    principle: "Finales Técnicos",
    category: "Finales",
    difficulty: "Avanzado",
    tags: ["rey", "oposicion", "tablas"],
    context: "Final de peones bloqueado. El negro tiene un peón extra en g5, pero el blanco puede forzar las tablas si usa correctamente la oposición.",
    question: "¿Dónde debe colocarse el rey blanco para mantener el bloqueo y asegurar el empate?",
    explanation: "Kf3 es la única jugada que mantiene la oposición. Si el blanco juega Kd3, el rey negro penetra vía f4. Al mantenerse frente al rey rival, el blanco asegura que el negro no pueda progresar.",
    hints: [
      "Mantén la oposición frontal.",
      "No dejes que el rey negro llegue a f4.",
      "En los finales de peones, la precisión del rey es absoluta."
    ],
    successFeedback: "¡Excelente! Has dominado el concepto de oposición defensiva.",
    failureFeedback: "Perder la oposición significa perder la partida. El rey negro ha invadido.",
    xp: 220
  }
];
