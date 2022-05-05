const getCalendarTimes = () => {
  const times = [];
  for (let i = 1; i <= 24; i++) {
    times.push({
      time: i,
      active: false
    });
  }
  return times;
};

export default getCalendarTimes;
