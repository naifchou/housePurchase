export const updateDatabase = (state) => {
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

export const deleteScenario = (e, counter) => {
  const id = e.target.dataset.counter;
  console.log(id);
  console.log(counter);
  firebase
    .database()
    .ref(`housepurchase/` + `scenario${id}`)
    .remove();

  if (id < state.counter || id == state.counter) {
    updateNumbering(id, state.counter);
  }

  // state.counter = state.counter - 1;
  // updateCounter(state.counter);
};

// This function will renumber the scenarios. So if from 1 ,2 ,3 ,4 => 2 is deleted, 3 becomes 2 and 4 becomes 3
const updateNumbering = async (id, counter) => {
  for (let i = id; i < counter; i++) {
    console.log(`the value of i is -${i} and counter - ${state.counter}`);
    const ref = firebase
      .database()
      .ref(`housepurchase/` + `scenario${parseInt(id) + 1}`);
    console.log(ref);
    const snapshot = await ref.once("value");
    console.log(snapshot.val().TotalCash);
    firebase
      .database()
      .ref(`housepurchase/` + `scenario${id}`)
      .set({
        BuyingOnly: snapshot.val().BuyingOnly,
        HousePrice: snapshot.val().HousePrice,
        DepositAmount: snapshot.val().DepositAmount,
        NewMortgageAmount: snapshot.val().NewMortgageAmount,
        NewRate: snapshot.val().NewRate,
        TermTime: snapshot.val().TermTime,
        StampDuty: snapshot.val().StampDuty,
        TotalCash: snapshot.val().TotalCash,
        MonthlyPayment: snapshot.val().MonthlyPayment,
      });

    if (!snapshot.val().BuyingOnly) {
      firebase
        .database()
        .ref(`housepurchase/` + `scenario${parseInt(id) + 1}`)
        .update({
          SellingPrice: snapshot.val().SellingPrice,
          MortgageBalance: snapshot.val().MortgageBalance,
          OldRate: snapshot.val().OldRate,
        });
    }

    firebase
      .database()
      .ref(`housepurchase/` + `scenario${counter}`)
      .remove();
  }
  updateCounter(state.counter - 1);
  location.reload();
};
