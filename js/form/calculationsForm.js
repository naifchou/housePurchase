import { formValues } from "./formVariables";
import { displayValues } from "./displayFormValues";
import { firebaseConfig } from "../firebaseConfig";

export const calcFormValues = (state, counter) => {
  formValues.add(state);
  formValues.stampDuty();

  //Calculate monthly mortage
  formValues.monthlyPayments();
  if (!state.buyingOnly) {
    formValues.oldMonthlyPayments();
    formValues.totalMonthlyPayments();
  }

  displayValues(state, counter);
  updateDatabase(state);
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
