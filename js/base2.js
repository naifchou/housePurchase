export const elements = {
  theModal: document.querySelector(".houseModal"),
  modalButton: document.querySelector(".button"),
  modalQuestion1: document.querySelector(".houseModal__body__question--1"),
  modalHousePrice: document.querySelector(".housePrice"),
  modalHousePriceBtn: document.querySelector("#aq2"),
  modalDeposit: document.querySelector(".deposit"),
  modalRate: document.querySelector(".rate"),
  modalTermTime: document.querySelector(".termTime"),
  modalSubmit: document.querySelector(".submit"),
  firstFrom: document.querySelector(".firstTimeBuyer"),
  formHousePrice: document.querySelector(".formPrice"),
  formDeposit: document.querySelector(".formDeposit"),
  formRate: document.querySelector(".formRate"),
  formTermTime: document.querySelector(".formTerm"),
  formStampDuty: document.querySelector(".formStampDuty"),
  formTotalCash: document.querySelector(".formTotalCash"),
  formMonthlyMortgage: document.querySelector(".formMonthlyMortgage"),
};

//Function to check if keypresses are numeric
export var numericOnly = (e) => {
  var isNumber =
    (e.keyCode <= 57 && e.keyCode >= 48) || e.keyCode === 46 || e.keyCode == 8;
  return isNumber;
};

//Formatting Number
export var formatNumber = (value, id) => {
  if (numericOnly(e) && (id === "q2" || id === "q3")) {
    var number = parseInt(value.replace(/,/g, ""));
    var formattedNumber = new Intl.NumberFormat().format(number);
    formattedNumber = Number.isNaN(formattedNumber) ? "" : formattedNumber;
    return formattedNumber;
  } else if (numericOnly(e) && id == "q4") {
    return rateValidation(value, id);
  }
};

//Validation- Mortgage Rate

export var rateValidation = (rate, id) => {
  console.log(rate);
  rate = parseFloat(rate);
  if (rate > 4 || rate < 0.2 || Number.isNaN(rate)) {
    console.log("Rate is out of range");
    document.querySelector(`#${id} a`).classList.add("disabled");
  } else {
    document.querySelector(`#${id} a`).classList.remove("disabled");
  }
  return rate;
};
