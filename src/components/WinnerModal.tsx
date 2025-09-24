import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface WinnerModalProps {
  isOpen: boolean;
  winnerName: string;
  winnerScore: number;
  targetScore: number;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({
  isOpen,
  winnerName,
  winnerScore,
  targetScore,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-green-600">
            🎉 Félicitations ! 🎉
          </DialogTitle>
          <DialogDescription className="text-center space-y-4">
            <div className="text-xl font-semibold text-gray-800">
              {winnerName} a gagné !
            </div>
            <div className="text-lg">
              Score final: <span className="font-bold text-blue-600">{winnerScore}</span>
            </div>
            <div className="text-sm text-gray-600">
              Objectif: {targetScore}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold px-8 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
          >
            Nouvelle Partie
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerModal;