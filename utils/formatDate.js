/* eslint-disable no-param-reassign */
export const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  // eslint-disable-next-line no-undefined
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const timeSince = (time) => {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = Number(new Date(time));
      break;
    case 'object':
      if (time.constructor === Date) {
        time = time.getTime();
      }
      break;
    default:
      time = Number(new Date());
  }
  const timeFormats = [
    [60, 'seconds', 1],
    [120, '1 minute ago', '1 minute from now'],
    [3600, 'minutes', 60],
    [7200, '1 hour ago', '1 hour from now'],
    [86400, 'hours', 3600],
    [172800, 'Yesterday', 'Tomorrow'],
    [604800, 'days', 86400],
    [1209600, 'Last week', 'Next week'],
    [2419200, 'weeks', 604800],
    [4838400, 'Last month', 'Next month'],
    [29030400, 'months', 2419200],
    [58060800, 'Last year', 'Next year'],
    [2903040000, 'years', 29030400],
    [5806080000, 'Last century', 'Next century'],
    [58060800000, 'centuries', 2903040000],
  ];
  let seconds = (Number(new Date()) - time) / 1000;
  let token = 'ago';
  let listChoice = 1;

  if (seconds === 0) {
    return 'Just now';
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    listChoice = 2;
  }
  let format = null;
  let idx = 0;

  while ((format = timeFormats[(idx += 1)])) {
    if (seconds < format[0]) {
      if (typeof format[2] === 'string') {
        return format[listChoice];
      }

      return `${Math.floor(seconds / format[2])} ${format[1]} ${token}`;
    }
  }

  return time;
};

export const isToday = (date, now) => {
  const yearDate = date.getYear();
  const monthDate = date.getMonth();
  const dayDate = date.getDate();
  const yearNow = now.getYear();
  const monthNow = now.getMonth();
  const dayNow = now.getDate();

  if (yearDate === yearNow && monthDate === monthNow && dayDate === dayNow) {
    return true;
  }

  return false;
};
