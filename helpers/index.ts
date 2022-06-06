export function setCookie(name: string, value: string, days: number) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function daysInCurrentWeek() {
  let curr = new Date();
  let week = [];

  for (let i = 1; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }

  return week;
}

export function daysInNextWeek() {
  let dates = [];
  for (let I = 0; I < 14; I++) {
    dates.push(
      new Date(new Date().getTime() + I * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    );
  }
  return dates.splice(7);
}

export function daysInLastWeek() {
  let dates = [];
  for (let I = 0; I < Math.abs(8); I++) {
    dates.push(
      new Date(
        new Date().getTime() - I* 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10)
    );
  }
  return dates.splice(1).reverse();
}
