import { elements } from "../js/base";

export const toggleForm = (x) => {
  console.log("wqwwwww");
  console.log(x);
  const markup = `<div>
  <label for="price">New Mortgage amount:</label>
  <input type="text" class="formNewMortgageAmount">
</div>
<div>   
  <label for="rate">New Mortage Rate:</label>
  <input type="text" class="formRate" id="rate">
</div>`;

  const markup2 = `  <div>
  <label for="price">Hosue Sale Price:</label>
  <input type="text" class="formSellingPrice">
</div> `;

  if (!x) {
    const element = document.querySelector(".firstForm__container--3");
    const element2 = document.querySelector(".housePriceDiv");

    console.log(element);
    element.insertAdjacentHTML("afterbegin", markup);
    element2.insertAdjacentHTML("afterend", markup2);
    elements.modalDepositBtn.setAttribute("href", "#fixedOrNotQ");
    elements.add();
  } else {
    elements.modalDepositBtn.setAttribute("href", "#rateQ");
  }

  elements.modalQuestion1.style.visibility = "hidden";
  elements.modalQuestion1.style.opacity = 0;
};
