export function getCurrentWeek(count: number) {
  const currentDay = new Date();
  const countDay = new Date(currentDay.setDate(currentDay.getDate() + 7 * count));
  const theYear = countDay.getFullYear();
  const theMonth = countDay.getMonth();
  const theDate = countDay.getDate();
  const theDayOfWeek = countDay.getDay();

  const thisWeek = [];

  for (let i = 0; i < 7; i++) {
    const resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek + 1));
    const yyyy = resultDay.getFullYear();
    let mm: number | string = Number(resultDay.getMonth()) + 1;
    let dd: number | string = resultDay.getDate();

    mm = String(mm).length === 1 ? '0' + mm : mm;
    dd = String(dd).length === 1 ? '0' + dd : dd;

    thisWeek[i] = yyyy + '-' + mm + '-' + dd;
  }

  return thisWeek;
}
