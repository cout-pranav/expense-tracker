import { formatAmount } from './formatCurrency'

function TransactionList({ transactions, categories, filterType, setFilterType, filterCategory, setFilterCategory, onDeleteTransaction }) {
  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <h2>Entries</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} aria-label="Filter by type">
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th className="col-amount">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="col-date">{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td className={`col-amount ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                  {t.type === "income" ? "+" : "-"}${formatAmount(t.amount)}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      if (window.confirm(`Delete "${t.description}"?`)) {
                        onDeleteTransaction(t.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList
