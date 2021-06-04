import "../sass/main.scss";

import { elements } from "./variables";
import { listen } from "./base";
import { callModal } from "./modal";
import { loadForm } from "./form";
import "regenerator-runtime/runtime";

const state = {};
window.state = state;

const getCounter = async (state) => {
  const ref = firebase.database().ref(`housepurchase`);
  const snapshot = await ref.once("value");
  state.counter = snapshot.val().Counter;
  loadForm(state.counter);
  callModal(state);
};

getCounter(state);

/*Call Modal*/
listen(".call-modal", "click", () => {
  elements.callModal.style.display = "none";
  elements.theModal.style.display = "inline-block";
  elements.modalQuestion1.style.display = "inline-block";
});
