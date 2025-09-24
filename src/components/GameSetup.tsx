import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { GameSettings } from '../types/game';

interface GameSetupProps {
  onStartGame: (targetScore: number, playerNames: string[], settings: GameSettings) => void;
  onShowHistory: () => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onStartGame, onShowHistory }) => {
  const [targetScore, setTargetScore] = useState(60);
  const [playerCount, setPlayerCount] = useState(3);
  const [playerNames, setPlayerNames] = useState(['', '', '', '', '']);
  const [winOnCurrentDay, setWinOnCurrentDay] = useState(true);
  const [winOnOne, setWinOnOne] = useState(true);

  const handlePlayerNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    const activeNames = playerNames.slice(0, playerCount).map((name, index) => 
      name.trim() || `${index + 1}`
    );
    const settings: GameSettings = {
      targetScore,
      winOnCurrentDay,
      winOnOne
    };
    onStartGame(targetScore, activeNames, settings);
  };

  const currentDay = new Date().getDate();

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-mono text-gray-800 mb-4">Fitom-BOTO D-Score Tracker</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Configuration de Partie</h2>
        <p className="text-gray-600">Configurez les paramètres de votre partie</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Score Objectif: {targetScore}
          </label>

          <div className="flex items-center gap-4">
            {/* Slider */}
            <input
              type="range"
              min="60"
              max="120"
              step="10"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
            />

            {/* Input direct */}
            <input
              type="number"
              min="60"
              max="120"
              step="10"
              value={targetScore}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 60 && value <= 120) {
                  setTargetScore(value);
                }
              }}
              className="w-20 border border-gray-300 rounded-md p-1 text-center"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Victoire si score = jour actuel ({currentDay})
            </label>
            <Switch
              checked={winOnCurrentDay}
              onCheckedChange={setWinOnCurrentDay}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Victoire si score = 1
            </label>
            <Switch
              checked={winOnOne}
              onCheckedChange={setWinOnOne}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de Joueurs: {playerCount}
          </label>
          <div className="flex space-x-2">
            {[2, 3, 4, 5].map((count) => (
              <button
                key={count}
                onClick={() => setPlayerCount(count)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  playerCount === count
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Noms des Joueurs
          </label>
          {Array.from({ length: playerCount }).map((_, index) => (
            <input
              key={index}
              type="text"
              placeholder={`${index + 1}`}
              value={playerNames[index]}
              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleStartGame}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          Démarrer la Partie
        </button>
        <button
          onClick={onShowHistory}
          className="w-full bg-gray-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Voir l'Historique
        </button>
      </div>
    </div>
  );
};
export default GameSetup;