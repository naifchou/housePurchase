export const elements = {
  callModal: document.querySelector(".call-modal"),

  theModal: document.querySelector(".house-modal"),
  modalQuestion1: document.querySelector(".house-modal__body__question--1"),
  modalFixedOrNotQ: document.querySelector(".house-modal__body__question--4"),
  modalOldRateQ: document.querySelector("#oldRateQ"),
  modalHousePrice: document.querySelector(".housePrice"),
  modalSellingPrice: document.querySelector(".sellingPrice"),
  modalDeposit: document.querySelector(".deposit"),
  modalMortgageBalance: document.querySelector(".mortgageBalance"),

  modalRate: document.querySelector(".rate"),
  modalOldRate: document.querySelector(".oldRate"),

  modalTermTime: document.querySelector(".termTime"),

  modalq1Btn: document.querySelector("#q1Btn"),
  modalHousePriceBtn: document.querySelector("#housePriceBtn"),
  modalDepositBtn: document.querySelector("#depositBtn"),
  modalOldRateBtn: document.querySelector("#oldRateBtn"),
  modalRateBtn: document.querySelector("#rateBtn"),
  modalSellingPriceBtn: document.querySelector("#sellingPriceBtn"),
  modalMortgageBalanceBtn: document.querySelector("#mortgageBalanceBtn"),

  modalSubmit: document.querySelector(".submit"),
  modalForm: document.querySelector(".house-modal__body"),

  formMarkup: `<div class="form__container form__container--1">
              <div class="housePriceDiv">
                  <label>House Purchase Price:</label>
                  <input type="text" class="formPurchasePrice">
              </div> 

              <div>
                  <label>Planned Deposit Payment </label>
                  <input type="text" class="formDeposit">
              </div>
            </div>

            <div class="form__container form__container--3">

              <div>
                  <label >New Mortgage amount:</label>
                  <input type="text" class="formNewMortgageAmount">
              </div>
              <div>   
                  <label >New Mortage Rate offered:</label>
                  <input type="text" class="formRate">
              </div>
              <div>   
                  <label ">Mortage Term Time:</label>
                  <input type="text" class="formTerm">
              </div>
            </div>


            <div class="form__container form__container--4">
              <div>
                  <label>Stamp Duty:</label>
                  <input type="text" class="formStampDuty">
              </div>
            </div>

            <div class="form__container form__container--5">
              <div>
                  <label>Total Cash Payment:</label>
                  <input type="text" class="formTotalCash">
              </div>
              <div>
                  <label>Monthly Mortgage Payment</label>
                  <input type="text" class="formMonthlyMortgage">
              </div>
            </div>`,

  markup: `<div class="form__container form__container--2">
              <div>
                  <label for="price">Current Mortgage Balance:</label>
                  <input type="text" class="formMortgageBalance">
              </div>
              <div id = "oldRateDiv" >
                  <label for="price">Current Mortgage Rate:</label>
                  <input type="text" class="formOldRate">
              </div>
            </div>`,

  markup2: `  <div>
              <label for="price">Hosue Sale Price:</label>
              <input type="text" class="formSellingPrice">
            </div> `,

  add: (counter) => {
    elements[`form${counter}`] = document.querySelector(`.form--${counter}`);

    elements[`formHousePrice${counter}`] = document.querySelector(
      `.form--${counter} .formPurchasePrice`
    );
    elements[`formDeposit${counter}`] = document.querySelector(
      `.form--${counter} .formDeposit`
    );

    elements[`formNewMortgageAmount${counter}`] = document.querySelector(
      `.form--${counter} .formNewMortgageAmount`
    );
    elements[`formRate${counter}`] = document.querySelector(
      `.form--${counter} .formRate`
    );
    elements[`formOldRate${counter}`] = document.querySelector(
      `.form--${counter} .formOldRate`
    );

    elements[`formTermTime${counter}`] = document.querySelector(
      `.form--${counter} .formTerm`
    );
    elements[`formStampDuty${counter}`] = document.querySelector(
      `.form--${counter} .formStampDuty`
    );
    elements[`formTotalCash${counter}`] = document.querySelector(
      `.form--${counter} .formTotalCash`
    );
    elements[`formMonthlyMortgage${counter}`] = document.querySelector(
      `.form--${counter} .formMonthlyMortgage`
    );
    elements[`formMortgageBalance${counter}`] = document.querySelector(
      `.form--${counter} .formMortgageBalance`
    );
    elements[`formOldRate${counter}`] = document.querySelector(
      `.form--${counter} .formOldRate`
    );
    elements[`formSellingPrice${counter}`] = document.querySelector(
      `.form--${counter} .formSellingPrice`
    );
    elements[`formOldRateDiv${counter}`] = document.querySelector(
      `.form--${counter} #oldRateDiv`
    );
  },
};

window.elements = elements;
