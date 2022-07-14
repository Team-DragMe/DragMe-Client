export const getToday = (days: number) => {
  const getDayInfo = new Date();
  const changedDate = new Date(getDayInfo.setDate(getDayInfo.getDate() + days));
  const todayYear = changedDate.getFullYear();
  const todayMonth = ('0' + (changedDate.getMonth() + 1)).slice(-2);
  const todayDate = ('0' + changedDate.getDate()).slice(-2);
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = week[changedDate.getDay()];

  return todayYear + todayMonth + todayDate + dayOfWeek;
};
