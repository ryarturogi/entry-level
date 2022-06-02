export const debounce = (fn, delay) => {
  let timeoutID = null;

  return () => {
    clearTimeout(timeoutID);
    // eslint-disable-next-line no-undef
    const args = arguments;
    // eslint-disable-next-line no-invalid-this
    const that = this;

    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
};
