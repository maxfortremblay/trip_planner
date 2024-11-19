import React from 'react';
import { useCalendar } from './CalendarContext';

const Calendar = () => {
  const { 
    currentDate, 
    selectedDay, 
    activities,
    setSelectedDay, 
    changeMonth,
    formatDate 
  } = useCalendar();

  // Obtenir les jours du mois actuel
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Ajouter les jours du mois
    for (let date = 1; date <= lastDay.getDate(); date++) {
      days.push(new Date(year, month, date));
    }

    return days;
  };

  return (
    <div className="p-4">
      {/* Navigation simple */}
      <div className="flex justify-between mb-4">
        <button onClick={() => changeMonth(-1)}>Précédent</button>
        <h2>
          {currentDate.toLocaleDateString('fr-FR', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h2>
        <button onClick={() => changeMonth(1)}>Suivant</button>
      </div>

      {/* Grille simple */}
      <div className="grid grid-cols-7 gap-2">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="text-center py-2">
            {day}
          </div>
        ))}
        
        {getDaysInMonth().map(date => (
          <div
            key={date.toString()}
            onClick={() => setSelectedDay(formatDate(date))}
            className={`
              p-2 border rounded cursor-pointer
              ${selectedDay === formatDate(date) ? 'bg-blue-100' : ''}
            `}
          >
            <div>{date.getDate()}</div>
            {activities[formatDate(date)]?.map((activity, idx) => (
              <div key={idx} className="text-xs mt-1 bg-gray-100 p-1 rounded">
                {activity.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;