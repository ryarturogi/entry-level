export const debounce = (fn, delay) => {
  let timeoutId = null;
  let lastCallTime = 0;

  return function () {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastCallTime;

    // If this is the first call or the delay has elapsed, call the function
    if (lastCallTime === 0 || elapsedTime >= delay) {
      fn.apply(this, arguments);
      lastCallTime = currentTime;
    } else {
      // If the delay has not elapsed, cancel the previous debounce and set a new one
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, arguments);
        lastCallTime = Date.now();
      }, delay - elapsedTime);
    }
  };
};
