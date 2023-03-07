export const formatDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return '';
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

export const timeSince = (time) => {
  // Convert input time to a timestamp in milliseconds
  let timestamp;
  switch (typeof time) {
    case 'number':
      timestamp = time;
      break;
    case 'string':
      timestamp = Number(new Date(time));
      break;
    case 'object':
      if (time.constructor === Date) {
        timestamp = time.getTime();
      } else {
        // If input is an object but not a Date object, return an empty string
        return '';
      }
      break;
    default:
      timestamp = Number(new Date());
  }

  // Calculate the number of seconds that have passed since the input time
  const seconds = (Number(new Date()) - timestamp) / 1000;

  // Return the appropriate string based on the number of seconds that have passed
  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)} minutes ago`;
  } else if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)} hours ago`;
  } else if (seconds < 604800) {
    return `${Math.floor(seconds / 86400)} days ago`;
  }
  return `${Math.floor(seconds / 604800)} weeks ago`;
};

export const isToday = (date, now = new Date()) => {
  // add validation for date

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};
