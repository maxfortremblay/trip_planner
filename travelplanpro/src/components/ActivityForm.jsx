// src/components/ActivityForm.jsx
import React, { useState } from 'react';
import { useCalendar } from '../contexts/CalendarContext';

const ActivityForm = ({ onClose }) => {
  const { selectedDay, addActivity } = useCalendar();
  const [activityData, setActivityData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addActivity(selectedDay, activityData);
    onClose();
  };

  return (
    <div className="activity-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Titre de l'activité"
            value={activityData.title}
            onChange={(e) => setActivityData(prev => ({
              ...prev,
              title: e.target.value
            }))}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Lieu"
            value={activityData.location}
            onChange={(e) => setActivityData(prev => ({
              ...prev,
              location: e.target.value
            }))}
          />
        </div>
        <div className="form-group">
          <input
            type="time"
            value={activityData.startTime}
            onChange={(e) => setActivityData(prev => ({
              ...prev,
              startTime: e.target.value
            }))}
          />
          <input
            type="time"
            value={activityData.endTime}
            onChange={(e) => setActivityData(prev => ({
              ...prev,
              endTime: e.target.value
            }))}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            value={activityData.description}
            onChange={(e) => setActivityData(prev => ({
              ...prev,
              description: e.target.value
            }))}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Ajouter</button>
          <button type="button" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;