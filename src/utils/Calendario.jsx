import React, { useState } from 'react';
import './styles/Calendario.css';

function Calendario({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  const [showMonths, setShowMonths] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const today = new Date();
  
  const handlePrevMonth = () => {
    if (
      (currentMonth > 0 || currentYear > today.getFullYear()) &&
      (currentMonth !== today.getMonth() || currentYear !== today.getFullYear())
    ) {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth < 11 || currentYear < today.getFullYear() + 10) {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleYearClick = () => {
    setShowMonths(true);
  };

  const handleMonthClick = (month) => {
    setCurrentMonth(month);
    setShowMonths(false);
  };

  const handleDateClick = (day) => {
    if (
      (currentMonth > today.getMonth() || currentYear > today.getFullYear()) ||
      (currentMonth === today.getMonth() && currentYear === today.getFullYear() && day >= today.getDate())
    ) {
      setSelectedDate(new Date(currentYear, currentMonth, day));
      
      onDateSelect(new Date(currentYear, currentMonth, day));
    }
  };

  const renderDays = () => {
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={i}
          className={`calendar-day ${
            new Date(currentYear, currentMonth, i).getDay() === 0 ? 'sunday' : ''
          } ${
            selectedDate.getDate() === i && selectedDate.getMonth() === currentMonth
              ? 'curr-date'
              : ''
          }`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.unshift(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    return days;
  };

  return (
    <div className="calendario-container">
      <div className="date-header">
        {selectedDate.toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
      <div className="month-nav">
        <button
          className="nav-button-month"
          onClick={handlePrevMonth}
          disabled={
            (currentMonth === today.getMonth() && currentYear === today.getFullYear()) ||
            (currentMonth === 0 && currentYear === today.getFullYear())
          }
        >
          &lt;
        </button>
        <div className="current-month-year">
          {`${new Date(currentYear, currentMonth).toLocaleString('es-ES', {
            month: 'long',
            year: 'numeric',
          })}`}
        </div>
        <button className="nav-button-month" onClick={handleNextMonth}>
          &gt;
        </button>
      </div>
      {showMonths ? (
        <div className="year-container">
          {Array.from({ length: 12 }).map((_, index) => (
            <button
              key={index}
              className="month-button"
              onClick={() => handleMonthClick(index)}
            >
              {new Date(currentYear, index).toLocaleString('es-ES', {
                month: 'long',
              })}
            </button>
          ))}
        </div>
      ) : (
        <div className="calendar-body">
          <div className="calendar-week-day">
            <div>Dom</div>
            <div>Lun</div>
            <div>Mar</div>
            <div>Mie</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sab</div>
          </div>
          <div className="calendar-days">
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendario;
