export const todayTime = () => {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();

  return todayYear + '0' + todayMonth + todayDate;
};
