import React, { createContext, useContext, useState } from 'react';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split('T')[0]);
  const [activities, setActivities] = useState({});

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    if (!date) return '';
    try {
      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Date invalide:', date);
      return '';
    }
  };

  // Nouvelle fonction pour ajouter une activité
  const addActivity = (date, activity) => {
    setActivities(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), {
        id: Date.now(), // ID unique
        ...activity,
        date
      }]
    }));
  };

  // Nouvelle fonction pour supprimer une activité
  const removeActivity = (date, activityId) => {
    setActivities(prev => ({
      ...prev,
      [date]: prev[date].filter(activity => activity.id !== activityId)
    }));
  };

  const value = {
    currentDate,
    selectedDay,
    activities,
    setSelectedDay,
    changeMonth,
    formatDate,
    addActivity,
    removeActivity
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar doit être utilisé dans un CalendarProvider');
  }
  return context;
};
