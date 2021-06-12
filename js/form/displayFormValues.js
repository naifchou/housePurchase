import { formValues } from "./formVariables";
//Display values in form

export const displayValues = (state, counter) => {
  elements[`formHousePrice${counter}`].value = elements.modalHousePrice.value;
  elements[`formDeposit${counter}`].value = elements.modalDeposit.value;

  elements[`formRate${counter}`].value = elements.modalRate.value;
  elements[`formTermTime${counter}`].value = elements.modalTermTime.value;
  elements[
    `formNewMortgageAmount${counter}`
  ].value = new Intl.NumberFormat().format(formValues.newMortgageAmount);

  if (!state.buyingOnly) {
    elements[`formSellingPrice${counter}`].value =
      elements.modalSellingPrice.value;
    elements[`formMortgageBalance${counter}`].value =
      elements.modalMortgageBalance.value;
    elements[`formOldRate${counter}`].value = elements.modalOldRate.value;
  }

  elements[`formStampDuty${counter}`].value = new Intl.NumberFormat().format(
    formValues.stampDuty
  );

  elements[`formTotalCash${counter}`].value = new Intl.NumberFormat().format(
    formValues.stampDuty + formValues.deposit
  );

  if (state.buyingOnly) {
    elements[
      `formMonthlyMortgage${counter}`
    ].value = new Intl.NumberFormat().format(
      formValues.monthlyPayments.toFixed(2)
    );
  } else {
    elements[
      `formMonthlyMortgage${counter}`
    ].value = new Intl.NumberFormat().format(
      formValues.totalMonthlyPayments.toFixed(2)
    );
  }
};
