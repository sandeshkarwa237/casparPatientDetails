const debounce = (callback, limit) => {
  let timer;
  return (...args) => {
    let context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback.apply(context, args);
    }, limit);
  };
};

export { debounce };
