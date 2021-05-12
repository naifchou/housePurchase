function $(selector) {
  const self = {
    element: document.querySelector(selector),
    html: () => self.element,
  };

  return self;
}

console.log($("h1").html());
