import React, { createContext, useContext, useState } from 'react';

const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {
  // États de base
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [activities, setActivities] = useState({});

  // Fonctions simples
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment));
  };

  const addActivity = (activity) => {
    if (!selectedDay) return;
    setActivities(prev => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), activity]
    }));
  };

  return (
    <CalendarContext.Provider value={{
      currentDate,
      selectedDay,
      activities,
      setSelectedDay,
      changeMonth,
      addActivity,
      formatDate
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

// Hook simple pour utiliser le contexte
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) throw new Error('useCalendar must be used within CalendarProvider');
  return context;
};