export const getCurrentWeek = (count: number) => {
  const today = new Date();
  const countDay = new Date(today.setDate(today.getDate() + 7 * count + 5));
  let mondayStandard = countDay.getDay() - 1;
  const year = countDay.getFullYear();
  const month = ('0' + (countDay.getMonth() + 1)).slice(-2);

  if (mondayStandard === -1) {
    mondayStandard = 6;
  }

  const monday = countDay.getTime() - 86400000 * mondayStandard;

  countDay.setTime(monday);

  const result = [year + '-' + month + '-' + countDay.toString().slice(8, 10)];

  for (let i = 1; i < 7; i++) {
    countDay.setTime(countDay.getTime() + 86400000);
    result.push(year + '-' + month + '-' + countDay.toString().slice(8, 10));
  }
  return result;
};
