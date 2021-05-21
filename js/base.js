export const elements = {
  theModal: document.querySelector(".houseModal"),
  // modalButton: document.querySelector(".button"),
  modalQuestion1: document.querySelector(".houseModal__body__question--1"),
  modalHousePrice: document.querySelector(".housePrice"),
  modalSellingPrice: document.querySelector(".sellingPrice"),
  modalDeposit: document.querySelector(".deposit"),
  modalMortgageBalance: document.querySelector(".mortgageBalance"),
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

  firstForm: document.querySelector(".firstForm"),
  formHousePrice: document.querySelector(".formPurchasePrice"),
  formSellingPrice: document.querySelector(".formSellingPrice"),
  formDeposit: document.querySelector(".formDeposit"),
  formMortgageBalance: document.querySelector(".formMortgageBalance"),

  formOldRate: document.querySelector(".formOldRate"),

  formTermTime: document.querySelector(".formTerm"),
  formStampDuty: document.querySelector(".formStampDuty"),
  formTotalCash: document.querySelector(".formTotalCash"),
  formMonthlyMortgage: document.querySelector(".formMonthlyMortgage"),

  add: () => {
    elements.formNewMortgageAmount = document.querySelector(
      ".formNewMortgageAmount"
    );
    elements.formRate = document.querySelector(".formRate");
    elements.formSellingPrice = document.querySelector(".formSellingPrice");
  },
};
