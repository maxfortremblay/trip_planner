import React, { useState } from "react";
import { useCalendar } from "../contexts/CalendarContext";
import ActivityForm from "./ActivityForm";

const Calendar = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    currentDate,
    selectedDay,
    activities,
    setSelectedDay,
    changeMonth,
    formatDate
  } = useCalendar();

  const getDaysInMonth = () => {
    if (!currentDate) return [];
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = [];

    const lastDay = new Date(year, month + 1, 0);
    for (let date = 1; date <= lastDay.getDate(); date++) {
      days.push(new Date(year, month, date));
    }

    return days;
  };

  if (!currentDate) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="calendar-container">
      <div className="calendar-nav">
        <button onClick={() => changeMonth(-1)}>Précédent</button>
        <h2 className="calendar-header">
          {currentDate.toLocaleDateString('fr-FR', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h2>
        <button onClick={() => changeMonth(1)}>Suivant</button>
      </div>

      {showForm && <ActivityForm onClose={() => setShowForm(false)} />}
      <div className="calendar-grid">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        
        {getDaysInMonth().map(date => {
          const formattedDate = formatDate(date);
          const isToday = formattedDate === formatDate(new Date());
          return (
            <div
              key={date.toString()}
              onClick={() => {
                setSelectedDay(formattedDate);
                setShowForm(true);
              }}
              className={`calendar-day ${isToday ? 'today' : ''} ${
                selectedDay === formattedDate ? 'selected' : ''
              }`}
            >
              <div className="date-number">{date.getDate()}</div>
              {activities[formattedDate]?.map((activity) => (
                <div key={activity.id} className="calendar-event" title={activity.description}>
                  {activity.startTime && `${activity.startTime} - `}
                  {activity.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
