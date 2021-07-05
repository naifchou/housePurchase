export const elements = {
  callModal: document.querySelector(".call-modal"),
  theModal: document.querySelector(".house-modal"),

  addModal: () => {
    (elements.modalQuestion1 = document.querySelector(
      ".house-modal__body__question--1"
    )),
      (elements.modalFixedOrNotQ = document.querySelector(
        ".house-modal__body__question--4"
      )),
      (elements.modalOldRateQ = document.querySelector("#old-rate-q")),
      (elements.modalHousePrice = document.querySelector(".house-price")),
      (elements.modalSellingPrice = document.querySelector(".selling-price")),
      (elements.modalDeposit = document.querySelector(".deposit")),
      (elements.modalMortgageBalance = document.querySelector(
        ".mortgage-balance"
      )),
      (elements.modalRate = document.querySelector(".rate")),
      (elements.modalOldRate = document.querySelector(".old-rate")),
      (elements.modalTermTime = document.querySelector(".termTime")),
      (elements.modalHousePriceBtn = document.querySelector(
        "#house-price-btn"
      )),
      (elements.modalDepositBtn = document.querySelector("#deposit-btn")),
      (elements.modalOldRateBtn = document.querySelector("#old-rate-btn")),
      (elements.modalRateBtn = document.querySelector("#rate-btn")),
      (elements.modalSellingPriceBtn = document.querySelector(
        "#sellingPriceBtn"
      )),
      (elements.modalMortgageBalanceBtn = document.querySelector(
        "#mortgageBalanceBtn"
      )),
      (elements.modalSubmit = document.querySelector(".submit")),
      (elements.modalForm = document.querySelector(".house-modal__body"));
  },

  loader: `<div class="loader"></div>`,

  formMarkup: `<div class="form__container form__container--1">
              
              <div class="housePriceDiv">
                  <label>House Purchase Price: </label>
                  <input type="text" class="formPurchasePrice">
              </div> 

              <div>
                  <label>Planned Cash Investment </label>
                  <input type="text" class="formDeposit">
              </div>
            </div>

            <div class="form__container form__container--3">

              <div>
                  <label class="new-mortgage-label">New Mortgage amount:
                    
                  </label>

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
                  <label class="total-cash-label" >Total Cash Payment:</label>
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

  tooltipMarkup: `<div class="material-icons icon-info" data-tooltip = "">
  info
  </div>`,

  validationObject: `[
    {
        "selector" : ".house-price",
        "type" : "number",
        "button" : "#house-price-btn",
        "range" : {"min": 2000, "max": 99000000}
    },
    {
        "selector" : ".deposit",
        "type" : "number",
        "button" : "#deposit-btn",
        "range" : {"min": 2000, "max": 99000000}
    },
    {
        "selector" : ".selling-price",
        "type" : "number",
        "button" : "#sellingPriceBtn",
        "range" : {"min": 2000, "max": 99000000}
    },
    {
        "selector" : ".mortgage-balance",
        "type" : "number",
        "button" : "#mortgageBalanceBtn",
        "range" : {"min": 2000, "max": 99000000}
    },
    {
        "selector" : ".rate",
        "type" : "float",
        "button" : "#rate-btn",
        "range" : {"min": 0.2, "max": 5}
    },
    {
        "selector" : ".old-rate",
        "type" : "float",
        "button" : "#old-rate-btn",
        "range" : {"min": 0.2, "max": 5}
    },
    {
        "selector" : ".termTime",
        "type" : "number",
        "button" : ".submit",
        "range" : {"min": 10, "max": 40}
    }
]`,

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
