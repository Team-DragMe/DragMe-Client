export const todayTime = () => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = ('0' + (today.getMonth() + 1)).slice(-2);
  const todayDate = today.getDate();
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = week[today.getDay()];

  return todayYear + todayMonth + todayDate + dayOfWeek;
};
