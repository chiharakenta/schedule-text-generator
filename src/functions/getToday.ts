export const getToday = () => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  return new Date(todayYear, todayMonth, todayDate);
};
