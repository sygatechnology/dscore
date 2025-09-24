import { GameHistory, GameStats, Player } from '../types/game';

const STORAGE_KEY = 'score-game-history';

export const saveGameToHistory = (gameData: Omit<GameHistory, 'id'>) => {
  const history = getGameHistory();
  const newGame: GameHistory = {
    ...gameData,
    id: Date.now().toString(),
  };
  
  history.push(newGame);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getGameHistory = (): GameHistory[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const clearGameHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getGameStats = (): GameStats => {
  const history = getGameHistory();
  
  if (history.length === 0) {
    return {
      totalGames: 0,
      playerWins: {},
      averageScore: 0,
      highestScore: 0,
      mostFrequentWinner: '',
    };
  }

  const playerWins: Record<string, number> = {};
  let totalScore = 0;
  let highestScore = 0;

  history.forEach(game => {
    const winnerName = game.winner.name;
    playerWins[winnerName] = (playerWins[winnerName] || 0) + 1;
    
    game.players.forEach(player => {
      totalScore += player.score;
      if (player.score > highestScore) {
        highestScore = player.score;
      }
    });
  });

  const mostFrequentWinner = Object.entries(playerWins)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

  return {
    totalGames: history.length,
    playerWins,
    averageScore: Math.round(totalScore / (history.length * history[0]?.players.length || 1)),
    highestScore,
    mostFrequentWinner,
  };
};