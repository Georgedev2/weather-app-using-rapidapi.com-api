export const getDate = (dt: number) => {
  const dayNumber = new Date(Number(dt) * 1000).getDay();
  switch (dayNumber) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thur';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      return dayNumber;
  }
};


export const getWeatherIconCode = (arg: string) => {
  switch (arg.toLowerCase()) {
    case 'light rain':
      return '10d';
    case 'light snow':
      return '13n';
    case 'broken clouds':
      return '04d';
    case 'overcast clouds':
      return '04n';
    case 'scattered clouds':
      return '03d';
    default:
      return '10d';
  }
};