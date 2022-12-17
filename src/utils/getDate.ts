export const getTodayDate = (days: number) => {
  const date = getDateInfo(days);
  return date.year + '-' + date.month + '-' + date.day + '-' + getDayWeek();
};

//TODO : 날짜 계산 함수 리팩토링
const getDateInfo = (dayCount = 0) => {
  const date = new Date(new Date().setDate(new Date().getDate() + dayCount));
  const Object = {
    year: date.getFullYear(),
    month: ('0' + (date.getMonth() + 1)).slice(-2),
    day: ('0' + date.getDate()).slice(-2),
  };

  return Object;
};

const getDayWeek = () => {
  const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return WEEK[new Date().getDay()];
};

export const makeDateString = (countDays: number) => {
  const Date = getDateInfo(countDays);
  return Date.year + '-' + Date.month + '-' + Date.day + '-' + getDayWeek();
};

export const DayStorage = (days: string, count: number) => {
  const getDayInfo = new Date(days);
  const changedDate = new Date(getDayInfo.setDate(getDayInfo.getDate() + count));
  const year = changedDate.getFullYear();
  const month = ('0' + (changedDate.getMonth() + 1)).slice(-2);
  const day = ('0' + changedDate.getDate()).slice(-2);
  const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayOfWeek = week[changedDate.getDay()];
  const dateString = year + '-' + month + '-' + day + '-' + dayOfWeek;
  return dateString;
};
