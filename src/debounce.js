const debounce = (fn, delay) => {
  let timer = null;

  return () => {
    clearImmediate(timer);

    timer = setImmediate(fn, delay);
  };
};

export { debounce };
