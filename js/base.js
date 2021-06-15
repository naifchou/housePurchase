import "regenerator-runtime/runtime";
import { loadForm } from "./form";
import { elements } from "./variables";

export const listen = (selector, type, callback) => {
  const self = {
    element: document.querySelector(selector),
    html: () => self.element,
    listenFn: (type, callback) => {
      window.addEventListener(type, (e) => {
        if (e.target.matches(selector)) {
          callback(e);
        }
      });
    },
  };

  self.listenFn(type, callback);
};
