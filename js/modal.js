import { validation } from "./validation";
import { calcFormValues, toggleForm } from "../js/form";
import { elements } from "./variables";
import { listen } from "./base";

export const callModal = (state) => {
  //1. Hide Q1 in Modal to start series of next quesitons (controlled from within scss) and toggle form

  listen(".q1BtnBuying", "click", () => {
    state.buyingOnly = true;
    toggleForm(state.buyingOnly, state.counter + 1);
  });
  listen(".q1BtnBuyingSelling", "click", () => {
    state.buyingOnly = false;
    toggleForm(state.buyingOnly, state.counter + 1);
  });

  //

  listen("#rateNotFixedBtn", "click", () => {
    state.rateFixed = false;
    elements.formOldRateDiv.parentNode.removeChild(elements.formOldRateDiv);
    elements.modalOldRateQ.parentNode.removeChild(elements.modalOldRateQ);
    elements.modalMortgageBalanceBtn.setAttribute("href", "#rateQ");
  });
  listen("#rateFixedBtn", "click", () => {
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

  //3. Validation (takes selector, type - number or float, and button to toggle)

  validation(".housePrice", "number", elements.modalHousePriceBtn, {
    min: 2000,
    max: 99000000,
  });
  validation(".deposit", "number", elements.modalDepositBtn, {
    min: 2000,
    max: 99000000,
  });
  validation(".sellingPrice", "number", elements.modalSellingPriceBtn, {
    min: 2000,
    max: 99000000,
  });
  validation(".mortgageBalance", "number", elements.modalMortgageBalanceBtn, {
    min: 2000,
    max: 99000000,
  });

  //4. rate Validation
  validation(".rate", "float", elements.modalRateBtn, {
    min: 0.2,
    max: 4,
  });
  validation(".oldRate", "float", elements.modalOldRateBtn, {
    min: 0.2,
    max: 4,
  });

  //5. term time validation
  validation(".termTime", "number", elements.modalSubmit, {
    min: 10,
    max: 40,
  });

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
  });
};