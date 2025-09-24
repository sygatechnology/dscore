export interface Player {
  id: string;
  name: string;
  score: number;
  history: (number | string)[];
  color: string;
}

export interface GameSettings {
  targetScore: number;
  winOnCurrentDay: boolean;
  winOnOne: boolean;
}

export interface GameHistory {
  id: string;
  date: string;
  timestamp: number;
  players: Player[];
  winner: Player;
  targetScore: number;
  settings: GameSettings;
}

export interface GameStats {
  totalGames: number;
  playerWins: Record<string, number>;
  averageScore: number;
  highestScore: number;
  mostFrequentWinner: string;
}