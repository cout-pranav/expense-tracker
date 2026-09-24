import { formatAmount } from './formatCurrency'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-item">
        <span className="summary-label">Income</span>
        <span className="summary-figure credit">${formatAmount(totalIncome)}</span>
      </div>
      <div className="summary-item">
        <span className="summary-label">Expenses</span>
        <span className="summary-figure debit">${formatAmount(totalExpenses)}</span>
      </div>
      <div className="summary-item summary-item--balance">
        <span className="summary-label">Balance</span>
        <span className="summary-figure">
          {balance < 0 ? "-" : ""}${formatAmount(balance)}
        </span>
      </div>
    </div>
  );
}

export default Summary
