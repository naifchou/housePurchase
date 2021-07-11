import "../sass/main.scss";

import { elements } from "./variables";
import { listen } from "./base";
import { loadForm } from "./form/loadForm";
import { googleSignIn } from "./form/googleSignIn";
import { createPopup } from "./popup/popup";
import "regenerator-runtime/runtime";

import { deleteScenario } from "./form/firebase";

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
  createPopup("/housePurchase.html");
});

/* Delete Functionality*/

listen(".icon-delete", "click", (e) => {
  deleteScenario(e, state.counter);
});

listen(".icon-login", "click", () => {
  googleSignIn();
});
