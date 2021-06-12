import { calcStampDuty } from "./stampDuty";
import { getMonthlyPayment } from "./mortgageCalc";

export const formValues = {
  add: (state) => {
    (formValues.housePrice = parseInt(
      elements.modalHousePrice.value.replace(/,/g, "")
    )),
      (formValues.deposit = parseInt(
        elements.modalDeposit.value.replace(/,/g, "")
      )),
      (formValues.rate = elements.modalRate.value),
      (formValues.monthlyRate = formValues.rate / 100 / 12),
      (formValues.termTime = elements.modalTermTime.value),
      (formValues.numberOfPayments = formValues.termTime * 12);

    if (!state.buyingOnly) {
      formValues.sellingPrice = parseInt(
        elements.modalSellingPrice.value.replace(/,/g, "")
      );
      if (state.rateFixed) {
        formValues.oldRate = elements.modalOldRate.value;
      } else formValues.oldRate = formValues.rate;
      formValues.oldMonthlyRate = formValues.oldRate / 100 / 12;
      formValues.mortgageBalance = parseInt(
        elements.modalMortgageBalance.value.replace(/,/g, "")
      );
      formValues.newMortgageAmount =
        formValues.housePrice - (formValues.sellingPrice + formValues.deposit);
    } else {
      formValues.newMortgageAmount = formValues.housePrice - formValues.deposit;
    }
  },

  stampDuty: () => {
    formValues.stampDuty = calcStampDuty(formValues.housePrice, false);
  },

  monthlyPayments: () => {
    formValues.monthlyPayments = getMonthlyPayment(
      formValues.newMortgageAmount,
      formValues.numberOfPayments,
      formValues.monthlyRate
    );
  },

  oldMonthlyPayments: () => {
    formValues.oldMonthlyPayments = getMonthlyPayment(
      formValues.mortgageBalance,
      formValues.numberOfPayments,
      formValues.oldMonthlyRate
    );
  },

  totalMonthlyPayments: () => {
    formValues.totalMonthlyPayments =
      formValues.monthlyPayments + formValues.oldMonthlyPayments;
  },
};
