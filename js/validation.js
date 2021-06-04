export const validation = (selector, type, btn, range) => {
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
    number: (btn, min, max) => {
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
      if (number <= max && number >= min) {
        self.toggleButton(btn, true);
        self.hittingEnter(btn, event, true);
        self.element.style.borderBottom = "5px solid #3cc9a6";
      } else {
        self.toggleButton(btn, false);
        self.hittingEnter(btn, event, false);
        self.element.style.borderBottom = "5px solid red";
      }
    },
    float: (btn, min, max) => {
      self.listen("keyup", (event) => {
        if (self.numericOnly(event)) {
          self.checkRange(btn, self.element.value, min, max, event);
          parseFloat(self.element.value);
        }
      });
    },

    deleteLastKeypress: () => {
      self.element.value = self.element.value.substring(
        0,
        self.element.value.length - 1
      );
    },

    toggleButton: (btn, x) => {
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

  if (type == "number") {
    self.number(btn, range.min, range.max);
  } else if (type == "float") {
    self.float(btn, range.min, range.max);
  }

  return self;
};
