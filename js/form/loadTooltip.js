export const loadTooltip = (selector, markup, content, buyingOnly) => {};

const content = (buyingOnly) => {
  let data = [
    {
      selector: ".new-mortgage-label",
      content: buyingOnly
        ? "Purchase Price - Cash Deposit"
        : "Purchase Price - (House Sale Price + Cash Deposit)",
    },
    {
      selector: ".total-cash-label",
      content:
        "This is the total cash amount paid towards the house which is Deposit + Stamp Duty ",
    },
  ];
};
