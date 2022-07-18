export const getTimeArray = () => {
  const timeArr = [];

  for (let i = 0; i < 96; i++) {
    timeArr.push(i);
  }

  return { timeArr };
};
