import "../sass/main.scss";

import { elements } from "./variables";
import { listen } from "./base";
import { callModal } from "./modal";
import { loadForm } from "./form/loadForm";
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
  callModal(state);
});
