export const debounce = (fn, delay) => {
  let timeoutID = null;
  return () => {
    clearTimeout(timeoutID);
    const args = arguments;
    const that = this;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
};
