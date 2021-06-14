import { validation } from "./validation";
import { calcFormValues } from "./form/calculationsForm";
import { toggleForm, toggleForm2 } from "./form/toggleForm";
import { elements } from "./variables";
import { listen } from "./base";
import { formValues } from "./form/formVariables";

export const callModal = (state) => {
  elements.callModal.style.display = "none";
  elements.theModal.style.display = "inline-block";
  elements.modalQuestion1.style.display = "inline-block";
  //1. Hide Q1 in Modal to start series of next quesitons (controlled from within scss) and toggle form

  listen(".q1-Btn-Buying", "click", () => {
    state.buyingOnly = true;
    toggleForm(state.buyingOnly, state.counter + 1);
  });

  listen(".q1-Btn-Buying-Selling", "click", () => {
    state.buyingOnly = false;
    toggleForm(state.buyingOnly, state.counter + 1);
  });

  //

  listen("#rate-not-fixed-btn", "click", () => {
    toggleForm2(false, state.counter + 1);
  });
  listen("#rate-fixed-btn", "click", () => {
    state.rateFixed = true;
  });

  //2. Setting the cursor ready inside input

  window.addEventListener("hashchange", () => {
    let hashString = window.location.hash;
    let currentInput = document.querySelector(`${hashString} input`);
    if (currentInput != null) {
      currentInput.focus();
    }
  });

  //3. Validation

  validation(JSON.parse(elements.validationObject));

  //6. Toggle submit enable/disable
  listen(".termTime", "keyup", () => {
    if (elements.modalSubmit.classList.contains("disabled")) {
      elements.modalSubmit.disabled = true;
    } else {
      elements.modalSubmit.disabled = false;
    }
  });

  //7. Extract user inputs, calculate relevant fields and display

  elements.modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let nextForm = document.querySelector(`.form--${state.counter + 1}`);
    nextForm.style.display = "inline-block";
    elements.theModal.style.display = "none";
    elements.callModal.style.display = "inline-block";
    state.counter = state.counter + 1;
    calcFormValues(state, state.counter);
    formValues.add(state);
  });
};
