import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Calendar from './components/Calendar';
import getCalendarMonth from './functions/getCalendarMonth';

const App: React.FC = () => {
  const currentMonth = getCalendarMonth(new Date());
  const [calendar, setCalendar] = useState(currentMonth);

  const getPrevCalendar: React.MouseEventHandler<HTMLButtonElement> = () => {
    const prevMonthFirstDate = new Date(calendar.year, calendar.month - 1, 1);
    const prevCalendar = getCalendarMonth(prevMonthFirstDate);
    setCalendar(prevCalendar);
  };

  const getNextCalendar: React.MouseEventHandler<HTMLButtonElement> = () => {
    const nextMonthFirstDate = new Date(calendar.year, calendar.month + 1, 1);
    const nextCalendar = getCalendarMonth(nextMonthFirstDate);
    setCalendar(nextCalendar);
  };

  return (
    <div className="App">
      <Calendar calendar={calendar} getPrevCalendar={getPrevCalendar} getNextCalendar={getNextCalendar} />
    </div>
  );
};

export default App;
