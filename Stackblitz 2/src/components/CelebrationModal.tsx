import React from 'react';
import { X } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function CelebrationModal({ isOpen, onClose, title, message }: CelebrationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-center animate-celebrate">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-display font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}