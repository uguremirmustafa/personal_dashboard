import {
  format,
  startOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  subDays,
  getWeek,
  addDays,
  startOfWeek,
  getDate,
  getDay,
} from 'date-fns';
import en_US from 'date-fns/locale/en-US';
import tr from 'date-fns/locale/tr';
import { useState } from 'react';

function Calendar(): JSX.Element {
  const [date, setDate] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const firstDayOfMonth = startOfMonth(currentMonth);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: subDays(addMonths(firstDayOfMonth, 1), 1),
  });

  const weekdays = [1, 2, 3, 4, 5, 6, 0].map((i) => tr.localize?.day(i, { width: 'abbreviated' }));
  return (
    <div className="calendar-wrapper">
      <div>
        <button onClick={prevMonth}>Previous Month</button>
        <h2>{format(currentMonth, 'MMMM yyyy', { locale: en_US })}</h2>
        <button onClick={nextMonth}>Next Month</button>
      </div>
      <div className="days-wrapper">
        {weekdays.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
        {daysInMonth.map((day, i) => (
          <div key={i} className="day">
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
