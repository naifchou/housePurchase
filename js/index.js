import "../sass/main.scss";
import { $ } from "./model";

import { stampDutyFunction } from "../js/stampDuty";
import { toggleForm } from "../js/form";
import { monthlyPayment } from "../js/mortgageCalc";
import { elements } from "../js/base";

/* Modal Controller */

const state = {};

//1. Hide Q1 in Modal to start series of next quesitons (controlled from within scss) and toggle form

elements.modalQuestion1.addEventListener("click", (e) => {
  if (e.target.matches(".q1BtnBuying")) {
    state.buyingOnly = true;
    toggleForm(state.buyingOnly);
  } else if (e.target.matches(".q1BtnBuyingSelling")) {
    state.buyingOnly = false;
    toggleForm(state.buyingOnly);
  }
});

//2. Setting the cursor ready inside input

window.addEventListener("hashchange", () => {
  let hashString = window.location.hash;
  let currentInput = document.querySelector(`${hashString} input`);
  if (currentInput != null) {
    currentInput.focus();
    currentInput.select();
  }
});

//3. Validation for - HousePrice, Deposit, selling price  Validate [number only, seperator put in, and toggle button]

$("#housePriceQ input").validation(
  elements.modalHousePriceBtn,
  20000,
  999999999
);
$(".deposit").validation(elements.modalDepositBtn, 10000, 999999999);
$(".sellingPrice").validation(elements.modalSellingPriceBtn, 10000, 999999999);
$(".mortgageBalance").validation(
  elements.modalMortgageBalanceBtn,
  10000,
  999999999
);

//4. rate Validation
$(".rate").validationFloat(elements.modalRateBtn, 0.2, 4);
$(".oldRate").validationFloat(elements.modalOldRateBtn, 0.2, 4);

//5. term time validation
$(".termTime").validation(elements.modalSubmit, 10, 40);
$(".termTime").listen("keyup", () => {
  if (elements.modalSubmit.classList.contains("disabled")) {
    console.log("submit disabled");
    elements.modalSubmit.disabled = true;
  } else {
    console.log("submit not disabled");

    elements.modalSubmit.disabled = false;
  }
});

//6. Extract user inputs
let form = document.querySelector(".houseModal__body");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  elements.firstForm.style.display = "inline-block";
  elements.theModal.style.display = "none";
  let housePrice = parseInt(elements.modalHousePrice.value.replace(/,/g, ""));
  let deposit = parseInt(elements.modalDeposit.value.replace(/,/g, ""));

  let sellingPrice, newMortgageAmount, oldMonthlyRate, oldRate, mortgageBalance;

  if (!state.buyingOnly) {
    sellingPrice = parseInt(elements.modalSellingPrice.value.replace(/,/g, ""));
    oldRate = elements.modalOldRate.value;
    oldMonthlyRate = oldRate / 100 / 12;
    mortgageBalance = parseInt(
      elements.modalMortgageBalance.value.replace(/,/g, "")
    );
    newMortgageAmount = housePrice - (sellingPrice + deposit);
  } else {
    newMortgageAmount = housePrice - deposit;
  }

  let rate = elements.modalRate.value;
  let monthlyRate = rate / 100 / 12;
  let termTime = elements.modalTermTime.value;
  let numberOfPayments = termTime * 12;

  //7. Display values in form
  elements.formHousePrice.value = elements.modalHousePrice.value;
  elements.formDeposit.value = elements.modalDeposit.value;

  elements.formRate.value = elements.modalRate.value;
  elements.formTermTime.value = elements.modalTermTime.value;

  if (!state.buyingOnly) {
    elements.formSellingPrice.value = elements.modalSellingPrice.value;
    elements.formNewMortgageAmount.value = new Intl.NumberFormat().format(
      newMortgageAmount
    );
    elements.formMortgageBalance.value = elements.modalMortgageBalance.value;
    elements.formOldRate.value = elements.modalOldRate.value;
  }
  //8. Calculate Stamp Duty
  let stampDuty = stampDutyFunction(housePrice, false);
  elements.formStampDuty.value = new Intl.NumberFormat().format(stampDuty);
  elements.formTotalCash.value = new Intl.NumberFormat().format(
    stampDuty + deposit
  );

  //9. Calculate monthly mortage

  let monthlyPayments, oldMonthlyPayments, totalMonthlyPayments;
  monthlyPayments = monthlyPayment(
    newMortgageAmount,
    numberOfPayments,
    monthlyRate
  );

  if (state.buyingOnly) {
    elements.formMonthlyMortgage.value = new Intl.NumberFormat().format(
      monthlyPayments.toFixed(2)
    );
  } else if (!state.buyingOnly) {
    oldMonthlyPayments = monthlyPayment(
      mortgageBalance,
      numberOfPayments,
      oldMonthlyRate
    );
    totalMonthlyPayments = monthlyPayments + oldMonthlyPayments;
    elements.formMonthlyMortgage.value = new Intl.NumberFormat().format(
      totalMonthlyPayments.toFixed(2)
    );
  }
});

//remove # at reload - delete later
window.addEventListener("load", () => {
  window.location.hash = "";
});

//
