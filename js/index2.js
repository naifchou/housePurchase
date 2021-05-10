import "../sass/main.scss";

import { stampDutyFunction } from "../js/stampDuty";
import { monthlyPayment } from "../js/mortgageCalc";
import {
  elements,
  formatNumber,
  numericOnly,
  rateValidation,
} from "../js/base";

document.querySelector(".btnYes").addEventListener("click", () => {
  //Hide 1st question in Modal to start series of next quesitons (controlled from within scss)
  elements.modalQuestion1.style.visibility = "hidden";
  elements.modalQuestion1.style.opacity = 0;
  var id = window.location.hash.replace("#", "");
  var element = document.querySelector(`#${id} input`);

  window.addEventListener("keypress", (e) => {
    // var id = window.location.hash.replace("#", "");
    // var element = document.querySelector(`#${id} input`);

    //Formatting Number

    element.value = formatNumber(element.value, id);
    if (element.value != "") {
      document.querySelector(`#${id} a`).classList.remove("disabled");
    } else if (element.value < 100) {
      document.querySelector(`#${id} a`).classList.add("disabled");
    }

    //Hitting Enter
    if (e.keyCode == 13 && id != "q5") {
      if (element.value == "") {
        console.log("enter value");
      } else {
        document.getElementById(`a${id}`).click();
      }
    }
  });

  window.addEventListener("keyup", (e) => {
    var id = window.location.hash.replace("#", "");
    var element = document.querySelector(`#${id} input`);
  });

  // Hide modal and show form when form submitted.
  elements.modalSubmit.addEventListener("click", () => {
    elements.firstFrom.style.display = "inline-block";
    elements.theModal.style.display = "none";
  });
});

//1. Extract user inputs
var form = document.querySelector(".houseModal__body");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var housePrice = parseInt(elements.modalHousePrice.value.replace(/,/g, ""));
  var deposit = parseInt(elements.modalDeposit.value.replace(/,/g, ""));
  var rate = elements.modalRate.value;
  var monthlyRate = rate / 100 / 12;
  var termTime = elements.modalTermTime.value;
  var mortgageAmount = housePrice - deposit;
  var numberOfPayments = termTime * 12;
  console.log(mortgageAmount);
  console.log(housePrice);
  console.log(elements.modalHousePrice.value);

  //2. Display values in form
  elements.formHousePrice.value = elements.modalHousePrice.value;
  elements.formDeposit.value = elements.modalDeposit.value;
  elements.formRate.value = elements.modalRate.value;
  elements.formTermTime.value = elements.modalTermTime.value;

  //3. Calculate Stamp Duty
  var stampDuty = stampDutyFunction(housePrice, false);
  elements.formStampDuty.value = new Intl.NumberFormat().format(stampDuty);
  elements.formTotalCash.value = new Intl.NumberFormat().format(
    stampDuty + deposit
  );

  //4. Calculate monthly mortage

  var monthlyPayments = monthlyPayment(
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
  var hashString = window.location.hash;
  //Enable Button at Q5

  if (hashString == "#q5") {
    elements.modalSubmit.disabled = false;
  }

  //setting input ready with cursor
  var currentInput = document.querySelector(`${hashString} input`);
  currentInput.focus();
  currentInput.select();
});
