import React, { useState } from 'react';
import Calendar from './components/Calendar';
import getCalendarMonth from './functions/getCalendarMonth';

const App: React.FC = () => {
  const currentMonth = getCalendarMonth(new Date());
  const [calendar, setCalendar] = useState(currentMonth);

  return (
    <div className="App">
      <Calendar calendar={calendar} />
    </div>
  );
};

export default App;
