export const getCurrentWeek = (count: number) => {
  const day = new Date();
  const countDay = new Date(day.setDate(day.getDate() + 7 * count));
  const sunday = countDay.getTime() - 86400000 * countDay.getDay();

  countDay.setTime(sunday);

  const result = [countDay.toISOString().slice(0, 10)];

  for (let i = 1; i < 7; i++) {
    countDay.setTime(countDay.getTime() + 86400000);
    result.push(countDay.toISOString().slice(0, 10));
  }

  return result;
};

console.log(getCurrentWeek(1));
