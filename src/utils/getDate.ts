export const getTodayDate = (countDate = 0) => {
  const { year, month, day } = getDateInfo(countDate);
  return year + '-' + month + '-' + day + '-' + getDayWeek(countDate);
};

export const makeDateString = (countDate = 0) => {
  const { year, month, day } = getDateInfo(countDate);
  return year + '-' + month + '-' + day + '-' + getDayWeek(countDate);
};

const getDateInfo = (countDate = 0) => {
  const date = new Date(new Date().setDate(new Date().getDate() + countDate));
  const Object = {
    year: date.getFullYear(),
    month: ('0' + (date.getMonth() + 1)).slice(-2),
    day: ('0' + date.getDate()).slice(-2),
  };

  return Object;
};

const getDayWeek = (countDate = 0) => {
  const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return WEEK[new Date(new Date().setDate(new Date().getDate() + countDate)).getDay()];
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
