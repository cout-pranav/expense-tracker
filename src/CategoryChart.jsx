import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LabelList } from 'recharts';

// Fixed hue order per category so a color always identifies the same
// category, independent of sort order or which categories are present.
const CATEGORY_COLORS = {
  food: '#1baf7a',
  housing: '#2a78d6',
  utilities: '#eda100',
  transport: '#4a3aa7',
  entertainment: '#e87ba4',
  salary: '#008300',
  other: '#898781',
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const { category, amount } = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <strong>{category}</strong>
      <div>${amount.toFixed(2)}</div>
    </div>
  );
}

function CategoryChart({ transactions }) {
  const totalsByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((totals, t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
      return totals;
    }, {});

  const data = Object.entries(totalsByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  if (data.length === 0) {
    return (
      <div className="category-chart">
        <h2>Spending by Category</h2>
        <p className="empty-state">No expenses yet.</p>
      </div>
    );
  }

  const chartHeight = Math.max(data.length * 40 + 20, 100);

  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>
      <BarChart
        width={720}
        height={chartHeight}
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
      >
        <CartesianGrid horizontal={false} stroke="#e1e0d9" />
        <XAxis type="number" tick={{ fill: '#898781', fontSize: 12 }} axisLine={{ stroke: '#c3c2b7' }} tickLine={false} />
        <YAxis
          dataKey="category"
          type="category"
          width={100}
          tick={{ fill: '#0b0b0b', fontSize: 13 }}
          axisLine={{ stroke: '#c3c2b7' }}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f0efec' }} />
        <Bar dataKey="amount" barSize={20} isAnimationActive={false}>
          {data.map((entry) => (
            <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || CATEGORY_COLORS.other} />
          ))}
          <LabelList
            dataKey="amount"
            position="right"
            formatter={(value) => `$${value.toFixed(0)}`}
            style={{ fill: '#52514e', fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </div>
  );
}

export default CategoryChart
