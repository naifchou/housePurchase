import "../sass/main.scss";
import { $ } from "../js/library";

import { stampDutyFunction } from "../js/stampDuty";
import { monthlyPayment } from "../js/mortgageCalc";
import {
  elements,
  numericOnly,
  rateValidation,
  termTimeValidation,
} from "../js/base";

//Modal Controller

//1. Hide Q1 in Modal to start series of next quesitons (controlled from within scss)

$(".btnYes").listen("click", () => {
  elements.modalQuestion1.style.visibility = "hidden";
  elements.modalQuestion1.style.opacity = 0;
});

//2. Setting the cursor ready inside input

window.addEventListener("hashchange", () => {
  let hashString = window.location.hash;
  let currentInput = document.querySelector(`${hashString} input`);
  currentInput.focus();
  currentInput.select();
});

//3. Q2 and Q3 Validate [number only, seperator put in, and toggle button]

$("#q2 input").validation(elements.modalq2Btn, 20000, 999999999);
$("#q3 input").validation(elements.modalq3Btn, 10000, 999999999);

//4. q4 (rate) Validation
$("#q4 input").validationFloat(elements.modalq4Btn, 0.2, 4);

//5. q5 validation
$("#q5 input").validation(elements.modalSubmit, 10, 40);
$("#q5 input").listen("keyup", () => {
  if (elements.modalSubmit.classList.contains("disabled")) {
    console.log("submit disabled");
    elements.modalSubmit.disabled = true;
  } else {
    console.log("submit not disabled");

    elements.modalSubmit.disabled = false;
  }
});

//1. Extract user inputs
let form = document.querySelector(".houseModal__body");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  elements.firstFrom.style.display = "inline-block";
  elements.theModal.style.display = "none";
  let housePrice = parseInt(elements.modalHousePrice.value.replace(/,/g, ""));
  let deposit = parseInt(elements.modalDeposit.value.replace(/,/g, ""));
  let rate = elements.modalRate.value;
  let monthlyRate = rate / 100 / 12;
  let termTime = elements.modalTermTime.value;
  let mortgageAmount = housePrice - deposit;
  let numberOfPayments = termTime * 12;
  console.log(mortgageAmount);
  console.log(housePrice);
  console.log(elements.modalHousePrice.value);

  //2. Display values in form
  elements.formHousePrice.value = elements.modalHousePrice.value;
  elements.formDeposit.value = elements.modalDeposit.value;
  elements.formRate.value = elements.modalRate.value;
  elements.formTermTime.value = elements.modalTermTime.value;

  //3. Calculate Stamp Duty
  let stampDuty = stampDutyFunction(housePrice, false);
  elements.formStampDuty.value = new Intl.NumberFormat().format(stampDuty);
  elements.formTotalCash.value = new Intl.NumberFormat().format(
    stampDuty + deposit
  );

  //4. Calculate monthly mortage

  let monthlyPayments = monthlyPayment(
    mortgageAmount,
    numberOfPayments,
    monthlyRate
  );
  elements.formMonthlyMortgage.value = new Intl.NumberFormat().format(
    monthlyPayments.toFixed(2)
  );
});

//remove # at reload
window.addEventListener("load", () => {
  window.location.hash = "";
});

//

window.addEventListener("hashchange", () => {
  let hashString = window.location.hash;
  let currentInput = document.querySelector(`${hashString} input`);
  currentInput.focus();
  currentInput.select();
});
