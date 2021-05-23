import { elements } from "../js/base";

export const toggleForm = (onlyBuying, rateNotFixed) => {
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
