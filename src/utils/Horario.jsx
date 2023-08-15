import React, { useState } from 'react';
import './styles/Horario.css';

const HorarioButton = ({ time, selected, onClick }) => (
  <div
    className={`time-button ${selected ? 'selected' : ''}`}
    onClick={() => onClick(time)}
  >
    {new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
  </div>
);

const Horario = ({ onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const startTime = new Date();
  startTime.setHours(8, 0, 0, 0);
  const endTime = new Date();
  endTime.setHours(19, 0, 0, 0);
  const interval = 60 * 60 * 1000; 

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  const timeButtons = [];

  for (let time = startTime; time <= endTime; time.setTime(time.getTime() + interval)) {
    timeButtons.push(
      <HorarioButton
        key={time.getTime()}
        time={time.getTime()}
        selected={selectedTime === time.getTime()}
        onClick={handleTimeClick}
      />
    );
  }

  return (
    <div className="horario-container">
      <div className="horario-title">Horario de Citas</div>
      {timeButtons}
    </div>
  );
};

export default Horario;
