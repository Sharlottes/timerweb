const parseDate = (date: string) => {
  return new Date(+date.slice(0, 4), +date.slice(4, 6) - 1, +date.slice(6, 8), +date.slice(9, 11), +date.slice(11, 13), +date.slice(13, 15))
}

type timeType = 'day' | 'hour' | 'minute' | 'second' | 'milisecond';
const cal: Record<timeType, (n: number, all: boolean) => number> = {
  day: n => n / 1000 / 60 / 60 / 24,
  hour: (n, a) => n / 1000 / 60 / 60 % (a ? Infinity : 24),
  minute: (n, a) => n / 1000 / 60 % (a ? Infinity : 60),
  second: (n, a) => n / 1000 % (a ? Infinity : 60),
  milisecond: (n, a) => n % (a ? Infinity : 1000),
}

export const getRemainingTime = (date: string, type: timeType, all = false) => {
  const currentDate = new Date();
  const time = new Date(parseDate(date).getTime() - currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000).getTime() - currentDate.getTimezoneOffset() * 60 * 1000;

  return Math.max(Math.floor(cal[type](time, all)), 0);
}
