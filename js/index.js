import "../sass/main.scss";

import { elements } from "./variables";
import { listen } from "./base";
import { callModal } from "./popup/modal";
import { loadForm } from "./form/loadForm";
import { popup } from "./popup/popup";

import "regenerator-runtime/runtime";

const state = {};
window.state = state;

const getCounter = async (state) => {
  const ref = firebase.database().ref(`housepurchase`);
  const snapshot = await ref.once("value");
  state.counter = snapshot.val().Counter;
  loadForm(state.counter);
};

getCounter(state);

/*Call Modal*/
listen(".call-modal", "click", () => {
  popup(`housePurchase.html`, `modal.js`);
});

/* Delete Functionality*/

listen(".icon-delete", "click", () => {});
