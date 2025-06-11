import React, { useEffect, useState } from 'react';
import { useChecklist } from '../context/ChecklistContext';

export function CountdownTimer() {
  const { data } = useChecklist();
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0 });
  const [countdownLabel, setCountdownLabel] = useState('Set a closing date');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const { closingDate, optionPeriodEnd } = data.propertyInfo;

      if (closingDate) {
        const closingDateTime = new Date(closingDate + 'T23:59:59');
        const diff = closingDateTime.getTime() - now.getTime();

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          setTimeRemaining({ days, hours, minutes });
          setCountdownLabel('Until closing');
        } else {
          setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
          setCountdownLabel('Closing date has passed');
        }
      } else if (optionPeriodEnd) {
        const optionDateTime = new Date(optionPeriodEnd + 'T23:59:59');
        const diff = optionDateTime.getTime() - now.getTime();

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          setTimeRemaining({ days, hours, minutes });
          setCountdownLabel('Until option period ends');
        } else {
          setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
          setCountdownLabel('Option period has ended');
        }
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
        setCountdownLabel('Set a closing date');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [data.propertyInfo.closingDate, data.propertyInfo.optionPeriodEnd]);

  return (
    <div className="p-6 bg-gray-50 border-t">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-display font-semibold text-gray-800 mb-1">Time Remaining</h3>
          <p className="text-sm text-gray-500">{countdownLabel}</p>
        </div>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-black">{timeRemaining.days}</div>
            <div className="text-xs text-gray-500">Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">{timeRemaining.hours}</div>
            <div className="text-xs text-gray-500">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-black">{timeRemaining.minutes}</div>
            <div className="text-xs text-gray-500">Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
}