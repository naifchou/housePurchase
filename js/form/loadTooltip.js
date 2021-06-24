export const createTooltip = (buyingOnly, markup, counter) => {
  const data = content(buyingOnly, counter);

  data.forEach((el, i) => {
    let label, tooltip;
    label = document.querySelector(`${el.selector}`);
    label.insertAdjacentHTML("beforeend", markup);
    tooltip = document.querySelector(`${el.selector} > div`);
    tooltip.setAttribute(`data-tooltip`, `${el.content}`);
  });
};

const content = (buyingOnly, counter) => {
  console.log(buyingOnly);
  let data = [
    {
      selector: `.form--${counter} .new-mortgage-label`,
      content:
        buyingOnly == "true"
          ? "Purchase Price - Cash Deposit"
          : "The extra borrowing from the bank, which is, Purchase Price - (House Sale Price + Cash Deposit)",
    },
    {
      selector: `.form--${counter} .total-cash-label`,
      content:
        "This is the total cash amount paid towards the house which is Deposit + Stamp Duty ",
    },
  ];
  return data;
};
