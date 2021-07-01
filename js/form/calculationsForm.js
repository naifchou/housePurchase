import { formValues } from "./formVariables";
import { updateDatabase } from "./firebase";
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
