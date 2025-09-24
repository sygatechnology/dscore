import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PlayerCard from './PlayerCard';
import WinnerModal from './WinnerModal';
import { Player, GameSettings } from '../types/game';
import { saveGameToHistory } from '../utils/gameHistory';

interface ScoreGameProps {
  targetScore: number;
  playerNames: string[];
  settings: GameSettings;
  onEndGame: () => void;
}

const playerColors = [
  'bg-gradient-to-br from-blue-500 to-blue-600',
  'bg-gradient-to-br from-green-500 to-green-600', 
  'bg-gradient-to-br from-purple-500 to-purple-600',
  'bg-gradient-to-br from-orange-500 to-orange-600',
  'bg-gradient-to-br from-pink-500 to-pink-600'
];

const ScoreGame: React.FC<ScoreGameProps> = ({ 
  targetScore, 
  playerNames, 
  settings,
  onEndGame 
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [winner, setWinner] = useState<Player | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  useEffect(() => {
    const initialPlayers = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      score: 0,
      history: [],
      color: playerColors[index % playerColors.length]
    }));
    setPlayers(initialPlayers);
  }, [playerNames]);

  const checkWinConditions = (_player: Player, newScore: number, pointsAdded: number): boolean => {
    // Check target score
    if (newScore >= targetScore) return true;
    
    // Check current day win condition
    if (settings.winOnCurrentDay && pointsAdded === new Date().getDate()) return true;
    
    // Check win on 1 condition
    if (settings.winOnOne && pointsAdded === 1) return true;
    
    return false;
  };

  const handleNameChange = (id: string, newName: string) => {
    setPlayers(prev => prev.map(player => 
      player.id === id ? { ...player, name: newName } : player
    ));
  };

  const handleAddPoints = (id: string, points: number) => {
    const newPoints = typeof points == 'string' ? 0 : Number(points);
    setPlayers(prev => prev.map(player => {
      if (player.id === id) {
        const newScore = player.score + newPoints;
        const updatedPlayer: Player = {
          ...player,
          score: String(points) != '-' ? newScore : Math.max(0, player.score - (player.history.length > 0 && typeof player.history[player.history.length - 1] === 'number' ? player.history[player.history.length - 1] as number : 0)),
          history: (newPoints > 0 || String(points) == 'X') ? [...player.history, points] : player.history.slice(0, -1),
        };
        if (checkWinConditions(player, newScore, points) && !winner) {
          setWinner(updatedPlayer);
          setShowWinnerModal(true);
        }
        return updatedPlayer;
      }
      return player;
    }));
  };

  const handleCloseWinnerModal = () => {
    if (winner) {
      // Save game to history
      saveGameToHistory({
        date: new Date().toLocaleDateString('fr-FR'),
        timestamp: Date.now(),
        players: players.map(p => p.id === winner.id ? winner : p),
        winner,
        targetScore,
        settings
      });
    }
    
    setShowWinnerModal(false);
    onEndGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold font-mono text-gray-800 mb-4">Syga Dômy Score Tracker</h1>
          <p className="text-gray-600">Score Objectif: {targetScore}</p>
          {settings.winOnCurrentDay && (
            <p className="text-sm text-blue-600">Victoire si score = {new Date().getDate()}</p>
          )}
          {settings.winOnOne && (
            <p className="text-sm text-green-600">Victoire si score = 1</p>
          )}
          <Button 
            onClick={onEndGame}
            variant="outline"
            className="mt-2"
          >
            Terminer la Partie
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onNameChange={handleNameChange}
              onAddPoints={handleAddPoints}
              targetScore={targetScore}
            />
          ))}
        </div>

        <WinnerModal
          isOpen={showWinnerModal}
          winnerName={winner?.name || ''}
          winnerScore={winner?.score || 0}
          targetScore={targetScore}
          onClose={handleCloseWinnerModal}
        />
      </div>
    </div>
  );
};
export default ScoreGame;