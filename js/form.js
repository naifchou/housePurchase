import { elements } from "./variables";
import { getMonthlyPayment } from "../js/mortgageCalc";
import { calcStampDuty } from "../js/stampDuty";

export const toggleForm = (onlyBuying) => {
  const markup = `<div class="firstForm__container firstForm__container--2">
  <div>
      <label for="price">Current Mortgage Balance:</label>
      <input type="text" class="formMortgageBalance">
  </div>
  <div id = "oldRateDiv" >
      <label for="price">Current Mortgage Rate:</label>
      <input type="text" class="formOldRate">
  </div>
</div>`;

  const markup2 = `  <div>
  <label for="price">Hosue Sale Price:</label>
  <input type="text" class="formSellingPrice">
</div> `;

  if (!onlyBuying) {
    const element = document.querySelector(".firstForm__container--1");
    const element2 = document.querySelector(".housePriceDiv");

    element.insertAdjacentHTML("afterend", markup);
    element2.insertAdjacentHTML("afterend", markup2);
    elements.modalDepositBtn.setAttribute("href", "#fixedOrNotQ");
    elements.add();
  } else {
    elements.modalDepositBtn.setAttribute("href", "#rateQ");
  }
  elements.modalQuestion1.style.visibility = "hidden";
  elements.modalQuestion1.style.opacity = 0;
};

export const calcFormValues = (state) => {
  let housePrice = parseInt(elements.modalHousePrice.value.replace(/,/g, ""));
  let deposit = parseInt(elements.modalDeposit.value.replace(/,/g, ""));
  let rate = elements.modalRate.value;
  let monthlyRate = rate / 100 / 12;
  let termTime = elements.modalTermTime.value;
  let numberOfPayments = termTime * 12;
  let sellingPrice, newMortgageAmount, oldMonthlyRate, oldRate, mortgageBalance;

  if (!state.buyingOnly) {
    sellingPrice = parseInt(elements.modalSellingPrice.value.replace(/,/g, ""));
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
  elements.formHousePrice.value = elements.modalHousePrice.value;
  elements.formDeposit.value = elements.modalDeposit.value;

  elements.formRate.value = elements.modalRate.value;
  elements.formTermTime.value = elements.modalTermTime.value;
  elements.formNewMortgageAmount.value = new Intl.NumberFormat().format(
    newMortgageAmount
  );

  if (!state.buyingOnly) {
    elements.formSellingPrice.value = elements.modalSellingPrice.value;
    elements.formMortgageBalance.value = elements.modalMortgageBalance.value;
    elements.formOldRate.value = elements.modalOldRate.value;
  }
  //Calculate Stamp Duty
  let stampDuty = calcStampDuty(housePrice, false);
  elements.formStampDuty.value = new Intl.NumberFormat().format(stampDuty);
  elements.formTotalCash.value = new Intl.NumberFormat().format(
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
    elements.formMonthlyMortgage.value = new Intl.NumberFormat().format(
      monthlyPayments.toFixed(2)
    );
  } else if (!state.buyingOnly) {
    oldMonthlyPayments = getMonthlyPayment(
      mortgageBalance,
      numberOfPayments,
      oldMonthlyRate
    );
    totalMonthlyPayments = monthlyPayments + oldMonthlyPayments;
    elements.formMonthlyMortgage.value = new Intl.NumberFormat().format(
      totalMonthlyPayments.toFixed(2)
    );
  }
};
