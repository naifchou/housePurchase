export const createPopup = async (url) => {
  const self = {
    targetElement: document.querySelector(".modal-container"),
    createModalWrapper: () => {
      const el = document.createElement("div");
      el.className = "house-modal";
      return el;
    },

    innerHtml: async () => {
      const result = await fetch(url);
      const text = await result.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      console.log(doc.body.children);
      return doc.body.children;
    },
    createPopup: async () => {
      self.targetElement.insertAdjacentElement(
        `afterend`,
        self.createModalWrapper()
      );
      const innerHtml2 = await self.innerHtml();
      document.querySelector(".house-modal").append(...innerHtml2);
      self.insertScript();
    },
    insertScript: () => {
      const script = document.createElement("script");
      script.src = require("/js/popup/modal.js");
    },
  };
  self.createPopup();
};

// fetch("/about")
//   .then(function (response) {
//     // The API call was successful!
//     return response.text();
//   })
//   .then(function (html) {
//     // Convert the HTML string into a document object
//     var parser = new DOMParser();
//     var doc = parser.parseFromString(html, "text/html");
//   })
//   .catch(function (err) {
//     // There was an error
//     console.warn("Something went wrong.", err);
//   });

// const importJS = async (js) => {
//   //   let path = `../${js}`;
//   //   let callModal = await import(`` + path);
//   let callModal = await import(`./modal.js`);
//   console.log(callModal);
//   callModal.callModal(state);
// };
