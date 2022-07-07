export const debounce = (callback, time) => {
  let debounceID;
  return (...args) => {
    if (debounceID) {
      clearTimeout(debounceID);
    }
    debounceID = setTimeout(() => callback(...args), time);
  };
};
