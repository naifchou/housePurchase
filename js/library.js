export const $ = (selector) => {
  const self = {
    element: document.querySelector(selector),
    html: () => self.element,
    listen: (type, callback) => {
      window.addEventListener(type, (e) => {
        if (e.target.matches(selector)) {
          callback(e);
        }
      });
    },
    numericOnly: (e) => {
      let isNumber =
        (e.keyCode <= 57 && e.keyCode >= 48) ||
        e.keyCode === 8 ||
        e.keyCode == 190 ||
        e.keyCode == 13;
      return isNumber;
    },
    validation: (btn, min, max) => {
      self.listen("keyup", (event) => {
        if (self.numericOnly(event)) {
          let number = parseInt(self.element.value.replace(/,/g, ""));
          let formattedNumber = new Intl.NumberFormat().format(number);
          self.element.value = Number.isNaN(number) ? "" : formattedNumber;
          self.toggleButton(btn);
        } else self.deleteLastKeypress();
      });
    },
    deleteLastKeypress: () => {
      self.element.value = self.element.value.substring(
        0,
        self.element.value.length - 1
      );
    },

    toggleButton: (btn) => {
      console.log(btn);
      if (self.element.value != "") {
        btn.classList.remove("disabled");
      } else if (self.element.value == "") {
        btn.classList.add("disabled");
      }
    },
  };

  return self;
};
