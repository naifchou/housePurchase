export function getMonthlyPayment(p, n, i) {
  return (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
}

// p = prinicpal amount , i = monthly interest rate , n = number of monthly payments
