import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getGameHistory, clearGameHistory, getGameStats } from '../utils/gameHistory';
import { GameHistory as GameHistoryType } from '../types/game';

interface GameHistoryProps {
  onBack: () => void;
}

const GameHistory: React.FC<GameHistoryProps> = ({ onBack }) => {
  const [history, setHistory] = React.useState<GameHistoryType[]>([]);
  const [stats, setStats] = React.useState(getGameStats());

  React.useEffect(() => {
    setHistory(getGameHistory());
    setStats(getGameStats());
  }, []);

  const handleClearHistory = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer tout l\'historique ?')) {
      clearGameHistory();
      setHistory([]);
      setStats(getGameStats());
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Historique des Parties</h1>
          <div className="space-x-2">
            <Button onClick={handleClearHistory} variant="destructive">
              Effacer l'historique
            </Button>
            <Button onClick={onBack} variant="outline">
              Retour
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGames}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Score Moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Score Max</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.highestScore}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Champion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600">{stats.mostFrequentWinner || 'Aucun'}</div>
            </CardContent>
          </Card>
        </div>

        {/* Game History */}
        <div className="space-y-4">
          {history.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">Aucune partie enregistrée</p>
              </CardContent>
            </Card>
          ) : (
            history.map((game) => (
              <Card key={game.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Partie du {formatDate(game.timestamp)}
                    </CardTitle>
                    <Badge variant="secondary">
                      Objectif: {game.targetScore}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-green-600">Gagnant:</span>
                      <Badge variant="default">{game.winner.name}</Badge>
                      <span className="text-sm text-gray-600">({game.winner.score} points)</span>
                    </div>
                    <div>
                      <span className="font-semibold mb-2 block">Scores finaux:</span>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                        {game.players.map((player) => (
                          <div key={player.id} className="bg-gray-100 rounded-lg p-2 text-center">
                            <div className="font-medium">{player.name}</div>
                            <div className="text-lg font-bold">{player.score}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameHistory;