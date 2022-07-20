export const getTimeArray = () => {
  const timeArr = [];

  for (let i = 0; i < 96; i++) {
    timeArr.push(i);
  }

  return { timeArr };
};

const lastDayArray = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const parseToValidMonth = (nextYear: number, nextMonth: number) => {
  if (nextMonth < 1) {
    return { year: nextYear - 1, month: 12 };
  }
  if (nextMonth > 12) {
    return { year: nextYear + 1, month: 1 };
  }

  return { year: nextYear, month: nextMonth };
};

export const checkIsLeapYear = () => new Date(new Date().getFullYear(), 1, 29).getDate() === 29;

export const getLastDayOfMonth = (currentMonth: number) => {
  if (currentMonth === 2) return checkIsLeapYear() ? 29 : 28;
  return lastDayArray[currentMonth - 1];
};
