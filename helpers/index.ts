export function daysInCurrentWeek() {
  let dates = [];
  for (let I = 0; I < Math.abs(7); I++) {
    dates.push(
      new Date(new Date().getTime() + I * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    );
  }
  return dates;
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
      new Date(new Date().getTime() - I * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    );
  }
  return dates.splice(1).reverse();
}
