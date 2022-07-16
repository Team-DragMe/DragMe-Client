export const getTodayDate = (days: number) => {
  const getDayInfo = new Date();
  const changedDate = new Date(getDayInfo.setDate(getDayInfo.getDate() + days));
  const year = changedDate.getFullYear();
  const month = ('0' + (changedDate.getMonth() + 1)).slice(-2);
  const day = ('0' + changedDate.getDate()).slice(-2);
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = week[changedDate.getDay()];
  const dateString = year + '-' + month + '-' + day;
  const DayData = { dateString, dayOfWeek };

  return DayData;
};
