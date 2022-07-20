export const timeToId = (hour: string, min: string) => {
  const id = parseInt(hour) * 4 + parseInt(min) / 15;

  return { id: id.toString() };
};

export const idToTime = (id: string) => {
  const idNum = parseInt(id);
  const hour = Math.floor(idNum / 4).toString();
  const min = ((idNum % 4) * 15).toString();

  return { hour, min };
};
