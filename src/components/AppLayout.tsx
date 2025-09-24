import React, { useState } from 'react';
import GameSetup from './GameSetup';
import ScoreGame from './ScoreGame';
import GameHistory from './GameHistory';
import { GameSettings } from '../types/game';

type AppState = 'setup' | 'game' | 'history';

const AppLayout: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('setup');
  const [targetScore, setTargetScore] = useState(100);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    targetScore: 100,
    winOnCurrentDay: false,
    winOnOne: false
  });

  const handleStartGame = (score: number, names: string[], settings: GameSettings) => {
    setTargetScore(score);
    setPlayerNames(names);
    setGameSettings(settings);
    setAppState('game');
  };

  const handleEndGame = () => {
    setAppState('setup');
    setPlayerNames([]);
  };

  const handleShowHistory = () => {
    setAppState('history');
  };

  const handleBackToSetup = () => {
    setAppState('setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {appState === 'setup' && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <GameSetup onStartGame={handleStartGame} onShowHistory={handleShowHistory} />
        </div>
      )}
      
      {appState === 'game' && (
        <ScoreGame
          targetScore={targetScore}
          playerNames={playerNames}
          settings={gameSettings}
          onEndGame={handleEndGame}
        />
      )}
      
      {appState === 'history' && (
        <GameHistory onBack={handleBackToSetup} />
      )}
    </div>
  );
};
export default AppLayout;