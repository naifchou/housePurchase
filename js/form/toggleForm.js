import { loadFormExtra } from "../form/loadForm";

export const toggleForm = (onlyBuying, counter) => {
  if (!onlyBuying) {
    elements.modalDepositBtn.setAttribute("href", "#fixed-or-not-q");
    loadFormExtra(counter);
  } else {
    elements.modalDepositBtn.setAttribute("href", "#rate-q");
  }
  elements.add(counter);
  elements.modalQuestion1.style.display = "none";
};

export const toggleForm2 = (rateFixed, counter) => {
  if (!rateFixed) {
    elements[`formOldRateDiv${counter}`].parentNode.removeChild(
      elements[`formOldRateDiv${counter}`]
    );
    elements.modalOldRateQ.parentNode.removeChild(elements.modalOldRateQ);
    elements.modalMortgageBalanceBtn.setAttribute("href", "#rate-q");
  }
};
