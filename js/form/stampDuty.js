export const calcStampDuty = (price, secondHome) => {
  var stampduty = 0;
  var intervals = {
    0: {
      from: 0,
      to: 125000,
      rate: 0,
    },
    1: {
      from: 125000,
      to: 250000,
      rate: 2,
    },
    2: {
      from: 250000,
      to: 925000,
      rate: 5,
    },
    3: {
      from: 925000,
      to: 1500000,
      rate: 10,
    },
    4: {
      from: 1500000,
      to: parseInt(price),
      rate: 12,
    },
  };

  for (var interval in intervals) {
    if (
      price > 1500000 ||
      intervals[interval]["from"] == 0 ||
      price > intervals[interval]["from"]
    ) {
      if (secondHome && price >= 40000) {
        intervals[interval]["rate"] += 3;
      }

      if (price < intervals[interval]["to"]) {
        intervals[interval]["to"] = price;
      }

      intervals[interval]["due"] =
        ((intervals[interval]["to"] - intervals[interval]["from"]) / 100) *
        intervals[interval]["rate"];
      stampduty += intervals[interval]["due"];
    } else {
      delete intervals[interval];
    }
  }

  var stampdutyRate = Math.round((stampduty / price) * 10000) / 100;

  return stampduty;
};
