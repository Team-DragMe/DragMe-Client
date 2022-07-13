export const getTimeArray = () => {
  const timeArr = [];

  for (let i = 0; i < 96; i++) {
    const time = { hour: ` ${Math.floor(i / 4)}`, min: `${(i % 4) * 15}` };

    timeArr.push(time);
  }

  return { timeArr };
};
