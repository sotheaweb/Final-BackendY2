import React, { useState, useEffect } from 'react';
import { Filler } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const Analyst = () => {
  const [selectedDate, setSelectedDate] = useState('2025-01');
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    expenseBreakdown: {},
    incomeBreakdown: {},
    cashFlow: {},
  });
  const [loading, setLoading] = useState(false);

  const selectedYear = selectedDate.split('-')[0];
  const selectedMonth = new Date(`${selectedDate}-01`).toLocaleString('default', { month: 'short' });

  useEffect(() => {
    const fetchSummary = async () => {
      try {

        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8180/api/analyst?month=${selectedDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        
        setSummary(response.data);
      } catch (err) {
        console.error('Error fetching summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [selectedDate]);

  const { totalIncome, totalExpense, balance, incomeBreakdown, expenseBreakdown, cashFlow } = summary;

  const doughnutExpenses = {
    labels: Object.keys(expenseBreakdown),
    datasets: [
      {
        data: Object.values(expenseBreakdown),
        backgroundColor: ['#3B82F6', '#10B981', '#FACC15', '#EF4444', '#A855F7', '#6366F1'],
      },
    ],
  };

  const doughnutIncome = {
    labels: Object.keys(incomeBreakdown),
    datasets: [
      {
        data: Object.values(incomeBreakdown),
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#E879F9'],
      },
    ],
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const lineData = {
    labels: daysInMonth,
    datasets: [
      {
        label: 'Cash Flow',
        data: daysInMonth.map((d) => cashFlow[d] || 0),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
        <h1 className="text-xl font-bold text-gray-800"> Income & Expense Report</h1>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="datePicker">Select:</label>
          <input
            id="datePicker"
            type="month"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 text-center">
        <strong>{selectedMonth} {selectedYear}</strong>
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-sm">
        <div className="bg-white shadow-sm p-3 rounded border-l-4 border-green-500">
          <p className="text-gray-500">Income</p>
          <p className="text-green-600 font-semibold text-lg">
            {loading ? 'Loading...' : `$${totalIncome?.toLocaleString()}`}
          </p>
        </div>
        <div className="bg-white shadow-sm p-3 rounded border-l-4 border-red-500">
          <p className="text-gray-500">Expenses</p>
          <p className="text-red-600 font-semibold text-lg">
            {loading ? 'Loading...' : `$${totalExpense?.toLocaleString()}`}
          </p>
        </div>
        <div className="bg-white shadow-sm p-3 rounded border-l-4 border-blue-500">
          <p className="text-gray-500">Balance</p>
          <p className={`font-semibold text-lg ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {loading ? 'Loading...' : `$${balance?.toLocaleString()}`}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded shadow-sm">
          <h2 className="text-sm font-semibold mb-2">Expense Breakdown</h2>
          <Doughnut data={doughnutExpenses} />
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <h2 className="text-sm font-semibold mb-2">Income Sources</h2>
          <Doughnut data={doughnutIncome} />
        </div>
        <div className="bg-white p-3 rounded shadow-sm md:col-span-2">
          <h2 className="text-sm font-semibold mb-2">Cash Flow by Day</h2>
          <Line data={lineData} height={200} />
        </div>
      </div>
    </div>
  );
};

export default Analyst;


