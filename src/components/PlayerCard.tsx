import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Player } from '../types/game';

interface PlayerCardProps {
  player: Player;
  onNameChange: (id: string, newName: string) => void;
  onAddPoints: (id: string, points: number | string) => void;
  targetScore: number;
  isCurrentTurn: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  onNameChange,
  onAddPoints,
  targetScore,
  isCurrentTurn
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(player.name);
  const [pointsToAdd, setPointsToAdd] = useState('');

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      onNameChange(player.id, tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleAddPoints = () => {
    const points = parseInt(pointsToAdd);
    if (!isNaN(points) && points > 0) {
      onAddPoints(player.id, points);
      setPointsToAdd('');
    }
  };

  const handleEditLastPoints = () => {
    const last = player.history[player.history.length - 1];
    if(typeof last === 'number') {
      onAddPoints(player.id, -last);
      setPointsToAdd(String(last));
    }
  };

  const progressPercentage = Math.min((player.score / targetScore) * 100, 100);

  return (
    <div className={`${player.color} rounded-2xl p-6 text-white shadow-lg transform transition-all hover:scale-105`}>
      {isCurrentTurn && (
        <div className="absolute top-2 right-2">
          <Button size="sm" variant="secondary" className="bg-white text-black font-bold">
            Main
          </Button>
        </div>
      )}
      <div className="space-y-4">
        {/* Player Name */}
        <div className="text-center">
          {isEditingName ? (
            <div className="space-y-2">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                className="text-center text-gray-800 font-bold"
                autoFocus
              />
              <div className="flex space-x-2">
                <Button
                  onClick={handleNameSubmit}
                  size="sm"
                  variant="secondary"
                  className="flex-1"
                >
                  ✓
                </Button>
                <Button
                  onClick={() => {
                    setIsEditingName(false);
                    setTempName(player.name);
                  }}
                  size="sm"
                  variant="secondary"
                  className="flex-1"
                >
                  ✗
                </Button>
              </div>
            </div>
          ) : (
            <h3
              className="text-xl font-bold cursor-pointer hover:underline"
              onClick={() => setIsEditingName(true)}
            >
              {player.name}
            </h3>
          )}
        </div>

        {/* Score Display */}
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{player.score}</div>
          <div className="text-sm opacity-80">/ {targetScore}</div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress
            value={progressPercentage}
            className="h-3 bg-white/20"
          />
          <div className="text-xs text-center opacity-80">
            {Math.round(progressPercentage)}% complété
          </div>
        </div>

        {/* Add Points Section */}
        <div className="space-y-3">
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Points"
              value={pointsToAdd}
              onChange={(e) => setPointsToAdd(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddPoints()}
              className="text-gray-800 text-center font-bold"
              min="1"
            />
            <Button
              onClick={handleAddPoints}
              variant="secondary"
              className='py-2 px-2'
              disabled={!pointsToAdd || parseInt(pointsToAdd) <= 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Button>
            <Button
              onClick={handleEditLastPoints}
              variant="secondary"
              className='py-2 px-2'
              disabled={!player.history || player.history.length == 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </Button>
          </div>

          {/* Quick Add Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {[
              1,
              5,
              '-',
              'X'
            ].map((points) => (
              <Button
                key={points}
                onClick={() => onAddPoints(player.id, points)}
                variant="secondary"
                size="sm"
                className="font-bold"
              >
                {typeof points !== 'number' ? points : '+'+points}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="mt-2 text-sm text-white-600">
            Historique: {player.history.join(" - ")}
          </div>
        </div>



      </div>
    </div>
  );
};

export default PlayerCard;