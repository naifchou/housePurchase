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
          self.checkRange(btn, number, min, max);
          let formattedNumber = new Intl.NumberFormat().format(number);
          self.element.value = Number.isNaN(number) ? "" : formattedNumber;
        } else if (!self.numericOnly(event)) {
          self.deleteLastKeypress();
        }
      });
    },

    checkRange: (btn, number, min, max) => {
      console.log(number);
      if (number <= max && number >= min) {
        self.toggleButton(btn, true);
      } else self.toggleButton(btn, false);
    },
    // validationFloat: (btn, min, max) => {
    //   self.listen("keyup", event, () => {
    //     if (
    //       self.numericOnly(event) &&
    //       self.element.value <= max &&
    //       self.element.value >= min
    //     ) {
    //     }
    //   });
    // },

    deleteLastKeypress: () => {
      self.element.value = self.element.value.substring(
        0,
        self.element.value.length - 1
      );
    },

    toggleButton: (btn, x) => {
      console.log(x);

      if (self.element.value != "" && x) {
        btn.classList.remove("disabled");
      } else {
        btn.classList.add("disabled");
      }
    },
  };

  return self;
};
