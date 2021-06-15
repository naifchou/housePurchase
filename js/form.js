import { elements } from "./variables";
import { getMonthlyPayment } from "../js/mortgageCalc";
import { calcStampDuty } from "../js/stampDuty";
import { firebaseConfig } from "./firebaseConfig";
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

const loadFormExtra = (counter) => {
  const element = document.querySelector(
    `.form--${counter} .form__container--1`
  );
  const element2 = document.querySelector(`.form--${counter} .housePriceDiv`);

  element.insertAdjacentHTML("afterend", elements.markup);
  element2.insertAdjacentHTML("afterend", elements.markup2);
  elements.add(counter);
};

export const toggleForm = (onlyBuying, counter) => {
  if (!onlyBuying) {
    elements.modalDepositBtn.setAttribute("href", "#fixedOrNotQ");
    elements.add(counter);
    loadFormExtra(counter);
  } else {
    elements.modalDepositBtn.setAttribute("href", "#rateQ");
  }
  elements.modalQuestion1.style.display = "none";
};

export const calcFormValues = (state, counter) => {
  let housePrice = parseInt(elements.modalHousePrice.value.replace(/,/g, ""));
  let deposit = parseInt(elements.modalDeposit.value.replace(/,/g, ""));
  let rate = elements.modalRate.value;
  let monthlyRate = rate / 100 / 12;
  let termTime = elements.modalTermTime.value;
  let numberOfPayments = termTime * 12;
  let sellingPrice, newMortgageAmount, oldMonthlyRate, oldRate, mortgageBalance;

  if (!state.buyingOnly) {
    sellingPrice = parseInt(elements.modalSellingPrice.value.replace(/,/g, ""));
    console.log(sellingPrice);
    if (state.rateFixed) {
      oldRate = elements.modalOldRate.value;
    } else oldRate = rate;
    oldMonthlyRate = oldRate / 100 / 12;
    mortgageBalance = parseInt(
      elements.modalMortgageBalance.value.replace(/,/g, "")
    );
    newMortgageAmount = housePrice - (sellingPrice + deposit);
  } else {
    newMortgageAmount = housePrice - deposit;
  }

  //Display values in form

  elements[`formHousePrice${counter}`].value = elements.modalHousePrice.value;
  elements[`formDeposit${counter}`].value = elements.modalDeposit.value;

  elements[`formRate${counter}`].value = elements.modalRate.value;
  elements[`formTermTime${counter}`].value = elements.modalTermTime.value;
  elements[
    `formNewMortgageAmount${counter}`
  ].value = new Intl.NumberFormat().format(newMortgageAmount);

  if (!state.buyingOnly) {
    elements[`formSellingPrice${counter}`].value =
      elements.modalSellingPrice.value;
    elements[`formMortgageBalance${counter}`].value =
      elements.modalMortgageBalance.value;
    elements[`formOldRate${counter}`].value = elements.modalOldRate.value;
  }
  //Calculate Stamp Duty
  let stampDuty = calcStampDuty(housePrice, false);
  elements[`formStampDuty${counter}`].value = new Intl.NumberFormat().format(
    stampDuty
  );
  elements[`formTotalCash${counter}`].value = new Intl.NumberFormat().format(
    stampDuty + deposit
  );

  //Calculate monthly mortage

  let monthlyPayments, oldMonthlyPayments, totalMonthlyPayments;
  monthlyPayments = getMonthlyPayment(
    newMortgageAmount,
    numberOfPayments,
    monthlyRate
  );

  if (state.buyingOnly) {
    elements[
      `formMonthlyMortgage${counter}`
    ].value = new Intl.NumberFormat().format(monthlyPayments.toFixed(2));
  } else if (!state.buyingOnly) {
    oldMonthlyPayments = getMonthlyPayment(
      mortgageBalance,
      numberOfPayments,
      oldMonthlyRate
    );
    totalMonthlyPayments = monthlyPayments + oldMonthlyPayments;
    elements[
      `formMonthlyMortgage${counter}`
    ].value = new Intl.NumberFormat().format(totalMonthlyPayments.toFixed(2));
  }
  updateDatabase(state);
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
};

const updateDatabase = (state) => {
  const counter = state.counter;
  elements.callModal.textContent = `Add Purchase Scenario - ${counter + 1}`;
  firebase
    .database()
    .ref(`housepurchase/` + `scenario${counter}`)
    .set({
      BuyingOnly: state.buyingOnly.toString(),
      HousePrice: elements[`formHousePrice${counter}`].value,
      DepositAmount: elements[`formDeposit${counter}`].value,
      NewMortgageAmount: elements[`formNewMortgageAmount${counter}`].value,
      NewRate: elements[`formRate${counter}`].value,
      TermTime: elements[`formTermTime${counter}`].value,
      StampDuty: elements[`formStampDuty${counter}`].value,
      TotalCash: elements[`formTotalCash${counter}`].value,
      MonthlyPayment: elements[`formMonthlyMortgage${counter}`].value,
    });

  if (!state.buyingOnly) {
    firebase
      .database()
      .ref(`housepurchase/` + `scenario${counter}`)
      .update({
        SellingPrice: elements[`formSellingPrice${counter}`].value,
        MortgageBalance: elements[`formMortgageBalance${counter}`].value,
        OldRate: elements[`formOldRate${counter}`].value,
      });
  }
  updateCounter(counter);
};

const updateCounter = (counter) => {
  if (counter <= 4) {
    firebase.database().ref(`housepurchase`).update({
      Counter: counter,
    });
  }
  if (counter == 4) {
    elements.callModal.style.display = "none";
  }
};
