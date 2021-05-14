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
          self.checkRange(btn, number, min, max, event);
          let formattedNumber = new Intl.NumberFormat().format(number);
          self.element.value = Number.isNaN(number) ? "" : formattedNumber;
        } else if (!self.numericOnly(event)) {
          self.deleteLastKeypress();
        }
      });
    },

    checkRange: (btn, number, min, max, event) => {
      console.log(number);
      if (number <= max && number >= min) {
        self.toggleButton(btn, true);
        self.hittingEnter(btn, event, true);
      } else {
        self.toggleButton(btn, false);
        self.hittingEnter(btn, event, false);
      }
    },
    validationFloat: (btn, min, max) => {
      self.listen("keyup", (event) => {
        if (self.numericOnly(event)) {
          self.checkRange(btn, self.element.value, min, max, event);
          parseFloat(self.element.value);
        }
      });
    },

    deleteLastKeypress: () => {
      console.log("it's me");
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

    hittingEnter: (btn, e, x) => {
      if (e.keyCode == 13 && x) {
        btn.click();
      }
    },
  };

  return self;
};
