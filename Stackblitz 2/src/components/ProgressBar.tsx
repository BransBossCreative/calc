import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({ 
  percentage, 
  label, 
  showPercentage = true, 
  size = 'md',
  className = '' 
}: ProgressBarProps) {
  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm font-medium text-gray-700">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${heightClasses[size]}`}>
        <div 
          className={`bg-black ${heightClasses[size]} rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}