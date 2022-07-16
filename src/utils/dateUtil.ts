export const getTimeArray = () => {
  const timeArr = [];

  for (let i = 0; i < 96; i++) {
    const time = { hour: Math.floor(i / 4), min: (i % 4) * 15 };

    timeArr.push(time);
  }

  return { timeArr };
};

const lastDayArray = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const parseToValidMonth = (nextMonth: number) => {
  if (nextMonth < 1) return 12;
  if (nextMonth > 12) return 1;

  return nextMonth;
};

export const checkIsLeapYear = () => new Date(new Date().getFullYear(), 1, 29).getDate() === 29;

export const getLastDayOfMonth = (currentMonth: number) => {
  if (currentMonth === 2) return checkIsLeapYear() ? 29 : 28;
  return lastDayArray[currentMonth - 1];
};
