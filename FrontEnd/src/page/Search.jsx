import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:8180/api/transaction",{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setTransactions(response.data);
        setFilteredTransactions([]); // no initial filtered data until search clicked
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTransactions();
  }, []);

  const filterByDate = () => {
    if (!startDate) return;
    const filtered = transactions.filter((item) => {
      const itemDate = item.date || item.transaction_date;
      return new Date(itemDate).toISOString().split("T")[0] === startDate;
    });
    setFilteredTransactions(filtered);
  };

  const calculateTotal = (type) => {
    return filteredTransactions
      .filter((item) => item.type === type)
      .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  const totalIncome = calculateTotal("Income");
  const totalOutcome = calculateTotal("Expense");
  const totalBalance = totalIncome - totalOutcome;

  return (
    <div className="p-6 w-[80vw] m-auto mt-10">
      <div className="bg-sky-500 shadow-md p-6 rounded-lg mb-6 w-[50%] mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-amber-50 text-center">Summary</h2>
        <p className="text-lg text-gray-50">
          Total Income: <span className="text-green-700">${totalIncome.toFixed(2)}</span>
        </p>
        <p className="text-lg text-amber-50">
          Total Outcome: <span className="text-red-500">${totalOutcome.toFixed(2)}</span>
        </p>
        <p className="text-lg text-amber-50">
          Total Balance: <span className="font-bold text-gray-200">${totalBalance.toFixed(2)}</span>
        </p>
      </div>

      <div className="flex justify-center mb-4 w-[50%] m-auto mt-10">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={filterByDate}
          className="bg-sky-500 hover:bg-sky-600 transition delay-100 text-white px-2 py-1 rounded-md cursor-pointer w-30 h-10 mt-2.5"
        >
          Search
        </button>
      </div>

      {filteredTransactions.length > 0 && (
        <div className="overflow-x-auto ml-25 mt-10">
          <table className="w-full border-collapse bg-white shadow-md">
            <thead className="bg-sky-500 text-white">
              <tr>
                <th className="text-center">Title</th>
                <th className="text-center">Date</th>
                <th className="py-2 px-4 text-center">Amount</th>
                <th className="py-2 px-4 text-center">Type</th>
                <th className="py-2 px-4 text-center">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 text-center">{item.title}</td>
                  <td className="py-2 px-4 text-center">{(item.date || item.transaction_date).slice(0, 10)}</td>
                  <td
                    className={`py-2 px-4 text-center ${
                      item.type === "Expense" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    ${Number(item.amount).toFixed(2)}
                  </td>
                  <td
                    className={`py-2 px-4 text-center ${
                      item.type === "Income" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.type}
                  </td>
                  <td className="py-2 px-4 text-center">{item.category || item.contegory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;
