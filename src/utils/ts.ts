export const getCurrentWeek = (count) => {
  const day = new Date();
  const countDay = new Date(day.setDate(day.getDate() + count * 7));
  console.log('첫countDay', countDay);

  let mondayStandard = countDay.getDay();

  const monday = countDay.getTime() - 86400000 * mondayStandard;

  if (mondayStandard === 0) {
    mondayStandard = 7;
  }

  countDay.setTime(monday);

  const result = [countDay.toISOString().slice(0, 10)];

  for (let i = 1; i < 7; i++) {
    countDay.setTime(countDay.getTime() + 86400000);
    result.push(countDay.toISOString().slice(0, 10));
  }

  console.log('result>>>>>>>>', result);
  console.log('countDay>>>>>>>', countDay);
  return result;
};

console.log(getCurrentWeek(0));
