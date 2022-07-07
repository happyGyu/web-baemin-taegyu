export const $ = (selector, root = document) => {
  return root.querySelector(selector);
};

export const addOrRemoveClass = ($, className, doAdd) => {
  if (doAdd) $.classList.add(className);
  else $.classList.remove(className);
};
