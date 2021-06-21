import { elements } from "../variables";
import { loadTooltip } from "./loadTooltip";
import { getMonthlyPayment } from "./mortgageCalc";
import { calcStampDuty } from "./stampDuty";
import { firebaseConfig } from "../firebaseConfig";
import "regenerator-runtime/runtime";

export const loadForm = (counter) => {
  if (counter > 0) {
    for (let i = 1; i <= counter; i++) {
      let form = document.querySelector(`.form--${i}`);
      form.insertAdjacentHTML("afterbegin", elements.formMarkup);
      form.style.display = "inline-block";
      elements.add(i);
      getData(i);
    }
    if (counter <= 3) {
      let nextForm = document.querySelector(`.form--${counter + 1}`);
      nextForm.insertAdjacentHTML("afterbegin", elements.formMarkup);
      elements.callModal.textContent = `Add Purchase Scenario - ${counter + 1}`;
    } else {
      elements.callModal.style.display = "none";
    }
  } else {
    let form = document.querySelector(`.form--1`);
    form.insertAdjacentHTML("afterbegin", elements.formMarkup);
  }
};

export const loadFormExtra = (counter) => {
  const element = document.querySelector(
    `.form--${counter} .form__container--1`
  );
  const element2 = document.querySelector(`.form--${counter} .housePriceDiv`);

  element.insertAdjacentHTML("afterend", elements.markup);
  element2.insertAdjacentHTML("afterend", elements.markup2);
  elements.add(counter);
};

const getData = async (counter) => {
  const ref = firebase.database().ref(`housepurchase/` + `scenario${counter}`);
  const snapshot = await ref.once("value");
  elements[`formHousePrice${counter}`].value = snapshot.val().HousePrice;

  elements[`formDeposit${counter}`].value = snapshot.val().DepositAmount;
  elements[
    `formNewMortgageAmount${counter}`
  ].value = snapshot.val().NewMortgageAmount;
  elements[`formRate${counter}`].value = snapshot.val().NewRate;
  elements[`formTermTime${counter}`].value = snapshot.val().TermTime;
  elements[`formStampDuty${counter}`].value = snapshot.val().StampDuty;
  elements[`formTotalCash${counter}`].value = snapshot.val().TotalCash;
  elements[
    `formMonthlyMortgage${counter}`
  ].value = snapshot.val().MonthlyPayment;
  const buyingOnly = snapshot.val().BuyingOnly;

  if (buyingOnly == "false") {
    loadFormExtra(counter);

    elements.add(counter);
    elements[`formSellingPrice${counter}`].value = snapshot.val().SellingPrice;
    elements[
      `formMortgageBalance${counter}`
    ].value = snapshot.val().MortgageBalance;
    elements[`formOldRate${counter}`].value = snapshot.val().OldRate;
  }
  loadTooltip(buyingOnly, elements.tooltipMarkup, counter);
};
